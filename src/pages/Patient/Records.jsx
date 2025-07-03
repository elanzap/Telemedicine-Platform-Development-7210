import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';
import { format } from 'date-fns';
import toast from 'react-hot-toast';

const PatientRecords = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [uploadModalOpen, setUploadModalOpen] = useState(false);

  // Mock medical records data
  const medicalRecords = {
    overview: {
      bloodType: 'O+',
      allergies: ['Penicillin', 'Shellfish'],
      chronicConditions: ['Hypertension', 'Type 2 Diabetes'],
      emergencyContact: 'Jane Doe - (555) 123-4567',
      primaryDoctor: 'Dr. Sarah Johnson'
    },
    vitals: [
      {
        id: '1',
        date: new Date('2024-01-15'),
        bloodPressure: '120/80',
        heartRate: '72',
        temperature: '98.6°F',
        weight: '165 lbs',
        height: '5\'8"',
        doctorName: 'Dr. Sarah Johnson'
      },
      {
        id: '2',
        date: new Date('2024-01-01'),
        bloodPressure: '118/78',
        heartRate: '68',
        temperature: '98.4°F',
        weight: '167 lbs',
        height: '5\'8"',
        doctorName: 'Dr. Michael Chen'
      }
    ],
    labResults: [
      {
        id: '1',
        testName: 'Complete Blood Count (CBC)',
        date: new Date('2024-01-10'),
        status: 'Normal',
        doctorName: 'Dr. Sarah Johnson',
        results: {
          'White Blood Cells': '6.5 K/μL (Normal)',
          'Red Blood Cells': '4.8 M/μL (Normal)',
          'Hemoglobin': '14.2 g/dL (Normal)',
          'Platelets': '250 K/μL (Normal)'
        }
      },
      {
        id: '2',
        testName: 'Lipid Panel',
        date: new Date('2024-01-05'),
        status: 'Attention Needed',
        doctorName: 'Dr. Sarah Johnson',
        results: {
          'Total Cholesterol': '220 mg/dL (High)',
          'LDL Cholesterol': '140 mg/dL (High)',
          'HDL Cholesterol': '45 mg/dL (Low)',
          'Triglycerides': '180 mg/dL (Borderline)'
        }
      }
    ],
    documents: [
      {
        id: '1',
        name: 'MRI Scan Results',
        type: 'Imaging',
        date: new Date('2024-01-12'),
        size: '2.4 MB',
        doctorName: 'Dr. Emily Rodriguez',
        status: 'Normal'
      },
      {
        id: '2',
        name: 'X-Ray Chest',
        type: 'Imaging',
        date: new Date('2023-12-20'),
        size: '1.8 MB',
        doctorName: 'Dr. Michael Chen',
        status: 'Normal'
      },
      {
        id: '3',
        name: 'Cardiology Report',
        type: 'Report',
        date: new Date('2023-12-15'),
        size: '856 KB',
        doctorName: 'Dr. Sarah Johnson',
        status: 'Review Required'
      }
    ]
  };

  const handleDownloadDocument = (documentId) => {
    toast.success('Document downloaded successfully!');
  };

  const handleUploadDocument = () => {
    setUploadModalOpen(true);
  };

  const getStatusColor = (status) => {
    const colors = {
      'Normal': 'bg-green-100 text-green-800',
      'Attention Needed': 'bg-yellow-100 text-yellow-800',
      'Review Required': 'bg-red-100 text-red-800',
      'Pending': 'bg-gray-100 text-gray-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: FiIcons.FiUser },
    { id: 'vitals', label: 'Vital Signs', icon: FiIcons.FiActivity },
    { id: 'labs', label: 'Lab Results', icon: FiIcons.FiClipboard },
    { id: 'documents', label: 'Documents', icon: FiIcons.FiFolder }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-soft p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Medical Records</h1>
            <p className="text-gray-600 mt-1">Your complete health information in one place</p>
          </div>
          <button
            onClick={handleUploadDocument}
            className="flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
          >
            <SafeIcon icon={FiIcons.FiUpload} className="w-4 h-4" />
            <span>Upload Document</span>
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="mt-6 border-b border-gray-200">
          <nav className="flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <SafeIcon icon={tab.icon} className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Tab Content */}
      <div className="bg-white rounded-xl shadow-soft p-6">
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Basic Information</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Blood Type:</span>
                      <span className="font-medium">{medicalRecords.overview.bloodType}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Primary Doctor:</span>
                      <span className="font-medium">{medicalRecords.overview.primaryDoctor}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Emergency Contact:</span>
                      <span className="font-medium">{medicalRecords.overview.emergencyContact}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Allergies</h3>
                  <div className="flex flex-wrap gap-2">
                    {medicalRecords.overview.allergies.map((allergy, index) => (
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
                  <h3 className="font-semibold text-gray-900 mb-3">Chronic Conditions</h3>
                  <div className="flex flex-wrap gap-2">
                    {medicalRecords.overview.chronicConditions.map((condition, index) => (
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
            </div>
          </motion.div>
        )}

        {/* Vitals Tab */}
        {activeTab === 'vitals' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            {medicalRecords.vitals.map((vital, index) => (
              <div key={vital.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="font-semibold text-gray-900">
                      {format(vital.date, 'MMM dd, yyyy')}
                    </p>
                    <p className="text-sm text-gray-600">Recorded by {vital.doctorName}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  <div className="text-center">
                    <p className="text-sm text-gray-600">Blood Pressure</p>
                    <p className="text-lg font-semibold text-gray-900">{vital.bloodPressure}</p>
                    <p className="text-xs text-gray-500">mmHg</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-600">Heart Rate</p>
                    <p className="text-lg font-semibold text-gray-900">{vital.heartRate}</p>
                    <p className="text-xs text-gray-500">bpm</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-600">Temperature</p>
                    <p className="text-lg font-semibold text-gray-900">{vital.temperature}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-600">Weight</p>
                    <p className="text-lg font-semibold text-gray-900">{vital.weight}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-600">Height</p>
                    <p className="text-lg font-semibold text-gray-900">{vital.height}</p>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        )}

        {/* Lab Results Tab */}
        {activeTab === 'labs' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            {medicalRecords.labResults.map((lab, index) => (
              <div key={lab.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="font-semibold text-gray-900">{lab.testName}</h3>
                    <p className="text-sm text-gray-600">
                      {format(lab.date, 'MMM dd, yyyy')} by {lab.doctorName}
                    </p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(lab.status)}`}>
                    {lab.status}
                  </span>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  {Object.entries(lab.results).map(([test, result]) => (
                    <div key={test} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                      <span className="text-sm text-gray-600">{test}:</span>
                      <span className="text-sm font-medium text-gray-900">{result}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </motion.div>
        )}

        {/* Documents Tab */}
        {activeTab === 'documents' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            {medicalRecords.documents.map((document, index) => (
              <div key={document.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <SafeIcon icon={FiIcons.FiFileText} className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{document.name}</h3>
                    <p className="text-sm text-gray-600">
                      {document.type} • {format(document.date, 'MMM dd, yyyy')} • {document.size}
                    </p>
                    <p className="text-sm text-gray-600">Uploaded by {document.doctorName}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(document.status)}`}>
                    {document.status}
                  </span>
                  <button
                    onClick={() => handleDownloadDocument(document.id)}
                    className="flex items-center space-x-2 px-3 py-2 border border-primary-300 text-primary-600 rounded-lg hover:bg-primary-50 transition-colors"
                  >
                    <SafeIcon icon={FiIcons.FiDownload} className="w-4 h-4" />
                    <span>Download</span>
                  </button>
                </div>
              </div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default PatientRecords;