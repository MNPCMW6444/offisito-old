import { ImageCarousel } from "@monorepo/react-components";
import { Grid } from "@mui/material";
import NearSpaces from "./NearSpaces";
import HomeTop from "./HomeTop";
import AvaliableSpaces from "./AvaliableSpaces";

const HomePage = () => (
  <Grid container direction="column" rowSpacing={4}>
    <Grid item width="100%" padding="5% 5% 0">
      <HomeTop />
    </Grid>
    <Grid item paddingLeft="4%" paddingTop="2%" width="96%">
      <ImageCarousel />
    </Grid>
    <Grid item width="100%">
      <NearSpaces />
    </Grid>
    <Grid item>
      <AvaliableSpaces />
    </Grid>
  </Grid>
);

export default HomePage;
