import React from 'react';
import { Users, Shield, AlertTriangle, CheckCircle, Search, Filter } from 'lucide-react';
import Modal from '../Modal';

interface UserAccessAuditModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const UserAccessAuditModal: React.FC<UserAccessAuditModalProps> = ({ isOpen, onClose }) => {
  const accessMetrics = [
    { title: 'Active Users', value: '1,234', change: '+5%', status: 'normal' },
    { title: 'Permission Changes', value: '45', change: '+12%', status: 'warning' },
    { title: 'Failed Logins', value: '23', change: '-8%', status: 'success' },
  ];

  const recentActivity = [
    {
      user: 'John Doe',
      action: 'Permission Change',
      details: 'Added admin access',
      timestamp: '2 hours ago',
      status: 'warning',
    },
    {
      user: 'Jane Smith',
      action: 'Login Attempt',
      details: 'Failed login - wrong password',
      timestamp: '3 hours ago',
      status: 'error',
    },
    {
      user: 'Mike Johnson',
      action: 'Account Creation',
      details: 'New teacher account',
      timestamp: '5 hours ago',
      status: 'success',
    },
  ];

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="User Access Audit">
      <div className="space-y-6">
        {/* Search and Filter */}
        <div className="flex justify-between items-center">
          <div className="relative flex-1 max-w-xs">
            <Search className="h-5 w-5 absolute left-3 top-2.5 text-gray-400" />
            <input
              type="text"
              placeholder="Search users..."
              className="pl-10 pr-4 py-2 w-full border rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200">
            <Filter className="h-4 w-4 inline mr-2" />
            Filter
          </button>
        </div>

        {/* Access Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {accessMetrics.map((metric, index) => (
            <div key={index} className="bg-white p-4 rounded-lg border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">{metric.title}</p>
                  <p className="text-2xl font-bold">{metric.value}</p>
                  <span className={`text-sm ${
                    metric.change.startsWith('+') ? 'text-yellow-600' : 'text-green-600'
                  }`}>
                    {metric.change}
                  </span>
                </div>
                {metric.status === 'warning' ? (
                  <AlertTriangle className="h-8 w-8 text-yellow-500" />
                ) : metric.status === 'success' ? (
                  <CheckCircle className="h-8 w-8 text-green-500" />
                ) : (
                  <Shield className="h-8 w-8 text-blue-500" />
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-lg border">
          <div className="px-4 py-3 border-b">
            <h3 className="text-lg font-medium">Recent Access Activity</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    User
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Action
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Details
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Time
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {recentActivity.map((activity, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center">
                          <Users className="h-4 w-4 text-gray-500" />
                        </div>
                        <span className="ml-2 text-sm font-medium text-gray-900">
                          {activity.user}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {activity.action}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {activity.details}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {activity.timestamp}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        activity.status === 'success'
                          ? 'bg-green-100 text-green-800'
                          : activity.status === 'warning'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {activity.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Security Recommendations */}
        <div className="bg-white rounded-lg border p-4">
          <h3 className="text-lg font-medium mb-4">Security Recommendations</h3>
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <AlertTriangle className="h-5 w-5 text-yellow-500 mt-0.5" />
              <div>
                <h4 className="text-sm font-medium text-gray-900">Review Admin Permissions</h4>
                <p className="text-sm text-gray-500">5 users have elevated permissions that haven't been used in 30 days</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <Shield className="h-5 w-5 text-blue-500 mt-0.5" />
              <div>
                <h4 className="text-sm font-medium text-gray-900">Enable Two-Factor Authentication</h4>
                <p className="text-sm text-gray-500">Recommend enabling 2FA for all admin accounts</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default UserAccessAuditModal;
