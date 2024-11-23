import React, { useState } from 'react';
import { Search, Send, Paperclip, MoreVertical, User, Clock, Check, CheckCheck } from 'lucide-react';

interface Message {
  id: string;
  senderId: string;
  senderName: string;
  recipientId: string;
  recipientName: string;
  content: string;
  timestamp: string;
  status: 'sent' | 'delivered' | 'read';
  attachments?: {
    name: string;
    type: string;
    size: string;
  }[];
}

interface Conversation {
  id: string;
  participantId: string;
  participantName: string;
  participantRole: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  online: boolean;
}

const mockConversations: Conversation[] = [
  {
    id: '1',
    participantId: 'student1',
    participantName: 'John Smith',
    participantRole: 'Student',
    lastMessage: 'Thank you for the clarification about the assignment.',
    lastMessageTime: '2023-12-02T14:30:00',
    unreadCount: 2,
    online: true
  },
  {
    id: '2',
    participantId: 'student2',
    participantName: 'Emma Johnson',
    participantRole: 'Student',
    lastMessage: 'When is the deadline for the project submission?',
    lastMessageTime: '2023-12-02T13:15:00',
    unreadCount: 0,
    online: false
  }
];

const mockMessages: Message[] = [
  {
    id: 'm1',
    senderId: 'student1',
    senderName: 'John Smith',
    recipientId: 'instructor1',
    recipientName: 'Dr. Anderson',
    content: 'Hello Dr. Anderson, I have a question about the latest assignment.',
    timestamp: '2023-12-02T14:25:00',
    status: 'read'
  },
  {
    id: 'm2',
    senderId: 'instructor1',
    senderName: 'Dr. Anderson',
    recipientId: 'student1',
    recipientName: 'John Smith',
    content: 'Of course! What would you like to know?',
    timestamp: '2023-12-02T14:27:00',
    status: 'read'
  },
  {
    id: 'm3',
    senderId: 'student1',
    senderName: 'John Smith',
    recipientId: 'instructor1',
    recipientName: 'Dr. Anderson',
    content: 'Thank you for the clarification about the assignment.',
    timestamp: '2023-12-02T14:30:00',
    status: 'delivered'
  }
];

const Messages = () => {
  const [selectedConversation, setSelectedConversation] = useState<string | null>('1');
  const [newMessage, setNewMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'sent':
        return <Check className="w-4 h-4 text-gray-400" />;
      case 'delivered':
        return <CheckCheck className="w-4 h-4 text-gray-400" />;
      case 'read':
        return <CheckCheck className="w-4 h-4 text-blue-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="flex h-[calc(100vh-4rem)] bg-white rounded-lg border border-gray-200">
      {/* Conversations List */}
      <div className="w-1/3 border-r border-gray-200">
        <div className="p-4 border-b border-gray-200">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search conversations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        <div className="overflow-y-auto h-[calc(100%-5rem)]">
          {mockConversations.map((conversation) => (
            <div
              key={conversation.id}
              onClick={() => setSelectedConversation(conversation.id)}
              className={`p-4 cursor-pointer hover:bg-gray-50 ${
                selectedConversation === conversation.id ? 'bg-blue-50' : ''
              }`}
            >
              <div className="flex items-start space-x-3">
                <div className="relative">
                  <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                    <User className="w-6 h-6 text-gray-500" />
                  </div>
                  {conversation.online && (
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium text-gray-900 truncate">
                      {conversation.participantName}
                    </h3>
                    <span className="text-xs text-gray-500">
                      {new Date(conversation.lastMessageTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 truncate">{conversation.lastMessage}</p>
                  {conversation.unreadCount > 0 && (
                    <span className="inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-blue-500 rounded-full">
                      {conversation.unreadCount}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {selectedConversation ? (
          <>
            {/* Chat Header */}
            <div className="p-4 border-b border-gray-200 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                  <User className="w-6 h-6 text-gray-500" />
                </div>
                <div>
                  <h2 className="text-sm font-medium text-gray-900">
                    {mockConversations.find(c => c.id === selectedConversation)?.participantName}
                  </h2>
                  <p className="text-xs text-gray-500">
                    {mockConversations.find(c => c.id === selectedConversation)?.participantRole}
                  </p>
                </div>
              </div>
              <button className="p-2 hover:bg-gray-100 rounded-full">
                <MoreVertical className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {mockMessages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.senderId === 'instructor1' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[70%] rounded-lg p-3 ${
                      message.senderId === 'instructor1'
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-100 text-gray-900'
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                    <div className="flex items-center justify-end space-x-1 mt-1">
                      <span className="text-xs opacity-75">
                        {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                      {message.senderId === 'instructor1' && getStatusIcon(message.status)}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Message Input */}
            <div className="p-4 border-t border-gray-200">
              <div className="flex items-center space-x-2">
                <button className="p-2 hover:bg-gray-100 rounded-full">
                  <Paperclip className="w-5 h-5 text-gray-500" />
                </button>
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type a message..."
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors"
                  disabled={!newMessage.trim()}
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-500">
            Select a conversation to start messaging
          </div>
        )}
      </div>
    </div>
  );
};

export default Messages;
