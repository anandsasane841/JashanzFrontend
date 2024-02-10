import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "../Header";
import Footer from "../Footer";
import JashanService from "../service/JashanService";
import "./CustomerLogin.css";
import { useLocation, useNavigate } from "react-router-dom";
import CustomLoader from "../CustomLoader";
import { AppBar, Snackbar } from "@mui/material";
import { Link as MaterialLink } from "@mui/material";
const CustomerLogin = ({ isAuthenticatedUser, setIsAuthenticatedUser }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const isLoggedout = location.state && location.state.isLoggedout;
  const [isLoading, setIsLoading] = useState(false);
  const [selectedTab, setSelectedTab] = useState("sign-in");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    mobileNumber: "",
    role: "ROLE_USER",
    emailormobile: "",
  });

  const [isDarkMode, setIsDarkMode] = useState(false);
  const [notification, setNotification] = useState(null);

  const handleLogoutNotification = () => {
    setNotification({
      message: "You have been successfully logged out.",
      severity: "success",
    });
  };

  useEffect(() => {
    if (isLoggedout) {
     // console.log("isloggedOut" + isLoggedout);
      handleLogoutNotification();
    }
  }, [isLoggedout]);

  const handleTabChange = (tab) => {
    setSelectedTab(tab);
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignInSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const user_login = {
        emailormobile: formData.emailormobile,
        password: formData.password,
      };
    //  console.log("USER LOGIN " + JSON.stringify(user_login));
      const response = await JashanService.user_login(user_login);

      if (response.status === 200) {
        localStorage.setItem("token", response.data.jwtToken);
      //  console.log("User logged in with token:", response.data.jwtToken);
        setIsAuthenticatedUser(true);
        navigate("/home");
      } else {
      //  console.error("Token not received in response.");
      }
    } catch (error) {
      setNotification({
        message: "Invalid username or password",
        severity: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUpSubmit = async (e) => {
    e.preventDefault();

    try {
      const mobile = formData.mobileNumber;
      const res = await JashanService.generateUserOtp(mobile);
     // console.log(res.data);
      if (res.status === 200) {
        const otp = prompt("Please enter the OTP sent to your email/mobile");

        if (!otp) {
          setNotification({
            message: "Please enter the OTP to complete registration.",
            severity: "warning",
          });
          return;
        }
        try {
          const response = await JashanService.user_register(formData, otp);
       //   console.log("User registered:", response.data);

          setNotification({
            message: "You have successfully registered!",
            severity: "success",
          });
        } catch (error) {
          if (error.response && error.response.status === 401) {
            setNotification({
              message: "Please enter a valid OTP.",
              severity: "error",
            });
          } else {
            setNotification({
              message: "Error during user registration",
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

  // Toggle dark mode
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };
  const handleLinkForgotPassword = () => {
    navigate(`/forgotPassword`);
  };

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
            <div className="login-wrap mt-5">
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
                          placeholder="Enter  Email or Mobile Number"
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
                      <p className="text-right">
                        <MaterialLink
                          component="button"
                          variant="body2"
                          style={{
                            color: "white",
                            textDecoration: "none",
                            fontWeight: "bold",
                            cursor: "pointer",
                          }}
                          onClick={handleLinkForgotPassword}
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
                          id="name"
                          type="text"
                          className="input"
                          placeholder="Your Name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="group">
                        <input
                          id="email"
                          type="email"
                          className="input"
                          placeholder="Your Email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="group">
                        <input
                          id="contact_number"
                          type="tel"
                          className="input"
                          placeholder="Your Contact Number"
                          name="mobileNumber"
                          value={formData.mobileNumber}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="group">
                        <input
                          id="password"
                          type="password"
                          className="input"
                          placeholder="Your Password"
                          name="password"
                          value={formData.password}
                          onChange={handleInputChange}
                          minLength={6}
                        />
                      </div>
                      <input type="hidden" name="role" value={formData.role} />{" "}
                      {/* Default role */}
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
                    <div className="hr"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <AppBar position="static" color="default" className="mt-5">
            <Footer />
          </AppBar>
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

export default CustomerLogin;
