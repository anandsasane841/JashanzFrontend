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

  const sentences = ["Celebrate with Perfection."];

  useEffect(() => {
    fetchEvents();
  }, [token]);

  const eventTypeImageUrls = {
    Birthday:
      "https://img.freepik.com/premium-vector/happy-birthday-cake-isolated-white-background_505573-742.jpg?w=2000",
    "Marriage Ceremony":
      "https://img.freepik.com/free-vector/illustrated-wedding-couple_23-2148467742.jpg?w=740&t=st=1699636132~exp=1699636732~hmac=8db335a98a76d754e654ec9cd59cc2642dbbe354ddb4efdf26e74b7dd1ba862b",
    "Get Together or Party":
      "https://img.freepik.com/premium-vector/group-friends-hanging-out-home-talking-playing-music-drinking-wine-eating-chips_318844-306.jpg",
    "Occasion Organizers":
      "https://img.freepik.com/premium-vector/event-management-concept-celebration-meeting-organization-planning-pr-company-business-mass-media-social-network-promotion-isolated-vector-illustration_613284-1597.jpg",
    "Disc Jockey":
      "https://img.freepik.com/free-vector/cute-dj-playing-music-cartoon-vector-icon-illustration-people-music-icon-concept-isolated-premium-vector-flat-cartoon-style_138676-3699.jpg?w=2000",
  };

  return (
    <div>
      <div className="class-divider">
        <Header isLoggedIn={isLoggedIn} />
      </div>

      <div className="class-divider ligne">
        <div className="container">
          <h5 className="text-center">
            <Typed strings={sentences} typeSpeed={70} backSpeed={50} loop />
          </h5>

          <div className="row">
            <div className="row class-divider filter-component">
              <div className="overflow-auto">
                <FilterComponent
                  selectedFilter={selectedFilter}
                  setSelectedFilter={setSelectedFilter}
                  getEventsByFilter={getEventsByFilter}
                />
              </div>
            </div>

            <div className="text-center">
              <div className="col-md-12 d-flex justify-content-between">
                <button
                  className="btn btn-info"
                  onClick={() => sortEvents("type")}
                >
                  Sort by Type
                </button>
                <button
                  className="btn btn-info"
                  onClick={() => sortEvents("price")}
                >
                  Sort by Price
                </button>
                <button
                  className="btn btn-info"
                  onClick={() => sortEvents("place")}
                >
                  Sort by Place
                </button>
                <button className="btn btn-danger" onClick={handleReset}>
                  Reset Filter
                </button>
              </div>
            </div>

            <div className="row class-divider">
              <div className="row mb-4">
                <div className="col">
                  <select
                    className="form-select"
                    value={selectedState}
                    onChange={(e) => {
                      setSelectedState(e.target.value);
                      filterEventsByState(e.target.value);
                    }}
                  >
                    <option value="">Filter by State</option>
                    {Array.from(
                      new Set(events.map((event) => event.address.state))
                    ).map((state) => (
                      <option key={state} value={state}>
                        {state}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col">
                  <select
                    className="form-select"
                    value={selectedCity}
                    onChange={(e) => {
                      setSelectedCity(e.target.value);
                      filterEventsByCity(e.target.value);
                    }}
                  >
                    <option value="">Filter by City</option>
                    {Array.from(
                      new Set(events.map((event) => event.address.city))
                    ).map((city) => (
                      <option key={city} value={city}>
                        {city}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              {events.map((event) => (
                <div
                  className="col-lg-3 col-md-4 col-sm-6 col-xs-12 pt-5 pb-5"
                  key={event.id}
                >
                  <div className="box card">
                    <div className="box cardImg">
                      {eventTypeImageUrls[event.eventType] && (
                        <img
                          src={eventTypeImageUrls[event.eventType]}
                          alt="Event Image"
                        />
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
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="class-divider">
        <Footer />
      </div>
    </div>
  );
};

export default MainComponent;
