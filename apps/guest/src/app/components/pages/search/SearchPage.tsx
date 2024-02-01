import { Button, Grid, Typography } from "@mui/material";
import SearchBar from "./SearchBar";
import React, { useState } from "react";
import { formatLabel, renderSwitchesHOC } from "@monorepo/react-components";
import { Amenities } from "@monorepo/types";

const SearchPage = () => {
  const [query, setQuery] = useState<string>("");
  const [amenities, setAmenities] = useState<Amenities>({
    freeWiFi: false,
    parking: false,
    lobbySpace: false,
    computer: false,
  });

  const renderSwitches = renderSwitchesHOC(
    (name: string, value: boolean) =>
      setAmenities((prevState) => ({
        ...prevState,
        [name.split(".")[1]]: value,
      })),
    formatLabel,
  );

  return (
    <Grid container direction="column" alignItems="center">
      <Grid item height="15%" />
      <Grid item>
        <Typography>Find your</Typography>
      </Grid>
      <Grid item>
        <Typography>Offisito</Typography>
      </Grid>
      <Grid item width="100%">
        <SearchBar query={query} setQuery={setQuery} />
      </Grid>
      <Grid item>
        {renderSwitches(
          amenities as unknown as { [key: string]: boolean },
          "amenities",
        )}
      </Grid>
      <Grid item>
        <Button variant="contained">Search</Button>
      </Grid>
    </Grid>
  );
};

export default SearchPage;
