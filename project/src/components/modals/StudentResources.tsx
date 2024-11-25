import React from 'react';
import { Book, FileText, Video, Download, Search } from 'lucide-react';
import Modal from '../Modal';

interface StudentResourcesProps {
  isOpen: boolean;
  onClose: () => void;
}

const StudentResources: React.FC<StudentResourcesProps> = ({ isOpen, onClose }) => {
  const resources = [
    {
      type: 'document',
      title: 'Mathematics Textbook',
      subject: 'Mathematics',
      format: 'PDF',
      size: '15.2 MB',
      icon: FileText,
    },
    {
      type: 'video',
      title: 'Physics Lab Tutorial',
      subject: 'Physics',
      format: 'MP4',
      size: '256 MB',
      icon: Video,
    },
    {
      type: 'document',
      title: 'Chemistry Notes',
      subject: 'Chemistry',
      format: 'PDF',
      size: '5.8 MB',
      icon: FileText,
    },
    // Add more resources as needed
  ];

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Learning Resources" size="2xl">
      <div className="space-y-6">
        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search resources..."
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <select className="px-4 py-2 border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500">
            <option value="">All Subjects</option>
            <option value="math">Mathematics</option>
            <option value="physics">Physics</option>
            <option value="chemistry">Chemistry</option>
          </select>
        </div>

        {/* Resources Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {resources.map((resource, index) => {
            const Icon = resource.icon;
            return (
              <div key={index} className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3">
                    <div className="p-2 bg-indigo-50 rounded-lg">
                      <Icon className="w-5 h-5 text-indigo-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">{resource.title}</h4>
                      <p className="text-sm text-gray-500">{resource.subject}</p>
                      <div className="flex items-center mt-2 text-sm text-gray-500">
                        <span>{resource.format}</span>
                        <span className="mx-2">•</span>
                        <span>{resource.size}</span>
                      </div>
                    </div>
                  </div>
                  <button className="p-2 text-gray-400 hover:text-indigo-600 transition-colors">
                    <Download className="w-5 h-5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Upload Section */}
        <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-dashed border-gray-300">
          <div className="text-center">
            <Book className="mx-auto h-12 w-12 text-gray-400" />
            <div className="mt-2">
              <p className="text-sm text-gray-500">Need additional resources?</p>
              <button className="mt-2 text-sm font-medium text-indigo-600 hover:text-indigo-500">
                Request Materials
              </button>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default StudentResources;
