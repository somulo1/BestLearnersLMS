import React from 'react';
import { Shield, AlertTriangle, CheckCircle, Clock, Filter, Search, ArrowUpRight } from 'lucide-react';
import Modal from '../Modal';

interface ComplianceTrackingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ComplianceTrackingModal: React.FC<ComplianceTrackingModalProps> = ({ isOpen, onClose }) => {
  const complianceItems = [
    {
      id: 'COMP-001',
      requirement: 'Data Privacy Policy',
      status: 'Compliant',
      lastChecked: '2023-12-15',
      nextReview: '2024-03-15',
      riskLevel: 'High',
      assignee: 'John Smith',
    },
    {
      id: 'COMP-002',
      requirement: 'Academic Standards',
      status: 'Under Review',
      lastChecked: '2023-12-10',
      nextReview: '2024-01-10',
      riskLevel: 'Medium',
      assignee: 'Sarah Johnson',
    },
    {
      id: 'COMP-003',
      requirement: 'Financial Controls',
      status: 'Non-Compliant',
      lastChecked: '2023-12-01',
      nextReview: '2024-01-01',
      riskLevel: 'Critical',
      assignee: 'Mike Wilson',
    },
  ];

  const categories = [
    'All Categories',
    'Data Privacy',
    'Academic Standards',
    'Financial Controls',
    'Security Measures',
    'Operational Procedures',
  ];

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Compliance Tracking">
      <div className="space-y-6">
        {/* Controls */}
        <div className="flex flex-wrap gap-4">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search requirements..."
              className="pl-10 pr-4 py-2 w-full border rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <select className="px-3 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500">
            {categories.map((category) => (
              <option key={category} value={category.toLowerCase()}>
                {category}
              </option>
            ))}
          </select>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            <Filter className="h-4 w-4 inline mr-2" />
            Filter
          </button>
        </div>

        {/* Compliance Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-600 text-sm font-medium">Compliant</p>
                <p className="text-2xl font-bold text-green-700">75%</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-500" />
            </div>
          </div>
          <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-yellow-600 text-sm font-medium">Under Review</p>
                <p className="text-2xl font-bold text-yellow-700">20%</p>
              </div>
              <Clock className="h-8 w-8 text-yellow-500" />
            </div>
          </div>
          <div className="bg-red-50 p-4 rounded-lg border border-red-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-red-600 text-sm font-medium">Non-Compliant</p>
                <p className="text-2xl font-bold text-red-700">5%</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-500" />
            </div>
          </div>
        </div>

        {/* Compliance Items Table */}
        <div className="bg-white rounded-lg border">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Requirement
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Risk Level
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Last Checked
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Next Review
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {complianceItems.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <Shield className="h-5 w-5 text-gray-400 mr-2" />
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {item.requirement}
                          </div>
                          <div className="text-sm text-gray-500">
                            {item.assignee}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          item.status === 'Compliant'
                            ? 'bg-green-100 text-green-800'
                            : item.status === 'Under Review'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          item.riskLevel === 'High'
                            ? 'bg-orange-100 text-orange-800'
                            : item.riskLevel === 'Medium'
                            ? 'bg-yellow-100 text-yellow-800'
                            : item.riskLevel === 'Critical'
                            ? 'bg-red-100 text-red-800'
                            : 'bg-green-100 text-green-800'
                        }`}
                      >
                        {item.riskLevel}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item.lastChecked}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item.nextReview}
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
            <Shield className="h-5 w-5 mr-2" />
            New Assessment
          </button>
          <button className="flex items-center justify-center px-4 py-3 bg-green-50 text-green-700 rounded-lg hover:bg-green-100">
            <CheckCircle className="h-5 w-5 mr-2" />
            Review Policies
          </button>
          <button className="flex items-center justify-center px-4 py-3 bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100">
            <Clock className="h-5 w-5 mr-2" />
            Schedule Review
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ComplianceTrackingModal;
