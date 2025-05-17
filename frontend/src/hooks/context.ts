import * as React from 'react';
import { type User } from 'firebase/auth';

interface AuthContext {
  user: User | null;
  loading: boolean;
}

export const AuthContext = React.createContext<AuthContext | null>(null);

export const useAuth = (): AuthContext => {
  const context = React.useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthContext.Provider');
  }

  return context;
}