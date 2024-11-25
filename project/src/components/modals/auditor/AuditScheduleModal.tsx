import React, { useState } from 'react';
import { Calendar, Clock, Plus, Filter, ChevronLeft, ChevronRight } from 'lucide-react';

interface AuditScheduleModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface AuditEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  type: string;
  status: string;
  assignee: string;
}

const AuditScheduleModal: React.FC<AuditScheduleModalProps> = ({ isOpen, onClose }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const mockEvents: AuditEvent[] = [
    {
      id: '1',
      title: 'System Security Audit',
      date: '2024-01-15',
      time: '10:00 AM',
      type: 'Security',
      status: 'Scheduled',
      assignee: 'John Smith'
    },
    {
      id: '2',
      title: 'Financial Records Review',
      date: '2024-01-20',
      time: '2:00 PM',
      type: 'Financial',
      status: 'Pending',
      assignee: 'Sarah Johnson'
    },
    {
      id: '3',
      title: 'Compliance Check',
      date: '2024-01-25',
      time: '11:30 AM',
      type: 'Compliance',
      status: 'In Progress',
      assignee: 'Mike Wilson'
    }
  ];

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.setMonth(currentMonth.getMonth() + 1)));
  };

  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.setMonth(currentMonth.getMonth() - 1)));
  };

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    return new Date(year, month, 1).getDay();
  };

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentMonth);
    const firstDay = getFirstDayOfMonth(currentMonth);
    const days = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-12" />);
    }

    // Add cells for each day of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
      const isSelected = selectedDate?.toDateString() === date.toDateString();
      const hasEvents = mockEvents.some(event => new Date(event.date).toDateString() === date.toDateString());

      days.push(
        <button
          key={day}
          onClick={() => setSelectedDate(date)}
          className={`h-12 rounded-lg flex flex-col items-center justify-center relative
            ${isSelected ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-50'}
            ${hasEvents ? 'font-semibold' : ''}
          `}
        >
          <span>{day}</span>
          {hasEvents && (
            <div className="absolute bottom-1 w-1 h-1 rounded-full bg-blue-500" />
          )}
        </button>
      );
    }

    return days;
  };

  return (
    <div className="flex flex-col h-full">
      {/* Calendar Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Calendar className="h-5 w-5 text-gray-500" />
          <h3 className="text-lg font-semibold text-gray-900">
            {currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' })}
          </h3>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={prevMonth}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <ChevronLeft className="h-5 w-5 text-gray-500" />
          </button>
          <button
            onClick={nextMonth}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <ChevronRight className="h-5 w-5 text-gray-500" />
          </button>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-1 mb-4">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="text-center text-sm font-medium text-gray-500 py-2">
            {day}
          </div>
        ))}
        {Array.from({ length: getFirstDayOfMonth(currentMonth) }).map((_, index) => (
          <div key={`empty-${index}`} className="h-12" />
        ))}
        {renderCalendar()}
      </div>

      {/* Events List */}
      <div className="flex-1 overflow-y-auto">
        <div className="space-y-4">
          {selectedDate ? (
            mockEvents
              .filter(event => new Date(event.date).toDateString() === selectedDate.toDateString())
              .map(event => (
                <div
                  key={event.id}
                  className="p-4 bg-white rounded-lg border border-gray-200 hover:border-blue-500 transition-colors"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-gray-900">{event.title}</h4>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium
                      ${event.status === 'Scheduled' ? 'bg-blue-100 text-blue-800' :
                        event.status === 'In Progress' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-gray-100 text-gray-800'}
                    `}>
                      {event.status}
                    </span>
                  </div>
                  <div className="flex items-center text-sm text-gray-500 space-x-4">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {event.time}
                    </div>
                    <div>{event.type}</div>
                    <div>Assignee: {event.assignee}</div>
                  </div>
                </div>
              ))
          ) : (
            <div className="text-center text-gray-500 py-4">
              Select a date to view events
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuditScheduleModal;
