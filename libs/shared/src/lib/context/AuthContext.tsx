import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { ServerContext } from "./";
import { User } from "../../types";
import { MainMessage } from "../components";

interface AuthContextProps {
  children: ReactNode;
}

export const AuthContext = createContext<{
  user?: User;
  profilePictureUrl?: string;
  refreshUserData: () => Promise<void>;
  logout: () => Promise<void>;
}>({
  user: undefined,
  refreshUserData: async () => {
    return;
  },
  logout: async () => {
    return;
  },
});

export const AuthContextProvider = ({ children }: AuthContextProps) => {
  const [user, setUser] = useState<User>();
  const [profilePictureUrl, setProfilePictureUrl] = useState<string>();

  const [loading, setLoading] = useState(true);

  const server = useContext(ServerContext);

  const refreshUserData = useCallback(async () => {
    try {
      const response = await server?.axiosInstance.get<User>("api/auth/log");
      response?.data && setUser(response?.data);
      const urlResponse = await server?.axiosInstance.get(
        "api/auth/get-signed-profile-picture",
      );
      urlResponse?.data && setProfilePictureUrl(urlResponse.data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  }, [server?.axiosInstance]);

  const logout = async () => {
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
        logout,
        profilePictureUrl,
      }}
    >
      {loading ? (
        <MainMessage text="Checking if you are signed in..." />
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};
