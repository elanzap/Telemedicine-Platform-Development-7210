import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';
import { format } from 'date-fns';

const AdminPayments = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const payments = [
    {
      id: '1',
      transactionId: 'TXN-001234',
      patientName: 'John Doe',
      doctorName: 'Dr. Sarah Johnson',
      amount: 150,
      status: 'completed',
      date: new Date('2024-01-15'),
      paymentMethod: 'Credit Card'
    },
    {
      id: '2',
      transactionId: 'TXN-001235',
      patientName: 'Jane Smith',
      doctorName: 'Dr. Michael Chen',
      amount: 120,
      status: 'pending',
      date: new Date('2024-01-14'),
      paymentMethod: 'PayPal'
    }
  ];

  const filteredPayments = payments.filter(payment => {
    const matchesSearch = payment.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         payment.doctorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         payment.transactionId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || payment.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status) => {
    const colors = {
      completed: 'bg-green-100 text-green-800',
      pending: 'bg-yellow-100 text-yellow-800',
      failed: 'bg-red-100 text-red-800',
      refunded: 'bg-blue-100 text-blue-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-soft p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Payment Management</h1>
            <p className="text-gray-600 mt-1">Monitor transactions and payment processing</p>
          </div>
          <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            <SafeIcon icon={FiIcons.FiDownload} className="w-4 h-4" />
            <span>Export Report</span>
          </button>
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
                placeholder="Search payments..."
              />
            </div>
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="all">All Status</option>
            <option value="completed">Completed</option>
            <option value="pending">Pending</option>
            <option value="failed">Failed</option>
            <option value="refunded">Refunded</option>
          </select>
        </div>
      </div>

      {/* Payments List */}
      <div className="space-y-4">
        {filteredPayments.length > 0 ? (
          filteredPayments.map((payment, index) => (
            <motion.div
              key={payment.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-soft p-6"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <SafeIcon icon={FiIcons.FiDollarSign} className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{payment.transactionId}</h3>
                    <p className="text-sm text-gray-600">
                      {payment.patientName} → {payment.doctorName}
                    </p>
                    <p className="text-sm text-gray-500">
                      {format(payment.date, 'MMM dd, yyyy')} • {payment.paymentMethod}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <p className="text-lg font-semibold text-gray-900">${payment.amount}</p>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(payment.status)}`}>
                      {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                    </span>
                  </div>

                  <div className="flex items-center space-x-2">
                    <button className="p-2 text-gray-400 hover:text-primary-600 transition-colors">
                      <SafeIcon icon={FiIcons.FiEye} className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-green-600 transition-colors">
                      <SafeIcon icon={FiIcons.FiDownload} className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))
        ) : (
          <div className="bg-white rounded-xl shadow-soft p-12 text-center">
            <SafeIcon icon={FiIcons.FiCreditCard} className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No payments found</h3>
            <p className="text-gray-600">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPayments;