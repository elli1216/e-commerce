import * as React from 'react';
import { type User } from 'firebase/auth';

interface AuthContext {
  user: User | null;
  loading: boolean;
}

export const AuthContext = React.createContext<AuthContext | null>(null);

export function useAuth() {
  return React.useContext(AuthContext);
}