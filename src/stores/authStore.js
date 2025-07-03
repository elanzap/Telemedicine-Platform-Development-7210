import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,

      login: async (credentials) => {
        set({ isLoading: true });
        try {
          // Simulate API call
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          // Mock user data based on email
          let mockUser;
          if (credentials.email === 'admin@telemed.com') {
            mockUser = {
              id: '1',
              email: 'admin@telemed.com',
              name: 'Admin User',
              role: 'admin',
              avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
            };
          } else if (credentials.email === 'doctor@telemed.com') {
            mockUser = {
              id: '2',
              email: 'doctor@telemed.com',
              name: 'Dr. Sarah Johnson',
              role: 'doctor',
              specialty: 'Cardiology',
              avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=face'
            };
          } else {
            mockUser = {
              id: '3',
              email: credentials.email,
              name: 'John Patient',
              role: 'patient',
              avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
            };
          }

          set({ user: mockUser, isAuthenticated: true, isLoading: false });
          return { success: true };
        } catch (error) {
          set({ isLoading: false });
          return { success: false, error: error.message };
        }
      },

      register: async (userData) => {
        set({ isLoading: true });
        try {
          // Simulate API call
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          const newUser = {
            id: Date.now().toString(),
            ...userData,
            avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
          };

          set({ user: newUser, isAuthenticated: true, isLoading: false });
          return { success: true };
        } catch (error) {
          set({ isLoading: false });
          return { success: false, error: error.message };
        }
      },

      logout: () => {
        set({ user: null, isAuthenticated: false });
      },

      updateProfile: async (profileData) => {
        set({ isLoading: true });
        try {
          // Simulate API call
          await new Promise(resolve => setTimeout(resolve, 500));
          
          const currentUser = get().user;
          const updatedUser = { ...currentUser, ...profileData };
          
          set({ user: updatedUser, isLoading: false });
          return { success: true };
        } catch (error) {
          set({ isLoading: false });
          return { success: false, error: error.message };
        }
      }
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated
      })
    }
  )
);