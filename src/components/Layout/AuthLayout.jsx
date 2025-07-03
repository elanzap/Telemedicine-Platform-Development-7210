import React from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';

const AuthLayout = ({ children }) => {
  return (
    <div className="min-h-screen flex">
      {/* Left side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary-600 to-primary-800 p-12 flex-col justify-center items-center text-white">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-md text-center"
        >
          <div className="flex items-center justify-center mb-8">
            <div className="w-16 h-16 bg-white bg-opacity-20 rounded-2xl flex items-center justify-center">
              <SafeIcon icon={FiIcons.FiActivity} className="w-8 h-8" />
            </div>
          </div>
          <h1 className="text-4xl font-bold mb-4">TeleMed Pro</h1>
          <p className="text-xl text-primary-100 mb-8">
            Advanced Telemedicine Platform for Modern Healthcare
          </p>
          <div className="space-y-4 text-left">
            <div className="flex items-center space-x-3">
              <SafeIcon icon={FiIcons.FiVideo} className="w-5 h-5" />
              <span>HD Video Consultations</span>
            </div>
            <div className="flex items-center space-x-3">
              <SafeIcon icon={FiIcons.FiShield} className="w-5 h-5" />
              <span>HIPAA Compliant & Secure</span>
            </div>
            <div className="flex items-center space-x-3">
              <SafeIcon icon={FiIcons.FiClock} className="w-5 h-5" />
              <span>24/7 Healthcare Access</span>
            </div>
            <div className="flex items-center space-x-3">
              <SafeIcon icon={FiIcons.FiFileText} className="w-5 h-5" />
              <span>Digital Prescriptions</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Right side - Auth Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-12 bg-gray-50">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="w-full max-w-md"
        >
          {children}
        </motion.div>
      </div>
    </div>
  );
};

export default AuthLayout;