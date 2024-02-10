import React from "react";
import { Link, useParams } from "react-router-dom";
import {
  Button,
  Typography,
  Container,
  CssBaseline,
  Grid,
} from "@mui/material";
import {
  Home as HomeIcon,
  MoodBad as MoodBadIcon,
  Build as BuildIcon,
  Block as BlockIcon,
  AccessDenied as AccessDeniedIcon,
  CloudOff as CloudOffIcon,
  BeachAccess as BeachAccessIcon,
  Gavel as GavelIcon,
} from "@mui/icons-material";
import LockIcon from "@mui/icons-material/Lock";
const Error = () => {
  const { error } = useParams();

  const containerStyle = {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  };

  const errorMessages = {
    404: [
      "Like a needle in a haystack, but without the needle. Keep searching!",
    ],
    500: ["It's not you, it's us. We're in therapy."],
    418: ["I'm a teapot. Brew time exceeded. Try a different blend."],
    403: ["Access denied! Did you forget the secret handshake?"],
    502: [
      "The gateway is feeling moody. Sing it a song, maybe it'll cooperate.",
    ],
    503: ["Our service is sunbathing on a beach. Check back later."],
    451: ["Unavailable due to legal reasons. Did you bring your lawyer?"],
  };

  const getRandomMessage = (errorCode) => {
    const statusCode = parseInt(errorCode.match(/\d{3}$/)[0], 10);
    const messages = errorMessages[statusCode] || [];
    const randomIndex = Math.floor(Math.random() * messages.length);
    return messages[randomIndex] || "An error occurred.";
  };

  const getErrorIcon = (errorCode) => {
    switch (parseInt(errorCode.match(/\d{3}$/)[0], 10)) {
      case 404:
        return <MoodBadIcon fontSize="large" />;
      case 500:
        return <BuildIcon fontSize="large" />;
      case 418:
        return <BlockIcon fontSize="large" />;
      case 403:
        return <LockIcon fontSize="large" />;
      case 502:
        return <CloudOffIcon fontSize="large" />;
      case 503:
        return <BeachAccessIcon fontSize="large" />;
      case 451:
        return <GavelIcon fontSize="large" />;
      default:
        return <MoodBadIcon fontSize="large" />;
    }
  };

  return (
    <Container component="main" maxWidth="sm" style={containerStyle}>
      <CssBaseline />
      <Grid container spacing={2} direction="column" alignItems="center">
        <Grid item>
          <Button
            component={Link}
            to="/"
            variant="contained"
            color="primary"
            size="large"
            startIcon={<HomeIcon />}
          >
            Go to Home
          </Button>
        </Grid>
        <Grid item>
          <Typography
            variant="h6"
            paragraph
            align="center"
            color="textSecondary"
          >
            {getRandomMessage(error)}
          </Typography>
        </Grid>
        <Grid item>{getErrorIcon(error)}</Grid>
      </Grid>
    </Container>
  );
};

export default Error;
