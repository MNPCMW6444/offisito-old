import { ReactNode, useEffect } from "react";
import Box from "@mui/material/Box";
import { frontendSettings } from "@monorepo/utils";

interface EnvBorderContextProps {
  children: ReactNode;
}

export const EnvBorder = ({ children }: EnvBorderContextProps) => {
  useEffect(() => {
    const adjustHeight = () => {
      const viewportHeight = window.innerHeight + "px";
      if (document.getElementById("root") !== null)
        (document.getElementById("root") as HTMLElement).style.height =
          viewportHeight;
    };

    // Adjust the height on initial render
    adjustHeight();

    // Add event listener to adjust the height on window resize
    window.addEventListener("resize", adjustHeight);

    // Cleanup the event listener on component unmount
    return () => window.removeEventListener("resize", adjustHeight);
  }, []);

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
