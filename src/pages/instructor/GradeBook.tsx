import React, { useState } from 'react';
import { Search, Filter, Download, Upload, Edit2, Save, X, BarChart2 } from 'lucide-react';

interface GradeEntry {
  studentId: string;
  studentName: string;
  assignments: {
    id: string;
    name: string;
    score: number;
    maxScore: number;
    weight: number;
    type: 'assignment' | 'quiz' | 'exam' | 'project';
    submitted: string;
  }[];
  totalGrade: number;
  letterGrade: string;
}

const mockGrades: GradeEntry[] = [
  {
    studentId: '1',
    studentName: 'John Smith',
    assignments: [
      {
        id: 'a1',
        name: 'Project Phase 1',
        score: 85,
        maxScore: 100,
        weight: 0.2,
        type: 'project',
        submitted: '2023-11-15'
      },
      {
        id: 'a2',
        name: 'Midterm Exam',
        score: 78,
        maxScore: 100,
        weight: 0.3,
        type: 'exam',
        submitted: '2023-11-20'
      },
      {
        id: 'a3',
        name: 'Quiz 1',
        score: 90,
        maxScore: 100,
        weight: 0.1,
        type: 'quiz',
        submitted: '2023-11-25'
      }
    ],
    totalGrade: 82.7,
    letterGrade: 'B'
  },
  {
    studentId: '2',
    studentName: 'Emma Johnson',
    assignments: [
      {
        id: 'a1',
        name: 'Project Phase 1',
        score: 92,
        maxScore: 100,
        weight: 0.2,
        type: 'project',
        submitted: '2023-11-15'
      },
      {
        id: 'a2',
        name: 'Midterm Exam',
        score: 88,
        maxScore: 100,
        weight: 0.3,
        type: 'exam',
        submitted: '2023-11-20'
      },
      {
        id: 'a3',
        name: 'Quiz 1',
        score: 95,
        maxScore: 100,
        weight: 0.1,
        type: 'quiz',
        submitted: '2023-11-25'
      }
    ],
    totalGrade: 91.1,
    letterGrade: 'A'
  }
];

const Gradebook = () => {
  const [selectedAssignment, setSelectedAssignment] = useState<string>('all');
  const [editMode, setEditMode] = useState(false);
  const [showStats, setShowStats] = useState(false);

  const calculateStats = (assignmentId: string) => {
    const scores = mockGrades.map(grade => 
      grade.assignments.find(a => a.id === assignmentId)?.score || 0
    );
    const avg = scores.reduce((a, b) => a + b, 0) / scores.length;
    const max = Math.max(...scores);
    const min = Math.min(...scores);
    
    return { avg, max, min };
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
              placeholder="Search students..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        <div className="flex gap-3">
          <select
            value={selectedAssignment}
            onChange={(e) => setSelectedAssignment(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Assignments</option>
            <option value="a1">Project Phase 1</option>
            <option value="a2">Midterm Exam</option>
            <option value="a3">Quiz 1</option>
          </select>
          <button 
            onClick={() => setShowStats(!showStats)}
            className={`px-4 py-2 border rounded-lg transition-colors flex items-center gap-2
              ${showStats ? 'bg-blue-50 border-blue-200 text-blue-700' : 'border-gray-300 text-gray-700'}`}
          >
            <BarChart2 className="w-5 h-5" />
            Statistics
          </button>
          <button
            onClick={() => setEditMode(!editMode)}
            className={`px-4 py-2 border rounded-lg transition-colors flex items-center gap-2
              ${editMode ? 'bg-yellow-50 border-yellow-200 text-yellow-700' : 'border-gray-300 text-gray-700'}`}
          >
            {editMode ? (
              <>
                <Save className="w-5 h-5" />
                Save Changes
              </>
            ) : (
              <>
                <Edit2 className="w-5 h-5" />
                Edit Grades
              </>
            )}
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
            <Download className="w-5 h-5" />
            Export
          </button>
        </div>
      </div>

      {/* Statistics Panel */}
      {showStats && selectedAssignment !== 'all' && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="grid grid-cols-3 gap-4">
            {(() => {
              const stats = calculateStats(selectedAssignment);
              return (
                <>
                  <div className="text-center">
                    <div className="text-sm text-blue-600 font-medium">Average</div>
                    <div className="text-2xl font-bold text-blue-700">{stats.avg.toFixed(1)}%</div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm text-blue-600 font-medium">Highest</div>
                    <div className="text-2xl font-bold text-blue-700">{stats.max}%</div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm text-blue-600 font-medium">Lowest</div>
                    <div className="text-2xl font-bold text-blue-700">{stats.min}%</div>
                  </div>
                </>
              );
            })()}
          </div>
        </div>
      )}

      {/* Gradebook Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                Student
              </th>
              {mockGrades[0].assignments.map(assignment => (
                <th key={assignment.id} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                  <div>{assignment.name}</div>
                  <div className="text-gray-400 font-normal">
                    {assignment.weight * 100}% • {assignment.maxScore} pts
                  </div>
                </th>
              ))}
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                Total Grade
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {mockGrades.map((grade) => (
              <tr key={grade.studentId} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{grade.studentName}</div>
                  <div className="text-sm text-gray-500">ID: {grade.studentId}</div>
                </td>
                {grade.assignments.map(assignment => (
                  <td key={assignment.id} className="px-6 py-4 whitespace-nowrap">
                    {editMode ? (
                      <input
                        type="number"
                        defaultValue={assignment.score}
                        min="0"
                        max={assignment.maxScore}
                        className="w-20 px-2 py-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    ) : (
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {assignment.score}/{assignment.maxScore}
                        </div>
                        <div className="text-xs text-gray-500">
                          Submitted: {new Date(assignment.submitted).toLocaleDateString()}
                        </div>
                      </div>
                    )}
                  </td>
                ))}
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    {grade.totalGrade.toFixed(1)}%
                  </div>
                  <div className="text-sm text-gray-500">
                    Grade: {grade.letterGrade}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between border-t border-gray-200 px-4 py-3 sm:px-6">
        <div className="flex flex-1 justify-between sm:hidden">
          <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
            Previous
          </button>
          <button className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
            Next
          </button>
        </div>
        <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-gray-700">
              Showing <span className="font-medium">1</span> to <span className="font-medium">2</span> of{' '}
              <span className="font-medium">2</span> results
            </p>
          </div>
          <div>
            <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
              <button className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                Previous
              </button>
              <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                1
              </button>
              <button className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                Next
              </button>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Gradebook;
