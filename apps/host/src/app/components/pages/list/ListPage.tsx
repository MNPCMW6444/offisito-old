import React, {
  ChangeEvent,
  createRef,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  Button,
  FormLabel,
  Grid,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import { ListAssetReq } from "@monorepo/types";
import { Add } from "@mui/icons-material";
import { ServerContext } from "@monorepo/server-provider";
import debounce from "lodash.debounce";
import { formatLabel, renderSwitchesHOC } from "@monorepo/react-components";

interface ListPageProps {
  _id: string;
}

const ListPage = ({ _id }: ListPageProps) => {
  if (!_id) _id = "65b38e5180b57da867a08fdc";
  const [formState, setFormState] = useState<ListAssetReq>({
    officeName: "",
    desc: "",
    amenities: {
      parking: false,
      computer: false,
      freeWiFi: false,
      lobbySpace: false,
    },
    availability: {
      fri: false,
      mon: false,
      sat: false,
      sun: false,
      thu: false,
      tues: false,
      wed: false,
    },
    companyInHold: "",
    floor: "",
    photoURLs: [],
  });

  const server = useContext(ServerContext);
  const fileInputRef = createRef<HTMLInputElement>();

  const handleUpdate = async (updatedState: ListAssetReq) => {
    await server?.axiosInstance.patch("/api/assets/", {
      newAsset: { _id, ...updatedState },
    });
  };

  const debouncedUpdate = useCallback(debounce(handleUpdate, 500), []);
  useEffect(() => {
    return () => {
      debouncedUpdate.cancel();
    };
  }, [debouncedUpdate]);

  const handleChange = (name: string, value: string | boolean) => {
    setFormState((prevState) => {
      const updatedState = { ...prevState, [name]: value };
      debouncedUpdate(updatedState);
      return updatedState;
    });
  };

  const handleTextFieldChange = (e: ChangeEvent<HTMLInputElement>) => {
    handleChange(e.target.name, e.target.value);
  };

  const handleSwitchChange = (key: string, checked: boolean) => {
    handleChange(key, checked);
  };

  const renderTextField = (name: keyof ListAssetReq, label: string) => (
    <TextField
      multiline
      variant="standard"
      label={label}
      value={formState[name]}
      onChange={handleTextFieldChange}
      name={name}
    />
  );

  const renderSwitches = renderSwitchesHOC(handleSwitchChange, formatLabel);

  const uploadPicture = async (file: File) => {
    const formData = new FormData();
    formData.append("photo", file);
    await server?.axiosInstance.post(
      "/api/assets/uploadPicture/" + _id,
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      },
    );
  };

  const handleFileSelect = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      uploadPicture(file);
    }
  };

  const addPicture = () => {
    fileInputRef.current?.click();
  };

  const publish = async () => {
    await server?.axiosInstance.post("/api/assets/publish", {});
  };

  return _id ? (
    <Grid
      container
      direction="column"
      rowSpacing={4}
      width="92%"
      height="80%"
      padding="10% 4%"
      sx={{ overflowX: "scroll" }}
    >
      <Grid item>
        <Typography>List a Space</Typography>
      </Grid>
      <Grid item>{renderTextField("officeName", "Office Name")}</Grid>
      <Grid item>{renderTextField("desc", "Desc")}</Grid>
      <Grid item>
        {renderSwitches(
          formState.amenities as unknown as { [key: string]: boolean },
          "amenities",
        )}
      </Grid>
      <Grid item>{renderSwitches(formState.availability, "availability")}</Grid>
      <Grid item container alignItems="center" columnSpacing={4}>
        <Grid item>{renderTextField("companyInHold", "Company in Hold")}</Grid>
        <Grid item>{renderTextField("floor", "Floor")}</Grid>
      </Grid>
      <Grid item>
        <FormLabel component="legend">Property Pictures</FormLabel>
        <IconButton onClick={addPicture}>
          <Add sx={{ fontSize: "250%" }} />
        </IconButton>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileSelect}
          multiple
          style={{ display: "none" }}
        />
      </Grid>
      <Grid item container justifyContent="center">
        <Button variant="contained" onClick={publish}>
          Publish
        </Button>
      </Grid>
    </Grid>
  ) : (
    <Typography>Error</Typography>
  );
};

export default ListPage;
