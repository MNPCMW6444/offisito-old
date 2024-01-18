import { createContext, useState, useEffect, Children } from "react";
import axios from "axios";
import { Typography, Grid } from "@mui/material";
import { styled } from "@mui/system";

export const WhiteTypography = styled(Typography)(({ theme }) => ({
  fontWeight: "bold",
  fontSize: 22,
  letterSpacing: 2,
  color: theme.palette.primary,
  marginBottom: theme.spacing(1),
}));

const loadingMessage = (
  <Grid
    height="100vh"
    width="100vw"
    container
    justifyContent="center"
    alignItems="center"
  >
    <Grid item>
      <WhiteTypography>Checking if you are signed in...</WhiteTypography>
    </Grid>
  </Grid>
);

const UserContext = createContext({
  user: undefined,
  myRoles: [],
  refreshUserData: () => {},
  refetchI: () => {},
  signout: () => {},
});

export const UserContextProvider = ({ children }: any) => {
  const [user, setUser] = useState();
  const [myRoles, setMyRoles] = useState([]);
  const [loading, setLoading] = useState(true);

  const refreshUserData = async () => {
    try {
      const response = await axios.get("/api/user");
      setUser(response.data);
    } catch (error) {
      console.error("Error fetching user data", error);
    }
  };

  const refetchI = async () => {
    try {
      const response = await axios.get("/api/inventory");
      setMyRoles(response.data);
    } catch (error) {
      console.error("Error fetching inventory", error);
    }
  };

  const signout = async () => {
    try {
      await axios.post("/api/signout");
      setUser(user);
      setMyRoles([]);
    } catch (error) {
      console.error("Error during sign out", error);
    }
  };

  useEffect(() => {
    const initializeData = async () => {
      await refreshUserData();
      await refetchI();
      setLoading(false);
    };

    initializeData();
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        myRoles,
        refetchI,
        refreshUserData,
        signout,
      }}
    >
      {loading ? loadingMessage : children}
    </UserContext.Provider>
  );
};

export default UserContext;
