import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import MainComponent from "./Home/MainComponent";
import ViewComponent from "./Home/ViewComponent";
import AdminDashboard from "./admin/AdminDashboard";
import CustomerLogin from "./customer/CustomerLogin";
import AdminLogin from "./admin/AdminLogin";
import Error from "./Error";
import BookingForm from "./Home/BookingForm";
import BookingRequests from "./Home/BookingRequests";
import CustomLoader from "./CustomLoader";
import Aboutus from "./Aboutus";
import ForgotPassword from "./customer/ForgotPassword";
import AdminForgotPassword from "./admin/AdminForgotPassword";
import './App.css';

function App() {
  const [isAuthenticatedUser, setIsAuthenticatedUser] = useState(
    localStorage.getItem("token") !== null
  );

  const [isAuthenticatedAdmin, setIsAuthenticatedAdmin] = useState(
    localStorage.getItem("admin-token") !== null
  );

  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    // Simulate loading for 1 second (adjust the duration as needed)
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  return (
    <Router>
      {isLoading ? (
        <CustomLoader />
      ) : (
        <Routes>
          <Route
            path="/"
            element={
              <CustomerLogin
                isAuthenticatedUser={isAuthenticatedUser}
                setIsAuthenticatedUser={setIsAuthenticatedUser}
              />
            }
          />
          <Route
            path="/bookings-status"
            element={
              isAuthenticatedUser ? <BookingRequests /> : <Navigate to="/" />
            }
          />

          <Route path="/aboutus" element={<Aboutus />} />
          <Route path="/forgotPassword" element={<ForgotPassword />} />
          <Route
            path="/adminForgotPassword"
            element={<AdminForgotPassword />}
          />

          <Route
            path="/home"
            element={
              isAuthenticatedUser ? <MainComponent /> : <Navigate to="/" />
            }
          />
          <Route
            path="/bookevent/:eventid"
            element={
              isAuthenticatedUser ? <ViewComponent /> : <Navigate to="/" />
            }
          />

          <Route
            path="/admin"
            element={
              <AdminLogin
                isAuthenticatedAdmin={isAuthenticatedAdmin}
                setIsAuthenticatedAdmin={setIsAuthenticatedAdmin}
              />
            }
          />
          <Route
            path="/admin-dashboard/:username"
            element={
              isAuthenticatedAdmin ? (
                <AdminDashboard />
              ) : (
                <Navigate to="/admin" />
              )
            }
          />
          <Route path="/error/:error" element={<Error />} />
          <Route
            path="/"
            element={
              isAuthenticatedUser ? (
                <Navigate to="/home" />
              ) : (
                <Navigate to="/" />
              )
            }
          />
        </Routes>
      )}
    </Router>
  );
}

export default App;
