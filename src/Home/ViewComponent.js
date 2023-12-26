import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import JashanService from "../service/JashanService";
import "./ViewComponent.css";
import ImageComponent from "./ImageComponent";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import Header from "../Header";
import BookingForm from "./BookingForm";
import Footer from "../Footer";
import CustomLoader from "../CustomLoader";
import { Button, Container } from "@material-ui/core";
import {  Select, MenuItem,  makeStyles } from '@material-ui/core';
const useStyles = makeStyles((theme) => ({
  additionalService: {
    // Add your custom styles here if needed
  },
  formControl: {
    width: '100%', // Make the form control width 100%
  },
  textRight: {
    textAlign: 'right',
  },
  buttonYes: {
    // Add your custom button styles here if needed
  },
}));
const ViewComponent = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const { eventid } = useParams();
  const [event, setEvent] = useState({});
  const [selectedServices, setSelectedServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalPrice, setTotalPrice] = useState(0);
  const [gst, setGST] = useState(0); // State to store the GST amount
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isLoggedIn = true;
  const [isLoading, setIsLoading] = useState(false);
  const videoRef = useRef();

  const playOrPause = () => {
    const video = videoRef.current;
    if (video) {
      video.paused ? video.play() : video.pause();
      const backgroundVideo = document.getElementById("video"); // Update the ID here
      if (backgroundVideo) {
        backgroundVideo.paused
          ? backgroundVideo.play()
          : backgroundVideo.pause();
      }
    }
  };

  useEffect(() => {
    setIsLoading(true);
    const token = localStorage.getItem("token");
    JashanService.get_EventById(eventid, token)
      .then((response) => {
        setEvent(response.data);
        setLoading(false);
      })
      .catch((error) => {
        navigate(`/error/${error.message}`);
        setLoading(false);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [eventid]);

  const handleServiceChange = (e) => {
    const selectedService = e.target.value;
    if (!selectedServices.includes(selectedService)) {
      setSelectedServices([...selectedServices, selectedService]);
    }
  };

  const calculateTotalPrice = () => {
    const basePrice = parseInt(event.pricingDetails?.basePrice) || 0;
    const selectedServicesTotal = selectedServices.reduce((total, service) => {
      const servicePrice =
        parseFloat(
          event.pricingDetails?.additionalServices.find(
            (s) => s.serviceName === service
          )?.price
        ) || 0;
      return total + servicePrice;
    }, 0);
    const totalPrice = basePrice + selectedServicesTotal;
    setTotalPrice(totalPrice);

    // Calculate GST at 18%
    const gstAmount = (totalPrice * 18) / 100;
    setGST(gstAmount);
  };

  const [bookingData, setBookingData] = useState(null);

  const handleBook = () => {
    // Create an object with the required data
    const data = {
      selectedServices,
      event,
      totalPrice,
      gst,
    };

    setBookingData(data);
    console.log(data);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <Container maxWidth="lg">
      {isLoading ? (
        <CustomLoader />
      ) : (
        <div>
          <Container className="class-divider">
            <Header isLoggedIn={isLoggedIn} />
          </Container>
          <div className="container view-component-container">
            {loading ? (
              <div className="loader"></div>
            ) : (
              <div>
                <div className="card-body border rounded p-3  with-video-background">
                  <Container className="class-divider">
                    <div className="video-background">
                      <video
                        id="video"
                        width="320"
                        height="240"
                        ref={videoRef}
                        onClick={playOrPause}
                        className="video-element"
                        loop
                      >
                        <source src={event.videoUrl} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                    </div>
                    <div className="video-container text-center">
                      <video
                        id="original-video"
                        width="60%"
                        height="40%"
                        style={{ borderRadius: "20px" }}
                        ref={videoRef}
                        onClick={playOrPause}
                      >
                        <source src={event.videoUrl} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                    </div>
                    <div className="event-icon">
                      <ImageComponent event={event} />
                    </div>
                  </Container>
                  <Container className="event-info class-divider">
                    <p className="booking-text">
                      Program:{" "}
                      <span className="booking-values">{event.eventType}</span>
                    </p>
                    <p className="booking-text">
                      Base Price:{" "}
                      <span className="booking-values">
                        ₹{event.pricingDetails?.basePrice || "N/A"}
                      </span>
                    </p>

                    <p className="booking-text">
                      State:{" "}
                      <span className="booking-values">
                        {event.address?.state || "N/A"}
                      </span>
                    </p>
                    <p className="booking-text">
                      City:{" "}
                      <span className="booking-values">
                        {event.address?.city || "N/A"}
                      </span>
                    </p>
                    <p className="booking-text">
                      {" "}
                      PinCode:{" "}
                      <span className="booking-values">
                        {event.address?.pinCode || "N/A"}
                      </span>
                    </p>

                    <p className="booking-text">
                      Landmark:{" "}
                      <span className="booking-values">
                        {event.address?.landmark || "N/A"}
                      </span>
                    </p>
                    {selectedServices.length > 0 && (
                      <div className="selected-services">
                        <p>Selected Services:</p>
                        <ul>
                          {selectedServices.map((service, index) => (
                            <li key={index}>
                              {service} - ₹
                              {event.pricingDetails?.additionalServices.find(
                                (s) => s.serviceName === service
                              )?.price || "N/A"}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {totalPrice > 0 && (
                      <div>
                        <p className="booking-text">
                          Total Price:{" "}
                          <span className="booking-values">₹{totalPrice}</span>
                        </p>
                        <p className="booking-text">
                          GST (18%):{" "}
                          <span className="booking-values">₹{gst}</span>
                        </p>
                        <p className="text-dark booking-values">
                          Grand Total:{" "}
                          <span className="text-light booking-values">
                            ₹{totalPrice + gst}
                          </span>
                        </p>
                      </div>
                    )}
                  </Container>
                  <Container className={`additional-service ${classes.additionalService} class-divider`}>
      <label htmlFor="additionalService">Choose Additional Services:</label>
      <Select
        id="additionalService"
        name="additionalService"
        value=""
        onChange={handleServiceChange}
        className={`form-control bg-transparent ${classes.formControl}`}
      >
        <MenuItem value="">Select additional services</MenuItem>
        {event.pricingDetails?.additionalServices?.map((service) => (
          <MenuItem key={service.id} value={service.serviceName}>
            {service.serviceName} - ₹{service.price || 'N/A'}
          </MenuItem>
        )) || []}
      </Select>
      <Container  className="text-right">
        <Button
          variant="contained"
          color="success"
          onClick={calculateTotalPrice}
        >
          Calculate
        </Button>
      </Container>
    </Container>
                  {event.eventType === "Disc Jockey" && (
                    <div className="alert alert-warning" role="alert">
                      In India, the engagement of DJ services necessitates
                      obtaining official permission from a designated police
                      officer.In industrial areas, the permissible limit is 75
                      dB for daytime and 70 dB at night. In commercial areas, it
                      is 65 dB and 55 dB, while in residential areas it is 55 dB
                      and 45 dB during daytime and night respectively.
                      Therefore, day time noise standard prescribed for
                      residential areas in India is 55 dB.
                    </div>
                  )}
                  <div className="container text-center">
                    <button
                      type="button"
                      className="button-yes"
                      onClick={handleBook}
                    >
                      Book
                    </button>
                    {isModalOpen && (
                      <div class="modal-dialog">
                        <div className="modal-overlay">
                          <div className="modal-content">
                            <span className="modal-close" onClick={closeModal}>
                              &times;
                            </span>
                            <BookingForm
                              selectedServices={selectedServices}
                              event={event}
                              totalPrice={totalPrice}
                              gst={gst}
                              onModalClose={closeModal}
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>

          <Container className="class-divider footer-section">
            <Footer />
          </Container>
        </div>
      )}
      ;
    </Container>
  );
};

export default ViewComponent;
