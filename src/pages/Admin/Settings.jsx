import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';
import toast from 'react-hot-toast';

const AdminSettings = () => {
  const [activeTab, setActiveTab] = useState('general');
  const [isLoading, setIsLoading] = useState(false);

  const handleSave = async () => {
    setIsLoading(true);
    // Simulate save
    setTimeout(() => {
      setIsLoading(false);
      toast.success('Settings saved successfully!');
    }, 1000);
  };

  const tabs = [
    { id: 'general', label: 'General', icon: FiIcons.FiSettings },
    { id: 'payment', label: 'Payment', icon: FiIcons.FiCreditCard },
    { id: 'security', label: 'Security', icon: FiIcons.FiShield },
    { id: 'notifications', label: 'Notifications', icon: FiIcons.FiBell }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-soft p-6">
        <h1 className="text-2xl font-bold text-gray-900">Platform Settings</h1>
        <p className="text-gray-600 mt-1">Configure platform-wide settings and preferences</p>
      </div>

      <div className="grid lg:grid-cols-4 gap-6">
        {/* Tab Navigation */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-soft p-6">
            <nav className="space-y-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                    activeTab === tab.id
                      ? 'bg-primary-50 text-primary-600 border-r-2 border-primary-600'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <SafeIcon icon={tab.icon} className="w-5 h-5" />
                  <span className="font-medium">{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Settings Content */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-xl shadow-soft p-6">
            {/* General Settings */}
            {activeTab === 'general' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <h2 className="text-xl font-semibold text-gray-900">General Settings</h2>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Platform Name
                    </label>
                    <input
                      type="text"
                      defaultValue="TeleMed Pro"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Support Email
                    </label>
                    <input
                      type="email"
                      defaultValue="support@telemedpro.com"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Timezone
                    </label>
                    <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent">
                      <option>UTC-5 (Eastern Time)</option>
                      <option>UTC-8 (Pacific Time)</option>
                      <option>UTC+0 (GMT)</option>
                    </select>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Payment Settings */}
            {activeTab === 'payment' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <h2 className="text-xl font-semibold text-gray-900">Payment Settings</h2>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-gray-900">Stripe Integration</h3>
                      <p className="text-sm text-gray-600">Enable Stripe payment processing</p>
                    </div>
                    <input type="checkbox" defaultChecked className="rounded" />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-gray-900">PayPal Integration</h3>
                      <p className="text-sm text-gray-600">Enable PayPal payment processing</p>
                    </div>
                    <input type="checkbox" defaultChecked className="rounded" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Platform Commission (%)
                    </label>
                    <input
                      type="number"
                      defaultValue="10"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {/* Security Settings */}
            {activeTab === 'security' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <h2 className="text-xl font-semibold text-gray-900">Security Settings</h2>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-gray-900">Two-Factor Authentication</h3>
                      <p className="text-sm text-gray-600">Require 2FA for admin accounts</p>
                    </div>
                    <input type="checkbox" defaultChecked className="rounded" />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-gray-900">Session Timeout</h3>
                      <p className="text-sm text-gray-600">Auto-logout after inactivity</p>
                    </div>
                    <input type="checkbox" defaultChecked className="rounded" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Password Policy
                    </label>
                    <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent">
                      <option>Strong (recommended)</option>
                      <option>Medium</option>
                      <option>Basic</option>
                    </select>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Notifications Settings */}
            {activeTab === 'notifications' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <h2 className="text-xl font-semibold text-gray-900">Notification Settings</h2>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-gray-900">Email Notifications</h3>
                      <p className="text-sm text-gray-600">Send email notifications to users</p>
                    </div>
                    <input type="checkbox" defaultChecked className="rounded" />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-gray-900">SMS Notifications</h3>
                      <p className="text-sm text-gray-600">Send SMS notifications</p>
                    </div>
                    <input type="checkbox" className="rounded" />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-gray-900">Push Notifications</h3>
                      <p className="text-sm text-gray-600">Send browser push notifications</p>
                    </div>
                    <input type="checkbox" defaultChecked className="rounded" />
                  </div>
                </div>
              </motion.div>
            )}

            {/* Save Button */}
            <div className="flex justify-end pt-6 border-t border-gray-200 mt-8">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleSave}
                disabled={isLoading}
                className="bg-primary-600 text-white px-8 py-3 rounded-lg hover:bg-primary-700 transition-colors font-medium disabled:opacity-50"
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Saving...
                  </div>
                ) : (
                  'Save Settings'
                )}
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSettings;