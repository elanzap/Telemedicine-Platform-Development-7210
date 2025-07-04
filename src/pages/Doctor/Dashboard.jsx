import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';
import { useAuthStore } from '../../stores/authStore';
import { useAppointmentStore } from '../../stores/appointmentStore';
import { format, isToday } from 'date-fns';
import toast from 'react-hot-toast';

const DoctorDashboard = () => {
  const { user } = useAuthStore();
  const { getAppointmentsByUser, updateAppointment } = useAppointmentStore();
  const navigate = useNavigate();
  
  // Modal states
  const [showNotesModal, setShowNotesModal] = useState(false);
  const [showAddTaskModal, setShowAddTaskModal] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  
  // Notes form state
  const [appointmentNotes, setAppointmentNotes] = useState('');
  
  // Tasks state management
  const [tasks, setTasks] = useState([
    {
      id: '1',
      task: 'Review lab results for John Doe',
      priority: 'high',
      due: 'Today, 3:00 PM',
      completed: false,
      createdAt: new Date()
    },
    {
      id: '2',
      task: 'Complete patient notes',
      priority: 'medium',
      due: 'Tomorrow',
      completed: false,
      createdAt: new Date()
    },
    {
      id: '3',
      task: 'Update availability schedule',
      priority: 'low',
      due: 'This week',
      completed: false,
      createdAt: new Date()
    },
    {
      id: '4',
      task: 'Prepare for medical conference',
      priority: 'medium',
      due: 'Next week',
      completed: false,
      createdAt: new Date()
    }
  ]);
  
  // New task form state
  const [newTask, setNewTask] = useState({
    task: '',
    priority: 'medium',
    due: '',
    description: ''
  });

  const appointments = getAppointmentsByUser(user?.id, 'doctor');
  const todayAppointments = appointments.filter(apt =>
    isToday(new Date(apt.date)) && apt.status === 'confirmed'
  );

  const stats = [
    {
      icon: FiIcons.FiCalendar,
      label: "Today's Appointments",
      value: todayAppointments.length,
      color: 'bg-blue-500'
    },
    {
      icon: FiIcons.FiUsers,
      label: 'Total Patients',
      value: '1,250',
      color: 'bg-green-500'
    },
    {
      icon: FiIcons.FiTrendingUp,
      label: 'This Month Revenue',
      value: '$12,450',
      color: 'bg-purple-500'
    },
    {
      icon: FiIcons.FiStar,
      label: 'Average Rating',
      value: '4.9',
      color: 'bg-yellow-500'
    }
  ];

  // Quick Actions handlers
  const handleViewSchedule = () => {
    navigate('/doctor/schedule');
    toast.success('Opening your schedule');
  };

  const handleWritePrescription = () => {
    navigate('/doctor/prescriptions');
    toast.success('Opening prescription management');
  };

  const handlePatientRecords = () => {
    navigate('/doctor/patients');
    toast.success('Opening patient records');
  };

  const handleViewAnalytics = () => {
    navigate('/doctor/earnings');
    toast.success('Opening analytics dashboard');
  };

  const handleStartConsultation = (appointment) => {
    if (appointment.meetingLink) {
      window.open(appointment.meetingLink, '_blank');
      toast.success('Starting consultation');
    } else {
      toast.error('Meeting link not available');
    }
  };

  // Notes functionality
  const handleWriteNotes = (appointment) => {
    setSelectedAppointment(appointment);
    setAppointmentNotes('');
    setShowNotesModal(true);
  };

  const handleSaveNotes = async (e) => {
    e.preventDefault();
    if (!appointmentNotes.trim()) {
      toast.error('Please enter some notes');
      return;
    }

    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Update appointment with notes
      const result = await updateAppointment(selectedAppointment.id, {
        notes: appointmentNotes,
        lastUpdated: new Date()
      });

      if (result.success) {
        toast.success('Notes saved successfully');
        setShowNotesModal(false);
        setSelectedAppointment(null);
        setAppointmentNotes('');
      } else {
        toast.error('Failed to save notes');
      }
    } catch (error) {
      toast.error('Failed to save notes');
    } finally {
      setIsLoading(false);
    }
  };

  // Task management functionality
  const handleAddTask = () => {
    setNewTask({
      task: '',
      priority: 'medium',
      due: '',
      description: ''
    });
    setShowAddTaskModal(true);
  };

  const handleSaveTask = async (e) => {
    e.preventDefault();
    if (!newTask.task.trim()) {
      toast.error('Please enter a task description');
      return;
    }

    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      const taskData = {
        id: Date.now().toString(),
        task: newTask.task,
        priority: newTask.priority,
        due: newTask.due || 'No due date',
        description: newTask.description,
        completed: false,
        createdAt: new Date()
      };

      setTasks(prev => [taskData, ...prev]);
      toast.success('Task added successfully');
      setShowAddTaskModal(false);
    } catch (error) {
      toast.error('Failed to add task');
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleTask = (taskId) => {
    setTasks(prev => prev.map(task =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
    toast.success('Task updated');
  };

  const Modal = ({ isOpen, onClose, title, children, size = 'max-w-md' }) => (
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
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-xl p-6 text-white"
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-2">Good morning, {user?.name}!</h1>
            <p className="text-primary-100">
              You have {todayAppointments.length} appointment{todayAppointments.length !== 1 ? 's' : ''} scheduled for today.
            </p>
          </div>
          <div className="hidden md:block">
            <div className="w-24 h-24 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
              <SafeIcon icon={FiIcons.FiActivity} className="w-12 h-12" />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white p-6 rounded-xl shadow-soft"
          >
            <div className="flex items-center">
              <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center mr-4`}>
                <SafeIcon icon={stat.icon} className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-sm text-gray-600">{stat.label}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Today's Appointments */}
        <div className="lg:col-span-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-xl shadow-soft p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Today's Schedule</h2>
              <Link
                to="/doctor/schedule"
                className="text-primary-600 hover:text-primary-700 text-sm font-medium"
              >
                View Full Schedule
              </Link>
            </div>

            {todayAppointments.length > 0 ? (
              <div className="space-y-4">
                {todayAppointments.map((appointment) => (
                  <div
                    key={appointment.id}
                    className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center space-x-3">
                      <img
                        src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face"
                        alt={appointment.patientName}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div>
                        <h3 className="font-medium text-gray-900">{appointment.patientName}</h3>
                        <p className="text-sm text-gray-600">{appointment.time} - {appointment.symptoms}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                        {appointment.type}
                      </span>
                      <button
                        onClick={() => handleStartConsultation(appointment)}
                        className="flex items-center space-x-1 px-3 py-1 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors text-sm"
                      >
                        <SafeIcon icon={FiIcons.FiVideo} className="w-4 h-4" />
                        <span>Start</span>
                      </button>
                      <button
                        onClick={() => handleWriteNotes(appointment)}
                        className="flex items-center space-x-1 px-3 py-1 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm"
                      >
                        <SafeIcon icon={FiIcons.FiFileText} className="w-4 h-4" />
                        <span>Notes</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <SafeIcon icon={FiIcons.FiCalendar} className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500">No appointments scheduled for today</p>
                <Link
                  to="/doctor/schedule"
                  className="inline-flex items-center mt-3 text-primary-600 hover:text-primary-700 font-medium"
                >
                  <SafeIcon icon={FiIcons.FiPlus} className="w-4 h-4 mr-1" />
                  View Schedule
                </Link>
              </div>
            )}
          </motion.div>
        </div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-xl shadow-soft p-6"
        >
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Quick Actions</h2>
          <div className="space-y-3">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleViewSchedule}
              className="w-full flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-primary-50 hover:border-primary-300 transition-all group"
            >
              <SafeIcon icon={FiIcons.FiCalendar} className="w-5 h-5 text-primary-600 group-hover:scale-110 transition-transform" />
              <span className="text-gray-700 group-hover:text-primary-700 font-medium">View Schedule</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleWritePrescription}
              className="w-full flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-primary-50 hover:border-primary-300 transition-all group"
            >
              <SafeIcon icon={FiIcons.FiFileText} className="w-5 h-5 text-primary-600 group-hover:scale-110 transition-transform" />
              <span className="text-gray-700 group-hover:text-primary-700 font-medium">Write Prescription</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handlePatientRecords}
              className="w-full flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-primary-50 hover:border-primary-300 transition-all group"
            >
              <SafeIcon icon={FiIcons.FiUsers} className="w-5 h-5 text-primary-600 group-hover:scale-110 transition-transform" />
              <span className="text-gray-700 group-hover:text-primary-700 font-medium">Patient Records</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleViewAnalytics}
              className="w-full flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-primary-50 hover:border-primary-300 transition-all group"
            >
              <SafeIcon icon={FiIcons.FiBarChart3} className="w-5 h-5 text-primary-600 group-hover:scale-110 transition-transform" />
              <span className="text-gray-700 group-hover:text-primary-700 font-medium">View Analytics</span>
            </motion.button>
          </div>

          {/* Additional Quick Stats */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <h3 className="text-sm font-medium text-gray-900 mb-3">Today's Overview</h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Next Appointment</span>
                <span className="font-medium text-gray-900">
                  {todayAppointments.length > 0 ? todayAppointments[0].time : 'None'}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Pending Reviews</span>
                <span className="font-medium text-gray-900">3</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Messages</span>
                <span className="font-medium text-primary-600">2 new</span>
              </div>
            </div>
          </div>

          {/* Emergency Contact */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="bg-red-50 border border-red-200 rounded-lg p-3">
              <div className="flex items-center space-x-2">
                <SafeIcon icon={FiIcons.FiAlertCircle} className="w-4 h-4 text-red-600" />
                <span className="text-sm font-medium text-red-800">Emergency Support</span>
              </div>
              <p className="text-xs text-red-700 mt-1">
                For urgent technical issues during consultations
              </p>
              <button className="mt-2 text-xs bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition-colors">
                Contact Support
              </button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Recent Activity & Upcoming Tasks */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white rounded-xl shadow-soft p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Recent Activity</h2>
            <Link
              to="/doctor/appointments"
              className="text-primary-600 hover:text-primary-700 text-sm font-medium"
            >
              View All
            </Link>
          </div>
          <div className="space-y-4">
            {[
              {
                action: 'Completed consultation',
                patient: 'John Doe',
                time: '2 hours ago',
                icon: FiIcons.FiCheck,
                color: 'text-green-600'
              },
              {
                action: 'Prescription sent',
                patient: 'Jane Smith',
                time: '4 hours ago',
                icon: FiIcons.FiFileText,
                color: 'text-blue-600'
              },
              {
                action: 'New appointment booked',
                patient: 'Mike Johnson',
                time: '6 hours ago',
                icon: FiIcons.FiCalendar,
                color: 'text-purple-600'
              },
              {
                action: 'Patient message received',
                patient: 'Sarah Wilson',
                time: '1 day ago',
                icon: FiIcons.FiMail,
                color: 'text-orange-600'
              }
            ].map((activity, index) => (
              <div
                key={index}
                className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <SafeIcon icon={activity.icon} className={`w-5 h-5 ${activity.color}`} />
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{activity.action}</p>
                  <p className="text-sm text-gray-600">{activity.patient}</p>
                </div>
                <span className="text-sm text-gray-500">{activity.time}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Upcoming Tasks */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="bg-white rounded-xl shadow-soft p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Upcoming Tasks</h2>
            <button
              onClick={handleAddTask}
              className="text-primary-600 hover:text-primary-700 text-sm font-medium"
            >
              Add Task
            </button>
          </div>
          <div className="space-y-4">
            {tasks.slice(0, 4).map((task) => (
              <div
                key={task.id}
                className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg"
              >
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => handleToggleTask(task.id)}
                  className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                />
                <div className="flex-1">
                  <p className={`font-medium ${task.completed ? 'line-through text-gray-500' : 'text-gray-900'}`}>
                    {task.task}
                  </p>
                  <p className="text-sm text-gray-600">{task.due}</p>
                </div>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${
                    task.priority === 'high'
                      ? 'bg-red-100 text-red-800'
                      : task.priority === 'medium'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-blue-100 text-blue-800'
                  }`}
                >
                  {task.priority}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Write Notes Modal */}
      <Modal
        isOpen={showNotesModal}
        onClose={() => {
          setShowNotesModal(false);
          setSelectedAppointment(null);
        }}
        title={`Write Notes - ${selectedAppointment?.patientName}`}
        size="max-w-2xl"
      >
        <form onSubmit={handleSaveNotes} className="space-y-4">
          <div className="bg-gray-50 rounded-lg p-4 mb-4">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-600">Patient:</span>
                <p className="font-medium">{selectedAppointment?.patientName}</p>
              </div>
              <div>
                <span className="text-gray-600">Date & Time:</span>
                <p className="font-medium">{selectedAppointment?.time}</p>
              </div>
              <div>
                <span className="text-gray-600">Type:</span>
                <p className="font-medium capitalize">{selectedAppointment?.type}</p>
              </div>
              <div>
                <span className="text-gray-600">Symptoms:</span>
                <p className="font-medium">{selectedAppointment?.symptoms}</p>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Consultation Notes *
            </label>
            <textarea
              value={appointmentNotes}
              onChange={(e) => setAppointmentNotes(e.target.value)}
              rows={6}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="Enter your consultation notes, diagnosis, treatment plan, and recommendations..."
              required
            />
          </div>

          <div className="flex space-x-3 pt-4">
            <button
              type="button"
              onClick={() => {
                setShowNotesModal(false);
                setSelectedAppointment(null);
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
                  Saving...
                </div>
              ) : (
                'Save Notes'
              )}
            </button>
          </div>
        </form>
      </Modal>

      {/* Add Task Modal */}
      <Modal
        isOpen={showAddTaskModal}
        onClose={() => setShowAddTaskModal(false)}
        title="Add New Task"
        size="max-w-lg"
      >
        <form onSubmit={handleSaveTask} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Task Description *
            </label>
            <input
              type="text"
              value={newTask.task}
              onChange={(e) => setNewTask({ ...newTask, task: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="Enter task description"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Priority
              </label>
              <select
                value={newTask.priority}
                onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Due Date
              </label>
              <input
                type="date"
                value={newTask.due}
                onChange={(e) => setNewTask({ ...newTask, due: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Additional Details
            </label>
            <textarea
              value={newTask.description}
              onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
              rows={3}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="Optional additional details about this task"
            />
          </div>

          <div className="flex space-x-3 pt-4">
            <button
              type="button"
              onClick={() => setShowAddTaskModal(false)}
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
                  Adding...
                </div>
              ) : (
                'Add Task'
              )}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default DoctorDashboard;