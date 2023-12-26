import React, { useState, useEffect } from "react";
import {
  Grid,
  Typography,
  Select,
  MenuItem,
  TextField,
  Card,
  CardContent,
} from "@material-ui/core";
import "./BookingRequests.css";
import Header from "../Header";
import Footer from "../Footer";
import JashanService from "../service/JashanService";

const BookingRequests = () => {
  const isLoggedIn = true;
  const [bookingData, setBookingData] = useState([]);
  const [userId, setUserId] = useState(null);

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

  return (
    <div>
      <div className="class-divider">
        <Header isLoggedIn={isLoggedIn} />
      </div>
      <div className="container">
        <Typography variant="h5" align="center" className="booking-heading mb-4">
          Booking Console📋
        </Typography>

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
              onChange={(e) => setFilters({ ...filters, event: e.target.value })}
            />
          </Grid>
        </Grid>

        <Grid container spacing={4}>
          {filteredBookings.length > 0 ? (
            filteredBookings.map((booking, index) => (
              <Grid item xs={12} md={6} key={index}>
                <div className="card mb-4">
                  <div className="text-center pt-4 pb-4">
                    <p className="card-text booking-text">
                    {booking.eventName} Coordinator:{" "}
                      <span className="booking-values">
                        {booking.adminFirmName}
                      </span>
                    </p>
                    <p className="card-text booking-text">
                      Program:{" "}
                      <span className="booking-values">{booking.eventName}</span>
                    </p>
                    <p className="card-text booking-text">
                      Additional Services:{" "}
                      <span className="booking-values">
                        {booking.additionalServices}
                      </span>
                    </p>
                    <p className="card-text booking-text">
                    PaymentAmount:{" "}
                      <span className="booking-values">
                        {booking.bookingAmount}
                      </span>
                    </p>
                    <p className="card-text booking-text">
                      Booking Date:{" "}
                      <span className="booking-values">
                        {booking.bookingDate}
                      </span>
                    </p>
                    <p className="card-text booking-text">
                      Booking Time:{" "}
                      <span className="booking-values">
                        {booking.bookingTime}
                      </span>
                    </p>
                    <p className="card-text booking-text">
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
                        {booking.bookingStatus !== "ACCEPTED" && booking.bookingStatus !== "REJECTED" ? "PENDING" : booking.bookingStatus}
                      </span>
                    </p>{" "}

                    {booking.bookingStatus === "Accepted" && (
                  <div>
                    <p className="card-text booking-text">
                      Contact Number:{" "}
                      <span className="text-dark">
                        {booking.adminContactNumber}
                      </span>
                    </p>
                  </div>
                )}
                  </div>
                </div>
             
              </Grid>
            ))
          ) : (
            <Typography variant="body1" className="text-right booking-text">
              No bookings found matching the selected filters.
            </Typography>
          )}
        </Grid>
      </div>
      <div className="class-divider ">
        <Footer />
      </div>
    </div>
  );
};

export default BookingRequests;
