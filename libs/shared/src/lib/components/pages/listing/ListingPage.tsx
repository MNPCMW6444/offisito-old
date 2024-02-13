import { Divider, Grid } from "@mui/material";
import { ImageCarousel } from "./ImageCarousel";
import Box from "@mui/material/Box";
import { LocationOn } from "@mui/icons-material";
import { AmenitiesView } from "../../assets-views";
import { ServerContext } from "../../../context";
import { PrimaryText } from "../../../styled-components";
import { Asset } from "../../../../types";
import { useContext, useEffect, useState } from "react";

interface ListingPageProps {
  _id?: string;
}

// TODO integrate to styled components yoad@offisito.com
interface AvailabilityProps {
  name: string;
  isFilled?: boolean;
}

const AvailabilityBox = ({ name, isFilled }: AvailabilityProps) => (
  <Box
    color={isFilled ? "#ffffff" : "#0000000"}
    bgcolor={isFilled ? "#0000000" : "#ffffff"}
  >
    {name}
  </Box>
);

export const ListingPage = ({ _id }: ListingPageProps) => {
  const [listing, setListing] = useState<Asset>();
  const server = useContext(ServerContext);
  const fetchListing = () =>
    server?.axiosInstance
      .get<Asset[]>("api/assets/" + _id)
      .then((res) => setListing(res.data[0]));

  useEffect(() => {
    fetchListing();
  }, []);

  return listing ? (
    <Grid container direction="column">
      <Grid item>
        <ImageCarousel
          imagesArray={listing.photoURLs?.map((url) => ({
            imgPath: url,
            alt: "",
            label: "",
          }))}
        />
      </Grid>
      <Grid item container alignItems="center" justifyContent="center">
        {/*  <Grid item width="65%">
          <PrimaryText>{listing.officeName}</PrimaryText>
        </Grid>*/}
        <Grid item container>
          <Grid item>
            <PrimaryText>Day: </PrimaryText>
          </Grid>
          <Grid item>
            <Box>
              {/*TODO: itai@offisito.com*/}
              <PrimaryText>{"listing.price??"}</PrimaryText>
            </Box>
          </Grid>
        </Grid>
      </Grid>
      <Grid item container alignItems="center">
        <Grid item>
          <LocationOn />
        </Grid>
        {/*TODO: itai@offisito.com*/}
        <Grid item>{"listing.address??"}</Grid>
      </Grid>
      ;
      <AmenitiesView amenities={listing.amenities} />;
      <Divider />;
      <Grid item>
        <PrimaryText>Availability</PrimaryText>
      </Grid>
      <Grid item>
        <PrimaryText>Space includes:</PrimaryText>
      </Grid>
      ;<Grid item>????? {/*TODO: itai@offisito.com*/}</Grid>;
      <Grid item>
        <PrimaryText>Owner:</PrimaryText>
      </Grid>
      <Grid item>
        <PrimaryText>Map:</PrimaryText>
      </Grid>
      ;
    </Grid>
  ) : (
    <PrimaryText>Loading Listing...</PrimaryText>
  );
};
