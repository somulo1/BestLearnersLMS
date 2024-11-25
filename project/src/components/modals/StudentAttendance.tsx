import React from 'react';
import { Clock, Calendar, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import Modal from '../Modal';

interface StudentAttendanceProps {
  isOpen: boolean;
  onClose: () => void;
}

interface AttendanceRecord {
  id: number;
  subject: string;
  date: string;
  status: 'present' | 'absent' | 'late';
  time: string;
  duration: string;
}

const StudentAttendance: React.FC<StudentAttendanceProps> = ({ isOpen, onClose }) => {
  const attendanceRecords: AttendanceRecord[] = [
    {
      id: 1,
      subject: 'Mathematics',
      date: '2024-02-20',
      status: 'present',
      time: '09:00 AM',
      duration: '1.5 hours',
    },
    {
      id: 2,
      subject: 'Physics',
      date: '2024-02-20',
      status: 'late',
      time: '11:15 AM',
      duration: '1.5 hours',
    },
    {
      id: 3,
      subject: 'Chemistry',
      date: '2024-02-19',
      status: 'absent',
      time: '02:00 PM',
      duration: '1.5 hours',
    },
    // Add more records as needed
  ];

  const getStatusIcon = (status: AttendanceRecord['status']) => {
    switch (status) {
      case 'present':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'absent':
        return <XCircle className="w-5 h-5 text-red-500" />;
      case 'late':
        return <AlertCircle className="w-5 h-5 text-yellow-500" />;
    }
  };

  const getStatusColor = (status: AttendanceRecord['status']) => {
    switch (status) {
      case 'present':
        return 'bg-green-50 text-green-700';
      case 'absent':
        return 'bg-red-50 text-red-700';
      case 'late':
        return 'bg-yellow-50 text-yellow-700';
    }
  };

  const attendanceStats = {
    total: 45,
    present: 38,
    absent: 3,
    late: 4,
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Attendance Record" size="2xl">
      <div className="space-y-6">
        {/* Attendance Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Classes</p>
                <p className="text-2xl font-bold text-gray-900">{attendanceStats.total}</p>
              </div>
              <Calendar className="w-8 h-8 text-gray-400" />
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Present</p>
                <p className="text-2xl font-bold text-green-600">{attendanceStats.present}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-400" />
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Absent</p>
                <p className="text-2xl font-bold text-red-600">{attendanceStats.absent}</p>
              </div>
              <XCircle className="w-8 h-8 text-red-400" />
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Late</p>
                <p className="text-2xl font-bold text-yellow-600">{attendanceStats.late}</p>
              </div>
              <AlertCircle className="w-8 h-8 text-yellow-400" />
            </div>
          </div>
        </div>

        {/* Attendance Percentage */}
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <h3 className="text-lg font-semibold mb-4">Attendance Rate</h3>
          <div className="relative pt-1">
            <div className="flex mb-2 items-center justify-between">
              <div>
                <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-green-600 bg-green-200">
                  {Math.round((attendanceStats.present / attendanceStats.total) * 100)}%
                </span>
              </div>
            </div>
            <div className="flex h-2 mb-4 overflow-hidden bg-gray-100 rounded">
              <div
                style={{ width: `${(attendanceStats.present / attendanceStats.total) * 100}%` }}
                className="bg-green-500"
              ></div>
              <div
                style={{ width: `${(attendanceStats.late / attendanceStats.total) * 100}%` }}
                className="bg-yellow-500"
              ></div>
              <div
                style={{ width: `${(attendanceStats.absent / attendanceStats.total) * 100}%` }}
                className="bg-red-500"
              ></div>
            </div>
          </div>
        </div>

        {/* Attendance Records */}
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Subject
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Time
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Duration
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {attendanceRecords.map((record) => (
                  <tr key={record.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {new Date(record.date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {record.subject}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {record.time}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {record.duration}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {getStatusIcon(record.status)}
                        <span className={`ml-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(record.status)}`}>
                          {record.status.charAt(0).toUpperCase() + record.status.slice(1)}
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default StudentAttendance;
