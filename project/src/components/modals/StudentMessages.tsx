import React, { useState } from 'react';
import { MessageCircle, Search, Send, Paperclip, User, Users } from 'lucide-react';
import Modal from '../Modal';

interface StudentMessagesProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Message {
  id: number;
  sender: string;
  content: string;
  timestamp: string;
  isOwn?: boolean;
}

interface Chat {
  id: number;
  name: string;
  lastMessage: string;
  timestamp: string;
  unread: number;
  isGroup?: boolean;
}

const StudentMessages: React.FC<StudentMessagesProps> = ({ isOpen, onClose }) => {
  const [selectedChat, setSelectedChat] = useState<number | null>(null);
  const [messageInput, setMessageInput] = useState('');

  const chats: Chat[] = [
    {
      id: 1,
      name: 'Mathematics Group',
      lastMessage: 'Does anyone have the notes from last class?',
      timestamp: '10:30 AM',
      unread: 3,
      isGroup: true,
    },
    {
      id: 2,
      name: 'Prof. Johnson',
      lastMessage: 'Your assignment has been graded',
      timestamp: '9:15 AM',
      unread: 1,
    },
    // Add more chats as needed
  ];

  const messages: Message[] = [
    {
      id: 1,
      sender: 'Prof. Johnson',
      content: 'Your assignment has been graded. Please check the feedback.',
      timestamp: '9:15 AM',
    },
    {
      id: 2,
      sender: 'You',
      content: "Thank you, professor. I'll review it right away.",
      timestamp: '9:20 AM',
      isOwn: true,
    },
    // Add more messages as needed
  ];

  const handleSendMessage = () => {
    if (messageInput.trim()) {
      // Add message sending logic here
      setMessageInput('');
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Messages" size="2xl">
      <div className="flex h-[600px]">
        {/* Chat List */}
        <div className="w-1/3 border-r border-gray-200 overflow-y-auto">
          <div className="p-4">
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search messages..."
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div className="space-y-2">
              {chats.map((chat) => (
                <button
                  key={chat.id}
                  onClick={() => setSelectedChat(chat.id)}
                  className={`w-full p-3 rounded-lg hover:bg-gray-50 transition-colors ${
                    selectedChat === chat.id ? 'bg-indigo-50' : ''
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    <div className="p-2 bg-gray-100 rounded-full">
                      {chat.isGroup ? (
                        <Users className="w-5 h-5 text-gray-600" />
                      ) : (
                        <User className="w-5 h-5 text-gray-600" />
                      )}
                    </div>
                    <div className="flex-1 text-left">
                      <div className="flex justify-between items-start">
                        <h4 className="font-medium text-gray-900">{chat.name}</h4>
                        <span className="text-xs text-gray-500">{chat.timestamp}</span>
                      </div>
                      <p className="text-sm text-gray-500 truncate">{chat.lastMessage}</p>
                      {chat.unread > 0 && (
                        <span className="inline-flex items-center justify-center w-5 h-5 text-xs font-medium bg-indigo-600 text-white rounded-full">
                          {chat.unread}
                        </span>
                      )}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col">
          {selectedChat ? (
            <>
              {/* Messages */}
              <div className="flex-1 p-4 overflow-y-auto">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.isOwn ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[70%] rounded-lg p-3 ${
                          message.isOwn
                            ? 'bg-indigo-600 text-white'
                            : 'bg-gray-100 text-gray-900'
                        }`}
                      >
                        {!message.isOwn && (
                          <p className="text-xs font-medium mb-1">{message.sender}</p>
                        )}
                        <p className="text-sm">{message.content}</p>
                        <p className="text-xs mt-1 opacity-70">{message.timestamp}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Message Input */}
              <div className="p-4 border-t border-gray-200">
                <div className="flex items-center space-x-2">
                  <button className="p-2 text-gray-400 hover:text-indigo-600 transition-colors">
                    <Paperclip className="w-5 h-5" />
                  </button>
                  <input
                    type="text"
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    placeholder="Type a message..."
                    className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  />
                  <button
                    onClick={handleSendMessage}
                    className="p-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <MessageCircle className="mx-auto h-12 w-12 text-gray-400" />
                <p className="mt-2 text-gray-500">Select a chat to start messaging</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default StudentMessages;
