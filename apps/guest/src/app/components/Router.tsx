import { useContext } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Box, Typography, useTheme } from "@mui/material";
import { useMobile } from "@monorepo/react-components";
import { AuthContext, AuthPage } from "@monorepo/react-components";

const Router = () => {
  const { user } = useContext(AuthContext);

  const { isMobile } = useMobile();

  const backgroundColor = useTheme().palette.background.default; // Get default background color from theme
  console.log(user);
  return (
    <BrowserRouter>
      {user ? (
        <Box overflow="hidden" style={{ backgroundColor }}>
          {/* <WhiteSideBar />*/}
          <Box
            component="main"
            sx={
              !isMobile
                ? {
                    flexGrow: 1,
                    p: 3,
                    backgroundColor,
                    pt: (theme) => theme.spacing(1),
                    pl: (theme) => theme.spacing(32),
                  }
                : { pt: "5vh" }
            }
          >
            <Routes>
              <Route
                path="/*"
                element={
                  <Typography>Hello: {JSON.stringify(user)} </Typography>
                }
              />
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
