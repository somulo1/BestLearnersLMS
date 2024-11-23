import React from 'react';
import {
  BookOpen, Calendar, Bell, MessageSquare, FileText, 
  BarChart2, Settings, HelpCircle, User, DollarSign, 
  Clock, Award, X, Menu
} from 'lucide-react';

interface ParentSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onToggle: () => void;
  onItemClick: (itemId: string) => void;
}

const parentItems = [
  { id: 'overview', icon: BarChart2, label: 'Overview' },
  { id: 'academics', icon: BookOpen, label: 'Academic Progress' },
  { id: 'attendance', icon: Clock, label: 'Attendance' },
  { id: 'behavior', icon: Award, label: 'Behavior & Discipline' },
  { id: 'assignments', icon: FileText, label: 'Assignments & Homework' },
  { id: 'calendar', icon: Calendar, label: 'School Calendar' },
  { id: 'communication', icon: MessageSquare, label: 'Communication' },
  { id: 'announcements', icon: Bell, label: 'Announcements' },
  { id: 'fees', icon: DollarSign, label: 'Fees & Payments' },
  { id: 'settings', icon: Settings, label: 'Settings' },
  { id: 'help', icon: HelpCircle, label: 'Help & Support' }
];

const ParentSidebar: React.FC<ParentSidebarProps> = ({ 
  isOpen, 
  onClose, 
  onToggle,
  onItemClick 
}) => {
  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={onToggle}
        className="fixed top-4 left-4 p-2 rounded-md bg-white shadow-md text-gray-600 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 md:hidden z-50"
      >
        <Menu className="h-6 w-6" />
      </button>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 md:hidden z-40"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
          fixed top-0 left-0 h-screen
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          md:translate-x-0
          bg-white shadow-lg flex flex-col
          w-72 md:w-64
          z-50
        `}
      >
        {/* Sidebar Header */}
        <div className="h-16 flex items-center justify-between px-4 border-b">
          <h2 className="text-xl font-semibold text-gray-800">Parent Portal</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-md text-gray-500 hover:text-gray-600 md:hidden"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Sidebar Navigation */}
        <nav className="flex-1 overflow-y-auto py-4 px-2">
          <ul className="space-y-1">
            {parentItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => {
                    onItemClick(item.id);
                    if (window.innerWidth < 768) onClose(); // Close sidebar on mobile after item click
                  }}
                  className="w-full flex items-center px-4 py-3 text-gray-600 hover:bg-gray-100 hover:text-gray-900 rounded-lg transition-colors duration-150"
                >
                  <item.icon className="h-5 w-5 mr-3 flex-shrink-0" />
                  <span className="text-sm font-medium truncate">{item.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Sidebar Footer */}
        <div className="p-4 border-t">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
              <User className="h-4 w-4 text-blue-600" />
            </div>
            <div className="ml-3 min-w-0">
              <p className="text-sm font-medium text-gray-700 truncate">Parent Account</p>
              <p className="text-xs text-gray-500 truncate">John Smith Sr.</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ParentSidebar;
