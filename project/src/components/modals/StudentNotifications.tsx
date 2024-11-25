import React from 'react';
import { Bell, BookOpen, Calendar, FileText, MessageCircle } from 'lucide-react';
import Modal from '../Modal';

interface StudentNotificationsProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Notification {
  id: number;
  type: 'assignment' | 'course' | 'message' | 'schedule';
  title: string;
  description: string;
  timestamp: string;
  read: boolean;
}

const StudentNotifications: React.FC<StudentNotificationsProps> = ({ isOpen, onClose }) => {
  const notifications: Notification[] = [
    {
      id: 1,
      type: 'assignment',
      title: 'New Assignment Posted',
      description: 'Mathematics Assignment 3 has been posted. Due date: Next Friday',
      timestamp: '2 hours ago',
      read: false,
    },
    {
      id: 2,
      type: 'message',
      title: 'New Message from Prof. Johnson',
      description: 'Regarding your last assignment submission...',
      timestamp: '3 hours ago',
      read: false,
    },
    {
      id: 3,
      type: 'schedule',
      title: 'Class Schedule Update',
      description: 'Physics lab has been rescheduled to Thursday',
      timestamp: '1 day ago',
      read: true,
    },
    {
      id: 4,
      type: 'course',
      title: 'New Course Material',
      description: 'New study materials have been uploaded for Chemistry',
      timestamp: '2 days ago',
      read: true,
    },
  ];

  const getIcon = (type: Notification['type']) => {
    switch (type) {
      case 'assignment':
        return FileText;
      case 'course':
        return BookOpen;
      case 'message':
        return MessageCircle;
      case 'schedule':
        return Calendar;
      default:
        return Bell;
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Notifications" size="xl">
      <div className="space-y-6">
        {/* Filter Tabs */}
        <div className="flex space-x-2 border-b border-gray-200">
          <button className="px-4 py-2 text-sm font-medium text-indigo-600 border-b-2 border-indigo-600">
            All
          </button>
          <button className="px-4 py-2 text-sm font-medium text-gray-500 hover:text-gray-700">
            Unread
          </button>
          <button className="px-4 py-2 text-sm font-medium text-gray-500 hover:text-gray-700">
            Important
          </button>
        </div>

        {/* Notifications List */}
        <div className="space-y-4">
          {notifications.map((notification) => {
            const Icon = getIcon(notification.type);
            return (
              <div
                key={notification.id}
                className={`flex items-start space-x-4 p-4 rounded-lg ${
                  notification.read ? 'bg-white' : 'bg-indigo-50'
                }`}
              >
                <div className={`p-2 rounded-lg ${
                  notification.read ? 'bg-gray-100' : 'bg-indigo-100'
                }`}>
                  <Icon className={`w-5 h-5 ${
                    notification.read ? 'text-gray-600' : 'text-indigo-600'
                  }`} />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <h4 className={`font-medium ${
                      notification.read ? 'text-gray-900' : 'text-indigo-900'
                    }`}>
                      {notification.title}
                    </h4>
                    <span className="text-xs text-gray-500">{notification.timestamp}</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{notification.description}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Actions */}
        <div className="flex justify-between items-center pt-4 border-t border-gray-200">
          <button className="text-sm text-gray-600 hover:text-indigo-600">
            Mark all as read
          </button>
          <button className="text-sm text-gray-600 hover:text-indigo-600">
            Clear all notifications
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default StudentNotifications;
