import { Routes, Route } from 'react-router-dom';
import Login from '../components/auth/LoginForm';
import Signup from '../components/auth/SignupForm';
import ForgetPassword from '../components/auth/ForgetPassword';
import OtpVerification from '../components/auth/otpForm';
import ResetPassword from '../components/auth/ResetPassword';
import Dashboard from '../pages/Dashboard';
import SignUpOtpForm from '../components/auth/signUpOtpForm';

import ProtectedRoute from './protectedRoute';
import PublicOnlyRoute from './PublicRoutes';

const AuthRoutes = () => {
  return (
    <Routes>
      {/* Public-only routes */}
      <Route
        path="/"
        element={
          <PublicOnlyRoute>
            <Login />
          </PublicOnlyRoute>
        }
      />
      <Route
        path="/login"
        element={
          <PublicOnlyRoute>
            <Login />
          </PublicOnlyRoute>
        }
      />
      <Route
        path="/signup"
        element={
          <PublicOnlyRoute>
            <Signup />
          </PublicOnlyRoute>
        }
      />
       <Route
        path="/signup-otp-form"
        element={
          <PublicOnlyRoute>
            <SignUpOtpForm/>
          </PublicOnlyRoute>
        }
      />
      <Route
        path="/forgot-password"
        element={
          <PublicOnlyRoute>
            <ForgetPassword />
          </PublicOnlyRoute>
        }
      />
      <Route
        path="/verify-otp"
        element={
          <PublicOnlyRoute>
            <OtpVerification />
          </PublicOnlyRoute>
        }
      />
      <Route
        path="/reset-password"
        element={
          <PublicOnlyRoute>
            <ResetPassword />
          </PublicOnlyRoute>
        }
      />

      {/* Private/protected route */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default AuthRoutes;
