import { ImageCarousel } from "@monorepo/react-components";
import { Grid } from "@mui/material";
import NearSpaces from "./NearSpaces";
import HomeTop from "./HomeTop";
import AvaliableSpaces from "./AvaliableSpaces";

const HomePage = () => (
  <Grid container direction="row">
    <Grid item>
      <HomeTop />
    </Grid>
    <Grid item>
      <ImageCarousel />
    </Grid>
    <Grid item>
      <NearSpaces />
    </Grid>
    <Grid item>
      <AvaliableSpaces />
    </Grid>
  </Grid>
);

export default HomePage;
