import { Box, Button, Grid, Modal, TextField } from "@mui/material";
import {
  axiosErrorToaster,
  Building,
  createBuildingReq,
  format,
  PrimaryText,
  renderSwitch,
  renderTextField,
  ServerContext,
} from "@monorepo/shared";
import { Dispatch, SetStateAction, useContext, useState } from "react";

interface BuildingFormModalProps {
  setBuildingForm: Dispatch<SetStateAction<boolean>>;
}

const BuildingFormModal = ({ setBuildingForm }: BuildingFormModalProps) => {
  const [formState, setFormState] = useState<createBuildingReq>({
    buildingName: "New",
    address: {
      street: "Please",
      city: "Enter",
      country: "the Address",
    },
  });
  const server = useContext(ServerContext);

  const handleChange = (
    name: keyof Building,
    value: string | Date | boolean,
  ) => {
    formState &&
      setFormState(((prevState: Building) => ({
        ...prevState,
        [name]: value,
      })) as any);
  };

  const [location, setLocation] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const handleLocationChange = async (event: any) => {
    const value = event.target.value;
    setLocation(value);

    if (value.length > 2) {
      try {
        if (server) {
          const { data } = await server?.axiosInstance.get(
            `/api/geo/autocomplete-address/${value}`,
          );
          setSuggestions(data.predictions);
        } else throw new Error("No server");
      } catch (error) {
        console.error("Error fetching autocomplete suggestions:", error);
      }
    } else {
      setSuggestions([]);
    }
  };

  const renderSuggestions = () => {
    return suggestions.map((suggestion: any, index) => (
      <div
        key={index}
        onClick={async () => {
          setLocation(suggestion.description);
          const { main_text, secondary_text } =
            suggestion.structured_formatting;

          const cords = await server?.axiosInstance.get(
            "api/geo/getLocation/" + suggestion.description,
          );

          setFormState(((prev: Building) => ({
            ...prev,
            address: {
              street: main_text,
              city: secondary_text.split(", ")[0],
              country: secondary_text.split(", ")[1],
              geoLocalisation: {
                type: "Point",
                coordinates: Object.values(cords?.data),
              },
            },
          })) as any);
          setSuggestions([]);
        }}
      >
        <PrimaryText>{suggestion.description}</PrimaryText>
      </div>
    ));
  };

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
          overflow="scroll"
        >
          <Grid item>
            <PrimaryText variant="h4">Building</PrimaryText>
          </Grid>
          <Grid item>
            {renderTextField(formState, handleChange, "buildingName")}
          </Grid>
          <Grid item>
            <TextField
              id="autocomplete"
              label="Address"
              variant="outlined"
              fullWidth
              value={location}
              onChange={handleLocationChange}
            />
            {renderSuggestions()}
          </Grid>
          <Grid item>
            {renderTextField(formState, handleChange, "buildingDescription", {
              multiline: true,
            })}
          </Grid>
          <Grid item>
            {renderSwitch(
              formState,
              handleChange,
              "doorman",
              format("doorman") + " ?",
            )}
          </Grid>
          <Grid item>
            {renderSwitch(
              formState,
              handleChange,
              "security",
              format("security") + " ?",
            )}
          </Grid>
          <Grid item>
            {renderSwitch(
              formState,
              handleChange,
              "vip_service",
              format("vip_service") + " ?",
            )}
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              onClick={() =>
                server?.axiosInstance
                  .post("api/host/building/add_building", formState)
                  .then(() => setBuildingForm(false))
                  .catch((e) => axiosErrorToaster(e))
              }
            >
              Save New Building
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Modal>
  );
};
export default BuildingFormModal;
