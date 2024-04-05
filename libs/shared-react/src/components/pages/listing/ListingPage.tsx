import { Divider, Grid } from "@mui/material";
import { ImageCarousel } from "./ImageCarousel";
import { LocationOn } from "@mui/icons-material";
import { Btn, PrimaryText } from "../../../styled-components";
import { Asset } from "@offisito/shared";
import { useState } from "react";
import { BookingRequestForm, MICO } from "../../../";
import SendMessageForm from "../../forms/SendMessageForm";

interface ListingPageProps {
  space: Asset;
}

export const ListingPage = ({ space }: ListingPageProps) => {
  const [modal, setModal] = useState<"" | "book" | "message">("");

  return space ? (
    <>
      {modal &&
        (modal === "book" ? (
          <BookingRequestForm close={() => setModal("")} asset={space} />
        ) : (
          <SendMessageForm
            id={space.companyId.toString()}
            amIaGuest
            spaceId={space._id.toString()}
            close={() => setModal("")}
          />
        ))}
      <Grid container direction="column" rowSpacing={2}>
        <Grid item>
          <ImageCarousel
            imagesArray={space.photoURLs?.map((url) => ({
              imgPath: url,
              alt: "",
              label: "",
            }))}
          />
        </Grid>
        <Grid item>{/*amenities...*/}</Grid>
        <Grid item>
          <PrimaryText variant="h5">{space.assetDescription}</PrimaryText>
        </Grid>
        <Grid item container alignItems="center">
          <Grid item>
            <MICO>
              <LocationOn />
            </MICO>
          </Grid>
          {space.address && (
            <Grid item>
              <PrimaryText>
                {Object.keys(space.address)
                  .filter((name) => name !== "_id")
                  .map((key) =>
                    space.address
                      ? space.address[key as keyof typeof space.address]
                      : [],
                  )
                  .join(", ")}
              </PrimaryText>
            </Grid>
          )}
        </Grid>
        <Divider />
        <Grid item>
          <Btn onClick={() => setModal("book")}>Book this Space</Btn>
        </Grid>
        <Grid item>
          <Btn onClick={() => setModal("message")}>
            Start a conversation with the host
          </Btn>
        </Grid>
      </Grid>
    </>
  ) : (
    <PrimaryText>Loading Listing...</PrimaryText>
  );
};
