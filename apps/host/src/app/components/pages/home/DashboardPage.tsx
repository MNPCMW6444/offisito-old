import { Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { PrimaryText } from "@monorepo/shared";

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
        <PrimaryText variant="h4" paddingLeft="50px">
          Dashboard
        </PrimaryText>
      </Grid>
      <Grid item container justifyContent="space-around" alignItems="center">
        <Grid item>
          <PrimaryText>Stats</PrimaryText>
        </Grid>
        <Grid item>
          <PrimaryText>Stats</PrimaryText>
        </Grid>
        <Grid item>
          <PrimaryText>Stats</PrimaryText>
        </Grid>
        <Grid item>
          <PrimaryText>Stats</PrimaryText>
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
          <PrimaryText>All Rights Reserved © 2024 Offisito Inc.</PrimaryText>
        </Grid>
        <Grid
          item
          container
          justifyContent="center"
          alignItems="center"
          columnSpacing={2}
        >
          <Grid item>
            <PrimaryText>Terms of use</PrimaryText>
          </Grid>
          <Grid item>
            <PrimaryText>Privacy policy</PrimaryText>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};
export default DashboardPage;
