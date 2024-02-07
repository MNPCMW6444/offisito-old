import { Button, Grid, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import styled from "@emotion/styled";

const DashboardPage = () => {
  const navigate = useNavigate();

  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      height="100%"
      width="100%"
      rowSpacing={6}
      wrap="nowrap"
    >
      <Grid item alignSelf="flex-start">
        <Typography color="primary" variant="h4" paddingLeft="50px">
          Dashboard
        </Typography>
      </Grid>
      <Grid item container justifyContent="space-around" alignItems="center">
        <Grid item>
          <Typography color="primary">Stats</Typography>
        </Grid>
        <Grid item>
          <Typography color="primary">Stats</Typography>
        </Grid>
        <Grid item>
          <Typography color="primary">Stats</Typography>
        </Grid>
        <Grid item>
          <Typography color="primary">Stats</Typography>
        </Grid>
      </Grid>
      <Grid item>
        <Typography color="primary">Nav:</Typography>
      </Grid>
      <Grid item container justifyContent=" space-around" alignItems=" center">
        <Grid item>
          <Button variant="contained" onClick={() => navigate("/spaces")}>
            My Spaces
          </Button>
        </Grid>
        <Grid item>
          <Button variant="contained" onClick={() => navigate("/profiles")}>
            Complete my first company profile
          </Button>
        </Grid>
      </Grid>
      <Grid
        item
        container
        direction="column"
        alignItems="center"
        rowSpacing={2}
      >
        <Grid item>
          <Typography color="primary">
            All Rights Reserved © 2024 Offisito Inc.
          </Typography>
        </Grid>
        <Grid
          item
          container
          justifyContent="center"
          alignItems="center"
          columnSpacing={2}
        >
          <Grid item>
            <Typography color="primary">Terms of use</Typography>
          </Grid>
          <Grid item>
            <Typography color="primary">Privacy policy</Typography>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};
export default DashboardPage;
