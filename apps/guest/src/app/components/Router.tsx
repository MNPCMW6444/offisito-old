import { useContext } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Box, useTheme } from "@mui/material";
import { AuthContext, AuthPage } from "@monorepo/react-components";
import HomePage from "./pages/home/HomePage";

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
              {/*      <Route path="/contacts" element={<ContactsPage />} />
                    <Route path="/sessions" element={<SessionsPage />} />
                    <Route path="/chat" element={<ChatPage />} />
                    <Route path="/roles" element={<Roles />} />
                    <Route path="/sets" element={<Sets />} />
                    <Route path="/settings" element={<SettingsPage />} />
                    <Route
                      path="/notifications"
                      element={<NotificationsTab />}
                    />
                    <Route path="/shop" element={<ShopPage />} />
                    <Route path="/sub" element={<SubPage />} />*/}
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
