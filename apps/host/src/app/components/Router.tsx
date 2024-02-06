import { useContext } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthContext, AuthPage } from "@monorepo/react-components";
import DashboardPage from "./pages/home/DashboardPage";
import SpacesPage from "./pages/spaces/SpacesPage";
import SpaceForm from "./pages/spaces/SpaceForm";

const Router = () => {
  const { user } = useContext(AuthContext);

  return (
    <BrowserRouter>
      {user ? (
        <Routes>
          <Route path="/*" element={<DashboardPage />} />
          <Route path="/profiles" element={<SpacesPage />} />
          <Route path="/profile" element={<SpacesPage />} />
          <Route path="/spaces" element={<SpacesPage />} />
          <Route path="/space" element={<SpaceForm />} />
        </Routes>
      ) : (
        <AuthPage client="host" />
      )}
    </BrowserRouter>
  );
};

export default Router;
