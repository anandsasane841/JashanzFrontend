import React, { useEffect, useState, useRef } from "react";
import swal from "sweetalert";
import JashanService from "../../service/JashanService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMapMarker,
  faFlag,
  faBuilding,
} from "@fortawesome/free-solid-svg-icons";

const EventInfo = ({ event }) => {
  const [imageDataList, setImageDataList] = useState([]);
  const videoRef = useRef();

  const playOrPause = () => {
    const video = videoRef.current;
    if (video) video.paused ? video.play() : video.pause();
  };

  useEffect(() => {
    /*
    const token = localStorage.getItem('admin-token');
    JashanService.getImageById(event.id, token)
      .then((response) => {
        console.log("DATA "+response.data);
        setImageDataList(response.data); // Expect response.data to be an array of image URLs
      })
      .catch((error)=>{
       console.log("Find Image By Id is Working phase");
      });

       */
  }, [event.id]);

  const handleDeleteEvent = () => {
    swal({
      title: "Are you sure you want to delete this event?",
      text: "You won't be able to revert this!",
      icon: "warning",
      buttons: ["No, cancel", "Yes, delete it"],
    }).then((willDelete) => {
      if (willDelete) {
        const token = localStorage.getItem("admin-token");
        JashanService.delete_Event(event.id, token)
          .then((response) => {
            console.log(response);
            swal("Deleted!", "The event has been deleted.", "success");
            window.location.reload();
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        swal("Cancelled", "The event is safe.", "error");
      }
    });
  };

  return (
    <div className="mb-4">
      <p className="booking-values text-dark fs-3">{event.eventType}</p>
      <div className="class-divider">
      <div>
        <video
          id="video"
          width="60%"
          height="40%"
          ref={videoRef}
          onClick={playOrPause}
          style={{ borderRadius: '20px' }}
         >
          <source src={event.videoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      <div style={{
        width: "60%",
        height: "40%",
        margin: "auto",
      }}>
        <div
          id="carouselExampleControls"
          class="carousel slide"
          data-bs-ride="carousel"
        >
          <div class="carousel-inner">
            {event.images.map((image, index) => (
              <div
                key={index}
                className={`carousel-item ${index === 0 ? "active" : ""}`}
              >
                <img
                  src={image.imgUrl}
                  class="d-block w-100"
                  alt={`image-${index}`}
                  style={{ borderRadius: '20px' }}

                />
              </div>
            ))}
          </div>
          <button
            class="carousel-control-prev "
            type="button"
            data-bs-target="#carouselExampleControls"
            data-bs-slide="prev"
          >
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
          </button>
          <button
            class="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleControls"
            data-bs-slide="next"
          >
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
          </button>
        </div>
      </div>
      </div>

      {/* Additional Services */}
      <div className="class-divider">
        <div>
          <div className="profile-details">
            <h2 className="mt-3">Additional Services</h2>
            <table className="table table-bordered mt-3">
              <thead>
                <tr>
                  <th>Service Name</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                {event.pricingDetails.additionalServices.map((service) => (
                  <tr key={service.id}>
                    <td>{service.serviceName}</td>
                    <td>&#8377; {service.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pricing Details */}
        <div>
          <h4 className="mt-3">Pricing Details</h4>
          <p>Base Price: {event.pricingDetails.basePrice}</p>
        </div>

        {/* Address */}
        <div className="profile-details border">
          <h2 className="mt-3">Address</h2>
          <div>
            <p>
              <FontAwesomeIcon icon={faMapMarker} className="mr-2 ml-3" />{" "}
              Country: {event.address.country}
              <FontAwesomeIcon
                icon={faFlag}
                className="mr-2 ml-3"
              /> State: {event.address.state}
              <FontAwesomeIcon
                icon={faBuilding}
                className="mr-2 ml-3"
              /> City: {event.address.city}
            </p>
          </div>
        </div>
      </div>

      <div className="text-right">
        <button className="button-no" onClick={handleDeleteEvent}>
          <i className="fas fa-trash-alt"></i> Delete
        </button>
      </div>
    </div>
  );
};

export default EventInfo;
