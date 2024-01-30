import { Badge, Grid, Typography } from "@mui/material";
import AssetCard from "./AssetCard";
import { useContext, useEffect, useState } from "react";
import { Asset } from "@monorepo/types";
import { findMe } from "@monorepo/utils";
import { ServerContext } from "@monorepo/server-provider";
import toast from "react-hot-toast";

const mock = {
  _id: {
    $oid: "65b68a5dac1b65b744ddf464",
  },
  host: {
    $oid: "65b2a02a1015ef2264bda304",
  },
  officeName: " Office number 6 Michale HOST",
  desc: "Example Description DescriptionDescriptionDescription",
  amenities: {
    freeWiFi: null,
    lobbySpace: true,
    computer: true,
  },
  companyInHold: "Example Company",
  floor: "Example Floor",
  availability: {
    sun: true,
    mon: true,
    tues: true,
    wed: true,
    thu: true,
    fri: true,
    sat: true,
  },
  photoURLs: ["url1", "url2"],
  status: "active",
  deleted: false,
  createdAt: {
    $date: "2024-01-28T17:09:49.801Z",
  },
  updatedAt: {
    $date: "2024-01-28T17:09:49.801Z",
  },
  __v: 0,
};
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
        )
          .then((response) => setAsssetsNear(response.data))
          .catch((e) => {
            toast("Error code " + e.response.status);
            //TODO: Remove
            setAsssetsNear([
              mock as unknown as any,
              mock as unknown as any,
              mock as unknown as any,
              mock as unknown as any,
            ]);
          }),
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
          <Grid item width="100%">
            <AssetCard asset={asset} />
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
};

export default NearSpaces;
