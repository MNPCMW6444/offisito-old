import { Amenities } from "@monorepo/types";
import { Grid } from "@mui/material";
import { renderAmenityIcon } from "../utils";

export * from "./AssetCard";

interface AmenitiesProps {
  amenities?: Amenities;
}

export const AmenitiesView = ({ amenities }: AmenitiesProps) =>
  amenities && (
    <Grid item container justifyItems="center">
      {Object.keys(amenities).map(
        (amenity) =>
          amenities[amenity as keyof Amenities] && (
            <Grid item id={amenity}>
              {renderAmenityIcon(amenity as keyof Amenities)}
            </Grid>
          ),
      )}
    </Grid>
  );
