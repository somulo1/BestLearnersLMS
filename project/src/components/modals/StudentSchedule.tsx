import React from 'react';
import { Calendar } from 'lucide-react';
import Modal from '../Modal';

interface StudentScheduleProps {
  isOpen: boolean;
  onClose: () => void;
}

const StudentSchedule: React.FC<StudentScheduleProps> = ({ isOpen, onClose }) => {
  const scheduleData = [
    {
      day: 'Monday',
      classes: [
        { time: '09:00 AM - 10:30 AM', subject: 'Mathematics', room: 'Room 101' },
        { time: '11:00 AM - 12:30 PM', subject: 'Physics', room: 'Lab 201' },
      ]
    },
    {
      day: 'Tuesday',
      classes: [
        { time: '09:00 AM - 10:30 AM', subject: 'Chemistry', room: 'Lab 202' },
        { time: '11:00 AM - 12:30 PM', subject: 'English', room: 'Room 103' },
      ]
    },
    // Add more days as needed
  ];

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Class Schedule" size="2xl">
      <div className="space-y-6">
        {/* Calendar View */}
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Weekly Schedule</h3>
            <div className="flex space-x-2">
              <button className="px-3 py-1 text-sm bg-indigo-50 text-indigo-600 rounded-md hover:bg-indigo-100">
                Week View
              </button>
              <button className="px-3 py-1 text-sm bg-white text-gray-600 border border-gray-200 rounded-md hover:bg-gray-50">
                Month View
              </button>
            </div>
          </div>
          
          <div className="space-y-4">
            {scheduleData.map((day, index) => (
              <div key={index} className="border rounded-lg p-4">
                <h4 className="font-semibold text-gray-800 mb-3">{day.day}</h4>
                <div className="space-y-3">
                  {day.classes.map((classItem, classIndex) => (
                    <div key={classIndex} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                      <Calendar className="w-5 h-5 text-indigo-600 mt-1" />
                      <div>
                        <p className="font-medium text-gray-800">{classItem.subject}</p>
                        <p className="text-sm text-gray-600">{classItem.time}</p>
                        <p className="text-sm text-gray-500">{classItem.room}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex space-x-4">
          <button className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
            Download Schedule
          </button>
          <button className="flex-1 px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            Add to Calendar
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default StudentSchedule;
