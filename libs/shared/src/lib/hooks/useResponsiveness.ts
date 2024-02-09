import { useMediaQuery } from "@mui/material";

export const useResponsiveness = () => {
  const isMobile = useMediaQuery("(max-width:600px)");
  const isMobileOrTabl = useMediaQuery("(max-width:900px)");
  return { isMobile, isMobileOrTabl };
};
