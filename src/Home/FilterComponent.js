import React, { useState } from "react";
import Slider from "react-slick";
import { Typography, Paper } from "@mui/material";
import CakeIcon from '@mui/icons-material/Cake';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import PartyModeIcon from '@mui/icons-material/PartyMode';
import EventIcon from '@mui/icons-material/Event';
import HeadsetIcon from '@mui/icons-material/Headset';

import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import './FilterComponent.css';

const options = [
  {
    value: "Birthday",
    icon: <img width="100" height="100" src="https://icons.iconarchive.com/icons/icondrawer/gifts/256/cake-icon.png" alt="birthday-cake"/> ,
    text: "A Memorable Birthday Bash!",
  },
  {
    value: "Marriage Ceremony",
    icon: <img width="100" height="100" src="https://icons.iconarchive.com/icons/aha-soft/free-large-love/512/Wedding-Rings-icon.png" alt="marriage"/>,
    text: "Crafting Your Dream Wedding",
  },
  {
    value: "Get Together or Party",
    icon: <img width="100" height="100" src="https://icons.iconarchive.com/icons/aha-soft/standard-christmas/256/New-Year-Party-icon.png" alt="marriage"/>,
    text: "Gather and Celebrate!",
  },
  {
    value: "Occasion Organizers",
    icon: <img width="100" height="100" src="https://icons.iconarchive.com/icons/aha-soft/large-calendar/256/Calendar-icon.png" alt="event-management-team"/>,
    text: "Your Event, Our Expertise",
  },
  {
    value: "Disc Jockey",
    icon: <img width="100" height="100" src="https://icons.iconarchive.com/icons/iconshock/disc-jockey/256/headphones-icon.png" alt="dj"/>,
    text: "Choose your favorite DJ",
  },
];

const FilterComponent = ({ selectedFilter, setSelectedFilter, getEventsByFilter }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    className: "slider",
    afterChange: (current) => {
      handleSpecializationChange(options[current].value, current);
    },
  };

  const handleSpecializationChange = (value, index) => {
    setSelectedFilter(value);
    getEventsByFilter(value);
    setSelectedIndex(index);
  };

  return (
    <Slider {...settings}>
      {options.map((option, index) => (
        <div key={option.value}>
          <div
            elevation={3}
            className={`option ${index === selectedIndex ? 'selected' : ''}`}
            onClick={() => handleSpecializationChange(option.value, index)}
          >
            <div>
              {option.icon}
            </div>
            <Typography variant="subtitle1" className="fs-4">
              {option.text}
            </Typography>
          </div>
        </div>
      ))}
    </Slider>
  );
};

export default FilterComponent;
