import React, { useState } from 'react';
import { PlusCircle, Search, Bell, Pin, MoreVertical, Users, Calendar, Eye } from 'lucide-react';

interface Announcement {
  id: string;
  title: string;
  content: string;
  author: string;
  date: string;
  priority: 'high' | 'medium' | 'low';
  pinned: boolean;
  views: number;
  targetAudience: string[];
  expiryDate?: string;
}

const mockAnnouncements: Announcement[] = [
  {
    id: 'a1',
    title: 'Important: Final Exam Schedule Update',
    content: 'The final examination has been rescheduled to December 15th, 2023. Please ensure you review the updated exam guidelines...',
    author: 'Dr. Anderson',
    date: '2023-12-01',
    priority: 'high',
    pinned: true,
    views: 145,
    targetAudience: ['All Students', 'Teaching Assistants'],
    expiryDate: '2023-12-15'
  },
  {
    id: 'a2',
    title: 'Week 5 Materials Now Available',
    content: 'The learning materials for Week 5 have been uploaded to the Resources section. This includes lecture slides and practice problems...',
    author: 'Dr. Anderson',
    date: '2023-12-02',
    priority: 'medium',
    pinned: false,
    views: 89,
    targetAudience: ['All Students']
  },
  {
    id: 'a3',
    title: 'Guest Lecture Next Week',
    content: 'We are excited to announce a guest lecture by Professor Smith on Advanced Topics in Machine Learning...',
    author: 'Teaching Assistant',
    date: '2023-12-03',
    priority: 'medium',
    pinned: false,
    views: 56,
    targetAudience: ['All Students', 'Faculty'],
    expiryDate: '2023-12-10'
  }
];

const Announcements = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showNewAnnouncementModal, setShowNewAnnouncementModal] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('all');

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header and Actions */}
      <div className="flex flex-wrap gap-4 items-center justify-between">
        <div className="flex-1 min-w-[240px] max-w-md">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search announcements..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        <button
          onClick={() => setShowNewAnnouncementModal(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
        >
          <PlusCircle className="w-5 h-5" />
          New Announcement
        </button>
      </div>

      {/* Filters */}
      <div className="flex gap-4 border-b border-gray-200">
        <button
          onClick={() => setSelectedFilter('all')}
          className={`px-4 py-2 text-sm font-medium ${
            selectedFilter === 'all'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          All
        </button>
        <button
          onClick={() => setSelectedFilter('pinned')}
          className={`px-4 py-2 text-sm font-medium ${
            selectedFilter === 'pinned'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Pinned
        </button>
        <button
          onClick={() => setSelectedFilter('active')}
          className={`px-4 py-2 text-sm font-medium ${
            selectedFilter === 'active'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Active
        </button>
      </div>

      {/* Announcements List */}
      <div className="space-y-4">
        {mockAnnouncements.map((announcement) => (
          <div
            key={announcement.id}
            className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  {announcement.pinned && (
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded flex items-center gap-1">
                      <Pin className="w-3 h-3" />
                      Pinned
                    </span>
                  )}
                  <span
                    className={`px-2 py-1 text-xs font-medium rounded ${getPriorityColor(
                      announcement.priority
                    )}`}
                  >
                    {announcement.priority.charAt(0).toUpperCase() + announcement.priority.slice(1)} Priority
                  </span>
                </div>
                <h3 className="text-lg font-medium text-gray-900">
                  {announcement.title}
                </h3>
                <p className="text-sm text-gray-500">
                  {announcement.content.substring(0, 150)}...
                </p>
                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                  <span className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    {announcement.targetAudience.join(', ')}
                  </span>
                  <span className="flex items-center gap-1">
                    <Eye className="w-4 h-4" />
                    {announcement.views} views
                  </span>
                  {announcement.expiryDate && (
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      Expires: {new Date(announcement.expiryDate).toLocaleDateString()}
                    </span>
                  )}
                </div>
              </div>
              <button className="text-gray-400 hover:text-gray-500">
                <MoreVertical className="w-5 h-5" />
              </button>
            </div>
            <div className="mt-4 flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                  <Bell className="w-4 h-4 text-gray-500" />
                </div>
                <span className="font-medium text-gray-900">{announcement.author}</span>
              </div>
              <span className="text-gray-500">
                Posted on {new Date(announcement.date).toLocaleDateString()}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* New Announcement Modal */}
      {showNewAnnouncementModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full p-6">
            <h2 className="text-xl font-semibold mb-4">Create New Announcement</h2>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Title
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter announcement title"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Content
                </label>
                <textarea
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 h-32"
                  placeholder="Enter announcement content"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Priority
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Expiry Date
                  </label>
                  <input
                    type="date"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Target Audience
                </label>
                <div className="space-y-2">
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="rounded text-blue-600" />
                    <span className="text-sm text-gray-700">All Students</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="rounded text-blue-600" />
                    <span className="text-sm text-gray-700">Teaching Assistants</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="rounded text-blue-600" />
                    <span className="text-sm text-gray-700">Faculty</span>
                  </label>
                </div>
              </div>
              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowNewAnnouncementModal(false)}
                  className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Create Announcement
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Announcements;
