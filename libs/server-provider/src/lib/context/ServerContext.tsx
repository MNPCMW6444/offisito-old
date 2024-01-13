import React, {
  ReactNode,
  createContext,
  useEffect,
  useState,
  useRef,
  useCallback,
} from "react";
import { Typography } from "@mui/material";
import axios, { AxiosInstance } from "axios";

interface ServerProviderProps {
  children: ReactNode;
  tryInterval?: number;
  env?: "preprod";
  customErrorTSX?: ReactNode;
}

const DEFAULT_TRY_INTERVAL = 3000;

interface ServerContextProps {
  axiosInstance: AxiosInstance;
  version: string;
}

export const ServerContext = createContext<ServerContextProps | null>(null);

export const ServerProvider = ({
  tryInterval,
  env,
  customErrorTSX,
}: ServerProviderProps) => {
  const interval = tryInterval || DEFAULT_TRY_INTERVAL;
  const IDLE = "IDLE";
  const CHECKING_MESSAGE = "Checking server availability...";
  const GOOD_STATUS = "good";
  const BAD_MESSAGE = `Server is not available. Please try again later by refreshing or wait ${
    interval / 1000
  } seconds.`;

  const checkServerAvailability = useCallback(
    async (axiosInstance: AxiosInstance) => {
      try {
        return (await axiosInstance.get("areyoualive")).data.status ===
          "Im alive"
          ? GOOD_STATUS
          : BAD_MESSAGE;
      } catch (err) {
        return BAD_MESSAGE;
      }
    },
    [BAD_MESSAGE],
  );

  const [status, setStatus] = useState<string>(IDLE);
  const [version, setVersion] = useState<string>();

  const statusRef = useRef(status);

  const baseURL =
    process.env.NODE_ENV === "development"
      ? "http://localhost:6555/"
      : `https://${env || ""}server.offisito.com/`;

  const axiosInstance = axios.create({
    baseURL,
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
    },
  });

  useEffect(() => {
    statusRef.current = status;
  }, [status]);

  useEffect(() => {
    const setStatusAsyncly = async () => {
      try {
        setStatus(CHECKING_MESSAGE);
        console.log("Checking server availability..."); // Log for starting server check

        const newStatus = await checkServerAvailability(axiosInstance);
        if (newStatus === "good") {
          const { data } = await axiosInstance.get("areyoualive");
          setVersion(data.version);
        }
        setStatus(newStatus);

        console.log(`Server check complete. Status: ${newStatus}`); // Log for completion of server check

        if (newStatus !== GOOD_STATUS) {
          console.log("Setting up the next check..."); // Log for setting up next server check
          setTimeout(setStatusAsyncly, interval);
        }
      } catch (error) {
        console.error("An error occurred while checking the server: ", error); // Log for any error during server check
        // After an error, we can setup the next server check too
        setTimeout(setStatusAsyncly, interval);
      }
    };
    if (statusRef.current === IDLE) {
      setStatusAsyncly().then();
    }
  }, [axiosInstance, tryInterval, checkServerAvailability, interval]);

  if (status === GOOD_STATUS) {
    return (
      <ServerContext.Provider
        value={{ version: version || "", axiosInstance }}
      ></ServerContext.Provider>
    );
  } else {
    return customErrorTSX || <Typography>{status}</Typography>;
  }
};
