import React, { useEffect, useState, useRef } from "react";
import swal from "sweetalert";
import JashanService from "../../service/JashanService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDownload,
  faMapMarker,
  faFlag,
  faBuilding,
} from "@fortawesome/free-solid-svg-icons";
import {
  Paper,
  Button,
  Typography,
  Container,
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Card,
  CardContent,
  CardMedia,
  IconButton,
} from "@mui/material";
import QRCode from "qrcode.react";

const EventInfo = ({ event }) => {
  const url = "https://www.jashanz.com/bookevent/" + event.id;

  const qrCodeProps = {
    value: url,
    size: 128,
    fgColor: "#000000",
    imageSettings: {
      src: "https://jashanzprimary.s3.ap-south-1.amazonaws.com/JashanzLogo.png",
      height: 30,
      width: 30,
      excavate: true,
    },
  };
  const videoRef = useRef();

  const playOrPause = () => {
    const video = videoRef.current;
    if (video) video.paused ? video.play() : video.pause();
  };

  const handleDeleteEvent = () => {
    swal({
      title: "Are you sure you want to delete this event?",
      text: "This action cannot be undone.",
      icon: "warning",
      buttons: ["Cancel", "Delete"],
      dangerMode: true,
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
    <Paper  style={{ backgroundColor: '#f0f3f5', }}>
    <Container>
        <Typography variant="h4" gutterBottom>
          {event.eventType}
        </Typography>
        <Container>
          <video
            id="video"
            width="100%"
            height="auto"
            ref={videoRef}
            onClick={playOrPause}
            style={{ borderRadius: "20px" }}
          >
            <source src={event.videoUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </Container>

        <Container>
          <div
            id="carouselExampleControls"
            class="carousel slide mt-5"
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
                    style={{ borderRadius: "20px" }}
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
              <span
                class="carousel-control-prev-icon"
                aria-hidden="true"
              ></span>
              <span class="visually-hidden">Previous</span>
            </button>
            <button
              class="carousel-control-next"
              type="button"
              data-bs-target="#carouselExampleControls"
              data-bs-slide="next"
            >
              <span
                class="carousel-control-next-icon"
                aria-hidden="true"
              ></span>
              <span class="visually-hidden">Next</span>
            </button>
          </div>
        </Container>

        <Card sx={{ maxWidth: "100%", borderRadius: "20px", marginY: "3rem" }}>
          <CardContent>
            {/* Additional Services */}
            <div>
              <Typography variant="h5" className="mt-3">
                Additional Services
              </Typography>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Service Name</TableCell>
                      <TableCell>Price</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {event.pricingDetails.additionalServices.map((service) => (
                      <TableRow key={service.id}>
                        <TableCell>{service.serviceName}</TableCell>
                        <TableCell>&#8377; {service.price}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>

            {/* Pricing Details */}
            <div>
              <Typography variant="h6" className="mt-3">
                Pricing Details
              </Typography>
              <Typography variant="body1">
                Base Price: {event.pricingDetails.basePrice}
              </Typography>
            </div>

            {/* Address */}
            <div>
              <Typography variant="h5" className="mt-3">
                Address
              </Typography>
              <Typography>
                <FontAwesomeIcon icon={faMapMarker} className="mr-2 ml-3" />{" "}
                Country: {event.address.country}
                <FontAwesomeIcon
                  icon={faFlag}
                  className="mr-2 ml-3"
                /> State: {event.address.state}
                <FontAwesomeIcon icon={faBuilding} className="mr-2 ml-3" />{" "}
                City: {event.address.city}
              </Typography>
            </div>

            <div className="text-right">
              <Button
                variant="contained"
                color="error"
                onClick={handleDeleteEvent}
              >
                <FontAwesomeIcon icon="trash-alt" className="mr-2" /> Delete
              </Button>
            </div>
          </CardContent>
        </Card>
      </Container>
      <Container maxWidth="sm">
        {url && <QRCode id="qrcode-canvas" {...qrCodeProps} />}
        <Typography variant="body2" color="textSecondary">
          We've introduced dynamic QR codes for your events.Take Screenshot and
          Share them with customers for direct webpage access upon login. QR
          codes automatically update with each event change, ensuring ongoing
          convenience
        </Typography>
      </Container>
    </Paper>
  );
};

export default EventInfo;
