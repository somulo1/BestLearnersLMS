import React from 'react';
import { BookOpen, CheckCircle, XCircle, AlertTriangle } from 'lucide-react';
import Modal from '../Modal';

interface AcademicComplianceModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AcademicComplianceModal: React.FC<AcademicComplianceModalProps> = ({ isOpen, onClose }) => {
  const complianceMetrics = [
    { title: 'Course Standards', compliant: 95, total: 100 },
    { title: 'Teacher Qualifications', compliant: 48, total: 50 },
    { title: 'Curriculum Coverage', compliant: 85, total: 90 },
    { title: 'Assessment Methods', compliant: 75, total: 80 },
  ];

  const recentAudits = [
    {
      department: 'Mathematics',
      status: 'Compliant',
      issues: 0,
      lastAudit: '2023-12-01',
      nextAudit: '2024-03-01',
    },
    {
      department: 'Science',
      status: 'Partial',
      issues: 2,
      lastAudit: '2023-11-15',
      nextAudit: '2024-02-15',
    },
    {
      department: 'English',
      status: 'Compliant',
      issues: 0,
      lastAudit: '2023-12-10',
      nextAudit: '2024-03-10',
    },
  ];

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Academic Compliance">
      <div className="space-y-6">
        {/* Compliance Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {complianceMetrics.map((metric, index) => (
            <div key={index} className="bg-white p-4 rounded-lg border">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-sm font-medium text-gray-700">{metric.title}</h4>
                <BookOpen className="h-5 w-5 text-blue-600" />
              </div>
              <div className="relative pt-1">
                <div className="flex mb-2 items-center justify-between">
                  <div>
                    <span className="text-xs font-semibold inline-block text-blue-600">
                      {((metric.compliant / metric.total) * 100).toFixed(1)}%
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-semibold inline-block text-gray-600">
                      {metric.compliant}/{metric.total}
                    </span>
                  </div>
                </div>
                <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-blue-100">
                  <div
                    style={{ width: `${(metric.compliant / metric.total) * 100}%` }}
                    className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-600"
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Recent Audits */}
        <div className="bg-white rounded-lg border">
          <div className="px-4 py-3 border-b">
            <h3 className="text-lg font-medium">Recent Department Audits</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Department
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Issues
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Last Audit
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Next Audit
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {recentAudits.map((audit, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <BookOpen className="h-5 w-5 text-blue-600 mr-2" />
                        <span className="text-sm font-medium text-gray-900">
                          {audit.department}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        audit.status === 'Compliant'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {audit.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {audit.issues}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {audit.lastAudit}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {audit.nextAudit}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Action Items */}
        <div className="bg-white rounded-lg border p-4">
          <h3 className="text-lg font-medium mb-4">Action Items</h3>
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <AlertTriangle className="h-5 w-5 text-yellow-500 mt-0.5" />
              <div>
                <h4 className="text-sm font-medium text-gray-900">Update Science Department Documentation</h4>
                <p className="text-sm text-gray-500">Review and update teaching methodologies documentation</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
              <div>
                <h4 className="text-sm font-medium text-gray-900">Mathematics Curriculum Review</h4>
                <p className="text-sm text-gray-500">Completed annual curriculum review</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default AcademicComplianceModal;
