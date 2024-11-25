import React, { useState } from 'react';
import { Save, Bell, Shield, Clock, Mail, User, Lock } from 'lucide-react';
import Modal from '../../modals/Modal';

interface AuditSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface NotificationSetting {
  id: string;
  label: string;
  description: string;
  enabled: boolean;
}

interface SecuritySetting {
  id: string;
  label: string;
  description: string;
  value: string;
}

const AuditSettingsModal: React.FC<AuditSettingsModalProps> = ({ isOpen, onClose }) => {
  const [notificationSettings, setNotificationSettings] = useState<NotificationSetting[]>([
    {
      id: 'new-audit',
      label: 'New Audit Notifications',
      description: 'Receive notifications when new audits are scheduled',
      enabled: true
    },
    {
      id: 'audit-complete',
      label: 'Audit Completion',
      description: 'Get notified when audits are completed',
      enabled: true
    },
    {
      id: 'critical-findings',
      label: 'Critical Findings',
      description: 'Immediate notifications for critical audit findings',
      enabled: true
    },
    {
      id: 'report-ready',
      label: 'Report Ready',
      description: 'Notification when audit reports are ready for review',
      enabled: false
    }
  ]);

  const [securitySettings, setSecuritySettings] = useState<SecuritySetting[]>([
    {
      id: 'session-timeout',
      label: 'Session Timeout',
      description: 'Automatically log out after period of inactivity',
      value: '30'
    },
    {
      id: 'ip-restriction',
      label: 'IP Restriction',
      description: 'Restrict access to specific IP addresses',
      value: ''
    },
    {
      id: 'two-factor',
      label: 'Two-Factor Authentication',
      description: 'Require 2FA for sensitive operations',
      value: 'enabled'
    }
  ]);

  const handleNotificationToggle = (id: string) => {
    setNotificationSettings(settings =>
      settings.map(setting =>
        setting.id === id ? { ...setting, enabled: !setting.enabled } : setting
      )
    );
  };

  const handleSecuritySettingChange = (id: string, value: string) => {
    setSecuritySettings(settings =>
      settings.map(setting =>
        setting.id === id ? { ...setting, value } : setting
      )
    );
  };

  const handleSave = () => {
    // TODO: Implement settings save functionality
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Audit Settings">
      <div className="space-y-6">
        {/* Notification Settings */}
        <div className="space-y-4">
          <div className="flex items-center">
            <Bell className="h-5 w-5 text-gray-400 mr-2" />
            <h3 className="text-lg font-medium text-gray-900">Notification Preferences</h3>
          </div>
          <div className="space-y-3">
            {notificationSettings.map((setting) => (
              <div key={setting.id} className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id={setting.id}
                    type="checkbox"
                    checked={setting.enabled}
                    onChange={() => handleNotificationToggle(setting.id)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                </div>
                <div className="ml-3">
                  <label htmlFor={setting.id} className="text-sm font-medium text-gray-900">
                    {setting.label}
                  </label>
                  <p className="text-sm text-gray-500">{setting.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Security Settings */}
        <div className="space-y-4">
          <div className="flex items-center">
            <Shield className="h-5 w-5 text-gray-400 mr-2" />
            <h3 className="text-lg font-medium text-gray-900">Security Settings</h3>
          </div>
          <div className="space-y-4">
            {securitySettings.map((setting) => (
              <div key={setting.id} className="space-y-2">
                <label className="block text-sm font-medium text-gray-900">
                  {setting.label}
                </label>
                <p className="text-sm text-gray-500">{setting.description}</p>
                {setting.id === 'session-timeout' ? (
                  <select
                    value={setting.value}
                    onChange={(e) => handleSecuritySettingChange(setting.id, e.target.value)}
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                  >
                    <option value="15">15 minutes</option>
                    <option value="30">30 minutes</option>
                    <option value="60">1 hour</option>
                    <option value="120">2 hours</option>
                  </select>
                ) : setting.id === 'ip-restriction' ? (
                  <input
                    type="text"
                    value={setting.value}
                    onChange={(e) => handleSecuritySettingChange(setting.id, e.target.value)}
                    placeholder="Enter IP addresses (comma-separated)"
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                ) : (
                  <select
                    value={setting.value}
                    onChange={(e) => handleSecuritySettingChange(setting.id, e.target.value)}
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                  >
                    <option value="enabled">Enabled</option>
                    <option value="disabled">Disabled</option>
                  </select>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Email Settings */}
        <div className="space-y-4">
          <div className="flex items-center">
            <Mail className="h-5 w-5 text-gray-400 mr-2" />
            <h3 className="text-lg font-medium text-gray-900">Email Settings</h3>
          </div>
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-900">
                Email Notifications To
              </label>
              <input
                type="email"
                placeholder="Enter email addresses"
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-900">
                Email Frequency
              </label>
              <select className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md">
                <option>Immediately</option>
                <option>Daily Summary</option>
                <option>Weekly Summary</option>
              </select>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center"
          >
            <Save className="h-4 w-4 mr-2" />
            Save Settings
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default AuditSettingsModal;
