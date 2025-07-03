import { create } from 'zustand';
import { format, addDays, addHours } from 'date-fns';

export const useAppointmentStore = create((set, get) => ({
  appointments: [
    {
      id: '1',
      patientId: '3',
      doctorId: '2',
      patientName: 'John Patient',
      doctorName: 'Dr. Sarah Johnson',
      specialty: 'Cardiology',
      date: addDays(new Date(), 1),
      time: '10:00 AM',
      duration: 30,
      status: 'confirmed',
      type: 'video',
      symptoms: 'Chest pain, shortness of breath',
      meetingLink: 'https://meet.google.com/abc-defg-hij',
      amount: 150,
      paid: true
    },
    {
      id: '2',
      patientId: '3',
      doctorId: '4',
      patientName: 'John Patient',
      doctorName: 'Dr. Michael Chen',
      specialty: 'Dermatology',
      date: addDays(new Date(), 3),
      time: '2:00 PM',
      duration: 30,
      status: 'pending',
      type: 'video',
      symptoms: 'Skin rash, itching',
      amount: 120,
      paid: false
    },
    {
      id: '3',
      patientId: '5',
      doctorId: '2',
      patientName: 'Jane Smith',
      doctorName: 'Dr. Sarah Johnson',
      specialty: 'Cardiology',
      date: new Date(),
      time: '3:00 PM',
      duration: 30,
      status: 'completed',
      type: 'video',
      symptoms: 'Follow-up consultation',
      meetingLink: 'https://meet.google.com/xyz-uvwx-rst',
      amount: 150,
      paid: true
    }
  ],

  bookAppointment: async (appointmentData) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newAppointment = {
        id: Date.now().toString(),
        status: 'pending',
        meetingLink: `https://meet.google.com/${Math.random().toString(36).substr(2, 9)}`,
        ...appointmentData
      };

      set(state => ({
        appointments: [...state.appointments, newAppointment]
      }));

      return { success: true, appointment: newAppointment };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  updateAppointment: async (appointmentId, updates) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      set(state => ({
        appointments: state.appointments.map(appointment =>
          appointment.id === appointmentId
            ? { ...appointment, ...updates }
            : appointment
        )
      }));

      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  cancelAppointment: async (appointmentId) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      set(state => ({
        appointments: state.appointments.map(appointment =>
          appointment.id === appointmentId
            ? { ...appointment, status: 'cancelled' }
            : appointment
        )
      }));

      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  getAppointmentsByUser: (userId, userRole) => {
    const { appointments } = get();
    const roleField = userRole === 'doctor' ? 'doctorId' : 'patientId';
    return appointments.filter(appointment => appointment[roleField] === userId);
  },

  getAppointmentById: (appointmentId) => {
    const { appointments } = get();
    return appointments.find(appointment => appointment.id === appointmentId);
  }
}));