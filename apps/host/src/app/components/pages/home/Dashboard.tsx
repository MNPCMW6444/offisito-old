import { Grid, Typography } from "@mui/material";

const Dashboard = () => (
  <Grid
    container
    direction="column"
    alignItems="center"
    height="100%"
    width="100%"
  >
    <Grid item alignSelf="flex-start">
      <Typography>My Dashboard</Typography>
    </Grid>{" "}
    <Grid item alignSelf="flex-start">
      <Typography>My Dashboard</Typography>
    </Grid>{" "}
    <Grid item alignSelf="flex-start">
      <Typography>My Dashboard</Typography>
    </Grid>{" "}
    <Grid item alignSelf="flex-start">
      <Typography>My Dashboard</Typography>
    </Grid>
  </Grid>
);

export default Dashboard;
