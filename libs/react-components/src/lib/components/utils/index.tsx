import { Amenities } from "@monorepo/types";
import { Computer, Domain, LocalParking, Wifi } from "@mui/icons-material";
import toast from "react-hot-toast";
import { Simulate } from "react-dom/test-utils";
import error = Simulate.error;
import { Grid } from "@mui/material";
import { PrimaryText } from "@monorepo/react-styles";

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

export const axiosErrorToaster = (e: any) =>
  toast.error(
    typeof e?.response?.data === "object"
      ? e?.response?.data?.message ||
          e?.response?.data?.error ||
          JSON.stringify(e?.response?.data)
      : e?.response?.data ||
          (e?.response?.status
            ? "Error code " + e?.response?.status
            : "Unknown Error"),
  );

export const MainMessage = ({ text }: { text: string }) => (
  <Grid
    height="100%"
    width="100%"
    container
    justifyContent="center"
    alignItems="center"
  >
    <Grid item>
      <PrimaryText fontWeight="bold" fontSize="3vw">
        {text}
      </PrimaryText>
    </Grid>
  </Grid>
);
