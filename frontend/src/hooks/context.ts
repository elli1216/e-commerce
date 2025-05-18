import * as React from 'react';
import { type User } from 'firebase/auth';
import { type Cart } from '../types/cart';

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

// =======================================================================

interface CartContext {
  userCart: Cart | null;
  setUserCart: React.Dispatch<React.SetStateAction<Cart | null>>;
  fetchCartItems: () => Promise<void>;
}

export const CartContext = React.createContext<CartContext | null>(null);

export const useCart = () => {
  const context = React.useContext(CartContext);

  if (!context) throw new Error('useCart must be used within a CartProvider');

  return context;
};