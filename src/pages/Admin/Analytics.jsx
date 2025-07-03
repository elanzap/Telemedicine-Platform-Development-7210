import React from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';

const AdminAnalytics = () => {
  const metrics = [
    {
      title: 'Total Revenue',
      value: '$124,500',
      change: '+15%',
      icon: FiIcons.FiDollarSign,
      color: 'bg-green-500'
    },
    {
      title: 'Active Users',
      value: '12,543',
      change: '+8%',
      icon: FiIcons.FiUsers,
      color: 'bg-blue-500'
    },
    {
      title: 'Consultations',
      value: '3,240',
      change: '+22%',
      icon: FiIcons.FiVideo,
      color: 'bg-purple-500'
    },
    {
      title: 'Satisfaction Rate',
      value: '94.5%',
      change: '+2%',
      icon: FiIcons.FiStar,
      color: 'bg-yellow-500'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-soft p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h1>
            <p className="text-gray-600 mt-1">Platform performance metrics and insights</p>
          </div>
          <div className="flex items-center space-x-3">
            <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent">
              <option>Last 30 days</option>
              <option>Last 3 months</option>
              <option>Last 6 months</option>
              <option>Last year</option>
            </select>
            <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <SafeIcon icon={FiIcons.FiDownload} className="w-4 h-4" />
              <span>Export</span>
            </button>
          </div>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white p-6 rounded-xl shadow-soft"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{metric.title}</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{metric.value}</p>
                <p className="text-sm text-green-600 mt-1">{metric.change} from last month</p>
              </div>
              <div className={`w-12 h-12 ${metric.color} rounded-lg flex items-center justify-center`}>
                <SafeIcon icon={metric.icon} className="w-6 h-6 text-white" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Chart Placeholder */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-xl shadow-soft p-6"
        >
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Revenue Trend</h2>
          <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <SafeIcon icon={FiIcons.FiBarChart3} className="w-12 h-12 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-500">Chart visualization would go here</p>
            </div>
          </div>
        </motion.div>

        {/* Top Doctors */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-xl shadow-soft p-6"
        >
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Top Performing Doctors</h2>
          <div className="space-y-4">
            {[
              { name: 'Dr. Sarah Johnson', consultations: 145, rating: 4.9 },
              { name: 'Dr. Michael Chen', consultations: 132, rating: 4.8 },
              { name: 'Dr. Emily Rodriguez', consultations: 128, rating: 4.9 }
            ].map((doctor, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">{doctor.name}</p>
                  <p className="text-sm text-gray-600">{doctor.consultations} consultations</p>
                </div>
                <div className="flex items-center space-x-1">
                  <SafeIcon icon={FiIcons.FiStar} className="w-4 h-4 text-yellow-400" />
                  <span className="text-sm font-medium">{doctor.rating}</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminAnalytics;