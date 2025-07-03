import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';
import { useAuthStore } from '../../stores/authStore';
import { useAppointmentStore } from '../../stores/appointmentStore';
import { format, isToday, isTomorrow } from 'date-fns';

const PatientDashboard = () => {
  const { user } = useAuthStore();
  const { getAppointmentsByUser } = useAppointmentStore();
  const appointments = getAppointmentsByUser(user?.id, 'patient');
  const upcomingAppointments = appointments.filter(apt => 
    apt.status === 'confirmed' && new Date(apt.date) >= new Date()
  ).slice(0, 3);

  const stats = [
    {
      icon: FiIcons.FiCalendar,
      label: 'Upcoming Appointments',
      value: upcomingAppointments.length,
      color: 'bg-blue-500',
      link: '/patient/appointments'
    },
    {
      icon: FiIcons.FiFileText,
      label: 'Prescriptions',
      value: '12',
      color: 'bg-green-500',
      link: '/patient/prescriptions'
    },
    {
      icon: FiIcons.FiFolder,
      label: 'Medical Records',
      value: '8',
      color: 'bg-purple-500',
      link: '/patient/records'
    },
    {
      icon: FiIcons.FiUsers,
      label: 'Doctors Consulted',
      value: '5',
      color: 'bg-orange-500',
      link: '/patient/appointments'
    }
  ];

  const quickActions = [
    {
      icon: FiIcons.FiPlus,
      title: 'Book Appointment',
      description: 'Schedule a consultation with a doctor',
      link: '/patient/book-appointment',
      color: 'bg-primary-600'
    },
    {
      icon: FiIcons.FiVideo,
      title: 'Join Consultation',
      description: 'Start or join a video consultation',
      link: '/patient/appointments',
      color: 'bg-green-600'
    },
    {
      icon: FiIcons.FiFileText,
      title: 'View Prescriptions',
      description: 'Access your digital prescriptions',
      link: '/patient/prescriptions',
      color: 'bg-blue-600'
    },
    {
      icon: FiIcons.FiUser,
      title: 'Update Profile',
      description: 'Manage your profile information',
      link: '/patient/profile',
      color: 'bg-purple-600'
    }
  ];

  const getAppointmentTimeDisplay = (appointment) => {
    const appointmentDate = new Date(appointment.date);
    if (isToday(appointmentDate)) {
      return `Today at ${appointment.time}`;
    } else if (isTomorrow(appointmentDate)) {
      return `Tomorrow at ${appointment.time}`;
    } else {
      return `${format(appointmentDate, 'MMM dd')} at ${appointment.time}`;
    }
  };

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
            <h1 className="text-2xl font-bold mb-2">Welcome back, {user?.name}!</h1>
            <p className="text-primary-100">
              Take control of your health with our comprehensive telemedicine platform.
            </p>
          </div>
          <div className="hidden md:block">
            <div className="w-24 h-24 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
              <SafeIcon icon={FiIcons.FiHeart} className="w-12 h-12" />
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
          >
            <Link to={stat.link} className="block">
              <div className="bg-white p-6 rounded-xl shadow-soft hover:shadow-medium transition-shadow">
                <div className="flex items-center">
                  <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center mr-4`}>
                    <SafeIcon icon={stat.icon} className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                    <p className="text-sm text-gray-600">{stat.label}</p>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Quick Actions */}
        <div className="lg:col-span-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-xl shadow-soft p-6"
          >
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Quick Actions</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {quickActions.map((action, index) => (
                <Link
                  key={index}
                  to={action.link}
                  className="group p-4 border border-gray-200 rounded-lg hover:border-primary-300 hover:bg-primary-50 transition-all"
                >
                  <div className="flex items-start space-x-3">
                    <div className={`w-10 h-10 ${action.color} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform`}>
                      <SafeIcon icon={action.icon} className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900 group-hover:text-primary-700">
                        {action.title}
                      </h3>
                      <p className="text-sm text-gray-600 mt-1">{action.description}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Upcoming Appointments */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-xl shadow-soft p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Upcoming Appointments</h2>
            <Link to="/patient/appointments" className="text-primary-600 hover:text-primary-700 text-sm font-medium">
              View All
            </Link>
          </div>
          
          {upcomingAppointments.length > 0 ? (
            <div className="space-y-4">
              {upcomingAppointments.map((appointment) => (
                <div key={appointment.id} className="p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium text-gray-900">{appointment.doctorName}</h3>
                    <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                      {appointment.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{appointment.specialty}</p>
                  <div className="flex items-center text-sm text-gray-500">
                    <SafeIcon icon={FiIcons.FiClock} className="w-4 h-4 mr-1" />
                    {getAppointmentTimeDisplay(appointment)}
                  </div>
                  {isToday(new Date(appointment.date)) && appointment.meetingLink && (
                    <button className="mt-3 w-full bg-primary-600 text-white py-2 px-4 rounded-lg text-sm hover:bg-primary-700 transition-colors">
                      Join Consultation
                    </button>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <SafeIcon icon={FiIcons.FiCalendar} className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500 mb-4">No upcoming appointments</p>
              <Link
                to="/patient/book-appointment"
                className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium"
              >
                <SafeIcon icon={FiIcons.FiPlus} className="w-4 h-4 mr-1" />
                Book your first appointment
              </Link>
            </div>
          )}
        </motion.div>
      </div>

      {/* Health Tips */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-white rounded-xl shadow-soft p-6"
      >
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Health Tips</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <SafeIcon icon={FiIcons.FiDroplet} className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="font-medium text-gray-900 mb-2">Stay Hydrated</h3>
            <p className="text-sm text-gray-600">Drink at least 8 glasses of water daily for optimal health.</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <SafeIcon icon={FiIcons.FiActivity} className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="font-medium text-gray-900 mb-2">Exercise Regularly</h3>
            <p className="text-sm text-gray-600">Aim for 30 minutes of moderate exercise most days of the week.</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <SafeIcon icon={FiIcons.FiMoon} className="w-8 h-8 text-purple-600" />
            </div>
            <h3 className="font-medium text-gray-900 mb-2">Get Quality Sleep</h3>
            <p className="text-sm text-gray-600">Aim for 7-9 hours of quality sleep each night for better health.</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default PatientDashboard;