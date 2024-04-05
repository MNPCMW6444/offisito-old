import { Grid } from "@mui/material";
import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import {
  AssetCard,
  Btn,
  ImageCarousel,
  ListingPage,
  MICO,
  PrimaryText,
  ServerContext,
} from "@offisito/shared-react";
import HomeTop from "./HomeTop";
import NearSpaces from "./NearSpaces";
import AvailableSpaces from "./AvailableSpaces";
import { SearchContext } from "@offisito/shared-react";
import { Asset } from "@offisito/shared";
import ResultsMap from "./ResultsMap";
import { useLocation } from "react-router-dom";
import { LocationOn, Tune } from "@mui/icons-material";

const FindPage = () => {
  const { setSearch, results, setResults, fetch } = useContext(SearchContext);
  const [selectedListing, setSelectedListing] = useState<Asset>();
  const [mapMode, setMapMode] = useState(false);

  const server = useContext(ServerContext);

  const useQuery = () => {
    const location = useLocation();
    return useMemo(
      () => new URLSearchParams(location.search),
      [location.search],
    );
  };

  const query = useQuery();

  const fetchAsset = useCallback(
    async (id: string) => {
      const res = await server?.axiosInstance.get("api/search/single/" + id);
      res && setSelectedListing(res.data);
    },
    [server?.axiosInstance],
  );

  useEffect(() => {
    fetch();
  }, [fetch]);

  useEffect(() => {
    const id = query.get("space");
    if (id) {
      fetchAsset(id);
    } else setSelectedListing(undefined);
  }, [query, fetchAsset, setResults]);

  return selectedListing ? (
    <ListingPage space={selectedListing} />
  ) : (
    <Grid
      container
      direction="column"
      width="100%"
      height="100%"
      alignItems="center"
      rowSpacing={4}
      paddingTop="20px"
      overflow="scroll"
    >
      {results ? (
        results.length > 0 ? (
          <>
            <Grid item width="100%" height="90px" padding="5% 5% 0">
              <Grid
                item
                container
                width="100%"
                height="100%"
                alignItems="center"
                wrap="nowrap"
                borderRadius="35px"
                boxShadow="1px 2px #bababa"
                onClick={() => {
                  setSearch(true);
                  setResults(undefined);
                }}
              >
                <Grid item width="10%" paddingLeft="5%">
                  <MICO>
                    <LocationOn />
                  </MICO>
                </Grid>
                <Grid item width="80%" paddingLeft="5%">
                  <PrimaryText>Click to open search</PrimaryText>
                </Grid>
                <Grid item width="10%">
                  <MICO>
                    <Tune />
                  </MICO>
                </Grid>
              </Grid>
            </Grid>
            {/* <Grid item width="100%" padding="5% 5% 0">
              <Btn onClick={() => setResults(undefined)}>Re-Search</Btn>
            </Grid>*/}
            {mapMode ? (
              <Grid item width="100%" height="100%">
                <ResultsMap setMap={setMapMode} assets={results} />
              </Grid>
            ) : (
              <>
                <Grid item>
                  <Btn onClick={() => setMapMode(true)}>Map View</Btn>
                </Grid>

                {results.map((asset) => (
                  <Grid item width="100%" key={asset._id.toString()}>
                    <AssetCard asset={asset} />
                  </Grid>
                ))}
              </>
            )}
          </>
        ) : (
          <>
            <Grid item width="100%" padding="5% 5% 0">
              <PrimaryText>No Spaces found for selected filters</PrimaryText>
            </Grid>
            <Grid item width="100%" padding="5% 5% 0">
              <Btn onClick={() => setResults(undefined)}>Re-Search</Btn>
            </Grid>
          </>
        )
      ) : (
        <>
          <Grid item width="100%" padding="5% 5% 0">
            <HomeTop setSearch={setSearch} />
          </Grid>
          <Grid item paddingLeft="4%" paddingTop="2%" width="96%">
            <ImageCarousel />
          </Grid>
          <Grid item width="100%">
            <NearSpaces />
          </Grid>
          <Grid item>
            <AvailableSpaces />
          </Grid>
        </>
      )}
    </Grid>
  );
};

export default FindPage;
