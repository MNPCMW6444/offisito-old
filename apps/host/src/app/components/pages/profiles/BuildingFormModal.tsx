import { Grid, Modal } from "@mui/material";
import {
  Building,
  Company,
  PrimaryText,
  ServerContext,
} from "@monorepo/shared";
import { useContext, useState } from "react";

const BuildingFormModal = () => {
  const [formState, setFormState] = useState<Building>();
  const server = useContext(ServerContext);

  return (
    <Modal open>
      <Grid
        container
        justifyContent="100%"
        alignItems="center"
        width="100%"
        height="100%"
      >
        <Grid
          item
          container
          direction="column"
          rowSpacing={4}
          sx={{ overflowX: "scroll" }}
          wrap="nowrap"
          alignItems="center"
          padding="2%"
          width="80%"
          marginLeft="10%"
          bgcolor={(theme) => theme.palette.background.default}
        >
          <Grid item>
            <PrimaryText variant="h4">Building</PrimaryText>
          </Grid>
        </Grid>
      </Grid>
    </Modal>
  );
};
export default BuildingFormModal;
