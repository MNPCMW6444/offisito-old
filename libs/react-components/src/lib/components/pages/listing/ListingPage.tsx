import { Asset } from "@monorepo/types";
import { useContext, useEffect, useState } from "react";
import { ServerContext } from "@monorepo/server-provider";
import { Grid, Typography } from "@mui/material";
import { ImageCarousel } from "./ImageCarousel";

interface ListingPageProps {
  _id?: string;
}

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
          imagesArray={listing.photoURLs.map((url) => ({
            imgPath: url,
            alt: "",
            label: "",
          }))}
        />
      </Grid>
      <Grid item>asdas</Grid>
    </Grid>
  ) : (
    <Typography>Loading Listing...</Typography>
  );
};
