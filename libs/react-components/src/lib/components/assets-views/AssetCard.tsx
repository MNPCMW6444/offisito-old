import { Asset, Availability } from '@monorepo/types';
import { Badge, Box, Divider, Grid, Typography } from '@mui/material';
import { AmenitiesView } from '@monorepo/react-components';

interface AssetCardProps {
  asset: Asset;
}

export const AssetCard = ({ asset }: AssetCardProps) => {
  return (
    <Grid container direction="column" width="95%" padding="10%" rowSpacing={1}>
      <Grid item>
        <Box
          component="img"
          src={asset.photoURLs ? asset.photoURLs[0] : ''}
        ></Box>
      </Grid>
      <Grid item>
        <Typography color="primary">{asset.officeName}</Typography>
      </Grid>
      {asset.availability && (
        <Grid item>
          <Typography color="primary">
          Available -{' '}
          {Object.keys(asset.availability)
            .filter((key) =>
              asset.availability
                ? asset.availability[key as keyof Availability]
                : true
            )
            .join(', ')}
          .
        </Typography>
      </Grid>
      )}
      <Grid item>
        <Divider sx={{ borderStyle: 'dashed' }}> </Divider>
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
          <Badge>{'asset.price'}$</Badge>
        </Grid>
      </Grid>
    </Grid>
  );
};
