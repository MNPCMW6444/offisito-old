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
    </Grid>
    <Grid item container justifyContent="space-around" alignItems="center">
      <Grid item>
        <Typography>Stats</Typography>
      </Grid>
      <Grid item>
        <Typography>Stats</Typography>
      </Grid>
      <Grid item>
        <Typography>Stats</Typography>
      </Grid>
      <Grid item>
        <Typography>Stats</Typography>
      </Grid>
    </Grid>
    <Grid item>
      <Typography>My Dashboard</Typography>
    </Grid>
    <Grid item>
      <Typography>My Dashboard</Typography>
    </Grid>
  </Grid>
);

export default Dashboard;
