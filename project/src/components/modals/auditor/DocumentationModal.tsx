import React from 'react';
import { FileText, Search, Filter, Download, FolderOpen, Plus, ExternalLink } from 'lucide-react';
import Modal from '../../modals/Modal';

interface DocumentationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const DocumentationModal: React.FC<DocumentationModalProps> = ({ isOpen, onClose }) => {
  const documents = [
    {
      id: 'DOC-001',
      title: 'Audit Procedures Manual',
      category: 'Procedures',
      lastUpdated: '2023-12-01',
      author: 'John Smith',
      size: '2.5 MB',
      type: 'PDF',
    },
    {
      id: 'DOC-002',
      title: 'Compliance Guidelines 2023',
      category: 'Guidelines',
      lastUpdated: '2023-11-15',
      author: 'Sarah Johnson',
      size: '1.8 MB',
      type: 'DOCX',
    },
    {
      id: 'DOC-003',
      title: 'System Review Templates',
      category: 'Templates',
      lastUpdated: '2023-12-10',
      author: 'Mike Wilson',
      size: '500 KB',
      type: 'XLSX',
    },
  ];

  const categories = [
    'All Categories',
    'Procedures',
    'Guidelines',
    'Templates',
    'Reports',
    'Policies',
  ];

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Documentation">
      <div className="space-y-6">
        {/* Search and Filter Controls */}
        <div className="flex flex-wrap gap-4">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search documents..."
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
          <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">
            <Plus className="h-4 w-4 inline mr-2" />
            New Document
          </button>
        </div>

        {/* Document Categories */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {categories.slice(1).map((category) => (
            <div key={category} className="bg-white p-4 rounded-lg border hover:border-blue-500 cursor-pointer">
              <div className="flex items-center space-x-3">
                <FolderOpen className="h-6 w-6 text-blue-600" />
                <div>
                  <h3 className="text-sm font-medium text-gray-900">{category}</h3>
                  <p className="text-sm text-gray-500">3 documents</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Documents Table */}
        <div className="bg-white rounded-lg border">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Document
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Last Updated
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Size
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {documents.map((doc) => (
                  <tr key={doc.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <FileText className="h-5 w-5 text-gray-400 mr-2" />
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {doc.title}
                          </div>
                          <div className="text-sm text-gray-500">
                            {doc.author}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                        {doc.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {doc.lastUpdated}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {doc.size}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                      <button className="text-blue-600 hover:text-blue-900">
                        <Download className="h-4 w-4 inline" />
                      </button>
                      <button className="text-gray-600 hover:text-gray-900">
                        <ExternalLink className="h-4 w-4 inline" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Upload Section */}
        <div className="bg-gray-50 p-4 rounded-lg border border-dashed border-gray-300">
          <div className="text-center">
            <FileText className="mx-auto h-12 w-12 text-gray-400" />
            <div className="mt-2">
              <label
                htmlFor="file-upload"
                className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500"
              >
                <span>Upload a document</span>
                <input
                  id="file-upload"
                  name="file-upload"
                  type="file"
                  className="sr-only"
                />
              </label>
              <p className="text-xs text-gray-500">
                or drag and drop
              </p>
            </div>
            <p className="text-xs text-gray-500">
              PDF, DOCX, XLSX up to 10MB
            </p>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default DocumentationModal;
