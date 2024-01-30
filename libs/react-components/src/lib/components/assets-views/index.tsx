import { Amenities } from "@monorepo/types";
import { Grid } from "@mui/material";
import { renderAmenityIcon } from "../utils/amenitiesIcons";

interface AmenitiesProps {
  amenities?: Amenities;
}

export const AmenitiesView = ({ amenities }: AmenitiesProps) =>
  amenities && (
    <Grid item container justifyItems="center">
      {Object.keys(amenities).map(
        (amenity) =>
          amenities[amenity as keyof Amenities] && (
            <Grid item>{renderAmenityIcon(amenity as keyof Amenities)}</Grid>
          ),
      )}
    </Grid>
  );
