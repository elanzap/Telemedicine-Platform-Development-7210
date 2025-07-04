import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';
import toast from 'react-hot-toast';

const AdminDashboard = () => {
  const navigate = useNavigate();

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

  const handleAddUser = () => {
    navigate('/admin/users');
    toast.success('Redirecting to User Management');
  };

  const handleViewReports = () => {
    navigate('/admin/analytics');
    toast.success('Opening Analytics Dashboard');
  };

  const handleSettings = () => {
    navigate('/admin/settings');
    toast.success('Opening Platform Settings');
  };

  const handleSupport = () => {
    navigate('/admin/support');
    toast.success('Opening Support Center');
  };

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
              { action: 'Appointment completed', user: 'Jane Smith', time: '10 min ago' },
              { action: 'New patient registered', user: 'Mike Johnson', time: '15 min ago' },
              { action: 'Support ticket resolved', user: 'Admin', time: '20 min ago' }
            ].map((activity, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
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
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleAddUser}
              className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-primary-50 hover:border-primary-300 transition-all group"
            >
              <SafeIcon icon={FiIcons.FiUserPlus} className="w-5 h-5 text-primary-600 group-hover:scale-110 transition-transform" />
              <span className="text-gray-700 group-hover:text-primary-700 font-medium">Add User</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleViewReports}
              className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-primary-50 hover:border-primary-300 transition-all group"
            >
              <SafeIcon icon={FiIcons.FiBarChart3} className="w-5 h-5 text-primary-600 group-hover:scale-110 transition-transform" />
              <span className="text-gray-700 group-hover:text-primary-700 font-medium">View Reports</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleSettings}
              className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-primary-50 hover:border-primary-300 transition-all group"
            >
              <SafeIcon icon={FiIcons.FiSettings} className="w-5 h-5 text-primary-600 group-hover:scale-110 transition-transform" />
              <span className="text-gray-700 group-hover:text-primary-700 font-medium">Settings</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleSupport}
              className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-primary-50 hover:border-primary-300 transition-all group"
            >
              <SafeIcon icon={FiIcons.FiHelpCircle} className="w-5 h-5 text-primary-600 group-hover:scale-110 transition-transform" />
              <span className="text-gray-700 group-hover:text-primary-700 font-medium">Support</span>
            </motion.button>
          </div>

          {/* Additional Quick Stats */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <h3 className="text-sm font-medium text-gray-900 mb-3">System Status</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Server Status</span>
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-green-600 font-medium">Online</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Database</span>
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-green-600 font-medium">Healthy</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">API Status</span>
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-green-600 font-medium">Active</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Storage</span>
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <span className="text-yellow-600 font-medium">78% Full</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Recent Users & Platform Overview */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Users */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white rounded-xl shadow-soft p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Recent Users</h2>
            <Link 
              to="/admin/users"
              className="text-primary-600 hover:text-primary-700 text-sm font-medium"
            >
              View All
            </Link>
          </div>
          <div className="space-y-4">
            {[
              { name: 'Dr. Sarah Johnson', role: 'Doctor', status: 'active', joinDate: '2 days ago' },
              { name: 'John Patient', role: 'Patient', status: 'active', joinDate: '3 days ago' },
              { name: 'Dr. Michael Chen', role: 'Doctor', status: 'pending', joinDate: '5 days ago' },
              { name: 'Jane Smith', role: 'Patient', status: 'active', joinDate: '1 week ago' }
            ].map((user, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                    <SafeIcon icon={FiIcons.FiUser} className="w-4 h-4 text-primary-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{user.name}</p>
                    <p className="text-sm text-gray-600">{user.role}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    user.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {user.status}
                  </span>
                  <p className="text-xs text-gray-500 mt-1">{user.joinDate}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Platform Performance */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="bg-white rounded-xl shadow-soft p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Platform Performance</h2>
            <Link 
              to="/admin/analytics"
              className="text-primary-600 hover:text-primary-700 text-sm font-medium"
            >
              View Details
            </Link>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Response Time</span>
              <span className="font-semibold text-green-600">142ms</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Uptime</span>
              <span className="font-semibold text-green-600">99.9%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Active Connections</span>
              <span className="font-semibold text-blue-600">1,247</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Error Rate</span>
              <span className="font-semibold text-green-600">0.02%</span>
            </div>
            <div className="pt-4 border-t border-gray-200">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-600">CPU Usage</span>
                <span className="font-semibold text-gray-900">34%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-500 h-2 rounded-full" style={{ width: '34%' }}></div>
              </div>
            </div>
            <div className="pt-2">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-600">Memory Usage</span>
                <span className="font-semibold text-gray-900">67%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '67%' }}></div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminDashboard;