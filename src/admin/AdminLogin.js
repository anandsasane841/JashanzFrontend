import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./AdminLogin.css";
import Header from "../Header";
import Footer from "../Footer";
import JashanService from "../service/JashanService";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";
import Typed from "react-typed";
import CustomLoader from "../CustomLoader";


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

  const handleTabChange = (tab) => {
    setSelectedTab(tab);
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const [isLoading, setIsLoading] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [showError, setShowError] = useState(false);

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

        console.log("User logged in with token:", Token);
        setIsAuthenticatedAdmin(true); // Update isAuthenticated state

        navigate(`/admin-dashboard/${username}`);
      })
      .catch((error) => {
        console.log(error);
        setShowErrorAlert(true); // Show error alert on login failure
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
console.log(res.data);
      if (res.status === 200) {
        const otp = prompt("Please enter the OTP sent to your email/mobile");

        if (!otp) {
          alert("Please enter the OTP to complete registration.");
          return;
        }

        try {
          const response = await JashanService.admin_register(formData, otp);
          console.log("User registered:", response.data);
          swal({
            title: "Good job!",
            text: "You have successfully Registered",
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
          <div className="class-divider">
            <Header />
          </div>

          <div className="class-divider">
            <div className="text-center">
            <img src="https://jashanzprimary.s3.ap-south-1.amazonaws.com/AdminLogo+(1).png" alt="admin_portal" width="200" height="200" />
              </div>
            <p class="text-center font-weight-bold fs-5">
            ⚠️ <Typed strings={sentences} typeSpeed={90} backSpeed={70} loop />
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
                          className="button"
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
                  </div>
                  <div className="for-pwd-htm">
                    <form onSubmit={handleSignUpSubmit}>
                      <div className="group">
                        <label htmlFor="firmName" className="label">
                          Firm Name
                        </label>
                        <input
                          id="firmName"
                          type="text"
                          className="input"
                          placeholder="Firm Name"
                          name="firmName"
                          value={formData.firmName}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="group">
                        
                        <label htmlFor="specialization" className="label">
                          Specialization
                        </label>
                        <select
                          id="specialization"
                          className="input"
                          name="specialization"
                          value={formData.specialization}
                          onChange={handleInputChange}
                          required
                        >
                          <option value="Birthday" selected>
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
                        <label htmlFor="mobileNumber" className="label">
                          Mobile Number
                        </label>
                        <input
                          id="mobileNumber"
                          type="text"
                          className="input"
                          placeholder="Mobile Number"
                          name="mobileNumber"
                          value={formData.mobileNumber}
                          onChange={handleInputChange}
                          pattern="[0-9]{10}" // Set the pattern for 10 digits
                          title="Mobile number should be 10 digits"
                          required // Display a custom error message
                        />
                      </div>
                      <div className="group">
                        <label
                          htmlFor="alternateMobileNumber"
                          className="label"
                        >
                          Alternate Mobile Number
                        </label>
                        <input
                          id="alternateMobileNumber"
                          type="text"
                          className="input"
                          placeholder="Alternate Mobile Number"
                          name="alternateMobileNumber"
                          value={formData.alternateMobileNumber}
                          onChange={handleInputChange}
                          pattern="[0-9]{10}" // Set the pattern for 10 digits
                          title="Mobile number should be 10 digits"
                          required
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
                          required
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
                          required
                        />
                      </div>
                      <input type="hidden" name="role" value={formData.role} />
                      <div className="group">
                        <input
                          type="submit"
                          className="button"
                          value="Register"
                        />
                      </div>
                    </form>
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
    </div>
  );
};

export default AdminLogin;
