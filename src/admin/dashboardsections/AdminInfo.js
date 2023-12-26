import React from "react";
import { Grid, Typography } from "@material-ui/core";

const AdminInfo = ({ adminInfo }) => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography variant="h4" gutterBottom>
          Admin Information
        </Typography>
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3} xl={3}>
        <div className="text-center">
          <div className="btn ml-auto">
            <i className="fas fa-user-circle fa-5x"></i>{" "}
            {/* Increase icon size */}
          </div>
        </div>
      </Grid>
      <Grid item xs={12} sm={6} md={8} lg={9} xl={9}>
        <div className="card-body">
          <Grid container spacing={2}>
            <Grid item xs={12} md={3}>
              <Typography variant="h6">Firm Name</Typography>
            </Grid>
            <Grid item xs={12} md={9} className="text-secondary">
              {adminInfo.firmName}
            </Grid>
            <Grid item xs={12} md={3}>
              <Typography variant="h6">Specialization</Typography>
            </Grid>
            <Grid item xs={12} md={9} className="text-secondary">
              {adminInfo.specialization}
            </Grid>
            <Grid item xs={12} md={3}>
              <Typography variant="h6">Mobile Number</Typography>
            </Grid>
            <Grid item xs={12} md={9} className="text-secondary">
              {adminInfo.mobileNumber}
            </Grid>
            <Grid item xs={12} md={3}>
              <Typography variant="h6">Alternate Mobile Number</Typography>
            </Grid>
            <Grid item xs={12} md={9} className="text-secondary">
              {adminInfo.alternateMobileNumber}
            </Grid>
            <Grid item xs={12} md={3}>
              <Typography variant="h6">Email</Typography>
            </Grid>
            <Grid item xs={12} md={9} className="text-secondary">
              {adminInfo.email}
            </Grid>
          </Grid>
        </div>
      </Grid>
    </Grid>
  );
};

export default AdminInfo;
