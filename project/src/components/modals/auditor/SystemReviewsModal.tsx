import React from 'react';
import { CheckCircle, Search, Filter, Clock, Settings, ArrowUpRight, AlertTriangle } from 'lucide-react';
import Modal from '../Modal';

interface SystemReviewsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SystemReviewsModal: React.FC<SystemReviewsModalProps> = ({ isOpen, onClose }) => {
  const reviews = [
    {
      id: 'REV-001',
      system: 'Student Management Module',
      lastReview: '2023-12-01',
      nextReview: '2024-03-01',
      status: 'Completed',
      healthScore: 92,
      reviewer: 'John Smith',
      findings: 'Minor performance optimizations needed',
    },
    {
      id: 'REV-002',
      system: 'Course Management System',
      lastReview: '2023-11-15',
      nextReview: '2024-02-15',
      status: 'In Progress',
      healthScore: 78,
      reviewer: 'Sarah Johnson',
      findings: 'Database indexing improvements required',
    },
    {
      id: 'REV-003',
      system: 'Assessment Platform',
      lastReview: '2023-10-30',
      nextReview: '2024-01-30',
      status: 'Scheduled',
      healthScore: 85,
      reviewer: 'Mike Wilson',
      findings: 'Pending security assessment',
    },
  ];

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="System Reviews">
      <div className="space-y-6">
        {/* Controls */}
        <div className="flex flex-wrap gap-4">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search systems..."
              className="pl-10 pr-4 py-2 w-full border rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <select className="px-3 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500">
            <option value="">All Systems</option>
            <option value="student">Student Management</option>
            <option value="course">Course Management</option>
            <option value="assessment">Assessment</option>
            <option value="reporting">Reporting</option>
          </select>
          <select className="px-3 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500">
            <option value="">All Statuses</option>
            <option value="completed">Completed</option>
            <option value="in-progress">In Progress</option>
            <option value="scheduled">Scheduled</option>
          </select>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            <Filter className="h-4 w-4 inline mr-2" />
            Filter
          </button>
        </div>

        {/* System Health Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-600 text-sm font-medium">Healthy Systems</p>
                <p className="text-2xl font-bold text-green-700">8</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-500" />
            </div>
          </div>
          <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-yellow-600 text-sm font-medium">Needs Attention</p>
                <p className="text-2xl font-bold text-yellow-700">3</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-yellow-500" />
            </div>
          </div>
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-600 text-sm font-medium">Pending Reviews</p>
                <p className="text-2xl font-bold text-blue-700">4</p>
              </div>
              <Clock className="h-8 w-8 text-blue-500" />
            </div>
          </div>
        </div>

        {/* Reviews Table */}
        <div className="bg-white rounded-lg border">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    System
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Health Score
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Last Review
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
                {reviews.map((review) => (
                  <tr key={review.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <Settings className="h-5 w-5 text-gray-400 mr-2" />
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {review.system}
                          </div>
                          <div className="text-sm text-gray-500">
                            {review.reviewer}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            review.healthScore >= 90
                              ? 'bg-green-100 text-green-800'
                              : review.healthScore >= 70
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-red-100 text-red-800'
                          }`}
                        >
                          {review.healthScore}%
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          review.status === 'Completed'
                            ? 'bg-green-100 text-green-800'
                            : review.status === 'In Progress'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-blue-100 text-blue-800'
                        }`}
                      >
                        {review.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {review.lastReview}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {review.nextReview}
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
            <Settings className="h-5 w-5 mr-2" />
            New Review
          </button>
          <button className="flex items-center justify-center px-4 py-3 bg-green-50 text-green-700 rounded-lg hover:bg-green-100">
            <CheckCircle className="h-5 w-5 mr-2" />
            Health Check
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

export default SystemReviewsModal;
