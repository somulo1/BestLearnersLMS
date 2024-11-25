import React from 'react';
import { AlertTriangle, Search, Filter, Clock, AlertCircle, CheckCircle, ArrowUpRight } from 'lucide-react';
import Modal from '../Modal';

interface IncidentReportsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const IncidentReportsModal: React.FC<IncidentReportsModalProps> = ({ isOpen, onClose }) => {
  const incidents = [
    {
      id: 'INC-001',
      title: 'Unauthorized Access Attempt',
      type: 'Security',
      severity: 'High',
      status: 'Open',
      reportedBy: 'System Monitor',
      reportedAt: '2023-12-15 14:30',
      description: 'Multiple failed login attempts detected from unknown IP',
    },
    {
      id: 'INC-002',
      title: 'Data Integrity Issue',
      type: 'Data',
      severity: 'Medium',
      status: 'In Progress',
      reportedBy: 'Jane Smith',
      reportedAt: '2023-12-14 09:15',
      description: 'Inconsistency detected in student records database',
    },
    {
      id: 'INC-003',
      title: 'System Performance Degradation',
      type: 'System',
      severity: 'Low',
      status: 'Resolved',
      reportedBy: 'Mike Wilson',
      reportedAt: '2023-12-13 16:45',
      description: 'Slow response times in the grading module',
    },
  ];

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Incident Reports">
      <div className="space-y-6">
        {/* Search and Filter Controls */}
        <div className="flex flex-wrap gap-4">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search incidents..."
              className="pl-10 pr-4 py-2 w-full border rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <select className="px-3 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500">
            <option value="">All Types</option>
            <option value="security">Security</option>
            <option value="data">Data</option>
            <option value="system">System</option>
            <option value="user">User</option>
          </select>
          <select className="px-3 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500">
            <option value="">All Severities</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            <Filter className="h-4 w-4 inline mr-2" />
            Filter
          </button>
        </div>

        {/* Incident Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-red-50 p-4 rounded-lg border border-red-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-red-600 text-sm font-medium">Open</p>
                <p className="text-2xl font-bold text-red-700">3</p>
              </div>
              <AlertCircle className="h-8 w-8 text-red-500" />
            </div>
          </div>
          <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-yellow-600 text-sm font-medium">In Progress</p>
                <p className="text-2xl font-bold text-yellow-700">5</p>
              </div>
              <Clock className="h-8 w-8 text-yellow-500" />
            </div>
          </div>
          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-600 text-sm font-medium">Resolved</p>
                <p className="text-2xl font-bold text-green-700">12</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-500" />
            </div>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-600 text-sm font-medium">Total</p>
                <p className="text-2xl font-bold text-purple-700">20</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-purple-500" />
            </div>
          </div>
        </div>

        {/* Incidents Table */}
        <div className="bg-white rounded-lg border">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Incident
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Severity
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Reported
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {incidents.map((incident) => (
                  <tr key={incident.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <AlertTriangle className="h-5 w-5 text-gray-400 mr-2" />
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {incident.title}
                          </div>
                          <div className="text-sm text-gray-500">
                            {incident.description}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                        {incident.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          incident.severity === 'High'
                            ? 'bg-red-100 text-red-800'
                            : incident.severity === 'Medium'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-green-100 text-green-800'
                        }`}
                      >
                        {incident.severity}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          incident.status === 'Open'
                            ? 'bg-red-100 text-red-800'
                            : incident.status === 'In Progress'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-green-100 text-green-800'
                        }`}
                      >
                        {incident.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{incident.reportedBy}</div>
                      <div className="text-sm text-gray-500">{incident.reportedAt}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button className="text-blue-600 hover:text-blue-900">
                        <ArrowUpRight className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="flex items-center justify-center px-4 py-3 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100">
            <AlertTriangle className="h-5 w-5 mr-2" />
            Report Incident
          </button>
          <button className="flex items-center justify-center px-4 py-3 bg-green-50 text-green-700 rounded-lg hover:bg-green-100">
            <CheckCircle className="h-5 w-5 mr-2" />
            Bulk Update
          </button>
          <button className="flex items-center justify-center px-4 py-3 bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100">
            <Clock className="h-5 w-5 mr-2" />
            View History
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default IncidentReportsModal;
