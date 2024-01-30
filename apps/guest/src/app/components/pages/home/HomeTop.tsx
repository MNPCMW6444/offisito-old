import { Grid, IconButton, Typography } from "@mui/material";
import { LocationOn, Search } from "@mui/icons-material";

const HomeTop = () => (
  <Grid container justifyContent="space-between">
    <Grid item>
      <IconButton>
        <LocationOn />
        <Typography>Current Address</Typography>
      </IconButton>
    </Grid>
    <Grid item>
      <IconButton>
        <Search />
      </IconButton>
    </Grid>
  </Grid>
);

export default HomeTop;
