import React, { useState } from 'react';
import { ResponsiveBar } from '@nivo/bar';
import { ResponsivePie } from '@nivo/pie';
import { ResponsiveLine } from '@nivo/line';
import { ResponsiveHeatMap } from '@nivo/heatmap';
import { ResponsiveScatterPlot } from '@nivo/scatterplot';
import { ResponsiveStream } from '@nivo/stream';
import { ResponsiveTreeMap } from '@nivo/treemap';
import { ResponsiveNetwork } from '@nivo/network';
import { ResponsiveCirclePacking } from '@nivo/circle-packing';
import { ResponsiveSankey } from '@nivo/sankey';
import { ResponsiveBoxPlot } from '@nivo/boxplot';
import { ResponsiveRadar } from '@nivo/radar';
import { FileText } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import ParentSidebar from '../components/ParentSidebar';
import {
  AcademicProgressModal,
  AttendanceModal,
  BehaviorModal,
  AssignmentsModal,
  CommunicationModal,
  FeesModal,
} from '../components/modals/ParentModals';

// Mock data generators for student performance metrics
const generateGradeData = () => [
  { subject: 'Mathematics', current: 85, average: 78 },
  { subject: 'Science', current: 92, average: 80 },
  { subject: 'English', current: 88, average: 82 },
  { subject: 'History', current: 90, average: 85 }
];

const generateAttendanceData = () => [
  { month: 'Jan', present: 20, absent: 2, late: 1 },
  { month: 'Feb', present: 18, absent: 1, late: 2 },
  { month: 'Mar', present: 21, absent: 0, late: 1 },
  { month: 'Apr', present: 19, absent: 1, late: 2 }
];

const generateProgressData = () => [
  {
    id: 'Progress',
    data: [
      { x: 'Week 1', y: 75 },
      { x: 'Week 2', y: 80 },
      { x: 'Week 3', y: 85 },
      { x: 'Week 4', y: 88 }
    ]
  }
];

const ParentDashboard: React.FC = () => {
  const user = useAuthStore((state) => state.user);
  const [selectedChild, setSelectedChild] = useState('John');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeModal, setActiveModal] = useState<string | null>(null);

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
    setActiveModal(itemId);
  };

  const closeModal = () => {
    setActiveModal(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <ParentSidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
        onItemClick={handleSidebarItemClick}
      />

      {/* Main Content */}
      <div className={`
        transition-all duration-300 ease-in-out
        ${isSidebarOpen ? 'md:ml-64' : 'md:ml-0'}
        min-h-screen
      `}>
        <div className="p-4 md:p-6 space-y-4 md:space-y-6">
          {/* Header with Child Selector */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-4 rounded-lg shadow-sm">
            <div className="w-full md:w-auto">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Parent Dashboard</h1>
              <p className="text-sm md:text-base text-gray-600">Welcome back, {user?.name}</p>
            </div>
            <select
              value={selectedChild}
              onChange={(e) => setSelectedChild(e.target.value)}
              className="w-full md:w-auto px-3 py-2 md:px-4 md:py-2 border rounded-lg bg-white shadow-sm hover:border-blue-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none transition-colors"
            >
              <option value="John">John Smith Jr.</option>
              <option value="Jane">Jane Smith</option>
            </select>
          </div>

          {/* Dashboard Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {/* Academic Performance Card */}
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold mb-4">Academic Performance</h3>
              <div className="h-64">
                <ResponsiveBar
                  data={generateGradeData()}
                  keys={['current', 'average']}
                  indexBy="subject"
                  theme={theme}
                  margin={{ top: 20, right: 20, bottom: 40, left: 40 }}
                  padding={0.3}
                  valueScale={{ type: 'linear' }}
                  indexScale={{ type: 'band', round: true }}
                  colors={{ scheme: 'nivo' }}
                  axisBottom={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: -45,
                  }}
                />
              </div>
            </div>

            {/* Attendance Card */}
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold mb-4">Attendance</h3>
              <div className="h-64">
                <ResponsivePie
                  data={[
                    { id: 'present', value: 90, color: 'hsl(152, 70%, 50%)' },
                    { id: 'absent', value: 5, color: 'hsl(0, 70%, 50%)' },
                    { id: 'late', value: 5, color: 'hsl(45, 70%, 50%)' },
                  ]}
                  theme={theme}
                  margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
                  innerRadius={0.5}
                  padAngle={0.7}
                  cornerRadius={3}
                />
              </div>
            </div>

            {/* Progress Card */}
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold mb-4">Progress Overview</h3>
              <div className="h-64">
                <ResponsiveLine
                  data={generateProgressData()}
                  theme={theme}
                  margin={{ top: 20, right: 20, bottom: 40, left: 40 }}
                  xScale={{ type: 'point' }}
                  yScale={{ type: 'linear', min: 'auto', max: 'auto' }}
                  curve="cardinal"
                  axisBottom={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                  }}
                />
              </div>
            </div>
          </div>

          {/* Additional Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
            {/* Upcoming Assignments */}
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold mb-4">Upcoming Assignments</h3>
              <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium">Assignment {i}</p>
                      <p className="text-sm text-gray-500">Due in {i} days</p>
                    </div>
                    <span className="px-3 py-1 text-sm bg-blue-100 text-blue-800 rounded-full">
                      Pending
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Activities */}
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold mb-4">Recent Activities</h3>
              <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <FileText className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium">Activity {i}</p>
                      <p className="text-sm text-gray-500">{i} hour{i !== 1 ? 's' : ''} ago</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      <AcademicProgressModal isOpen={activeModal === 'academics'} onClose={closeModal} />
      <AttendanceModal isOpen={activeModal === 'attendance'} onClose={closeModal} />
      <BehaviorModal isOpen={activeModal === 'behavior'} onClose={closeModal} />
      <AssignmentsModal isOpen={activeModal === 'assignments'} onClose={closeModal} />
      <CommunicationModal isOpen={activeModal === 'communication'} onClose={closeModal} />
      <FeesModal isOpen={activeModal === 'fees'} onClose={closeModal} />
    </div>
  );
};

export default ParentDashboard;