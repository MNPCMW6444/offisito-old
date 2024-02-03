import { ReactNode } from "react";
import Box from "@mui/material/Box";
import { frontendSettings } from "@monorepo/utils";

interface EnvBorderContextProps {
  children: ReactNode;
}

export const EnvBorder = ({ children }: EnvBorderContextProps) => {
  const props = {
    width:
      frontendSettings().VITE_WHITE_ENV === "prod"
        ? "100%"
        : "calc(100% - 8px)",
    height:
      frontendSettings().VITE_WHITE_ENV === "prod"
        ? "100%"
        : "calc(100% - 8px)",
    sx:
      frontendSettings().VITE_WHITE_ENV === "prod"
        ? {}
        : frontendSettings().VITE_WHITE_ENV === "preprod"
          ? { border: "4px solid orange" }
          : { border: "4px solid blue" },
  };
  return <Box {...props}>{children}</Box>;
};
