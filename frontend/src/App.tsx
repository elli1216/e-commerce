import React from 'react';
import './App.css';
import Signup from './pages/Signup';
import Login from './pages/Login';
import AdminLayout from './layouts/AdminLayout';
import Users from './pages/admin/Users';
import Products from './pages/admin/Products';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const App = (): React.JSX.Element => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="users" element={<Users />} />
          <Route path="products" element={<Products />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
