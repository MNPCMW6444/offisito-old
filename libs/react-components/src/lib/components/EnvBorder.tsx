import { ReactNode } from "react";
import Box from "@mui/material/Box";

interface EnvBorderContextProps {
  children: ReactNode;
}

export const EnvBorder = ({ children }: EnvBorderContextProps) => {
  const sx =
    import.meta.env.VITE_WHITE_ENV === "prod"
      ? {}
      : import.meta.env.VITE_WHITE_ENV === "preprod"
        ? { border: "4px solid orange" }
        : { border: "4px solid blue" };

  return (
    <Box width="calc(100% - 8px)" height="calc(100% - 8px)" sx={sx}>
      {children}
    </Box>
  );
};
