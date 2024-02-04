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
    height="100%"
    width="100%"
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
  refreshUserData: () => Promise<void>;
  signout: () => Promise<void>;
}>({
  user: undefined,
  refreshUserData: async () => {},
  signout: async () => {},
});

export const AuthContextProvider = ({ children }: AuthContextProps) => {
  const [user, setUser] = useState<User>();
  const [loading, setLoading] = useState(true);

  const server = useContext(ServerContext);

  const refreshUserData = useCallback(async () => {
    try {
      const response = await server?.axiosInstance.get<User>("api/auth/log");
      response?.data && setUser(response?.data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  }, [server?.axiosInstance]);

  const signout = async () => {
    try {
      await server?.axiosInstance.get<undefined>("api/auth/log/out");
      setUser(undefined);
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
