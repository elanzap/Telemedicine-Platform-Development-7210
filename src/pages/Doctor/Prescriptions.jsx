import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';
import { format } from 'date-fns';
import toast from 'react-hot-toast';

const DoctorPrescriptions = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showWriteModal, setShowWriteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedPrescription, setSelectedPrescription] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Mock prescriptions data with state management
  const [prescriptions, setPrescriptions] = useState([
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
      refillsUsed: 1,
      quantity: '30 tablets',
      route: 'Oral',
      indication: 'Hypertension'
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
      refillsUsed: 0,
      quantity: '180 tablets',
      route: 'Oral',
      indication: 'Type 2 Diabetes'
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
      refillsUsed: 0,
      quantity: '21 capsules',
      route: 'Oral',
      indication: 'Bacterial infection'
    }
  ]);

  // Form state for new prescription
  const [newPrescription, setNewPrescription] = useState({
    patientName: '',
    patientId: '',
    medication: '',
    dosage: '',
    frequency: '',
    duration: '',
    instructions: '',
    refillsAllowed: 0,
    quantity: '',
    route: 'Oral',
    indication: ''
  });

  // Common medications for autocomplete
  const commonMedications = [
    'Lisinopril', 'Metformin', 'Amoxicillin', 'Atorvastatin', 'Omeprazole',
    'Levothyroxine', 'Amlodipine', 'Metoprolol', 'Losartan', 'Hydrochlorothiazide'
  ];

  // Common dosage frequencies
  const dosageFrequencies = [
    'Once daily', 'Twice daily', 'Three times daily', 'Four times daily',
    'Every 4 hours', 'Every 6 hours', 'Every 8 hours', 'Every 12 hours',
    'As needed', 'Before meals', 'After meals', 'At bedtime'
  ];

  // Routes of administration
  const routes = [
    'Oral', 'Topical', 'Injection', 'Inhalation', 'Eye drops', 'Ear drops', 'Nasal spray'
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
    setNewPrescription({
      patientName: '',
      patientId: '',
      medication: '',
      dosage: '',
      frequency: '',
      duration: '',
      instructions: '',
      refillsAllowed: 0,
      quantity: '',
      route: 'Oral',
      indication: ''
    });
    setShowWriteModal(true);
  };

  const handleEditPrescription = (prescription) => {
    setSelectedPrescription(prescription);
    setNewPrescription({
      patientName: prescription.patientName,
      patientId: prescription.patientId,
      medication: prescription.medication,
      dosage: prescription.dosage,
      frequency: prescription.frequency,
      duration: prescription.duration,
      instructions: prescription.instructions,
      refillsAllowed: prescription.refillsAllowed,
      quantity: prescription.quantity,
      route: prescription.route,
      indication: prescription.indication
    });
    setShowEditModal(true);
  };

  const handleDownloadPrescription = async (prescription) => {
    setIsLoading(true);
    try {
      // Simulate PDF generation and download
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Create prescription content
      const prescriptionContent = `
PRESCRIPTION

Patient: ${prescription.patientName}
Date: ${format(prescription.dateIssued, 'MMM dd, yyyy')}
Prescription ID: RX${prescription.id}234567

Medication: ${prescription.medication}
Dosage: ${prescription.dosage}
Frequency: ${prescription.frequency}
Duration: ${prescription.duration}
Quantity: ${prescription.quantity}
Route: ${prescription.route}
Indication: ${prescription.indication}

Instructions: ${prescription.instructions}

Refills Allowed: ${prescription.refillsAllowed}
Refills Used: ${prescription.refillsUsed}

Doctor: Dr. Sarah Johnson
License: MD12345
Signature: [Digital Signature]
      `;

      // Create and download file
      const blob = new Blob([prescriptionContent], { type: 'text/plain' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `prescription_${prescription.patientName.replace(' ', '_')}_${prescription.medication}.txt`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      toast.success('Prescription downloaded successfully!');
    } catch (error) {
      toast.error('Failed to download prescription');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSavePrescription = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Validate required fields
      if (!newPrescription.patientName || !newPrescription.medication || 
          !newPrescription.dosage || !newPrescription.frequency || 
          !newPrescription.duration) {
        toast.error('Please fill in all required fields');
        return;
      }

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      if (selectedPrescription) {
        // Update existing prescription
        setPrescriptions(prev => 
          prev.map(prescription => 
            prescription.id === selectedPrescription.id 
              ? { 
                  ...prescription, 
                  ...newPrescription,
                  dateIssued: new Date() // Update issue date for edits
                }
              : prescription
          )
        );
        toast.success('Prescription updated successfully!');
        setShowEditModal(false);
      } else {
        // Add new prescription
        const newPrescriptionData = {
          id: Date.now().toString(),
          ...newPrescription,
          dateIssued: new Date(),
          status: 'active',
          refillsUsed: 0
        };
        setPrescriptions(prev => [newPrescriptionData, ...prev]);
        toast.success('Prescription created successfully!');
        setShowWriteModal(false);
      }

      setSelectedPrescription(null);
    } catch (error) {
      toast.error('Failed to save prescription');
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field, value) => {
    setNewPrescription(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const Modal = ({ isOpen, onClose, title, children }) => (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
                <button
                  onClick={onClose}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <SafeIcon icon={FiIcons.FiX} className="w-5 h-5" />
                </button>
              </div>
              {children}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

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
          <SafeIcon icon={FiIcons.FiSearch} className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
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
                  <p className="text-sm text-gray-600 mb-1">Quantity:</p>
                  <p className="text-sm font-medium text-gray-900">{prescription.quantity}</p>
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
                  <button
                    onClick={() => handleEditPrescription(prescription)}
                    className="flex items-center space-x-2 px-4 py-2 border border-primary-300 text-primary-600 rounded-lg hover:bg-primary-50 transition-colors"
                  >
                    <SafeIcon icon={FiIcons.FiEdit} className="w-4 h-4" />
                    <span>Edit</span>
                  </button>
                  <button
                    onClick={() => handleDownloadPrescription(prescription)}
                    disabled={isLoading}
                    className="flex items-center space-x-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
                  >
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
              {searchTerm ? 'Try adjusting your search criteria' : "You haven't written any prescriptions yet"}
            </p>
          </div>
        )}
      </div>

      {/* Write/Edit Prescription Modal */}
      <Modal
        isOpen={showWriteModal || showEditModal}
        onClose={() => {
          setShowWriteModal(false);
          setShowEditModal(false);
          setSelectedPrescription(null);
        }}
        title={selectedPrescription ? 'Edit Prescription' : 'Write New Prescription'}
      >
        <form onSubmit={handleSavePrescription} className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Patient Name *
              </label>
              <input
                type="text"
                value={newPrescription.patientName}
                onChange={(e) => handleInputChange('patientName', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="Enter patient name"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Patient ID
              </label>
              <input
                type="text"
                value={newPrescription.patientId}
                onChange={(e) => handleInputChange('patientId', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="Enter patient ID"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Medication *
              </label>
              <input
                type="text"
                value={newPrescription.medication}
                onChange={(e) => handleInputChange('medication', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="Enter medication name"
                list="medications"
                required
              />
              <datalist id="medications">
                {commonMedications.map((med, index) => (
                  <option key={index} value={med} />
                ))}
              </datalist>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Dosage *
              </label>
              <input
                type="text"
                value={newPrescription.dosage}
                onChange={(e) => handleInputChange('dosage', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="e.g., 10mg, 500mg"
                required
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Frequency *
              </label>
              <select
                value={newPrescription.frequency}
                onChange={(e) => handleInputChange('frequency', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                required
              >
                <option value="">Select frequency</option>
                {dosageFrequencies.map((freq, index) => (
                  <option key={index} value={freq}>{freq}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Duration *
              </label>
              <input
                type="text"
                value={newPrescription.duration}
                onChange={(e) => handleInputChange('duration', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="e.g., 7 days, 30 days"
                required
              />
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Quantity
              </label>
              <input
                type="text"
                value={newPrescription.quantity}
                onChange={(e) => handleInputChange('quantity', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="e.g., 30 tablets"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Route
              </label>
              <select
                value={newPrescription.route}
                onChange={(e) => handleInputChange('route', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                {routes.map((route, index) => (
                  <option key={index} value={route}>{route}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Refills Allowed
              </label>
              <input
                type="number"
                value={newPrescription.refillsAllowed}
                onChange={(e) => handleInputChange('refillsAllowed', parseInt(e.target.value) || 0)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                min="0"
                max="5"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Indication
            </label>
            <input
              type="text"
              value={newPrescription.indication}
              onChange={(e) => handleInputChange('indication', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="Reason for prescription"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Instructions
            </label>
            <textarea
              value={newPrescription.instructions}
              onChange={(e) => handleInputChange('instructions', e.target.value)}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="Special instructions for the patient"
            />
          </div>

          <div className="flex space-x-3 pt-4">
            <button
              type="button"
              onClick={() => {
                setShowWriteModal(false);
                setShowEditModal(false);
                setSelectedPrescription(null);
              }}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-50"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  {selectedPrescription ? 'Updating...' : 'Creating...'}
                </div>
              ) : (
                selectedPrescription ? 'Update Prescription' : 'Create Prescription'
              )}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default DoctorPrescriptions;