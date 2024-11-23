import React, { useState } from 'react';
import { ResponsiveBar } from '@nivo/bar';
import { ResponsivePie } from '@nivo/pie';
import { ResponsiveLine } from '@nivo/line';
import { FileText, BarChart2, AlertCircle, CheckCircle } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import AuditorSidebar from '../components/AuditorSidebar';
import {
  FinancialAuditModal,
  AcademicComplianceModal,
  UserAccessAuditModal,
  AuditReportsModal,
  ComplianceTrackingModal,
  IncidentReportsModal,
  SystemReviewsModal,
  DocumentationModal,
  AuditScheduleModal,
  ActivityLogsModal,
  AuditSettingsModal,
} from '../components/modals/AuditorModals';

const stats = [
  { name: 'Reports Generated', value: '24', icon: FileText },
  { name: 'System Metrics', value: '156', icon: BarChart2 },
  { name: 'Issues Found', value: '3', icon: AlertCircle },
  { name: 'Compliance Score', value: '98%', icon: CheckCircle },
];

// Mock data generators for audit-specific metrics
const generateComplianceData = () => [
  { category: 'Content Standards', compliant: 85, nonCompliant: 15 },
  { category: 'Access Controls', compliant: 92, nonCompliant: 8 },
  { category: 'Data Privacy', compliant: 95, nonCompliant: 5 },
  { category: 'User Permissions', compliant: 88, nonCompliant: 12 }
];

const AuditorDashboard: React.FC = () => {
  const user = useAuthStore((state) => state.user);
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

  const handleModalClose = () => {
    setActiveModal(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <AuditorSidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
        onItemClick={setActiveModal}
      />

      {/* Main Content */}
      <div
        className={`
          transition-all duration-300 ease-in-out
          ${isSidebarOpen ? 'md:ml-64' : 'md:ml-0'}
          min-h-screen
        `}
      >
        <div className="p-4 md:p-6 space-y-4 md:space-y-6">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-4 rounded-lg shadow-sm">
            <div className="w-full md:w-auto">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Audit Analytics Dashboard</h1>
              <p className="text-sm md:text-base text-gray-600">Welcome back, {user?.name}</p>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center space-x-3">
                  <stat.icon className="h-6 w-6 text-blue-600" />
                  <div>
                    <h3 className="text-sm font-medium text-gray-600">{stat.name}</h3>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Main Charts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {/* Compliance Chart */}
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold mb-4">Compliance Overview</h3>
              <div className="h-64">
                <ResponsiveBar
                  data={generateComplianceData()}
                  keys={['compliant', 'nonCompliant']}
                  indexBy="category"
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

            {/* Risk Distribution */}
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold mb-4">Risk Distribution</h3>
              <div className="h-64">
                <ResponsivePie
                  data={[
                    { id: 'Low', value: 45, color: 'hsl(152, 70%, 50%)' },
                    { id: 'Medium', value: 35, color: 'hsl(45, 70%, 50%)' },
                    { id: 'High', value: 20, color: 'hsl(0, 70%, 50%)' },
                  ]}
                  theme={theme}
                  margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
                  innerRadius={0.5}
                  padAngle={0.7}
                  cornerRadius={3}
                />
              </div>
            </div>

            {/* Audit Progress */}
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold mb-4">Audit Progress</h3>
              <div className="h-64">
                <ResponsiveLine
                  data={[
                    {
                      id: 'progress',
                      data: [
                        { x: 'Week 1', y: 20 },
                        { x: 'Week 2', y: 45 },
                        { x: 'Week 3', y: 75 },
                        { x: 'Week 4', y: 90 }
                      ]
                    }
                  ]}
                  theme={theme}
                  margin={{ top: 20, right: 20, bottom: 40, left: 40 }}
                  xScale={{ type: 'point' }}
                  yScale={{ type: 'linear', min: 0, max: 100 }}
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
        </div>
      </div>

      {/* Modals */}
      <FinancialAuditModal isOpen={activeModal === 'financial'} onClose={handleModalClose} />
      <AcademicComplianceModal isOpen={activeModal === 'academic'} onClose={handleModalClose} />
      <UserAccessAuditModal isOpen={activeModal === 'users'} onClose={handleModalClose} />
      <AuditReportsModal isOpen={activeModal === 'reports'} onClose={handleModalClose} />
      <ComplianceTrackingModal isOpen={activeModal === 'compliance'} onClose={handleModalClose} />
      <IncidentReportsModal isOpen={activeModal === 'incidents'} onClose={handleModalClose} />
      <SystemReviewsModal isOpen={activeModal === 'reviews'} onClose={handleModalClose} />
      <DocumentationModal isOpen={activeModal === 'documentation'} onClose={handleModalClose} />
      <AuditScheduleModal isOpen={activeModal === 'schedule'} onClose={handleModalClose} />
      <ActivityLogsModal isOpen={activeModal === 'logs'} onClose={handleModalClose} />
      <AuditSettingsModal isOpen={activeModal === 'settings'} onClose={handleModalClose} />
    </div>
  );
};

export default AuditorDashboard;