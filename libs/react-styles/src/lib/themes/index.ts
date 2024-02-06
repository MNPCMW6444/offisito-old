import { createMuiTheme, ThemeOptions } from "@mui/material";

// Function to determine if it's night
export const isNight = () => {
  // Implement your logic to determine if it's night
  // For example, based on the current time
  const hour = new Date().getHours();
  return hour < 6 || hour >= 22;
};

export const themeForMVP: ThemeOptions = createMuiTheme({
  palette: {
    mode: isNight() ? "dark" : "light",
    primary: {
      main: "#b6d244",
      contrastText: isNight() ? "white" : "black", // Adjust for visibility in dark mode
    },
    secondary: {
      main: "#575a50",
      contrastText: isNight() ? "white" : "black", // Adjust for visibility in dark mode
    },
    text: {
      primary: isNight() ? "white" : "black", // Text color for visibility in both modes
      secondary: isNight() ? "#b3b3b3" : "grey", // Secondary text color for visibility
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
});
