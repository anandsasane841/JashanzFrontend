import React from "react";
import { AppBar, Box, Button, Container, Grid, List, ListItem, ListItemIcon, ListItemText, Typography } from "@mui/material";
import { Alert, AlertTitle } from "@mui/material";
import { AccountBalance, Cake, HeadsetMic, LocationOn, Payment } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import swal from "sweetalert";
import Header from "./Header";
import Footer from "./Footer";
import JashanService from "./service/JashanService";

const Aboutus = () => {
  const navigate = useNavigate();

  function handleDeleteAccountClick() {
    swal({
      title: "Are you sure you want to delete your account?",
      text: "This action cannot be undone.",
      icon: "warning",
      buttons: ["Cancel", "Delete"],
      dangerMode: true,
    }).then((result) => {
      if (result) {
        const userToken = localStorage.getItem("token");
        const adminToken = localStorage.getItem("admin-token");

        if (userToken) {
          JashanService.delete_current_user(userToken)
            .then(() => {
              swal("Account Deleted!", "Your user account has been deleted.", "success");
              localStorage.clear();
              navigate(`/aboutus`);
            })
            .catch(() => {
              swal("Error!", "An error occurred while deleting your user account.", "error");
            });
        } else if (adminToken) {
          JashanService.delete_current_admin(adminToken)
            .then(() => {
              swal("Account Deleted!", "Your admin account has been deleted.", "success");
              localStorage.clear();
              navigate(`/aboutus`);
            })
            .catch(() => {
              swal("Error!", "An error occurred while deleting your admin account.", "error");
            });
        }
      }
    });
  }

  return (
    <Box>
      <AppBar position="static" color="default">
        <Header />
      </AppBar>

      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <Typography variant="h4" component="div" gutterBottom sx={{ fontWeight: "bold", textAlign: "center" }}>
              Welcome to{" "}
              <Link className="brand-navbar" to="/">
                <img src="https://jashanzprimary.s3.ap-south-1.amazonaws.com/JashanzLogo.png" alt="site-logo" height="60px" />
              </Link>
              <strong className="fs-1 domain-brand">
                Jashan<span style={{ color: "#0daefb" }}>z.com</span>
              </strong>
            </Typography>
          </Grid>

          <Grid item xs={12} md={4}>
            <img
              className="image-animation"
              src="https://jashanzprimary.s3.ap-south-1.amazonaws.com/4step.png"
              alt="4step"
              width="100%"
              height="auto"
            />
          </Grid>

          <Grid item xs={12} md={8}>
            <Typography variant="body1" paragraph>
              Welcome to our Event Management platform! We are here to provide you with a convenient and secure way to discover and book exceptional venues for all your special occasions in India.
            </Typography>
            <Typography variant="body1" paragraph>
              Whether you're planning a birthday party, corporate event, college gathering, or any other celebration, our platform has you covered. We offer a wide array of venue options, including cozy cafes, spacious halls, and luxurious hotels.
            </Typography>
            <Typography variant="body1" paragraph>
              But that's not all! We go the extra mile by allowing you to book talented DJs to amp up the excitement at your event, wherever you choose. Our platform showcases a variety of event management services, each tailored to your unique needs and budget.
            </Typography>
            <Typography variant="body1" paragraph>
              Explore our offerings, select your preferred services, and access the contact information of our dedicated event management team. Furthermore, you can connect with banquet halls and marriage venues to find the perfect match for your event and secure your preferred time slots.
            </Typography>
            <Typography variant="body1" paragraph>
              At our platform, your transactions are secure and straightforward. Once you've made your choice, whether it's a specific event, birthday hall, cafe, event management team, or DJ, you'll be prompted to pay the specified charges. After payment, your booking request is sent to your chosen event manager. If they accept, your booking is confirmed, and you can look forward to your event at the chosen time slot. Should they decline, don't worry - you'll receive a prompt refund.
            </Typography>
            <Typography variant="body1" paragraph>
              To ensure efficiency, we've set a 1-hour timeframe for event managers to accept or decline bookings. If they confirm within this time, your booking is locked in; otherwise, it's automatically canceled. We're committed to providing a formal and reliable solution for individuals across India, making it easy to find and book venues for your events. Count on us for a seamless and hassle-free experience.
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Typography variant="h5" gutterBottom sx={{ color: "primary.main" }}>
              Comprehensive Event Services
            </Typography>
            <Typography variant="body1" paragraph>
              Jashanz Platform goes beyond venue bookings. Choose from a variety of event management services tailored to your unique needs and budget.
            </Typography>
            <List>
              <ListItem>
                <ListItemIcon>
                  <Cake sx={{ color: "primary.main" }} />
                </ListItemIcon>
                <ListItemText primary={<Typography variant="body1">Birthday Celebration - ₹99</Typography>} />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <LocationOn sx={{ color: "primary.main" }} />
                </ListItemIcon>
                <ListItemText primary={<Typography variant="body1">Marriage Ceremony - ₹499</Typography>} />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <HeadsetMic sx={{ color: "primary.main" }} />
                </ListItemIcon>
                <ListItemText primary={<Typography variant="body1">Disc Jockey - ₹399</Typography>} />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <AccountBalance sx={{ color: "primary.main" }} />
                </ListItemIcon>
                <ListItemText primary={<Typography variant="body1">Occasion Organizers - ₹499</Typography>} />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <Payment sx={{ color: "primary.main" }} />
                </ListItemIcon>
                <ListItemText primary={<Typography variant="body1">Get Together or Party - ₹499</Typography>} />
              </ListItem>
            </List>
          </Grid>

          <Grid item xs={12}>
            <Typography variant="h5" gutterBottom sx={{ color: "primary.main" }}>
              Secure and Hassle-Free Booking Process
            </Typography>
            <Typography variant="body1" paragraph>
              Enjoy a secure and straightforward transaction process. Book your chosen venue, event manager, or DJ hassle-free.
            </Typography>
            <Typography variant="body1" paragraph>
              After payment, your booking request is sent to your chosen professional. If accepted, your booking is confirmed; otherwise, you'll receive a prompt refund.
            </Typography>
            <Button variant="contained" color="primary" startIcon={<Payment />} component={Link} to="/home">
              Book Your Event Now
            </Button>
          </Grid>

          <Grid item xs={12}>
            <Typography variant="h5" gutterBottom sx={{ color: "primary.main" }}>
              Find Us
            </Typography>
            <Typography variant="body1" paragraph>
              Visit our office or contact us for inquiries. We are conveniently located to assist you with all your event planning needs.
            </Typography>
            <List>
              <ListItem>
                <ListItemIcon>
                  <LocationOn sx={{ color: "primary.main" }} />
                </ListItemIcon>
                <ListItemText primary={<Typography variant="body1"> Pune, India</Typography>} />
              </ListItem>
            </List>
          </Grid>

          <Grid item xs={12}>
            {localStorage.getItem("token") || localStorage.getItem("admin-token") ? (
              <Alert severity="warning" style={{ margin: "16px" }}>
                <AlertTitle>Attention</AlertTitle>
                Kindly be advised that there is an option to delete your account. Please be aware that choosing this option will result in the permanent removal of your account. Exercise caution and ensure this decision aligns with your intentions.
                <Button
                  variant="outlined"
                  color="secondary"
                  size="small"
                  onClick={handleDeleteAccountClick}
                  style={{ marginLeft: "10px", borderColor: "red", color: "red" }}
                >
                  Delete Account
                </Button>
              </Alert>
            ) : null}
          </Grid>
        </Grid>
      </Container>

      <AppBar position="static" color="default" className="mt-5">
        <Footer />
      </AppBar>
    </Box>
  );
};

export default Aboutus;
