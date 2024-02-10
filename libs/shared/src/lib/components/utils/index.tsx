import { Computer, Domain, LocalParking, Wifi } from "@mui/icons-material";
import toast from "react-hot-toast";
import { Grid } from "@mui/material";
import { PrimaryText } from "../../styled-components";

// TODO: itai@offisito.com
export const renderAmenityIcon = (amenity: string) =>
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
      <PrimaryText fontWeight="bold" fontSize="200%">
        {text}
      </PrimaryText>
    </Grid>
  </Grid>
);
