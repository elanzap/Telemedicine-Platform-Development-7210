import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';
import { useAppointmentStore } from '../../stores/appointmentStore';
import { useAuthStore } from '../../stores/authStore';
import toast from 'react-hot-toast';

const VideoConsultation = () => {
  const { appointmentId } = useParams();
  const navigate = useNavigate();
  const { getAppointmentById } = useAppointmentStore();
  const { user } = useAuthStore();
  const [appointment, setAppointment] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [consultationStarted, setConsultationStarted] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    const fetchAppointment = async () => {
      const apt = getAppointmentById(appointmentId);
      if (apt) {
        setAppointment(apt);
        // Simulate some initial chat messages
        setChatMessages([
          {
            id: '1',
            sender: 'doctor',
            message: 'Hello! I\'ll be with you shortly. Please make sure your camera and microphone are working.',
            timestamp: new Date(Date.now() - 5 * 60 * 1000)
          },
          {
            id: '2',
            sender: 'patient',
            message: 'Thank you, everything looks good on my end.',
            timestamp: new Date(Date.now() - 3 * 60 * 1000)
          }
        ]);
      } else {
        toast.error('Appointment not found');
        navigate('/patient/appointments');
      }
      setIsLoading(false);
    };

    fetchAppointment();
  }, [appointmentId, getAppointmentById, navigate]);

  const handleStartConsultation = () => {
    if (appointment?.meetingLink) {
      setConsultationStarted(true);
      toast.success('Consultation started!');
    } else {
      toast.error('Meeting link not available');
    }
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const message = {
      id: Date.now().toString(),
      sender: 'patient',
      message: newMessage,
      timestamp: new Date()
    };

    setChatMessages(prev => [...prev, message]);
    setNewMessage('');
  };

  const handleEndConsultation = () => {
    if (window.confirm('Are you sure you want to end the consultation?')) {
      setConsultationStarted(false);
      toast.success('Consultation ended');
      navigate('/patient/appointments');
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-8 h-8 border-2 border-primary-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!appointment) {
    return (
      <div className="text-center py-12">
        <SafeIcon icon={FiIcons.FiAlertCircle} className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">Appointment not found</h3>
        <p className="text-gray-600">The requested appointment could not be found.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-soft p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <img
              src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=60&h=60&fit=crop&crop=face"
              alt={appointment.doctorName}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div>
              <h1 className="text-xl font-bold text-gray-900">{appointment.doctorName}</h1>
              <p className="text-primary-600">{appointment.specialty}</p>
              <p className="text-sm text-gray-600">
                {appointment.date} at {appointment.time}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
              {consultationStarted ? 'In Progress' : 'Ready to Start'}
            </span>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Video Area */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-soft overflow-hidden">
            {consultationStarted ? (
              <div className="aspect-video bg-gray-900 relative">
                {/* Simulated video interface */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-white">
                    <SafeIcon icon={FiIcons.FiVideo} className="w-16 h-16 mx-auto mb-4" />
                    <p className="text-lg font-medium">Video Consultation Active</p>
                    <p className="text-sm opacity-75">This is a simulated video interface</p>
                  </div>
                </div>
                
                {/* Video Controls */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center space-x-4">
                  <button className="w-12 h-12 bg-gray-800 hover:bg-gray-700 rounded-full flex items-center justify-center text-white transition-colors">
                    <SafeIcon icon={FiIcons.FiMic} className="w-5 h-5" />
                  </button>
                  <button className="w-12 h-12 bg-gray-800 hover:bg-gray-700 rounded-full flex items-center justify-center text-white transition-colors">
                    <SafeIcon icon={FiIcons.FiVideo} className="w-5 h-5" />
                  </button>
                  <button 
                    onClick={handleEndConsultation}
                    className="w-12 h-12 bg-red-600 hover:bg-red-700 rounded-full flex items-center justify-center text-white transition-colors"
                  >
                    <SafeIcon icon={FiIcons.FiPhoneOff} className="w-5 h-5" />
                  </button>
                </div>

                {/* Picture-in-Picture */}
                <div className="absolute top-4 right-4 w-32 h-24 bg-gray-700 rounded-lg flex items-center justify-center">
                  <SafeIcon icon={FiIcons.FiUser} className="w-8 h-8 text-white" />
                </div>
              </div>
            ) : (
              <div className="aspect-video bg-gray-100 flex items-center justify-center p-8">
                <div className="text-center">
                  <SafeIcon icon={FiIcons.FiVideo} className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Ready to Start Consultation</h3>
                  <p className="text-gray-600 mb-6">Click the button below to begin your video consultation</p>
                  <button
                    onClick={handleStartConsultation}
                    className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium"
                  >
                    Start Consultation
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Appointment Details */}
          <div className="mt-6 bg-white rounded-xl shadow-soft p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Appointment Details</h3>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-600">Type:</p>
                <p className="font-medium text-gray-900 capitalize">{appointment.type} Consultation</p>
              </div>
              <div>
                <p className="text-gray-600">Duration:</p>
                <p className="font-medium text-gray-900">{appointment.duration} minutes</p>
              </div>
              <div>
                <p className="text-gray-600">Symptoms:</p>
                <p className="font-medium text-gray-900">{appointment.symptoms}</p>
              </div>
              <div>
                <p className="text-gray-600">Status:</p>
                <p className="font-medium text-gray-900 capitalize">{appointment.status}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Chat Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-soft h-96 flex flex-col">
            <div className="p-4 border-b border-gray-200">
              <h3 className="font-semibold text-gray-900">Chat</h3>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {chatMessages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'patient' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs px-3 py-2 rounded-lg ${
                      message.sender === 'patient'
                        ? 'bg-primary-600 text-white'
                        : 'bg-gray-100 text-gray-900'
                    }`}
                  >
                    <p className="text-sm">{message.message}</p>
                    <p className="text-xs mt-1 opacity-75">
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-200">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type a message..."
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                >
                  <SafeIcon icon={FiIcons.FiSend} className="w-4 h-4" />
                </button>
              </div>
            </form>
          </div>

          {/* Quick Actions */}
          <div className="mt-6 bg-white rounded-xl shadow-soft p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <button className="w-full flex items-center space-x-3 px-4 py-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <SafeIcon icon={FiIcons.FiCamera} className="w-5 h-5 text-gray-600" />
                <span className="text-sm text-gray-700">Share Screen</span>
              </button>
              <button className="w-full flex items-center space-x-3 px-4 py-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <SafeIcon icon={FiIcons.FiUpload} className="w-5 h-5 text-gray-600" />
                <span className="text-sm text-gray-700">Upload File</span>
              </button>
              <button className="w-full flex items-center space-x-3 px-4 py-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <SafeIcon icon={FiIcons.FiFileText} className="w-5 h-5 text-gray-600" />
                <span className="text-sm text-gray-700">View Notes</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoConsultation;