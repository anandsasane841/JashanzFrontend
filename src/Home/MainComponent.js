import React, { useState, useEffect } from "react";
import JashanService from "../service/JashanService";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import FilterComponent from "./FilterComponent";
import Footer from "../Footer";
import Header from "../Header";
import "./MainComponent.css";
import Typed from "react-typed";
import CustomLoader from "../CustomLoader";
import {
  Paper,
  Button,
  Grid,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  AppBar,
} from "@mui/material";

const MainComponent = () => {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [selectedFilter, setSelectedFilter] = useState("");
  const [loading, setLoading] = useState(false);
  const isLoggedIn = true;
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  const fetchEvents = async () => {
    try {
      const response = await JashanService.get_Events(token);
      setEvents(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const sortEvents = (criteria) => {
    const sortedEvents = [...events];

    if (criteria === "type") {
      sortedEvents.sort((a, b) => a.eventType.localeCompare(b.eventType));
    } else if (criteria === "price") {
      sortedEvents.sort(
        (a, b) => a.pricingDetails.basePrice - b.pricingDetails.basePrice
      );
    } else if (criteria === "place") {
      sortedEvents.sort((a, b) =>
        `${a.address.city}, ${a.address.country}`.localeCompare(
          `${b.address.city}, ${b.address.country}`
        )
      );
    }

    setEvents(sortedEvents);
  };

  const filterEventsByState = (selectedState) => {
    const filteredEvents = events.filter(
      (event) => event.address.state === selectedState
    );
    setEvents(filteredEvents);
  };

  const filterEventsByCity = (selectedCity) => {
    const filteredEvents = events.filter(
      (event) => event.address.city === selectedCity
    );
    setEvents(filteredEvents);
  };

  const getEventsByFilter = async (filter) => {
    setLoading(true);

    try {
      if (filter === "state" && selectedState) {
        filterEventsByState(selectedState);
      } else if (filter === "city" && selectedCity) {
        filterEventsByCity(selectedCity);
      } else {
        const response = await JashanService.get_EventBySecialization(
          token,
          filter
        );
        setEvents(response.data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleViewEventClick = (eventId) => {
    navigate(`/bookevent/${eventId}`);
  };

  const handleReset = () => {
    setSelectedState("");
    setSelectedCity("");
    fetchEvents();
  };

  const sentences = ["Celebrate with Perfection"];

  useEffect(() => {
    fetchEvents();
  }, [token]);

  return (
    <>
      <AppBar position="static" color="default" style={{ height: "80px" }}>
        <Header isLoggedIn={isLoggedIn} />
      </AppBar>

      <Container maxWidth="lg" className="mt-5">
        <div className="container">
          <h5 className="text-center fs-2" style={{ color: "#0daefb" }}>
            <Typed strings={sentences} typeSpeed={70} backSpeed={50} loop />
          </h5>

          <div className="row mt-5">
            <Container>
              <FilterComponent
                selectedFilter={selectedFilter}
                setSelectedFilter={setSelectedFilter}
                getEventsByFilter={getEventsByFilter}
              />
            </Container>
            <div className="mb-3 mt-3">
              <Grid container spacing={5} justifyContent="center">
                <Grid item xs={6} sm={3}>
                  <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    style={{ backgroundColor: "#2196F3", color: "#FFFFFF" }}
                    onClick={() => sortEvents("type")}
                  >
                    Sort by Type
                  </Button>
                </Grid>
                <Grid item xs={6} sm={3}>
                  <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    style={{ backgroundColor: "#4CAF50", color: "#FFFFFF" }}
                    onClick={() => sortEvents("price")}
                  >
                    Sort by Price
                  </Button>
                </Grid>
                <Grid item xs={6} sm={3}>
                  <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    style={{ backgroundColor: "#FF9800", color: "#FFFFFF" }}
                    onClick={() => sortEvents("place")}
                  >
                    Sort by Place
                  </Button>
                </Grid>
                <Grid item xs={6} sm={3}>
                  <Button
                    fullWidth
                    variant="contained"
                    color="secondary"
                    onClick={handleReset}
                    style={{ backgroundColor: "#CCCCCC", color: "#000000" }}
                  >
                    Reset Filter
                  </Button>
                </Grid>
              </Grid>
            </div>

            <Paper style={{ backgroundColor: "#f0f3f5" }}>
              <Container>
                <Grid container spacing={2} mt={3}>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                      <InputLabel htmlFor="state-select">
                        Filter by State
                      </InputLabel>
                      <Select
                        label="Filter by State"
                        value={selectedState}
                        onChange={(e) => {
                          setSelectedState(e.target.value);
                          filterEventsByState(e.target.value);
                        }}
                      >
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>
                        {Array.from(
                          new Set(events.map((event) => event.address.state))
                        ).map((state) => (
                          <MenuItem key={state} value={state}>
                            {state}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                      <InputLabel htmlFor="city-select">
                        Filter by City
                      </InputLabel>
                      <Select
                        label="Filter by City"
                        value={selectedCity}
                        onChange={(e) => {
                          setSelectedCity(e.target.value);
                          filterEventsByCity(e.target.value);
                        }}
                      >
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>
                        {Array.from(
                          new Set(events.map((event) => event.address.city))
                        ).map((city) => (
                          <MenuItem key={city} value={city}>
                            {city}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
              </Container>

              <Grid container spacing={2} mt={3}>
                {events.map((event) => (
                  <Grid item xs={12} sm={6} md={4} lg={3} key={event.id}>
                    <div className="box card mb-5">
                      <div className="box cardImg">
                        {event.images.length > 1 && (
                          <img src={event.images[1].imgUrl} alt="Event Image" />
                        )}
                      </div>

                      <div className="info">
                        <h3>{event.eventType}</h3>
                        <p>
                          <span>&#8377; {event.pricingDetails.basePrice}</span>
                        </p>
                        <p>
                          <span>
                            <i className="fas fa-map-marker-alt"></i> Location:{" "}
                            {event.address.city}, {event.address.state}{" "}
                          </span>
                        </p>

                        <button
                          className="button-yes"
                          onClick={() => handleViewEventClick(event.id)}
                        >
                          View
                        </button>
                      </div>
                    </div>
                  </Grid>
                ))}
              </Grid>
            </Paper>
          </div>
        </div>
      </Container>

      <AppBar position="static" color="default" className="mt-5">
        <Footer />
      </AppBar>
    </>
  );
};

export default MainComponent;
