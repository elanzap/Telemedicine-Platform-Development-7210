import { create } from 'zustand';

export const useNotificationStore = create((set, get) => ({
  notifications: [
    {
      id: '1',
      type: 'appointment',
      title: 'Upcoming Appointment',
      message: 'You have an appointment with Dr. Sarah Johnson in 30 minutes',
      timestamp: new Date(Date.now() - 5 * 60 * 1000),
      read: false,
      priority: 'high'
    },
    {
      id: '2',
      type: 'prescription',
      title: 'Prescription Ready',
      message: 'Your prescription for Lisinopril is ready for download',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      read: false,
      priority: 'medium'
    },
    {
      id: '3',
      type: 'system',
      title: 'System Maintenance',
      message: 'Scheduled maintenance tonight from 2-4 AM EST',
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
      read: true,
      priority: 'low'
    }
  ],

  addNotification: (notification) => {
    const newNotification = {
      id: Date.now().toString(),
      timestamp: new Date(),
      read: false,
      priority: 'medium',
      ...notification
    };
    set(state => ({
      notifications: [newNotification, ...state.notifications]
    }));
  },

  markAsRead: (notificationId) => {
    set(state => ({
      notifications: state.notifications.map(notification =>
        notification.id === notificationId
          ? { ...notification, read: true }
          : notification
      )
    }));
  },

  markAllAsRead: () => {
    set(state => ({
      notifications: state.notifications.map(notification => ({
        ...notification,
        read: true
      }))
    }));
  },

  deleteNotification: (notificationId) => {
    set(state => ({
      notifications: state.notifications.filter(n => n.id !== notificationId)
    }));
  },

  getUnreadCount: () => {
    const { notifications } = get();
    return notifications.filter(n => !n.read).length;
  }
}));