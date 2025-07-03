import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';
import { useAuthStore } from '../../stores/authStore';
import { useNotificationStore } from '../../stores/notificationStore';

const Header = ({ userRole, onMenuClick }) => {
  const { user } = useAuthStore();
  const { getUnreadCount } = useNotificationStore();
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);

  const unreadCount = getUnreadCount();

  const getRoleTitle = (role) => {
    const titles = {
      patient: 'Patient Portal',
      doctor: 'Doctor Portal',
      admin: 'Admin Dashboard'
    };
    return titles[role] || 'Dashboard';
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="flex items-center justify-between px-6 py-4">
        {/* Left side */}
        <div className="flex items-center space-x-4">
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 rounded-md hover:bg-gray-100"
          >
            <SafeIcon icon={FiIcons.FiMenu} className="w-5 h-5" />
          </button>
          <h1 className="text-xl font-semibold text-gray-900">
            {getRoleTitle(userRole)}
          </h1>
        </div>

        {/* Right side */}
        <div className="flex items-center space-x-4">
          {/* Search */}
          <div className="hidden md:block relative">
            <SafeIcon 
              icon={FiIcons.FiSearch} 
              className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" 
            />
            <input
              type="text"
              placeholder="Search..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>

          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => setNotificationOpen(!notificationOpen)}
              className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <SafeIcon icon={FiIcons.FiBell} className="w-5 h-5 text-gray-600" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                  {unreadCount > 9 ? '9+' : unreadCount}
                </span>
              )}
            </button>
          </div>

          {/* Profile Menu */}
          <div className="relative">
            <button
              onClick={() => setProfileMenuOpen(!profileMenuOpen)}
              className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <img
                src={user?.avatar}
                alt={user?.name}
                className="w-8 h-8 rounded-full object-cover"
              />
              <div className="hidden md:block text-left">
                <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                <p className="text-xs text-gray-500 capitalize">{user?.role}</p>
              </div>
              <SafeIcon icon={FiIcons.FiChevronDown} className="w-4 h-4 text-gray-400" />
            </button>

            {/* Profile Dropdown */}
            <AnimatePresence>
              {profileMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50"
                >
                  <a
                    href={`/${userRole}/profile`}
                    className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                  >
                    <SafeIcon icon={FiIcons.FiUser} className="w-4 h-4" />
                    <span>Profile</span>
                  </a>
                  <a
                    href="#"
                    className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                  >
                    <SafeIcon icon={FiIcons.FiSettings} className="w-4 h-4" />
                    <span>Settings</span>
                  </a>
                  <div className="border-t border-gray-200 my-1"></div>
                  <button
                    onClick={() => {
                      useAuthStore.getState().logout();
                      window.location.href = '/';
                    }}
                    className="flex items-center space-x-2 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                  >
                    <SafeIcon icon={FiIcons.FiLogOut} className="w-4 h-4" />
                    <span>Logout</span>
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;