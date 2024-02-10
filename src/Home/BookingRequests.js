import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import {
  Grid,
  Typography,
  Select,
  MenuItem,
  TextField,
  Paper,
  AppBar,
  IconButton,
} from "@mui/material";
import RotateLeftIcon from '@mui/icons-material/RotateLeft';import Header from "../Header";
import Footer from "../Footer";
import JashanService from "../service/JashanService";
import "./BookingRequests.css";
const BookingRequests = () => {
  const isLoggedIn = true;
  const [bookingData, setBookingData] = useState([]);
  const [userId, setUserId] = useState(null);
  const navigate = useNavigate();
  const [filters, setFilters] = useState({
    bookingStatus: "",
    bookingDate: "",
    event: "",
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    JashanService.get_current_user(token)
      .then((response) => {
        if (response && response.data) {
          setUserId(response.data.id);
          return JashanService.getBookingsInfo(response.data.id, token);
        } else {
          throw new Error("No user data received.");
        }
      })
      .then((res) => {
        if (res && res.data) {
          setBookingData(res.data);
        } else {
          throw Error("No booking data received.");
        }
      })
      .catch((error) => {
        console.error("Error in network request:", error);
      });
  }, []);

  const filteredBookings = bookingData.filter((booking) => {
    if (
      (filters.bookingStatus === "" ||
        booking.bookingStatus === filters.bookingStatus) &&
      (filters.bookingDate === "" ||
        booking.bookingDate === filters.bookingDate) &&
      (filters.event === "" || booking.eventName.includes(filters.event))
    ) {
      return true;
    }
    return false;
  });

  const handleViewEventClick = (eventId) => {
    navigate(`/bookevent/${eventId}`);
  };

  return (
    <div>
      <AppBar position="static" color="default" style={{ height: "80px" }}>
        <Header isLoggedIn={isLoggedIn} />
      </AppBar>
      <div className="class-divider mt-5 bg-light">
        <div className="text-center">
          <strong className="fs-3">Booking Console</strong>
          <img
            width="50"
            height="50"
            src=" https://icons.iconarchive.com/icons/paomedia/small-n-flat/256/calendar-clock-icon.png"
            alt="bookings"
          />
        </div>

        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={4}>
            <Select
              fullWidth
              variant="outlined"
              value={filters.bookingStatus}
              onChange={(e) =>
                setFilters({ ...filters, bookingStatus: e.target.value })
              }
            >
              <MenuItem value="">Filter by Booking Status</MenuItem>
              <MenuItem value="ACCEPTED">Accepted</MenuItem>
              <MenuItem value="REJECTED">Rejected</MenuItem>
              <MenuItem value="PENDING">Pending</MenuItem>
            </Select>
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              type="date"
              variant="outlined"
              placeholder="Filter by Booking Date"
              value={filters.bookingDate}
              onChange={(e) =>
                setFilters({ ...filters, bookingDate: e.target.value })
              }
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              type="text"
              variant="outlined"
              placeholder="Filter by Program Name"
              value={filters.event}
              onChange={(e) =>
                setFilters({ ...filters, event: e.target.value })
              }
            />
          </Grid>
        </Grid>

        <Grid container spacing={4} sx={{ marginTop: 4 }}>
          {filteredBookings.length > 0 ? (
            filteredBookings.map((booking, index) => (
              <Grid item xs={12} md={6} key={index}>
                <Paper
                  elevation={3}
                  sx={{
                    padding: 3,
                    textAlign: "center",
                    backgroundColor:
                      booking.bookingStatus === "ACCEPTED"
                        ? "#d4edda" // Green background for accepted bookings
                        : booking.bookingStatus === "REJECTED"
                        ? "#f8d7da" // Red background for rejected bookings
                        : "white", // Default background color
                  }}
                  className={`chat-message ${
                    booking.bookingStatus === "ACCEPTED"
                      ? "accepted"
                      : booking.bookingStatus === "REJECTED"
                      ? "rejected"
                      : "pending"
                  }`}
                >
                  <div className="message-content">
                   
                    <p className="message-inside-content">
                      {booking.eventName} Coordinator:{" "}
                      <span className="booking-values">
                        {booking.adminFirmName}
                      </span>
                    </p>
                    <p className="message-inside-content">
                      Program:{" "}
                      <span className="booking-values">
                        {booking.eventName}
                      </span>
                    </p>

                    <p className="message-inside-content">
                      Additional Services:{" "}
                      <span className="booking-values">
                        {booking.additionalServices}
                      </span>
                    </p>
                    <p className="message-inside-content">
                      PaymentAmount:{" "}
                      <span className="booking-values">
                        {booking.bookingAmount}
                      </span>
                    </p>
                    <p className="message-inside-content">
                      Booking Date:{" "}
                      <span className="booking-values">
                        {booking.bookingDate}
                      </span>
                    </p>
                    <p className="message-inside-content">
                      Booking Time:{" "}
                      <span className="booking-values">
                        {booking.bookingTime}
                      </span>
                    </p>
                    <p className="message-inside-content">
                      Booking Status:{" "}
                      <span
                        className={
                          booking.bookingStatus === "ACCEPTED"
                            ? "text-success"
                            : booking.bookingStatus === "REJECTED"
                            ? "text-danger"
                            : "text-warning"
                        }
                      >
                        {booking.bookingStatus !== "ACCEPTED" &&
                        booking.bookingStatus !== "REJECTED"
                          ? "PENDING"
                          : booking.bookingStatus}
                      </span>
                    </p>
                    {booking.bookingStatus === "ACCEPTED" && (
                      <p className="message-inside-content">
                        Contact Number:{" "}
                        <span className="text-dark booking-values">
                          {booking.adminContactNumber}
                        </span>
                      </p>
                    )}
                    <div className="text-right">
                    <IconButton
                      onClick={() => handleViewEventClick(booking.eventId)} // Corrected onClick
                    >
                      <RotateLeftIcon />
                    </IconButton>
                    </div>
                  </div>
                </Paper>
              </Grid>
            ))
          ) : (
            <Grid item xs={12} sx={{ textAlign: "center", marginTop: 4 }}>
              <Typography
                variant="body1"
                gutterBottom
                sx={{ color: "#6c757d", fontStyle: "italic" }}
              >
                No bookings available.
              </Typography>
            </Grid>
          )}
        </Grid>
      </div>

      <AppBar position="static" color="default" className="mt-5">
        <Footer />
      </AppBar>
    </div>
  );
};

export default BookingRequests;
