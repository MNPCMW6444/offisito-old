import { LocationOn, Search } from "@mui/icons-material";
import { useContext, useEffect, useState } from "react";
import { findMe, ServerContext } from "@monorepo/shared";
import { Grid } from "@mui/material";

const HomeTop = () => {
  const [address, setAddress] = useState("Current Address");
  const server = useContext(ServerContext);
  const axiosInstance = server?.axiosInstance;

  useEffect(() => {
    findMe().then(
      (location) =>
        location &&
        axiosInstance &&
        axiosInstance
          .get("/api/geo/getAddress/" + location.lat + "," + location.long)
          .then((r) => setAddress(r.data || "Current Address")),
    );
  }, [axiosInstance]);

  return (
    <Grid container justifyContent="space-between">
      <Grid item>
        <IconButton>
          <LocationOn />
          <PrimaryText>{address}</PrimaryText>
        </IconButton>
      </Grid>
      <Grid item>
        <IconButton>
          <Search />
        </IconButton>
      </Grid>
    </Grid>
  );
};

export default HomeTop;
