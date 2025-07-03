import React from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';

const AdminDashboard = () => {
  const stats = [
    {
      icon: FiIcons.FiUsers,
      label: 'Total Users',
      value: '12,543',
      change: '+12%',
      color: 'bg-blue-500'
    },
    {
      icon: FiIcons.FiCalendar,
      label: 'Appointments Today',
      value: '156',
      change: '+8%',
      color: 'bg-green-500'
    },
    {
      icon: FiIcons.FiDollarSign,
      label: 'Revenue This Month',
      value: '$124,500',
      change: '+15%',
      color: 'bg-purple-500'
    },
    {
      icon: FiIcons.FiActivity,
      label: 'Active Sessions',
      value: '89',
      change: '+5%',
      color: 'bg-orange-500'
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
        <h1 className="text-2xl font-bold mb-2">Admin Dashboard</h1>
        <p className="text-primary-100">
          Monitor platform performance and manage users
        </p>
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
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-sm text-gray-600">{stat.label}</p>
                <p className="text-sm text-green-600 mt-1">{stat.change} from last month</p>
              </div>
              <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center`}>
                <SafeIcon icon={stat.icon} className="w-6 h-6 text-white" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-xl shadow-soft p-6"
        >
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Recent Activity</h2>
          <div className="space-y-4">
            {[
              { action: 'New doctor registration', user: 'Dr. Smith', time: '2 min ago' },
              { action: 'Payment processed', user: 'John Doe', time: '5 min ago' },
              { action: 'Appointment completed', user: 'Jane Smith', time: '10 min ago' }
            ].map((activity, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">{activity.action}</p>
                  <p className="text-sm text-gray-600">{activity.user}</p>
                </div>
                <span className="text-sm text-gray-500">{activity.time}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-xl shadow-soft p-6"
        >
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-4">
            <button className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <SafeIcon icon={FiIcons.FiUserPlus} className="w-5 h-5 text-primary-600" />
              <span className="text-gray-700">Add User</span>
            </button>
            <button className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <SafeIcon icon={FiIcons.FiBarChart3} className="w-5 h-5 text-primary-600" />
              <span className="text-gray-700">View Reports</span>
            </button>
            <button className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <SafeIcon icon={FiIcons.FiSettings} className="w-5 h-5 text-primary-600" />
              <span className="text-gray-700">Settings</span>
            </button>
            <button className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <SafeIcon icon={FiIcons.FiHelpCircle} className="w-5 h-5 text-primary-600" />
              <span className="text-gray-700">Support</span>
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminDashboard;