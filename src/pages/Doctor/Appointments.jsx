import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';
import { useAuthStore } from '../../stores/authStore';
import { useAppointmentStore } from '../../stores/appointmentStore';
import { format, isToday, isTomorrow, isPast } from 'date-fns';
import toast from 'react-hot-toast';

const DoctorAppointments = () => {
  const { user } = useAuthStore();
  const { getAppointmentsByUser, updateAppointment } = useAppointmentStore();
  const [activeTab, setActiveTab] = useState('upcoming');
  const [isLoading, setIsLoading] = useState(false);

  const appointments = getAppointmentsByUser(user?.id, 'doctor');

  const upcomingAppointments = appointments.filter(apt => 
    (apt.status === 'confirmed' || apt.status === 'pending') && 
    new Date(apt.date) >= new Date()
  );

  const pastAppointments = appointments.filter(apt => 
    apt.status === 'completed' || isPast(new Date(apt.date))
  );

  const handleUpdateStatus = async (appointmentId, status) => {
    setIsLoading(true);
    const result = await updateAppointment(appointmentId, { status });
    
    if (result.success) {
      toast.success(`Appointment ${status} successfully`);
    } else {
      toast.error('Failed to update appointment');
    }
    setIsLoading(false);
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

  const getAppointmentTimeDisplay = (appointment) => {
    const appointmentDate = new Date(appointment.date);
    if (isToday(appointmentDate)) {
      return `Today at ${appointment.time}`;
    } else if (isTomorrow(appointmentDate)) {
      return `Tomorrow at ${appointment.time}`;
    } else {
      return `${format(appointmentDate, 'MMM dd, yyyy')} at ${appointment.time}`;
    }
  };

  const renderAppointments = (appointmentsList) => {
    if (appointmentsList.length === 0) {
      return (
        <div className="text-center py-12">
          <SafeIcon icon={FiIcons.FiCalendar} className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No appointments found</h3>
          <p className="text-gray-600">
            {activeTab === 'upcoming' 
              ? "You don't have any upcoming appointments"
              : "You don't have any past appointments"
            }
          </p>
        </div>
      );
    }

    return (
      <div className="space-y-4">
        {appointmentsList.map((appointment, index) => (
          <motion.div
            key={appointment.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-medium transition-shadow"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start space-x-4">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop&crop=face"
                  alt={appointment.patientName}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h3 className="font-semibold text-gray-900">{appointment.patientName}</h3>
                  <p className="text-gray-500 text-sm">{getAppointmentTimeDisplay(appointment)}</p>
                  <p className="text-sm text-gray-600 mt-1">{appointment.symptoms}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(appointment.status)}`}>
                  {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                </span>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div>
                <p className="text-sm text-gray-600 mb-1">Type:</p>
                <div className="flex items-center space-x-1">
                  <SafeIcon 
                    icon={appointment.type === 'video' ? FiIcons.FiVideo : FiIcons.FiPhone} 
                    className="w-4 h-4 text-gray-400" 
                  />
                  <span className="text-sm font-medium text-gray-900 capitalize">{appointment.type}</span>
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Duration:</p>
                <p className="text-sm font-medium text-gray-900">{appointment.duration} minutes</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Amount:</p>
                <p className="text-sm font-medium text-gray-900">${appointment.amount}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Payment:</p>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  appointment.paid ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {appointment.paid ? 'Paid' : 'Pending'}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-gray-200">
              <div className="flex items-center space-x-3">
                {appointment.status === 'pending' && (
                  <>
                    <button
                      onClick={() => handleUpdateStatus(appointment.id, 'confirmed')}
                      disabled={isLoading}
                      className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
                    >
                      <SafeIcon icon={FiIcons.FiCheck} className="w-4 h-4" />
                      <span>Confirm</span>
                    </button>
                    <button
                      onClick={() => handleUpdateStatus(appointment.id, 'cancelled')}
                      disabled={isLoading}
                      className="flex items-center space-x-2 px-4 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors disabled:opacity-50"
                    >
                      <SafeIcon icon={FiIcons.FiX} className="w-4 h-4" />
                      <span>Cancel</span>
                    </button>
                  </>
                )}

                {appointment.status === 'confirmed' && isToday(new Date(appointment.date)) && (
                  <button
                    onClick={() => window.open(appointment.meetingLink, '_blank')}
                    className="flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                  >
                    <SafeIcon icon={FiIcons.FiVideo} className="w-4 h-4" />
                    <span>Start Consultation</span>
                  </button>
                )}

                {appointment.status === 'confirmed' && !isToday(new Date(appointment.date)) && (
                  <button
                    onClick={() => handleUpdateStatus(appointment.id, 'completed')}
                    disabled={isLoading}
                    className="flex items-center space-x-2 px-4 py-2 border border-blue-300 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors disabled:opacity-50"
                  >
                    <SafeIcon icon={FiIcons.FiCheck} className="w-4 h-4" />
                    <span>Mark Complete</span>
                  </button>
                )}

                <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 text-gray-600 rounded-lg hover:bg-gray-50 transition-colors">
                  <SafeIcon icon={FiIcons.FiFileText} className="w-4 h-4" />
                  <span>Write Notes</span>
                </button>
              </div>

              <div className="text-right text-sm text-gray-500">
                <p>Appointment ID: {appointment.id}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-soft p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Appointments</h1>
            <p className="text-gray-600 mt-1">Manage your patient appointments</p>
          </div>
          <div className="flex items-center space-x-3">
            <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <SafeIcon icon={FiIcons.FiCalendar} className="w-4 h-4" />
              <span>View Schedule</span>
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="mt-6 border-b border-gray-200">
          <nav className="flex space-x-8">
            {[
              { id: 'upcoming', label: 'Upcoming', count: upcomingAppointments.length },
              { id: 'past', label: 'Past', count: pastAppointments.length }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <span>{tab.label}</span>
                <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs">
                  {tab.count}
                </span>
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Appointments List */}
      <div className="bg-gray-50 rounded-xl p-6">
        {activeTab === 'upcoming' && renderAppointments(upcomingAppointments)}
        {activeTab === 'past' && renderAppointments(pastAppointments)}
      </div>
    </div>
  );
};

export default DoctorAppointments;