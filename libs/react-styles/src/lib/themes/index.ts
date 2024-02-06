import { ThemeOptions } from "@mui/material";

export const isNight = () => {
  const hour = new Date().getHours();
  return hour < 6 || hour >= 18;
};

export const themeForMVP: ThemeOptions = {
  palette: {
    mode: isNight() ? "dark" : "light",
    primary: {
      main: "#b6d244",
      contrastText: isNight() ? "#ffffff" : "#0000000", // Adjust for visibility in dark mode
    },
    secondary: {
      main: "#575a50",
      contrastText: isNight() ? "#ffffff" : "#0000000", // Adjust for visibility in dark mode
    },
    text: {
      primary: isNight() ? "#ffffff" : "#0000000", // Text color for visibility in both modes
      secondary: isNight() ? "#b3b3b3" : "grey", // Secondary text color for visibility
    },
    background: {
      default: isNight() ? "#101714" : "#f3f3f0",
      paper: isNight() ? "#101714" : "#f3f3f0",
    },
  },
  typography: {
    fontFamily: '"Inter", "Arial", sans-serif',
    h1: {
      fontFamily: '"Open Sans", "Arial", sans-serif',
    },
    h2: {
      fontFamily: '"Open Sans", "Arial", sans-serif',
    },
    h3: {
      fontFamily: '"Open Sans", "Arial", sans-serif',
    },
    h4: {
      fontFamily: '"Open Sans", "Arial", sans-serif',
    },
    h5: {
      fontFamily: '"Open Sans", "Arial", sans-serif',
    },
    h6: {
      fontFamily: '"Open Sans", "Arial", sans-serif',
    },
    subtitle1: {
      fontFamily: '"Open Sans", "Arial", sans-serif',
    },
    subtitle2: {
      fontFamily: '"Open Sans", "Arial", sans-serif',
    },
    // ... any other typography settings you have
  },
};
