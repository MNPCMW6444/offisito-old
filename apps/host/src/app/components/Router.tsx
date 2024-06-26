import { useContext } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import {
  AuthContext,
  AuthPage,
  ChatContextProvider,
  ChatsPage,
  dashboard,
  messages,
  NotificationsPage,
  person,
  SettingPage,
  timeline,
  TopBar,
} from "@offisito/shared-react";
import SummeryPage from "./pages/summery/SummeryPage";
import { Grid } from "@mui/material";
import { ListingsContextProvider } from "../../../../../libs/shared-react/src/context/ListingsContext";
import DashboardPage from "./pages/dashboard/DashboardPage";
import { BookingsContextProvider } from "../context/BookingsContext";
import WizaedPage from "./pages/wizard/WizaedPage";
import NavBar from "../../../../../libs/shared-react/src/components/global/NavBar";

const routes = [
  { name: "Summery", route: "summery" },
  { name: "Wizard", route: "wizard" },
  { name: "Dashboard", route: "dashboard" },
  {
    name: "Chats",
    route: "chats",
  },
  { name: "Settings", route: "settings" },
  { name: "Logout", route: "logout" },
];

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
          bgcolor={(theme) => theme.palette.background.default}
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
            overflow="hidden"
          >
            <ChatContextProvider>
              <Grid item>
                <TopBar routes={routes} />
              </Grid>
              <Grid item height="calc(100% - 90px)" overflow="scroll">
                <Routes>
                  <Route path="/*" element={<SummeryPage />} />
                  <Route
                    path="/dashboard"
                    element={
                      <ListingsContextProvider>
                        <BookingsContextProvider>
                          <DashboardPage />
                        </BookingsContextProvider>
                      </ListingsContextProvider>
                    }
                  ></Route>
                  <Route
                    path="/wizard"
                    element={
                      <ListingsContextProvider>
                        <BookingsContextProvider>
                          <WizaedPage />
                        </BookingsContextProvider>
                      </ListingsContextProvider>
                    }
                  ></Route>
                  <Route path="/chats" element={<ChatsPage />} />
                  <Route path="/settings" element={<SettingPage />} />
                  <Route
                    path="/notifications"
                    element={<NotificationsPage />}
                  />
                </Routes>
              </Grid>
              <NavBar
                buttons={[
                  { navPath: "/summery", iconSrc: dashboard },
                  { navPath: "/dashboard", iconSrc: timeline },
                  {
                    navPath: "/chats",
                    iconSrc: messages,
                  },
                  { navPath: "/settings", iconSrc: person },
                ]}
              />
            </ChatContextProvider>
          </Grid>
        </Grid>
      ) : (
        <AuthPage />
      )}
    </BrowserRouter>
  );
};
export default Router;
