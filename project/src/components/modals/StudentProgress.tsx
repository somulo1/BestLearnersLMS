import React from 'react';
import { GraduationCap, TrendingUp, Award, Clock, Book } from 'lucide-react';
import { ResponsiveLine } from '@nivo/line';
import { ResponsivePie } from '@nivo/pie';
import Modal from '../Modal';

interface StudentProgressProps {
  isOpen: boolean;
  onClose: () => void;
}

const StudentProgress: React.FC<StudentProgressProps> = ({ isOpen, onClose }) => {
  // Sample data for charts
  const progressData = [
    {
      id: 'progress',
      data: [
        { x: 'Week 1', y: 75 },
        { x: 'Week 2', y: 80 },
        { x: 'Week 3', y: 85 },
        { x: 'Week 4', y: 82 },
        { x: 'Week 5', y: 88 },
        { x: 'Week 6', y: 90 },
      ],
    },
  ];

  const subjectProgress = [
    { id: 'Mathematics', value: 85, color: '#4F46E5' },
    { id: 'Physics', value: 78, color: '#10B981' },
    { id: 'Chemistry', value: 92, color: '#F59E0B' },
    { id: 'English', value: 88, color: '#6366F1' },
  ];

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Academic Progress" size="2xl">
      <div className="space-y-6">
        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-indigo-50 rounded-lg">
                <GraduationCap className="w-5 h-5 text-indigo-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Current GPA</p>
                <p className="text-xl font-bold text-gray-900">3.8</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-green-50 rounded-lg">
                <TrendingUp className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Completion</p>
                <p className="text-xl font-bold text-gray-900">85%</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-yellow-50 rounded-lg">
                <Award className="w-5 h-5 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Achievements</p>
                <p className="text-xl font-bold text-gray-900">12</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-purple-50 rounded-lg">
                <Clock className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Study Hours</p>
                <p className="text-xl font-bold text-gray-900">128</p>
              </div>
            </div>
          </div>
        </div>

        {/* Progress Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Weekly Progress Line Chart */}
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <h3 className="text-lg font-semibold mb-4">Weekly Progress</h3>
            <div className="h-[300px]">
              <ResponsiveLine
                data={progressData}
                margin={{ top: 20, right: 20, bottom: 50, left: 50 }}
                xScale={{ type: 'point' }}
                yScale={{ type: 'linear', min: 0, max: 100 }}
                curve="cardinal"
                axisTop={null}
                axisRight={null}
                axisBottom={{
                  tickSize: 5,
                  tickPadding: 5,
                  tickRotation: 0,
                }}
                axisLeft={{
                  tickSize: 5,
                  tickPadding: 5,
                  tickRotation: 0,
                }}
                pointSize={10}
                pointColor="#ffffff"
                pointBorderWidth={2}
                pointBorderColor="#4F46E5"
                pointLabelYOffset={-12}
                useMesh={true}
                colors={['#4F46E5']}
              />
            </div>
          </div>

          {/* Subject Progress Pie Chart */}
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <h3 className="text-lg font-semibold mb-4">Subject Progress</h3>
            <div className="h-[300px]">
              <ResponsivePie
                data={subjectProgress}
                margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
                innerRadius={0.5}
                padAngle={0.7}
                cornerRadius={3}
                colors={{ datum: 'data.color' }}
                borderWidth={1}
                borderColor={{ from: 'color', modifiers: [['darker', 0.2]] }}
                enableArcLinkLabels={true}
                arcLinkLabelsSkipAngle={10}
                arcLinkLabelsTextColor="#333333"
                arcLinkLabelsThickness={2}
                arcLinkLabelsColor={{ from: 'color' }}
                arcLabelsSkipAngle={10}
                arcLabelsTextColor="#ffffff"
              />
            </div>
          </div>
        </div>

        {/* Recent Achievements */}
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <h3 className="text-lg font-semibold mb-4">Recent Achievements</h3>
          <div className="space-y-4">
            {[1, 2, 3].map((_, index) => (
              <div key={index} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                <div className="p-2 bg-indigo-50 rounded-full">
                  <Award className="w-5 h-5 text-indigo-600" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Perfect Attendance</h4>
                  <p className="text-sm text-gray-500">Achieved 100% attendance in Mathematics</p>
                </div>
                <span className="text-xs text-gray-500 ml-auto">2 days ago</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default StudentProgress;
