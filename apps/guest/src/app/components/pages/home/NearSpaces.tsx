import { Badge, Grid, Typography } from "@mui/material";
import AssetCard from "./AssetCard";
import { useContext, useEffect, useState } from "react";
import { Asset } from "@monorepo/types";
import { findMe } from "@monorepo/utils";
import { ServerContext } from "@monorepo/server-provider";

const NearSpaces = () => {
  const [asssetsNear, setAsssetsNear] = useState<Asset[]>([]);

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
        ).then((response) => setAsssetsNear(response.data)),
    );

  useEffect(() => {
    fetchNearAssets().then();
  }, []);

  return (
    <Grid container direction="column">
      <Grid item container justifyItems="center" columnSpacing={4}>
        <Grid item>
          <Typography>Spaces near you</Typography>
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
        {asssetsNear.map((asset) => (
          <Grid item>
            <AssetCard asset={asset} />
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
};

export default NearSpaces;
