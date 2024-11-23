import React, { useState } from 'react';
import { ResponsiveBar } from '@nivo/bar';
import { ResponsiveLine } from '@nivo/line';
import { ResponsivePie } from '@nivo/pie';
import { ResponsiveHeatMap } from '@nivo/heatmap';
import { ResponsiveScatterPlot } from '@nivo/scatterplot';
import { ResponsiveTreeMap } from '@nivo/treemap';
import { ResponsiveNetwork } from '@nivo/network';
import { ResponsiveBubble } from '@nivo/circle-packing';
import { ResponsiveRadar } from '@nivo/radar';
import { 
  Bell, 
  Menu,
  Home,
  BookOpen,
  Users,
  Calendar as CalendarIcon,
  BarChart2,
  MessageSquare,
  Settings as SettingsIcon,
  HelpCircle,
  Shield,
  GraduationCap,
  Activity,
  FileText,
  Database,
  UserCheck
} from 'lucide-react';
import Modal from '../components/Modal';
import Help from '../components/features/Help';
import Messages from '../components/features/Messages';
import Settings from '../components/features/Settings';
import Calendar from '../components/features/Calendar';

// Mock data generators
const generateTimeData = () => {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
  const hours = Array.from({ length: 24 }, (_, i) => i);
  return days.map(day => ({
    id: day,
    data: hours.map(hour => ({
      x: `${hour}h`,
      y: Math.floor(Math.random() * 100)
    }))
  }));
};

const generateStreamData = () => {
  return Array.from({ length: 12 }, (_, i) => ({
    CS: Math.floor(Math.random() * 50) + 50,
    Business: Math.floor(Math.random() * 40) + 40,
    Engineering: Math.floor(Math.random() * 30) + 30
  }));
};

const generateBoxPlotData = () => [
  {
    group: 'CS101',
    subgroup: 'A',
    value: Array.from({ length: 50 }, () => Math.floor(Math.random() * 30) + 70)
  },
  {
    group: 'BUS200',
    subgroup: 'A',
    value: Array.from({ length: 50 }, () => Math.floor(Math.random() * 30) + 65)
  },
  {
    group: 'ENG150',
    subgroup: 'A',
    value: Array.from({ length: 50 }, () => Math.floor(Math.random() * 30) + 75)
  }
];

const AdminDashboard: React.FC = () => {
  const [selectedView, setSelectedView] = useState('overview');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTimeframe, setSelectedTimeframe] = useState('week');

  // Navigation items
  const navigationItems = [
    { id: 'overview', icon: Home, label: 'Overview' },
    { id: 'courses', icon: BookOpen, label: 'Courses' },
    { id: 'users', icon: Users, label: 'Users' },
    { id: 'calendar', icon: CalendarIcon, label: 'Calendar' },
    { id: 'reports', icon: BarChart2, label: 'Reports' },
    { id: 'messages', icon: MessageSquare, label: 'Messages' },
    { id: 'settings', icon: SettingsIcon, label: 'Settings' },
    { id: 'help', icon: HelpCircle, label: 'Help' }
  ];

  // Quick stats data
  const quickStats = [
    { id: 1, name: 'Total Students', stat: '1,234', change: '12%', changeType: 'increase', icon: Users },
    { id: 2, name: 'Active Courses', stat: '56', change: '8%', changeType: 'increase', icon: BookOpen },
    { id: 3, name: 'Completion Rate', stat: '92%', change: '5%', changeType: 'increase', icon: BarChart2 },
    { id: 4, name: 'Total Revenue', stat: '$124.5K', change: '15%', changeType: 'increase', icon: Bell },
    { id: 5, name: 'Average Grade', stat: '85%', change: '3%', changeType: 'increase', icon: BarChart2 },
    { id: 6, name: 'Active Users', stat: '856', change: '10%', changeType: 'increase', icon: Users }
  ];

  const handleNavigation = (itemId: string) => {
    setSelectedView(itemId);
    if (itemId !== 'overview') {
      setActiveModal(itemId);
      setIsModalOpen(true);
    } else {
      setActiveModal(null);
      setIsModalOpen(false);
    }
    if (window.innerWidth < 768) {
      setSidebarOpen(false);
    }
  };

  const handleSidebarItemClick = (itemId: string) => {
    setSelectedView(itemId);
    if (itemId !== 'overview') {
      setActiveModal(itemId);
      setIsModalOpen(true);
    } else {
      setActiveModal(null);
    }
  };

  // Common chart theme
  const theme = {
    background: '#ffffff',
    textColor: '#333333',
    fontSize: 12,
    axis: {
      domain: { line: { stroke: '#777777', strokeWidth: 1 } },
      ticks: { line: { stroke: '#777777', strokeWidth: 1 } }
    },
    grid: { line: { stroke: '#dddddd', strokeWidth: 1 } }
  };

  // Chart data
  const barData = [
    { course: 'CS101', completed: 85, ongoing: 15 },
    { course: 'BUS200', completed: 75, ongoing: 25 },
    { course: 'ENG150', completed: 90, ongoing: 10 },
    { course: 'MATH101', completed: 70, ongoing: 30 }
  ];

  const lineData = [
    {
      id: "Daily Active Users",
      data: [
        { x: "Mon", y: 150 },
        { x: "Tue", y: 180 },
        { x: "Wed", y: 210 },
        { x: "Thu", y: 190 },
        { x: "Fri", y: 170 }
      ]
    }
  ];

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const renderModalContent = () => {
    switch (activeModal) {
      case 'help':
        return (
          <Modal isOpen={isModalOpen} onClose={closeModal} title="Help Center" size="lg">
            <div className="p-4">
              <Help />
            </div>
          </Modal>
        );
      case 'messages':
        return (
          <Modal isOpen={isModalOpen} onClose={closeModal} title="Messages" size="xl">
            <div className="p-4">
              <Messages />
            </div>
          </Modal>
        );
      case 'settings':
        return (
          <Modal isOpen={isModalOpen} onClose={closeModal} title="Settings" size="lg">
            <div className="p-4">
              <Settings />
            </div>
          </Modal>
        );
      case 'calendar':
        return (
          <Modal isOpen={isModalOpen} onClose={closeModal} title="Calendar" size="2xl">
            <div className="p-4 h-[calc(100vh-200px)]">
              <Calendar />
            </div>
          </Modal>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Admin Sidebar */}
      <aside 
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:relative lg:translate-x-0`}
      >
        {/* Sidebar Header */}
        <div className="h-16 flex items-center justify-between px-4 border-b bg-blue-600">
          <div className="flex items-center">
            <Shield className="h-6 w-6 text-white" />
            <h2 className="text-xl font-semibold text-white ml-2">Admin Portal</h2>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="p-2 rounded-md text-white hover:text-gray-200 lg:hidden"
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 overflow-y-auto">
          <ul className="space-y-1 p-4">
            {navigationItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => handleNavigation(item.id)}
                  className={`w-full flex items-center px-4 py-3 rounded-lg transition-colors duration-150 ${
                    selectedView === item.id
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <item.icon className="h-5 w-5 mr-3" />
                  <span className="text-sm font-medium">{item.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Sidebar Footer */}
        <div className="p-4 border-t bg-gray-50">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
              <GraduationCap className="h-4 w-4 text-blue-600" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-700">Admin User</p>
              <p className="text-xs text-gray-500">System Administrator</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        {/* Header */}
        <header className="sticky top-0 z-30 bg-white shadow-sm">
          <div className="flex items-center justify-between h-16 px-4 md:px-6">
            <div className="flex items-center">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-2 rounded-md text-gray-600 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 lg:hidden"
              >
                <Menu className="h-6 w-6" />
              </button>
              <h1 className="ml-4 text-2xl font-semibold text-gray-900">Admin Dashboard</h1>
            </div>
            <div className="flex items-center space-x-4">
              <select
                value={selectedTimeframe}
                onChange={(e) => setSelectedTimeframe(e.target.value)}
                className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="day">Today</option>
                <option value="week">This Week</option>
                <option value="month">This Month</option>
                <option value="year">This Year</option>
              </select>
              <button className="p-2 rounded-md text-gray-600 hover:text-gray-900">
                <Bell className="h-6 w-6" />
              </button>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="p-6">
          {/* Quick Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            {quickStats.map((stat) => (
              <div key={stat.id} className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                    <p className="mt-1 text-3xl font-semibold text-gray-900">{stat.stat}</p>
                  </div>
                  <div className={`p-3 rounded-full ${
                    stat.changeType === 'increase' ? 'bg-green-100' : 'bg-red-100'
                  }`}>
                    <stat.icon className={`h-6 w-6 ${
                      stat.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
                    }`} />
                  </div>
                </div>
                <div className="mt-4">
                  <span className={`text-sm font-medium ${
                    stat.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {stat.change}
                  </span>
                  <span className="text-sm text-gray-600"> vs last period</span>
                </div>
              </div>
            ))}
          </div>

          {/* Charts Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Bar Chart - Course Completion */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Course Completion Rates</h3>
              <div className="h-80">
                <ResponsiveBar
                  data={barData}
                  keys={['completed', 'ongoing']}
                  indexBy="course"
                  margin={{ top: 20, right: 30, bottom: 50, left: 60 }}
                  padding={0.3}
                  colors={{ scheme: 'nivo' }}
                  theme={theme}
                  axisLeft={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: 'percentage',
                    legendPosition: 'middle',
                    legendOffset: -40
                  }}
                />
              </div>
            </div>

            {/* Line Chart - User Activity */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Daily Active Users</h3>
              <div className="h-80">
                <ResponsiveLine
                  data={lineData}
                  margin={{ top: 20, right: 30, bottom: 50, left: 60 }}
                  xScale={{ type: 'point' }}
                  yScale={{ type: 'linear', min: 'auto', max: 'auto' }}
                  curve="cardinal"
                  axisTop={null}
                  axisRight={null}
                  theme={theme}
                  pointSize={10}
                  pointColor={{ theme: 'background' }}
                  pointBorderWidth={2}
                  pointBorderColor={{ from: 'serieColor' }}
                  enableArea={true}
                  areaOpacity={0.15}
                />
              </div>
            </div>

            {/* Heatmap - Activity by Time */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Activity Heatmap</h3>
              <div className="h-80">
                <ResponsiveHeatMap
                  data={generateTimeData()}
                  margin={{ top: 20, right: 30, bottom: 60, left: 60 }}
                  axisTop={null}
                  axisRight={null}
                  theme={theme}
                  colors={{
                    type: 'sequential',
                    scheme: 'blues'
                  }}
                />
              </div>
            </div>

            {/* Pie Chart - Course Distribution */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Course Distribution</h3>
              <div className="h-80">
                <ResponsivePie
                  data={[
                    { id: 'CS', value: 35, color: 'hsl(207, 70%, 50%)' },
                    { id: 'Business', value: 25, color: 'hsl(17, 70%, 50%)' },
                    { id: 'Engineering', value: 20, color: 'hsl(127, 70%, 50%)' },
                    { id: 'Arts', value: 15, color: 'hsl(47, 70%, 50%)' },
                    { id: 'Others', value: 5, color: 'hsl(287, 70%, 50%)' }
                  ]}
                  margin={{ top: 20, right: 30, bottom: 60, left: 60 }}
                  innerRadius={0.5}
                  padAngle={0.7}
                  cornerRadius={3}
                  theme={theme}
                />
              </div>
            </div>

            {/* Scatter Plot - Performance Correlation */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Time vs Performance</h3>
              <div className="h-80">
                <ResponsiveScatterPlot
                  data={[
                    {
                      id: 'Students',
                      data: Array.from({ length: 30 }, () => ({
                        x: Math.floor(Math.random() * 10),
                        y: Math.floor(Math.random() * 100)
                      }))
                    }
                  ]}
                  margin={{ top: 20, right: 30, bottom: 60, left: 60 }}
                  xScale={{ type: 'linear', min: 0, max: 10 }}
                  yScale={{ type: 'linear', min: 0, max: 100 }}
                  theme={theme}
                  axisBottom={{
                    title: 'Hours Spent',
                    titleOffset: 50
                  }}
                  axisLeft={{
                    title: 'Performance Score',
                    titleOffset: 50
                  }}
                />
              </div>
            </div>

            {/* Radar Chart - Skill Assessment */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Skill Assessment</h3>
              <div className="h-80">
                <ResponsiveRadar
                  data={[
                    { skill: 'Programming', A: 80, B: 90, C: 70 },
                    { skill: 'Design', A: 85, B: 75, C: 80 },
                    { skill: 'Analytics', A: 70, B: 85, C: 90 },
                    { skill: 'Communication', A: 90, B: 80, C: 85 },
                    { skill: 'Problem Solving', A: 85, B: 90, C: 80 }
                  ]}
                  keys={['A', 'B', 'C']}
                  indexBy="skill"
                  maxValue="auto"
                  margin={{ top: 20, right: 30, bottom: 60, left: 60 }}
                  curve="linearClosed"
                  theme={theme}
                  gridLevels={5}
                  gridShape="circular"
                />
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Modals */}
      {renderModalContent()}
    </div>
  );
};

export default AdminDashboard;
