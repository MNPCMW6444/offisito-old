import { useContext } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthContext, AuthPage } from "@monorepo/react-components";
import HomePage from "./pages/home/HomePage";
import SearchPage from "./pages/search/SearchPage";

const Router = () => {
  const { user } = useContext(AuthContext);

  return (
    <BrowserRouter>
      {user ? (
        <Routes>
          <Route path="/*" element={<HomePage />} />
          <Route path="/search" element={<SearchPage />} />
        </Routes>
      ) : (
        <AuthPage client="guest" />
      )}
    </BrowserRouter>
  );
};

export default Router;
