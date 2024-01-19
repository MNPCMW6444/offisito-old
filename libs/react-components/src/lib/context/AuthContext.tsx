import {
  createContext,
  useState,
  useEffect,
  useContext,
  ReactNode,
  useCallback,
} from "react";
import { Typography, Grid } from "@mui/material";
import { styled } from "@mui/system";
import { ServerContext } from "@monorepo/server-provider";

interface AuthContextProps {
  children: ReactNode;
}

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

const AuthContext = createContext({
  user: undefined,
  myRoles: [],
  refreshUserData: () => {},
  refetchI: () => {},
  signout: () => {},
});

export const AuthContextProvider = ({ children }: AuthContextProps) => {
  const [user, setUser] = useState();
  const [myRoles, setMyRoles] = useState([]);
  const [loading, setLoading] = useState(true);

  const serverContext = useContext(ServerContext);

  const refreshUserData = useCallback(async () => {
    try {
      const response = await serverContext?.axiosInstance.get("/api/user");
      setUser(response?.data);
    } catch (error) {
      console.error("Error fetching user data", error);
    }
  }, [serverContext?.axiosInstance]);

  const refetchI = useCallback(async () => {
    try {
      const response = await serverContext?.axiosInstance.get("/api/inventory");
      setMyRoles(response?.data);
    } catch (error) {
      console.error("Error fetching inventory", error);
    }
  }, [serverContext?.axiosInstance]);

  const signout = async () => {
    try {
      await serverContext?.axiosInstance.post("/api/signout");
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
  }, [refreshUserData, refetchI]);

  return (
    <AuthContext.Provider
      value={{
        user,
        myRoles,
        refetchI,
        refreshUserData,
        signout,
      }}
    >
      {loading ? loadingMessage : children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
