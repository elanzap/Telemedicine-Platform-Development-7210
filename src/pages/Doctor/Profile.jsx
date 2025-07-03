import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';
import { useAuthStore } from '../../stores/authStore';
import toast from 'react-hot-toast';

const DoctorProfile = () => {
  const { user, updateProfile, isLoading } = useAuthStore();
  const [activeTab, setActiveTab] = useState('personal');
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    specialty: user?.specialty || '',
    license: user?.license || '',
    education: user?.education || '',
    experience: user?.experience || '',
    bio: user?.bio || '',
    languages: user?.languages || [],
    consultationFee: user?.consultationFee || '',
    availability: user?.availability || {}
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await updateProfile(formData);
    
    if (result.success) {
      toast.success('Profile updated successfully!');
    } else {
      toast.error('Failed to update profile');
    }
  };

  const tabs = [
    { id: 'personal', label: 'Personal Info', icon: FiIcons.FiUser },
    { id: 'professional', label: 'Professional Info', icon: FiIcons.FiFileText },
    { id: 'availability', label: 'Availability', icon: FiIcons.FiCalendar },
    { id: 'security', label: 'Security', icon: FiIcons.FiShield }
  ];

  const specialties = [
    'Cardiology', 'Dermatology', 'Pediatrics', 'Psychiatry', 
    'Orthopedics', 'Neurology', 'General Medicine'
  ];

  const languages = ['English', 'Spanish', 'Mandarin', 'Portuguese', 'French'];

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-soft p-6">
        <div className="flex items-center space-x-4 mb-6">
          <img
            src={user?.avatar}
            alt={user?.name}
            className="w-20 h-20 rounded-full object-cover"
          />
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{user?.name}</h1>
            <p className="text-primary-600">{user?.specialty}</p>
            <p className="text-gray-600">{user?.email}</p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="border-b border-gray-200 mb-6">
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

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Personal Information Tab */}
          {activeTab === 'personal' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid md:grid-cols-2 gap-6"
            >
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Consultation Fee ($)
                </label>
                <input
                  type="number"
                  name="consultationFee"
                  value={formData.consultationFee}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Bio
                </label>
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Tell patients about yourself..."
                />
              </div>
            </motion.div>
          )}

          {/* Professional Information Tab */}
          {activeTab === 'professional' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Specialty *
                  </label>
                  <select
                    name="specialty"
                    value={formData.specialty}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    required
                  >
                    <option value="">Select Specialty</option>
                    {specialties.map((specialty) => (
                      <option key={specialty} value={specialty}>{specialty}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Medical License Number *
                  </label>
                  <input
                    type="text"
                    name="license"
                    value={formData.license}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Education
                  </label>
                  <input
                    type="text"
                    name="education"
                    value={formData.education}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="e.g., Harvard Medical School"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Years of Experience
                  </label>
                  <input
                    type="number"
                    name="experience"
                    value={formData.experience}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Languages Spoken
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {languages.map((language) => (
                    <label key={language} className="flex items-center">
                      <input
                        type="checkbox"
                        className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                      />
                      <span className="ml-2 text-sm text-gray-700">{language}</span>
                    </label>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* Availability Tab */}
          {activeTab === 'availability' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-blue-900 text-sm">
                  Set your available hours for each day. Patients will only be able to book appointments during these times.
                </p>
              </div>
              
              {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day) => (
                <div key={day} className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg">
                  <div className="w-24">
                    <span className="font-medium text-gray-900">{day}</span>
                  </div>
                  <label className="flex items-center">
                    <input type="checkbox" className="rounded border-gray-300 text-primary-600 focus:ring-primary-500" />
                    <span className="ml-2 text-sm text-gray-700">Available</span>
                  </label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="time"
                      className="px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                    <span className="text-gray-500">to</span>
                    <input
                      type="time"
                      className="px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                </div>
              ))}
            </motion.div>
          )}

          {/* Security Tab */}
          {activeTab === 'security' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="flex">
                  <SafeIcon icon={FiIcons.FiAlertTriangle} className="w-5 h-5 text-yellow-400 mr-2" />
                  <div>
                    <h3 className="text-sm font-medium text-yellow-800">
                      Password Security
                    </h3>
                    <p className="text-sm text-yellow-700 mt-1">
                      Use a strong password that includes uppercase, lowercase, numbers, and special characters.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Current Password
                  </label>
                  <input
                    type="password"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="Enter current password"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    New Password
                  </label>
                  <input
                    type="password"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="Enter new password"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Confirm new password"
                />
              </div>
            </motion.div>
          )}

          {/* Save Button */}
          <div className="flex justify-end pt-6 border-t border-gray-200">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isLoading}
              className="bg-primary-600 text-white px-8 py-3 rounded-lg hover:bg-primary-700 transition-colors font-medium disabled:opacity-50"
            >
              {isLoading ? (
                <div className="flex items-center">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Saving...
                </div>
              ) : (
                'Save Changes'
              )}
            </motion.button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DoctorProfile;