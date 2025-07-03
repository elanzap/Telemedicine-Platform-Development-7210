import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';

const AdminUsers = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Mock users data
  const users = [
    {
      id: '1',
      name: 'Dr. Sarah Johnson',
      email: 'sarah.johnson@telemed.com',
      role: 'doctor',
      status: 'active',
      joinDate: new Date('2023-12-01'),
      lastActive: new Date('2024-01-15'),
      specialty: 'Cardiology'
    },
    {
      id: '2',
      name: 'John Patient',
      email: 'john.patient@email.com',
      role: 'patient',
      status: 'active',
      joinDate: new Date('2024-01-10'),
      lastActive: new Date('2024-01-14')
    },
    {
      id: '3',
      name: 'Dr. Michael Chen',
      email: 'michael.chen@telemed.com',
      role: 'doctor',
      status: 'pending',
      joinDate: new Date('2024-01-12'),
      lastActive: new Date('2024-01-12'),
      specialty: 'Dermatology'
    }
  ];

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTab = activeTab === 'all' || user.role === activeTab;
    
    return matchesSearch && matchesTab;
  });

  const getStatusColor = (status) => {
    const colors = {
      active: 'bg-green-100 text-green-800',
      pending: 'bg-yellow-100 text-yellow-800',
      suspended: 'bg-red-100 text-red-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const getRoleColor = (role) => {
    const colors = {
      admin: 'bg-purple-100 text-purple-800',
      doctor: 'bg-blue-100 text-blue-800',
      patient: 'bg-gray-100 text-gray-800'
    };
    return colors[role] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-soft p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">User Management</h1>
            <p className="text-gray-600 mt-1">Manage platform users and their permissions</p>
          </div>
          <button className="flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
            <SafeIcon icon={FiIcons.FiUserPlus} className="w-4 h-4" />
            <span>Add User</span>
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
                placeholder="Search users..."
              />
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="mt-6 border-b border-gray-200">
          <nav className="flex space-x-8">
            {[
              { id: 'all', label: 'All Users', count: users.length },
              { id: 'doctor', label: 'Doctors', count: users.filter(u => u.role === 'doctor').length },
              { id: 'patient', label: 'Patients', count: users.filter(u => u.role === 'patient').length }
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

      {/* Users List */}
      <div className="space-y-4">
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user, index) => (
            <motion.div
              key={user.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-soft p-6"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                    <SafeIcon icon={FiIcons.FiUser} className="w-6 h-6 text-gray-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{user.name}</h3>
                    <p className="text-sm text-gray-600">{user.email}</p>
                    {user.specialty && (
                      <p className="text-sm text-gray-500">{user.specialty}</p>
                    )}
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <p className="text-sm text-gray-600">Joined: {user.joinDate.toLocaleDateString()}</p>
                    <p className="text-sm text-gray-600">Last active: {user.lastActive.toLocaleDateString()}</p>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRoleColor(user.role)}`}>
                      {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(user.status)}`}>
                      {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                    </span>
                  </div>

                  <div className="flex items-center space-x-2">
                    <button className="p-2 text-gray-400 hover:text-primary-600 transition-colors">
                      <SafeIcon icon={FiIcons.FiEdit} className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-red-600 transition-colors">
                      <SafeIcon icon={FiIcons.FiTrash2} className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))
        ) : (
          <div className="bg-white rounded-xl shadow-soft p-12 text-center">
            <SafeIcon icon={FiIcons.FiUsers} className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No users found</h3>
            <p className="text-gray-600">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminUsers;