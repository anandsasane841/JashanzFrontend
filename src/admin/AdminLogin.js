import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./AdminLogin.css";
import Header from "../Header";
import Footer from "../Footer";
import JashanService from "../service/JashanService";
import { useNavigate } from "react-router-dom";
import Typed from "react-typed";
import CustomLoader from "../CustomLoader";
import { AppBar, Snackbar } from "@mui/material"; // Import Snackbar
import { Link as MaterialLink } from "@mui/material";

const AdminLogin = ({ isAuthenticatedAdmin, setIsAuthenticatedAdmin }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firmName: "",
    specialization: "",
    mobileNumber: "",
    alternateMobileNumber: "",
    email: "",
    password: "",
    role: "ROLE_ADMIN",
    emailormobile: "",
  });
  const [selectedTab, setSelectedTab] = useState("sign-in");
  const [isLoading, setIsLoading] = useState(false);

  const [notification, setNotification] = useState(null); // Notification state

  const handleTabChange = (tab) => {
    setSelectedTab(tab);
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignInSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    const admin_login = {
      emailormobile: formData.emailormobile, // Use this for email
      password: formData.password,
    };

    JashanService.admin_login(admin_login)
      .then((response) => {
        const Token = response.data.jwtToken;
        localStorage.setItem("admin-token", response.data.jwtToken);
        const username = response.data.username;

      //  console.log("User logged in with token:", Token);
        setIsAuthenticatedAdmin(true); // Update isAuthenticated state

        navigate(`/admin-dashboard/${username}`);
      })
      .catch((error) => {
     //   console.log(error);
        setNotification({
          message: "Invalid username or password", // Set error message
          severity: "error", // Set severity to error
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleSignUpSubmit = async (e) => {
    e.preventDefault();

    try {
      const mobile = formData.mobileNumber;
      const res = await JashanService.generateAdminOtp(mobile);
    //  console.log(res.data);
      if (res.status === 200) {
        const otp = prompt("Please enter the OTP sent to your email/mobile");

        if (!otp) {
          setNotification({
            message: "Please enter the OTP to complete registration.",
            severity: "success",
          });

          return;
        }

        try {
          const response = await JashanService.admin_register(formData, otp);
         // console.log("User registered:", response.data);
          setNotification({
            message: "You have successfully registered!",
            severity: "success",
          });
        } catch (error) {
          if (error.response && error.response.status === 401) {
            alert("Please enter a valid OTP.");
          } else {
            setNotification({
              message: "Error during user registration:",
              severity: "error",
            });
          }
        }
      }
    } catch (error) {
      setNotification({
        message: "Failed to generate OTP. Please try again.",
        severity: "error",
      });
    }
  };
  const handleLinkAdminForgotPassword = () => {
    navigate(`/adminForgotPassword`);
  };

  const sentences = [
    "This form is exclusively designated for use by administrators, event organizers, birthday planners, DJ services, and banquet managers.",
    "Customers and general users are kindly advised not to fill out this form.",
  ];

  return (
    <div>
      {isLoading ? (
        <CustomLoader />
      ) : (
        <div>
          <AppBar position="static" color="default" style={{ height: "80px" }}>
            <Header />
          </AppBar>

          <div>
            <div className="text-center mt-5">
              <img
                src="https://icons.iconarchive.com/icons/icojam/blue-bits/256/user-settings-icon.png"
                width="100"
                height="100"
                alt="admin"
              />
              <div className="program-manager-font-style fs-6">
                <span
                  style={{
                    color: "#0088a9",
                    fontSize: "30px",
                    fontWeight: "bold",
                  }}
                >
                  Program Manager Administrator
                </span>
              </div>
            </div>
            <p class="text-center text-dark fs-5">
              ⚠️{" "}
              <Typed strings={sentences} typeSpeed={90} backSpeed={70} loop />
            </p>

            <div className="login-wrap">
              <div className="login-html">
                <input
                  id="tab-1"
                  type="radio"
                  name="tab"
                  className="sign-in"
                  checked={selectedTab === "sign-in"}
                  onChange={() => handleTabChange("sign-in")}
                />
                <label htmlFor="tab-1" className="tab">
                  Sign In
                </label>
                <input
                  id="tab-2"
                  type="radio"
                  name="tab"
                  className="for-pwd"
                  checked={selectedTab === "sign-up"}
                  onChange={() => handleTabChange("sign-up")}
                />
                <label htmlFor="tab-2" className="tab">
                  Sign Up
                </label>
                <div className="login-form">
                  <div className="sign-in-htm">
                    <form onSubmit={handleSignInSubmit}>
                      <div className="group">
                        <input
                          id="user"
                          type="text"
                          className="input"
                          required
                          placeholder="Enter Email or Mobile Number"
                          name="emailormobile"
                          value={formData.emailormobile}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="group">
                        <input
                          id="pass"
                          type="password"
                          className="input"
                          data-type="password"
                          required
                          placeholder="Enter Password"
                          name="password"
                          value={formData.password}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="group">
                        <input
                          type="submit"
                          className="btn btn-primary"
                          style={{
                            display: "block",
                            width: "100%",
                            borderRadius: "20px",
                            padding: "10px",
                          }}
                          value="Sign In"
                        />
                      </div>
                      <p class="text-right">
                        <MaterialLink
                          component="button"
                          variant="body2"
                          style={{
                            color: "white",
                            textDecoration: "none",
                            fontWeight: "bold",
                            cursor: "pointer",
                          }}
                          onClick={handleLinkAdminForgotPassword}
                        >
                          Forgot Password
                        </MaterialLink>
                      </p>
                    </form>
                    <div className="hr"></div>
                  </div>
                  <div className="for-pwd-htm">
                    <form onSubmit={handleSignUpSubmit}>
                      <div className="group">
                        <input
                          id="firmName"
                          type="text"
                          className="input"
                          placeholder="Enter Firm Name"
                          name="firmName"
                          value={formData.firmName}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="group">
                        <select
                          id="specialization"
                          className="input"
                          name="specialization"
                          value={formData.specialization}
                          onChange={handleInputChange}
                          required
                        >
                          <option disabled value="">
                            Choose Specialization
                          </option>
                          <option value="Birthday">
                            Birthday Booking (Birthday Hall)
                          </option>
                          <option value="Marriage Ceremony">
                            Marriage Ceremony Booking (Banquets)
                          </option>
                          <option value="Get Together or Party">
                            Get Together / Party Booking (Party Hall)
                          </option>
                          <option value="Occasion Organizers">
                            Occasion Organizers (Event Management Team)
                          </option>
                          <option value="Disc Jockey">
                            Disc Jockey (DJ's)
                          </option>
                        </select>
                      </div>

                      <div className="group">
                        <input
                          id="mobileNumber"
                          type="text"
                          className="input"
                          placeholder="Enter Mobile Number"
                          name="mobileNumber"
                          value={formData.mobileNumber}
                          onChange={handleInputChange}
                          pattern="[0-9]{10}" // Set the pattern for 10 digits
                          title="Mobile number should be 10 digits"
                          required // Display a custom error message
                        />
                      </div>
                      <div className="group">
                        <input
                          id="alternateMobileNumber"
                          type="text"
                          className="input"
                          placeholder="Enter Alternate Mobile Number"
                          name="alternateMobileNumber"
                          value={formData.alternateMobileNumber}
                          onChange={handleInputChange}
                          pattern="[0-9]{10}" // Set the pattern for 10 digits
                          title="Mobile number should be 10 digits"
                          required
                        />
                      </div>
                      <div className="group">
                        <input
                          id="email"
                          type="email"
                          className="input"
                          placeholder="Enter Your Email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                        />
                      </div>

                      <div className="group">
                        <input
                          id="password"
                          type="password"
                          className="input"
                          placeholder="Enter Your Password"
                          name="password"
                          value={formData.password}
                          onChange={handleInputChange}
                          required
                          minLength={6}
                        />
                      </div>
                      <input type="hidden" name="role" value={formData.role} />
                      <div className="group">
                        <input
                          type="submit"
                          className="btn btn-primary"
                          style={{
                            display: "block",
                            width: "100%",
                            borderRadius: "20px",
                            padding: "10px",
                          }}
                          value="Register"
                        />
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <AppBar position="static" color="default" className="mt-5">
            <Footer />
          </AppBar>

          {/* Snackbar for notification */}
          <Snackbar
            open={notification !== null}
            autoHideDuration={6000}
            onClose={() => setNotification(null)}
            message={notification ? notification.message : ""}
            severity={notification ? notification.severity : "info"}
          />
        </div>
      )}
    </div>
  );
};

export default AdminLogin;
