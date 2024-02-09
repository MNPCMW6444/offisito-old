import { Fab, FabProps, Typography, TypographyProps } from "@mui/material";

export const PrimaryText = (props: TypographyProps) => (
  <Typography
    color="primary"
    sx={{
      wordBreak: "break-all",
    }}
    {...props}
  >
    {props.children}
  </Typography>
);

export const OFAB = (props: FabProps) => (
  <Fab
    color="primary"
    sx={{
      position: "fixed",
      bottom: "10%",
      right: "calc(5% + (100vw - 1000px) / 2)",
    }}
    onClick={props.onClick}
  >
    {props.children}
  </Fab>
);
