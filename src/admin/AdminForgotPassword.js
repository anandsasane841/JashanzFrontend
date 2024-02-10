import React, { useState } from "react";
import swal from "sweetalert";
import {
  AppBar,
  TextField,
  Button,
  Container,
  Paper,
  Box,
  Typography,
} from "@mui/material";
import Header from "../Header";
import Footer from "../Footer";
import JashanService from "../service/JashanService";
import { useNavigate } from "react-router-dom";
const AdminForgotPassword = () => {
  const navigate = useNavigate();
  const [mobileNumber, setMobileNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otpError, setOtpError] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleMobileSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await JashanService.adminForgotPassword(mobileNumber);
      if (response.status === 200) {
        setOtpSent(true);
        setShowOtpInput(true);
        setOtpError(false);
        setSuccessMessage("OTP sent successfully!");
      } else {
        setOtpError(true);
        setSuccessMessage("");
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
      setOtpError(true);
      setSuccessMessage("");
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await JashanService.adminVerifyOtpForForgotPassword(
        mobileNumber,
        otp
      );
      console.log(response.data);
      if (response.status === 200) {
        // Otp verified successfully, now update the password
        await JashanService.adminUpdatePassword(mobileNumber, newPassword);
        setSuccessMessage("Password updated successfully!");
        swal({
          title: "Password Updated!",
          text: "Your password has been updated successfully.",
          icon: "success",
          button: "Aww yiss!",
        });
        navigate(`/admin`);
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      setOtpError(true);
      setSuccessMessage("");
    }
  };

  return (
    <div>
      <AppBar position="static" color="default" style={{ height: "80px" }}>
        <Header />
      </AppBar>
      <Container maxWidth="xs" className="mt-5 pt-5">
        <Paper
          sx={{
            backgroundColor: "#0088a9",
            padding: 3,
            boxShadow: "0 4px 8px rgba(4,19,125,0.4)",
          }}
        >
          <Typography
            variant="h5"
            align="center"
            sx={{ color: "white", marginBottom: 3, textAlign: "center" }}
          >
            Forgot Password
          </Typography>

          {!showOtpInput ? (
            <form onSubmit={handleMobileSubmit}>
              <div className="text-center">
                <input
                  type="text"
                  value={mobileNumber}
                  onChange={(e) =>
                    setMobileNumber(
                      e.target.value.replace(/[^0-9]/g, "").slice(0, 10)
                    )
                  }
                  placeholder="Enter Mobile Number"
                  style={{ borderRadius: "20px", padding: "10px" }}
                  required
                />

                <div className="text-center mt-2">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    style={{ borderRadius: "20px", padding: "10px", width: "30%" }}
                  >
                    Get OTP
                  </button>
                </div>
              </div>
              {otpError && (
                <Typography
                  variant="body1"
                  sx={{ color: "white", marginTop: 2,textAlign:"center", }}
                >
                  Error sending OTP. Please try again.
                </Typography>
              )}
              {successMessage && (
                <Typography
                  variant="body1"
                  sx={{ color: "white", marginTop: 2 }}
                ></Typography>
              )}
            </form>
          ) : (
            <div>
              <Typography
                variant="body1"
                sx={{ color: "white", marginBottom: 2, textAlign: "center" }}
              >
                {successMessage || "OTP sent successfully!"}
              </Typography>

              <form onSubmit={handleOtpSubmit}>
                <div className="text-center">
                  <input
                    placeholder="Enter OTP"
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    style={{ borderRadius: "20px", padding: "10px" }}
                    required
                  />
                </div>

                <div className="text-center  mt-2">
                  <input
                    placeholder="New Password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    type="password"
                    style={{ borderRadius: "20px", padding: "10px" }}
                    minLength={6}
                    required
                  />
                </div>

                <div className="text-center mt-2">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    style={{ borderRadius: "20px", padding: "10px", width: "30%" }}
                  >
                    Submit OTP
                  </button>
                </div>
              </form>
              {otpError && (
                <Typography
                  variant="body1"
                  sx={{ color: "white", marginTop: 2,textAlign:"center", }}
                >
                  Incorrect OTP. Please try again.
                </Typography>
              )}
              {successMessage && (
                <Typography
                  variant="body1"
                  sx={{ color: "white", marginTop: 2 }}
                ></Typography>
              )}
            </div>
          )}
        </Paper>
      </Container>
      <div style={{ position: "absolute", bottom: 0, width: "100%" }}>
        <AppBar position="static" color="default">
          <Footer />
        </AppBar>
      </div>
    </div>
  );
};

export default AdminForgotPassword;
