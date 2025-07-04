import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';
import { format } from 'date-fns';
import toast from 'react-hot-toast';

const AdminSupport = () => {
  const [activeTab, setActiveTab] = useState('tickets');
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Mock support tickets with state management
  const [tickets, setTickets] = useState([
    {
      id: '1',
      subject: 'Unable to join video consultation',
      user: 'John Doe',
      userType: 'patient',
      userEmail: 'john.doe@email.com',
      status: 'open',
      priority: 'high',
      category: 'technical',
      description: 'Patient is experiencing issues connecting to the video consultation. The page loads but the video call does not start.',
      createdAt: new Date('2024-01-15'),
      lastUpdated: new Date('2024-01-15'),
      assignedTo: 'Support Team',
      responses: [
        {
          id: '1',
          author: 'Support Agent',
          message: 'Thank you for reporting this issue. We are investigating the video connection problem.',
          timestamp: new Date('2024-01-15T10:30:00'),
          isStaff: true
        }
      ]
    },
    {
      id: '2',
      subject: 'Payment processing issue',
      user: 'Dr. Sarah Johnson',
      userType: 'doctor',
      userEmail: 'sarah.johnson@telemed.com',
      status: 'in-progress',
      priority: 'medium',
      category: 'billing',
      description: 'Doctor is not receiving payments for completed consultations. Last payment was received 2 weeks ago.',
      createdAt: new Date('2024-01-14'),
      lastUpdated: new Date('2024-01-15'),
      assignedTo: 'Billing Team',
      responses: [
        {
          id: '1',
          author: 'Billing Support',
          message: 'We have identified the issue with your payment processing. Our finance team is working on a resolution.',
          timestamp: new Date('2024-01-14T14:20:00'),
          isStaff: true
        },
        {
          id: '2',
          author: 'Dr. Sarah Johnson',
          message: 'Thank you for the update. When can I expect this to be resolved?',
          timestamp: new Date('2024-01-15T09:15:00'),
          isStaff: false
        }
      ]
    },
    {
      id: '3',
      subject: 'Account verification problem',
      user: 'Jane Smith',
      userType: 'patient',
      userEmail: 'jane.smith@email.com',
      status: 'resolved',
      priority: 'low',
      category: 'account',
      description: 'Patient cannot verify their email address. Verification email is not being received.',
      createdAt: new Date('2024-01-13'),
      lastUpdated: new Date('2024-01-14'),
      assignedTo: 'Technical Team',
      responses: [
        {
          id: '1',
          author: 'Tech Support',
          message: 'We have resent the verification email. Please check your spam folder as well.',
          timestamp: new Date('2024-01-13T16:45:00'),
          isStaff: true
        },
        {
          id: '2',
          author: 'Jane Smith',
          message: 'Found it in spam folder. Account verified successfully. Thank you!',
          timestamp: new Date('2024-01-14T08:30:00'),
          isStaff: false
        }
      ]
    }
  ]);

  const [newTicket, setNewTicket] = useState({
    subject: '',
    user: '',
    userType: 'patient',
    userEmail: '',
    priority: 'medium',
    category: 'general',
    description: '',
    assignedTo: 'Support Team'
  });

  const [newResponse, setNewResponse] = useState('');

  const filteredTickets = tickets.filter(ticket =>
    ticket.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ticket.user.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status) => {
    const colors = {
      open: 'bg-red-100 text-red-800',
      'in-progress': 'bg-yellow-100 text-yellow-800',
      resolved: 'bg-green-100 text-green-800',
      closed: 'bg-gray-100 text-gray-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const getPriorityColor = (priority) => {
    const colors = {
      high: 'bg-red-100 text-red-800',
      medium: 'bg-yellow-100 text-yellow-800',
      low: 'bg-blue-100 text-blue-800'
    };
    return colors[priority] || 'bg-gray-100 text-gray-800';
  };

  const handleAddTicket = () => {
    setShowAddModal(true);
    setNewTicket({
      subject: '',
      user: '',
      userType: 'patient',
      userEmail: '',
      priority: 'medium',
      category: 'general',
      description: '',
      assignedTo: 'Support Team'
    });
  };

  const handleViewTicket = (ticket) => {
    setSelectedTicket(ticket);
    setShowViewModal(true);
    setNewResponse('');
  };

  const handleEditTicket = (ticket) => {
    setSelectedTicket(ticket);
    setNewTicket({
      subject: ticket.subject,
      user: ticket.user,
      userType: ticket.userType,
      userEmail: ticket.userEmail,
      priority: ticket.priority,
      category: ticket.category,
      description: ticket.description,
      assignedTo: ticket.assignedTo
    });
    setShowEditModal(true);
  };

  const handleSaveTicket = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Validate required fields
      if (!newTicket.subject || !newTicket.user || !newTicket.userEmail || !newTicket.description) {
        toast.error('Please fill in all required fields');
        return;
      }

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      if (selectedTicket) {
        // Update existing ticket
        setTickets(tickets.map(ticket =>
          ticket.id === selectedTicket.id
            ? {
                ...ticket,
                ...newTicket,
                lastUpdated: new Date()
              }
            : ticket
        ));
        toast.success('Ticket updated successfully');
        setShowEditModal(false);
      } else {
        // Add new ticket
        const newTicketData = {
          id: Date.now().toString(),
          ...newTicket,
          status: 'open',
          createdAt: new Date(),
          lastUpdated: new Date(),
          responses: []
        };
        setTickets([newTicketData, ...tickets]);
        toast.success('Ticket created successfully');
        setShowAddModal(false);
      }

      setSelectedTicket(null);
    } catch (error) {
      toast.error('Failed to save ticket');
    } finally {
      setIsLoading(false);
    }
  };

  const handleStatusUpdate = async (ticketId, newStatus) => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setTickets(tickets.map(ticket =>
        ticket.id === ticketId
          ? { ...ticket, status: newStatus, lastUpdated: new Date() }
          : ticket
      ));
      toast.success(`Ticket status updated to ${newStatus}`);
    } catch (error) {
      toast.error('Failed to update ticket status');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddResponse = async () => {
    if (!newResponse.trim()) {
      toast.error('Please enter a response');
      return;
    }

    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 500));

      const response = {
        id: Date.now().toString(),
        author: 'Support Agent',
        message: newResponse,
        timestamp: new Date(),
        isStaff: true
      };

      setTickets(tickets.map(ticket =>
        ticket.id === selectedTicket.id
          ? {
              ...ticket,
              responses: [...ticket.responses, response],
              lastUpdated: new Date(),
              status: ticket.status === 'open' ? 'in-progress' : ticket.status
            }
          : ticket
      ));

      setSelectedTicket({
        ...selectedTicket,
        responses: [...selectedTicket.responses, response]
      });

      setNewResponse('');
      toast.success('Response added successfully');
    } catch (error) {
      toast.error('Failed to add response');
    } finally {
      setIsLoading(false);
    }
  };

  const TicketModal = ({ isOpen, onClose, title, children }) => (
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
            className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
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
            <h1 className="text-2xl font-bold text-gray-900">Support Center</h1>
            <p className="text-gray-600 mt-1">Manage user support tickets and inquiries</p>
          </div>
          <button
            onClick={handleAddTicket}
            className="flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
          >
            <SafeIcon icon={FiIcons.FiPlus} className="w-4 h-4" />
            <span>New Ticket</span>
          </button>
        </div>

        {/* Search */}
        <div className="relative">
          <SafeIcon icon={FiIcons.FiSearch} className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            placeholder="Search tickets..."
          />
        </div>
      </div>

      {/* Support Tickets */}
      <div className="space-y-4">
        {filteredTickets.length > 0 ? (
          filteredTickets.map((ticket, index) => (
            <motion.div
              key={ticket.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-soft p-6"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                    <SafeIcon icon={FiIcons.FiHelpCircle} className="w-6 h-6 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{ticket.subject}</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      {ticket.user} • {ticket.userType} • Ticket #{ticket.id}
                    </p>
                    <p className="text-sm text-gray-600 mt-1">
                      {ticket.userEmail}
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      Created: {format(ticket.createdAt, 'MMM dd, yyyy')} • 
                      Updated: {format(ticket.lastUpdated, 'MMM dd, yyyy')}
                    </p>
                    <p className="text-sm text-gray-600 mt-2">
                      Assigned to: {ticket.assignedTo}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(ticket.priority)}`}>
                    {ticket.priority.charAt(0).toUpperCase() + ticket.priority.slice(1)}
                  </span>
                  <select
                    value={ticket.status}
                    onChange={(e) => handleStatusUpdate(ticket.id, e.target.value)}
                    disabled={isLoading}
                    className={`px-2 py-1 rounded-full text-xs font-medium border-0 focus:ring-0 ${getStatusColor(ticket.status)} disabled:opacity-50`}
                  >
                    <option value="open">Open</option>
                    <option value="in-progress">In Progress</option>
                    <option value="resolved">Resolved</option>
                    <option value="closed">Closed</option>
                  </select>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleViewTicket(ticket)}
                      className="p-2 text-gray-400 hover:text-primary-600 transition-colors"
                      title="View Ticket"
                    >
                      <SafeIcon icon={FiIcons.FiEye} className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleEditTicket(ticket)}
                      className="p-2 text-gray-400 hover:text-green-600 transition-colors"
                      title="Edit Ticket"
                    >
                      <SafeIcon icon={FiIcons.FiEdit} className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))
        ) : (
          <div className="bg-white rounded-xl shadow-soft p-12 text-center">
            <SafeIcon icon={FiIcons.FiHelpCircle} className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No support tickets found</h3>
            <p className="text-gray-600">Try adjusting your search criteria</p>
          </div>
        )}
      </div>

      {/* Add Ticket Modal */}
      <TicketModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        title="Create New Ticket"
      >
        <form onSubmit={handleSaveTicket} className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Subject *
              </label>
              <input
                type="text"
                value={newTicket.subject}
                onChange={(e) => setNewTicket({ ...newTicket, subject: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="Enter ticket subject"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                User Name *
              </label>
              <input
                type="text"
                value={newTicket.user}
                onChange={(e) => setNewTicket({ ...newTicket, user: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="Enter user name"
                required
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                User Email *
              </label>
              <input
                type="email"
                value={newTicket.userEmail}
                onChange={(e) => setNewTicket({ ...newTicket, userEmail: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="Enter user email"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                User Type
              </label>
              <select
                value={newTicket.userType}
                onChange={(e) => setNewTicket({ ...newTicket, userType: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="patient">Patient</option>
                <option value="doctor">Doctor</option>
                <option value="admin">Admin</option>
              </select>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Priority
              </label>
              <select
                value={newTicket.priority}
                onChange={(e) => setNewTicket({ ...newTicket, priority: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category
              </label>
              <select
                value={newTicket.category}
                onChange={(e) => setNewTicket({ ...newTicket, category: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="general">General</option>
                <option value="technical">Technical</option>
                <option value="billing">Billing</option>
                <option value="account">Account</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Assign To
              </label>
              <select
                value={newTicket.assignedTo}
                onChange={(e) => setNewTicket({ ...newTicket, assignedTo: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="Support Team">Support Team</option>
                <option value="Technical Team">Technical Team</option>
                <option value="Billing Team">Billing Team</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description *
            </label>
            <textarea
              value={newTicket.description}
              onChange={(e) => setNewTicket({ ...newTicket, description: e.target.value })}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="Describe the issue in detail..."
              required
            />
          </div>

          <div className="flex space-x-3 pt-4">
            <button
              type="button"
              onClick={() => setShowAddModal(false)}
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
                  Creating...
                </div>
              ) : (
                'Create Ticket'
              )}
            </button>
          </div>
        </form>
      </TicketModal>

      {/* Edit Ticket Modal */}
      <TicketModal
        isOpen={showEditModal}
        onClose={() => {
          setShowEditModal(false);
          setSelectedTicket(null);
        }}
        title="Edit Ticket"
      >
        <form onSubmit={handleSaveTicket} className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Subject *
              </label>
              <input
                type="text"
                value={newTicket.subject}
                onChange={(e) => setNewTicket({ ...newTicket, subject: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                User Name *
              </label>
              <input
                type="text"
                value={newTicket.user}
                onChange={(e) => setNewTicket({ ...newTicket, user: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                required
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                User Email *
              </label>
              <input
                type="email"
                value={newTicket.userEmail}
                onChange={(e) => setNewTicket({ ...newTicket, userEmail: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                User Type
              </label>
              <select
                value={newTicket.userType}
                onChange={(e) => setNewTicket({ ...newTicket, userType: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="patient">Patient</option>
                <option value="doctor">Doctor</option>
                <option value="admin">Admin</option>
              </select>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Priority
              </label>
              <select
                value={newTicket.priority}
                onChange={(e) => setNewTicket({ ...newTicket, priority: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category
              </label>
              <select
                value={newTicket.category}
                onChange={(e) => setNewTicket({ ...newTicket, category: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="general">General</option>
                <option value="technical">Technical</option>
                <option value="billing">Billing</option>
                <option value="account">Account</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Assign To
              </label>
              <select
                value={newTicket.assignedTo}
                onChange={(e) => setNewTicket({ ...newTicket, assignedTo: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="Support Team">Support Team</option>
                <option value="Technical Team">Technical Team</option>
                <option value="Billing Team">Billing Team</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description *
            </label>
            <textarea
              value={newTicket.description}
              onChange={(e) => setNewTicket({ ...newTicket, description: e.target.value })}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              required
            />
          </div>

          <div className="flex space-x-3 pt-4">
            <button
              type="button"
              onClick={() => {
                setShowEditModal(false);
                setSelectedTicket(null);
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
                  Updating...
                </div>
              ) : (
                'Update Ticket'
              )}
            </button>
          </div>
        </form>
      </TicketModal>

      {/* View Ticket Modal */}
      <TicketModal
        isOpen={showViewModal}
        onClose={() => {
          setShowViewModal(false);
          setSelectedTicket(null);
        }}
        title={`Ticket #${selectedTicket?.id} - ${selectedTicket?.subject}`}
      >
        {selectedTicket && (
          <div className="space-y-6">
            {/* Ticket Details */}
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium text-gray-700">User:</span>
                  <p className="text-gray-900">{selectedTicket.user} ({selectedTicket.userType})</p>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Email:</span>
                  <p className="text-gray-900">{selectedTicket.userEmail}</p>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Priority:</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(selectedTicket.priority)}`}>
                    {selectedTicket.priority.charAt(0).toUpperCase() + selectedTicket.priority.slice(1)}
                  </span>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Status:</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedTicket.status)}`}>
                    {selectedTicket.status.charAt(0).toUpperCase() + selectedTicket.status.slice(1)}
                  </span>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Created:</span>
                  <p className="text-gray-900">{format(selectedTicket.createdAt, 'MMM dd, yyyy HH:mm')}</p>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Assigned to:</span>
                  <p className="text-gray-900">{selectedTicket.assignedTo}</p>
                </div>
              </div>
            </div>

            {/* Description */}
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Description</h4>
              <p className="text-gray-700 bg-gray-50 p-3 rounded-lg">{selectedTicket.description}</p>
            </div>

            {/* Responses */}
            <div>
              <h4 className="font-medium text-gray-900 mb-4">Responses</h4>
              <div className="space-y-4 max-h-60 overflow-y-auto">
                {selectedTicket.responses?.length > 0 ? (
                  selectedTicket.responses.map((response) => (
                    <div
                      key={response.id}
                      className={`p-3 rounded-lg ${
                        response.isStaff ? 'bg-blue-50 border-l-4 border-blue-400' : 'bg-gray-50 border-l-4 border-gray-400'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-sm text-gray-900">{response.author}</span>
                        <span className="text-xs text-gray-500">
                          {format(response.timestamp, 'MMM dd, yyyy HH:mm')}
                        </span>
                      </div>
                      <p className="text-gray-700 text-sm">{response.message}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 text-sm">No responses yet.</p>
                )}
              </div>
            </div>

            {/* Add Response */}
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Add Response</h4>
              <div className="space-y-3">
                <textarea
                  value={newResponse}
                  onChange={(e) => setNewResponse(e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Type your response..."
                />
                <button
                  onClick={handleAddResponse}
                  disabled={isLoading || !newResponse.trim()}
                  className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-50"
                >
                  {isLoading ? (
                    <div className="flex items-center">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      Adding...
                    </div>
                  ) : (
                    'Add Response'
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
      </TicketModal>
    </div>
  );
};

export default AdminSupport;