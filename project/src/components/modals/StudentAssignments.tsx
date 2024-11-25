import React, { useState } from 'react';
import { FileText, Calendar, Clock, CheckCircle, XCircle, Filter } from 'lucide-react';
import Modal from './Modal';

interface Assignment {
  id: number;
  title: string;
  subject: string;
  dueDate: string;
  status: 'pending' | 'submitted' | 'graded' | 'late';
  grade?: string;
  description: string;
}

interface StudentAssignmentsProps {
  isOpen: boolean;
  onClose: () => void;
}

const StudentAssignments: React.FC<StudentAssignmentsProps> = ({ isOpen, onClose }) => {
  const [filter, setFilter] = useState<'all' | 'pending' | 'submitted' | 'graded'>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const assignments: Assignment[] = [
    {
      id: 1,
      title: 'Mathematics Problem Set 3',
      subject: 'Mathematics',
      dueDate: '2024-02-01',
      status: 'pending',
      description: 'Complete problems 1-20 from Chapter 3: Calculus Integration'
    },
    {
      id: 2,
      title: 'English Literature Essay',
      subject: 'English',
      dueDate: '2024-01-28',
      status: 'submitted',
      description: 'Write a 1000-word essay analyzing the themes in Shakespeare\'s Macbeth'
    },
    {
      id: 3,
      title: 'Physics Lab Report',
      subject: 'Physics',
      dueDate: '2024-01-25',
      status: 'graded',
      grade: '92',
      description: 'Write a detailed report on the pendulum experiment conducted in lab'
    },
    {
      id: 4,
      title: 'History Research Paper',
      subject: 'History',
      dueDate: '2024-01-20',
      status: 'late',
      description: 'Research paper on the Industrial Revolution and its global impact'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'submitted':
        return 'bg-blue-100 text-blue-800';
      case 'graded':
        return 'bg-green-100 text-green-800';
      case 'late':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredAssignments = assignments.filter(assignment => {
    const matchesFilter = filter === 'all' || assignment.status === filter;
    const matchesSearch = assignment.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         assignment.subject.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="2xl">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h2 className="text-2xl font-bold text-gray-900">Assignments</h2>
          <div className="flex items-center gap-2">
            <div className="relative">
              <input
                type="text"
                placeholder="Search assignments..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-3 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
              <Filter className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filter === 'all'
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilter('pending')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filter === 'pending'
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Pending
          </button>
          <button
            onClick={() => setFilter('submitted')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filter === 'submitted'
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Submitted
          </button>
          <button
            onClick={() => setFilter('graded')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filter === 'graded'
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Graded
          </button>
        </div>

        {/* Assignments List */}
        <div className="space-y-4">
          {filteredAssignments.map((assignment) => (
            <div
              key={assignment.id}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow duration-200"
            >
              <div className="sm:flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center">
                    <div className="p-2 bg-indigo-50 rounded-lg">
                      <FileText className="w-5 h-5 text-indigo-600" />
                    </div>
                    <div className="ml-3">
                      <h3 className="text-lg font-semibold text-gray-900">{assignment.title}</h3>
                      <p className="text-sm text-gray-500">{assignment.subject}</p>
                    </div>
                  </div>
                  <p className="mt-2 text-sm text-gray-600">{assignment.description}</p>
                  <div className="mt-2 flex items-center gap-4">
                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar className="w-4 h-4 mr-1" />
                      Due: {new Date(assignment.dueDate).toLocaleDateString()}
                    </div>
                    {assignment.grade && (
                      <div className="flex items-center text-sm text-gray-500">
                        <CheckCircle className="w-4 h-4 mr-1 text-green-500" />
                        Grade: {assignment.grade}%
                      </div>
                    )}
                  </div>
                </div>
                <div className="mt-4 sm:mt-0 sm:ml-4 flex flex-col sm:items-end gap-2">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(assignment.status)}`}>
                    {assignment.status.charAt(0).toUpperCase() + assignment.status.slice(1)}
                  </span>
                  <button className="px-4 py-2 bg-indigo-50 text-indigo-600 rounded-lg hover:bg-indigo-100 transition-colors duration-200 text-sm font-medium">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Modal>
  );
};

export default StudentAssignments;
