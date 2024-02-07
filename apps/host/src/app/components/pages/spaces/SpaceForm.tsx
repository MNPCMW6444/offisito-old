import React, {
  ChangeEvent,
  createRef,
  useCallback,
  useContext,
  useEffect,
  useRef,
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
import { Asset, CreateEditAssetReq } from "@monorepo/types";
import { Add } from "@mui/icons-material";
import { ServerContext } from "@monorepo/server-provider";
import debounce from "lodash.debounce";
import {
  axiosErrorToaster,
  formatLabel,
  renderSwitchesHOC,
} from "@monorepo/react-components";
import { useLocation } from "react-router-dom";
import { ObjectId } from "mongoose";

const SpaceForm = () => {
  const [formState, setFormState] = useState<Asset>();
  const server = useContext(ServerContext);

  const fetchAsset = useCallback(
    async (id: string) => {
      try {
        const res = await server?.axiosInstance.get(
          "/api/host/asset/asset_detail/" + id,
        );
        setFormState(res?.data.data);
      } catch (e) {
        axiosErrorToaster(e);
      }
    },
    [server?.axiosInstance],
  );

  const useQuery = () => new URLSearchParams(useLocation().search);
  const query = useQuery();

  const hasFetched = useRef(false);

  useEffect(() => {
    const id = query.get("id");
    if (id && !hasFetched.current) {
      fetchAsset(id).then(() => {
        hasFetched.current = true;
      });
    }
  }, [query, fetchAsset]);

  const fileInputRef = createRef<HTMLInputElement>();

  const handleUpdate = async (updatedState: Asset) => {
    formState &&
      (await server?.axiosInstance.patch(
        "/api/assets/edit_asset" + formState._id,
        {
          newAsset: {
            _id: formState._id,
            ...updatedState,
          },
        },
      ));
  };

  const debouncedUpdate = debounce(handleUpdate, 500);

  useEffect(() => {
    return () => {
      debouncedUpdate.cancel();
    };
  }, [debouncedUpdate]);

  const handleChange = (name: keyof Asset, value: string | boolean) => {
    formState &&
      setFormState(
        (prevState) =>
          ({
            ...prevState,
            [name]: value,
          }) as any,
      );
  };

  const handleTextFieldChange = (e: ChangeEvent<HTMLInputElement>) => {
    handleChange(e.target.name as keyof Asset, e.target.value);
  };

  const handleSwitchChange = (key: string, checked: boolean) => {
    handleChange(key as keyof Asset, checked);
  };

  const renderTextField = (name: keyof Asset, label: string) => (
    <TextField
      multiline
      variant="standard"
      label={label}
      value={formState ? formState[name] : ""}
      onChange={handleTextFieldChange}
      name={name}
    />
  );

  const renderSwitches = renderSwitchesHOC(handleSwitchChange, formatLabel);

  const uploadPicture = async (file: File) => {
    const formData = new FormData();
    formData.append("photo", file);
    formState &&
      (await server?.axiosInstance.post(
        "/api/assets/uploadPicture/" + (formState as unknown as Asset)._id,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        },
      ));
  };

  const handleFileSelect = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      uploadPicture(file).then();
    }
  };

  const addPicture = () => {
    fileInputRef.current?.click();
  };

  const publish = async () => {
    await server?.axiosInstance.post("/api/assets/publish", {});
  };

  useEffect(() => {
    if (!formState?.amenities)
      setFormState((p) => {
        const n = p ? JSON.parse(JSON.stringify(p)) : {};
        n.amenities = {};
        n.availability = {
          sun: false,
          mon: false,
          tues: false,
          wed: false,
          thu: false,
          fri: false,
          sat: false,
        };
        return n;
      });
  }, [formState]);

  console.log(formState);
  return (formState as unknown as Asset)?._id ? (
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
        <PrimaryText>List a Space</PrimaryText>
      </Grid>
      <Grid item>{renderTextField("assetDescription", "Desc")}</Grid>
      <Grid item>
        {renderSwitches(
          formState?.amenities as unknown as { [key: string]: boolean },
          "amenities",
        )}
      </Grid>
      <Grid item container alignItems="center" columnSpacing={4}>
        <Grid item>{renderTextField("leasingCompany", "Company in Hold")}</Grid>
        <Grid item>{renderTextField("roomNumber", "Floor")}</Grid>
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
      ;
    </Grid>
  ) : (
    <PrimaryText>Error</PrimaryText>
  );
};

export default SpaceForm;
