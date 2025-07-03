import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';
import { useDoctorStore } from '../../stores/doctorStore';

const DoctorDirectory = () => {
  const { doctors, searchFilters, setSearchFilters, getFilteredDoctors } = useDoctorStore();
  const [searchTerm, setSearchTerm] = useState('');
  const filteredDoctors = getFilteredDoctors();

  const specialties = [
    'Cardiology', 'Dermatology', 'Pediatrics', 'Psychiatry', 
    'Orthopedics', 'Neurology', 'General Medicine'
  ];

  const languages = ['English', 'Spanish', 'Mandarin', 'Portuguese'];

  const handleFilterChange = (filterType, value) => {
    setSearchFilters({ [filterType]: value });
  };

  const filteredBySearch = filteredDoctors.filter(doctor =>
    doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Find a Doctor</h1>
              <p className="text-gray-600 mt-2">Browse our network of qualified healthcare professionals</p>
            </div>
            <Link
              to="/"
              className="text-primary-600 hover:text-primary-700 font-medium"
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-soft p-6 sticky top-6">
              <h3 className="font-semibold text-gray-900 mb-4">Filter Doctors</h3>
              
              {/* Search */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Search
                </label>
                <div className="relative">
                  <SafeIcon 
                    icon={FiIcons.FiSearch} 
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" 
                  />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="Search doctors..."
                  />
                </div>
              </div>

              {/* Specialty Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Specialty
                </label>
                <select
                  value={searchFilters.specialty}
                  onChange={(e) => handleFilterChange('specialty', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  <option value="">All Specialties</option>
                  {specialties.map(specialty => (
                    <option key={specialty} value={specialty}>{specialty}</option>
                  ))}
                </select>
              </div>

              {/* Language Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Language
                </label>
                <select
                  value={searchFilters.language}
                  onChange={(e) => handleFilterChange('language', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  <option value="">All Languages</option>
                  {languages.map(language => (
                    <option key={language} value={language}>{language}</option>
                  ))}
                </select>
              </div>

              {/* Rating Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Minimum Rating
                </label>
                <select
                  value={searchFilters.rating}
                  onChange={(e) => handleFilterChange('rating', parseFloat(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  <option value={0}>Any Rating</option>
                  <option value={4.5}>4.5+ Stars</option>
                  <option value={4.0}>4.0+ Stars</option>
                  <option value={3.5}>3.5+ Stars</option>
                </select>
              </div>

              <button
                onClick={() => {
                  setSearchFilters({ specialty: '', language: '', rating: 0 });
                  setSearchTerm('');
                }}
                className="w-full text-primary-600 hover:text-primary-700 text-sm font-medium"
              >
                Clear All Filters
              </button>
            </div>
          </div>

          {/* Doctors Grid */}
          <div className="lg:col-span-3">
            <div className="flex items-center justify-between mb-6">
              <p className="text-gray-600">
                Showing {filteredBySearch.length} doctor{filteredBySearch.length !== 1 ? 's' : ''}
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {filteredBySearch.map((doctor, index) => (
                <motion.div
                  key={doctor.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-xl shadow-soft hover:shadow-medium transition-shadow p-6"
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
                          <div className="flex items-center text-green-600">
                            <SafeIcon icon={FiIcons.FiCheckCircle} className="w-4 h-4" />
                          </div>
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
                          {doctor.rating} ({doctor.reviewCount} reviews)
                        </span>
                      </div>

                      <div className="flex items-center mt-2">
                        <SafeIcon icon={FiIcons.FiClock} className="w-4 h-4 text-gray-400 mr-1" />
                        <span className="text-sm text-gray-600">{doctor.experience} years experience</span>
                      </div>

                      <div className="flex flex-wrap gap-1 mt-3">
                        {doctor.languages.slice(0, 2).map(language => (
                          <span
                            key={language}
                            className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full"
                          >
                            {language}
                          </span>
                        ))}
                        {doctor.languages.length > 2 && (
                          <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">
                            +{doctor.languages.length - 2} more
                          </span>
                        )}
                      </div>

                      <div className="flex items-center justify-between mt-4">
                        <div className="text-lg font-semibold text-gray-900">
                          ${doctor.consultationFee}
                          <span className="text-sm font-normal text-gray-600">/consultation</span>
                        </div>
                        <Link
                          to="/register"
                          className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors text-sm font-medium"
                        >
                          Book Appointment
                        </Link>
                      </div>
                    </div>
                  </div>

                  <p className="text-sm text-gray-600 mt-4 line-clamp-2">
                    {doctor.bio}
                  </p>
                </motion.div>
              ))}
            </div>

            {filteredBySearch.length === 0 && (
              <div className="text-center py-12">
                <SafeIcon icon={FiIcons.FiUserX} className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No doctors found</h3>
                <p className="text-gray-600">Try adjusting your search criteria</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorDirectory;