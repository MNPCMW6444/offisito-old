import { Button, Grid } from "@mui/material";
import {
  Asset,
  AssetCard,
  axiosErrorToaster,
  findMe,
  PrimaryText,
  ServerContext,
} from "@monorepo/shared";
import { useContext, useEffect, useState } from "react";

const NearSpaces = () => {
  const [assetsNear, setassetsNear] = useState<Asset[]>([]);

  const server = useContext(ServerContext);

  const fetchNearAssets = () =>
    findMe().then(
      (location) =>
        server &&
        (location
          ? server.axiosInstance.get(
              `/api/assets/near?lat=${location.lat}&long=${location.long}`,
            )
          : server.axiosInstance.get(`/api/assets/nearandom`)
        )
          .then((response) => setassetsNear(response.data))
          .catch((error) => axiosErrorToaster(error)),
    );

  useEffect(() => {
    fetchNearAssets().then();
  }, []);

  return (
    <Grid container direction="column">
      <Grid item container alignItems="center" columnSpacing={4}>
        <Grid item>
          <PrimaryText>Spaces near you</PrimaryText>
        </Grid>
        <Grid item>
          <Button variant="contained" sx={{ fontSize: "75%" }}>
            See all
          </Button>
        </Grid>
      </Grid>
      <Grid
        overflow="scroll"
        item
        container
        alignItems="center"
        columnSpacing={6}
        width="100%"
        wrap="nowrap"
      >
        {assetsNear.map((asset) => (
          <Grid key={asset._id} item width="100%">
            <AssetCard asset={asset} />
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
};

export default NearSpaces;
