import React, { useState, useEffect } from "react";
import "./CustomerInteraction.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import JashanService from "../../service/JashanService";

const CustomerInteraction = () => {
  const [bookingData, setBookingData] = useState([]);
  const [adminId, setAdminId] = useState(null);
  const [acceptDisabled, setAcceptDisabled] = useState(false);
  const [rejectDisabled, setRejectDisabled] = useState(false);
  const [filters, setFilters] = useState({
    bookingDate: "", // Initial state for the date filter
  });

  useEffect(() => {
    const token = localStorage.getItem("admin-token");
    JashanService.get_current_admin(token)
      .then((response) => {
        setAdminId(response.data.id);
        return JashanService.customer_booking_requests(response.data.id, token);
      })
      .then((res) => {
        setBookingData(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const [bookingMessages, setBookingMessages] = useState({});

  const handleAccept = (bookingId) => {
   
    setAcceptDisabled(true);
    setRejectDisabled(true);
    const successMessage = "You have successfully Accepted Booking";
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
    const errorMessage = "You have successfully Rejected Booking";
    setBookingMessages((prevMessages) => ({
      ...prevMessages,
      [bookingId]: { message: errorMessage, color: "red" },
    }));

    const token = localStorage.getItem("admin-token");

    JashanService.rejectBooking(bookingId, token)
    .then((res) => {
      console.log(res);
    

    

      // Set the state to trigger the rendering of PaymentRefund
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
      !filters.bookingDate ||
      new Date(booking.bookingDate).toDateString() ===
        new Date(filters.bookingDate).toDateString()
    );
  });
  return (
    <div className="container fs-5">
       <div className="row mb-4">
        <div className="col">
          <input
            type="date"
            className="form-control"
            placeholder="Filter by Booking Date"
            value={filters.bookingDate}
            onChange={(e) =>
              setFilters({ ...filters, bookingDate: e.target.value })
            }
          />
        </div>
      </div>
      <div className="row">
      {filteredBookingData.length > 0 ? (
        filteredBookingData.map((booking) => (
          <div
            key={booking.id}
            className="col-12 col-md-5  messages__item messages__item--operator mt-3"
          >
                <div className="alert alert-light">
                  <div>
                    <p className="booking-text">
                      <strong>Customer ID:</strong>{" "}
                      <span className="booking-values">{booking.id}</span>
                    </p>
                  </div>

                  
                  <div>
                    <p className="booking-text">
                      <strong>Additional Services:</strong>{" "}
                      <span className="booking-values">
                        {booking.additionalServices}
                      </span>
                    </p>
                  </div>
                  <div>
                    <p className="booking-text">
                      <strong>Total Amount (with GST):</strong>{" "}
                      <span className="booking-values">
                        {booking.bookingAmount}
                      </span>
                    </p>
                  </div>
                  <div>
                    <p className="booking-text">
                      <strong>Booking Date:</strong>{" "}
                      <span className="booking-values">
                        {booking.bookingDate}
                      </span>
                    </p>
                  </div>
                 
                 {booking.bookingResponse === "Accepted" && (
                  <div>
                    <p className="booking-text">
                      <strong>Contact Number:</strong>{" "}
                      <span className="booking-values text-dark">
                        {booking.customerContactNumber}
                      </span>
                    </p>
                  </div>
                )}
                  
                  <div>
                    <p className="booking-text">
                      <strong>Booking Time:</strong>{" "}
                      <span className="booking-values">
                        {booking.bookingTime}
                      </span>
                    </p>
                  </div>

                  {bookingMessages[booking.id] && (
                    <div className="mt-2">
                      <p style={{ color: bookingMessages[booking.id].color }}>
                        {bookingMessages[booking.id].message}
                      </p>
                    </div>
                  )}
                </div>
                <div className="action-buttons pb-3">
                  {booking.bookingResponse === "Accepted" ? (
                    <p className="fs-3 text-dark">
                      This request is already Accepted
                    </p>
                  ) : booking.bookingResponse === "Rejected" ? (
                    <p className="fs-3 text-danger">
                      This request is already Rejected
                    </p>
                  ) : (
                    <div>
                      <button
                        className="btn btn-success accept-button"
                        onClick={() => handleAccept(booking.id)}
                        disabled={acceptDisabled}
                      >
                        <FontAwesomeIcon icon={faCheck} /> Accept
                      </button>
                      <button
                        className="btn btn-danger reject-button ml-5"
                        onClick={() => handleReject(booking.id)}
                        disabled={rejectDisabled}
                      >
                        <FontAwesomeIcon icon={faTimes} /> Reject
                      </button>
                    </div>
                  )}
                </div>
              </div>
          ))
          ) : (
            <p className="fs-3 text-dark">No matching requests for the selected date</p>
          )}
          </div>
    </div>
  );
};

export default CustomerInteraction;
