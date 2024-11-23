import React, { useState } from 'react';
import {
  Settings as SettingsIcon,
  User,
  Book,
  Bell,
  Lock,
  Mail,
  Calendar,
  Users,
  Shield,
  Save,
  Clock,
  Globe,
} from 'lucide-react';

interface CourseSettings {
  name: string;
  code: string;
  description: string;
  startDate: string;
  endDate: string;
  timezone: string;
  language: string;
  enrollmentKey: string;
  maxStudents: number;
  visibility: 'public' | 'private' | 'invitation';
}

interface NotificationSettings {
  emailNotifications: boolean;
  assignmentSubmissions: boolean;
  discussionReplies: boolean;
  gradeUpdates: boolean;
  courseAnnouncements: boolean;
  dailyDigest: boolean;
}

const mockCourseSettings: CourseSettings = {
  name: 'Advanced Web Development',
  code: 'CS-401',
  description: 'Learn advanced concepts in modern web development...',
  startDate: '2024-01-15',
  endDate: '2024-05-15',
  timezone: 'America/New_York',
  language: 'English',
  enrollmentKey: 'web2024',
  maxStudents: 50,
  visibility: 'private'
};

const mockNotificationSettings: NotificationSettings = {
  emailNotifications: true,
  assignmentSubmissions: true,
  discussionReplies: true,
  gradeUpdates: true,
  courseAnnouncements: true,
  dailyDigest: false
};

const Settings = () => {
  const [activeTab, setActiveTab] = useState('course');
  const [courseSettings, setCourseSettings] = useState<CourseSettings>(mockCourseSettings);
  const [notificationSettings, setNotificationSettings] = useState<NotificationSettings>(mockNotificationSettings);
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = () => {
    setIsEditing(false);
    // TODO: Implement API call to save settings
  };

  const renderCourseSettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Course Name
          </label>
          <input
            type="text"
            value={courseSettings.name}
            disabled={!isEditing}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50 disabled:text-gray-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Course Code
          </label>
          <input
            type="text"
            value={courseSettings.code}
            disabled={!isEditing}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50 disabled:text-gray-500"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Course Description
        </label>
        <textarea
          value={courseSettings.description}
          disabled={!isEditing}
          rows={4}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50 disabled:text-gray-500"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Start Date
          </label>
          <input
            type="date"
            value={courseSettings.startDate}
            disabled={!isEditing}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50 disabled:text-gray-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            End Date
          </label>
          <input
            type="date"
            value={courseSettings.endDate}
            disabled={!isEditing}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50 disabled:text-gray-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Timezone
          </label>
          <select
            value={courseSettings.timezone}
            disabled={!isEditing}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50 disabled:text-gray-500"
          >
            <option value="America/New_York">Eastern Time (ET)</option>
            <option value="America/Chicago">Central Time (CT)</option>
            <option value="America/Denver">Mountain Time (MT)</option>
            <option value="America/Los_Angeles">Pacific Time (PT)</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Language
          </label>
          <select
            value={courseSettings.language}
            disabled={!isEditing}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50 disabled:text-gray-500"
          >
            <option value="English">English</option>
            <option value="Spanish">Spanish</option>
            <option value="French">French</option>
            <option value="German">German</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Enrollment Key
          </label>
          <input
            type="text"
            value={courseSettings.enrollmentKey}
            disabled={!isEditing}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50 disabled:text-gray-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Maximum Students
          </label>
          <input
            type="number"
            value={courseSettings.maxStudents}
            disabled={!isEditing}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50 disabled:text-gray-500"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Course Visibility
        </label>
        <select
          value={courseSettings.visibility}
          disabled={!isEditing}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50 disabled:text-gray-500"
        >
          <option value="public">Public</option>
          <option value="private">Private</option>
          <option value="invitation">Invitation Only</option>
        </select>
      </div>
    </div>
  );

  const renderNotificationSettings = () => (
    <div className="space-y-6">
      <div className="space-y-4">
        <label className="flex items-center gap-3">
          <input
            type="checkbox"
            checked={notificationSettings.emailNotifications}
            onChange={() => {}}
            disabled={!isEditing}
            className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 disabled:opacity-50"
          />
          <span className="text-sm text-gray-700">Enable Email Notifications</span>
        </label>
        <label className="flex items-center gap-3">
          <input
            type="checkbox"
            checked={notificationSettings.assignmentSubmissions}
            onChange={() => {}}
            disabled={!isEditing}
            className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 disabled:opacity-50"
          />
          <span className="text-sm text-gray-700">Assignment Submissions</span>
        </label>
        <label className="flex items-center gap-3">
          <input
            type="checkbox"
            checked={notificationSettings.discussionReplies}
            onChange={() => {}}
            disabled={!isEditing}
            className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 disabled:opacity-50"
          />
          <span className="text-sm text-gray-700">Discussion Replies</span>
        </label>
        <label className="flex items-center gap-3">
          <input
            type="checkbox"
            checked={notificationSettings.gradeUpdates}
            onChange={() => {}}
            disabled={!isEditing}
            className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 disabled:opacity-50"
          />
          <span className="text-sm text-gray-700">Grade Updates</span>
        </label>
        <label className="flex items-center gap-3">
          <input
            type="checkbox"
            checked={notificationSettings.courseAnnouncements}
            onChange={() => {}}
            disabled={!isEditing}
            className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 disabled:opacity-50"
          />
          <span className="text-sm text-gray-700">Course Announcements</span>
        </label>
        <label className="flex items-center gap-3">
          <input
            type="checkbox"
            checked={notificationSettings.dailyDigest}
            onChange={() => {}}
            disabled={!isEditing}
            className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 disabled:opacity-50"
          />
          <span className="text-sm text-gray-700">Daily Digest</span>
        </label>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-gray-900">Settings</h2>
        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Edit Settings
          </button>
        ) : (
          <button
            onClick={handleSave}
            className="px-4 py-2 text-sm bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            Save Changes
          </button>
        )}
      </div>

      {/* Settings Navigation */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8">
          <button
            onClick={() => setActiveTab('course')}
            className={`px-1 py-4 text-sm font-medium border-b-2 ${
              activeTab === 'course'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Course Settings
          </button>
          <button
            onClick={() => setActiveTab('notifications')}
            className={`px-1 py-4 text-sm font-medium border-b-2 ${
              activeTab === 'notifications'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Notification Settings
          </button>
        </nav>
      </div>

      {/* Settings Content */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        {activeTab === 'course' ? renderCourseSettings() : renderNotificationSettings()}
      </div>
    </div>
  );
};

export default Settings;
