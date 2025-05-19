import React from 'react';
import './App.css';
import Signup from './pages/Signup';
import Login from './pages/Login';
import AdminLayout from './layouts/AdminLayout';
import Users from './pages/admin/Users';
import Products from './pages/admin/Products';
import NewProduct from './pages/admin/NewProduct';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Order from './pages/Order';
import TrackOrder from './pages/TrackOrder';
import AuthProvider from './components/AuthProvider';
import ProtectedRoute from './components/ProtectedRoute';
import AdminProtectedRoute from './components/AdminProtectedRoute';
import { Navigate } from 'react-router-dom';
import PublicRoute from './pages/PublicRoute';
import CartProvider from './components/CartProvider';

const App = (): React.JSX.Element => {
  return (
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>
          <Routes>
            {/* Auth Route */}
            <Route path="/" element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            } />
            <Route path="/signup" element={
              <PublicRoute>
                <Signup />
              </PublicRoute>
            } />
            <Route path="/login" element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            } />

            {/* Protected Route */}
            <Route path="*" element={
              <ProtectedRoute>
                <Login />
              </ProtectedRoute>
            } />
            <Route path="/home" element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            } />
            <Route path="/:id" element={
              <ProtectedRoute>
                <ProductDetail />
              </ProtectedRoute>
            } />
            <Route path="/cart" element={
              <ProtectedRoute>
                <Cart />
              </ProtectedRoute>
            } />
            <Route path="/order" element={
              <ProtectedRoute>
                <Order />
              </ProtectedRoute>
            } />
            <Route path="/order/:id" element={
              <ProtectedRoute>
                <TrackOrder />
              </ProtectedRoute>
            } />

            {/* admin routes */}
            <Route path="/admin" element={
              <AdminProtectedRoute>
                <AdminLayout />
              </AdminProtectedRoute>
            }>
              <Route index element={
                <AdminProtectedRoute>
                  <Navigate to="users" replace />
                </AdminProtectedRoute>
              } />
              <Route path="users" element={
                <AdminProtectedRoute>
                  <Users />
                </AdminProtectedRoute>
              } />
              <Route path="products" element={
                <AdminProtectedRoute>
                  <Products />
                </AdminProtectedRoute>
              } />
              <Route path="new-product" element={
                <AdminProtectedRoute>
                  <NewProduct />
                </AdminProtectedRoute>
              } />
            </Route>
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  );
};

export default App;
