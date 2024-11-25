import React from 'react';
import { FileText, Download, Filter, Calendar, Clock, Tag } from 'lucide-react';
import Modal from '../Modal';

interface AuditReportsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AuditReportsModal: React.FC<AuditReportsModalProps> = ({ isOpen, onClose }) => {
  const reports = [
    {
      id: 'REP-001',
      title: 'Annual Financial Audit Report',
      type: 'Financial',
      date: '2023-12-01',
      status: 'Completed',
      author: 'John Smith',
    },
    {
      id: 'REP-002',
      title: 'Academic Compliance Review',
      type: 'Academic',
      date: '2023-11-15',
      status: 'In Progress',
      author: 'Sarah Johnson',
    },
    {
      id: 'REP-003',
      title: 'User Access Audit Summary',
      type: 'Security',
      date: '2023-12-10',
      status: 'Under Review',
      author: 'Mike Wilson',
    },
  ];

  const reportTypes = [
    { label: 'All Reports', value: 'all' },
    { label: 'Financial', value: 'financial' },
    { label: 'Academic', value: 'academic' },
    { label: 'Security', value: 'security' },
    { label: 'Compliance', value: 'compliance' },
  ];

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Audit Reports">
      <div className="space-y-6">
        {/* Filter Controls */}
        <div className="flex flex-wrap gap-4">
          <select className="px-3 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500">
            <option value="">Report Type</option>
            {reportTypes.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>

          <select className="px-3 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500">
            <option value="">Status</option>
            <option value="completed">Completed</option>
            <option value="in-progress">In Progress</option>
            <option value="under-review">Under Review</option>
          </select>

          <input
            type="date"
            className="px-3 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
          />

          <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            <Filter className="h-4 w-4 inline mr-2" />
            Apply Filters
          </button>
        </div>

        {/* Reports List */}
        <div className="bg-white rounded-lg border">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Report Details
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {reports.map((report) => (
                  <tr key={report.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <FileText className="h-5 w-5 text-blue-600 mr-3" />
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {report.title}
                          </div>
                          <div className="text-sm text-gray-500">
                            {report.author}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                        {report.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        {report.date}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        report.status === 'Completed'
                          ? 'bg-green-100 text-green-800'
                          : report.status === 'In Progress'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-purple-100 text-purple-800'
                      }`}>
                        {report.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button className="text-blue-600 hover:text-blue-900 mr-4">
                        <Download className="h-4 w-4" />
                      </button>
                      <button className="text-gray-600 hover:text-gray-900">
                        <FileText className="h-4 w-4" />
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
            <FileText className="h-5 w-5 mr-2" />
            Generate New Report
          </button>
          <button className="flex items-center justify-center px-4 py-3 bg-green-50 text-green-700 rounded-lg hover:bg-green-100">
            <Download className="h-5 w-5 mr-2" />
            Export All Reports
          </button>
          <button className="flex items-center justify-center px-4 py-3 bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100">
            <Tag className="h-5 w-5 mr-2" />
            Manage Categories
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default AuditReportsModal;
