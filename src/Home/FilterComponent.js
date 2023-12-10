import React from "react";
import "./FilterComponent.css";

const options = [
  {
    value: "Birthday",
    image: "./FilterImages/birthday.png",
    text: "A Memorable Birthday Bash!",
  },
  {
    value: "Marriage Ceremony",
    image: "./FilterImages/Marriage.jpg",
    text: "Crafting Your Dream Wedding",
  },
  {
    value: "Get Together or Party",
    image: "./FilterImages/GetTogether.jpg",
    text: "Gather and Celebrate!",
  },
  {
    value: "Occasion Organizers",
    image: "./FilterImages/eventTm.png",
    text: "Your Event, Our Expertise",
  },
  {
    value: "Disc Jockey",
    image: "./FilterImages/DJ.jpg",
    text: "Choose your favorite DJ",
  },
];

const FilterComponent = ({
  selectedFilter,
  setSelectedFilter,
  getEventsByFilter,
}) => {
  const handleSpecializationChange = (value) => {
    setSelectedFilter(value);
    getEventsByFilter(value); // Call the getEventsByFilter function with the selected value
  };

  return (
    <div className="circle-container">
      <div
        value={selectedFilter}
        onClick={handleSpecializationChange}
        className="d-flex justify-content-center"
      >
        {options.map((option) => (
          <div key={option.value} className="p-1 px-2 mx-3">
            <div className="circle">
              <img
                src={option.image}
                alt={option.value}
                onClick={() => handleSpecializationChange(option.value)}
              />
            </div>
            <option
              className="circle-heading fs-6 text-dark"
              value={option.value}
              onClick={() => handleSpecializationChange(option.value)}
            >
              {option.text}
            </option>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FilterComponent;
