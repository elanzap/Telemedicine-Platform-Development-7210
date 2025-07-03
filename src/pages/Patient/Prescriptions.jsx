import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';
import { format } from 'date-fns';
import toast from 'react-hot-toast';

const PatientPrescriptions = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  // Mock prescription data
  const prescriptions = [
    {
      id: '1',
      medication: 'Lisinopril',
      dosage: '10mg',
      frequency: 'Once daily',
      duration: '30 days',
      doctorName: 'Dr. Sarah Johnson',
      appointmentId: '1',
      dateIssued: new Date('2024-01-15'),
      status: 'active',
      instructions: 'Take with food in the morning',
      refillsRemaining: 2,
      pharmacyName: 'CVS Pharmacy',
      prescriptionNumber: 'RX001234567'
    },
    {
      id: '2',
      medication: 'Metformin',
      dosage: '500mg',
      frequency: 'Twice daily',
      duration: '90 days',
      doctorName: 'Dr. Michael Chen',
      appointmentId: '2',
      dateIssued: new Date('2024-01-10'),
      status: 'active',
      instructions: 'Take with meals',
      refillsRemaining: 1,
      pharmacyName: 'Walgreens',
      prescriptionNumber: 'RX001234568'
    },
    {
      id: '3',
      medication: 'Amoxicillin',
      dosage: '250mg',
      frequency: 'Three times daily',
      duration: '7 days',
      doctorName: 'Dr. Sarah Johnson',
      appointmentId: '3',
      dateIssued: new Date('2023-12-20'),
      status: 'completed',
      instructions: 'Complete full course even if feeling better',
      refillsRemaining: 0,
      pharmacyName: 'CVS Pharmacy',
      prescriptionNumber: 'RX001234569'
    }
  ];

  const filteredPrescriptions = prescriptions.filter(prescription => {
    const matchesSearch = prescription.medication.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         prescription.doctorName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || prescription.status === filterStatus;
    
    return matchesSearch && matchesFilter;
  });

  const handleDownloadPrescription = (prescriptionId) => {
    // Simulate PDF download
    toast.success('Prescription downloaded successfully!');
  };

  const handleRequestRefill = (prescriptionId) => {
    // Simulate refill request
    toast.success('Refill request submitted successfully!');
  };

  const getStatusColor = (status) => {
    const colors = {
      active: 'bg-green-100 text-green-800',
      completed: 'bg-blue-100 text-blue-800',
      expired: 'bg-red-100 text-red-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-soft p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">My Prescriptions</h1>
            <p className="text-gray-600 mt-1">Manage your digital prescriptions and refills</p>
          </div>
          <div className="flex items-center space-x-3">
            <SafeIcon icon={FiIcons.FiShield} className="w-5 h-5 text-green-600" />
            <span className="text-sm text-green-600 font-medium">HIPAA Secure</span>
          </div>
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
                placeholder="Search prescriptions or doctors..."
              />
            </div>
          </div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="all">All Prescriptions</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
            <option value="expired">Expired</option>
          </select>
        </div>
      </div>

      {/* Prescriptions List */}
      <div className="space-y-4">
        {filteredPrescriptions.length > 0 ? (
          filteredPrescriptions.map((prescription, index) => (
            <motion.div
              key={prescription.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-soft p-6"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                    <SafeIcon icon={FiIcons.FiFileText} className="w-6 h-6 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{prescription.medication}</h3>
                    <p className="text-primary-600 text-sm">{prescription.dosage} - {prescription.frequency}</p>
                    <p className="text-gray-500 text-sm">Prescribed by {prescription.doctorName}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(prescription.status)}`}>
                    {prescription.status.charAt(0).toUpperCase() + prescription.status.slice(1)}
                  </span>
                </div>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Duration:</p>
                  <p className="text-sm font-medium text-gray-900">{prescription.duration}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Date Issued:</p>
                  <p className="text-sm font-medium text-gray-900">
                    {format(prescription.dateIssued, 'MMM dd, yyyy')}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Refills Remaining:</p>
                  <p className="text-sm font-medium text-gray-900">{prescription.refillsRemaining}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Pharmacy:</p>
                  <p className="text-sm font-medium text-gray-900">{prescription.pharmacyName}</p>
                </div>
              </div>

              {prescription.instructions && (
                <div className="mb-4 p-3 bg-blue-50 rounded-lg">
                  <p className="text-sm text-blue-900">
                    <SafeIcon icon={FiIcons.FiInfo} className="w-4 h-4 inline mr-2" />
                    <strong>Instructions:</strong> {prescription.instructions}
                  </p>
                </div>
              )}

              <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => handleDownloadPrescription(prescription.id)}
                    className="flex items-center space-x-2 px-4 py-2 border border-primary-300 text-primary-600 rounded-lg hover:bg-primary-50 transition-colors"
                  >
                    <SafeIcon icon={FiIcons.FiDownload} className="w-4 h-4" />
                    <span>Download PDF</span>
                  </button>
                  
                  {prescription.status === 'active' && prescription.refillsRemaining > 0 && (
                    <button
                      onClick={() => handleRequestRefill(prescription.id)}
                      className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                    >
                      <SafeIcon icon={FiIcons.FiRefreshCw} className="w-4 h-4" />
                      <span>Request Refill</span>
                    </button>
                  )}
                </div>

                <div className="text-right text-sm text-gray-500">
                  <p>Rx #: {prescription.prescriptionNumber}</p>
                </div>
              </div>
            </motion.div>
          ))
        ) : (
          <div className="bg-white rounded-xl shadow-soft p-12 text-center">
            <SafeIcon icon={FiIcons.FiFileText} className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No prescriptions found</h3>
            <p className="text-gray-600 mb-6">
              {searchTerm || filterStatus !== 'all' 
                ? 'Try adjusting your search or filter criteria'
                : "You don't have any prescriptions yet"
              }
            </p>
          </div>
        )}
      </div>

      {/* Health Tips */}
      <div className="bg-gradient-to-r from-blue-50 to-primary-50 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Prescription Safety Tips</h3>
        <div className="grid md:grid-cols-2 gap-4 text-sm">
          <div className="flex items-start space-x-3">
            <SafeIcon icon={FiIcons.FiAlertCircle} className="w-5 h-5 text-blue-600 mt-0.5" />
            <div>
              <p className="font-medium text-gray-900">Take as Prescribed</p>
              <p className="text-gray-600">Always follow your doctor's instructions exactly</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <SafeIcon icon={FiIcons.FiClock} className="w-5 h-5 text-blue-600 mt-0.5" />
            <div>
              <p className="font-medium text-gray-900">Set Reminders</p>
              <p className="text-gray-600">Use alarms or apps to remember your medication times</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <SafeIcon icon={FiIcons.FiPhone} className="w-5 h-5 text-blue-600 mt-0.5" />
            <div>
              <p className="font-medium text-gray-900">Contact Your Doctor</p>
              <p className="text-gray-600">Call if you experience any side effects</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <SafeIcon icon={FiIcons.FiShield} className="w-5 h-5 text-blue-600 mt-0.5" />
            <div>
              <p className="font-medium text-gray-900">Store Safely</p>
              <p className="text-gray-600">Keep medications in a cool, dry place</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientPrescriptions;