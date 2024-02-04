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
import { Asset, ListAssetReq } from "@monorepo/types";
import { Add } from "@mui/icons-material";
import { ServerContext } from "@monorepo/server-provider";
import debounce from "lodash.debounce";
import {
  axiosErrorToaster,
  formatLabel,
  renderSwitchesHOC,
} from "@monorepo/react-components";
import { useLocation } from "react-router-dom";

const ListPage = () => {
  const [formState, setFormState] = useState<ListAssetReq>();
  const server = useContext(ServerContext);

  const fetchAsset = async (id: string) => {
    try {
      const res = await server?.axiosInstance.get(
        "/api/assets/asset_detail/" + id,
      );
      setFormState(res?.data.asset);
    } catch (e) {
      axiosErrorToaster(e);
    }
  };

  const useQuery = () => new URLSearchParams(useLocation().search);
  const query = useQuery();

  useEffect(() => {
    const id = query.get("id");
    id && fetchAsset(id).then();
  }, [query]);

  const fileInputRef = createRef<HTMLInputElement>();

  const handleUpdate = async (updatedState: ListAssetReq) => {
    formState &&
      (formState as Asset)._id &&
      (await server?.axiosInstance.patch("/api/assets/", {
        newAsset: { _id: (formState as Asset)._id, ...updatedState },
      }));
  };

  const debouncedUpdate = useCallback(debounce(handleUpdate, 500), []);
  useEffect(() => {
    return () => {
      debouncedUpdate.cancel();
    };
  }, [debouncedUpdate]);

  const handleChange = (name: string, value: string | boolean) => {
    setFormState((prevState) => {
      const updatedState = { ...(prevState || {}), [name]: value };
      if (!updatedState?.officeName)
        updatedState.officeName = "enter Office Name";
      updatedState && debouncedUpdate(updatedState as ListAssetReq);
      return updatedState as ListAssetReq;
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
        "/api/assets/uploadPicture/" + (formState as Asset)._id,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        },
      ));
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

  useEffect(() => {
    if (!formState?.amenities)
      setFormState((p) => {
        if (p) {
          const n = JSON.parse(JSON.stringify(p));
          n.amenities = {};
          return n;
        } else return { amenities: {} };
      });
  }, [formState]);

  return (formState as Asset)?._id && formState?.amenities ? (
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
          formState?.amenities as unknown as { [key: string]: boolean },
          "amenities",
        )}
      </Grid>
      {formState?.availability && (
        <Grid item>
          {formState?.availability &&
            renderSwitches(
              formState?.availability as unknown as { [key: string]: boolean },
              "availability",
            )}
        </Grid>
      )}
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
