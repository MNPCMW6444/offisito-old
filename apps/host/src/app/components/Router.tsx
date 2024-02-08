import { useContext } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthContext, AuthPage } from "@monorepo/react-components";
import DashboardPage from "./pages/home/DashboardPage";
import SpacesPage from "./pages/spaces/SpacesPage";
import SpaceForm from "./pages/spaces/SpaceForm";
import ProfilesPage from "./pages/profiles/ProfilesPage";
import ProfileForm from "./pages/profiles/ProfileForm";
import { Divider, Grid } from "@mui/material";
import TopBar from "./pages/TopBar";

const Router = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <BrowserRouter>
      {user ? (
        <Grid
          width="100%"
          height="100%"
          container
          justifyContent="center"
          bgcolor={(theme) => theme.palette.background.default}
          wrap="nowrap"
        >
          <Grid
            item
            height="100%"
            width="1000px"
            container
            direction="column"
            bgcolor={(theme) => theme.palette.background.paper}
            wrap="nowrap"
            overflow="hidden"
          >
            <Grid
              item
              height="90px"
              bgcolor={(theme) => theme.palette.secondary.contrastText}
              border={(theme) => "0.1vw solid " + theme.palette.text.secondary}
              borderRadius="5px"
              padding="20px 25px 0 25px"
            >
              <TopBar />
            </Grid>
            <Grid item padding="20px 25px 0 25px">
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
