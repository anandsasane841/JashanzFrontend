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
    <nav className="navbar navbar-expand-lg container">
      <div className="container">
        <div className="navbar-brand">
          <div>
            <a href="/">
              <img
                src="https://res.cloudinary.com/dvqxcqg2n/image/upload/v1699425006/icdhtflmuxuqafm5wxht.png"
                alt="site-logo"
                width="70"
                height="60"
              />
            </a>

            <strong className="fs-1 domain-brand">
              Jashan<span style={{ color: "#0daefb" }}>z.com</span>
            </strong>
          </div>
        </div>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarToggleExternalContent"
          aria-controls="navbarToggleExternalContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
      </div>

      <div
        className="collapse navbar-collapse"
        id="navbarToggleExternalContent"
      >
        <ul className="navbar-nav">
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

          {!localStorage.getItem("token") && (
            <li className="nav-item">
              <a className="nav-link " href="/admin">
                <i className="fas fa-user-circle fa-2x"></i>
              </a>
            </li>
          )}
          {isLoggedIn && localStorage.getItem("token") && (
            <li className="nav-item">
              <a className="nav-link" href="/bookings-status">
                <i className="fas fa-book fa-2x"></i>
              </a>
            </li>
          )}

          <li className="nav-item">
            <a className="nav-link" href="/aboutus">
              <i className="fas fa-building fa-2x"></i>
            </a>
          </li>

          {isLoggedIn && (
            <li className="nav-item">
              <div className="nav-link" onClick={handleLogout}>
                <i className="fas fa-sign-out-alt fa-2x"></i>
              </div>
            </li>
          )}
          <li className="nav-item">
            <a href="mailto:business@jashan.com" className="text-white">
              <button className="contact-btn">Contact</button>
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Header;
