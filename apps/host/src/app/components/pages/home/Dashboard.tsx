import { Button, Grid, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  return (
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
        <Typography>Nav:</Typography>
      </Grid>
      <Grid item container justifyContent="space-around" alignItems="center">
        <Grid item>
          <Button onClick={() => navigate("/spaces")}>My Spaces</Button>
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
    </Grid>
  );
};
export default Dashboard;
