import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';
import { useAuthStore } from '../../stores/authStore';

const Sidebar = ({ userRole, onClose }) => {
  const { logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const menuItems = {
    patient: [
      { icon: FiIcons.FiHome, label: 'Dashboard', path: '/patient/dashboard' },
      { icon: FiIcons.FiCalendar, label: 'Book Appointment', path: '/patient/book-appointment' },
      { icon: FiIcons.FiClock, label: 'My Appointments', path: '/patient/appointments' },
      { icon: FiIcons.FiFileText, label: 'Prescriptions', path: '/patient/prescriptions' },
      { icon: FiIcons.FiFolder, label: 'Medical Records', path: '/patient/records' },
      { icon: FiIcons.FiUser, label: 'Profile', path: '/patient/profile' }
    ],
    doctor: [
      { icon: FiIcons.FiHome, label: 'Dashboard', path: '/doctor/dashboard' },
      { icon: FiIcons.FiCalendar, label: 'Schedule', path: '/doctor/schedule' },
      { icon: FiIcons.FiClock, label: 'Appointments', path: '/doctor/appointments' },
      { icon: FiIcons.FiUsers, label: 'Patients', path: '/doctor/patients' },
      { icon: FiIcons.FiFileText, label: 'Prescriptions', path: '/doctor/prescriptions' },
      { icon: FiIcons.FiDollarSign, label: 'Earnings', path: '/doctor/earnings' },
      { icon: FiIcons.FiUser, label: 'Profile', path: '/doctor/profile' }
    ],
    admin: [
      { icon: FiIcons.FiHome, label: 'Dashboard', path: '/admin/dashboard' },
      { icon: FiIcons.FiUsers, label: 'Users', path: '/admin/users' },
      { icon: FiIcons.FiCalendar, label: 'Appointments', path: '/admin/appointments' },
      { icon: FiIcons.FiCreditCard, label: 'Payments', path: '/admin/payments' },
      { icon: FiIcons.FiBarChart3, label: 'Analytics', path: '/admin/analytics' },
      { icon: FiIcons.FiHelpCircle, label: 'Support', path: '/admin/support' },
      { icon: FiIcons.FiSettings, label: 'Settings', path: '/admin/settings' }
    ]
  };

  return (
    <motion.div
      initial={{ x: -300 }}
      animate={{ x: 0 }}
      className="flex flex-col h-full bg-white shadow-lg"
    >
      {/* Logo */}
      <div className="flex items-center justify-between p-6 border-b">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
            <SafeIcon icon={FiIcons.FiActivity} className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold text-gray-900">TeleMed Pro</span>
        </div>
        <button
          onClick={onClose}
          className="lg:hidden p-1 rounded-md hover:bg-gray-100"
        >
          <SafeIcon icon={FiIcons.FiX} className="w-5 h-5" />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        {menuItems[userRole]?.map((item, index) => (
          <NavLink
            key={index}
            to={item.path}
            onClick={onClose}
            className={({ isActive }) =>
              `flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                isActive
                  ? 'bg-primary-50 text-primary-600 border-r-2 border-primary-600'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`
            }
          >
            <SafeIcon icon={item.icon} className="w-5 h-5" />
            <span className="font-medium">{item.label}</span>
          </NavLink>
        ))}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t">
        <button
          onClick={handleLogout}
          className="flex items-center space-x-3 w-full px-4 py-3 text-left text-red-600 hover:bg-red-50 rounded-lg transition-colors"
        >
          <SafeIcon icon={FiIcons.FiLogOut} className="w-5 h-5" />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </motion.div>
  );
};

export default Sidebar;