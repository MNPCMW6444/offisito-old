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
import { User } from "@monorepo/types";

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

export const AuthContext = createContext<{
  user?: User;
  refreshUserData: any;
  signout: any;
}>({
  user: undefined,
  refreshUserData: () => {},
  signout: () => {},
});

export const AuthContextProvider = ({ children }: AuthContextProps) => {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);

  const server = useContext(ServerContext);

  const refreshUserData = useCallback(async () => {
    try {
      const response = await server?.api.api.authLogList();
      debugger;
      response?.body && setUser(response?.body);
    } catch (error) {
      debugger;
      console.error("Error fetching user data:", error);
    }
  }, [server?.api]);

  const signout = async () => {
    try {
      await server?.api.api.authLogOutList();
      setUser(user);
    } catch (error) {
      console.error("Error during sign out", error);
    }
  };

  useEffect(() => {
    const initializeData = async () => {
      await refreshUserData();
      setLoading(false);
    };

    initializeData();
  }, [refreshUserData]);

  return (
    <AuthContext.Provider
      value={{
        user,
        refreshUserData,
        signout,
      }}
    >
      {loading ? loadingMessage : children}
    </AuthContext.Provider>
  );
};
