import React from 'react';
import { X } from 'lucide-react';
import { ResponsiveBar } from '@nivo/bar';
import { ResponsivePie } from '@nivo/pie';
import { ResponsiveLine } from '@nivo/line';
import { ResponsiveRadar } from '@nivo/radar';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-xl w-11/12 max-w-4xl max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
          <button
            onClick={onClose}
            className="p-1 rounded-md text-gray-500 hover:text-gray-600"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        <div className="p-6 overflow-y-auto">{children}</div>
      </div>
    </div>
  );
};

// Academic Progress Modal Content
export const AcademicProgressModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({
  isOpen,
  onClose,
}) => {
  const subjectData = [
    { subject: 'Mathematics', grade: 92, average: 85 },
    { subject: 'Science', grade: 88, average: 82 },
    { subject: 'English', grade: 90, average: 84 },
    { subject: 'History', grade: 85, average: 80 },
  ];

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Academic Progress">
      <div className="space-y-6">
        <div className="h-[400px]">
          <h4 className="text-lg font-semibold mb-4">Subject Performance</h4>
          <ResponsiveBar
            data={subjectData}
            keys={['grade', 'average']}
            indexBy="subject"
            margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
            padding={0.3}
            groupMode="grouped"
            colors={{ scheme: 'nivo' }}
            axisBottom={{ tickRotation: -45 }}
            legends={[
              {
                dataFrom: 'keys',
                anchor: 'bottom-right',
                direction: 'column',
                translateX: 120,
                itemWidth: 100,
                itemHeight: 20,
              },
            ]}
          />
        </div>
      </div>
    </Modal>
  );
};

// Attendance Modal Content
export const AttendanceModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({
  isOpen,
  onClose,
}) => {
  const attendanceData = [
    { id: 'Present', value: 90, color: 'hsl(120, 70%, 50%)' },
    { id: 'Absent', value: 5, color: 'hsl(0, 70%, 50%)' },
    { id: 'Late', value: 5, color: 'hsl(40, 70%, 50%)' },
  ];

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Attendance Record">
      <div className="space-y-6">
        <div className="h-[400px]">
          <h4 className="text-lg font-semibold mb-4">Attendance Distribution</h4>
          <ResponsivePie
            data={attendanceData}
            margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
            innerRadius={0.5}
            padAngle={0.7}
            cornerRadius={3}
            activeOuterRadiusOffset={8}
            colors={{ scheme: 'category10' }}
            legends={[
              {
                anchor: 'bottom',
                direction: 'row',
                translateY: 56,
                itemWidth: 100,
                itemHeight: 18,
              },
            ]}
          />
        </div>
      </div>
    </Modal>
  );
};

// Behavior Modal Content
export const BehaviorModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({
  isOpen,
  onClose,
}) => {
  const behaviorData = [
    {
      id: 'Behavior Metrics',
      data: [
        { metric: 'Participation', value: 85 },
        { metric: 'Cooperation', value: 90 },
        { metric: 'Responsibility', value: 88 },
        { metric: 'Respect', value: 92 },
        { metric: 'Leadership', value: 80 },
      ],
    },
  ];

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Behavior & Discipline">
      <div className="space-y-6">
        <div className="h-[400px]">
          <h4 className="text-lg font-semibold mb-4">Behavior Assessment</h4>
          <ResponsiveRadar
            data={behaviorData[0].data}
            keys={['value']}
            indexBy="metric"
            maxValue={100}
            margin={{ top: 70, right: 80, bottom: 40, left: 80 }}
            curve="linearClosed"
            borderWidth={2}
            gridLevels={5}
            gridShape="circular"
            dotSize={10}
            dotColor={{ theme: 'background' }}
            dotBorderWidth={2}
            colors={{ scheme: 'nivo' }}
          />
        </div>
      </div>
    </Modal>
  );
};

// Assignments Modal Content
export const AssignmentsModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({
  isOpen,
  onClose,
}) => {
  const assignmentData = [
    {
      id: 'Completion Rate',
      data: [
        { x: 'Week 1', y: 100 },
        { x: 'Week 2', y: 95 },
        { x: 'Week 3', y: 88 },
        { x: 'Week 4', y: 92 },
      ],
    },
  ];

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Assignments & Homework">
      <div className="space-y-6">
        <div className="h-[400px]">
          <h4 className="text-lg font-semibold mb-4">Assignment Completion Rate</h4>
          <ResponsiveLine
            data={assignmentData}
            margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
            xScale={{ type: 'point' }}
            yScale={{ type: 'linear', min: 0, max: 100 }}
            curve="cardinal"
            axisTop={null}
            axisRight={null}
            pointSize={10}
            pointColor={{ theme: 'background' }}
            pointBorderWidth={2}
            pointBorderColor={{ from: 'serieColor' }}
            enableArea={true}
            areaOpacity={0.15}
          />
        </div>
      </div>
    </Modal>
  );
};

// Communication Modal Content
export const CommunicationModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({
  isOpen,
  onClose,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Communication">
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-lg border">
            <h4 className="text-lg font-semibold mb-4">Message Teachers</h4>
            <textarea
              className="w-full h-32 p-2 border rounded-lg resize-none"
              placeholder="Type your message here..."
            />
            <button className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              Send Message
            </button>
          </div>
          <div className="bg-white p-4 rounded-lg border">
            <h4 className="text-lg font-semibold mb-4">Recent Messages</h4>
            <div className="space-y-4">
              <div className="p-3 bg-gray-50 rounded-lg">
                <p className="text-sm font-medium">Math Teacher</p>
                <p className="text-sm text-gray-600">Regarding upcoming test preparation...</p>
                <p className="text-xs text-gray-400 mt-1">2 days ago</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg">
                <p className="text-sm font-medium">Science Teacher</p>
                <p className="text-sm text-gray-600">Project submission deadline extended...</p>
                <p className="text-xs text-gray-400 mt-1">3 days ago</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

// Fees Modal Content
export const FeesModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({
  isOpen,
  onClose,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Fees & Payments">
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-lg border">
            <h4 className="text-lg font-semibold mb-4">Payment Summary</h4>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Tuition Fee</span>
                <span className="font-medium">$5,000</span>
              </div>
              <div className="flex justify-between">
                <span>Library Fee</span>
                <span className="font-medium">$200</span>
              </div>
              <div className="flex justify-between">
                <span>Lab Fee</span>
                <span className="font-medium">$300</span>
              </div>
              <div className="border-t pt-2 mt-2">
                <div className="flex justify-between font-semibold">
                  <span>Total</span>
                  <span>$5,500</span>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg border">
            <h4 className="text-lg font-semibold mb-4">Payment History</h4>
            <div className="space-y-4">
              <div className="p-3 bg-gray-50 rounded-lg">
                <div className="flex justify-between">
                  <span className="font-medium">First Term Fee</span>
                  <span className="text-green-600">Paid</span>
                </div>
                <p className="text-sm text-gray-600">$2,750</p>
                <p className="text-xs text-gray-400">Paid on: 01/15/2024</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg">
                <div className="flex justify-between">
                  <span className="font-medium">Second Term Fee</span>
                  <span className="text-yellow-600">Pending</span>
                </div>
                <p className="text-sm text-gray-600">$2,750</p>
                <p className="text-xs text-gray-400">Due by: 06/15/2024</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

// Calendar Modal Content
export const CalendarModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({
  isOpen,
  onClose,
}) => {
  const events = [
    { date: '2024-01-15', title: 'Parent-Teacher Meeting', type: 'meeting' },
    { date: '2024-01-20', title: 'Science Fair', type: 'event' },
    { date: '2024-01-25', title: 'Mid-Term Exams Begin', type: 'exam' },
    { date: '2024-02-01', title: 'Sports Day', type: 'event' },
  ];

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="School Calendar">
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Calendar View */}
          <div className="bg-white p-4 rounded-lg border">
            <h4 className="text-lg font-semibold mb-4">Calendar</h4>
            <div className="grid grid-cols-7 gap-1">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                <div key={day} className="text-center text-sm font-medium text-gray-500 py-2">
                  {day}
                </div>
              ))}
              {Array.from({ length: 35 }).map((_, index) => (
                <div
                  key={index}
                  className="aspect-square border rounded-lg p-1 text-sm hover:bg-gray-50 cursor-pointer"
                >
                  <span className="block text-center">{(index % 31) + 1}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming Events */}
          <div className="bg-white p-4 rounded-lg border">
            <h4 className="text-lg font-semibold mb-4">Upcoming Events</h4>
            <div className="space-y-4">
              {events.map((event, index) => (
                <div key={index} className="p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <h5 className="font-medium">{event.title}</h5>
                      <p className="text-sm text-gray-600">{event.date}</p>
                    </div>
                    <span className={`
                      px-2 py-1 rounded-full text-xs font-medium
                      ${event.type === 'meeting' ? 'bg-blue-100 text-blue-800' :
                        event.type === 'event' ? 'bg-green-100 text-green-800' :
                        'bg-yellow-100 text-yellow-800'}
                    `}>
                      {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Add to Calendar Button */}
        <div className="flex justify-end">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200">
            Add to Calendar
          </button>
        </div>
      </div>
    </Modal>
  );
};

// Announcements Modal Content
export const AnnouncementsModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({
  isOpen,
  onClose,
}) => {
  const announcements = [
    {
      id: 1,
      title: 'School Closure Notice',
      content: 'Due to severe weather conditions, school will remain closed tomorrow.',
      date: '2024-01-14',
      priority: 'high',
    },
    {
      id: 2,
      title: 'Annual Sports Day',
      content: 'Annual Sports Day will be held on February 1st. All parents are cordially invited.',
      date: '2024-01-12',
      priority: 'medium',
    },
    {
      id: 3,
      title: 'Parent-Teacher Meeting',
      content: 'Parent-Teacher meeting is scheduled for next week. Please check your email for the schedule.',
      date: '2024-01-10',
      priority: 'normal',
    },
  ];

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Announcements">
      <div className="space-y-6">
        {/* Filters */}
        <div className="flex flex-wrap gap-2">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            All
          </button>
          <button className="px-4 py-2 bg-white border text-gray-700 rounded-lg hover:bg-gray-50">
            High Priority
          </button>
          <button className="px-4 py-2 bg-white border text-gray-700 rounded-lg hover:bg-gray-50">
            Recent
          </button>
        </div>

        {/* Announcements List */}
        <div className="space-y-4">
          {announcements.map((announcement) => (
            <div
              key={announcement.id}
              className="bg-white p-4 rounded-lg border hover:shadow-md transition-shadow duration-200"
            >
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <h4 className="text-lg font-semibold">{announcement.title}</h4>
                    {announcement.priority === 'high' && (
                      <span className="px-2 py-1 bg-red-100 text-red-800 text-xs font-medium rounded-full">
                        High Priority
                      </span>
                    )}
                  </div>
                  <p className="text-gray-600">{announcement.content}</p>
                  <p className="text-sm text-gray-400">Posted on: {announcement.date}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More Button */}
        <div className="flex justify-center">
          <button className="px-4 py-2 text-blue-600 hover:text-blue-700 font-medium">
            Load More
          </button>
        </div>
      </div>
    </Modal>
  );
};

// Help & Support Modal Content
export const HelpSupportModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({
  isOpen,
  onClose,
}) => {
  const faqItems = [
    {
      question: 'How do I track my child\'s academic progress?',
      answer: 'You can view your child\'s academic progress in the "Academic Progress" section. This includes grades, test scores, and performance trends.'
    },
    {
      question: 'How can I communicate with teachers?',
      answer: 'Use the "Communication" section to send messages to teachers, view responses, and schedule parent-teacher meetings.'
    },
    {
      question: 'Where can I find information about school fees?',
      answer: 'All fee-related information, including payment history and due dates, can be found in the "Fees & Payments" section.'
    },
    {
      question: 'How do I update my contact information?',
      answer: 'You can update your contact information in the Settings section. Make sure to keep this information current for emergency contacts.'
    }
  ];

  const supportCategories = [
    {
      title: 'Technical Support',
      icon: 'laptop',
      description: 'Get help with login issues, app navigation, and technical problems',
      contact: 'tech.support@school.com'
    },
    {
      title: 'Academic Support',
      icon: 'book',
      description: 'Questions about grades, curriculum, and academic programs',
      contact: 'academic.support@school.com'
    },
    {
      title: 'Administrative Help',
      icon: 'building',
      description: 'Assistance with admissions, documentation, and general inquiries',
      contact: 'admin@school.com'
    }
  ];

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Help & Support">
      <div className="space-y-8">
        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="p-4 bg-blue-50 hover:bg-blue-100 rounded-lg text-blue-700 text-center transition-colors duration-200">
            <span className="block font-semibold">Contact Support</span>
            <span className="text-sm text-blue-600">Get immediate help</span>
          </button>
          <button className="p-4 bg-green-50 hover:bg-green-100 rounded-lg text-green-700 text-center transition-colors duration-200">
            <span className="block font-semibold">Submit Ticket</span>
            <span className="text-sm text-green-600">Create support ticket</span>
          </button>
          <button className="p-4 bg-purple-50 hover:bg-purple-100 rounded-lg text-purple-700 text-center transition-colors duration-200">
            <span className="block font-semibold">Schedule Call</span>
            <span className="text-sm text-purple-600">Book a support call</span>
          </button>
        </div>

        {/* FAQ Section */}
        <div className="bg-white rounded-lg border p-6">
          <h3 className="text-xl font-semibold mb-4">Frequently Asked Questions</h3>
          <div className="space-y-4">
            {faqItems.map((item, index) => (
              <div key={index} className="border-b pb-4 last:border-b-0 last:pb-0">
                <h4 className="font-medium text-gray-900 mb-2">{item.question}</h4>
                <p className="text-gray-600 text-sm">{item.answer}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Support Categories */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {supportCategories.map((category, index) => (
            <div key={index} className="bg-white rounded-lg border p-6 hover:shadow-md transition-shadow duration-200">
              <h4 className="font-semibold text-gray-900 mb-2">{category.title}</h4>
              <p className="text-gray-600 text-sm mb-4">{category.description}</p>
              <div className="text-sm text-blue-600">
                <a href={`mailto:${category.contact}`} className="hover:underline">
                  {category.contact}
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Help Resources */}
        <div className="bg-gray-50 rounded-lg p-6">
          <h3 className="text-xl font-semibold mb-4">Additional Resources</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <a 
              href="#" 
              className="flex items-center p-4 bg-white rounded-lg border hover:border-blue-500 transition-colors duration-200"
            >
              <div className="flex-1">
                <h4 className="font-medium text-gray-900">User Guide</h4>
                <p className="text-sm text-gray-600">Comprehensive guide to using the parent portal</p>
              </div>
            </a>
            <a 
              href="#" 
              className="flex items-center p-4 bg-white rounded-lg border hover:border-blue-500 transition-colors duration-200"
            >
              <div className="flex-1">
                <h4 className="font-medium text-gray-900">Video Tutorials</h4>
                <p className="text-sm text-gray-600">Step-by-step video guides for common tasks</p>
              </div>
            </a>
          </div>
        </div>

        {/* Contact Information */}
        <div className="bg-blue-50 rounded-lg p-6">
          <h3 className="text-xl font-semibold mb-4">Emergency Contact</h3>
          <div className="space-y-2">
            <p className="text-gray-700">School Hours: 8:00 AM - 4:00 PM (Monday - Friday)</p>
            <p className="text-gray-700">Emergency Phone: <span className="font-medium">+1 (555) 123-4567</span></p>
            <p className="text-gray-700">Email: <span className="font-medium">emergency@school.com</span></p>
          </div>
        </div>
      </div>
    </Modal>
  );
};

// Settings Modal Content
export const SettingsModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({
  isOpen,
  onClose,
}) => {
  const [activeTab, setActiveTab] = React.useState('profile');
  const [notificationSettings, setNotificationSettings] = React.useState({
    email: true,
    push: true,
    sms: false,
    academicUpdates: true,
    attendanceAlerts: true,
    behaviorReports: true,
    feeReminders: true,
  });

  const [theme, setTheme] = React.useState('light');
  const [language, setLanguage] = React.useState('english');
  const [fontSize, setFontSize] = React.useState('medium');

  const handleNotificationChange = (setting: string) => {
    setNotificationSettings(prev => ({
      ...prev,
      [setting]: !prev[setting as keyof typeof prev]
    }));
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Settings">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Settings Navigation */}
        <div className="md:w-1/4">
          <div className="flex flex-row md:flex-col space-x-4 md:space-x-0 md:space-y-2 overflow-x-auto md:overflow-x-visible pb-4 md:pb-0">
            <button
              onClick={() => setActiveTab('profile')}
              className={`px-4 py-2 rounded-lg text-left ${
                activeTab === 'profile'
                  ? 'bg-blue-100 text-blue-700'
                  : 'hover:bg-gray-100'
              }`}
            >
              Profile Settings
            </button>
            <button
              onClick={() => setActiveTab('notifications')}
              className={`px-4 py-2 rounded-lg text-left ${
                activeTab === 'notifications'
                  ? 'bg-blue-100 text-blue-700'
                  : 'hover:bg-gray-100'
              }`}
            >
              Notifications
            </button>
            <button
              onClick={() => setActiveTab('security')}
              className={`px-4 py-2 rounded-lg text-left ${
                activeTab === 'security'
                  ? 'bg-blue-100 text-blue-700'
                  : 'hover:bg-gray-100'
              }`}
            >
              Security
            </button>
            <button
              onClick={() => setActiveTab('appearance')}
              className={`px-4 py-2 rounded-lg text-left ${
                activeTab === 'appearance'
                  ? 'bg-blue-100 text-blue-700'
                  : 'hover:bg-gray-100'
              }`}
            >
              Appearance
            </button>
          </div>
        </div>

        {/* Settings Content */}
        <div className="flex-1">
          {/* Profile Settings */}
          {activeTab === 'profile' && (
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg border">
                <h3 className="text-lg font-semibold mb-4">Profile Information</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="your.email@example.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Your phone number"
                    />
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg border">
                <h3 className="text-lg font-semibold mb-4">Emergency Contact</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Emergency Contact Name
                    </label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Emergency contact name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Emergency Contact Phone
                    </label>
                    <input
                      type="tel"
                      className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Emergency contact phone"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Notifications Settings */}
          {activeTab === 'notifications' && (
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg border">
                <h3 className="text-lg font-semibold mb-4">Notification Channels</h3>
                <div className="space-y-4">
                  <label className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={notificationSettings.email}
                      onChange={() => handleNotificationChange('email')}
                      className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                    />
                    <span>Email Notifications</span>
                  </label>
                  <label className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={notificationSettings.push}
                      onChange={() => handleNotificationChange('push')}
                      className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                    />
                    <span>Push Notifications</span>
                  </label>
                  <label className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={notificationSettings.sms}
                      onChange={() => handleNotificationChange('sms')}
                      className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                    />
                    <span>SMS Notifications</span>
                  </label>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg border">
                <h3 className="text-lg font-semibold mb-4">Notification Types</h3>
                <div className="space-y-4">
                  <label className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={notificationSettings.academicUpdates}
                      onChange={() => handleNotificationChange('academicUpdates')}
                      className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                    />
                    <span>Academic Updates</span>
                  </label>
                  <label className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={notificationSettings.attendanceAlerts}
                      onChange={() => handleNotificationChange('attendanceAlerts')}
                      className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                    />
                    <span>Attendance Alerts</span>
                  </label>
                  <label className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={notificationSettings.behaviorReports}
                      onChange={() => handleNotificationChange('behaviorReports')}
                      className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                    />
                    <span>Behavior Reports</span>
                  </label>
                  <label className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={notificationSettings.feeReminders}
                      onChange={() => handleNotificationChange('feeReminders')}
                      className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                    />
                    <span>Fee Reminders</span>
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* Security Settings */}
          {activeTab === 'security' && (
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg border">
                <h3 className="text-lg font-semibold mb-4">Change Password</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Current Password
                    </label>
                    <input
                      type="password"
                      className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter current password"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      New Password
                    </label>
                    <input
                      type="password"
                      className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter new password"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Confirm New Password
                    </label>
                    <input
                      type="password"
                      className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Confirm new password"
                    />
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg border">
                <h3 className="text-lg font-semibold mb-4">Two-Factor Authentication</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Two-Factor Authentication</h4>
                      <p className="text-sm text-gray-500">
                        Add an extra layer of security to your account
                      </p>
                    </div>
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                      Enable
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Appearance Settings */}
          {activeTab === 'appearance' && (
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg border">
                <h3 className="text-lg font-semibold mb-4">Theme Settings</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Theme
                    </label>
                    <select
                      value={theme}
                      onChange={(e) => setTheme(e.target.value)}
                      className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="light">Light</option>
                      <option value="dark">Dark</option>
                      <option value="system">System</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg border">
                <h3 className="text-lg font-semibold mb-4">Language & Region</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Language
                    </label>
                    <select
                      value={language}
                      onChange={(e) => setLanguage(e.target.value)}
                      className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="english">English</option>
                      <option value="spanish">Spanish</option>
                      <option value="french">French</option>
                      <option value="german">German</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Font Size
                    </label>
                    <select
                      value={fontSize}
                      onChange={(e) => setFontSize(e.target.value)}
                      className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="small">Small</option>
                      <option value="medium">Medium</option>
                      <option value="large">Large</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
};
