import { Badge, Grid, IconButton, Typography } from "@mui/material";
import { AssetCard } from "@monorepo/react-components";
import { useContext, useEffect, useState } from "react";
import { Asset } from "@monorepo/types";
import { findMe } from "@monorepo/utils";
import { ServerContext } from "@monorepo/server-provider";
import { axiosErrorToaster } from "@monorepo/react-components";

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
      <Grid item container justifyItems="center" columnSpacing={4}>
        <Grid item>
          <Typography color="primary">Spaces near you</Typography>
        </Grid>
        <Grid item>
          <IconButton>
            <Typography>Spaces near you</Typography>
          </IconButton>
        </Grid>
        <Grid item>
          <Badge>See all</Badge>
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
          <Grid item width="100%">
            <AssetCard asset={asset} />
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
};

export default NearSpaces;
