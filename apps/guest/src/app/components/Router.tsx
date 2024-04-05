import { useContext } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import {
  AuthContext,
  AuthPage,
  ChatContextProvider,
  ChatsPage,
  NotificationsPage,
  SettingPage,
  TopBar,
} from "@offisito/shared-react";
import FindPage from "./pages/search/FindPage";
import { alpha, Backdrop, Box } from "@mui/material";
import SearchBackdrop from "./pages/search/SearchBackdrop";
import { SearchContext } from "@offisito/shared-react";
import MyPage from "./pages/my/MyPage";

const routes = [
  { name: "Find Office", route: "search" },
  { name: "My Bookings", route: "my" },
  { name: "Chats", route: "chats" },
  {
    name: "Settings",
    route: "settings",
  },
  { name: "Logout", route: "logout" },
];

const Router = () => {
  const { user } = useContext(AuthContext);

  const { search, results } = useContext(SearchContext);

  return (
    <BrowserRouter>
      {user ? (
        <ChatContextProvider>
          {/*<TopBar routes={routes} isGuest />*/}
          {search && !results ? (
            <Backdrop
              sx={{
                backgroundColor: (theme) =>
                  alpha(theme.palette.background.default, 0.95),
                zIndex: 100,
                position: "relative", // can be absolute so that we see the background bluey but for lilush its relative. if absolute then need to fix position size and trinary to both - only first is conditional
                top: 0,
                left: 0,
              }}
              open
            >
              <SearchBackdrop />
            </Backdrop>
          ) : (
            <Box>
              <Routes>
                <Route path="/*" element={<FindPage />} />
                <Route path="/my" element={<MyPage />} />
                <Route path="/chats" element={<ChatsPage isGuest />} />
                <Route path="/settings" element={<SettingPage />} />
                <Route path="/notifications" element={<NotificationsPage />} />
              </Routes>
            </Box>
          )}
        </ChatContextProvider>
      ) : (
        <AuthPage />
      )}
    </BrowserRouter>
  );
};

export default Router;
