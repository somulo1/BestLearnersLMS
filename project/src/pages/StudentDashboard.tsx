import React, { useState } from 'react';
import { ResponsiveBar } from '@nivo/bar';
import { ResponsivePie } from '@nivo/pie';
import { ResponsiveLine } from '@nivo/line';
import { useAuthStore } from '../store/authStore';
import {
  Home,
  BookOpen,
  Calendar,
  MessageCircle,
  Bell,
  FileText,
  Settings,
  HelpCircle,
  GraduationCap,
  Book,
  Award,
  Clock,
  Menu,
  X
} from 'lucide-react';
import Modal from '../components/Modal';

// Data generators
const generateGradeData = () => [
  { subject: 'Mathematics', score: 85, classAverage: 78 },
  { subject: 'Science', score: 92, classAverage: 80 },
  { subject: 'English', score: 88, classAverage: 82 },
  { subject: 'History', score: 90, classAverage: 85 }
];

const generateProgressData = () => [
  {
    id: 'Learning Progress',
    data: Array.from({ length: 10 }, (_, i) => ({
      x: `Week ${i + 1}`,
      y: Math.floor(Math.random() * 20) + 70
    }))
  }
];

interface SidebarItem {
  id: string;
  icon: React.ElementType;
  label: string;
}

const sidebarItems: SidebarItem[] = [
  { id: 'overview', icon: Home, label: 'Dashboard' },
  { id: 'courses', icon: BookOpen, label: 'My Courses' },
  { id: 'assignments', icon: FileText, label: 'Assignments' },
  { id: 'grades', icon: Award, label: 'Grades' },
  { id: 'schedule', icon: Calendar, label: 'Schedule' },
  { id: 'resources', icon: Book, label: 'Resources' },
  { id: 'messages', icon: MessageCircle, label: 'Messages' },
  { id: 'notifications', icon: Bell, label: 'Notifications' },
  { id: 'progress', icon: GraduationCap, label: 'Progress' },
  { id: 'attendance', icon: Clock, label: 'Attendance' },
  { id: 'settings', icon: Settings, label: 'Settings' },
  { id: 'help', icon: HelpCircle, label: 'Help' },
];

const StudentDashboard: React.FC = () => {
  const user = useAuthStore((state) => state.user);
  const [selectedView, setSelectedView] = useState('overview');
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

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

  const handleSidebarItemClick = (itemId: string) => {
    setSelectedView(itemId);
    if (itemId !== 'overview') {
      setActiveModal(itemId);
      setIsModalOpen(true);
    }
  };

  const renderModalContent = () => {
    switch (activeModal) {
      case 'courses':
        return (
          <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="My Courses" size="2xl">
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {Array.from({ length: 6 }).map((_, index) => (
                  <div 
                    key={index} 
                    className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow duration-200"
                  >
                    <div className="flex items-center mb-4">
                      <div className="p-2 bg-indigo-50 rounded-lg">
                        <BookOpen className="w-5 h-5 text-indigo-600" />
                      </div>
                      <h3 className="ml-3 text-lg font-semibold">Course {index + 1}</h3>
                    </div>
                    <div className="space-y-3">
                      <p className="text-sm text-gray-600">Instructor: Dr. Smith</p>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Progress</span>
                          <span className="font-medium">75%</span>
                        </div>
                        <div className="w-full bg-gray-100 rounded-full h-2">
                          <div 
                            className="bg-indigo-600 h-2 rounded-full transition-all duration-300" 
                            style={{ width: '75%' }}
                          ></div>
                        </div>
                      </div>
                      <button className="w-full mt-4 px-4 py-2 bg-indigo-50 text-indigo-600 rounded-lg hover:bg-indigo-100 transition-colors duration-200 text-sm font-medium">
                        View Course
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Modal>
        );

      case 'assignments':
        return (
          <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Assignments" size="2xl">
            <div className="space-y-4">
              <div className="flex flex-wrap gap-4 mb-6">
                <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200 text-sm font-medium">
                  All Assignments
                </button>
                <button className="px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200 text-sm font-medium">
                  Pending
                </button>
                <button className="px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200 text-sm font-medium">
                  Completed
                </button>
              </div>
              <div className="space-y-4">
                {Array.from({ length: 5 }).map((_, index) => (
                  <div 
                    key={index} 
                    className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow duration-200"
                  >
                    <div className="sm:flex justify-between items-start space-y-3 sm:space-y-0">
                      <div className="flex-1">
                        <div className="flex items-center">
                          <div className="p-2 bg-indigo-50 rounded-lg">
                            <FileText className="w-5 h-5 text-indigo-600" />
                          </div>
                          <h3 className="ml-3 text-lg font-semibold">Assignment {index + 1}</h3>
                        </div>
                        <p className="text-sm text-gray-600 mt-2">Due Date: {new Date().toLocaleDateString()}</p>
                        <p className="text-sm text-gray-500 mt-1">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                      </div>
                      <div className="flex items-center space-x-3">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                          index % 3 === 0 ? 'bg-green-100 text-green-800' :
                          index % 3 === 1 ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {index % 3 === 0 ? 'Completed' :
                           index % 3 === 1 ? 'In Progress' :
                           'Due Soon'}
                        </span>
                        <button className="px-4 py-2 bg-indigo-50 text-indigo-600 rounded-lg hover:bg-indigo-100 transition-colors duration-200 text-sm font-medium">
                          View
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Modal>
        );

      case 'grades':
        return (
          <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Grades" size="2xl">
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-xl p-6 text-white">
                <h3 className="text-xl font-semibold mb-2">Current Semester</h3>
                <div className="flex items-baseline">
                  <span className="text-3xl font-bold">3.8</span>
                  <span className="ml-2 text-indigo-100">GPA</span>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {generateGradeData().map((subject, index) => (
                  <div 
                    key={index} 
                    className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow duration-200"
                  >
                    <div className="flex justify-between items-center mb-3">
                      <div className="flex items-center">
                        <div className="p-2 bg-indigo-50 rounded-lg">
                          <BookOpen className="w-5 h-5 text-indigo-600" />
                        </div>
                        <h4 className="ml-3 font-semibold">{subject.subject}</h4>
                      </div>
                      <span className="text-lg font-bold text-indigo-600">{subject.score}%</span>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Score</span>
                        <span className="text-gray-600">{subject.score}%</span>
                      </div>
                      <div className="w-full bg-gray-100 rounded-full h-2">
                        <div
                          className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${subject.score}%` }}
                        ></div>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Class Average</span>
                        <span className="text-gray-600">{subject.classAverage}%</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Modal>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Header with Menu Button */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-20 bg-white border-b border-gray-200 px-4 py-3">
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
        >
          {isSidebarOpen ? (
            <X className="w-6 h-6 text-gray-600" />
          ) : (
            <Menu className="w-6 h-6 text-gray-600" />
          )}
        </button>
      </div>

      {/* Sidebar Overlay for Mobile */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white border-r border-gray-200 z-40 transform transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 lg:z-0 overflow-y-auto`}
      >
        {/* Sidebar Header */}
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-2xl font-bold text-gray-900">Student Portal</h1>
          <p className="text-sm text-gray-500 mt-1">{user?.name || 'Student Name'}</p>
        </div>

        {/* Sidebar Navigation */}
        <nav className="p-4 space-y-1">
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => handleSidebarItemClick(item.id)}
                className={`w-full flex items-center px-4 py-3 text-sm rounded-lg transition-colors duration-200 ${
                  selectedView === item.id
                    ? 'bg-indigo-50 text-indigo-600'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <Icon className="w-5 h-5 mr-3" />
                {item.label}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Main Content */}
      <div 
        className={`min-h-screen transition-all duration-300 ${
          isSidebarOpen ? 'lg:ml-64' : 'ml-0'
        } pt-16 lg:pt-0`}
      >
        {selectedView === 'overview' && (
          <div className="p-4 md:p-6 space-y-6">
            {/* Quick Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-800">GPA</h3>
                <p className="text-3xl font-bold text-indigo-600">3.8</p>
                <p className="text-sm text-gray-500">↑ 0.2 from last semester</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-800">Course Progress</h3>
                <p className="text-3xl font-bold text-green-600">75%</p>
                <p className="text-sm text-gray-500">Average across all courses</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-800">Due Assignments</h3>
                <p className="text-3xl font-bold text-yellow-600">4</p>
                <p className="text-sm text-gray-500">This week</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-800">Study Hours</h3>
                <p className="text-3xl font-bold text-purple-600">28</p>
                <p className="text-sm text-gray-500">Last 7 days</p>
              </div>
            </div>

            {/* Charts Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Grade Comparison */}
              <div className="bg-white p-4 md:p-6 rounded-lg shadow-sm border border-gray-200">
                <h2 className="text-xl font-semibold mb-4">Subject Performance</h2>
                <div className="h-[300px] md:h-80">
                  <ResponsiveBar
                    data={generateGradeData()}
                    keys={['score', 'classAverage']}
                    indexBy="subject"
                    groupMode="grouped"
                    margin={{ top: 20, right: 20, bottom: 50, left: 50 }}
                    padding={0.3}
                    theme={theme}
                    colors={['#4F46E5', '#94A3B8']}
                    axisBottom={{ tickRotation: -45 }}
                  />
                </div>
              </div>

              {/* Progress Line Graph */}
              <div className="bg-white p-4 md:p-6 rounded-lg shadow-sm border border-gray-200">
                <h2 className="text-xl font-semibold mb-4">Learning Progress</h2>
                <div className="h-[300px] md:h-80">
                  <ResponsiveLine
                    data={generateProgressData()}
                    margin={{ top: 20, right: 20, bottom: 50, left: 50 }}
                    xScale={{ type: 'point' }}
                    yScale={{ type: 'linear', min: 0, max: 100 }}
                    axisTop={null}
                    axisRight={null}
                    pointSize={10}
                    pointColor="#ffffff"
                    pointBorderWidth={2}
                    pointBorderColor="#4F46E5"
                    pointLabelYOffset={-12}
                    useMesh={true}
                    theme={theme}
                    colors={['#4F46E5']}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Modals */}
        {isModalOpen && renderModalContent()}
      </div>
    </div>
  );
};

export default StudentDashboard;
