import React, { useState } from 'react';
import { Search, Upload, Download, File, Folder, MoreVertical, Plus, FileText, Video, Image, Archive } from 'lucide-react';

interface Resource {
  id: string;
  name: string;
  type: 'file' | 'folder' | 'document' | 'video' | 'image' | 'archive';
  size?: string;
  lastModified: string;
  author: string;
  shared: boolean;
  path: string[];
}

const mockResources: Resource[] = [
  {
    id: 'f1',
    name: 'Course Materials',
    type: 'folder',
    lastModified: '2023-12-01',
    author: 'Dr. Anderson',
    shared: true,
    path: ['Course Materials']
  },
  {
    id: 'f2',
    name: 'Lecture Notes Week 1',
    type: 'document',
    size: '2.5 MB',
    lastModified: '2023-12-02',
    author: 'Dr. Anderson',
    shared: true,
    path: ['Course Materials', 'Lecture Notes']
  },
  {
    id: 'f3',
    name: 'Introduction Video',
    type: 'video',
    size: '156 MB',
    lastModified: '2023-12-01',
    author: 'Dr. Anderson',
    shared: true,
    path: ['Course Materials', 'Videos']
  }
];

const Resources = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPath, setCurrentPath] = useState<string[]>([]);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const getIconForType = (type: string) => {
    switch (type) {
      case 'folder':
        return <Folder className="w-6 h-6 text-yellow-500" />;
      case 'document':
        return <FileText className="w-6 h-6 text-blue-500" />;
      case 'video':
        return <Video className="w-6 h-6 text-purple-500" />;
      case 'image':
        return <Image className="w-6 h-6 text-green-500" />;
      case 'archive':
        return <Archive className="w-6 h-6 text-orange-500" />;
      default:
        return <File className="w-6 h-6 text-gray-500" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Actions Bar */}
      <div className="flex flex-wrap gap-4 items-center justify-between">
        <div className="flex-1 min-w-[240px] max-w-md">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search resources..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
            <Upload className="w-5 h-5" />
            Upload
          </button>
          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2">
            <Plus className="w-5 h-5" />
            New Folder
          </button>
        </div>
      </div>

      {/* Breadcrumb Navigation */}
      <div className="flex items-center space-x-2 text-sm">
        <button
          onClick={() => setCurrentPath([])}
          className="text-blue-600 hover:text-blue-800"
        >
          Home
        </button>
        {currentPath.map((path, index) => (
          <React.Fragment key={path}>
            <span className="text-gray-500">/</span>
            <button
              onClick={() => setCurrentPath(currentPath.slice(0, index + 1))}
              className="text-blue-600 hover:text-blue-800"
            >
              {path}
            </button>
          </React.Fragment>
        ))}
      </div>

      {/* Resources List */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Size
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Modified
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Author
                </th>
                <th scope="col" className="relative px-6 py-3">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {mockResources.map((resource) => (
                <tr
                  key={resource.id}
                  className={`hover:bg-gray-50 ${
                    selectedItems.includes(resource.id) ? 'bg-blue-50' : ''
                  }`}
                  onClick={() => {
                    if (resource.type === 'folder') {
                      setCurrentPath([...currentPath, resource.name]);
                    }
                  }}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {getIconForType(resource.type)}
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{resource.name}</div>
                        <div className="text-sm text-gray-500">{resource.type}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {resource.size || '-'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(resource.lastModified).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {resource.author}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-gray-400 hover:text-gray-500">
                      <MoreVertical className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Selected Items Actions */}
      {selectedItems.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="text-sm text-gray-500">
              {selectedItems.length} item(s) selected
            </div>
            <div className="flex gap-3">
              <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2">
                <Download className="w-5 h-5" />
                Download
              </button>
              <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Resources;
