import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import Modal from '../components/Modal';
import Courses from './instructor/Courses';
import Assignments from './instructor/Assignments';
import Assessments from './instructor/Assessments';
import Students from './instructor/Students';
import GradeBook from './instructor/GradeBook';
import Resources from './instructor/Resources';
import Discussions from './instructor/Discussions';
import Analytics from './instructor/Analytics';
import Calendar from './instructor/Calendar';
import Announcements from './instructor/Announcements';
import Settings from './instructor/Settings';
import Help from './instructor/Help';

const InstructorDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth >= 1024);
  const [activeModal, setActiveModal] = useState<string | null>(null);

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

  const modalComponents: { [key: string]: React.ReactNode } = {
    courses: <Courses />,
    assignments: <Assignments />,
    assessments: <Assessments />,
    students: <Students />,
    gradebook: <GradeBook />,
    resources: <Resources />,
    discussions: <Discussions />,
    analytics: <Analytics />,
    calendar: <Calendar />,
    announcements: <Announcements />,
    settings: <Settings />,
    help: <Help />
  };

  const modalTitles: { [key: string]: string } = {
    courses: 'Course Management',
    assignments: 'Assignments & Projects',
    assessments: 'Tests & Quizzes',
    students: 'Student Management',
    gradebook: 'Grade Book',
    resources: 'Learning Resources',
    discussions: 'Discussion Forums',
    analytics: 'Course Analytics',
    calendar: 'Academic Calendar',
    announcements: 'Course Announcements',
    settings: 'Instructor Settings',
    help: 'Help & Support'
  };

  const modalSizes: { [key: string]: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full' } = {
    courses: '2xl',
    assignments: 'xl',
    assessments: 'xl',
    students: '2xl',
    gradebook: '2xl',
    resources: 'xl',
    discussions: 'xl',
    analytics: '2xl',
    calendar: 'lg',
    announcements: 'lg',
    settings: 'lg',
    help: 'lg'
  };

  const handleSidebarItemClick = (itemId: string) => {
    setActiveModal(itemId);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className={`fixed left-0 top-0 h-full z-30 transform transition-transform duration-300 ease-in-out ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } lg:translate-x-0`}>
        <Sidebar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          onItemClick={(itemId) => {
            handleSidebarItemClick(itemId);
            // Close sidebar on mobile when item is clicked
            if (window.innerWidth < 1024) {
              setSidebarOpen(false);
            }
          }}
          role="instructor"
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
              <span className="ml-4 text-xl font-semibold text-gray-900">INSTRUCTOR</span>
            </div>
            <div className="flex items-center space-x-4">
              {/* Add profile dropdown, notifications, etc. here */}
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <div className="flex-1 overflow-auto pt-16">
          <main className="p-4 md:p-6 max-w-7xl mx-auto w-full">
            {/* Quick Stats Section */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <div className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-sm font-semibold text-gray-600">Active Courses</h3>
                <p className="text-2xl font-bold text-blue-600 mt-2">8</p>
                <p className="text-xs text-gray-500 mt-1">↑ 2 new this semester</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-sm font-semibold text-gray-600">Total Students</h3>
                <p className="text-2xl font-bold text-green-600 mt-2">256</p>
                <p className="text-xs text-gray-500 mt-1">Across all courses</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-sm font-semibold text-gray-600">Pending Assignments</h3>
                <p className="text-2xl font-bold text-orange-600 mt-2">15</p>
                <p className="text-xs text-gray-500 mt-1">Need grading</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-sm font-semibold text-gray-600">Course Rating</h3>
                <p className="text-2xl font-bold text-purple-600 mt-2">4.8/5.0</p>
                <p className="text-xs text-gray-500 mt-1">Average across courses</p>
              </div>
            </div>

            {/* Recent Activity Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Upcoming Deadlines */}
              <div className="bg-white rounded-lg shadow-sm">
                <div className="p-4 border-b">
                  <h2 className="text-lg font-semibold text-gray-800">Upcoming Deadlines</h2>
                </div>
                <div className="p-4">
                  <ul className="space-y-4">
                    <li className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-800">Final Project Submission</p>
                        <p className="text-sm text-gray-500">Advanced Web Development</p>
                      </div>
                      <span className="text-sm text-red-600 font-medium">Tomorrow</span>
                    </li>
                    <li className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-800">Midterm Exam</p>
                        <p className="text-sm text-gray-500">Data Structures</p>
                      </div>
                      <span className="text-sm text-orange-600 font-medium">In 3 days</span>
                    </li>
                    <li className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-800">Quiz 3</p>
                        <p className="text-sm text-gray-500">Machine Learning Basics</p>
                      </div>
                      <span className="text-sm text-yellow-600 font-medium">In 5 days</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Recent Submissions */}
              <div className="bg-white rounded-lg shadow-sm">
                <div className="p-4 border-b">
                  <h2 className="text-lg font-semibold text-gray-800">Recent Submissions</h2>
                </div>
                <div className="p-4">
                  <ul className="space-y-4">
                    <li className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-800">Assignment 4</p>
                        <p className="text-sm text-gray-500">By John Doe - Advanced Web Development</p>
                      </div>
                      <span className="text-sm text-gray-500">2 hours ago</span>
                    </li>
                    <li className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-800">Project Milestone 2</p>
                        <p className="text-sm text-gray-500">By Jane Smith - Data Structures</p>
                      </div>
                      <span className="text-sm text-gray-500">5 hours ago</span>
                    </li>
                    <li className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-800">Lab Report</p>
                        <p className="text-sm text-gray-500">By Mike Brown - Machine Learning</p>
                      </div>
                      <span className="text-sm text-gray-500">Yesterday</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>

      {/* Modals */}
      {activeModal && (
        <Modal
          isOpen={true}
          onClose={() => setActiveModal(null)}
          title={modalTitles[activeModal]}
          size={modalSizes[activeModal]}
        >
          {modalComponents[activeModal]}
        </Modal>
      )}
    </div>
  );
};

export default InstructorDashboard;
