import { Typography, TypographyProps } from "@mui/material";

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
