import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Header.css";
import JashanService from "./service/JashanService";
import {
  Container,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Switch,
  Button,
} from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MenuIcon from "@material-ui/icons/Menu";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import BusinessIcon from "@material-ui/icons/Business";
import BookIcon from "@material-ui/icons/Book";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import MailOutlineIcon from "@material-ui/icons/MailOutline";

const Header = ({ isLoggedIn }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMoreClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleAdminClick = () => {
    setAnchorEl(null);
    navigate(`/admin`);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const navigate = useNavigate();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    // You can save the dark mode preference to local storage here
  };
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
        navigate(`/logout/${encodeURIComponent(res)}`, { replace: true });
      })
      .catch((error) => {
        navigate(`/error/${error.message}`, { replace: true });
      });
  };

  const handleLinkClick = () => {
    // Handle the click action, for example, opening the mail link
    window.location.href =
      "mailto:support@jashanz.com?subject=Query%20Regarding%20Recent%20Event:%20Let's%20Discuss";
  };
  const handleLinkBookingStatus = () => {
    // Handle the click action, for example, opening the mail link
    window.location.href = "/bookings-status";
  };
  const handleLinkAdmin = () => {
    // Handle the click action, for example, opening the mail link
    window.location.href = "/admin";
  };
  const handleLinkAboutus = () => {
    // Handle the click action, for example, opening the mail link
    window.location.href = "/aboutus";
  };
  return (
    <Container maxWidth="lg">
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer}
          >
            <MenuIcon />
          </IconButton>
          <a className="brand-navbar" href="/">
            <img
              src="https://jashanzprimary.s3.ap-south-1.amazonaws.com/jzlogo.png"
              alt="site-logo"
              height="60px"
            />
          </a>
          <strong className="fs-1 domain-brand">
            Jashan<span style={{ color: "#0daefb" }}>z.com</span>
          </strong>
        </div>
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
        {!localStorage.getItem("token") && (
          <IconButton
            edge="end"
            color="inherit"
            aria-label="more"
            aria-controls="simple-menu"
            aria-haspopup="true"
            onClick={handleMoreClick}
          >
            <MoreVertIcon />
          </IconButton>
        )}
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={handleAdminClick}>Admin Section</MenuItem>
        </Menu>
      </div>

      {/* Drawer for mobile view */}
      <Drawer anchor="left" open={isDrawerOpen} onClose={toggleDrawer}>
        <List>
          <ListItem button onClick={handleLinkAboutus}>
            <ListItemIcon>
              <BusinessIcon />
            </ListItemIcon>
            <ListItemText primary="About Us" />
          </ListItem>

          {isLoggedIn && localStorage.getItem("token") && (
            <ListItem button onClick={handleLinkBookingStatus}>
              <ListItemIcon>
                <BookIcon />
              </ListItemIcon>
              <ListItemText primary="Bookings Status" />
            </ListItem>
          )}

          {isLoggedIn && (
            <ListItem button onClick={handleLogout}>
              <ListItemIcon>
                <ExitToAppIcon />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItem>
          )}

          <ListItem button onClick={handleLinkClick}>
            <ListItemIcon>
              <MailOutlineIcon />
            </ListItemIcon>
            <ListItemText primary="Contact" />
          </ListItem>
        </List>
      </Drawer>
    </Container>
  );
};

export default Header;
