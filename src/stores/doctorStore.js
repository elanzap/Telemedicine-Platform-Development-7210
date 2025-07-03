import { create } from 'zustand';

export const useDoctorStore = create((set, get) => ({
  doctors: [
    {
      id: '2',
      name: 'Dr. Sarah Johnson',
      email: 'doctor@telemed.com',
      specialty: 'Cardiology',
      qualifications: ['MD', 'FACC', 'Board Certified Cardiologist'],
      experience: 15,
      rating: 4.9,
      reviewCount: 127,
      languages: ['English', 'Spanish'],
      consultationFee: 150,
      avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=300&h=300&fit=crop&crop=face',
      bio: 'Dr. Sarah Johnson is a board-certified cardiologist with over 15 years of experience in treating heart conditions.',
      education: 'Harvard Medical School',
      location: 'New York, NY',
      availability: {
        monday: ['9:00 AM', '10:00 AM', '11:00 AM', '2:00 PM', '3:00 PM'],
        tuesday: ['9:00 AM', '10:00 AM', '11:00 AM', '2:00 PM', '3:00 PM'],
        wednesday: ['9:00 AM', '10:00 AM', '11:00 AM', '2:00 PM', '3:00 PM'],
        thursday: ['9:00 AM', '10:00 AM', '11:00 AM', '2:00 PM', '3:00 PM'],
        friday: ['9:00 AM', '10:00 AM', '11:00 AM', '2:00 PM', '3:00 PM'],
        saturday: ['10:00 AM', '11:00 AM'],
        sunday: []
      },
      verified: true,
      totalPatients: 1250,
      totalConsultations: 2100
    },
    {
      id: '4',
      name: 'Dr. Michael Chen',
      email: 'mchen@telemed.com',
      specialty: 'Dermatology',
      qualifications: ['MD', 'Board Certified Dermatologist'],
      experience: 12,
      rating: 4.8,
      reviewCount: 89,
      languages: ['English', 'Mandarin'],
      consultationFee: 120,
      avatar: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=300&h=300&fit=crop&crop=face',
      bio: 'Dr. Michael Chen specializes in medical and cosmetic dermatology with a focus on skin cancer prevention.',
      education: 'Stanford University School of Medicine',
      location: 'San Francisco, CA',
      availability: {
        monday: ['8:00 AM', '9:00 AM', '10:00 AM', '1:00 PM', '2:00 PM'],
        tuesday: ['8:00 AM', '9:00 AM', '10:00 AM', '1:00 PM', '2:00 PM'],
        wednesday: ['8:00 AM', '9:00 AM', '10:00 AM', '1:00 PM', '2:00 PM'],
        thursday: ['8:00 AM', '9:00 AM', '10:00 AM', '1:00 PM', '2:00 PM'],
        friday: ['8:00 AM', '9:00 AM', '10:00 AM', '1:00 PM', '2:00 PM'],
        saturday: [],
        sunday: []
      },
      verified: true,
      totalPatients: 890,
      totalConsultations: 1450
    },
    {
      id: '5',
      name: 'Dr. Emily Rodriguez',
      email: 'erodriguez@telemed.com',
      specialty: 'Pediatrics',
      qualifications: ['MD', 'Board Certified Pediatrician'],
      experience: 10,
      rating: 4.9,
      reviewCount: 156,
      languages: ['English', 'Spanish', 'Portuguese'],
      consultationFee: 130,
      avatar: 'https://images.unsplash.com/photo-1594824804732-ca8db7d29ef8?w=300&h=300&fit=crop&crop=face',
      bio: 'Dr. Emily Rodriguez is a compassionate pediatrician dedicated to providing comprehensive care for children.',
      education: 'Johns Hopkins School of Medicine',
      location: 'Miami, FL',
      availability: {
        monday: ['9:00 AM', '10:00 AM', '11:00 AM', '3:00 PM', '4:00 PM'],
        tuesday: ['9:00 AM', '10:00 AM', '11:00 AM', '3:00 PM', '4:00 PM'],
        wednesday: ['9:00 AM', '10:00 AM', '11:00 AM', '3:00 PM', '4:00 PM'],
        thursday: ['9:00 AM', '10:00 AM', '11:00 AM', '3:00 PM', '4:00 PM'],
        friday: ['9:00 AM', '10:00 AM', '11:00 AM', '3:00 PM', '4:00 PM'],
        saturday: ['10:00 AM', '11:00 AM'],
        sunday: []
      },
      verified: true,
      totalPatients: 675,
      totalConsultations: 1200
    }
  ],

  searchFilters: {
    specialty: '',
    location: '',
    language: '',
    availability: '',
    rating: 0
  },

  setSearchFilters: (filters) => {
    set(state => ({
      searchFilters: { ...state.searchFilters, ...filters }
    }));
  },

  getFilteredDoctors: () => {
    const { doctors, searchFilters } = get();
    return doctors.filter(doctor => {
      if (searchFilters.specialty && doctor.specialty !== searchFilters.specialty) return false;
      if (searchFilters.location && !doctor.location.toLowerCase().includes(searchFilters.location.toLowerCase())) return false;
      if (searchFilters.language && !doctor.languages.includes(searchFilters.language)) return false;
      if (searchFilters.rating && doctor.rating < searchFilters.rating) return false;
      return true;
    });
  },

  getDoctorById: (doctorId) => {
    const { doctors } = get();
    return doctors.find(doctor => doctor.id === doctorId);
  }
}));