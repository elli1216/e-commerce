import React, { Suspense, lazy } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthProvider from "./states/AuthProvider";
import ProtectedRoute from "./routes/ProtectedRoute";
import AdminProtectedRoute from "./routes/AdminProtectedRoute";
import { Navigate } from "react-router-dom";
import PublicRoute from "./routes/PublicRoute";
import CartProvider from "./components/user/CartProvider";
import Loading from "./components/Loading";

// Lazy load all page components
const Signup = lazy(() => import("./pages/auth/Signup"));
const Login = lazy(() => import("./pages/auth/Login"));
const AdminLayout = lazy(() => import("./layouts/AdminLayout"));
const UserLayout = lazy(() => import("./layouts/UserLayout"));
const Users = lazy(() => import("./pages/admin/Users"));
const Products = lazy(() => import("./pages/admin/Products"));
const NewProduct = lazy(() => import("./pages/admin/NewProduct"));
const EditProduct = lazy(() => import("./pages/admin/EditProduct"));
const Home = lazy(() => import("./pages/user/Home"));
const ProductDetail = lazy(() => import("./pages/user/ProductDetail"));
const Cart = lazy(() => import("./pages/user/Cart"));
const Order = lazy(() => import("./pages/user/Order"));
const TrackOrder = lazy(() => import("./pages/user/TrackOrder"));
const NotFound = lazy(() => import("./pages/user/NotFound"));

const App = (): React.JSX.Element => {
  return (
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>
          <Suspense fallback={<Loading />}>
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
                path="/"
                element={
                  <ProtectedRoute>
                    <UserLayout />
                  </ProtectedRoute>
                }
              >
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
              </Route>

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
          </Suspense>
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  );
};

export default App;
