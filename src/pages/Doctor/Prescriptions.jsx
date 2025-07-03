import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';
import { format } from 'date-fns';
import toast from 'react-hot-toast';

const DoctorPrescriptions = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showWriteModal, setShowWriteModal] = useState(false);

  // Mock prescriptions data
  const prescriptions = [
    {
      id: '1',
      patientName: 'John Doe',
      patientId: '1',
      medication: 'Lisinopril',
      dosage: '10mg',
      frequency: 'Once daily',
      duration: '30 days',
      dateIssued: new Date('2024-01-15'),
      status: 'active',
      instructions: 'Take with food in the morning',
      refillsAllowed: 3,
      refillsUsed: 1
    },
    {
      id: '2',
      patientName: 'Jane Smith',
      patientId: '2',
      medication: 'Metformin',
      dosage: '500mg',
      frequency: 'Twice daily',
      duration: '90 days',
      dateIssued: new Date('2024-01-10'),
      status: 'active',
      instructions: 'Take with meals',
      refillsAllowed: 2,
      refillsUsed: 0
    },
    {
      id: '3',
      patientName: 'Mike Johnson',
      patientId: '3',
      medication: 'Amoxicillin',
      dosage: '250mg',
      frequency: 'Three times daily',
      duration: '7 days',
      dateIssued: new Date('2023-12-20'),
      status: 'completed',
      instructions: 'Complete full course even if feeling better',
      refillsAllowed: 0,
      refillsUsed: 0
    }
  ];

  const filteredPrescriptions = prescriptions.filter(prescription =>
    prescription.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    prescription.medication.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status) => {
    const colors = {
      active: 'bg-green-100 text-green-800',
      completed: 'bg-blue-100 text-blue-800',
      cancelled: 'bg-red-100 text-red-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const handleWritePrescription = () => {
    setShowWriteModal(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-soft p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Prescriptions</h1>
            <p className="text-gray-600 mt-1">Manage patient prescriptions and medications</p>
          </div>
          <button
            onClick={handleWritePrescription}
            className="flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
          >
            <SafeIcon icon={FiIcons.FiEdit} className="w-4 h-4" />
            <span>Write Prescription</span>
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
            placeholder="Search prescriptions or patients..."
          />
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
                    <p className="text-gray-500 text-sm">Patient: {prescription.patientName}</p>
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
                  <p className="text-sm text-gray-600 mb-1">Refills:</p>
                  <p className="text-sm font-medium text-gray-900">
                    {prescription.refillsUsed} / {prescription.refillsAllowed}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Status:</p>
                  <p className="text-sm font-medium text-gray-900">{prescription.status}</p>
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
                <div className="flex items-center space-x-3">
                  <button className="flex items-center space-x-2 px-4 py-2 border border-primary-300 text-primary-600 rounded-lg hover:bg-primary-50 transition-colors">
                    <SafeIcon icon={FiIcons.FiEdit} className="w-4 h-4" />
                    <span>Edit</span>
                  </button>
                  <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                    <SafeIcon icon={FiIcons.FiDownload} className="w-4 h-4" />
                    <span>Download</span>
                  </button>
                </div>
                <div className="text-right text-sm text-gray-500">
                  <p>Rx #: RX{prescription.id}234567</p>
                </div>
              </div>
            </motion.div>
          ))
        ) : (
          <div className="bg-white rounded-xl shadow-soft p-12 text-center">
            <SafeIcon icon={FiIcons.FiFileText} className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No prescriptions found</h3>
            <p className="text-gray-600 mb-6">
              {searchTerm 
                ? 'Try adjusting your search criteria'
                : "You haven't written any prescriptions yet"
              }
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DoctorPrescriptions;