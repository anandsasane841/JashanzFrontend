import React from "react";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTired, faHome } from "@fortawesome/free-solid-svg-icons";

const Error = () => {
  const { error } = useParams();

  // CSS styles for the centered and transparent image
  const containerStyle = {
    height: "100vh", // Cover the entire vertical height of the viewport
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
  };

  return (
    <div className="text-dark" style={containerStyle}>
      <button className="btn btn-secondary text-center">
        <a href="/">
          <FontAwesomeIcon icon={faHome} size="3x" />
        </a>
      </button>
      <div className="text-center">
        <h1>Something went wrong</h1>
        <p>{error || "An error occurred while processing your request."}</p>
      </div>
      <div className="text-center">
        <FontAwesomeIcon icon={faTired} size="5x" />
      </div>
    </div>
  );
};

export default Error;
