import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';
import { format } from 'date-fns';

const AdminSupport = () => {
  const [activeTab, setActiveTab] = useState('tickets');
  const [searchTerm, setSearchTerm] = useState('');

  // Mock support tickets
  const tickets = [
    {
      id: '1',
      subject: 'Unable to join video consultation',
      user: 'John Doe',
      userType: 'patient',
      status: 'open',
      priority: 'high',
      createdAt: new Date('2024-01-15'),
      lastUpdated: new Date('2024-01-15')
    },
    {
      id: '2',
      subject: 'Payment processing issue',
      user: 'Dr. Sarah Johnson',
      userType: 'doctor',
      status: 'in-progress',
      priority: 'medium',
      createdAt: new Date('2024-01-14'),
      lastUpdated: new Date('2024-01-15')
    },
    {
      id: '3',
      subject: 'Account verification problem',
      user: 'Jane Smith',
      userType: 'patient',
      status: 'resolved',
      priority: 'low',
      createdAt: new Date('2024-01-13'),
      lastUpdated: new Date('2024-01-14')
    }
  ];

  const filteredTickets = tickets.filter(ticket =>
    ticket.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ticket.user.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status) => {
    const colors = {
      open: 'bg-red-100 text-red-800',
      'in-progress': 'bg-yellow-100 text-yellow-800',
      resolved: 'bg-green-100 text-green-800',
      closed: 'bg-gray-100 text-gray-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const getPriorityColor = (priority) => {
    const colors = {
      high: 'bg-red-100 text-red-800',
      medium: 'bg-yellow-100 text-yellow-800',
      low: 'bg-blue-100 text-blue-800'
    };
    return colors[priority] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-soft p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Support Center</h1>
            <p className="text-gray-600 mt-1">Manage user support tickets and inquiries</p>
          </div>
          <button className="flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
            <SafeIcon icon={FiIcons.FiPlus} className="w-4 h-4" />
            <span>New Ticket</span>
          </button>
        </div>

        {/* Search */}
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
            placeholder="Search tickets..."
          />
        </div>
      </div>

      {/* Support Tickets */}
      <div className="space-y-4">
        {filteredTickets.length > 0 ? (
          filteredTickets.map((ticket, index) => (
            <motion.div
              key={ticket.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-soft p-6"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                    <SafeIcon icon={FiIcons.FiHelpCircle} className="w-6 h-6 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{ticket.subject}</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      {ticket.user} • {ticket.userType} • Ticket #{ticket.id}
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      Created: {format(ticket.createdAt, 'MMM dd, yyyy')} • 
                      Updated: {format(ticket.lastUpdated, 'MMM dd, yyyy')}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(ticket.priority)}`}>
                    {ticket.priority.charAt(0).toUpperCase() + ticket.priority.slice(1)}
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(ticket.status)}`}>
                    {ticket.status.charAt(0).toUpperCase() + ticket.status.slice(1)}
                  </span>
                  
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
            <SafeIcon icon={FiIcons.FiHelpCircle} className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No support tickets found</h3>
            <p className="text-gray-600">Try adjusting your search criteria</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminSupport;