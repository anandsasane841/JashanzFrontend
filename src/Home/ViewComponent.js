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
      backgroundVideo.paused ? backgroundVideo.play() : backgroundVideo.pause();
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
      {isLoading ? (
        <CustomLoader />
      ) : (
        <div>
          <div className="class-divider">
            <Header isLoggedIn={isLoggedIn} />
          </div>
          <div className="container view-component-container">
            {loading ? (
              <div className="loader"></div>
            ) : (
              <div>
               <div className="card-body border rounded p-3  with-video-background">
               <div className="class-divider">
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
          style={{ borderRadius: '20px' }}
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
                  </div>
                  <div className="event-info class-divider">
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
                  </div>
                  <div className="additional-service  class-divider">
                    <label htmlFor="additionalService">
                      Choose Additional Services:
                    </label>
                    <select
                      id="additionalService"
                      name="additionalService"
                      value=""
                      onChange={handleServiceChange}
                      className="form-control bg-transparent"

                    >
                      <option value="">Select additional services</option>
                      {event.pricingDetails?.additionalServices?.map(
                        (service) => (
                          <option key={service.id}  value={service.serviceName}>
                            {service.serviceName} - ₹{service.price || "N/A"}
                          </option>
                        )
                      ) || []}
                    </select>
                    <div className="container text-right">
                      <button
                        className="button-yes"
                        onClick={calculateTotalPrice}
                      >
                        Calculate
                      </button>
                    </div>
                  </div>
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

          <div className="class-divider footer-section">
            <Footer />
          </div>
        </div>
      )}
      ;
    </div>
  );
};

export default ViewComponent;
