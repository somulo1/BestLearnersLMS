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
