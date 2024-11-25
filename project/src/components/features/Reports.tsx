import React, { useState } from 'react';
import { BarChart2, Download, Filter, Printer, RefreshCw } from 'lucide-react';

interface Report {
  id: string;
  title: string;
  type: 'academic' | 'financial' | 'attendance' | 'performance';
  date: string;
  status: 'completed' | 'processing' | 'failed';
}

const Reports: React.FC = () => {
  const [selectedType, setSelectedType] = useState<string>('all');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });

  const reports: Report[] = [
    {
      id: '1',
      title: 'Student Performance Analysis',
      type: 'academic',
      date: '2024-03-15',
      status: 'completed'
    },
    {
      id: '2',
      title: 'Course Completion Rates',
      type: 'academic',
      date: '2024-03-14',
      status: 'completed'
    },
    {
      id: '3',
      title: 'Monthly Financial Summary',
      type: 'financial',
      date: '2024-03-13',
      status: 'processing'
    },
    {
      id: '4',
      title: 'Student Attendance Report',
      type: 'attendance',
      date: '2024-03-12',
      status: 'completed'
    },
    {
      id: '5',
      title: 'Teacher Performance Metrics',
      type: 'performance',
      date: '2024-03-11',
      status: 'completed'
    }
  ];

  const filteredReports = reports.filter(report => 
    selectedType === 'all' || report.type === selectedType
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'text-green-600 bg-green-100';
      case 'processing':
        return 'text-yellow-600 bg-yellow-100';
      case 'failed':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-900">Reports</h2>
        <div className="flex space-x-2">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center">
            <RefreshCw className="w-4 h-4 mr-2" />
            Generate New Report
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-6 p-4 bg-white rounded-lg shadow-sm">
        <div className="flex items-center">
          <Filter className="w-5 h-5 text-gray-500 mr-2" />
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="all">All Types</option>
            <option value="academic">Academic</option>
            <option value="financial">Financial</option>
            <option value="attendance">Attendance</option>
            <option value="performance">Performance</option>
          </select>
        </div>
        <div className="flex items-center space-x-2">
          <input
            type="date"
            value={dateRange.start}
            onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
            className="border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          <span>to</span>
          <input
            type="date"
            value={dateRange.end}
            onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
            className="border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Reports List */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="min-w-full divide-y divide-gray-200">
          <div className="bg-gray-50 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            <div className="grid grid-cols-5 gap-4">
              <div>Report Name</div>
              <div>Type</div>
              <div>Date Generated</div>
              <div>Status</div>
              <div>Actions</div>
            </div>
          </div>
          <div className="divide-y divide-gray-200">
            {filteredReports.map((report) => (
              <div key={report.id} className="px-6 py-4 whitespace-nowrap">
                <div className="grid grid-cols-5 gap-4">
                  <div className="flex items-center">
                    <BarChart2 className="w-5 h-5 text-gray-400 mr-2" />
                    <span className="text-sm font-medium text-gray-900">{report.title}</span>
                  </div>
                  <div className="text-sm text-gray-500 capitalize">{report.type}</div>
                  <div className="text-sm text-gray-500">{report.date}</div>
                  <div>
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(report.status)}`}>
                      {report.status}
                    </span>
                  </div>
                  <div className="flex space-x-2">
                    <button className="p-2 text-gray-400 hover:text-gray-600">
                      <Download className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-gray-600">
                      <Printer className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;
