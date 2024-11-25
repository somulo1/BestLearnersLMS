import { io, Socket } from 'socket.io-client';
import { create } from 'zustand';

interface MessageAttachment {
  id: string;
  name: string;
  type: string;
  url: string;
  size: number;
  thumbnailUrl?: string;
  mimeType: string;
  uploadStatus: 'uploading' | 'completed' | 'failed';
  progress?: number;
}

interface MessageReaction {
  emoji: string;
  users: {
    id: string;
    name: string;
  }[];
}

interface MessageReply {
  id: string;
  content: string;
  senderId: string;
  senderName: string;
  timestamp: string;
  attachments?: MessageAttachment[];
}

interface Message {
  id: string;
  senderId: string;
  senderName: string;
  senderAvatar?: string;
  senderRole: string;
  recipientId: string | null;
  recipientName: string | null;
  groupId: string | null;
  groupName: string | null;
  content: string;
  rawContent?: string; // For markdown or rich text
  timestamp: string;
  editedAt?: string;
  status: 'sending' | 'sent' | 'delivered' | 'read' | 'failed';
  type: 'text' | 'file' | 'image' | 'video' | 'audio' | 'link' | 'code' | 'poll';
  attachments?: MessageAttachment[];
  reactions?: MessageReaction[];
  replyTo?: Message;
  replies?: MessageReply[];
  mentions?: {
    id: string;
    name: string;
    type: 'user' | 'group' | 'channel';
  }[];
  isPinned?: boolean;
  isForwarded?: boolean;
  isEdited?: boolean;
  isDeleted?: boolean;
  metadata?: {
    links?: {
      url: string;
      title?: string;
      description?: string;
      image?: string;
    }[];
    poll?: {
      question: string;
      options: {
        id: string;
        text: string;
        votes: string[]; // Array of user IDs
      }[];
      endTime?: string;
      isMultipleChoice: boolean;
      isAnonymous: boolean;
    };
    code?: {
      language: string;
      snippet: string;
    };
  };
}

interface ChatParticipant {
  id: string;
  name: string;
  role: string;
  avatar?: string;
  status: 'online' | 'offline' | 'away' | 'busy';
  lastSeen?: string;
  isTyping?: boolean;
  permissions?: {
    canSendMessages: boolean;
    canSendFiles: boolean;
    canCreatePolls: boolean;
    canPinMessages: boolean;
    canDeleteMessages: boolean;
    isAdmin: boolean;
    isModerator: boolean;
  };
}

interface ChatGroup {
  id: string;
  name: string;
  description?: string;
  avatar?: string;
  type: 'course' | 'study' | 'general' | 'announcement';
  participants: ChatParticipant[];
  admins: string[]; // User IDs
  moderators: string[]; // User IDs
  settings: {
    isPublic: boolean;
    allowNewMembers: boolean;
    allowFileSharing: boolean;
    allowPolls: boolean;
    allowReplies: boolean;
    allowReactions: boolean;
    allowForwarding: boolean;
    allowEditing: boolean;
    allowDeletion: boolean;
    maxFileSize: number;
    allowedFileTypes: string[];
    retentionPeriod?: number; // in days
    slowMode?: number; // delay between messages in seconds
  };
  lastMessage?: Message;
  createdAt: string;
  updatedAt: string;
  pinnedMessages: string[]; // Message IDs
  metadata?: {
    courseId?: string;
    semester?: string;
    tags?: string[];
    category?: string;
  };
}

interface MessageState {
  messages: Message[];
  groups: ChatGroup[];
  activeConversations: Map<string, {
    unreadCount: number;
    lastReadMessageId: string;
    isTyping: boolean;
    draftMessage?: string;
  }>;
  socket: Socket | null;
  error: string | null;
  isConnecting: boolean;
  isReconnecting: boolean;
  lastSyncTimestamp: string;
  
  // Connection management
  connect: (userId: string, userRole: string) => Promise<void>;
  disconnect: () => void;
  reconnect: () => Promise<void>;
  
  // Message actions
  sendMessage: (message: Omit<Message, 'id' | 'timestamp' | 'status'>) => Promise<void>;
  editMessage: (messageId: string, content: string) => Promise<void>;
  deleteMessage: (messageId: string) => Promise<void>;
  markAsRead: (messageIds: string[]) => Promise<void>;
  reactToMessage: (messageId: string, emoji: string) => Promise<void>;
  removeReaction: (messageId: string, emoji: string) => Promise<void>;
  replyToMessage: (messageId: string, reply: Omit<MessageReply, 'id' | 'timestamp'>) => Promise<void>;
  pinMessage: (messageId: string) => Promise<void>;
  unpinMessage: (messageId: string) => Promise<void>;
  forwardMessage: (messageId: string, toIds: string[]) => Promise<void>;
  
  // Group actions
  createGroup: (group: Omit<ChatGroup, 'id' | 'createdAt'>) => Promise<void>;
  updateGroup: (groupId: string, updates: Partial<ChatGroup>) => Promise<void>;
  joinGroup: (groupId: string) => Promise<void>;
  leaveGroup: (groupId: string) => Promise<void>;
  addParticipants: (groupId: string, participantIds: string[]) => Promise<void>;
  removeParticipants: (groupId: string, participantIds: string[]) => Promise<void>;
  updateParticipantRole: (groupId: string, participantId: string, role: string) => Promise<void>;
  
  // Typing indicators
  sendTypingIndicator: (conversationId: string) => void;
  clearTypingIndicator: (conversationId: string) => void;
  
  // Message search and filtering
  searchMessages: (query: string) => Promise<Message[]>;
  filterMessages: (filters: {
    startDate?: string;
    endDate?: string;
    sender?: string;
    type?: Message['type'][];
    hasAttachments?: boolean;
    isPinned?: boolean;
  }) => Promise<Message[]>;
  
  // File handling
  uploadFile: (file: File, onProgress?: (progress: number) => void) => Promise<MessageAttachment>;
  cancelFileUpload: (attachmentId: string) => void;
  
  // Utility actions
  clearHistory: (conversationId: string) => Promise<void>;
  exportChat: (conversationId: string, format: 'pdf' | 'csv' | 'json') => Promise<string>;
  generateInviteLink: (groupId: string, expiresIn?: number) => Promise<string>;
}

const useMessageStore = create<MessageState>((set, get) => ({
  messages: [],
  groups: [],
  activeConversations: new Map(),
  socket: null,
  error: null,
  isConnecting: false,
  isReconnecting: false,
  lastSyncTimestamp: new Date().toISOString(),

  connect: async (userId: string, userRole: string) => {
    set({ isConnecting: true, error: null });
    try {
      const socket = io(import.meta.env.VITE_WS_URL || 'ws://localhost:3001', {
        auth: { userId, userRole },
        transports: ['websocket'],
        reconnection: true,
        reconnectionAttempts: 5,
        reconnectionDelay: 1000,
      });

      socket.on('connect', () => {
        set({ isConnecting: false, error: null });
        console.log('Connected to WebSocket server');
      });

      socket.on('connect_error', (error) => {
        set({ error: 'Connection failed: ' + error.message });
      });

      socket.on('reconnecting', () => {
        set({ isReconnecting: true });
      });

      socket.on('reconnect', () => {
        set({ isReconnecting: false, error: null });
      });

      socket.on('message', (message: Message) => {
        set((state) => ({
          messages: [...state.messages, message],
        }));
      });

      socket.on('messageStatus', ({ messageId, status }) => {
        set((state) => ({
          messages: state.messages.map((msg) =>
            msg.id === messageId ? { ...msg, status } : msg
          ),
        }));
      });

      socket.on('typing', ({ userId, conversationId }) => {
        set((state) => {
          const conversations = new Map(state.activeConversations);
          const conversation = conversations.get(conversationId) || {
            unreadCount: 0,
            lastReadMessageId: '',
            isTyping: false,
          };
          conversations.set(conversationId, { ...conversation, isTyping: true });
          return { activeConversations: conversations };
        });
      });

      socket.on('stopTyping', ({ userId, conversationId }) => {
        set((state) => {
          const conversations = new Map(state.activeConversations);
          const conversation = conversations.get(conversationId);
          if (conversation) {
            conversations.set(conversationId, { ...conversation, isTyping: false });
          }
          return { activeConversations: conversations };
        });
      });

      set({ socket });
    } catch (error) {
      set({ error: 'Failed to connect: ' + (error as Error).message });
    } finally {
      set({ isConnecting: false });
    }
  },

  disconnect: () => {
    const { socket } = get();
    if (socket) {
      socket.disconnect();
      set({ socket: null });
    }
  },

  reconnect: async () => {
    const { socket } = get();
    if (socket) {
      set({ isReconnecting: true });
      socket.connect();
    }
  },

  sendMessage: async (message) => {
    const { socket } = get();
    if (!socket) throw new Error('Not connected');

    const tempId = 'temp-' + Date.now();
    const newMessage = {
      ...message,
      id: tempId,
      timestamp: new Date().toISOString(),
      status: 'sending' as const,
    };

    set((state) => ({
      messages: [...state.messages, newMessage],
    }));

    try {
      await new Promise((resolve, reject) => {
        socket.emit('sendMessage', message, (response: { success: boolean; error?: string }) => {
          if (response.success) resolve(response);
          else reject(new Error(response.error));
        });
      });

      set((state) => ({
        messages: state.messages.map((msg) =>
          msg.id === tempId ? { ...msg, status: 'sent' as const } : msg
        ),
      }));
    } catch (error) {
      set((state) => ({
        messages: state.messages.map((msg) =>
          msg.id === tempId ? { ...msg, status: 'failed' as const } : msg
        ),
      }));
      throw error;
    }
  },

  editMessage: async (messageId, content) => {
    const { socket } = get();
    if (!socket) throw new Error('Not connected');

    set((state) => ({
      messages: state.messages.map((msg) =>
        msg.id === messageId
          ? { ...msg, content, isEdited: true, editedAt: new Date().toISOString() }
          : msg
      ),
    }));

    socket.emit('editMessage', { messageId, content });
  },

  deleteMessage: async (messageId) => {
    const { socket } = get();
    if (!socket) throw new Error('Not connected');

    set((state) => ({
      messages: state.messages.map((msg) =>
        msg.id === messageId ? { ...msg, isDeleted: true } : msg
      ),
    }));

    socket.emit('deleteMessage', { messageId });
  },

  markAsRead: async (messageIds) => {
    const { socket } = get();
    if (!socket) throw new Error('Not connected');

    socket.emit('markAsRead', messageIds);

    set((state) => ({
      messages: state.messages.map((msg) =>
        messageIds.includes(msg.id) ? { ...msg, status: 'read' as const } : msg
      ),
    }));
  },

  // Implement other methods similarly...

  uploadFile: async (file, onProgress) => {
    // Implement file upload logic here
    throw new Error('Not implemented');
  },

  cancelFileUpload: (attachmentId) => {
    // Implement upload cancellation logic here
    throw new Error('Not implemented');
  },

  // Add implementations for remaining methods...
}));

export { useMessageStore };
export type { Message, ChatGroup, ChatParticipant, MessageAttachment, MessageReaction, MessageReply };
