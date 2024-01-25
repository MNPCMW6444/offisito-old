import {
  Button,
  FormControlLabel,
  FormLabel,
  Grid,
  IconButton,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import { ListAssetReq } from "@monorepo/types";
import { createRef, useState } from "react";
import { Add } from "@mui/icons-material";

const ListPage = () => {
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

  const [imageFiles, setImageFiles] = useState([]);

  const fileInputRef = createRef<any>();

  const handleFileSelect = (event: any) => {
    const files: any = Array.from(event.target.files);
    setImageFiles(files);
    // Optionally, update formState.photoURLs with file information
  };

  const addPicture = () => {
    fileInputRef.current.click();
  };
  const publish = () => {};

  return (
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
      <Grid item>
        <TextField
          multiline
          variant="standard"
          label="Office Name"
          value={formState?.officeName}
          onChange={(e) =>
            setFormState((prev) => {
              const updated = JSON.parse(JSON.stringify(prev));
              updated.officeName = e.target.value;
              return updated;
            })
          }
        />
      </Grid>
      <Grid item>
        <TextField
          variant="standard"
          label="Desc"
          value={formState?.desc}
          onChange={(e) =>
            setFormState((prev) => {
              const updated = JSON.parse(JSON.stringify(prev));
              updated.desc = e.target.value;
              return updated;
            })
          }
        />
      </Grid>
      <Grid item>
        <FormLabel component="legend">Ameneties</FormLabel>
        <FormControlLabel
          control={
            <Switch
              checked={formState.amenities.freeWiFi}
              onChange={(e) =>
                setFormState((prev) => {
                  const updated = JSON.parse(JSON.stringify(prev));
                  updated.amenities.freeWiFi = e.target.checked;
                  return updated;
                })
              }
            />
          }
          label="Free Wifi"
        />
        <FormControlLabel
          control={
            <Switch
              checked={formState.amenities.parking}
              onChange={(e) =>
                setFormState((prev) => {
                  const updated = JSON.parse(JSON.stringify(prev));
                  updated.amenities.parking = e.target.checked;
                  return updated;
                })
              }
            />
          }
          label="Parking"
        />
        <FormControlLabel
          control={
            <Switch
              checked={formState.amenities.lobbySpace}
              onChange={(e) =>
                setFormState((prev) => {
                  const updated = JSON.parse(JSON.stringify(prev));
                  updated.amenities.lobbySpace = e.target.checked;
                  return updated;
                })
              }
            />
          }
          label="Lobby Space"
        />
        <FormControlLabel
          control={
            <Switch
              checked={formState.amenities.computer}
              onChange={(e) =>
                setFormState((prev) => {
                  const updated = JSON.parse(JSON.stringify(prev));
                  updated.amenities.computer = e.target.checked;
                  return updated;
                })
              }
            />
          }
          label="Computer"
        />
      </Grid>
      <Grid item container alignItems="center" columnSpacing={4}>
        <Grid item>
          <TextField
            multiline
            variant="standard"
            label="Company in hold"
            value={formState?.companyInHold}
            onChange={(e) =>
              setFormState((prev) => {
                const updated = JSON.parse(JSON.stringify(prev));
                updated.companyInHold = e.target.value;
                return updated;
              })
            }
          />
        </Grid>
        <Grid item>
          <TextField
            sx={{
              width: "30%",
            }}
            variant="standard"
            label="Floor"
            value={formState?.floor}
            onChange={(e) =>
              setFormState((prev) => {
                const updated = JSON.parse(JSON.stringify(prev));
                updated.floor = e.target.value;
                return updated;
              })
            }
          />
        </Grid>
      </Grid>
      <Grid item>
        <FormLabel component="legend">Availability</FormLabel>
        <FormControlLabel
          control={
            <Switch
              checked={formState.availability.mon}
              onChange={(e) =>
                setFormState((prev) => {
                  const updated = JSON.parse(JSON.stringify(prev));
                  updated.availability.mon = e.target.checked;
                  return updated;
                })
              }
            />
          }
          label="Mon."
        />
        <FormControlLabel
          control={
            <Switch
              checked={formState.availability.tues}
              onChange={(e) =>
                setFormState((prev) => {
                  const updated = JSON.parse(JSON.stringify(prev));
                  updated.availability.tues = e.target.checked;
                  return updated;
                })
              }
            />
          }
          label="Tues."
        />
        <FormControlLabel
          control={
            <Switch
              checked={formState.availability.wed}
              onChange={(e) =>
                setFormState((prev) => {
                  const updated = JSON.parse(JSON.stringify(prev));
                  updated.availability.wed = e.target.checked;
                  return updated;
                })
              }
            />
          }
          label="Wed."
        />
        <FormControlLabel
          control={
            <Switch
              checked={formState.availability.thu}
              onChange={(e) =>
                setFormState((prev) => {
                  const updated = JSON.parse(JSON.stringify(prev));
                  updated.availability.thu = e.target.checked;
                  return updated;
                })
              }
            />
          }
          label="Thu."
        />
        <FormControlLabel
          control={
            <Switch
              checked={formState.availability.fri}
              onChange={(e) =>
                setFormState((prev) => {
                  const updated = JSON.parse(JSON.stringify(prev));
                  updated.availability.fri = e.target.checked;
                  return updated;
                })
              }
            />
          }
          label="Fri."
        />
        <FormControlLabel
          control={
            <Switch
              checked={formState.availability.sat}
              onChange={(e) =>
                setFormState((prev) => {
                  const updated = JSON.parse(JSON.stringify(prev));
                  updated.availability.sat = e.target.checked;
                  return updated;
                })
              }
            />
          }
          label="Sat."
        />
        <FormControlLabel
          control={
            <Switch
              checked={formState.availability.sun}
              onChange={(e) =>
                setFormState((prev) => {
                  const updated = JSON.parse(JSON.stringify(prev));
                  updated.availability.sun = e.target.checked;
                  return updated;
                })
              }
            />
          }
          label="Sun."
        />
      </Grid>
      <Grid item>
        <FormLabel component="legend">Property pictures</FormLabel>
        <IconButton onClick={addPicture}>
          <Add sx={{ fontSize: "250%" }} />
        </IconButton>
        {/* Hidden file input */}
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileSelect}
          multiple
          style={{ display: "none" }}
        />
        {/* Display selected images */}
        {imageFiles.map((file: any, index) => (
          <div key={index}>{file.name}</div> // Display file names or thumbnails
        ))}
      </Grid>
      <Grid item container justifyContent="center">
        <Button onClick={publish}>Publish</Button>
      </Grid>
    </Grid>
  );
};

export default ListPage;
