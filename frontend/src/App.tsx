import React from "react";
import "./App.css";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import AdminLayout from "./layouts/AdminLayout";
import Users from "./pages/admin/Users";
import Products from "./pages/admin/Products";
import NewProduct from "./pages/admin/NewProduct";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Order from "./pages/Order";

const App = (): React.JSX.Element => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/order" element={<Order />} />

        {/* admin routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="users" element={<Users />} />
          <Route path="products" element={<Products />} />
          <Route path="new-product" element={<NewProduct />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
