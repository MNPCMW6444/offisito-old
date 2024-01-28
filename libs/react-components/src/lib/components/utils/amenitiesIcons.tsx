import { Amenities } from "@monorepo/types";
import { Computer, Domain, LocalParking, Wifi } from "@mui/icons-material";

// TODO: itai@offisito.com
export const renderAmenityIcon = (amenity: keyof Amenities) =>
  amenity === "freeWiFi" ? (
    <Wifi />
  ) : amenity === "parking" ? (
    <LocalParking />
  ) : amenity === "lobbySpace" ? (
    <Domain />
  ) : (
    <Computer />
  );
