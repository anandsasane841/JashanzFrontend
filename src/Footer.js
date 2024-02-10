import React from "react";
import { Container, Paper, Grid, Typography } from "@mui/material";

const Footer = () => {
  return (
    <div className="bg-body-tertiary text-center text-lg-start mt-5 pb-5">
        <Grid container justifyContent="center" spacing={2}>
          <Grid item xs={12} md={6}>
            <Typography variant="body1" color="textPrimary" align="center">
              We bring your events &#127881; to life! With the Jashanz app, you
              can easily book DJ services, Birthday Halls, Get Together Party
              Halls, Banquets, and even choose a team of experienced event
              organizers #जशनजी .
            </Typography>
          </Grid>
        </Grid>
        <hr className="my-4" />
        <Typography variant="body2" color="textPrimary" align="center">
          &copy; 2024 Zealous Virtuoso Pvt Ltd. All rights reserved.
        </Typography>
      </div>
  );
};

export default Footer;
