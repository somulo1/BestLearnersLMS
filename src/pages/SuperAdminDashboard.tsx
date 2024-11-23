import React, { useState, useEffect } from 'react';
import { 
  Menu, 
  X,
  Users as UsersIcon,
  Calendar as CalendarIcon,
  BarChart2,
  Settings as SettingsIcon,
  MessageSquare,
  FileText,
  HelpCircle,
  Home,
  Bell,
  LogOut,
  Book,
  Activity,
  Shield
} from 'lucide-react';
import Modal from '../components/Modal';
import Calendar from './superadmin/Calendar';
import Users from './superadmin/Users';
import Analytics from './superadmin/Analytics';
import Reports from './superadmin/Reports';
import Settings from './superadmin/Settings';
import Messages from './superadmin/Messages';
import Help from './superadmin/Help';
import UserManagement from './superadmin/UserManagement';
import { ResponsiveLine } from '@nivo/line';
import { ResponsivePie } from '@nivo/pie';
import { ResponsiveBar } from '@nivo/bar';

interface SidebarItem {
  id: string;
  icon: React.ElementType;
  label: string;
  component: React.ReactNode;
  modalSize?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
}

const SuperAdminSidebar: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onItemClick: (item: SidebarItem) => void;
  activeItem?: string;
}> = ({ isOpen, onClose, onItemClick, activeItem }) => {
  const sidebarItems: SidebarItem[] = [
    { 
      id: 'overview', 
      icon: Home, 
      label: 'Overview',
      component: null,
    },
    { 
      id: 'users_management', 
      icon: Shield, 
      label: 'User Management',
      component: <UserManagement />,
      modalSize: 'full'
    },
    { 
      id: 'users_list', 
      icon: UsersIcon, 
      label: 'Users List',
      component: <Users />,
      modalSize: '2xl'
    },
    { 
      id: 'calendar', 
      icon: CalendarIcon, 
      label: 'Calendar',
      component: <Calendar />,
      modalSize: 'xl'
    },
    { 
      id: 'analytics', 
      icon: BarChart2, 
      label: 'Analytics',
      component: <Analytics />,
      modalSize: '2xl'
    },
    { 
      id: 'reports', 
      icon: FileText, 
      label: 'Reports',
      component: <Reports />,
      modalSize: '2xl'
    },
    { 
      id: 'messages', 
      icon: MessageSquare, 
      label: 'Messages',
      component: <Messages />,
      modalSize: 'xl'
    },
    { 
      id: 'settings', 
      icon: SettingsIcon, 
      label: 'Settings',
      component: <Settings />,
      modalSize: 'xl'
    },
    { 
      id: 'help', 
      icon: HelpCircle, 
      label: 'Help',
      component: <Help />,
      modalSize: 'lg'
    }
  ];

  return (
    <div className="bg-white h-full w-64 shadow-lg flex flex-col">
      {/* Sidebar Header */}
      <div className="h-16 flex items-center justify-between px-4 border-b">
        <div>
          <h2 className="text-xl font-semibold text-gray-800">SAMS LMS</h2>
          <p className="text-sm text-gray-500">Super Admin Portal</p>
        </div>
        <button
          onClick={onClose}
          className="p-2 rounded-md text-gray-500 hover:text-gray-600 lg:hidden"
        >
          <X className="h-6 w-6" />
        </button>
      </div>

      {/* Sidebar Navigation */}
      <nav className="flex-1 overflow-y-auto py-4 px-3">
        <div className="space-y-1">
          {sidebarItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onItemClick(item)}
              className={`w-full flex items-center px-3 py-2 rounded-lg transition-colors duration-150 ${
                activeItem === item.id
                  ? 'bg-indigo-50 text-indigo-600'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <item.icon className="h-5 w-5 mr-3" />
              <span className="text-sm font-medium">{item.label}</span>
            </button>
          ))}
        </div>
      </nav>

      {/* Sidebar Footer */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center">
            <span className="text-sm font-medium">SA</span>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-900">Super Admin</p>
            <p className="text-xs text-gray-500">admin@samslms.com</p>
          </div>
        </div>
        <button className="mt-4 w-full flex items-center px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors duration-150">
          <LogOut className="h-4 w-4 mr-2" />
          Sign Out
        </button>
      </div>
    </div>
  );
};

const SuperAdminDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth >= 1024);
  const [activeItem, setActiveItem] = useState<string>('overview');
  const [activeModal, setActiveModal] = useState<SidebarItem | null>(null);
  const [selectedMetric, setSelectedMetric] = useState('overview');

  // Close sidebar on mobile when window resizes
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setSidebarOpen(false);
      } else {
        setSidebarOpen(true);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleSidebarItemClick = (item: SidebarItem) => {
    setActiveItem(item.id);
    if (item.id !== 'overview' && item.component) {
      setActiveModal(item);
    } else {
      setActiveModal(null);
    }
    
    // Close sidebar on mobile when item is clicked
    if (window.innerWidth < 1024) {
      setSidebarOpen(false);
    }
  };

  const generateTimeSeriesData = () => {
    // Mock time series data
    return Array.from({ length: 10 }, (_, i) => ({
      x: `Day ${i + 1}`,
      y: Math.floor(Math.random() * 100)
    }));
  };

  const generateCourseEnrollmentData = () => {
    // Mock course enrollment data
    return [
      { id: 'Programming', value: 35 },
      { id: 'Mathematics', value: 25 },
      { id: 'Science', value: 20 },
      { id: 'Languages', value: 15 },
      { id: 'Arts', value: 5 }
    ];
  };

  const recentActivities = [
    { id: 1, user: 'John Doe', action: 'Completed Python Course', timestamp: '5 mins ago', type: 'course' },
    { id: 2, user: 'Jane Smith', action: 'System Update', timestamp: '30 mins ago', type: 'system' },
    { id: 3, user: 'Mike Brown', action: 'Added new instructor', timestamp: '1 hour ago', type: 'user' },
    { id: 4, user: 'Emily Davis', action: 'Generated reports', timestamp: '2 hours ago', type: 'report' }
  ];

  const theme = {
    background: 'transparent',
    textColor: '#333333',
    fontSize: 11,
    axis: {
      domain: {
        line: {
          stroke: '#777777',
          strokeWidth: 1
        }
      },
      ticks: {
        line: {
          stroke: '#777777',
          strokeWidth: 1
        }
      }
    },
    grid: {
      line: {
        stroke: '#dddddd',
        strokeWidth: 1
      }
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className={`fixed left-0 top-0 h-full z-30 transform transition-transform duration-300 ease-in-out ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } lg:translate-x-0`}>
        <SuperAdminSidebar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          onItemClick={handleSidebarItemClick}
          activeItem={activeItem}
        />
      </div>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content Area */}
      <div className={`flex-1 flex flex-col ${sidebarOpen ? 'lg:ml-64' : 'ml-0'} transition-all duration-300 ease-in-out`}>
        {/* Top Navigation Bar */}
        <nav className="bg-white shadow-sm h-16 fixed w-full z-20">
          <div className="px-4 h-full flex items-center justify-between">
            <div className="flex items-center">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-2 rounded-md text-gray-500 hover:text-gray-600 hover:bg-gray-100 focus:outline-none lg:hidden"
                aria-label="Toggle sidebar"
              >
                {sidebarOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
              <span className="ml-4 text-xl font-semibold text-gray-900">SUPER-ADMIN</span>
            </div>
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-500 hover:text-gray-600 hover:bg-gray-100 rounded-lg">
                <Bell className="h-6 w-6" />
              </button>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <div className="flex-1 overflow-auto pt-16">
          {activeItem === 'overview' && (
            <main className="p-4 md:p-6 max-w-7xl mx-auto w-full">
              {/* Quick Stats Section - Responsive grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <div className="bg-white p-4 md:p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                  <h3 className="text-sm font-semibold text-gray-600">Total Users</h3>
                  <p className="text-2xl font-bold text-blue-600 mt-2">12,458</p>
                  <p className="text-xs text-gray-500 mt-1">↑ 12% from last month</p>
                </div>
                <div className="bg-white p-4 md:p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                  <h3 className="text-sm font-semibold text-gray-600">Active Courses</h3>
                  <p className="text-2xl font-bold text-green-600 mt-2">245</p>
                  <p className="text-xs text-gray-500 mt-1">↑ 8% from last month</p>
                </div>
                <div className="bg-white p-4 md:p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                  <h3 className="text-sm font-semibold text-gray-600">Completion Rate</h3>
                  <p className="text-2xl font-bold text-purple-600 mt-2">78%</p>
                  <p className="text-xs text-gray-500 mt-1">↑ 5% from last month</p>
                </div>
                <div className="bg-white p-4 md:p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                  <h3 className="text-sm font-semibold text-gray-600">Revenue</h3>
                  <p className="text-2xl font-bold text-orange-600 mt-2">$124.5K</p>
                  <p className="text-xs text-gray-500 mt-1">↑ 15% from last month</p>
                </div>
              </div>

              {/* Main Dashboard Grid - Improved responsive layout */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Activity Chart - Spans 2 columns */}
                <div className="lg:col-span-2 bg-white p-4 md:p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0 mb-6">
                    <h2 className="text-lg font-semibold text-gray-800">User Activity</h2>
                    <select
                      value={selectedMetric}
                      onChange={(e) => setSelectedMetric(e.target.value)}
                      className="w-full sm:w-auto text-sm px-3 py-1 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="overview">Overview</option>
                      <option value="enrollment">Enrollment</option>
                      <option value="performance">Performance</option>
                    </select>
                  </div>
                  <div className="h-[300px] w-full">
                    <ResponsiveLine
                      data={[{ id: 'activity', data: generateTimeSeriesData() }]}
                      margin={{ top: 10, right: 20, bottom: 40, left: 40 }}
                      xScale={{ type: 'point' }}
                      yScale={{ type: 'linear', min: 0, max: 100 }}
                      theme={theme}
                      enablePoints={false}
                      enableGridX={false}
                      curve="monotoneX"
                      axisBottom={{
                        tickRotation: -45,
                        tickPadding: 5,
                        truncateTickAt: 0
                      }}
                    />
                  </div>
                </div>

                {/* Course Distribution */}
                <div className="bg-white p-4 md:p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                  <h2 className="text-lg font-semibold text-gray-800 mb-6">Course Distribution</h2>
                  <div className="h-[300px] w-full">
                    <ResponsivePie
                      data={generateCourseEnrollmentData()}
                      margin={{ top: 20, right: 20, bottom: 40, left: 20 }}
                      innerRadius={0.5}
                      padAngle={0.7}
                      cornerRadius={3}
                      theme={theme}
                      enableArcLinkLabels={true}
                      arcLinkLabelsSkipAngle={10}
                      arcLinkLabelsTextColor="#333333"
                      arcLinkLabelsThickness={2}
                      arcLinkLabelsColor={{ from: 'color' }}
                      legends={[
                        {
                          anchor: 'bottom',
                          direction: 'row',
                          justify: false,
                          translateX: 0,
                          translateY: 30,
                          itemsSpacing: 0,
                          itemWidth: 80,
                          itemHeight: 20,
                          itemTextColor: '#999',
                          itemDirection: 'left-to-right',
                          symbolSize: 12,
                          symbolShape: 'circle'
                        }
                      ]}
                    />
                  </div>
                </div>

                {/* Recent Activity List */}
                <div className="lg:col-span-2 bg-white rounded-lg shadow-sm">
                  <div className="p-4 border-b">
                    <h2 className="text-lg font-semibold text-gray-800">Recent Activity</h2>
                  </div>
                  <div className="overflow-auto max-h-[400px]">
                    <ul className="divide-y divide-gray-200">
                      {recentActivities.map((activity) => (
                        <li key={activity.id} className="p-4 hover:bg-gray-50">
                          <div className="flex items-center space-x-4">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center
                              ${activity.type === 'course' ? 'bg-blue-100 text-blue-600' :
                                activity.type === 'system' ? 'bg-yellow-100 text-yellow-600' :
                                activity.type === 'user' ? 'bg-green-100 text-green-600' :
                                'bg-purple-100 text-purple-600'}`}>
                              {activity.type === 'course' ? <Book className="h-4 w-4" /> :
                               activity.type === 'system' ? <Activity className="h-4 w-4" /> :
                               activity.type === 'user' ? <UsersIcon className="h-4 w-4" /> :
                               <BarChart2 className="h-4 w-4" />}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-gray-900">{activity.user}</p>
                              <p className="text-sm text-gray-500">{activity.action}</p>
                            </div>
                            <div className="text-sm text-gray-500">{activity.timestamp}</div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Performance Metrics */}
                <div className="bg-white p-4 md:p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                  <h2 className="text-lg font-semibold text-gray-800 mb-6">Performance Metrics</h2>
                  <div className="h-[300px] w-full">
                    <ResponsiveBar
                      data={[
                        { metric: 'Completion', value: 85 },
                        { metric: 'Engagement', value: 72 },
                        { metric: 'Satisfaction', value: 90 },
                        { metric: 'Progress', value: 68 }
                      ]}
                      keys={['value']}
                      indexBy="metric"
                      margin={{ top: 10, right: 10, bottom: 40, left: 40 }}
                      padding={0.3}
                      theme={theme}
                      axisBottom={{ tickRotation: -45 }}
                      labelSkipWidth={12}
                      labelSkipHeight={12}
                    />
                  </div>
                </div>
              </div>
            </main>
          )}
        </div>
      </div>

      {/* Modal */}
      {activeModal && activeModal.component && (
        <Modal
          isOpen={true}
          onClose={() => setActiveModal(null)}
          title={activeModal.label}
          size={activeModal.modalSize || '2xl'}
        >
          {activeModal.component}
        </Modal>
      )}
    </div>
  );
};

export default SuperAdminDashboard;
