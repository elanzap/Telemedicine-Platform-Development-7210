import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';

const Landing = () => {
  const features = [
    {
      icon: FiIcons.FiVideo,
      title: 'HD Video Consultations',
      description: 'Crystal clear video calls with integrated chat and file sharing capabilities'
    },
    {
      icon: FiIcons.FiCalendar,
      title: 'Easy Scheduling',
      description: 'Book appointments with your preferred doctors at your convenience'
    },
    {
      icon: FiIcons.FiFileText,
      title: 'Digital Prescriptions',
      description: 'Get digital prescriptions sent directly to your email and pharmacy'
    },
    {
      icon: FiIcons.FiShield,
      title: 'Secure & Private',
      description: 'HIPAA compliant platform with end-to-end encryption for all communications'
    },
    {
      icon: FiIcons.FiClock,
      title: '24/7 Access',
      description: 'Access healthcare services anytime, anywhere with our mobile-friendly platform'
    },
    {
      icon: FiIcons.FiUsers,
      title: 'Expert Doctors',
      description: 'Connect with board-certified doctors across multiple specialties'
    }
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Patient',
      content: 'TeleMed Pro has made healthcare so convenient. I can consult with my doctor from home!',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=150&h=150&fit=crop&crop=face'
    },
    {
      name: 'Dr. Michael Chen',
      role: 'Cardiologist',
      content: 'The platform is intuitive and helps me provide better care to my patients remotely.',
      avatar: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&h=150&fit=crop&crop=face'
    },
    {
      name: 'Emily Rodriguez',
      role: 'Patient',
      content: 'Quick, easy, and professional. Got my prescription within minutes of the consultation.',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                <SafeIcon icon={FiIcons.FiActivity} className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">TeleMed Pro</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <Link to="/doctors" className="text-gray-600 hover:text-primary-600">Find Doctors</Link>
              <Link to="/about" className="text-gray-600 hover:text-primary-600">About</Link>
              <Link to="/contact" className="text-gray-600 hover:text-primary-600">Contact</Link>
              <Link to="/login" className="text-primary-600 hover:text-primary-700 font-medium">Login</Link>
              <Link to="/register" className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors">
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-50 to-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-5xl font-bold text-gray-900 mb-6">
                Healthcare at Your
                <span className="text-primary-600"> Fingertips</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Connect with board-certified doctors instantly. Get prescriptions, medical advice, 
                and follow-up care from the comfort of your home.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/register"
                  className="bg-primary-600 text-white px-8 py-3 rounded-lg hover:bg-primary-700 transition-colors text-center font-medium"
                >
                  Get Started Today
                </Link>
                <Link
                  to="/doctors"
                  className="border border-primary-600 text-primary-600 px-8 py-3 rounded-lg hover:bg-primary-50 transition-colors text-center font-medium"
                >
                  Browse Doctors
                </Link>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <img
                src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=600&h=400&fit=crop"
                alt="Doctor consultation"
                className="rounded-2xl shadow-2xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <SafeIcon icon={FiIcons.FiCheck} className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Consultation Complete</p>
                    <p className="text-sm text-gray-600">Prescription sent to email</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose TeleMed Pro?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our platform combines cutting-edge technology with compassionate care 
              to deliver exceptional healthcare experiences.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white p-8 rounded-xl shadow-soft border border-gray-100 hover:shadow-medium transition-shadow"
              >
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-6">
                  <SafeIcon icon={feature.icon} className="w-6 h-6 text-primary-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-primary-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 text-center text-white">
            <div>
              <div className="text-4xl font-bold mb-2">50K+</div>
              <div className="text-primary-200">Happy Patients</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">500+</div>
              <div className="text-primary-200">Expert Doctors</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">100K+</div>
              <div className="text-primary-200">Consultations</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">24/7</div>
              <div className="text-primary-200">Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              What Our Users Say
            </h2>
            <p className="text-xl text-gray-600">
              Real experiences from patients and doctors using our platform
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white p-8 rounded-xl shadow-soft"
              >
                <div className="flex items-center mb-4">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-700 italic">"{testimonial.content}"</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Ready to Transform Your Healthcare Experience?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Join thousands of patients and doctors who trust TeleMed Pro for their healthcare needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/register"
              className="bg-primary-600 text-white px-8 py-3 rounded-lg hover:bg-primary-700 transition-colors font-medium"
            >
              Start Your Journey
            </Link>
            <Link
              to="/contact"
              className="border border-gray-300 text-gray-700 px-8 py-3 rounded-lg hover:bg-gray-50 transition-colors font-medium"
            >
              Contact Sales
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                  <SafeIcon icon={FiIcons.FiActivity} className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">TeleMed Pro</span>
              </div>
              <p className="text-gray-400">
                Advanced telemedicine platform for modern healthcare delivery.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Platform</h4>
              <div className="space-y-2 text-gray-400">
                <div>For Patients</div>
                <div>For Doctors</div>
                <div>For Hospitals</div>
                <div>API Documentation</div>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <div className="space-y-2 text-gray-400">
                <div>Help Center</div>
                <div>Contact Us</div>
                <div>Privacy Policy</div>
                <div>Terms of Service</div>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Connect</h4>
              <div className="flex space-x-4">
                <SafeIcon icon={FiIcons.FiTwitter} className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer" />
                <SafeIcon icon={FiIcons.FiFacebook} className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer" />
                <SafeIcon icon={FiIcons.FiLinkedin} className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer" />
                <SafeIcon icon={FiIcons.FiInstagram} className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer" />
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 TeleMed Pro. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;