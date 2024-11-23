import React, { useState } from 'react';
import { Search, MessageCircle, Users, PlusCircle, MoreVertical, ThumbsUp, MessageSquare } from 'lucide-react';

interface Discussion {
  id: string;
  title: string;
  author: string;
  date: string;
  content: string;
  replies: number;
  likes: number;
  tags: string[];
  pinned?: boolean;
}

const mockDiscussions: Discussion[] = [
  {
    id: 'd1',
    title: 'Welcome to the Course Discussion Forum',
    author: 'Dr. Anderson',
    date: '2023-12-01',
    content: 'Welcome everyone! This is the main discussion forum for our course...',
    replies: 15,
    likes: 24,
    tags: ['announcement', 'welcome'],
    pinned: true
  },
  {
    id: 'd2',
    title: 'Week 1 Discussion: Introduction to Course Concepts',
    author: 'Dr. Anderson',
    date: '2023-12-02',
    content: "Let's discuss the key concepts we covered in Week 1...",
    replies: 8,
    likes: 12,
    tags: ['week1', 'discussion']
  },
  {
    id: 'd3',
    title: 'Questions about Assignment #1',
    author: 'Teaching Assistant',
    date: '2023-12-03',
    content: 'This thread is for questions related to Assignment #1...',
    replies: 25,
    likes: 18,
    tags: ['assignment', 'help']
  }
];

const Discussions = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  return (
    <div className="space-y-6">
      {/* Header and Actions */}
      <div className="flex flex-wrap gap-4 items-center justify-between">
        <div className="flex-1 min-w-[240px] max-w-md">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search discussions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
          <PlusCircle className="w-5 h-5" />
          New Discussion
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
          All Discussions
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
          onClick={() => setSelectedFilter('my-posts')}
          className={`px-4 py-2 text-sm font-medium ${
            selectedFilter === 'my-posts'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          My Posts
        </button>
      </div>

      {/* Discussions List */}
      <div className="space-y-4">
        {mockDiscussions.map((discussion) => (
          <div
            key={discussion.id}
            className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  {discussion.pinned && (
                    <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs font-medium rounded">
                      Pinned
                    </span>
                  )}
                  {discussion.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <h3 className="text-lg font-medium text-gray-900">
                  {discussion.title}
                </h3>
                <p className="text-sm text-gray-500">
                  {discussion.content.substring(0, 150)}...
                </p>
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <span className="flex items-center gap-1">
                    <MessageSquare className="w-4 h-4" />
                    {discussion.replies} replies
                  </span>
                  <span className="flex items-center gap-1">
                    <ThumbsUp className="w-4 h-4" />
                    {discussion.likes} likes
                  </span>
                </div>
              </div>
              <button className="text-gray-400 hover:text-gray-500">
                <MoreVertical className="w-5 h-5" />
              </button>
            </div>
            <div className="mt-4 flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                  <Users className="w-4 h-4 text-gray-500" />
                </div>
                <span className="font-medium text-gray-900">{discussion.author}</span>
              </div>
              <span className="text-gray-500">
                {new Date(discussion.date).toLocaleDateString()}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between border-t border-gray-200 pt-4">
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-700">
            Showing <span className="font-medium">1</span> to{' '}
            <span className="font-medium">3</span> of{' '}
            <span className="font-medium">12</span> discussions
          </span>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
            Previous
          </button>
          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Discussions;
