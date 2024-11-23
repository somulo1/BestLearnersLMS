import React from 'react';
import {
  BarChart2,
  FileText,
  Users,
  DollarSign,
  BookOpen,
  AlertCircle,
  CheckCircle,
  Settings,
  HelpCircle,
  User,
  Clock,
  Calendar,
  Shield,
  Menu,
  X,
  FileSearch,
  BookCheck
} from 'lucide-react';

interface AuditorSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onToggle: () => void;
  onItemClick: (itemId: string) => void;
}

const auditorItems = [
  { id: 'overview', icon: BarChart2, label: 'Dashboard Overview' },
  { id: 'financial', icon: DollarSign, label: 'Financial Audits' },
  { id: 'academic', icon: BookOpen, label: 'Academic Compliance' },
  { id: 'users', icon: Users, label: 'User Access Audit' },
  { id: 'reports', icon: FileText, label: 'Audit Reports' },
  { id: 'compliance', icon: Shield, label: 'Compliance Tracking' },
  { id: 'incidents', icon: AlertCircle, label: 'Incident Reports' },
  { id: 'reviews', icon: CheckCircle, label: 'System Reviews' },
  { id: 'documentation', icon: FileSearch, label: 'Documentation' },
  { id: 'schedule', icon: Calendar, label: 'Audit Schedule' },
  { id: 'logs', icon: Clock, label: 'Activity Logs' },
  { id: 'settings', icon: Settings, label: 'Audit Settings' },
  { id: 'help', icon: HelpCircle, label: 'Help & Support' }
];

const AuditorSidebar: React.FC<AuditorSidebarProps> = ({
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

      {/* Mobile Overlay */}
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
        <div className="h-16 flex items-center justify-between px-4 border-b bg-blue-600">
          <div className="flex items-center">
            <Shield className="h-6 w-6 text-white" />
            <h2 className="text-xl font-semibold text-white ml-2">Auditor Portal</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-md text-white hover:text-gray-200 md:hidden"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Sidebar Navigation */}
        <nav className="flex-1 overflow-y-auto py-4 px-2">
          <ul className="space-y-1">
            {auditorItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => {
                    onItemClick(item.id);
                    if (window.innerWidth < 768) onClose();
                  }}
                  className="w-full flex items-center px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-700 rounded-lg transition-colors duration-150"
                >
                  <item.icon className="h-5 w-5 mr-3 flex-shrink-0" />
                  <span className="text-sm font-medium truncate">{item.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Sidebar Footer */}
        <div className="p-4 border-t bg-gray-50">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
              <User className="h-4 w-4 text-blue-600" />
            </div>
            <div className="ml-3 min-w-0">
              <p className="text-sm font-medium text-gray-700 truncate">System Auditor</p>
              <p className="text-xs text-gray-500 truncate">External Access</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AuditorSidebar;
