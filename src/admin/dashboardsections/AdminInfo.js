// AdminInfo.jsx
import React from 'react';
import { Container, Grid, Typography, Paper } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import BusinessIcon from "@mui/icons-material/Business";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";

const AdminInfo = ({ adminInfo }) => {
  
  return (
    <Paper  style={{ backgroundColor: '#f0f3f5', }}>
    <Container>
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12} align="center">
            <Typography variant="h4" gutterBottom className="admin-info-title">
              Admin Information
            </Typography>
          </Grid>
          <Grid item xs={12} align="center">
          <img
                src="https://icons.iconarchive.com/icons/icojam/blue-bits/256/user-settings-icon.png"
                width="100"
                height="100"
                alt="admin"
              />
           
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={2} direction="column">
              <Grid item align="center">
                <Typography variant="h6" className="admin-info-text">
                  <BusinessIcon fontSize="medium" className="icon" />
                  {adminInfo.firmName}
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="h6" className="admin-info-text">
                  <AssignmentIndIcon fontSize="medium" className="icon" />
                  {adminInfo.specialization}
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="h6" className="admin-info-text">
                  <PhoneIcon fontSize="medium" className="icon" />
                  {adminInfo.mobileNumber}
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="h6" className="admin-info-text">
                  <PhoneIcon fontSize="medium" className="icon" />
                  {adminInfo.alternateMobileNumber}
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="h6" className="admin-info-text">
                  <EmailIcon fontSize="medium" className="icon" />
                  {adminInfo.email}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Paper>
  );
};

export default AdminInfo;
