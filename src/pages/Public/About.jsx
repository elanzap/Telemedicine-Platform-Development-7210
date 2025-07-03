import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';

const About = () => {
  const features = [
    {
      icon: FiIcons.FiShield,
      title: 'HIPAA Compliant',
      description: 'Your data is protected with the highest security standards and compliance protocols.'
    },
    {
      icon: FiIcons.FiVideo,
      title: 'HD Video Calls',
      description: 'Crystal clear video consultations with integrated chat and file sharing.'
    },
    {
      icon: FiIcons.FiClock,
      title: '24/7 Access',
      description: 'Get healthcare when you need it, any time of day or night.'
    },
    {
      icon: FiIcons.FiUsers,
      title: 'Expert Doctors',
      description: 'Board-certified physicians across multiple medical specialties.'
    }
  ];

  const team = [
    {
      name: 'Dr. Sarah Johnson',
      role: 'Chief Medical Officer',
      image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=300&h=300&fit=crop&crop=face',
      bio: 'Board-certified physician with 15+ years in telemedicine'
    },
    {
      name: 'Michael Chen',
      role: 'CEO & Co-Founder',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face',
      bio: 'Healthcare technology innovator and entrepreneur'
    },
    {
      name: 'Emily Rodriguez',
      role: 'CTO',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=300&h=300&fit=crop&crop=face',
      bio: 'Expert in healthcare software and security systems'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                <SafeIcon icon={FiIcons.FiActivity} className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">TeleMed Pro</span>
            </Link>
            <div className="flex items-center space-x-6">
              <Link to="/doctors" className="text-gray-600 hover:text-primary-600">Find Doctors</Link>
              <Link to="/contact" className="text-gray-600 hover:text-primary-600">Contact</Link>
              <Link to="/login" className="text-primary-600 hover:text-primary-700 font-medium">Login</Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              About TeleMed Pro
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We're revolutionizing healthcare delivery through innovative telemedicine technology, 
              making quality healthcare accessible to everyone, everywhere.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Mission</h2>
              <p className="text-lg text-gray-600 mb-6">
                To democratize healthcare by providing accessible, affordable, and high-quality 
                medical consultations through cutting-edge telemedicine technology.
              </p>
              <p className="text-lg text-gray-600 mb-8">
                We believe that everyone deserves access to quality healthcare, regardless of 
                their location or circumstances. Our platform connects patients with qualified 
                healthcare providers, breaking down geographical barriers and making healthcare 
                more convenient than ever.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <div className="text-3xl font-bold text-primary-600">50K+</div>
                  <div className="text-gray-600">Patients Served</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary-600">500+</div>
                  <div className="text-gray-600">Healthcare Providers</div>
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <img
                src="https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=600&h=400&fit=crop"
                alt="Healthcare team"
                className="rounded-2xl shadow-2xl"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose TeleMed Pro?
            </h2>
            <p className="text-xl text-gray-600">
              We're committed to providing the best telemedicine experience
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white p-6 rounded-xl shadow-soft text-center"
              >
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <SafeIcon icon={feature.icon} className="w-6 h-6 text-primary-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Meet Our Team
            </h2>
            <p className="text-xl text-gray-600">
              Dedicated professionals committed to transforming healthcare
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className="font-semibold text-gray-900 mb-1">{member.name}</h3>
                <p className="text-primary-600 mb-3">{member.role}</p>
                <p className="text-gray-600">{member.bio}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Experience Better Healthcare?
          </h2>
          <p className="text-xl text-primary-100 mb-8">
            Join thousands who trust TeleMed Pro for their healthcare needs
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/register"
              className="bg-white text-primary-600 px-8 py-3 rounded-lg hover:bg-gray-50 transition-colors font-medium"
            >
              Get Started Today
            </Link>
            <Link
              to="/contact"
              className="border border-white text-white px-8 py-3 rounded-lg hover:bg-white hover:text-primary-600 transition-colors font-medium"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;