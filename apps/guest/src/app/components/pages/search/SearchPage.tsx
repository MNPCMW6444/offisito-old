import { Button, Grid } from "@mui/material";
import SearchBar from "./SearchBar";
import React, { useState } from "react";
import { PrimaryText } from "@monorepo/react-styles";

const SearchPage = () => {
  const [query, setQuery] = useState<string>("");

  return (
    <Grid container direction="column" alignItems="center">
      <Grid item height="15%" />
      <Grid item>
        <PrimaryText>Find your</PrimaryText>
      </Grid>
      <Grid item>
        <PrimaryText>Offisito</PrimaryText>
      </Grid>
      <Grid item width="100%">
        <SearchBar query={query} setQuery={setQuery} />
      </Grid>
      <Grid item>asdasdasd</Grid>
      <Grid item>
        <Button variant="contained">Search</Button>
      </Grid>
    </Grid>
  );
};

export default SearchPage;
