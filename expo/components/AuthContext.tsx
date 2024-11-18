import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Define the shape of the AuthContext
export type AuthContextType = {
  uid: string | null;
  setAuthState: (state: { uid: string | null }) => Promise<void>;
};

// Create the AuthContext
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Define the props for the AuthProvider
type AuthProviderProps = {
  children: ReactNode;
};

// AuthProvider Component
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [uid, setUid] = useState<string | null>(null);

  const setAuthState = async (state: { uid: string | null }) => {
    try {
      setUid(state.uid);
      if (state.uid) {
        await AsyncStorage.setItem('authState', JSON.stringify(state));
      } else {
        await AsyncStorage.removeItem('authState');
      }
    } catch (error) {
      console.error('Error updating auth state:', error);
    }
  };

  useEffect(() => {
    const loadAuthState = async () => {
      try {
        const storedAuthState = await AsyncStorage.getItem('authState');
        if (storedAuthState) {
          const parsedState = JSON.parse(storedAuthState);
          setUid(parsedState.uid);
        }
      } catch (error) {
        console.error('Error loading auth state:', error);
      }
    };

    loadAuthState();
  }, []);

  return (
    <AuthContext.Provider value={{ uid, setAuthState }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook to use the AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};