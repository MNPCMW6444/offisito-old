import { ThemeOptions } from "@mui/material";

export const isNight = () => {
  const hour = new Date().getHours();
  return hour < 6 || hour >= 18;
};

export const themeForMVP: ThemeOptions = {
  palette: {
    mode: isNight() ? "dark" : "light",
    primary: {
      main: isNight() ? "#badeab" : "#4e6500",
      contrastText: isNight() ? "#101714" : "#ffffff",
    },
    secondary: {
      main: "#575a50",
      contrastText: "#ffffff",
    },
    error: {
      main: "#f44336",
      contrastText: "#ffffff",
    },
    warning: {
      main: "#ff9800",
      contrastText: "#ffffff",
    },
    info: {
      main: "#2196f3",
      contrastText: "#ffffff",
    },
    success: {
      main: "#4caf50",
      contrastText: "#ffffff",
    },
    text: {
      primary: isNight() ? "#ffffff" : "#000000",
      secondary: isNight() ? "#b3b3b3" : "#757575",
    },
    background: {
      default: isNight() ? "#101714" : "#f3f3f0",
      paper: isNight() ? "#024910" : "#cfdcce",
    },
  },
  typography: {
    fontFamily: '"Inter", "Arial", sans-serif',
    h1: {
      fontFamily: '"Open Sans", "Arial", sans-serif',
      fontWeight: 700,
      fontSize: "2.25rem",
    },
    h2: {
      fontFamily: '"Open Sans", "Arial", sans-serif',
      fontWeight: 700,
      fontSize: "2rem",
    },
    h3: {
      fontFamily: '"Open Sans", "Arial", sans-serif',
      fontWeight: 700,
      fontSize: "1.75rem",
    },
    h4: {
      fontFamily: '"Open Sans", "Arial", sans-serif',
      fontWeight: 700,
      fontSize: "1.5rem",
    },
    h5: {
      fontFamily: '"Open Sans", "Arial", sans-serif',
      fontWeight: 700,
      fontSize: "1.25rem",
    },
    h6: {
      fontFamily: '"Open Sans", "Arial", sans-serif',
      fontWeight: 700,
      fontSize: "1rem",
    },
    subtitle1: {
      fontFamily: '"Open Sans", "Arial", sans-serif',
      fontSize: "0.875rem",
    },
    subtitle2: {
      fontFamily: '"Open Sans", "Arial", sans-serif',
      fontSize: "0.875rem",
    },
    body1: {
      fontFamily: '"Inter", "Arial", sans-serif',
      fontSize: "1rem",
    },
    body2: {
      fontFamily: '"Inter", "Arial", sans-serif',
      fontSize: "0.875rem",
    },
  },
};
