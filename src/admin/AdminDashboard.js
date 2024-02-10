import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AppBar, Tabs, Tab, useMediaQuery, useTheme } from "@mui/material";
import {
  Person as PersonIcon,
  Event as EventIcon,
  Chat as ChatIcon,
  Create as CreateIcon,
} from "@mui/icons-material";
import AdminInfo from "./dashboardsections/AdminInfo";
import EventInfo from "./dashboardsections/EventInfo";
import CustomerInteraction from "./dashboardsections/CustomerInteraction";
import FillForm from "./dashboardsections/FillForm";
import JashanService from "../service/JashanService";
import Header from "../Header";
import Footer from "../Footer";

const AdminDashboard = () => {
  const { username } = useParams();
  const [adminInfo, setAdminInfo] = useState({});
  const [events, setEvents] = useState([]);
  const [activeTab, setActiveTab] = useState("admin");
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
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
      <AppBar position="static" color="default" style={{ height: "80px" }}>
        <Header isLoggedIn={isLoggedIn} />
      </AppBar>
      <div className="container mt-5 text-center">
        <Tabs
          value={activeTab}
          onChange={(e, value) => switchTab(value)}
          centered={!isMobile}
          variant={isMobile ? "scrollable" : "standard"}
          scrollButtons={isMobile ? "auto" : "off"}
        >
          <Tab
            icon={<PersonIcon />}
            label={<p className="dashboard-tabs-headings"> Personal Info</p>}
            value="admin"
          />
          <Tab
            icon={<EventIcon />}
            label={<p className="dashboard-tabs-headings">Event Info</p>}
            value="events"
          />
          <Tab
            icon={<ChatIcon />}
            label={
              <p className="dashboard-tabs-headings">Customer Interaction</p>
            }
            value="interaction"
          />
          <Tab
            icon={<CreateIcon />}
            label={<p className="dashboard-tabs-headings">Fill Form</p>}
            value="form"
          />
        </Tabs>

        <div className="tab-content  bg-white text-dark">
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
      <AppBar position="static" color="default" className="mt-5">
        <Footer />
      </AppBar>
    </div>
  );
};

export default AdminDashboard;
