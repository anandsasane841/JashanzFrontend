import React, { useState, useEffect } from "react";
import {
  Paper,
  Container,
  Grid,
  TextField,
  Button,
  Typography,
} from "@mui/material";
import { Check, Clear } from "@mui/icons-material";
import JashanService from "../../service/JashanService";
import "./CustomerInteraction.css";

const CustomerInteraction = () => {
  const [bookingData, setBookingData] = useState([]);
  const [acceptDisabled, setAcceptDisabled] = useState(false);
  const [rejectDisabled, setRejectDisabled] = useState(false);
  const [filters, setFilters] = useState({
    bookingDate: "",
  });
  const [statusFilter, setStatusFilter] = useState("");
  const [bookingMessages, setBookingMessages] = useState({});

  useEffect(() => {
    const token = localStorage.getItem("admin-token");
    JashanService.get_current_admin(token)
      .then((response) => {
        return JashanService.customer_booking_requests(response.data.id, token);
      })
      .then((res) => {
        setBookingData(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleAccept = (bookingId) => {
    setAcceptDisabled(true);
    setRejectDisabled(true);
    const successMessage = "You have successfully ACCEPTED Booking";
    setBookingMessages((prevMessages) => ({
      ...prevMessages,
      [bookingId]: { message: successMessage, color: "green" },
    }));

    const token = localStorage.getItem("admin-token");

    JashanService.acceptBooking(bookingId, token)
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleReject = (bookingId) => {
    setAcceptDisabled(true);
    setRejectDisabled(true);
    const errorMessage = "You have successfully REJECTED Booking";
    setBookingMessages((prevMessages) => ({
      ...prevMessages,
      [bookingId]: { message: errorMessage, color: "red" },
    }));

    const token = localStorage.getItem("admin-token");

    JashanService.rejectBooking(bookingId, token)
      .then((res) => {
        console.log(res);
        setBookingMessages((prevMessages) => ({
          ...prevMessages,
          [bookingId]: {
            message: errorMessage,
            color: "red",
          },
        }));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const filteredBookingData = bookingData.filter((booking) => {
    return (
      (!filters.bookingDate ||
        new Date(booking.bookingDate).toDateString() ===
          new Date(filters.bookingDate).toDateString()) &&
      (!statusFilter || booking.bookingStatus === statusFilter)
    );
  });

  return (
    <Paper  style={{ backgroundColor: '#f0f3f5', }}>
    <Container component="main" maxWidth="md">
        <Grid container spacing={2} justifyContent="center" alignItems="center">
          <Grid item xs={12} sm={6}>
            <TextField
              className="mb-2"
              type="date"
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
              value={filters.bookingDate}
              onChange={(e) =>
                setFilters({ ...filters, bookingDate: e.target.value })
              }
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              className="mb-2"
              select
              fullWidth
              label="Booking Status"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              SelectProps={{
                native: true,
              }}
            >
              <option value="">All</option>
              <option value="ACCEPTED">Accepted</option>
              <option value="REJECTED">Rejected</option>
              <option value="PENDING">Pending</option>
            </TextField>
          </Grid>
        </Grid>

        
        <div className="chat-container">
          {filteredBookingData.length > 0 ? (
            filteredBookingData.map((booking) => (
              <div
                key={booking.id}
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
                    {" "}
                    Customer ID: {booking.id}
                  </p>
                  <p className="message-inside-content">
                    Additional Services: {booking.additionalServices}
                  </p>
                  <p className="message-inside-content">
                    {" "}
                    Booking Date: {booking.bookingDate}
                  </p>

                  {booking.bookingStatus === "ACCEPTED" && (
                    <p className="message-inside-content">
                      Contact Number: {booking.customerContactNumber}
                    </p>
                  )}

                  <p className="message-inside-content">
                    Booking Time: {booking.bookingTime}
                  </p>

                  {bookingMessages[booking.id] && (
                    <Typography
                      style={{ color: bookingMessages[booking.id].color }}
                    >
                      {bookingMessages[booking.id].message}
                    </Typography>
                  )}

                  <div className="action-buttons">
                    {booking.bookingStatus === "ACCEPTED" ? (
                      <Typography variant="h6" color="primary">
                        Booking has been confirmed.
                      </Typography>
                    ) : booking.bookingStatus === "REJECTED" ? (
                      <Typography variant="h6" color="error">
                        Booking has been declined.
                      </Typography>
                    ) : (
                      <div>
                        <Button
                          variant="contained"
                          color="success"
                          onClick={() => handleAccept(booking.id)}
                          disabled={acceptDisabled}
                          style={{ marginRight: "10px" }}
                        >
                          <Check /> Accept
                        </Button>
                        <Button
                          variant="contained"
                          color="error"
                          onClick={() => handleReject(booking.id)}
                          disabled={rejectDisabled}
                        >
                          <Clear /> Reject
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <Typography variant="h6" color="textPrimary">
              No matching requests for the selected date and status
            </Typography>
          )}
        </div>
      </Container>
    </Paper>
  );
};

export default CustomerInteraction;
