import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';
import toast from 'react-hot-toast';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email) {
      toast.error('Please enter your email address');
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setEmailSent(true);
      toast.success('Password reset email sent!');
    }, 1000);
  };

  if (emailSent) {
    return (
      <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <SafeIcon icon={FiIcons.FiMail} className="w-8 h-8 text-green-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Check Your Email</h2>
        <p className="text-gray-600 mb-6">
          We've sent a password reset link to <strong>{email}</strong>
        </p>
        <p className="text-sm text-gray-500 mb-8">
          Didn't receive the email? Check your spam folder or try again.
        </p>
        <div className="space-y-3">
          <button
            onClick={() => {
              setEmailSent(false);
              setEmail('');
            }}
            className="w-full bg-primary-600 text-white py-3 rounded-lg hover:bg-primary-700 transition-colors font-medium"
          >
            Try Different Email
          </button>
          <Link
            to="/login"
            className="block w-full border border-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-50 transition-colors font-medium"
          >
            Back to Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center mb-4">
          <div className="w-12 h-12 bg-primary-600 rounded-xl flex items-center justify-center">
            <SafeIcon icon={FiIcons.FiLock} className="w-6 h-6 text-white" />
          </div>
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Forgot Password?</h2>
        <p className="text-gray-600">
          No worries! Enter your email and we'll send you a reset link.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email Address
          </label>
          <div className="relative">
            <SafeIcon 
              icon={FiIcons.FiMail} 
              className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" 
            />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="Enter your email address"
              required
            />
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          disabled={isLoading}
          className="w-full bg-primary-600 text-white py-3 rounded-lg hover:bg-primary-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <div className="flex items-center justify-center">
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
              Sending reset link...
            </div>
          ) : (
            'Send Reset Link'
          )}
        </motion.button>
      </form>

      <div className="mt-6 text-center">
        <Link 
          to="/login" 
          className="text-primary-600 hover:text-primary-700 font-medium flex items-center justify-center"
        >
          <SafeIcon icon={FiIcons.FiArrowLeft} className="w-4 h-4 mr-2" />
          Back to Login
        </Link>
      </div>
    </div>
  );
};

export default ForgotPassword;