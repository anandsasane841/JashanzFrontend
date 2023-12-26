import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faCalendar,
  faComments,
  faPen,
} from "@fortawesome/free-solid-svg-icons";
import { Tabs, Tab } from "@material-ui/core";
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
    <div>
      <div className="class-divider">
        <Header isLoggedIn={isLoggedIn} />
      </div>

      <div className="container mt-4 text-center">
        <Tabs
          value={activeTab}
          onChange={(e, value) => switchTab(value)}
          centered
        >
          <Tab
            label={
              <div>
                <FontAwesomeIcon icon={faUser} className="fs-5" />
                <p className="dashboard-tabs-headings"> Personal Info</p>
              </div>
            }
            value="admin"
          />
          <Tab
            label={
              <div>
                <FontAwesomeIcon icon={faCalendar} className="fs-5" />
                <p className="dashboard-tabs-headings">Event Info</p>
              </div>
            }
            value="events"
          />
          <Tab
            label={
              <div>
                <FontAwesomeIcon icon={faComments} className="fs-5" />
                <p className="dashboard-tabs-headings">Customer Interaction</p>
              </div>
            }
            value="interaction"
          />
          <Tab
            label={
              <div>
                <FontAwesomeIcon icon={faPen} className="fs-5" />
                <p className="dashboard-tabs-headings">Fill Form</p>
              </div>
            }
            value="form"
          />
        </Tabs>

        <div className="tab-content class-divider bg-white text-dark">
          <div
            className={`tab-pane fade ${
              activeTab === "admin" ? "show active" : ""
            }`}
            id="admin"
            role="tabpanel"
          >
            <AdminInfo adminInfo={adminInfo} />
          </div>
          <div
            className={`tab-pane fade ${
              activeTab === "events" ? "show active" : ""
            }`}
            id="events"
            role="tabpanel"
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
          >
            <CustomerInteraction />
          </div>
          <div
            className={`tab-pane fade ${
              activeTab === "form" ? "show active" : ""
            }`}
            id="form"
            role="tabpanel"
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
