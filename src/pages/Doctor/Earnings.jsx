import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';

const DoctorEarnings = () => {
  const [activeTab, setActiveTab] = useState('overview');

  // Mock earnings data
  const earningsData = {
    overview: {
      totalEarnings: 12450,
      thisMonth: 4200,
      thisWeek: 950,
      pendingPayments: 1250,
      completedConsultations: 85,
      averagePerConsultation: 146.47
    },
    transactions: [
      {
        id: '1',
        patientName: 'John Doe',
        date: new Date('2024-01-15'),
        amount: 150,
        status: 'completed',
        consultationType: 'video'
      },
      {
        id: '2',
        patientName: 'Jane Smith',
        date: new Date('2024-01-14'),
        amount: 120,
        status: 'completed',
        consultationType: 'phone'
      },
      {
        id: '3',
        patientName: 'Mike Johnson',
        date: new Date('2024-01-13'),
        amount: 150,
        status: 'pending',
        consultationType: 'video'
      }
    ]
  };

  const getStatusColor = (status) => {
    const colors = {
      completed: 'bg-green-100 text-green-800',
      pending: 'bg-yellow-100 text-yellow-800',
      cancelled: 'bg-red-100 text-red-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const stats = [
    {
      icon: FiIcons.FiDollarSign,
      label: 'Total Earnings',
      value: `$${earningsData.overview.totalEarnings.toLocaleString()}`,
      color: 'bg-green-500'
    },
    {
      icon: FiIcons.FiTrendingUp,
      label: 'This Month',
      value: `$${earningsData.overview.thisMonth.toLocaleString()}`,
      color: 'bg-blue-500'
    },
    {
      icon: FiIcons.FiClock,
      label: 'Pending',
      value: `$${earningsData.overview.pendingPayments.toLocaleString()}`,
      color: 'bg-yellow-500'
    },
    {
      icon: FiIcons.FiActivity,
      label: 'Consultations',
      value: earningsData.overview.completedConsultations,
      color: 'bg-purple-500'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-soft p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Earnings</h1>
            <p className="text-gray-600 mt-1">Track your consultation earnings and payments</p>
          </div>
          <div className="flex items-center space-x-3">
            <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <SafeIcon icon={FiIcons.FiDownload} className="w-4 h-4" />
              <span>Export Report</span>
            </button>
          </div>
        </div>
      </div>

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
        {/* Recent Transactions */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-soft p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Recent Transactions</h2>
            
            <div className="space-y-4">
              {earningsData.transactions.map((transaction) => (
                <div key={transaction.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                      <SafeIcon 
                        icon={transaction.consultationType === 'video' ? FiIcons.FiVideo : FiIcons.FiPhone} 
                        className="w-5 h-5 text-primary-600" 
                      />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">{transaction.patientName}</h3>
                      <p className="text-sm text-gray-600">
                        {transaction.date.toLocaleDateString()} • {transaction.consultationType} consultation
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-lg font-semibold text-gray-900">
                      ${transaction.amount}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(transaction.status)}`}>
                      {transaction.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Earnings Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-soft p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Earnings Summary</h2>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Average per consultation</span>
                <span className="font-semibold text-gray-900">
                  ${earningsData.overview.averagePerConsultation.toFixed(2)}
                </span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-gray-600">This week</span>
                <span className="font-semibold text-gray-900">
                  ${earningsData.overview.thisWeek}
                </span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-gray-600">This month</span>
                <span className="font-semibold text-gray-900">
                  ${earningsData.overview.thisMonth.toLocaleString()}
                </span>
              </div>
              
              <div className="border-t pt-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Total earnings</span>
                  <span className="text-lg font-bold text-gray-900">
                    ${earningsData.overview.totalEarnings.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t">
              <button className="w-full bg-primary-600 text-white py-3 rounded-lg hover:bg-primary-700 transition-colors font-medium">
                Request Payout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorEarnings;