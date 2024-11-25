import React, { useState } from 'react';
import { Search, Filter, Download, Clock, User, AlertCircle, CheckCircle, Info } from 'lucide-react';
import Modal from '../../modals/Modal';

interface ActivityLogsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface ActivityLog {
  id: string;
  action: string;
  user: string;
  timestamp: string;
  type: 'info' | 'warning' | 'error' | 'success';
  details: string;
  ipAddress: string;
}

const ActivityLogsModal: React.FC<ActivityLogsModalProps> = ({ isOpen, onClose }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('all');

  const activityLogs: ActivityLog[] = [
    {
      id: '1',
      action: 'User Login Attempt',
      user: 'john.smith@example.com',
      timestamp: '2024-01-10 09:30:45',
      type: 'success',
      details: 'Successful login from approved IP',
      ipAddress: '192.168.1.100'
    },
    {
      id: '2',
      action: 'File Access',
      user: 'sarah.johnson@example.com',
      timestamp: '2024-01-10 10:15:22',
      type: 'warning',
      details: 'Attempted to access restricted document',
      ipAddress: '192.168.1.101'
    },
    {
      id: '3',
      action: 'System Configuration Change',
      user: 'admin@example.com',
      timestamp: '2024-01-10 11:45:30',
      type: 'info',
      details: 'Updated security settings',
      ipAddress: '192.168.1.102'
    },
    {
      id: '4',
      action: 'Failed Authentication',
      user: 'unknown',
      timestamp: '2024-01-10 12:30:15',
      type: 'error',
      details: 'Multiple failed login attempts',
      ipAddress: '192.168.1.103'
    }
  ];

  const getTypeIcon = (type: ActivityLog['type']) => {
    switch (type) {
      case 'info':
        return <Info className="h-5 w-5 text-blue-500" />;
      case 'warning':
        return <AlertCircle className="h-5 w-5 text-yellow-500" />;
      case 'error':
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      case 'success':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
    }
  };

  const filteredLogs = activityLogs
    .filter(log => 
      (selectedType === 'all' || log.type === selectedType) &&
      (log.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
       log.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
       log.details.toLowerCase().includes(searchQuery.toLowerCase()))
    );

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Activity Logs">
      <div className="space-y-6">
        {/* Controls */}
        <div className="flex flex-wrap gap-4">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search logs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="px-3 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="all">All Types</option>
            <option value="info">Info</option>
            <option value="warning">Warning</option>
            <option value="error">Error</option>
            <option value="success">Success</option>
          </select>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center">
            <Download className="h-4 w-4 mr-2" />
            Export Logs
          </button>
        </div>

        {/* Logs Table */}
        <div className="bg-white rounded-lg border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Action
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    User
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Timestamp
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    IP Address
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {getTypeIcon(log.type)}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">
                        {log.action}
                      </div>
                      <div className="text-sm text-gray-500">
                        {log.details}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <User className="h-4 w-4 text-gray-400 mr-2" />
                        <span className="text-sm text-gray-900">{log.user}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center text-sm text-gray-500">
                        <Clock className="h-4 w-4 text-gray-400 mr-2" />
                        {log.timestamp}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {log.ipAddress}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            { label: 'Total Logs', value: activityLogs.length },
            { label: 'Warnings', value: activityLogs.filter(log => log.type === 'warning').length },
            { label: 'Errors', value: activityLogs.filter(log => log.type === 'error').length },
            { label: 'Success', value: activityLogs.filter(log => log.type === 'success').length }
          ].map((stat, index) => (
            <div key={index} className="bg-white p-4 rounded-lg border">
              <div className="text-sm font-medium text-gray-500">{stat.label}</div>
              <div className="mt-1 text-2xl font-semibold text-gray-900">{stat.value}</div>
            </div>
          ))}
        </div>
      </div>
    </Modal>
  );
};

export default ActivityLogsModal;
