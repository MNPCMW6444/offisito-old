import { useContext } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthContext, AuthPage } from "@monorepo/react-components";
import DashboardPage from "./pages/home/DashboardPage";
import SpacesPage from "./pages/spaces/SpacesPage";
import SpaceForm from "./pages/spaces/SpaceForm";
import ProfilesPage from "./pages/profiles/ProfilesPage";
import ProfileForm from "./pages/profiles/ProfileForm";
import { Grid } from "@mui/material";

const Router = () => {
  const { user } = useContext(AuthContext);

  return (
    <BrowserRouter>
      {user ? (
        <Grid
          width="100%"
          height="100%"
          container
          justifyContent="center"
          bgcolor={(theme) => theme.palette.background.paper}
          wrap="nowrap"
        >
          <Grid
            item
            height="100%"
            width="1000px"
            container
            direction="column"
            bgcolor={(theme) => theme.palette.background.default}
            wrap="nowrap"
          >
            <Grid
              item
              height="100px"
              container
              justifyContent="space-between"
              alignItems="center"
              wrap="nowrap"
            >
              <Grid item>Logo</Grid>
              <Grid item>Menu</Grid>
            </Grid>
            <Grid item>
              <Routes>
                <Route path="/*" element={<DashboardPage />} />
                <Route path="/profiles" element={<ProfilesPage />} />
                <Route path="/profile" element={<ProfileForm />} />
                <Route path="/spaces" element={<SpacesPage />} />
                <Route path="/space" element={<SpaceForm />} />
              </Routes>
            </Grid>
          </Grid>
        </Grid>
      ) : (
        <AuthPage client="host" />
      )}
    </BrowserRouter>
  );
};
export default Router;
