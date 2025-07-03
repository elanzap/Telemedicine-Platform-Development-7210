import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';
import { format } from 'date-fns';

const AdminAppointments = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Mock appointments data
  const appointments = [
    {
      id: '1',
      patientName: 'John Doe',
      doctorName: 'Dr. Sarah Johnson',
      date: new Date('2024-01-16'),
      time: '10:00 AM',
      type: 'video',
      status: 'confirmed',
      amount: 150
    },
    {
      id: '2',
      patientName: 'Jane Smith',
      doctorName: 'Dr. Michael Chen',
      date: new Date('2024-01-15'),
      time: '2:00 PM',
      type: 'phone',
      status: 'completed',
      amount: 120
    },
    {
      id: '3',
      patientName: 'Mike Johnson',
      doctorName: 'Dr. Sarah Johnson',
      date: new Date('2024-01-14'),
      time: '11:00 AM',
      type: 'video',
      status: 'cancelled',
      amount: 150
    }
  ];

  const filteredAppointments = appointments.filter(appointment => {
    const matchesSearch = appointment.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         appointment.doctorName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || appointment.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

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
            <h1 className="text-2xl font-bold text-gray-900">Appointment Management</h1>
            <p className="text-gray-600 mt-1">Monitor and manage all platform appointments</p>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <SafeIcon 
                icon={FiIcons.FiSearch} 
                className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" 
              />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="Search appointments..."
              />
            </div>
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="all">All Status</option>
            <option value="confirmed">Confirmed</option>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      {/* Appointments List */}
      <div className="space-y-4">
        {filteredAppointments.length > 0 ? (
          filteredAppointments.map((appointment, index) => (
            <motion.div
              key={appointment.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-soft p-6"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                    <SafeIcon 
                      icon={appointment.type === 'video' ? FiIcons.FiVideo : FiIcons.FiPhone} 
                      className="w-6 h-6 text-primary-600" 
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {appointment.patientName} → {appointment.doctorName}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {format(appointment.date, 'MMM dd, yyyy')} at {appointment.time}
                    </p>
                    <p className="text-sm text-gray-500 capitalize">
                      {appointment.type} consultation
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">${appointment.amount}</p>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(appointment.status)}`}>
                      {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                    </span>
                  </div>

                  <div className="flex items-center space-x-2">
                    <button className="p-2 text-gray-400 hover:text-primary-600 transition-colors">
                      <SafeIcon icon={FiIcons.FiEye} className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-green-600 transition-colors">
                      <SafeIcon icon={FiIcons.FiEdit} className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))
        ) : (
          <div className="bg-white rounded-xl shadow-soft p-12 text-center">
            <SafeIcon icon={FiIcons.FiCalendar} className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No appointments found</h3>
            <p className="text-gray-600">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminAppointments;