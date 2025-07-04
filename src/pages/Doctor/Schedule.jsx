import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';
import { format, startOfWeek, addDays, isSameDay, isToday } from 'date-fns';
import toast from 'react-hot-toast';

const DoctorSchedule = () => {
  const [currentWeek, setCurrentWeek] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showAvailabilityModal, setShowAvailabilityModal] = useState(false);
  const [showBlockTimeModal, setShowBlockTimeModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Mock availability data
  const [availability, setAvailability] = useState({
    monday: { enabled: true, start: '09:00', end: '17:00' },
    tuesday: { enabled: true, start: '09:00', end: '17:00' },
    wednesday: { enabled: true, start: '09:00', end: '17:00' },
    thursday: { enabled: true, start: '09:00', end: '17:00' },
    friday: { enabled: true, start: '09:00', end: '17:00' },
    saturday: { enabled: false, start: '10:00', end: '14:00' },
    sunday: { enabled: false, start: '10:00', end: '14:00' }
  });

  // Mock block time data
  const [blockedTimes, setBlockedTimes] = useState([]);

  // Mock appointments data
  const [appointments, setAppointments] = useState([
    {
      id: '1',
      patientName: 'John Doe',
      time: '09:00 AM',
      duration: 30,
      type: 'video',
      status: 'confirmed',
      symptoms: 'Chest pain',
      date: new Date(),
      meetingLink: 'https://meet.google.com/abc-defg-hij'
    },
    {
      id: '2',
      patientName: 'Jane Smith',
      time: '10:30 AM',
      duration: 30,
      type: 'phone',
      status: 'confirmed',
      symptoms: 'Follow-up',
      date: new Date(),
      phone: '+1 (555) 123-4567'
    },
    {
      id: '3',
      patientName: 'Mike Johnson',
      time: '02:00 PM',
      duration: 30,
      type: 'video',
      status: 'pending',
      symptoms: 'Skin rash',
      date: addDays(new Date(), 1),
      meetingLink: 'https://meet.google.com/xyz-uvwx-rst'
    }
  ]);

  const weekStart = startOfWeek(currentWeek);
  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));

  const getAppointmentsForDate = (date) => {
    return appointments.filter(apt => isSameDay(new Date(apt.date), date));
  };

  const getStatusColor = (status) => {
    const colors = {
      confirmed: 'bg-green-100 text-green-800',
      pending: 'bg-yellow-100 text-yellow-800',
      completed: 'bg-blue-100 text-blue-800',
      cancelled: 'bg-red-100 text-red-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  // Handler functions
  const handleSetAvailability = () => {
    setShowAvailabilityModal(true);
  };

  const handleBlockTime = () => {
    setShowBlockTimeModal(true);
  };

  const handleEditAppointment = (appointment) => {
    setSelectedAppointment(appointment);
    setShowEditModal(true);
  };

  const handleStartVideoCall = (appointment) => {
    if (appointment.type === 'video' && appointment.meetingLink) {
      window.open(appointment.meetingLink, '_blank');
      toast.success('Starting video consultation...');
    } else if (appointment.type === 'phone') {
      if (appointment.phone) {
        window.open(`tel:${appointment.phone}`, '_self');
        toast.success('Initiating phone call...');
      } else {
        toast.error('Phone number not available');
      }
    } else {
      toast.error('Meeting link not available');
    }
  };

  const handleSaveAvailability = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success('Availability updated successfully!');
      setShowAvailabilityModal(false);
    } catch (error) {
      toast.error('Failed to update availability');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveBlockTime = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      const formData = new FormData(e.target);
      const newBlock = {
        id: Date.now().toString(),
        date: formData.get('date'),
        startTime: formData.get('startTime'),
        endTime: formData.get('endTime'),
        reason: formData.get('reason')
      };
      setBlockedTimes(prev => [...prev, newBlock]);
      toast.success('Time blocked successfully!');
      setShowBlockTimeModal(false);
    } catch (error) {
      toast.error('Failed to block time');
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateAppointment = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      const formData = new FormData(e.target);
      const updatedAppointment = {
        ...selectedAppointment,
        time: formData.get('time'),
        status: formData.get('status'),
        notes: formData.get('notes')
      };
      
      setAppointments(prev => 
        prev.map(apt => apt.id === selectedAppointment.id ? updatedAppointment : apt)
      );
      
      toast.success('Appointment updated successfully!');
      setShowEditModal(false);
      setSelectedAppointment(null);
    } catch (error) {
      toast.error('Failed to update appointment');
    } finally {
      setIsLoading(false);
    }
  };

  const Modal = ({ isOpen, onClose, title, children }) => (
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
            className="bg-white rounded-xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto"
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
      {/* Header */}
      <div className="bg-white rounded-xl shadow-soft p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Schedule</h1>
            <p className="text-gray-600 mt-1">Manage your appointments and availability</p>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={handleSetAvailability}
              className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <SafeIcon icon={FiIcons.FiSettings} className="w-4 h-4" />
              <span>Set Availability</span>
            </button>
            <button
              onClick={handleBlockTime}
              className="flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
            >
              <SafeIcon icon={FiIcons.FiPlus} className="w-4 h-4" />
              <span>Block Time</span>
            </button>
          </div>
        </div>

        {/* Week Navigation */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setCurrentWeek(addDays(currentWeek, -7))}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <SafeIcon icon={FiIcons.FiChevronLeft} className="w-5 h-5" />
            </button>
            <h2 className="text-lg font-semibold text-gray-900">
              {format(weekStart, 'MMM dd')} - {format(addDays(weekStart, 6), 'MMM dd, yyyy')}
            </h2>
            <button
              onClick={() => setCurrentWeek(addDays(currentWeek, 7))}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <SafeIcon icon={FiIcons.FiChevronRight} className="w-5 h-5" />
            </button>
          </div>
          <button
            onClick={() => setCurrentWeek(new Date())}
            className="px-4 py-2 text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
          >
            Today
          </button>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-4">
        {weekDays.map((day, index) => {
          const dayAppointments = getAppointmentsForDate(day);
          const isSelected = isSameDay(day, selectedDate);
          const isDayToday = isToday(day);

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => setSelectedDate(day)}
              className={`bg-white rounded-xl shadow-soft p-4 cursor-pointer transition-all ${
                isSelected ? 'ring-2 ring-primary-500' : ''
              }`}
            >
              <div className="text-center mb-4">
                <p className="text-sm font-medium text-gray-600">
                  {format(day, 'EEE')}
                </p>
                <p className={`text-2xl font-bold ${
                  isDayToday ? 'text-primary-600' : 'text-gray-900'
                }`}>
                  {format(day, 'dd')}
                </p>
                {isDayToday && (
                  <p className="text-xs text-primary-600 font-medium">Today</p>
                )}
              </div>

              <div className="space-y-2">
                {dayAppointments.map((appointment) => (
                  <div key={appointment.id} className="p-2 bg-gray-50 rounded-lg text-xs">
                    <div className="font-medium text-gray-900 truncate">
                      {appointment.time}
                    </div>
                    <div className="text-gray-600 truncate">
                      {appointment.patientName}
                    </div>
                    <div className="flex items-center justify-between mt-1">
                      <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(appointment.status)}`}>
                        {appointment.status}
                      </span>
                      <SafeIcon
                        icon={appointment.type === 'video' ? FiIcons.FiVideo : FiIcons.FiPhone}
                        className="w-3 h-3 text-gray-400"
                      />
                    </div>
                  </div>
                ))}
                {dayAppointments.length === 0 && (
                  <div className="text-center py-4 text-gray-400 text-xs">
                    No appointments
                  </div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Selected Day Details */}
      <div className="bg-white rounded-xl shadow-soft p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">
            {format(selectedDate, 'EEEE, MMMM dd, yyyy')}
          </h3>
          <span className="text-sm text-gray-600">
            {getAppointmentsForDate(selectedDate).length} appointment(s)
          </span>
        </div>

        <div className="space-y-4">
          {getAppointmentsForDate(selectedDate).map((appointment) => (
            <div
              key={appointment.id}
              className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                  <SafeIcon
                    icon={appointment.type === 'video' ? FiIcons.FiVideo : FiIcons.FiPhone}
                    className="w-5 h-5 text-primary-600"
                  />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">{appointment.patientName}</h4>
                  <p className="text-sm text-gray-600">{appointment.symptoms}</p>
                  <p className="text-sm text-gray-500">
                    {appointment.time} ({appointment.duration} min)
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(appointment.status)}`}>
                  {appointment.status}
                </span>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleEditAppointment(appointment)}
                    className="p-2 text-gray-400 hover:text-primary-600 transition-colors"
                    title="Edit Appointment"
                  >
                    <SafeIcon icon={FiIcons.FiEdit} className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleStartVideoCall(appointment)}
                    className="p-2 text-gray-400 hover:text-green-600 transition-colors"
                    title={appointment.type === 'video' ? 'Start Video Call' : 'Start Phone Call'}
                  >
                    <SafeIcon 
                      icon={appointment.type === 'video' ? FiIcons.FiVideo : FiIcons.FiPhone} 
                      className="w-4 h-4" 
                    />
                  </button>
                  <button
                    className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                    title="Cancel Appointment"
                  >
                    <SafeIcon icon={FiIcons.FiX} className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}

          {getAppointmentsForDate(selectedDate).length === 0 && (
            <div className="text-center py-8">
              <SafeIcon icon={FiIcons.FiCalendar} className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500">No appointments scheduled for this day</p>
            </div>
          )}
        </div>
      </div>

      {/* Set Availability Modal */}
      <Modal
        isOpen={showAvailabilityModal}
        onClose={() => setShowAvailabilityModal(false)}
        title="Set Weekly Availability"
      >
        <form onSubmit={handleSaveAvailability} className="space-y-4">
          {Object.entries(availability).map(([day, settings]) => (
            <div key={day} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={settings.enabled}
                  onChange={(e) => setAvailability(prev => ({
                    ...prev,
                    [day]: { ...prev[day], enabled: e.target.checked }
                  }))}
                  className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                />
                <span className="font-medium text-gray-900 capitalize">{day}</span>
              </div>
              {settings.enabled && (
                <div className="flex items-center space-x-2">
                  <input
                    type="time"
                    value={settings.start}
                    onChange={(e) => setAvailability(prev => ({
                      ...prev,
                      [day]: { ...prev[day], start: e.target.value }
                    }))}
                    className="px-2 py-1 border border-gray-300 rounded text-sm"
                  />
                  <span className="text-gray-500">to</span>
                  <input
                    type="time"
                    value={settings.end}
                    onChange={(e) => setAvailability(prev => ({
                      ...prev,
                      [day]: { ...prev[day], end: e.target.value }
                    }))}
                    className="px-2 py-1 border border-gray-300 rounded text-sm"
                  />
                </div>
              )}
            </div>
          ))}
          <div className="flex space-x-3 pt-4">
            <button
              type="button"
              onClick={() => setShowAvailabilityModal(false)}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-50"
            >
              {isLoading ? 'Saving...' : 'Save Availability'}
            </button>
          </div>
        </form>
      </Modal>

      {/* Block Time Modal */}
      <Modal
        isOpen={showBlockTimeModal}
        onClose={() => setShowBlockTimeModal(false)}
        title="Block Time"
      >
        <form onSubmit={handleSaveBlockTime} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
            <input
              type="date"
              name="date"
              min={new Date().toISOString().split('T')[0]}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Start Time</label>
              <input
                type="time"
                name="startTime"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">End Time</label>
              <input
                type="time"
                name="endTime"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                required
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Reason</label>
            <select
              name="reason"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              required
            >
              <option value="">Select reason</option>
              <option value="personal">Personal Time</option>
              <option value="break">Break</option>
              <option value="meeting">Meeting</option>
              <option value="surgery">Surgery</option>
              <option value="emergency">Emergency</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div className="flex space-x-3 pt-4">
            <button
              type="button"
              onClick={() => setShowBlockTimeModal(false)}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-50"
            >
              {isLoading ? 'Blocking...' : 'Block Time'}
            </button>
          </div>
        </form>
      </Modal>

      {/* Edit Appointment Modal */}
      <Modal
        isOpen={showEditModal}
        onClose={() => {
          setShowEditModal(false);
          setSelectedAppointment(null);
        }}
        title="Edit Appointment"
      >
        {selectedAppointment && (
          <form onSubmit={handleUpdateAppointment} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Patient</label>
              <input
                type="text"
                value={selectedAppointment.patientName}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50"
                disabled
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
              <input
                type="time"
                name="time"
                defaultValue={selectedAppointment.time.replace(' AM', '').replace(' PM', '')}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <select
                name="status"
                defaultValue={selectedAppointment.status}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                required
              >
                <option value="pending">Pending</option>
                <option value="confirmed">Confirmed</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
              <textarea
                name="notes"
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="Add notes about this appointment..."
              />
            </div>
            <div className="flex space-x-3 pt-4">
              <button
                type="button"
                onClick={() => {
                  setShowEditModal(false);
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
                {isLoading ? 'Updating...' : 'Update Appointment'}
              </button>
            </div>
          </form>
        )}
      </Modal>
    </div>
  );
};

export default DoctorSchedule;