import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Header.css";
import JashanService from "./service/JashanService";

const Header = ({ isLoggedIn, isAdmin }) => {
  const navigate = useNavigate();
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    // You can save the dark mode preference to local storage here
  };

  // Apply dark mode class to the body element
  if (isDarkMode) {
    document.body.classList.add("dark-mode");
  } else {
    document.body.classList.remove("dark-mode");
  }

  const handleLogout = () => {
    const token = localStorage.getItem("token");
    JashanService.user_signout(token)
      .then((result) => {
        localStorage.clear();
        const res = result.data.toString();
        navigate(`/logout/${encodeURIComponent(res)}`);
      })
      .catch((error) => {
        navigate(`/error/${error.message}`);
      });
  };

  return (
    <header>
      
      <nav class="navbar navbar-expand-lg navStyle">
        <div>
          <a class="brand-navbar" href="/">
            {" "}
            <img
              src="https://jashanzprimary.s3.ap-south-1.amazonaws.com/jzlogo.png "
              alt="site-logo"
              height="60px"
            />
          </a>
          <strong className="fs-1 domain-brand">
            Jashan<span style={{ color: "#0daefb" }}>z.com</span>
          </strong>
        </div>
        <button
          class="navbar-toggler"
          data-toggle="collapse"
          data-target="#mainMenu"
        >
          <span>
            <i class="fas fa-align-right iconStyle"></i>
          </span>
        </button>
        <div class="collapse navbar-collapse" id="mainMenu">
          <ul class="navbar-nav ml-auto navList">
            <li className="nav-item">
              <div className="form-check form-switch">
                <input
                  className="form-check-input"
                  type="checkbox"
                  role="switch"
                  id="flexSwitchCheckDefault"
                  checked={isDarkMode}
                  onChange={toggleDarkMode}
                />
              </div>
            </li>

            <li className="nav-item">
              <a href="/aboutus">
                <i className="fas fa-building fa-2x"></i>
              </a>
            </li>
            {!localStorage.getItem("token") && (
              <li className="nav-item">
                <a href="/admin">
                  <i className="fas fa-user-circle fa-2x"></i>
                </a>
              </li>
            )}

            {isLoggedIn && localStorage.getItem("token") && (
              <li className="nav-item">
                <a href="/bookings-status">
                  <i className="fas fa-book fa-2x"></i>
                </a>
              </li>
            )}

            {isLoggedIn && (
              <li className="nav-item">
                <div onClick={handleLogout}>
                  <i className="fas fa-sign-out-alt fa-2x"></i>
                </div>
              </li>
            )}

            <li class="nav-item">
              <a href="mailto:support@jashanz.com?subject=Query%20Regarding%20Recent%20Event:%20Let's%20Discuss">
                <button className="contact-btn">Contact</button>
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;