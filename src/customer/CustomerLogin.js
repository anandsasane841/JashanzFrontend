import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "../Header";
import Footer from "../Footer";
import JashanService from "../service/JashanService";
import "./CustomerLogin.css";
import swal from "sweetalert";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import CustomLoader from "../CustomLoader";

const CustomerLogin = ({ isAuthenticatedUser, setIsAuthenticatedUser }) => {
  const { isLoggedout } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedTab, setSelectedTab] = useState("sign-in");

  const handleTabChange = (tab) => {
    setSelectedTab(tab);
  };
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    mobileNumber: "",
    role: "ROLE_USER",
    emailormobile: "",
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignInSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const user_login = {
        emailormobile: formData.emailormobile, // Use this for email
        password: formData.password,
      };
      console.log("USER LOGIN " + JSON.stringify(user_login));
      const response = await JashanService.user_login(user_login);

      if (response.status === 200) {
        localStorage.setItem("token", response.data.jwtToken);
        console.log("User logged in with token:", response.data.jwtToken);
        setIsAuthenticatedUser(true); // Update isAuthenticated state
        navigate("/home");
      } else {
        console.error("Token not received in response.");
      }
    } catch (error) {
      setShowErrorAlert(true);
    } finally {
      setIsLoading(false); // Set isLoading to false when login is complete
    }
  };

  const handleSignUpSubmit = async (e) => {
    e.preventDefault();

    try {
      const mobile = formData.mobileNumber;
      const { status } = await JashanService.generateUserOtp(mobile);

      if (status === 200) {
        const otp = prompt("Please enter the OTP sent to your email/mobile");

        if (!otp) {
          alert("Please enter the OTP to complete registration.");
          return;
        }
        try {
          const response = await JashanService.user_register(formData, otp);
          console.log("User registered:", response.data);

          swal({
            title: "Good job!",
            text: "You have successfully registered!",
            icon: "success",
            button: "Aww yiss!",
          });
        } catch (error) {
          if (error.response && error.response.status === 401) {
            alert("Please enter a valid OTP.");
          } else{
            console.error("Error during user registration:", error);
            setShowError(true);
          }
        }
      }
    } catch (error) {
      alert("Failed to generate OTP. Please try again.");
    }
  };

  // State for displaying the success alert
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [showError, setShowError] = useState(false);
  const isLoggedIn = false;

  const [isDarkMode, setIsDarkMode] = useState(false); // Add this state for dark mode

  // Toggle dark mode
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };
  return (
    <div>
      {isLoading ? (
        <CustomLoader />
      ) : (
        <div>
          <div className="class-divider">
            <Header isLoggedIn={isLoggedIn} />
          </div>

          <div className="class-divider">
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
                        <label htmlFor="user" className="label">
                          Email or Mobile Number
                        </label>
                        <input
                          id="user"
                          type="text"
                          className="input"
                          required
                          name="emailormobile"
                          value={formData.emailormobile}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="group">
                        <label htmlFor="pass" className="label">
                          Password
                        </label>
                        <input
                          id="pass"
                          type="password"
                          className="input"
                          data-type="password"
                          required
                          name="password"
                          value={formData.password}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="group">
                        <input
                          type="submit"
                          className="button jash-button"
                          value="Sign In"
                        />
                      </div>
                    </form>
                    <div className="hr"></div>
                    {showErrorAlert && (
                      <div className="alert alert-danger">
                        Invalid username or password
                      </div>
                    )}
                    {showError && (
                      <div className="alert alert-danger">
                        User with the same email already exists
                      </div>
                    )}
                    {isLoggedout != null && (
                      <div className="alert alert-success">{isLoggedout}</div>
                    )}
                  </div>
                  <div className="for-pwd-htm">
                    <form onSubmit={handleSignUpSubmit}>
                      <div className="group">
                        <label htmlFor="name" className="label">
                          Name
                        </label>
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
                        <label htmlFor="email" className="label">
                          Email
                        </label>
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
                        <label htmlFor="contact_number" className="label">
                          Contact Number
                        </label>
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
                        <label htmlFor="password" className="label">
                          Password
                        </label>
                        <input
                          id="password"
                          type="password"
                          className="input"
                          placeholder="Your Password"
                          name="password"
                          value={formData.password}
                          onChange={handleInputChange}
                        />
                      </div>
                      <input type="hidden" name="role" value={formData.role} />{" "}
                      {/* Default role */}
                      <div className="group">
                        <input
                          type="submit"
                          className="button"
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

          <div className="class-divider">
            <Footer />
          </div>
        </div>
      )}
      ;
    </div>
  );
};

export default CustomerLogin;
