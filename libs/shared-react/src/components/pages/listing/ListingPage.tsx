import { Avatar, Box, Divider, Grid } from "@mui/material";
import { ImageCarousel } from "./ImageCarousel";
import { LocationOn, Message } from "@mui/icons-material";
import { Btn, PrimaryText } from "../../../styled-components";
import { Asset, formatAddress } from "@offisito/shared";
import { useEffect, useState } from "react";
import {
  BookingRequestForm,
  getAmenityIcon,
  HostCard,
  IconColorer,
  mock1,
} from "../../../";
import SendMessageForm from "../../forms/SendMessageForm";
import { ResultsMap } from "../../";
import { useNavigate } from "react-router-dom";

interface ListingPageProps {
  space: Asset;
}

export const ListingPage = ({ space }: ListingPageProps) => {
  const [modal, setModal] = useState<"" | "book" | "amenities">("");

  useEffect(() => {
    const adjustHeight = () => {
      const x = document.getElementById("rmap");
      if (x)
        x.style.height =
          document.getElementById("asd")?.offsetWidth + "px" || "0px";
    };
    adjustHeight();
    window.addEventListener("resize", adjustHeight);
    return () => window.removeEventListener("resize", adjustHeight);
  }, []);

  const renderModal = () => {
    switch (modal) {
      case "book":
        return <BookingRequestForm close={() => setModal("")} asset={space} />;
      case "amenities":
        return null;
      case "":
        return (
          <SendMessageForm
            id={String(space.companyId)}
            amIaGuest
            spaceId={String(space._id)}
            close={() => setModal("")}
          />
        );
    }
  };

  const navigate = useNavigate();

  return space ? (
    <Grid
      width="100%"
      height="100%"
      container
      direction="column"
      justifyContent="space-between"
      wrap="nowrap"
      overflow="hidden"
    >
      <Grid
        item
        container
        width="100%"
        direction="column"
        overflow="scroll"
        rowSpacing={2}
        wrap="nowrap"
      >
        {modal && renderModal()}
        <Grid item width="100%">
          <ImageCarousel
            imagesArray={
              space.photoURLs?.map((url, index) => ({
                label: `Photo${index + 1}`,
                alt: `Photo${index + 1}`,
                imgPath: url,
              })) || [{ label: "Photo1", alt: "Photo1", imgPath: mock1 }]
            }
          />
        </Grid>
        {space.assetAmenities && (
          <Grid item paddingLeft="16px" paddingRight="16px">
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-start",
                gap: "24px",
                height: "40px",
                flexWrap: "nowrap",
              }}
            >
              {(space.assetAmenities.length > 3
                ? space.assetAmenities.splice(0, 3)
                : space.assetAmenities
              ).map(({ name }) => (
                <Box key={name}>
                  <Grid
                    container
                    justifyContent="center"
                    alignItems="center"
                    columnSpacing={1}
                    wrap="nowrap"
                  >
                    <Grid item>
                      {getAmenityIcon(name) && (
                        <Avatar
                          sx={{ width: 24, height: 24 }}
                          src={getAmenityIcon(name)}
                        />
                      )}
                    </Grid>
                    <Grid item>
                      <PrimaryText fontSize="75%">{name}</PrimaryText>
                    </Grid>
                  </Grid>
                </Box>
              ))}
              {space.assetAmenities.length > 3 && (
                <Box onClick={() => setModal("amenities")}>
                  <PrimaryText color="primary" fontSize="75%">
                    <u>show all</u>
                  </PrimaryText>
                </Box>
              )}
            </Box>
          </Grid>
        )}
        <Grid item paddingLeft="16px" paddingRight="16px">
          <PrimaryText variant="h4">
            {space.assetType} {space.roomNumber}
          </PrimaryText>
        </Grid>
        {space.address && (
          <Grid
            paddingLeft="16px"
            paddingRight="16px"
            item
            container
            alignItems="center"
            wrap="nowrap"
          >
            <Grid item>
              <IconColorer>
                <LocationOn />
              </IconColorer>
            </Grid>
            <Grid item>
              <PrimaryText>{formatAddress(space.address)}</PrimaryText>
            </Grid>
          </Grid>
        )}
        <Grid item paddingLeft="16px" paddingRight="16px">
          <Divider />
        </Grid>
        <Grid item paddingLeft="16px" paddingRight="16px">
          <HostCard companyId={String(space.companyId)} />
        </Grid>
        <Grid item paddingLeft="16px" paddingRight="16px">
          <Divider />
        </Grid>
        <Grid item paddingLeft="16px" paddingRight="16px">
          <PrimaryText>{space.assetDescription}</PrimaryText>
        </Grid>
        <Grid item paddingLeft="16px" paddingRight="16px">
          <Divider />
        </Grid>
        <Grid item paddingLeft="16px" paddingRight="16px">
          <PrimaryText variant="h5">Your offisito location</PrimaryText>
        </Grid>
        {space.address && (
          <Grid item paddingLeft="16px" paddingRight="16px">
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
        <Grid item width="100%" id="asd" paddingLeft="16px" paddingRight="16px">
          <ResultsMap setMap={() => {}} assets={[space]} single />
        </Grid>
      </Grid>
      <Grid
        item
        width="100%"
        container
        justifyContent="center"
        alignItems="center"
        columnSpacing={2}
        paddingTop="10px"
        paddingBottom="10px"
        paddingLeft="16px"
        paddingRight="16px"
        wrap="nowrap"
      >
        <Grid
          item
          width="67%"
          container
          justifyContent="center"
          alignItems="center"
          wrap="nowrap"
        >
          <Grid item>
            <Btn onClick={() => setModal("book")}>Book Space</Btn>
          </Grid>
        </Grid>
        <Grid
          item
          width="33%"
          container
          justifyContent="center"
          alignItems="center"
          wrap="nowrap"
        >
          <Grid item>
            <Btn onClick={() => navigate("/chats?chatId=" + String(space._id))}>
              <Message />
            </Btn>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  ) : (
    <PrimaryText>Loading Listing...</PrimaryText>
  );
};
