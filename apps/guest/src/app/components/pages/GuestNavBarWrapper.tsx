import { Grid } from "@mui/material";
import NavBar from "../../../../../../libs/shared-react/src/components/global/NavBar";
import { useLocation } from "react-router-dom";
import { useContext, useMemo } from "react";
import { SearchContext } from "@offisito/shared-react";
import { home, favorites, messages, person } from "@offisito/shared-react";

const GuestNavBarWrapper = () => {
  const { search, results } = useContext(SearchContext);

  const useQuery = () => {
    const location = useLocation();
    return useMemo(
      () => new URLSearchParams(location.search),
      [location.search],
    );
  };

  const query = useQuery();

  return (
    (!search || results) &&
    !query.get("space") && (
      <Grid item width="100%">
        <NavBar
          buttons={[
            {
              navPath: "/",
              iconSrc: home,
            },
            {
              navPath: "/wish",
              iconSrc: favorites,
            },
            {
              navPath: "/chats",
              iconSrc: messages,
            },
            {
              navPath: "/settings",
              iconSrc: person,
            },
          ]}
        />
      </Grid>
    )
  );
};

export default GuestNavBarWrapper;
