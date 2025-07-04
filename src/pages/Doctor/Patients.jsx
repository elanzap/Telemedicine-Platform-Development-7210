import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const DoctorPatients = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showRecordsModal, setShowRecordsModal] = useState(false);
  const [showPrescriptionModal, setShowPrescriptionModal] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Mock patient data with state management
  const [patients, setPatients] = useState([
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
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop&crop=face',
      dateOfBirth: '1979-03-15',
      address: '123 Main St, New York, NY 10001',
      emergencyContact: 'Jane Doe - (555) 987-6543',
      bloodType: 'O+',
      allergies: ['Penicillin'],
      medications: ['Lisinopril 10mg', 'Metformin 500mg'],
      notes: 'Regular patient, very compliant with medications'
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
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=60&h=60&fit=crop&crop=face',
      dateOfBirth: '1992-07-22',
      address: '456 Oak Ave, Brooklyn, NY 11201',
      emergencyContact: 'John Smith - (555) 123-4567',
      bloodType: 'A+',
      allergies: ['Shellfish'],
      medications: ['Albuterol inhaler'],
      notes: 'Seasonal asthma, uses rescue inhaler as needed'
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
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=60&h=60&fit=crop&crop=face',
      dateOfBirth: '1966-11-08',
      address: '789 Pine St, Queens, NY 11385',
      emergencyContact: 'Sarah Johnson - (555) 654-3210',
      bloodType: 'B+',
      allergies: ['Aspirin', 'Sulfa drugs'],
      medications: ['Atorvastatin 40mg', 'Metoprolol 25mg'],
      notes: 'Requires regular cardiac monitoring'
    }
  ]);

  // New patient form state
  const [newPatient, setNewPatient] = useState({
    name: '',
    email: '',
    phone: '',
    age: '',
    gender: '',
    dateOfBirth: '',
    address: '',
    emergencyContact: '',
    bloodType: '',
    allergies: '',
    conditions: '',
    medications: '',
    notes: ''
  });

  // Prescription form state
  const [newPrescription, setNewPrescription] = useState({
    medication: '',
    dosage: '',
    frequency: 'Once daily',
    duration: '',
    instructions: '',
    quantity: '',
    refills: 0
  });

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

  // Handler functions
  const handleAddPatient = () => {
    setNewPatient({
      name: '',
      email: '',
      phone: '',
      age: '',
      gender: '',
      dateOfBirth: '',
      address: '',
      emergencyContact: '',
      bloodType: '',
      allergies: '',
      conditions: '',
      medications: '',
      notes: ''
    });
    setShowAddModal(true);
  };

  const handleStartConsultation = (patient) => {
    // Create a mock appointment for immediate consultation
    const mockAppointmentId = `consultation_${patient.id}_${Date.now()}`;
    toast.success(`Starting consultation with ${patient.name}`);
    
    // Navigate to video consultation (you can implement this route)
    // For now, we'll show a success message and simulate starting
    setTimeout(() => {
      toast.success('Video consultation room ready!');
      // In a real app: navigate(`/doctor/consultation/${mockAppointmentId}`);
    }, 1500);
  };

  const handleViewRecords = (patient) => {
    setSelectedPatient(patient);
    setShowRecordsModal(true);
  };

  const handleWritePrescription = (patient) => {
    setSelectedPatient(patient);
    setNewPrescription({
      medication: '',
      dosage: '',
      frequency: 'Once daily',
      duration: '',
      instructions: '',
      quantity: '',
      refills: 0
    });
    setShowPrescriptionModal(true);
  };

  const handleSavePatient = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Validate required fields
      if (!newPatient.name || !newPatient.email || !newPatient.phone) {
        toast.error('Please fill in all required fields');
        return;
      }

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      const patientData = {
        id: Date.now().toString(),
        ...newPatient,
        age: parseInt(newPatient.age) || 0,
        lastVisit: new Date(),
        totalVisits: 0,
        status: 'active',
        conditions: newPatient.conditions ? newPatient.conditions.split(',').map(c => c.trim()) : [],
        allergies: newPatient.allergies ? newPatient.allergies.split(',').map(a => a.trim()) : [],
        medications: newPatient.medications ? newPatient.medications.split(',').map(m => m.trim()) : [],
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop&crop=face'
      };

      setPatients(prev => [patientData, ...prev]);
      toast.success('Patient added successfully!');
      setShowAddModal(false);
    } catch (error) {
      toast.error('Failed to add patient');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSavePrescription = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Validate required fields
      if (!newPrescription.medication || !newPrescription.dosage || !newPrescription.duration) {
        toast.error('Please fill in all required prescription fields');
        return;
      }

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Add prescription to patient's medications
      const prescriptionText = `${newPrescription.medication} ${newPrescription.dosage} - ${newPrescription.frequency}`;
      
      setPatients(prev => prev.map(patient => 
        patient.id === selectedPatient.id 
          ? { ...patient, medications: [...patient.medications, prescriptionText] }
          : patient
      ));

      toast.success(`Prescription written for ${selectedPatient.name}`);
      setShowPrescriptionModal(false);
      setSelectedPatient(null);
    } catch (error) {
      toast.error('Failed to write prescription');
    } finally {
      setIsLoading(false);
    }
  };

  const Modal = ({ isOpen, onClose, title, children, size = 'max-w-2xl' }) => (
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
            className={`bg-white rounded-xl shadow-2xl w-full ${size} max-h-[90vh] overflow-y-auto`}
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
            <h1 className="text-2xl font-bold text-gray-900">My Patients</h1>
            <p className="text-gray-600 mt-1">Manage your patient records and history</p>
          </div>
          <button
            onClick={handleAddPatient}
            className="flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
          >
            <SafeIcon icon={FiIcons.FiUserPlus} className="w-4 h-4" />
            <span>Add Patient</span>
          </button>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <SafeIcon icon={FiIcons.FiSearch} className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
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
                  <button
                    onClick={() => handleStartConsultation(patient)}
                    className="flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                  >
                    <SafeIcon icon={FiIcons.FiVideo} className="w-4 h-4" />
                    <span>Start Consultation</span>
                  </button>
                  <button
                    onClick={() => handleViewRecords(patient)}
                    className="flex items-center space-x-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <SafeIcon icon={FiIcons.FiFileText} className="w-4 h-4" />
                    <span>View Records</span>
                  </button>
                  <button
                    onClick={() => handleWritePrescription(patient)}
                    className="flex items-center space-x-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
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
                : "You don't have any patients yet"}
            </p>
          </div>
        )}
      </div>

      {/* Add Patient Modal */}
      <Modal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        title="Add New Patient"
        size="max-w-4xl"
      >
        <form onSubmit={handleSavePatient} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name *
              </label>
              <input
                type="text"
                value={newPatient.name}
                onChange={(e) => setNewPatient({ ...newPatient, name: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="Enter patient's full name"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address *
              </label>
              <input
                type="email"
                value={newPatient.email}
                onChange={(e) => setNewPatient({ ...newPatient, email: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="patient@email.com"
                required
              />
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number *
              </label>
              <input
                type="tel"
                value={newPatient.phone}
                onChange={(e) => setNewPatient({ ...newPatient, phone: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="+1 (555) 123-4567"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Age
              </label>
              <input
                type="number"
                value={newPatient.age}
                onChange={(e) => setNewPatient({ ...newPatient, age: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="35"
                min="0"
                max="120"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Gender
              </label>
              <select
                value={newPatient.gender}
                onChange={(e) => setNewPatient({ ...newPatient, gender: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Date of Birth
              </label>
              <input
                type="date"
                value={newPatient.dateOfBirth}
                onChange={(e) => setNewPatient({ ...newPatient, dateOfBirth: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Blood Type
              </label>
              <select
                value={newPatient.bloodType}
                onChange={(e) => setNewPatient({ ...newPatient, bloodType: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="">Select Blood Type</option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Address
            </label>
            <textarea
              value={newPatient.address}
              onChange={(e) => setNewPatient({ ...newPatient, address: e.target.value })}
              rows={2}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="Full address"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Emergency Contact
            </label>
            <input
              type="text"
              value={newPatient.emergencyContact}
              onChange={(e) => setNewPatient({ ...newPatient, emergencyContact: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="Name - Phone Number"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Allergies
              </label>
              <input
                type="text"
                value={newPatient.allergies}
                onChange={(e) => setNewPatient({ ...newPatient, allergies: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="Separate with commas"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Current Conditions
              </label>
              <input
                type="text"
                value={newPatient.conditions}
                onChange={(e) => setNewPatient({ ...newPatient, conditions: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="Separate with commas"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Current Medications
            </label>
            <textarea
              value={newPatient.medications}
              onChange={(e) => setNewPatient({ ...newPatient, medications: e.target.value })}
              rows={2}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="List current medications, separate with commas"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Clinical Notes
            </label>
            <textarea
              value={newPatient.notes}
              onChange={(e) => setNewPatient({ ...newPatient, notes: e.target.value })}
              rows={3}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="Additional notes about the patient"
            />
          </div>

          <div className="flex space-x-4 pt-4">
            <button
              type="button"
              onClick={() => setShowAddModal(false)}
              className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 bg-primary-600 text-white px-4 py-3 rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-50"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Adding Patient...
                </div>
              ) : (
                'Add Patient'
              )}
            </button>
          </div>
        </form>
      </Modal>

      {/* View Records Modal */}
      <Modal
        isOpen={showRecordsModal}
        onClose={() => {
          setShowRecordsModal(false);
          setSelectedPatient(null);
        }}
        title={`Medical Records - ${selectedPatient?.name}`}
        size="max-w-4xl"
      >
        {selectedPatient && (
          <div className="space-y-6">
            {/* Patient Info */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-3">Patient Information</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Name:</span>
                    <span className="font-medium">{selectedPatient.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Age:</span>
                    <span className="font-medium">{selectedPatient.age}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Gender:</span>
                    <span className="font-medium">{selectedPatient.gender}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Blood Type:</span>
                    <span className="font-medium">{selectedPatient.bloodType}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Phone:</span>
                    <span className="font-medium">{selectedPatient.phone}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Email:</span>
                    <span className="font-medium">{selectedPatient.email}</span>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-3">Emergency Contact</h4>
                <p className="text-sm text-gray-700">{selectedPatient.emergencyContact}</p>
                <h4 className="font-semibold text-gray-900 mb-3 mt-4">Address</h4>
                <p className="text-sm text-gray-700">{selectedPatient.address}</p>
              </div>
            </div>

            {/* Medical Info */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Allergies</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedPatient.allergies?.map((allergy, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm"
                    >
                      {allergy}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Conditions</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedPatient.conditions?.map((condition, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm"
                    >
                      {condition}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Medications */}
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Current Medications</h4>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="space-y-2">
                  {selectedPatient.medications?.map((medication, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <SafeIcon icon={FiIcons.FiPill} className="w-4 h-4 text-primary-600" />
                      <span className="text-sm text-gray-700">{medication}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Clinical Notes */}
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Clinical Notes</h4>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-sm text-gray-700">{selectedPatient.notes}</p>
              </div>
            </div>

            {/* Visit History */}
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Visit History</h4>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Total Visits:</span>
                  <span className="font-medium">{selectedPatient.totalVisits}</span>
                </div>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-sm text-gray-600">Last Visit:</span>
                  <span className="font-medium">{selectedPatient.lastVisit.toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </Modal>

      {/* Write Prescription Modal */}
      <Modal
        isOpen={showPrescriptionModal}
        onClose={() => {
          setShowPrescriptionModal(false);
          setSelectedPatient(null);
        }}
        title={`Write Prescription - ${selectedPatient?.name}`}
      >
        <form onSubmit={handleSavePrescription} className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Medication *
              </label>
              <input
                type="text"
                value={newPrescription.medication}
                onChange={(e) => setNewPrescription({ ...newPrescription, medication: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="Enter medication name"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Dosage *
              </label>
              <input
                type="text"
                value={newPrescription.dosage}
                onChange={(e) => setNewPrescription({ ...newPrescription, dosage: e.target.value })}
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
                onChange={(e) => setNewPrescription({ ...newPrescription, frequency: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                required
              >
                <option value="Once daily">Once daily</option>
                <option value="Twice daily">Twice daily</option>
                <option value="Three times daily">Three times daily</option>
                <option value="Four times daily">Four times daily</option>
                <option value="As needed">As needed</option>
                <option value="Before meals">Before meals</option>
                <option value="After meals">After meals</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Duration *
              </label>
              <input
                type="text"
                value={newPrescription.duration}
                onChange={(e) => setNewPrescription({ ...newPrescription, duration: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="e.g., 7 days, 30 days"
                required
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Quantity
              </label>
              <input
                type="text"
                value={newPrescription.quantity}
                onChange={(e) => setNewPrescription({ ...newPrescription, quantity: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="e.g., 30 tablets"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Refills
              </label>
              <input
                type="number"
                value={newPrescription.refills}
                onChange={(e) => setNewPrescription({ ...newPrescription, refills: parseInt(e.target.value) || 0 })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                min="0"
                max="5"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Instructions
            </label>
            <textarea
              value={newPrescription.instructions}
              onChange={(e) => setNewPrescription({ ...newPrescription, instructions: e.target.value })}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="Special instructions for the patient"
            />
          </div>

          <div className="flex space-x-3 pt-4">
            <button
              type="button"
              onClick={() => {
                setShowPrescriptionModal(false);
                setSelectedPatient(null);
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
                  Writing...
                </div>
              ) : (
                'Write Prescription'
              )}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default DoctorPatients;