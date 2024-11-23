import React, { useState } from 'react';
import { Plus, Search, Filter, Calendar, Clock, Users, BarChart2, Settings } from 'lucide-react';

interface Assessment {
  id: string;
  title: string;
  course: string;
  type: 'quiz' | 'exam' | 'test';
  duration: string;
  totalQuestions: number;
  maxScore: number;
  scheduledDate: string;
  status: 'scheduled' | 'in-progress' | 'completed' | 'draft';
  averageScore?: number;
  submissions?: number;
  totalStudents: number;
}

const mockAssessments: Assessment[] = [
  {
    id: '1',
    title: 'Final Examination',
    course: 'Advanced Web Development',
    type: 'exam',
    duration: '180 minutes',
    totalQuestions: 50,
    maxScore: 100,
    scheduledDate: '2023-12-20',
    status: 'scheduled',
    totalStudents: 45
  },
  {
    id: '2',
    title: 'Mid-term Quiz',
    course: 'Data Structures',
    type: 'quiz',
    duration: '45 minutes',
    totalQuestions: 20,
    maxScore: 40,
    scheduledDate: '2023-12-05',
    status: 'completed',
    averageScore: 35.5,
    submissions: 58,
    totalStudents: 60
  },
  {
    id: '3',
    title: 'Unit Test 3',
    course: 'Machine Learning',
    type: 'test',
    duration: '60 minutes',
    totalQuestions: 30,
    maxScore: 60,
    scheduledDate: '2023-12-15',
    status: 'draft',
    totalStudents: 40
  }
];

const Assessments = () => {
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled':
        return 'bg-blue-100 text-blue-800';
      case 'in-progress':
        return 'bg-yellow-100 text-yellow-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
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
              placeholder="Search assessments..."
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
            <option value="quiz">Quizzes</option>
            <option value="exam">Exams</option>
            <option value="test">Tests</option>
          </select>
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Status</option>
            <option value="scheduled">Scheduled</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
            <option value="draft">Draft</option>
          </select>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
            <Plus className="w-5 h-5" />
            New Assessment
          </button>
        </div>
      </div>

      {/* Assessment Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockAssessments.map((assessment) => (
          <div key={assessment.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="font-semibold text-gray-900">{assessment.title}</h3>
                <p className="text-sm text-gray-500 mt-1">{assessment.course}</p>
              </div>
              <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(assessment.status)}`}>
                {assessment.status}
              </span>
            </div>

            <div className="space-y-3">
              <div className="flex items-center text-sm text-gray-600">
                <Calendar className="w-4 h-4 mr-2" />
                <span>Date: {new Date(assessment.scheduledDate).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Clock className="w-4 h-4 mr-2" />
                <span>Duration: {assessment.duration}</span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Users className="w-4 h-4 mr-2" />
                <span>
                  {assessment.submissions !== undefined 
                    ? `${assessment.submissions} / ${assessment.totalStudents} submissions`
                    : `${assessment.totalStudents} students enrolled`
                  }
                </span>
              </div>
              {assessment.averageScore && (
                <div className="flex items-center text-sm text-gray-600">
                  <BarChart2 className="w-4 h-4 mr-2" />
                  <span>Average Score: {assessment.averageScore}/{assessment.maxScore}</span>
                </div>
              )}
            </div>

            <div className="mt-6 pt-4 border-t border-gray-100">
              <div className="flex justify-between items-center">
                <div className="text-sm">
                  <span className="text-gray-600">{assessment.totalQuestions} questions</span>
                  <span className="mx-2">•</span>
                  <span className="text-gray-600">{assessment.maxScore} points</span>
                </div>
                <div className="flex gap-2">
                  <button className="p-2 text-gray-400 hover:text-gray-600">
                    <Settings className="w-4 h-4" />
                  </button>
                  <button className="px-3 py-1 text-sm text-blue-600 hover:text-blue-800 font-medium">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Assessments;
