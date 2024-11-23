import React from 'react';
import { X, Download, Filter, Search } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const BaseModal: React.FC<{ isOpen: boolean; onClose: () => void; title: string; children: React.ReactNode }> = ({
  isOpen,
  onClose,
  title,
  children
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75" onClick={onClose}></div>
        </div>
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">{title}</h3>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-500"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export const FinancialAuditModal: React.FC<ModalProps> = ({ isOpen, onClose }) => (
  <BaseModal isOpen={isOpen} onClose={onClose} title="Financial Audit">
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="flex space-x-2">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            <Download className="h-4 w-4 inline mr-2" />
            Export Report
          </button>
          <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200">
            <Filter className="h-4 w-4 inline mr-2" />
            Filter
          </button>
        </div>
        <div className="relative">
          <Search className="h-5 w-5 absolute left-3 top-2.5 text-gray-400" />
          <input
            type="text"
            placeholder="Search transactions..."
            className="pl-10 pr-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>
      {/* Add your financial audit content here */}
    </div>
  </BaseModal>
);

export const AcademicComplianceModal: React.FC<ModalProps> = ({ isOpen, onClose }) => (
  <BaseModal isOpen={isOpen} onClose={onClose} title="Academic Compliance">
    <div className="space-y-4">
      {/* Add your academic compliance content here */}
    </div>
  </BaseModal>
);

export const UserAccessAuditModal: React.FC<ModalProps> = ({ isOpen, onClose }) => (
  <BaseModal isOpen={isOpen} onClose={onClose} title="User Access Audit">
    <div className="space-y-4">
      {/* Add your user access audit content here */}
    </div>
  </BaseModal>
);

export const AuditReportsModal: React.FC<ModalProps> = ({ isOpen, onClose }) => (
  <BaseModal isOpen={isOpen} onClose={onClose} title="Audit Reports">
    <div className="space-y-4">
      {/* Add your audit reports content here */}
    </div>
  </BaseModal>
);

export const ComplianceTrackingModal: React.FC<ModalProps> = ({ isOpen, onClose }) => (
  <BaseModal isOpen={isOpen} onClose={onClose} title="Compliance Tracking">
    <div className="space-y-4">
      {/* Add your compliance tracking content here */}
    </div>
  </BaseModal>
);

export const IncidentReportsModal: React.FC<ModalProps> = ({ isOpen, onClose }) => (
  <BaseModal isOpen={isOpen} onClose={onClose} title="Incident Reports">
    <div className="space-y-4">
      {/* Add your incident reports content here */}
    </div>
  </BaseModal>
);

export const SystemReviewsModal: React.FC<ModalProps> = ({ isOpen, onClose }) => (
  <BaseModal isOpen={isOpen} onClose={onClose} title="System Reviews">
    <div className="space-y-4">
      {/* Add your system reviews content here */}
    </div>
  </BaseModal>
);

export const DocumentationModal: React.FC<ModalProps> = ({ isOpen, onClose }) => (
  <BaseModal isOpen={isOpen} onClose={onClose} title="Documentation">
    <div className="space-y-4">
      {/* Add your documentation content here */}
    </div>
  </BaseModal>
);

export const AuditScheduleModal: React.FC<ModalProps> = ({ isOpen, onClose }) => (
  <BaseModal isOpen={isOpen} onClose={onClose} title="Audit Schedule">
    <div className="space-y-4">
      {/* Add your audit schedule content here */}
    </div>
  </BaseModal>
);

export const ActivityLogsModal: React.FC<ModalProps> = ({ isOpen, onClose }) => (
  <BaseModal isOpen={isOpen} onClose={onClose} title="Activity Logs">
    <div className="space-y-4">
      {/* Add your activity logs content here */}
    </div>
  </BaseModal>
);

export const AuditSettingsModal: React.FC<ModalProps> = ({ isOpen, onClose }) => (
  <BaseModal isOpen={isOpen} onClose={onClose} title="Audit Settings">
    <div className="space-y-4">
      {/* Add your audit settings content here */}
    </div>
  </BaseModal>
);
