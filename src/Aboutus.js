import React from "react";
import { Card } from "react-bootstrap";
import "./Aboutus.css"; // Create a CSS file for animations
import Header from "./Header";
import Footer from "./Footer";
import JashanService from "./service/JashanService";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";

const Aboutus = () => {
  const navigate = useNavigate();

  function handleDeleteAccountClick() {
    swal({
      title:
        "You really want to delete your account. This action cannot be undone!",
      text: "You won't be able to revert this!",
      icon: "warning",
      buttons: ["No, cancel", "Yes, delete it"],
    }).then((result) => {
      if (result) {
        const userToken = localStorage.getItem("token");
        const adminToken = localStorage.getItem("admin-token");
        console.log("USER TOKEN " + userToken);
        console.log("ADMIN TOKEN " + adminToken);
        if (userToken) {
          JashanService.delete_current_user(userToken)
            .then((response) => {
              swal(
                "Account Deleted!",
                "Your user account has been deleted.",
                "success"
              );
              console.log("User account deleted:", response.data);
              localStorage.clear();
              navigate(`/aboutus`);
            })
            .catch((error) => {
              swal(
                "Error!",
                "An error occurred while deleting your user account.",
                "error"
              );
              console.error("Error deleting user account:", error);
            });
        } else if (adminToken) {
          JashanService.delete_current_admin(adminToken)
            .then((response) => {
              swal(
                "Account Deleted!",
                "Your admin account has been deleted.",
                "success"
              );
              console.log("Admin account deleted:", response.data);
              localStorage.clear();
              navigate(`/aboutus`);
            })
            .catch((error) => {
              swal(
                "Error!",
                "An error occurred while deleting your admin account.",
                "error"
              );
              console.error("Error deleting admin account:", error);
            });
        }
      }
    });
  }

  return (
    <div>
      <Header />

      <div className="container text-center">
        <h3 className="fs-4 booking-values">
          Reserve your spot in just 4 simple steps
        </h3>

        <img
          className="image-animation"
          src="4step.png"
          alt="4step"
          width="630"
          height="620"
        />
      </div>
      <div class="container">
        <div class="about-info">
          <div class="col">
            <p class="about-paragraph">
              Welcome to our Event Management platform! We are here to provide
              you with a convenient and secure way to discover and book
              exceptional venues for all your special occasions in India.
            </p>
            <p class="about-paragraph">
              Whether you're planning a birthday party, corporate event, college
              gathering, or any other celebration, our platform has you covered.
              We offer a wide array of venue options, including cozy cafes,
              spacious halls, and luxurious hotels.
            </p>
            <p class="about-paragraph">
              But that's not all! We go the extra mile by allowing you to book
              talented DJs to amp up the excitement at your event, wherever you
              choose. Our platform showcases a variety of event management
              services, each tailored to your unique needs and budget.
            </p>
            <p class="about-paragraph">
              Explore our offerings, select your preferred services, and access
              the contact information of our dedicated event management team.
              Furthermore, you can connect with banquet halls and marriage
              venues to find the perfect match for your event and secure your
              preferred time slots.
            </p>
            <p class="about-paragraph">
              At our platform, your transactions are secure and straightforward.
              Once you've made your choice, whether it's a specific event,
              birthday hall, cafe, event management team, or DJ, you'll be
              prompted to pay the specified charges. After payment, your booking
              request is sent to your chosen event manager. If they accept, your
              booking is confirmed, and you can look forward to your event at
              the chosen time slot. Should they decline, don't worry - you'll
              receive a prompt refund.
            </p>
            <p class="about-paragraph">
              To ensure efficiency, we've set a 3-hour timeframe for event
              managers to accept or decline bookings. If they confirm within
              this time, your booking is locked in; otherwise, it's
              automatically canceled. We're committed to providing a formal and
              reliable solution for individuals across India, making it easy to
              find and book venues for your events. Count on us for a seamless
              and hassle-free experience.
            </p>
          </div>
        </div>
      </div>

      <div className="row mt-4">
        <div className="col-md-4">
          <Card className="text-center text-info">
            <Card.Body>
              <strong className="fs-3 domain-brand">Disc Jockey</strong>
              <Card.Text>
                Find the perfect DJ for your event and make it memorable with
                our selection of talented DJs.
              </Card.Text>
            </Card.Body>
          </Card>
        </div>

        <div className="col-md-4">
          <Card className="text-center text-info">
            <Card.Body>
              <strong className="fs-3 domain-brand">Marriage Ceremony</strong>
              <Card.Text>
                Make your wedding day special by choosing the ideal venue and
                arrangements for your marriage ceremony.
              </Card.Text>
            </Card.Body>
          </Card>
        </div>

        <div className="col-md-4">
          <Card className="text-center text-info">
            <Card.Body>
              <strong className="fs-3 domain-brand">
                Get Together or Party
              </strong>
              <Card.Text>
                Host memorable get-togethers and parties with our diverse venue
                options and services.
              </Card.Text>
            </Card.Body>
          </Card>
        </div>
      </div>

      <div className="row mt-4">
        <div className="col-md-6">
          <Card className="text-center text-info">
            <Card.Body>
              <strong className="fs-3 domain-brand">Occasion Organizers</strong>
              <Card.Text>
                Our team of occasion organizers will ensure that your event is
                executed flawlessly, from planning to execution.
              </Card.Text>
            </Card.Body>
          </Card>
        </div>

        <div className="col-md-6">
          <Card className="text-center text-info">
            <Card.Body>
              <strong className="fs-3 domain-brand">Birthday</strong>
              <Card.Text>
                Celebrate birthdays with our specially selected venues and
                services for a fun and memorable experience.
              </Card.Text>
            </Card.Body>
          </Card>
        </div>
      </div>

      <div className="container text-center">
        <div className="row">
          <div>
            <div className="ceo-card text-center">
              <img src="Anand.jpg" alt="CEO" />
              <h3 className="fs-4 booking-text mt-3">Chief Executive Officer</h3>
              <strong className="fs-5 text-dark booking-heading">
                Anand Sasane
              </strong>
              <p className="booking-values">ceo@zealouvirtuoso.com</p>
            </div>
          </div>
          <div>
            <div className="cfo-card text-center">
              <img src="Akshay.jpg" alt="CFO" />
              <h3 className="fs-4  booking-text mt-3">Chief Financial Officer</h3>
              <strong className="fs-5 text-dark booking-heading">
                Akshay Gaikwad
              </strong>
              <p className="booking-values">cfo@zealouvirtuoso.com</p>
            </div>
          </div>
        </div>
      </div>
      <div className="class-divider">
      <div className="text-right text-danger">
        {(localStorage.getItem("token") ||
          localStorage.getItem("admin-token")) && (
          <a onClick={handleDeleteAccountClick}>
            Delete Account
          </a>
        )}
      </div>
        <Footer />
      </div>
    </div>
  );
};

export default Aboutus;
