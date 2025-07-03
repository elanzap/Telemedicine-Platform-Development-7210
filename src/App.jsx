import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './stores/authStore';
import { useNotificationStore } from './stores/notificationStore';

// Layout Components
import Layout from './components/Layout/Layout';
import AuthLayout from './components/Layout/AuthLayout';

// Auth Pages
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import ForgotPassword from './pages/Auth/ForgotPassword';

// Public Pages
import Landing from './pages/Public/Landing';
import DoctorDirectory from './pages/Public/DoctorDirectory';
import About from './pages/Public/About';
import Contact from './pages/Public/Contact';

// Patient Portal
import PatientDashboard from './pages/Patient/Dashboard';
import PatientProfile from './pages/Patient/Profile';
import BookAppointment from './pages/Patient/BookAppointment';
import PatientAppointments from './pages/Patient/Appointments';
import PatientPrescriptions from './pages/Patient/Prescriptions';
import PatientRecords from './pages/Patient/Records';
import VideoConsultation from './pages/Patient/VideoConsultation';

// Doctor Portal
import DoctorDashboard from './pages/Doctor/Dashboard';
import DoctorProfile from './pages/Doctor/Profile';
import DoctorSchedule from './pages/Doctor/Schedule';
import DoctorAppointments from './pages/Doctor/Appointments';
import DoctorPatients from './pages/Doctor/Patients';
import DoctorPrescriptions from './pages/Doctor/Prescriptions';
import DoctorEarnings from './pages/Doctor/Earnings';

// Admin Portal
import AdminDashboard from './pages/Admin/Dashboard';
import AdminUsers from './pages/Admin/Users';
import AdminAppointments from './pages/Admin/Appointments';
import AdminPayments from './pages/Admin/Payments';
import AdminAnalytics from './pages/Admin/Analytics';
import AdminSettings from './pages/Admin/Settings';
import AdminSupport from './pages/Admin/Support';

// Shared Components
import NotificationCenter from './components/Notifications/NotificationCenter';

function App() {
  const { user, isAuthenticated } = useAuthStore();
  const { notifications } = useNotificationStore();

  const ProtectedRoute = ({ children, allowedRoles = [] }) => {
    if (!isAuthenticated) {
      return <Navigate to="/login" replace />;
    }
    
    if (allowedRoles.length > 0 && !allowedRoles.includes(user?.role)) {
      return <Navigate to="/unauthorized" replace />;
    }
    
    return children;
  };

  const PublicRoute = ({ children }) => {
    if (isAuthenticated) {
      const dashboardRoutes = {
        patient: '/patient/dashboard',
        doctor: '/doctor/dashboard',
        admin: '/admin/dashboard'
      };
      return <Navigate to={dashboardRoutes[user?.role] || '/'} replace />;
    }
    return children;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Landing />} />
        <Route path="/doctors" element={<DoctorDirectory />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />

        {/* Auth Routes */}
        <Route path="/login" element={
          <PublicRoute>
            <AuthLayout>
              <Login />
            </AuthLayout>
          </PublicRoute>
        } />
        <Route path="/register" element={
          <PublicRoute>
            <AuthLayout>
              <Register />
            </AuthLayout>
          </PublicRoute>
        } />
        <Route path="/forgot-password" element={
          <PublicRoute>
            <AuthLayout>
              <ForgotPassword />
            </AuthLayout>
          </PublicRoute>
        } />

        {/* Patient Portal */}
        <Route path="/patient/*" element={
          <ProtectedRoute allowedRoles={['patient']}>
            <Layout userRole="patient">
              <Routes>
                <Route path="dashboard" element={<PatientDashboard />} />
                <Route path="profile" element={<PatientProfile />} />
                <Route path="book-appointment" element={<BookAppointment />} />
                <Route path="appointments" element={<PatientAppointments />} />
                <Route path="prescriptions" element={<PatientPrescriptions />} />
                <Route path="records" element={<PatientRecords />} />
                <Route path="consultation/:appointmentId" element={<VideoConsultation />} />
                <Route path="" element={<Navigate to="dashboard" replace />} />
              </Routes>
            </Layout>
          </ProtectedRoute>
        } />

        {/* Doctor Portal */}
        <Route path="/doctor/*" element={
          <ProtectedRoute allowedRoles={['doctor']}>
            <Layout userRole="doctor">
              <Routes>
                <Route path="dashboard" element={<DoctorDashboard />} />
                <Route path="profile" element={<DoctorProfile />} />
                <Route path="schedule" element={<DoctorSchedule />} />
                <Route path="appointments" element={<DoctorAppointments />} />
                <Route path="patients" element={<DoctorPatients />} />
                <Route path="prescriptions" element={<DoctorPrescriptions />} />
                <Route path="earnings" element={<DoctorEarnings />} />
                <Route path="consultation/:appointmentId" element={<VideoConsultation />} />
                <Route path="" element={<Navigate to="dashboard" replace />} />
              </Routes>
            </Layout>
          </ProtectedRoute>
        } />

        {/* Admin Portal */}
        <Route path="/admin/*" element={
          <ProtectedRoute allowedRoles={['admin']}>
            <Layout userRole="admin">
              <Routes>
                <Route path="dashboard" element={<AdminDashboard />} />
                <Route path="users" element={<AdminUsers />} />
                <Route path="appointments" element={<AdminAppointments />} />
                <Route path="payments" element={<AdminPayments />} />
                <Route path="analytics" element={<AdminAnalytics />} />
                <Route path="settings" element={<AdminSettings />} />
                <Route path="support" element={<AdminSupport />} />
                <Route path="" element={<Navigate to="dashboard" replace />} />
              </Routes>
            </Layout>
          </ProtectedRoute>
        } />

        {/* Catch all route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      {/* Global Notification Center */}
      {isAuthenticated && <NotificationCenter />}
    </div>
  );
}

export default App;