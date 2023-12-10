import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faCalendar,
  faComments,
  faPen,
} from "@fortawesome/free-solid-svg-icons";
import AdminInfo from "./dashboardsections/AdminInfo";
import EventInfo from "./dashboardsections/EventInfo";
import CustomerInteraction from "./dashboardsections/CustomerInteraction";
import FillForm from "./dashboardsections/FillForm";
import JashanService from "../service/JashanService";
import "bootstrap/dist/css/bootstrap.min.css";
import "./AdminDashboard.css";
import Header from "../Header";
import Footer from "../Footer";

const AdminDashboard = () => {
  const { username } = useParams();
  const [adminInfo, setAdminInfo] = useState({});
  const [events, setEvents] = useState([]);
  const [activeTab, setActiveTab] = useState("admin");
  const navigate = useNavigate();
  const isLoggedIn = true;

  const addEvent = (newEvent) => {
    setEvents([...events, newEvent]);
  };

  useEffect(() => {
    const token = localStorage.getItem("admin-token");

    // Fetch admin info
    JashanService.getAdminByEmail(username, token)
      .then((response) => {
        setAdminInfo(response.data);
      })
      .catch((error) => {
        navigate(`/error/${error.message}`);
      });

    JashanService.getEventByAdminId(adminInfo.id, token)
      .then((response) => {
        setEvents(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [username, adminInfo.id]);

  const switchTab = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="container mt-4 text-center">
      <div className="class-divider">
        <Header isLoggedIn={isLoggedIn} />
      </div>


<div>
      <ul className="nav nav-tabs" id="myTab" role="tablist">
        <li className="nav-item fs-5" role="presentation">
          <button
            className={`nav-link ${activeTab === "admin" ? "active" : ""}`}
            onClick={() => switchTab("admin")}
            id="admin-tab"
            data-bs-toggle="tab"
            data-bs-target="#admin"
            type="button"
            role="tab"
            aria-controls="admin"
            aria-selected="true"
          >
            <FontAwesomeIcon icon={faUser} className="fs-5" /><p className="dashboard-tabs-headings"> Personal Info</p>
          </button>
        </li>
        <li className="nav-item fs-5" role="presentation">
          <button
            className={`nav-link ${activeTab === "events" ? "active" : ""}`}
            onClick={() => switchTab("events")}
            id="events-tab"
            data-bs-toggle="tab"
            data-bs-target="#events"
            type="button"
            role="tab"
            aria-controls="events"
            aria-selected="false"
          >
            <FontAwesomeIcon icon={faCalendar} className="fs-5" /> <p className="dashboard-tabs-headings">Event Info</p>
          </button>
        </li>
        <li className="nav-item fs-5" role="presentation">
          <button
            className={`nav-link ${
              activeTab === "interaction" ? "active" : ""
            }`}
            onClick={() => switchTab("interaction")}
            id="interaction-tab"
            data-bs-toggle="tab"
            data-bs-target="#interaction"
            type="button"
            role="tab"
            aria-controls="interaction"
            aria-selected="false"
          >
            <FontAwesomeIcon icon={faComments} className="fs-5" /> <p className="dashboard-tabs-headings">Customer
            Interaction</p>
          </button>
        </li>
        <li className="nav-item fs-5" role="presentation">
          <button
            className={`nav-link ${activeTab === "form" ? "active" : ""}`}
            onClick={() => switchTab("form")}
            id="form-tab"
            data-bs-toggle="tab"
            data-bs-target="#form"
            type="button"
            role="tab"
            aria-controls="form"
            aria-selected="false"
          >
            <FontAwesomeIcon icon={faPen} className="fs-5" /><p className="dashboard-tabs-headings">Fill Form</p> 
          </button>
        </li>{" "}
      </ul>

      <div
        className="tab-content class-divider bg-white text-dark"
        id="myTabContent"
      >
        <div
          className={`tab-pane fade ${
            activeTab === "admin" ? "show active" : ""
          }`}
          id="admin"
          role="tabpanel"
          aria-labelledby="admin-tab"
        >
          <AdminInfo adminInfo={adminInfo} />
        </div>
        <div
          className={`tab-pane fade ${
            activeTab === "events" ? "show active" : ""
          }`}
          id="events"
          role="tabpanel"
          aria-labelledby="events-tab"
        >
          {events.map((event) => (
            <EventInfo key={event.id} event={event} />
          ))}
        </div>
        <div
          className={`tab-pane fade ${
            activeTab === "interaction" ? "show active" : ""
          }`}
          id="interaction"
          role="tabpanel"
          aria-labelledby="interaction-tab"
        >
          <CustomerInteraction />
        </div>
        <div
          className={`tab-pane fade ${
            activeTab === "form" ? "show active" : ""
          }`}
          id="form"
          role="tabpanel"
          aria-labelledby="form-tab"
        >
          <FillForm onEventAdded={addEvent} />
        </div>
      </div>
      </div>

      <div className="class-divider">
        <Footer />
      </div>
    </div>
  );
};

export default AdminDashboard;
