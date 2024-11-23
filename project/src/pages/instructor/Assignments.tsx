import React, { useState } from 'react';
import { Plus, Search, Filter, Calendar, Clock, Users, CheckCircle, AlertCircle } from 'lucide-react';

interface Assignment {
  id: string;
  title: string;
  course: string;
  dueDate: string;
  status: 'active' | 'draft' | 'closed';
  submissionCount: number;
  totalStudents: number;
  type: 'assignment' | 'quiz' | 'project';
}

const mockAssignments: Assignment[] = [
  {
    id: '1',
    title: 'Final Project: Web Application',
    course: 'Advanced Web Development',
    dueDate: '2023-12-15',
    status: 'active',
    submissionCount: 35,
    totalStudents: 45,
    type: 'project'
  },
  {
    id: '2',
    title: 'Data Structures Implementation',
    course: 'Data Structures and Algorithms',
    dueDate: '2023-12-10',
    status: 'active',
    submissionCount: 55,
    totalStudents: 60,
    type: 'assignment'
  },
  {
    id: '3',
    title: 'Machine Learning Quiz 3',
    course: 'Machine Learning Fundamentals',
    dueDate: '2023-12-20',
    status: 'draft',
    submissionCount: 0,
    totalStudents: 40,
    type: 'quiz'
  }
];

const Assignments = () => {
  const [selectedType, setSelectedType] = useState<string>('all');

  return (
    <div className="space-y-6">
      {/* Actions Bar */}
      <div className="flex flex-wrap gap-4 items-center justify-between">
        <div className="flex-1 min-w-[240px] max-w-md">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search assignments..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        <div className="flex gap-3">
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Types</option>
            <option value="assignment">Assignments</option>
            <option value="quiz">Quizzes</option>
            <option value="project">Projects</option>
          </select>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
            <Plus className="w-5 h-5" />
            New Assignment
          </button>
        </div>
      </div>

      {/* Assignment Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockAssignments.map((assignment) => (
          <div key={assignment.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="font-semibold text-gray-900">{assignment.title}</h3>
                <p className="text-sm text-gray-500 mt-1">{assignment.course}</p>
              </div>
              <span className={`px-2 py-1 text-xs font-semibold rounded-full 
                ${assignment.status === 'active' ? 'bg-green-100 text-green-800' : 
                  assignment.status === 'draft' ? 'bg-yellow-100 text-yellow-800' : 
                  'bg-gray-100 text-gray-800'}`}>
                {assignment.status}
              </span>
            </div>

            <div className="space-y-3">
              <div className="flex items-center text-sm text-gray-600">
                <Calendar className="w-4 h-4 mr-2" />
                <span>Due: {new Date(assignment.dueDate).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Users className="w-4 h-4 mr-2" />
                <span>{assignment.submissionCount} / {assignment.totalStudents} submissions</span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Clock className="w-4 h-4 mr-2" />
                <span>{assignment.type.charAt(0).toUpperCase() + assignment.type.slice(1)}</span>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-gray-100">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  {assignment.submissionCount > 0 ? (
                    <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                  ) : (
                    <AlertCircle className="w-5 h-5 text-yellow-500 mr-2" />
                  )}
                  <span className="text-sm text-gray-600">
                    {assignment.submissionCount > 0 ? 'Submissions received' : 'No submissions yet'}
                  </span>
                </div>
                <button className="px-3 py-1 text-sm text-blue-600 hover:text-blue-800 font-medium">
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Assignments;
