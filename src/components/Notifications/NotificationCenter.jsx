import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';
import { useNotificationStore } from '../../stores/notificationStore';
import { formatDistanceToNow } from 'date-fns';

const NotificationCenter = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { notifications, markAsRead, markAllAsRead, deleteNotification, getUnreadCount } = useNotificationStore();
  const unreadCount = getUnreadCount();

  const getNotificationIcon = (type) => {
    const icons = {
      appointment: FiIcons.FiCalendar,
      prescription: FiIcons.FiFileText,
      system: FiIcons.FiSettings,
      payment: FiIcons.FiCreditCard,
      reminder: FiIcons.FiBell
    };
    return icons[type] || FiIcons.FiBell;
  };

  const getPriorityColor = (priority) => {
    const colors = {
      high: 'bg-red-100 text-red-800 border-red-200',
      medium: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      low: 'bg-blue-100 text-blue-800 border-blue-200'
    };
    return colors[priority] || colors.medium;
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Notification Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="relative bg-primary-600 text-white p-4 rounded-full shadow-lg hover:bg-primary-700 transition-colors"
      >
        <SafeIcon icon={FiIcons.FiBell} className="w-6 h-6" />
        {unreadCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-6 h-6 rounded-full flex items-center justify-center font-medium">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </motion.button>

      {/* Notification Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="absolute bottom-16 right-0 w-96 bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden"
          >
            {/* Header */}
            <div className="p-4 border-b border-gray-200 bg-gray-50">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-gray-900">Notifications</h3>
                <div className="flex items-center space-x-2">
                  {unreadCount > 0 && (
                    <button
                      onClick={markAllAsRead}
                      className="text-sm text-primary-600 hover:text-primary-700 font-medium"
                    >
                      Mark all read
                    </button>
                  )}
                  <button
                    onClick={() => setIsOpen(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <SafeIcon icon={FiIcons.FiX} className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Notifications List */}
            <div className="max-h-96 overflow-y-auto">
              {notifications.length > 0 ? (
                <div className="divide-y divide-gray-100">
                  {notifications.map((notification) => (
                    <motion.div
                      key={notification.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className={`p-4 hover:bg-gray-50 transition-colors ${
                        !notification.read ? 'bg-blue-50' : ''
                      }`}
                    >
                      <div className="flex items-start space-x-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${getPriorityColor(notification.priority)}`}>
                          <SafeIcon 
                            icon={getNotificationIcon(notification.type)} 
                            className="w-4 h-4" 
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <p className={`text-sm font-medium ${!notification.read ? 'text-gray-900' : 'text-gray-700'}`}>
                                {notification.title}
                              </p>
                              <p className="text-sm text-gray-600 mt-1">
                                {notification.message}
                              </p>
                              <p className="text-xs text-gray-400 mt-2">
                                {formatDistanceToNow(notification.timestamp, { addSuffix: true })}
                              </p>
                            </div>
                            <div className="flex items-center space-x-1 ml-2">
                              {!notification.read && (
                                <button
                                  onClick={() => markAsRead(notification.id)}
                                  className="text-primary-600 hover:text-primary-700"
                                  title="Mark as read"
                                >
                                  <SafeIcon icon={FiIcons.FiCheck} className="w-4 h-4" />
                                </button>
                              )}
                              <button
                                onClick={() => deleteNotification(notification.id)}
                                className="text-gray-400 hover:text-red-600"
                                title="Delete notification"
                              >
                                <SafeIcon icon={FiIcons.FiTrash2} className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="p-8 text-center">
                  <SafeIcon icon={FiIcons.FiBell} className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-500">No notifications</p>
                </div>
              )}
            </div>

            {/* Footer */}
            {notifications.length > 0 && (
              <div className="p-3 border-t border-gray-200 bg-gray-50">
                <button className="w-full text-center text-sm text-primary-600 hover:text-primary-700 font-medium">
                  View All Notifications
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NotificationCenter;