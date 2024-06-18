import { useContext, useMemo } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import {
  AuthContext,
  AuthPage,
  ChatContextProvider,
  ChatsPage,
  NotificationsPage,
  SearchContext,
  SettingPage,
} from "@offisito/shared-react";
import NavBar from "../../../../../libs/shared-react/src/components/global/NavBar";
import FindPage from "./pages/search/FindPage";
import MyPage from "./pages/my/MyPage";
import { alpha, Backdrop, Grid } from "@mui/material";
import SearchBackdrop from "./pages/search/SearchBackdrop";
import GuestNavBarWrapper from "./pages/GuestNavBarWrapper";

const Router = () => {
  const { user } = useContext(AuthContext);

  const { search, results } = useContext(SearchContext);

  return (
    <BrowserRouter>
      {user ? (
        <ChatContextProvider>
          <Grid
            height="100%"
            width="100%"
            container
            direction="column"
            justifyContent="space-between"
            alignContent="center"
            wrap="nowrap"
          >
            <Grid item width="100%" overflow="scroll" height="100%">
              {search ? (
                <Backdrop
                  sx={{
                    backgroundColor: (theme) =>
                      alpha(theme.palette.background.default, 0.95),
                    zIndex: 100,
                    position: "relative", // can be absolute so that we see the background bluey but for lilush its relative. if absolute then need to fix position size and trinary to both - only first is conditional
                    top: 0,
                    left: 0,
                    height: "100%",
                    width: "100%",
                  }}
                  open
                >
                  <SearchBackdrop />
                </Backdrop>
              ) : (
                <Routes>
                  <Route path="/*" element={<FindPage />} />
                  <Route path="/my" element={<MyPage />} />
                  <Route path="/chats" element={<ChatsPage isGuest />} />
                  <Route path="/settings" element={<SettingPage />} />
                  <Route path="/notification" element={<NotificationsPage />} />
                </Routes>
              )}
            </Grid>
            <GuestNavBarWrapper />
          </Grid>
        </ChatContextProvider>
      ) : (
        <AuthPage />
      )}
    </BrowserRouter>
  );
};

export default Router;
