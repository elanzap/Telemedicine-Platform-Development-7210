import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';
import { format, startOfWeek, addDays, isSameDay, isToday } from 'date-fns';

const DoctorSchedule = () => {
  const [currentWeek, setCurrentWeek] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Mock schedule data
  const appointments = [
    {
      id: '1',
      patientName: 'John Doe',
      time: '09:00 AM',
      duration: 30,
      type: 'video',
      status: 'confirmed',
      symptoms: 'Chest pain',
      date: new Date()
    },
    {
      id: '2',
      patientName: 'Jane Smith',
      time: '10:30 AM',
      duration: 30,
      type: 'phone',
      status: 'confirmed',
      symptoms: 'Follow-up',
      date: new Date()
    },
    {
      id: '3',
      patientName: 'Mike Johnson',
      time: '02:00 PM',
      duration: 30,
      type: 'video',
      status: 'pending',
      symptoms: 'Skin rash',
      date: addDays(new Date(), 1)
    }
  ];

  const weekStart = startOfWeek(currentWeek);
  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));

  const getAppointmentsForDate = (date) => {
    return appointments.filter(apt => isSameDay(new Date(apt.date), date));
  };

  const getStatusColor = (status) => {
    const colors = {
      confirmed: 'bg-green-100 text-green-800',
      pending: 'bg-yellow-100 text-yellow-800',
      completed: 'bg-blue-100 text-blue-800',
      cancelled: 'bg-red-100 text-red-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-soft p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Schedule</h1>
            <p className="text-gray-600 mt-1">Manage your appointments and availability</p>
          </div>
          <div className="flex items-center space-x-4">
            <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <SafeIcon icon={FiIcons.FiSettings} className="w-4 h-4" />
              <span>Set Availability</span>
            </button>
            <button className="flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
              <SafeIcon icon={FiIcons.FiPlus} className="w-4 h-4" />
              <span>Block Time</span>
            </button>
          </div>
        </div>

        {/* Week Navigation */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setCurrentWeek(addDays(currentWeek, -7))}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <SafeIcon icon={FiIcons.FiChevronLeft} className="w-5 h-5" />
            </button>
            <h2 className="text-lg font-semibold text-gray-900">
              {format(weekStart, 'MMM dd')} - {format(addDays(weekStart, 6), 'MMM dd, yyyy')}
            </h2>
            <button
              onClick={() => setCurrentWeek(addDays(currentWeek, 7))}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <SafeIcon icon={FiIcons.FiChevronRight} className="w-5 h-5" />
            </button>
          </div>
          <button
            onClick={() => setCurrentWeek(new Date())}
            className="px-4 py-2 text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
          >
            Today
          </button>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-4">
        {weekDays.map((day, index) => {
          const dayAppointments = getAppointmentsForDate(day);
          const isSelected = isSameDay(day, selectedDate);
          const isDayToday = isToday(day);

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => setSelectedDate(day)}
              className={`bg-white rounded-xl shadow-soft p-4 cursor-pointer transition-all ${
                isSelected ? 'ring-2 ring-primary-500' : ''
              }`}
            >
              <div className="text-center mb-4">
                <p className="text-sm font-medium text-gray-600">
                  {format(day, 'EEE')}
                </p>
                <p className={`text-2xl font-bold ${
                  isDayToday ? 'text-primary-600' : 'text-gray-900'
                }`}>
                  {format(day, 'dd')}
                </p>
                {isDayToday && (
                  <p className="text-xs text-primary-600 font-medium">Today</p>
                )}
              </div>

              <div className="space-y-2">
                {dayAppointments.map((appointment) => (
                  <div
                    key={appointment.id}
                    className="p-2 bg-gray-50 rounded-lg text-xs"
                  >
                    <div className="font-medium text-gray-900 truncate">
                      {appointment.time}
                    </div>
                    <div className="text-gray-600 truncate">
                      {appointment.patientName}
                    </div>
                    <div className="flex items-center justify-between mt-1">
                      <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(appointment.status)}`}>
                        {appointment.status}
                      </span>
                      <SafeIcon 
                        icon={appointment.type === 'video' ? FiIcons.FiVideo : FiIcons.FiPhone} 
                        className="w-3 h-3 text-gray-400" 
                      />
                    </div>
                  </div>
                ))}
                
                {dayAppointments.length === 0 && (
                  <div className="text-center py-4 text-gray-400 text-xs">
                    No appointments
                  </div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Selected Day Details */}
      <div className="bg-white rounded-xl shadow-soft p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">
            {format(selectedDate, 'EEEE, MMMM dd, yyyy')}
          </h3>
          <span className="text-sm text-gray-600">
            {getAppointmentsForDate(selectedDate).length} appointment(s)
          </span>
        </div>

        <div className="space-y-4">
          {getAppointmentsForDate(selectedDate).map((appointment) => (
            <div
              key={appointment.id}
              className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                  <SafeIcon 
                    icon={appointment.type === 'video' ? FiIcons.FiVideo : FiIcons.FiPhone} 
                    className="w-5 h-5 text-primary-600" 
                  />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">{appointment.patientName}</h4>
                  <p className="text-sm text-gray-600">{appointment.symptoms}</p>
                  <p className="text-sm text-gray-500">
                    {appointment.time} ({appointment.duration} min)
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(appointment.status)}`}>
                  {appointment.status}
                </span>
                <div className="flex items-center space-x-2">
                  <button className="p-2 text-gray-400 hover:text-primary-600 transition-colors">
                    <SafeIcon icon={FiIcons.FiEdit} className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-green-600 transition-colors">
                    <SafeIcon icon={FiIcons.FiVideo} className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-red-600 transition-colors">
                    <SafeIcon icon={FiIcons.FiX} className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}

          {getAppointmentsForDate(selectedDate).length === 0 && (
            <div className="text-center py-8">
              <SafeIcon icon={FiIcons.FiCalendar} className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500">No appointments scheduled for this day</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DoctorSchedule;