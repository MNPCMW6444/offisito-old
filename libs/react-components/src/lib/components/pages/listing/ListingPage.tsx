import { Asset, Availability } from "@monorepo/types";
import { useContext, useEffect, useState } from "react";
import { ServerContext } from "@monorepo/server-provider";
import { Divider, Grid, Typography } from "@mui/material";
import { ImageCarousel } from "./ImageCarousel";
import Box from "@mui/material/Box";
import { LocationOn } from "@mui/icons-material";
import { AmenitiesView } from "../../assets-views";

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
          <Typography>{listing.officeName}</Typography>
        </Grid>*/}
        <Grid item container>
          <Grid item>
            <Typography>Day: </Typography>
          </Grid>
          <Grid item>
            <Box>
              {/*TODO: itai@offisito.com*/}
              <Typography>{"listing.price??"}</Typography>
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
      <AmenitiesView amenities={listing.amenities} />
      <Divider />
      <Grid item>
        <Typography>Availability</Typography>
      </Grid>
      {/*    {listing.availability && (
        <Grid item container columnSpacing={2}>
          {Object.keys(listing.availability).map((key) => (
            <Grid item>
              <AvailabilityBox
                name={key}
                isFilled={
                  listing.availability
                    ? listing.availability[key as keyof Availability]
                    : undefined
                }
              />
            </Grid>
          ))}
        </Grid>
      )}*/}
      <Grid item>
        <Typography>Space includes:</Typography>
      </Grid>
      <Grid item>????? {/*TODO: itai@offisito.com*/}</Grid>
      <Grid item>
        <Typography>Owner:</Typography>
      </Grid>
      <Grid item>
        <Typography>Map:</Typography>
      </Grid>
    </Grid>
  ) : (
    <Typography>Loading Listing...</Typography>
  );
};
