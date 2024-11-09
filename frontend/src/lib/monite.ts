import { MoniteSDK } from '@monite/sdk-api';
import { createContext, useContext } from 'react';
import api from './api';

// Initialize Monite SDK
const moniteSDK = new MoniteSDK({
  apiUrl: import.meta.env.VITE_MONITE_API_URL,
  entityId: import.meta.env.VITE_MONITE_ENTITY_ID,
  fetchToken: async () => {
    try {
      const response = await api.post('/auth/token');
      return response.data.token;
    } catch (error) {
      console.error('Failed to fetch Monite token:', error);
      throw error;
    }
  },
});

// Create context for Monite SDK
export const MoniteContext = createContext<MoniteSDK>(moniteSDK);

// Custom hook for using Monite SDK
export const useMonite = () => {
  const context = useContext(MoniteContext);
  if (!context) {
    throw new Error('useMonite must be used within a MoniteProvider');
  }
  return context;
};