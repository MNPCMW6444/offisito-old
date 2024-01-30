import { createContext, useEffect, useState, useRef, ReactNode } from "react";
import { Typography } from "@mui/material";
import axios, { AxiosInstance } from "axios";

// Constants
const DEFAULT_TRY_INTERVAL = 3000;
const GOOD_STATUS = "good";
const BAD_MESSAGE = "Server is not available. Please try again later.";
const DEVELOPMENT_BASE_URL = "http://localhost:5556/";
const PRODUCTION_BASE_URL = "https://server.offisito.com/";

// Types and Interfaces
interface ServerProviderProps {
  children: ReactNode;
  tryInterval?: number;
  env?: "preprod";
  customErrorTSX?: ReactNode;
}

interface ServerContextProps {
  axiosInstance: AxiosInstance;
  version: string;
}

// Context creation
export const ServerContext = createContext<ServerContextProps | null>(null);

// Component
export const ServerProvider = ({
  tryInterval,
  env,
  customErrorTSX,
  children,
}: ServerProviderProps) => {
  const interval = tryInterval || DEFAULT_TRY_INTERVAL;
  const [status, setStatus] = useState<string>(BAD_MESSAGE);
  const [version, setVersion] = useState<string>("");
  const statusRef = useRef(status);

  // Helper functions
  const getBaseURL = () =>
    process.env.NODE_ENV === "development"
      ? DEVELOPMENT_BASE_URL
      : `${env ? `https://${env}.` : ""}${PRODUCTION_BASE_URL}`;

  const axiosInstance = axios.create({
    baseURL: getBaseURL(),
    withCredentials: true,
    headers: { "Content-Type": "application/json" },
  });

  const scheduleNextCheck = () => {
    setTimeout(setStatusAsyncly, interval);
  };

  const setStatusAsyncly = async () => {
    try {
      const response = await axiosInstance.get("api");
      const newStatus =
        response.data.status === "Im alive" ? GOOD_STATUS : BAD_MESSAGE;

      setStatus(newStatus);
      if (newStatus === GOOD_STATUS) {
        setVersion(response.data.version);
      } else {
        scheduleNextCheck();
      }
    } catch (error) {
      console.error("An error occurred while checking the server: ", error);
      scheduleNextCheck();
    }
  };

  // Effects
  useEffect(() => {
    statusRef.current = status;
  }, [status]);

  useEffect(() => {
    if (statusRef.current === BAD_MESSAGE) {
      setStatusAsyncly();
    }
  }, [axiosInstance, interval]);

  // Render
  if (status === GOOD_STATUS) {
    return (
      <ServerContext.Provider value={{ axiosInstance, version }}>
        {children}
      </ServerContext.Provider>
    );
  } else {
    return customErrorTSX || <Typography>{status}</Typography>;
  }
};
