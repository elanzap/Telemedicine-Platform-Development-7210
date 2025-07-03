import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';

const DoctorPatients = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  // Mock patient data
  const patients = [
    {
      id: '1',
      name: 'John Doe',
      email: 'john.doe@email.com',
      phone: '+1 (555) 123-4567',
      age: 45,
      gender: 'Male',
      lastVisit: new Date('2024-01-15'),
      totalVisits: 5,
      status: 'active',
      conditions: ['Hypertension', 'Diabetes'],
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop&crop=face'
    },
    {
      id: '2',
      name: 'Jane Smith',
      email: 'jane.smith@email.com',
      phone: '+1 (555) 987-6543',
      age: 32,
      gender: 'Female',
      lastVisit: new Date('2024-01-10'),
      totalVisits: 3,
      status: 'active',
      conditions: ['Asthma'],
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=60&h=60&fit=crop&crop=face'
    },
    {
      id: '3',
      name: 'Mike Johnson',
      email: 'mike.johnson@email.com',
      phone: '+1 (555) 456-7890',
      age: 58,
      gender: 'Male',
      lastVisit: new Date('2023-12-20'),
      totalVisits: 8,
      status: 'inactive',
      conditions: ['Heart Disease', 'High Cholesterol'],
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=60&h=60&fit=crop&crop=face'
    }
  ];

  const filteredPatients = patients.filter(patient => {
    const matchesSearch = patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         patient.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || patient.status === filterStatus;
    
    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status) => {
    const colors = {
      active: 'bg-green-100 text-green-800',
      inactive: 'bg-gray-100 text-gray-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-soft p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">My Patients</h1>
            <p className="text-gray-600 mt-1">Manage your patient records and history</p>
          </div>
          <button className="flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
            <SafeIcon icon={FiIcons.FiUserPlus} className="w-4 h-4" />
            <span>Add Patient</span>
          </button>
        </div>

        {/* Search and Filter */}
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
                placeholder="Search patients..."
              />
            </div>
          </div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="all">All Patients</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
      </div>

      {/* Patients List */}
      <div className="space-y-4">
        {filteredPatients.length > 0 ? (
          filteredPatients.map((patient, index) => (
            <motion.div
              key={patient.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-soft p-6 hover:shadow-medium transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start space-x-4">
                  <img
                    src={patient.avatar}
                    alt={patient.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{patient.name}</h3>
                    <p className="text-gray-600 text-sm">{patient.email}</p>
                    <p className="text-gray-600 text-sm">{patient.phone}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(patient.status)}`}>
                    {patient.status.charAt(0).toUpperCase() + patient.status.slice(1)}
                  </span>
                </div>
              </div>

              <div className="grid md:grid-cols-4 gap-4 mb-4">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Age:</p>
                  <p className="text-sm font-medium text-gray-900">{patient.age} years old</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Gender:</p>
                  <p className="text-sm font-medium text-gray-900">{patient.gender}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Last Visit:</p>
                  <p className="text-sm font-medium text-gray-900">
                    {patient.lastVisit.toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Total Visits:</p>
                  <p className="text-sm font-medium text-gray-900">{patient.totalVisits}</p>
                </div>
              </div>

              {patient.conditions.length > 0 && (
                <div className="mb-4">
                  <p className="text-sm text-gray-600 mb-2">Conditions:</p>
                  <div className="flex flex-wrap gap-2">
                    {patient.conditions.map((condition, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs"
                      >
                        {condition}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                <div className="flex items-center space-x-3">
                  <button className="flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
                    <SafeIcon icon={FiIcons.FiVideo} className="w-4 h-4" />
                    <span>Start Consultation</span>
                  </button>
                  <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                    <SafeIcon icon={FiIcons.FiFileText} className="w-4 h-4" />
                    <span>View Records</span>
                  </button>
                  <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                    <SafeIcon icon={FiIcons.FiEdit} className="w-4 h-4" />
                    <span>Write Prescription</span>
                  </button>
                </div>

                <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                  <SafeIcon icon={FiIcons.FiMoreVertical} className="w-5 h-5" />
                </button>
              </div>
            </motion.div>
          ))
        ) : (
          <div className="bg-white rounded-xl shadow-soft p-12 text-center">
            <SafeIcon icon={FiIcons.FiUsers} className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No patients found</h3>
            <p className="text-gray-600 mb-6">
              {searchTerm || filterStatus !== 'all' 
                ? 'Try adjusting your search or filter criteria'
                : "You don't have any patients yet"
              }
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DoctorPatients;