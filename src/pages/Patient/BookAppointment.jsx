import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';
import { useDoctorStore } from '../../stores/doctorStore';
import { useAppointmentStore } from '../../stores/appointmentStore';
import { useAuthStore } from '../../stores/authStore';
import toast from 'react-hot-toast';

const BookAppointment = () => {
  const navigate = useNavigate();
  const { doctors } = useDoctorStore();
  const { bookAppointment } = useAppointmentStore();
  const { user } = useAuthStore();
  const [step, setStep] = useState(1);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [appointmentData, setAppointmentData] = useState({
    date: '',
    time: '',
    symptoms: '',
    type: 'video',
    notes: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleDoctorSelect = (doctor) => {
    setSelectedDoctor(doctor);
    setStep(2);
  };

  const handleDateTimeSelect = (date, time) => {
    setAppointmentData({
      ...appointmentData,
      date,
      time
    });
    setStep(3);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const booking = {
      patientId: user.id,
      doctorId: selectedDoctor.id,
      patientName: user.name,
      doctorName: selectedDoctor.name,
      specialty: selectedDoctor.specialty,
      date: appointmentData.date,
      time: appointmentData.time,
      duration: 30,
      type: appointmentData.type,
      symptoms: appointmentData.symptoms,
      notes: appointmentData.notes,
      amount: selectedDoctor.consultationFee,
      paid: false
    };

    const result = await bookAppointment(booking);
    
    if (result.success) {
      toast.success('Appointment booked successfully!');
      navigate('/patient/appointments');
    } else {
      toast.error('Failed to book appointment');
    }
    
    setIsLoading(false);
  };

  const getAvailableSlots = () => {
    if (!selectedDoctor || !appointmentData.date) return [];
    
    const selectedDate = new Date(appointmentData.date);
    const dayName = selectedDate.toLocaleLowerCase().replace(/^\w/, c => c.toLowerCase());
    const dayKey = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'][selectedDate.getDay()];
    
    return selectedDoctor.availability[dayKey] || [];
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Progress Steps */}
      <div className="bg-white rounded-xl shadow-soft p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Book Appointment</h1>
          <div className="flex items-center space-x-4">
            {[1, 2, 3].map((stepNumber) => (
              <div key={stepNumber} className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    step >= stepNumber
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-200 text-gray-600'
                  }`}
                >
                  {stepNumber}
                </div>
                {stepNumber < 3 && (
                  <div
                    className={`w-12 h-1 mx-2 ${
                      step > stepNumber ? 'bg-primary-600' : 'bg-gray-200'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-between text-sm">
          <span className={step >= 1 ? 'text-primary-600 font-medium' : 'text-gray-500'}>
            Select Doctor
          </span>
          <span className={step >= 2 ? 'text-primary-600 font-medium' : 'text-gray-500'}>
            Choose Time
          </span>
          <span className={step >= 3 ? 'text-primary-600 font-medium' : 'text-gray-500'}>
            Confirm Details
          </span>
        </div>
      </div>

      {/* Step 1: Select Doctor */}
      {step === 1 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-soft p-6"
        >
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Select a Doctor</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {doctors.map((doctor) => (
              <div
                key={doctor.id}
                onClick={() => handleDoctorSelect(doctor)}
                className="border border-gray-200 rounded-lg p-4 hover:border-primary-300 hover:bg-primary-50 cursor-pointer transition-all"
              >
                <div className="flex items-start space-x-4">
                  <img
                    src={doctor.avatar}
                    alt={doctor.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold text-gray-900">{doctor.name}</h3>
                        <p className="text-primary-600 text-sm">{doctor.specialty}</p>
                        <p className="text-gray-500 text-sm">{doctor.location}</p>
                      </div>
                      {doctor.verified && (
                        <SafeIcon icon={FiIcons.FiCheckCircle} className="w-5 h-5 text-green-600" />
                      )}
                    </div>

                    <div className="flex items-center mt-2">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <SafeIcon
                            key={i}
                            icon={FiIcons.FiStar}
                            className={`w-4 h-4 ${
                              i < Math.floor(doctor.rating)
                                ? 'text-yellow-400 fill-current'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-gray-600 ml-2">
                        {doctor.rating} ({doctor.reviewCount})
                      </span>
                    </div>

                    <div className="flex items-center justify-between mt-3">
                      <span className="text-lg font-semibold text-gray-900">
                        ${doctor.consultationFee}
                      </span>
                      <span className="text-sm text-gray-600">
                        {doctor.experience} years exp.
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Step 2: Choose Date & Time */}
      {step === 2 && selectedDoctor && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-soft p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Choose Date & Time</h2>
            <button
              onClick={() => setStep(1)}
              className="text-primary-600 hover:text-primary-700 font-medium"
            >
              ← Change Doctor
            </button>
          </div>

          <div className="flex items-center space-x-4 mb-6 p-4 bg-gray-50 rounded-lg">
            <img
              src={selectedDoctor.avatar}
              alt={selectedDoctor.name}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div>
              <h3 className="font-medium text-gray-900">{selectedDoctor.name}</h3>
              <p className="text-sm text-gray-600">{selectedDoctor.specialty}</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Date
              </label>
              <input
                type="date"
                value={appointmentData.date}
                onChange={(e) => setAppointmentData({ ...appointmentData, date: e.target.value })}
                min={new Date().toISOString().split('T')[0]}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Available Times
              </label>
              {appointmentData.date ? (
                <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto">
                  {getAvailableSlots().map((time) => (
                    <button
                      key={time}
                      onClick={() => handleDateTimeSelect(appointmentData.date, time)}
                      className="p-2 text-sm border border-gray-300 rounded hover:border-primary-300 hover:bg-primary-50 transition-colors"
                    >
                      {time}
                    </button>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-500 py-3">Please select a date first</p>
              )}
            </div>
          </div>
        </motion.div>
      )}

      {/* Step 3: Confirm Details */}
      {step === 3 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-soft p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Confirm Appointment</h2>
            <button
              onClick={() => setStep(2)}
              className="text-primary-600 hover:text-primary-700 font-medium"
            >
              ← Change Time
            </button>
          </div>

          <form onSubmit={handleFormSubmit} className="space-y-6">
            {/* Appointment Summary */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-medium text-gray-900 mb-3">Appointment Summary</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Doctor:</span>
                  <span className="font-medium">{selectedDoctor.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Specialty:</span>
                  <span>{selectedDoctor.specialty}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Date:</span>
                  <span>{new Date(appointmentData.date).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Time:</span>
                  <span>{appointmentData.time}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Duration:</span>
                  <span>30 minutes</span>
                </div>
                <div className="flex justify-between border-t pt-2">
                  <span className="text-gray-600">Consultation Fee:</span>
                  <span className="font-semibold">${selectedDoctor.consultationFee}</span>
                </div>
              </div>
            </div>

            {/* Symptoms & Notes */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Symptoms / Reason for Visit *
              </label>
              <textarea
                value={appointmentData.symptoms}
                onChange={(e) => setAppointmentData({ ...appointmentData, symptoms: e.target.value })}
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="Please describe your symptoms or reason for the consultation"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Additional Notes (Optional)
              </label>
              <textarea
                value={appointmentData.notes}
                onChange={(e) => setAppointmentData({ ...appointmentData, notes: e.target.value })}
                rows={2}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="Any additional information you'd like the doctor to know"
              />
            </div>

            {/* Consultation Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Consultation Type
              </label>
              <select
                value={appointmentData.type}
                onChange={(e) => setAppointmentData({ ...appointmentData, type: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="video">Video Consultation</option>
                <option value="phone">Phone Consultation</option>
              </select>
            </div>

            <div className="flex items-center space-x-4 pt-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isLoading}
                className="flex-1 bg-primary-600 text-white py-3 rounded-lg hover:bg-primary-700 transition-colors font-medium disabled:opacity-50"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Booking...
                  </div>
                ) : (
                  'Confirm & Book Appointment'
                )}
              </motion.button>
            </div>
          </form>
        </motion.div>
      )}
    </div>
  );
};

export default BookAppointment;