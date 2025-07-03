import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';
import toast from 'react-hot-toast';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate form submission
    setTimeout(() => {
      setIsLoading(false);
      toast.success('Message sent successfully! We\'ll get back to you soon.');
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 1000);
  };

  const contactInfo = [
    {
      icon: FiIcons.FiMail,
      title: 'Email Us',
      value: 'support@telemedpro.com',
      description: 'Send us an email anytime'
    },
    {
      icon: FiIcons.FiPhone,
      title: 'Call Us',
      value: '+1 (555) 123-4567',
      description: '24/7 customer support'
    },
    {
      icon: FiIcons.FiMapPin,
      title: 'Visit Us',
      value: '123 Healthcare Ave, Medical District, NY 10001',
      description: 'Our headquarters'
    },
    {
      icon: FiIcons.FiClock,
      title: 'Business Hours',
      value: 'Mon-Fri: 9AM-6PM EST',
      description: 'Weekend support available'
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
              <Link to="/about" className="text-gray-600 hover:text-primary-600">About</Link>
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
              Get in Touch
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Have questions about our telemedicine platform? We're here to help. 
              Reach out to our team for support, partnerships, or general inquiries.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-2xl shadow-soft p-8"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Send us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="Your full name"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="your@email.com"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Subject *
                  </label>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    required
                  >
                    <option value="">Select a subject</option>
                    <option value="general">General Inquiry</option>
                    <option value="support">Technical Support</option>
                    <option value="partnership">Partnership</option>
                    <option value="billing">Billing Question</option>
                    <option value="feedback">Feedback</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="Tell us how we can help you..."
                    required
                  />
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-primary-600 text-white py-3 rounded-lg hover:bg-primary-700 transition-colors font-medium disabled:opacity-50"
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      Sending...
                    </div>
                  ) : (
                    'Send Message'
                  )}
                </motion.button>
              </form>
            </motion.div>
          </div>

          {/* Contact Information */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-8"
            >
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-6">Contact Information</h3>
                <div className="space-y-6">
                  {contactInfo.map((info, index) => (
                    <div key={index} className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <SafeIcon icon={info.icon} className="w-6 h-6 text-primary-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">{info.title}</h4>
                        <p className="text-primary-600 font-medium">{info.value}</p>
                        <p className="text-sm text-gray-600">{info.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gradient-to-br from-primary-600 to-primary-700 rounded-xl p-6 text-white">
                <h4 className="font-semibold mb-3">Need Immediate Help?</h4>
                <p className="text-primary-100 mb-4">
                  For urgent medical concerns, please contact your local emergency services 
                  or visit the nearest emergency room.
                </p>
                <div className="flex items-center text-primary-100">
                  <SafeIcon icon={FiIcons.FiPhone} className="w-4 h-4 mr-2" />
                  <span className="text-sm">Emergency: 911</span>
                </div>
              </div>

              <div className="bg-gray-50 rounded-xl p-6">
                <h4 className="font-semibold text-gray-900 mb-3">Follow Us</h4>
                <div className="flex space-x-4">
                  <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center cursor-pointer hover:bg-primary-700 transition-colors">
                    <SafeIcon icon={FiIcons.FiTwitter} className="w-5 h-5 text-white" />
                  </div>
                  <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center cursor-pointer hover:bg-primary-700 transition-colors">
                    <SafeIcon icon={FiIcons.FiLinkedin} className="w-5 h-5 text-white" />
                  </div>
                  <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center cursor-pointer hover:bg-primary-700 transition-colors">
                    <SafeIcon icon={FiIcons.FiFacebook} className="w-5 h-5 text-white" />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;