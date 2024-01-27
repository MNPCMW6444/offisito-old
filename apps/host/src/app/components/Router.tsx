import { useContext, useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Box, useTheme } from "@mui/material";
import { AuthContext, AuthPage } from "@monorepo/react-components";
import HomePage from "./pages/home/HomePage";
import ListPage from "./pages/list/ListPage";
import { Asset } from "@monorepo/types";
import { ServerContext } from "@monorepo/server-provider";

const Router = () => {
  const { user } = useContext(AuthContext);

  const backgroundColor = useTheme().palette.background.default; // Get default background color from theme

  ////////////////////////mock

  const [listing, setListing] = useState<Asset>();
  const server = useContext(ServerContext);
  const fetchListing = () =>
    server?.axiosInstance
      .get<Asset[]>("api/assets/" + "65b38e5180b57da867a08fdc")
      .then((res) => setListing(res.data[0]));

  useEffect(() => {
    fetchListing();
  }, []);

  ////////////////////////mock
  return (
    <BrowserRouter>
      {user ? (
        <Box bgcolor={backgroundColor}>
          <Box component="main">
            <Routes>
              <Route path="/*" element={<HomePage />} />
              <Route
                path="/list"
                element={<ListPage fetchedAsset={listing} />}
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
        <AuthPage client="host" />
      )}
    </BrowserRouter>
  );
};

export default Router;
