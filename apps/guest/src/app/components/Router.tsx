import { useContext } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Box, useTheme } from "@mui/material";
import { AuthContext, AuthPage } from "@monorepo/react-components";
import HomePage from "./pages/home/HomePage";
import SearchPage from "./pages/search/SearchPage";

const Router = () => {
  const { user } = useContext(AuthContext);

  const backgroundColor = useTheme().palette.background.default; // Get default background color from theme

  return (
    <BrowserRouter>
      {user ? (
        <Box bgcolor={backgroundColor}>
          <Box component="main">
            <Routes>
              <Route path="/*" element={<HomePage />} />
              <Route path="/search" element={<SearchPage />} />
            </Routes>
          </Box>
        </Box>
      ) : (
        <AuthPage client="guest" />
      )}
    </BrowserRouter>
  );
};

export default Router;
