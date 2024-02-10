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
import {
  AppBar,
  Alert,
  AlertTitle,
  Typography,
  Button,
  Container,
  Select,
  MenuItem,
  Grid,
} from "@mui/material";

const ViewComponent = () => {
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
    <div>
        <AppBar position="static" color="default" style={{ height: '80px' }}>
    <Header isLoggedIn={isLoggedIn} />
</AppBar>
      <Container maxWidth="lg" className="mt-5">
        {isLoading ? (
          <CustomLoader />
        ) : (
          <div>
            <div className="container view-component-container">
              {loading ? (
                <div className="loader"></div>
              ) : (
                <div>
                  <div className="card-body border rounded p-3 with-video-background">
                    <Container>
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
                      <div className="video-container text-center mt-3">
                        <video
                          id="original-video"
                          ref={videoRef}
                          onClick={playOrPause}
                        >
                          <source src={event.videoUrl} type="video/mp4" />
                          Your browser does not support the video tag.
                        </video>
                      </div>
                      <div className="video-container mt-3">
                        <ImageComponent event={event} />
                      </div>
                    </Container>
                    <Container
                      className="event-info text-center mt-3"
                      style={{
                        background: "rgba(0, 0, 0, 0.1)",
                        padding: "20px",
                        borderRadius: "10px",
                        color: "white",
                        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                      }}
                    >
                      <Grid container spacing={2} >
                        <Grid item xs={12} sm={6}>
                          <p className="booking-text text-light">
                            Program:{" "}
                            <span className="booking-values text-white">
                              {event.eventType}
                            </span>
                          </p>
                          <p className="booking-text text-light">
                            Base Price:{" "}
                            <span className="booking-values text-white">
                              ₹{event.pricingDetails?.basePrice || "N/A"}
                            </span>
                          </p>
                          <p className="booking-text text-light">
                            State:{" "}
                            <span className="booking-values text-white">
                              {event.address?.state || "N/A"}
                            </span>
                          </p>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <p className="booking-text text-light">
                            City:{" "}
                            <span className="booking-values text-white">
                              {event.address?.city || "N/A"}
                            </span>
                          </p>
                          <p className="booking-text text-light">
                            PinCode:{" "}
                            <span className="booking-values text-white">
                              {event.address?.pinCode || "N/A"}
                            </span>
                          </p>
                          <p className="booking-text text-light">
                            Landmark:{" "}
                            <span className="booking-values text-white">
                              {event.address?.landmark || "N/A"}
                            </span>
                          </p>
                        </Grid>
                        {selectedServices.length > 0 && (
                          <Grid item xs={12}>
                            <div className="selected-services">
                              <Typography
                                variant="h6"
                                style={{
                                  fontWeight: "bold",
                                  marginBottom: "10px",
                                }}
                              >
                                Selected Services:
                              </Typography>
                              <div className="booking-text">
                                <ul
                                  style={{
                                    listStyleType: "disc",
                                    paddingLeft: "20px",
                                  }}
                                >
                                  {selectedServices.map((service, index) => (
                                    <li key={index} className="text-white">
                                      {service} - ₹
                                      {event.pricingDetails?.additionalServices.find(
                                        (s) => s.serviceName === service
                                      )?.price || "N/A"}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                          </Grid>
                        )}

                        {totalPrice > 0 && (
                          <Grid item xs={12}>
                            <div>
                              <Typography variant="h6" className="booking-text text-light">
                                Total Price:{" "}
                                <span className="booking-values text-white">
                                  ₹{totalPrice}
                                </span>
                              </Typography>
                              <Typography variant="h6" className="booking-text text-light">
                                GST (18%):{" "}
                                <span className="booking-values text-white">₹{gst}</span>
                              </Typography>
                              <Typography
                                variant="h5"
                                className="booking-values text-light"
                              >
                                Grand Total:{" "}
                                <span className="booking-values text-white">
                                  ₹{totalPrice + gst}
                                </span>
                              </Typography>
                            </div>
                          </Grid>
                        )}
                      </Grid>
                      <Grid
                        container
                        spacing={2}
                        className={`additional-service`}
                      >
                        <Grid item xs={12}>
                          <Typography
                            variant="subtitle1"
                            component="label"
                            htmlFor="additionalService"
                            style={{
                              color: "white",
                              marginTop: "10px",
                              display: "block",
                            }}
                          >
                            Choose Additional Services:
                          </Typography>

                          <Select
                            id="additionalService"
                            name="additionalService"
                            value=""
                            onChange={handleServiceChange}
                            className={`form-control bg-transparent`}
                          >
                            <MenuItem value="" style={{ color: "black" }}>
                              Select additional services
                            </MenuItem>
                            {event.pricingDetails?.additionalServices?.map(
                              (service) => (
                                <MenuItem
                                  key={service.id}
                                  value={service.serviceName}
                                  style={{ color: "black" }}
                                >
                                  {service.serviceName} - ₹
                                  {service.price || "N/A"}
                                </MenuItem>
                              )
                            ) || []}
                          </Select>
                        </Grid>
                        <Grid item xs={12} className="text-right">
                          <Button
                            variant="contained"
                            color="primary"
                            style={{ backgroundColor: "#0daefb" }}
                            onClick={calculateTotalPrice}
                          >
                            Calculate
                          </Button>
                        </Grid>
                      </Grid>
                    </Container>

                    <Container>
                      {event.eventType === "Disc Jockey" && (
                        <Alert severity="warning" style={{ margin: "16px" }}>
                          <AlertTitle>Attention</AlertTitle> In India, the
                          engagement of DJ services necessitates obtaining
                          official permission from a designated police
                          officer.In industrial areas, the permissible limit is
                          75 dB for daytime and 70 dB at night. In commercial
                          areas, it is 65 dB and 55 dB, while in residential
                          areas it is 55 dB and 45 dB during daytime and night
                          respectively. Therefore, day time noise standard
                          prescribed for residential areas in India is 55 dB.
                        </Alert>
                      )}
                    </Container>
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
                              <span
                                className="modal-close"
                                onClick={closeModal}
                              >
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
          </div>
        )}
      </Container>

      <AppBar position="static" color="default" className="mt-5">
      <Footer />
      </AppBar>
      
  
    </div>
  );
};

export default ViewComponent;
