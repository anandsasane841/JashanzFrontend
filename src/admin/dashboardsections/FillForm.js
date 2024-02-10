import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import swal from "sweetalert";
import JashanService from "../../service/JashanService";
import { useNavigate } from "react-router-dom";
import "./FillForm.css";
import { stateCityData } from "./StateandCities";
import {
  Alert,
  LinearProgress,
  Box,
  TextField,
  Button,
  Typography,
  Container,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Paper,
} from "@mui/material";

const FillForm = ({ onEventAdded }) => {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);
  const [showProgressBar, setShowProgressBar] = useState(false);
  const [eventData, setEventData] = useState({
    pricingDetails: {
      basePrice: "",
      additionalServices: [{ serviceName: "", price: "" }],
    },
    address: {
      country: "India",
      state: "",
      city: "",
      pinCode: "",
      landmark: "",
    },
    images: [],
  });
  const [error, setError] = useState(null);
  const [videoData, setVideoData] = useState({ video: null, duration: 0 });

  const handleInputChange = (
    e,
    field,
    subfield = null,
    subindex = null,
    subsubfield = null
  ) => {
    setEventData((prevData) => {
      const updatedData = { ...prevData };
      if (subfield === null) {
        updatedData[field] = e.target.value;
      } else if (subindex === null) {
        updatedData[field][subfield] = e.target.value;
      } else {
        if (subsubfield === null) {
          updatedData[field][subfield][subindex] = e.target.value;
        } else {
          updatedData[field][subfield][subindex][subsubfield] = e.target.value;
        }
      }
      return updatedData;
    });
  };

  const handleVideoChange = async (e) => {
    const selectedVideo = e.target.files[0];

    if (selectedVideo && selectedVideo.type.startsWith("video/")) {
      setVideoData({
        video: selectedVideo,
        duration: Math.round(selectedVideo.duration),
      });
    } else {
      setError("Please select a valid video file.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append(
      "event",
      new Blob([JSON.stringify(eventData)], { type: "application/json" })
    );
    eventData.images.forEach((image) => formData.append("images", image));
    formData.append("video", videoData.video);

    const token = localStorage.getItem("admin-token");
    try {
      setShowProgressBar(true);
      const response = await JashanService.add_Event(
        formData,
        token,
        onUploadProgress
      );
      
      setShowProgressBar(false);
      
      const newEvent = response.data;
      swal({
        title: "Good job!",
        text: "You have successfully added a new event",
        icon: "success",
        button: "Aww yiss!",
      });

      setEventData({
        pricingDetails: {
          basePrice: "",
          additionalServices: [{ serviceName: "", price: "" }],
        },
        address: {
          country: "",
          state: "",
          city: "",
          pinCode: "",
          landmark: "",
        },
        images: [],
      });
      onEventAdded(newEvent);
    } catch (error) {
      setError("You are required to fill in only one events");
    }
  };

  const handleImageChange = (e) => {
    setEventData((prevData) => ({
      ...prevData,
      images: Array.from(e.target.files),
    }));
  };

  const onUploadProgress = (progressEvent) => {
    const { loaded, total } = progressEvent;
    const percentage = Math.round((loaded / total) * 100);
    setProgress(percentage);
  };

  const addService = () => {
    setEventData((prevData) => ({
      ...prevData,
      pricingDetails: {
        ...prevData.pricingDetails,
        additionalServices: [
          ...prevData.pricingDetails.additionalServices,
          { serviceName: "", price: "" },
        ],
      },
    }));
  };

  const removeService = (index) => {
    setEventData((prevData) => {
      const updatedData = { ...prevData };
      updatedData.pricingDetails.additionalServices.splice(index, 1);
      return updatedData;
    });
  };

  return (
    <Paper  style={{ backgroundColor: '#f0f3f5', }}>
    <Container>
      
      <Typography variant="h4" style={{ fontFamily: 'Arial, sans-serif' }}>Submission of Advertising Materials</Typography>
      {showProgressBar ? (
        <Box
          sx={{
            width: "50%",
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "#fff",
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
            borderRadius: "4px",
            padding: "20px",
            textAlign: "center",
          }}
        >
          <Typography variant="h6">Uploading: {progress}%</Typography>
          <LinearProgress
            variant="determinate"
            value={progress}
            sx={{
              height: "20px",
              borderRadius: "4px",
              backgroundColor: "#3498db",
            }}
          />
        </Box>
      ) : (
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="row mb-4">
            <div className="col">
              <label htmlFor="images" className="image-lable">
                Click For Images Upload
              </label>
              <input
                type="file"
                id="images"
                name="images"
                multiple
                accept="image/*"
                onChange={handleImageChange}
                required
              />
            </div>
            <div className="col">
              <label htmlFor="video" className="form-label">
                Submit Cool Promo
              </label>
              <input
                type="file"
                className="form-control"
                id="video"
                name="video"
                accept="video/*"
                onChange={handleVideoChange}
              />
              <div className="form-text">
                Kindly furnish the particulars for your 30-second advertisement
                video
              </div>
            </div>
          </div>
          <div className="row mb-4">
            <div className="col">
              <TextField
                type="text"
                label="Base Price"
                value={eventData.pricingDetails.basePrice}
                onChange={(e) =>
                  handleInputChange(e, "pricingDetails", "basePrice")
                }
                required
                fullWidth
              />
            </div>
          </div>

          <div className="row mb-4">
            <div className="col">
              <FormControl fullWidth>
                <InputLabel id="country-label"></InputLabel>
                <TextField
                  type="text"
                  labelId="country-label"
                  value={eventData.address.country}
                  disabled
                />
              </FormControl>
            </div>

            <div className="col">
              <FormControl fullWidth>
                <InputLabel id="state-label">State</InputLabel>
                <Select
                  labelId="state-label"
                  id="state"
                  value={eventData.address.state}
                  onChange={(e) => handleInputChange(e, "address", "state")}
                  required
                >
                  <MenuItem value="">Select State</MenuItem>
                  {stateCityData.map((stateData) => (
                    <MenuItem key={stateData.state} value={stateData.state}>
                      {stateData.state}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
          </div>

          <div className="row mb-4">
            <div className="col">
              <FormControl fullWidth>
                <InputLabel id="city-label">City</InputLabel>
                <Select
                  labelId="city-label"
                  id="city"
                  value={eventData.address.city}
                  onChange={(e) => handleInputChange(e, "address", "city")}
                  required
                >
                  <MenuItem value="">Select City</MenuItem>
                  {stateCityData
                    .find(
                      (stateData) => stateData.state === eventData.address.state
                    )
                    ?.cities.map((city) => (
                      <MenuItem key={city} value={city}>
                        {city}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
            </div>

            <div className="col">
              <TextField
                type="text"
                label="Pin Code"
                value={eventData.address.pinCode}
                onChange={(e) => handleInputChange(e, "address", "pinCode")}
                required
                fullWidth
              />
            </div>
          </div>

          <div className="row mb-4">
            <div className="col">
              <TextField
                type="text"
                label="Landmark"
                value={eventData.address.landmark}
                onChange={(e) => handleInputChange(e, "address", "landmark")}
                required
                fullWidth
              />
            </div>
          </div>

          <div className="form-group">
            {eventData.pricingDetails.additionalServices.map(
              (service, index) => (
                <div key={index}>
                  <div className="row mb-4">
                    <div className="col">
                      <TextField
                        type="text"
                        label="Service Name"
                        placeholder="Service Name"
                        value={service.serviceName}
                        onChange={(e) =>
                          handleInputChange(
                            e,
                            "pricingDetails",
                            "additionalServices",
                            index,
                            "serviceName"
                          )
                        }
                        required
                        fullWidth
                      />
                    </div>

                    <div className="col">
                      <TextField
                        type="text"
                        label="Price"
                        placeholder="Price"
                        value={service.price}
                        onChange={(e) =>
                          handleInputChange(
                            e,
                            "pricingDetails",
                            "additionalServices",
                            index,
                            "price"
                          )
                        }
                        required
                        fullWidth
                      />
                    </div>
                  </div>
                  <div className="text-right">
                    <Button
                      type="button"
                      variant="outlined"
                      color="secondary"
                      onClick={() => removeService(index)}
                    >
                      Remove Service
                    </Button>
                  </div>
                </div>
              )
            )}
            <Button
              type="button"
              variant="outlined"
              color="primary"
              onClick={addService}
            >
              Add Service
            </Button>
          </div>

          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
          {error && (
            <Typography variant="body2" style={{ color: "red" }}>
              {error}
            </Typography>
          )}
        </form>
      )}
      <Alert severity="info" style={{ marginTop: "16px" }}>
            You are limited to adding only a singular event.
            </Alert>
      </Container>
    </Paper>
  );
};

export default FillForm;
