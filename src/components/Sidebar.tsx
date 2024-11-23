import React from 'react';
import { 
  BookOpen,
  ClipboardList,
  GraduationCap,
  Users,
  CheckSquare,
  FileText,
  MessageSquare,
  BarChart2,
  Calendar,
  Bell,
  Settings,
  HelpCircle,
  X
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onItemClick: (itemId: string) => void;
  role?: 'instructor' | 'student' | 'admin';
}

const instructorItems = [
  { id: 'courses', icon: BookOpen, label: 'Courses' },
  { id: 'assignments', icon: ClipboardList, label: 'Assignments' },
  { id: 'assessments', icon: GraduationCap, label: 'Assessments' },
  { id: 'students', icon: Users, label: 'Students' },
  { id: 'gradebook', icon: CheckSquare, label: 'Grade Book' },
  { id: 'resources', icon: FileText, label: 'Resources' },
  { id: 'discussions', icon: MessageSquare, label: 'Discussions' },
  { id: 'analytics', icon: BarChart2, label: 'Analytics' },
  { id: 'calendar', icon: Calendar, label: 'Calendar' },
  { id: 'announcements', icon: Bell, label: 'Announcements' },
  { id: 'settings', icon: Settings, label: 'Settings' },
  { id: 'help', icon: HelpCircle, label: 'Help' }
];

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose, onItemClick, role = 'instructor' }) => {
  const sidebarItems = role === 'instructor' ? instructorItems : [];

  return (
    <div className="bg-white h-full w-64 shadow-lg flex flex-col">
      {/* Sidebar Header */}
      <div className="h-16 flex items-center justify-between px-4 border-b">
        <h2 className="text-xl font-semibold text-gray-800">Dashboard</h2>
        <button
          onClick={onClose}
          className="p-2 rounded-md text-gray-500 hover:text-gray-600 lg:hidden"
        >
          <X className="h-6 w-6" />
        </button>
      </div>

      {/* Sidebar Navigation */}
      <nav className="flex-1 overflow-auto py-4">
        <ul className="space-y-1">
          {sidebarItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => onItemClick(item.id)}
                className="w-full flex items-center px-4 py-2 text-gray-600 hover:bg-gray-100 hover:text-gray-900 rounded-lg transition-colors duration-150"
              >
                <item.icon className="h-5 w-5 mr-3" />
                <span className="text-sm font-medium">{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Sidebar Footer */}
      <div className="p-4 border-t">
        <div className="flex items-center">
          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
            <GraduationCap className="h-4 w-4 text-blue-600" />
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-700">Dr. Smith</p>
            <p className="text-xs text-gray-500">Computer Science</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;