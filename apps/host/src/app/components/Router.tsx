import { useContext } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Box, useTheme } from "@mui/material";
import { AuthContext, AuthPage } from "@monorepo/react-components";
import DashboardPage from "./pages/home/DashboardPage";
import SpacesPage from "./pages/spaces/SpacesPage";
import SpaceForm from "./pages/spaces/SpaceForm";

const Router = () => {
  const { user } = useContext(AuthContext);

  const backgroundColor = useTheme().palette.background.default; // Get default background color from theme

  return (
    <BrowserRouter>
      {user ? (
        <Box bgcolor={backgroundColor}>
          <Box component="main">
            <Routes>
              <Route path="/*" element={<DashboardPage />} />
              <Route path="/profiles" element={<SpacesPage />} />
              <Route path="/profile" element={<SpacesPage />} />
              <Route path="/spaces" element={<SpacesPage />} />
              <Route path="/space" element={<SpaceForm />} />
            </Routes>
          </Box>
        </Box>
      ) : (
        <AuthPage client="host" />
      )}
    </BrowserRouter>
  );
};

export default Router;
