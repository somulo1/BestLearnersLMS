import React, { useState, useRef, useEffect } from 'react';
import { useMessageStore, type Message, type ChatGroup, type ChatParticipant } from '../../services/websocketService';
import { format } from 'date-fns';
import { 
  FiEdit2, 
  FiTrash2, 
  FiMoreVertical, 
  FiPaperclip, 
  FiSmile, 
  FiSend, 
  FiPlus, 
  FiUsers, 
  FiSearch,
  FiMessageSquare
} from 'react-icons/fi';
import EmojiPicker from 'emoji-picker-react';
import { motion, AnimatePresence } from 'framer-motion';

interface NewChatModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStartChat: (recipientId: string, recipientName: string) => void;
}

interface NewGroupModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateGroup: (groupData: Partial<ChatGroup>) => void;
}

const NewChatModal: React.FC<NewChatModalProps> = ({ isOpen, onClose, onStartChat }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [users] = useState([
    { id: 'user1', name: 'John Doe', role: 'student' },
    { id: 'user2', name: 'Jane Smith', role: 'instructor' },
    // Add more mock users or fetch from API
  ]);

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return isOpen ? (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-96">
        <h2 className="text-xl font-semibold mb-4">New Conversation</h2>
        <div className="relative mb-4">
          <input
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg"
          />
          <FiSearch className="absolute right-3 top-3 text-gray-400" />
        </div>
        <div className="max-h-60 overflow-y-auto">
          {filteredUsers.map(user => (
            <div
              key={user.id}
              onClick={() => {
                onStartChat(user.id, user.name);
                onClose();
              }}
              className="p-3 hover:bg-gray-50 cursor-pointer rounded-lg flex items-center"
            >
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                {user.name[0]}
              </div>
              <div className="ml-3">
                <div className="font-medium">{user.name}</div>
                <div className="text-sm text-gray-500">{user.role}</div>
              </div>
            </div>
          ))}
        </div>
        <button
          onClick={onClose}
          className="mt-4 w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
        >
          Cancel
        </button>
      </div>
    </div>
  ) : null;
};

const NewGroupModal: React.FC<NewGroupModalProps> = ({ isOpen, onClose, onCreateGroup }) => {
  const [groupName, setGroupName] = useState('');
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [users] = useState([
    { id: 'user1', name: 'John Doe', role: 'student' },
    { id: 'user2', name: 'Jane Smith', role: 'instructor' },
    // Add more mock users or fetch from API
  ]);

  const handleCreateGroup = () => {
    if (groupName.trim() && selectedUsers.length > 0) {
      const newGroup: Partial<ChatGroup> = {
        name: groupName,
        type: 'general',
        participants: selectedUsers.map(userId => ({
          id: userId,
          name: users.find(u => u.id === userId)?.name || '',
          role: 'participant',
          status: 'offline'
        })),
        settings: {
          isPublic: false,
          allowNewMembers: true,
          allowFileSharing: true,
          allowPolls: true,
          allowReplies: true,
          allowReactions: true,
          allowForwarding: true,
          allowEditing: true,
          allowDeletion: true,
          maxFileSize: 10 * 1024 * 1024, // 10MB
          allowedFileTypes: ['image/*', 'application/pdf'],
        }
      };
      onCreateGroup(newGroup);
      onClose();
    }
  };

  return isOpen ? (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-96">
        <h2 className="text-xl font-semibold mb-4">Create New Group</h2>
        <input
          type="text"
          placeholder="Group name"
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg mb-4"
        />
        <div className="mb-4">
          <h3 className="font-medium mb-2">Select Participants</h3>
          <div className="max-h-60 overflow-y-auto">
            {users.map(user => (
              <div
                key={user.id}
                className="flex items-center p-2 hover:bg-gray-50 rounded"
              >
                <input
                  type="checkbox"
                  checked={selectedUsers.includes(user.id)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedUsers([...selectedUsers, user.id]);
                    } else {
                      setSelectedUsers(selectedUsers.filter(id => id !== user.id));
                    }
                  }}
                  className="mr-3"
                />
                <div>
                  <div className="font-medium">{user.name}</div>
                  <div className="text-sm text-gray-500">{user.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={handleCreateGroup}
            disabled={!groupName.trim() || selectedUsers.length === 0}
            className={`flex-1 px-4 py-2 rounded-lg ${
              groupName.trim() && selectedUsers.length > 0
                ? 'bg-blue-500 text-white hover:bg-blue-600'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            Create Group
          </button>
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  ) : null;
};

const Messages: React.FC = () => {
  const {
    messages,
    groups,
    sendMessage,
    editMessage,
    deleteMessage,
    connect,
    uploadFile,
    createGroup: createGroupStore
  } = useMessageStore();

  const [selectedChat, setSelectedChat] = useState<string | null>(null);
  const [messageText, setMessageText] = useState('');
  const [editingMessage, setEditingMessage] = useState<Message | null>(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [attachments, setAttachments] = useState<File[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [showNewChatModal, setShowNewChatModal] = useState(false);
  const [showNewGroupModal, setShowNewGroupModal] = useState(false);
  const messageEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Connect to WebSocket when component mounts
    connect('user123', 'student'); // Replace with actual user ID and role
  }, []);

  useEffect(() => {
    // Scroll to bottom when new messages arrive
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleStartNewChat = (recipientId: string, _recipientName: string) => {
    setSelectedChat(recipientId);
  };

  const handleCreateGroup = async (groupData: Partial<ChatGroup>) => {
    try {
      await createGroupStore(groupData as Omit<ChatGroup, 'id' | 'createdAt'>);
    } catch (error) {
      console.error('Failed to create group:', error);
    }
  };

  const filteredMessages = messages.filter(
    (msg) => msg.groupId === selectedChat || msg.recipientId === selectedChat
  );

  const handleSendMessage = async () => {
    if (!messageText.trim() && attachments.length === 0) return;

    try {
      let uploadedAttachments = [];
      if (attachments.length > 0) {
        setIsUploading(true);
        for (const file of attachments) {
          const attachment = await uploadFile(file, (progress) => {
            console.log(`Upload progress: ${progress}%`);
          });
          uploadedAttachments.push(attachment);
        }
      }

      if (editingMessage) {
        await editMessage(editingMessage.id, messageText);
        setEditingMessage(null);
      } else {
        await sendMessage({
          content: messageText,
          recipientId: selectedChat,
          recipientName: 'Recipient Name', // Replace with actual recipient name
          groupId: null,
          groupName: null,
          senderId: 'user123', // Replace with actual user ID
          senderName: 'User Name', // Replace with actual user name
          senderRole: 'student', // Replace with actual user role
          type: attachments.length > 0 ? 'file' : 'text',
          attachments: uploadedAttachments,
        });
      }

      setMessageText('');
      setAttachments([]);
      setShowEmojiPicker(false);
    } catch (error) {
      console.error('Failed to send message:', error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleEditMessage = (message: Message) => {
    setEditingMessage(message);
    setMessageText(message.content);
  };

  const handleDeleteMessage = async (messageId: string) => {
    try {
      await deleteMessage(messageId);
    } catch (error) {
      console.error('Failed to delete message:', error);
    }
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setAttachments((prev) => [...prev, ...files]);
  };

  const handleEmojiSelect = (emoji: any) => {
    setMessageText((prev) => prev + emoji.emoji);
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Chat List Sidebar */}
      <div className="w-1/4 bg-white border-r border-gray-200 p-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Chats</h2>
          <div className="flex space-x-2">
            <button
              onClick={() => setShowNewChatModal(true)}
              className="p-2 hover:bg-gray-100 rounded-full"
              title="New Chat"
            >
              <FiPlus />
            </button>
            <button
              onClick={() => setShowNewGroupModal(true)}
              className="p-2 hover:bg-gray-100 rounded-full"
              title="New Group"
            >
              <FiUsers />
            </button>
          </div>
        </div>

        <div className="space-y-2">
          {groups.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <FiMessageSquare className="mx-auto h-8 w-8 mb-2" />
              <p>No conversations yet</p>
              <p className="text-sm">Start a new chat or create a group</p>
            </div>
          ) : (
            groups.map((group) => (
              <div
                key={group.id}
                onClick={() => setSelectedChat(group.id)}
                className={`p-3 rounded-lg cursor-pointer hover:bg-gray-50 ${
                  selectedChat === group.id ? 'bg-blue-50' : ''
                }`}
              >
                <div className="flex items-center space-x-3">
                  {group.avatar ? (
                    <img src={group.avatar} alt={group.name} className="w-10 h-10 rounded-full" />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                      {group.name[0]}
                    </div>
                  )}
                  <div>
                    <h3 className="font-medium">{group.name}</h3>
                    <p className="text-sm text-gray-500">
                      {group.lastMessage?.content || 'No messages yet'}
                    </p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {selectedChat ? (
          <>
            {/* Chat Header */}
            <div className="p-4 border-b border-gray-200 bg-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <h2 className="text-xl font-semibold">
                    {groups.find((g) => g.id === selectedChat)?.name || 'Chat'}
                  </h2>
                  <span className="text-sm text-gray-500">
                    {groups.find((g) => g.id === selectedChat)?.participants.length || 0} members
                  </span>
                </div>
                <button className="p-2 hover:bg-gray-100 rounded-full">
                  <FiMoreVertical />
                </button>
              </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {filteredMessages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.senderId === 'user123' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  <div
                    className={`max-w-[70%] ${
                      message.senderId === 'user123'
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-200 text-gray-900'
                    } rounded-lg p-3 relative group`}
                  >
                    {message.senderId !== 'user123' && (
                      <p className="text-xs text-gray-500 mb-1">{message.senderName}</p>
                    )}
                    <p>{message.content}</p>
                    {message.attachments?.map((attachment) => (
                      <div key={attachment.id} className="mt-2">
                        {attachment.type.startsWith('image') ? (
                          <img
                            src={attachment.url}
                            alt={attachment.name}
                            className="max-w-full rounded"
                          />
                        ) : (
                          <a
                            href={attachment.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-blue-100 underline"
                          >
                            {attachment.name}
                          </a>
                        )}
                      </div>
                    ))}
                    <div className="text-xs mt-1 text-gray-400">
                      {format(new Date(message.timestamp), 'HH:mm')}
                      {message.isEdited && ' (edited)'}
                    </div>
                    {message.senderId === 'user123' && (
                      <div className="absolute right-0 top-0 transform translate-x-full hidden group-hover:flex items-center space-x-1 px-2">
                        <button
                          onClick={() => handleEditMessage(message)}
                          className="p-1 hover:bg-gray-100 rounded"
                        >
                          <FiEdit2 size={14} />
                        </button>
                        <button
                          onClick={() => handleDeleteMessage(message.id)}
                          className="p-1 hover:bg-gray-100 rounded"
                        >
                          <FiTrash2 size={14} />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
              <div ref={messageEndRef} />
            </div>

            {/* Message Input */}
            <div className="p-4 border-t border-gray-200 bg-white">
              {attachments.length > 0 && (
                <div className="mb-2 flex flex-wrap gap-2">
                  {attachments.map((file, index) => (
                    <div
                      key={index}
                      className="bg-gray-100 rounded px-2 py-1 flex items-center space-x-2"
                    >
                      <span className="text-sm">{file.name}</span>
                      <button
                        onClick={() => setAttachments((prev) => prev.filter((_, i) => i !== index))}
                        className="text-gray-500 hover:text-gray-700"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              )}
              <div className="flex items-end space-x-2">
                <div className="flex-1 relative">
                  <textarea
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder={editingMessage ? 'Edit message...' : 'Type a message...'}
                    className="w-full border border-gray-200 rounded-lg px-4 py-2 pr-12 resize-none focus:outline-none focus:border-blue-500"
                    rows={1}
                    style={{ minHeight: '2.5rem', maxHeight: '10rem' }}
                  />
                  <div className="absolute right-2 bottom-2 flex items-center space-x-2">
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      <FiPaperclip />
                    </button>
                    <button
                      onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      <FiSmile />
                    </button>
                  </div>
                  <AnimatePresence>
                    {showEmojiPicker && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute bottom-full right-0 mb-2"
                      >
                        <EmojiPicker onEmojiClick={handleEmojiSelect} />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                <button
                  onClick={handleSendMessage}
                  disabled={isUploading || (!messageText.trim() && attachments.length === 0)}
                  className={`p-2 rounded-full ${
                    isUploading || (!messageText.trim() && attachments.length === 0)
                      ? 'bg-gray-200 text-gray-400'
                      : 'bg-blue-500 text-white hover:bg-blue-600'
                  }`}
                >
                  <FiSend />
                </button>
              </div>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileSelect}
                className="hidden"
                multiple
              />
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-500">
            <div className="text-center">
              <FiMessageSquare className="mx-auto h-12 w-12 mb-4" />
              <h3 className="text-lg font-medium">Your Messages</h3>
              <p className="text-gray-500 mb-4">Select a chat or start a new conversation</p>
              <div className="flex justify-center space-x-4">
                <button
                  onClick={() => setShowNewChatModal(true)}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                  New Chat
                </button>
                <button
                  onClick={() => setShowNewGroupModal(true)}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
                >
                  Create Group
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Modals */}
      <NewChatModal
        isOpen={showNewChatModal}
        onClose={() => setShowNewChatModal(false)}
        onStartChat={handleStartNewChat}
      />
      <NewGroupModal
        isOpen={showNewGroupModal}
        onClose={() => setShowNewGroupModal(false)}
        onCreateGroup={handleCreateGroup}
      />
    </div>
  );
};

export default Messages;
