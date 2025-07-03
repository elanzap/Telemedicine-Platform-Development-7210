import React from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';
import { useAuthStore } from '../../stores/authStore';
import { useAppointmentStore } from '../../stores/appointmentStore';
import { format, isToday } from 'date-fns';

const DoctorDashboard = () => {
  const { user } = useAuthStore();
  const { getAppointmentsByUser } = useAppointmentStore();
  const appointments = getAppointmentsByUser(user?.id, 'doctor');
  
  const todayAppointments = appointments.filter(apt => 
    isToday(new Date(apt.date)) && apt.status === 'confirmed'
  );

  const stats = [
    {
      icon: FiIcons.FiCalendar,
      label: "Today's Appointments",
      value: todayAppointments.length,
      color: 'bg-blue-500'
    },
    {
      icon: FiIcons.FiUsers,
      label: 'Total Patients',
      value: '1,250',
      color: 'bg-green-500'
    },
    {
      icon: FiIcons.FiTrendingUp,
      label: 'This Month Revenue',
      value: '$12,450',
      color: 'bg-purple-500'
    },
    {
      icon: FiIcons.FiStar,
      label: 'Average Rating',
      value: '4.9',
      color: 'bg-yellow-500'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-xl p-6 text-white"
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-2">Good morning, {user?.name}!</h1>
            <p className="text-primary-100">
              You have {todayAppointments.length} appointment{todayAppointments.length !== 1 ? 's' : ''} scheduled for today.
            </p>
          </div>
          <div className="hidden md:block">
            <div className="w-24 h-24 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
              <SafeIcon icon={FiIcons.FiActivity} className="w-12 h-12" />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white p-6 rounded-xl shadow-soft"
          >
            <div className="flex items-center">
              <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center mr-4`}>
                <SafeIcon icon={stat.icon} className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-sm text-gray-600">{stat.label}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Today's Appointments */}
        <div className="lg:col-span-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-xl shadow-soft p-6"
          >
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Today's Schedule</h2>
            
            {todayAppointments.length > 0 ? (
              <div className="space-y-4">
                {todayAppointments.map((appointment) => (
                  <div key={appointment.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <img
                        src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face"
                        alt={appointment.patientName}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div>
                        <h3 className="font-medium text-gray-900">{appointment.patientName}</h3>
                        <p className="text-sm text-gray-600">{appointment.time} - {appointment.symptoms}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                        {appointment.type}
                      </span>
                      <button className="text-primary-600 hover:text-primary-700">
                        <SafeIcon icon={FiIcons.FiVideo} className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <SafeIcon icon={FiIcons.FiCalendar} className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500">No appointments scheduled for today</p>
              </div>
            )}
          </motion.div>
        </div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-xl shadow-soft p-6"
        >
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Quick Actions</h2>
          <div className="space-y-3">
            <button className="w-full flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <SafeIcon icon={FiIcons.FiCalendar} className="w-5 h-5 text-primary-600" />
              <span className="text-gray-700">View Schedule</span>
            </button>
            <button className="w-full flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <SafeIcon icon={FiIcons.FiFileText} className="w-5 h-5 text-primary-600" />
              <span className="text-gray-700">Write Prescription</span>
            </button>
            <button className="w-full flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <SafeIcon icon={FiIcons.FiUsers} className="w-5 h-5 text-primary-600" />
              <span className="text-gray-700">Patient Records</span>
            </button>
            <button className="w-full flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <SafeIcon icon={FiIcons.FiBarChart3} className="w-5 h-5 text-primary-600" />
              <span className="text-gray-700">View Analytics</span>
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default DoctorDashboard;