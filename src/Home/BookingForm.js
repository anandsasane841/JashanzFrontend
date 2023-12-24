import React, { useState, useEffect } from "react";
import "./ViewComponent.css";
import JashanService from "../service/JashanService";
import { useNavigate } from "react-router-dom";
import PaymentGateway from "./PaymentGateway";


const BookingForm = ({
  selectedServices, // This should be an array of selected services
  event,
  totalPrice,
  gst,
  onModalClose,
}) => {
  const navigate = useNavigate();
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [customerData, setCustomerData] = useState({});
  const [bookingData, setBookingData] = useState({
    adminId: null,
    adminFirmName: "",
    adminContactNumber:"",
    pricingDetailsId: null,
    eventId: null,
    customerId: "",
    customerEmail: "",
    customerContactNumber: "",
    eventName: "",
    pricingDetails: "",
    additionalServices: "", // No need to set this here
    bookingDate: "",
    bookingTime: "",
    paymentStatus: "",
    bookingAmount: 0,
    bookingCharge:0,
    paymentId:"",
  });
  const [selectedServicesState, setSelectedServices] = useState([]); // Rename the state variable
  const [showPayment, setShowPayment] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem("token");

    // Fetch customer data only if it hasn't been fetched yet
    if (!customerData.id) {
      JashanService.get_current_user(token)
        .then((response) => {
          setCustomerData(response.data);
        })
        .catch((error) => {
          navigate(`/error/${error.message}`);
        });
    }
  }, [customerData, navigate]);

  useEffect(() => {
    // Set bookingData once all the required data is available
    if (event && customerData.id) {
      setBookingData({
        adminId: event.admin.id,
        adminFirmName: event.admin.firmName,
        adminContactNumber:event.admin.mobileNumber,
        pricingDetailsId: event.pricingDetails.id,
        eventId: event.id,
        customerId: customerData.id,
        customerEmail: customerData.email,
        customerContactNumber: customerData.mobileNumber,
        eventName: event.eventType,
        pricingDetails: event.pricingDetails.basePrice,
        additionalServices: selectedServicesState.join(", "), // Update with selected services
        bookingDate: bookingData.bookingDate, // Set the actual date and time values
        bookingTime: bookingData.bookingTime, // Set the actual date and time values
        paymentStatus: "Paid",
        bookingAmount: (totalPrice+gst),
        bookingCharge: getAmountForEventType(event.eventType),
        paymentId: bookingData.paymentId,
      });
    }
  }, [
    event,
    customerData,
    totalPrice,
    bookingData.bookingDate,
    bookingData.bookingTime,
    selectedServicesState,

  ]);

  const getAmountForEventType = (eventType) => {
    const eventTypeAmounts = {
      "Birthday": 99,
      "Marriage Ceremony": 499,
      "Disc Jockey": 399,
      "Occasion Organizers": 499,
      "Get Together or Party": 499,
    };
  
    return eventTypeAmounts[eventType] || 0; 
  };

  const handleConfirmBooking = (event) => {
    event.preventDefault();
    if (paymentStatus !== "success") {
      return;
    }
    const token = localStorage.getItem("token");
    console.log("booking data " + bookingData);
    JashanService.customer_booking(bookingData, token)
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });

    console.log(bookingData);
    setBookingConfirmed(true);
    
  };

  // Function to toggle selected services
  const toggleServiceSelection = (service) => {
    if (selectedServicesState.includes(service)) {
      // If already selected, remove it
      setSelectedServices(selectedServicesState.filter((s) => s !== service));
    } else {
      // If not selected, add it
      setSelectedServices([...selectedServicesState, service]);
    }
  };

  const [paymentStatus, setPaymentStatus] = useState("Pending");

  const handlePaymentStatus = (status) => {
    setPaymentStatus(status);

    // Update paymentStatus in bookingData
    setBookingData({ ...bookingData, paymentStatus: status });
  };


 
  


  const timeSlots = [
    '12:00 AM', '12:30 AM', '01:00 AM', '01:30 AM',
    '02:00 AM', '02:30 AM', '03:00 AM', '03:30 AM',
    '04:00 AM', '04:30 AM', '05:00 AM', '05:30 AM',
    '06:00 AM', '06:30 AM', '07:00 AM', '07:30 AM',
    '08:00 AM', '08:30 AM', '09:00 AM', '09:30 AM',
    '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
    '12:00 PM', '12:30 PM', '01:00 PM', '01:30 PM',
    '02:00 PM', '02:30 PM', '03:00 PM', '03:30 PM',
    '04:00 PM', '04:30 PM', '05:00 PM', '05:30 PM',
    '06:00 PM', '06:30 PM', '07:00 PM', '07:30 PM',
    '08:00 PM', '08:30 PM', '09:00 PM', '09:30 PM',
    '10:00 PM', '10:30 PM', '11:00 PM', '11:30 PM',
  ];

  return (
    <form onSubmit={handleConfirmBooking}>
      <div className="receipt">
        {bookingConfirmed ? (
          <div className="receipt-confirmed">
            <h2>Booking Confirmed!</h2>
            <button className="btn btn-primary" onClick={onModalClose}>
              Close
            </button>
          </div>
        ) : (
          <div className="receipt-details">
            <div className="container">
              <h2>Booking Information</h2>
              <p className="text-dark fs-5">Customer Name: <span className="booking-text">{customerData.name}</span> </p>
              <p className="text-dark fs-5">Customer Contact Number: <span className="booking-text">{customerData.mobileNumber}</span></p>
            </div>

            <div className="class-divider">
              <h2>Selected Services and Total Price</h2>
              <ul className="list-group">
                <div className="alert alert-info fs-4" role="alert">
                  Please select the checkboxes next to the services you wish to
                  include.
                </div>
                {event.pricingDetails.additionalServices.map(
                  (service, index) => (
                    <li className="list-group-item" key={index}>
                      <label class="fs-5">
                        <input
                          type="checkbox"
                          class="form-check-input"
                          checked={selectedServicesState.includes(
                            service.serviceName
                          )}
                          onChange={() =>
                            toggleServiceSelection(service.serviceName)
                          }
                        />
                        {service.serviceName} - <span className="booking-text"> ₹{service.price}</span>
                      </label>
                    </li>
                  )
                )}
              </ul>
              <p className="text-dark fs-4">Total Price:<span className="booking-text fs-5"> ₹{totalPrice} </span></p>
              <p className="text-dark fs-4">GST (18%): <span className="booking-text fs-5"> ₹{gst} </span></p>
              <p className="text-dark fs-4">Grand Total Price:<span className="booking-text fs-5"> ₹{totalPrice+gst} </span></p>

            </div>

            <div className="class-divider">
              <h2>Date and Time Selection</h2>
              <div className="form-group">
                <label htmlFor="bookingDate">Booking Date</label>
                <input
                  type="date"
                  id="bookingDate"
                  className="form-control"
                  value={bookingData.bookingDate}
                  onChange={(e) =>
                    setBookingData({
                      ...bookingData,
                      bookingDate: e.target.value,
                    })
                  }
                  required
                />
              </div>
              <div className="form-group">
              <label htmlFor="bookingTime">Booking Time</label>
                <select
                  id="bookingTime"
                  className="form-select"
                  value={bookingData.bookingTime}
                  onChange={(e) =>
                    setBookingData({
                      ...bookingData,
                      bookingTime: e.target.value,
                    })
                  }
                  required
                >
                  <option value="">Select a time</option>
                  {timeSlots.map((timeSlot, index) => (
                    <option key={index} value={timeSlot}>
                      {timeSlot}
                    </option>
                  ))}
                </select>
              </div>
             {  paymentStatus !== "Pending" && (
              <p className={`fs-5 ${paymentStatus === "success" ? "text-success" : "text-danger"}`}>
                {paymentStatus === "success" ? "Payment Success" : "Payment Failed"}
              </p>
            )}
            </div>
           
            <div className="class-divider form-group bg-success">
            <PaymentGateway
                className="form-control"
                paymentStatus={paymentStatus}
                handlePaymentStatus={handlePaymentStatus}
                eventType={event.eventType}
                onPaymentIdGenerated={(paymentId) => {
                  setBookingData((prevData) => ({
                    ...prevData,
                    paymentId: paymentId,
                  }));
                }}
              />
            </div>

            <button className="button-yes mr-5" type="submit">
              Confirm Booking
            </button>
            <button className="button-no ml-5" onClick={onModalClose}>
              Close
            </button>
          </div>
        )}
      </div>
    </form>
  );
};

export default BookingForm;
