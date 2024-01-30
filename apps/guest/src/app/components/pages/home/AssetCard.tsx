import { Asset, Availability } from "@monorepo/types";
import { Badge, Box, Divider, Grid, Typography } from "@mui/material";
import { AmenitiesView } from "@monorepo/react-components";

interface AssetCardProps {
  asset: Asset;
}

const AssetCard = ({ asset }: AssetCardProps) => {
  return (
    <Grid
      container
      direction="column"
      width="95vw"
      padding="10%"
      rowSpacing={1}
    >
      <Grid item>
        <Box component="img" src={asset.photoURLs[0]}></Box>
      </Grid>
      <Grid item>
        <Typography>{asset.officeName}</Typography>
      </Grid>
      <Grid item>
        <Typography>
          Available -{" "}
          {Object.keys(asset.availability)
            .filter((key) => asset.availability[key as keyof Availability])
            .join(", ")}
          .
        </Typography>
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
          {/*<PriceBadge />*/}
          <Badge>{"asset.price"}$</Badge>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default AssetCard;
