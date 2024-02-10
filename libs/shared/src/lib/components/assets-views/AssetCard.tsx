import { Asset } from "../../../types";
import { Badge, Box, Divider, Grid } from "@mui/material";
import { AmenitiesView } from "./";

interface AssetCardProps {
  asset: Asset;
}

export const AssetCard = ({ asset }: AssetCardProps) => {
  return (
    <Grid container direction="column" width="95%" padding="10%" rowSpacing={1}>
      <Grid item>
        <Box
          component="img"
          src={asset.photoURLs ? asset.photoURLs[0] : ""}
        ></Box>
      </Grid>
      <Grid item>
        <Divider sx={{ borderStyle: "dashed" }}> </Divider>
      </Grid>
      <Grid
        item
        container
        justifyContent="space-between"
        alignItems="center"
        wrap="nowrap"
      >
        <Grid item container alignItems="center">
          <AmenitiesView amenities={asset.amenities} />
        </Grid>
        <Grid item>
          <Badge>{"asset.price"}$</Badge>
        </Grid>
      </Grid>
    </Grid>
  );
};
