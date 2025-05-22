import React from "react";
import "./App.css";
import Signup from "./pages/auth/Signup";
import Login from "./pages/auth/Login";
import AdminLayout from "./layouts/AdminLayout";
import Users from "./pages/admin/Users";
import Products from "./pages/admin/Products";
import NewProduct from "./pages/admin/NewProduct";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/user/Home";
import ProductDetail from "./pages/user/ProductDetail";
import Cart from "./pages/user/Cart";
import Order from "./pages/user/Order";
import TrackOrder from "./pages/user/TrackOrder";
import AuthProvider from "./states/AuthProvider";
import ProtectedRoute from "./routes/ProtectedRoute";
import AdminProtectedRoute from "./routes/AdminProtectedRoute";
import { Navigate } from "react-router-dom";
import PublicRoute from "./routes/PublicRoute";
import CartProvider from "./components/user/CartProvider";
import EditProduct from "./pages/admin/EditProduct";
import NotFound from "./pages/user/NotFound";

const App = (): React.JSX.Element => {
  return (
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>
          <Routes>
            {/* Auth Route */}
            <Route
              path="/"
              element={
                <PublicRoute>
                  <Login />
                </PublicRoute>
              }
            />
            <Route
              path="/signup"
              element={
                <PublicRoute>
                  <Signup />
                </PublicRoute>
              }
            />
            <Route
              path="/login"
              element={
                <PublicRoute>
                  <Login />
                </PublicRoute>
              }
            />

            {/* Protected Route */}
            <Route
              path="*"
              element={
                <ProtectedRoute>
                  <Login />
                </ProtectedRoute>
              }
            />
            <Route
              path="/home"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route
              path="/:id"
              element={
                <ProtectedRoute>
                  <ProductDetail />
                </ProtectedRoute>
              }
            />
            <Route
              path="/cart"
              element={
                <ProtectedRoute>
                  <Cart />
                </ProtectedRoute>
              }
            />
            <Route
              path="/order"
              element={
                <ProtectedRoute>
                  <Order />
                </ProtectedRoute>
              }
            />
            <Route
              path="/order/:id"
              element={
                <ProtectedRoute>
                  <TrackOrder />
                </ProtectedRoute>
              }
            />

            {/* admin routes */}
            <Route
              path="/admin"
              element={
                <AdminProtectedRoute>
                  <AdminLayout />
                </AdminProtectedRoute>
              }
            >
              <Route
                index
                element={
                  <AdminProtectedRoute>
                    <Navigate to="users" replace />
                  </AdminProtectedRoute>
                }
              />
              <Route
                path="users"
                element={
                  <AdminProtectedRoute>
                    <Users />
                  </AdminProtectedRoute>
                }
              />
              <Route
                path="products"
                element={
                  <AdminProtectedRoute>
                    <Products />
                  </AdminProtectedRoute>
                }
              />
              <Route
                path="new-product"
                element={
                  <AdminProtectedRoute>
                    <NewProduct />
                  </AdminProtectedRoute>
                }
              />
              <Route
                path="edit-product/:id"
                element={
                  <AdminProtectedRoute>
                    <EditProduct />
                  </AdminProtectedRoute>
                }
              />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  );
};

export default App;
