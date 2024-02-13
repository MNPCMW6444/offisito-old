import { ThemeOptions } from "@mui/material";
import { frontendSettings } from "../context";
import { useEffect, useMemo, useState } from "react";

export const useIsNight = () => {
  const calculateIsNight = () => {
    const seconds = new Date().getSeconds();
    const segment = Math.floor(seconds / 10); // Divides the minute into 6 segments of 10 seconds each
    const isNightSegment = segment % 2 === 0; // Alternates between 'day' and 'night' every segment
    return frontendSettings().VITE_WHITE_ENV === "local"
      ? isNightSegment
      : new Date().getHours() < 6 || new Date().getHours() >= 18;
  };

  const [isNight, setIsNight] = useState(calculateIsNight());

  useEffect(() => {
    const interval = setInterval(() => {
      setIsNight(calculateIsNight());
    }, 10000); // Updates every 10 seconds based on the segment logic
    return () => clearInterval(interval);
  }, []);

  return isNight;
};

export const themeColor = "#4e6500";
export const backGroundColor = "#cfdcce";

export const useThemeForMVP = () => {
  const isNight = useIsNight();
  const theme = useMemo(
    () =>
      ({
        palette: {
          mode: isNight ? "dark" : "light",
          primary: {
            main: isNight ? "#badeab" : themeColor,
            contrastText: isNight ? "#101714" : "#ffffff",
          },
          secondary: {
            main: isNight ? "#abdec5" : "#00652c",
            contrastText: isNight ? "#101714" : "#ffffff",
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
            primary: isNight ? "#ffffff" : "#000000",
            secondary: isNight ? "#b3b3b3" : "#757575",
          },
          background: {
            default: isNight ? "#101714" : "#f3f3f0",
            paper: isNight ? "#024910" : backGroundColor,
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
      }) as ThemeOptions,
    [isNight],
  );

  return theme;
};
