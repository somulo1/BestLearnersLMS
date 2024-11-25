import React, { useState } from 'react';
import { Search, Plus, Filter, MoreVertical, BookOpen, Clock, Users } from 'lucide-react';

interface Course {
  id: string;
  title: string;
  instructor: string;
  category: string;
  status: 'active' | 'upcoming' | 'completed';
  enrolledStudents: number;
  startDate: string;
  endDate: string;
  progress: number;
}

const Courses: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');

  const courses: Course[] = [
    {
      id: '1',
      title: 'Introduction to Computer Science',
      instructor: 'Dr. John Smith',
      category: 'Computer Science',
      status: 'active',
      enrolledStudents: 45,
      startDate: '2024-01-15',
      endDate: '2024-05-15',
      progress: 60
    },
    {
      id: '2',
      title: 'Advanced Mathematics',
      instructor: 'Prof. Sarah Johnson',
      category: 'Mathematics',
      status: 'upcoming',
      enrolledStudents: 30,
      startDate: '2024-04-01',
      endDate: '2024-08-01',
      progress: 0
    },
    {
      id: '3',
      title: 'Digital Marketing Fundamentals',
      instructor: 'Jane Wilson',
      category: 'Business',
      status: 'completed',
      enrolledStudents: 55,
      startDate: '2023-09-01',
      endDate: '2024-01-01',
      progress: 100
    },
    {
      id: '4',
      title: 'Web Development Bootcamp',
      instructor: 'Mike Brown',
      category: 'Web Development',
      status: 'active',
      enrolledStudents: 35,
      startDate: '2024-02-01',
      endDate: '2024-06-01',
      progress: 40
    },
    {
      id: '5',
      title: 'Data Science Essentials',
      instructor: 'Dr. Emily Chen',
      category: 'Data Science',
      status: 'upcoming',
      enrolledStudents: 25,
      startDate: '2024-04-15',
      endDate: '2024-08-15',
      progress: 0
    }
  ];

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.instructor.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || course.category === selectedCategory;
    const matchesStatus = selectedStatus === 'all' || course.status === selectedStatus;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'text-green-600 bg-green-100';
      case 'upcoming':
        return 'text-blue-600 bg-blue-100';
      case 'completed':
        return 'text-gray-600 bg-gray-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getProgressColor = (progress: number) => {
    if (progress === 100) return 'bg-green-500';
    if (progress >= 60) return 'bg-blue-500';
    if (progress >= 30) return 'bg-yellow-500';
    return 'bg-gray-300';
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-900">Courses</h2>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center">
          <Plus className="w-4 h-4 mr-2" />
          Add New Course
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-6 p-4 bg-white rounded-lg shadow-sm">
        <div className="flex-1 min-w-[200px]">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search courses..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center">
            <Filter className="w-5 h-5 text-gray-500 mr-2" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="all">All Categories</option>
              <option value="Computer Science">Computer Science</option>
              <option value="Mathematics">Mathematics</option>
              <option value="Business">Business</option>
              <option value="Web Development">Web Development</option>
              <option value="Data Science">Data Science</option>
            </select>
          </div>
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="upcoming">Upcoming</option>
            <option value="completed">Completed</option>
          </select>
        </div>
      </div>

      {/* Courses List */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="min-w-full divide-y divide-gray-200">
          <div className="bg-gray-50 px-6 py-3">
            <div className="grid grid-cols-7 gap-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              <div className="col-span-2">Course</div>
              <div>Category</div>
              <div>Status</div>
              <div>Students</div>
              <div>Progress</div>
              <div>Actions</div>
            </div>
          </div>
          <div className="divide-y divide-gray-200">
            {filteredCourses.map((course) => (
              <div key={course.id} className="px-6 py-4 whitespace-nowrap">
                <div className="grid grid-cols-7 gap-4 items-center">
                  <div className="col-span-2">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-lg bg-blue-100 flex items-center justify-center">
                        <BookOpen className="w-6 h-6 text-blue-600" />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{course.title}</div>
                        <div className="text-sm text-gray-500">{course.instructor}</div>
                      </div>
                    </div>
                  </div>
                  <div className="text-sm text-gray-500">{course.category}</div>
                  <div>
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(course.status)}`}>
                      {course.status}
                    </span>
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <Users className="w-4 h-4 mr-1" />
                    {course.enrolledStudents}
                  </div>
                  <div className="flex items-center">
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div
                        className={`${getProgressColor(course.progress)} h-2 rounded-full`}
                        style={{ width: `${course.progress}%` }}
                      ></div>
                    </div>
                    <span className="ml-2 text-sm text-gray-500">{course.progress}%</span>
                  </div>
                  <div className="flex space-x-2">
                    <button className="p-2 text-gray-400 hover:text-gray-600">
                      <Users className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-gray-600">
                      <Clock className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-gray-600">
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Courses;
