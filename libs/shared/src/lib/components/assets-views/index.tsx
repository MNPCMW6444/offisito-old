import { Grid } from "@mui/material";
import { renderAmenityIcon } from "../utils";

export * from "./AssetCard";

interface AmenitiesProps {
  amenities?: any;
}

export const AmenitiesView = ({ amenities }: AmenitiesProps) =>
  amenities && (
    <Grid item container justifyItems="center">
      {Object.keys(amenities).map(
        (amenity) =>
          amenities[amenity] && (
            <Grid item id={amenity}>
              {renderAmenityIcon(amenity)}
            </Grid>
          ),
      )}
    </Grid>
  );
