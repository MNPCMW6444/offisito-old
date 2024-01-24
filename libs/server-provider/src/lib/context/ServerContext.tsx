import {
  ReactNode,
  createContext,
  useEffect,
  useState,
  useRef,
  useCallback,
} from "react";
import { Typography } from "@mui/material";
import axios, { AxiosInstance, AxiosResponse } from "axios";
import { Api } from "@monorepo/types";

interface ServerProviderProps {
  children: ReactNode;
  tryInterval?: number;
  env?: "preprod" | "local";
  customErrorTSX?: ReactNode;
}

const DEFAULT_TRY_INTERVAL = 3000;

interface ServerContextProps {
  api: Api<unknown>;
  version: string;
}

export const ServerContext = createContext<ServerContextProps | null>(null);

export const ServerProvider = ({
  tryInterval,
  env,
  customErrorTSX,
  children,
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
        return (await axiosInstance.get("")).data.status === "Im alive"
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
    env === "local"
      ? "http://localhost:5556"
      : `https://${env || ""}server.offisito.com/api`;

  const axiosInstance = axios.create({
    baseURL,
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
    },
  });

  const fetchWrapper = (url, init) => {
    const config = {
      url,
      method: init?.method || "GET",
      headers: init?.headers,
      data: init?.body,
    };

    return axiosInstance
      .request(config)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        debugger;
        console.error("Error in fetchWrapper:", error);
        throw error;
      });
  };

  const api = new Api({
    baseUrl: baseURL,
    customFetch: fetchWrapper,
  });

  useEffect(() => {
    statusRef.current = status;
  }, [status]);

  useEffect(() => {
    const setStatusAsyncly = async () => {
      try {
        setStatus(CHECKING_MESSAGE);
        console.log("Checking server availability...");

        const newStatus = await checkServerAvailability(axiosInstance);
        if (newStatus === "good") {
          const { data } = await axiosInstance.get("");
          setVersion(data.version);
        }
        setStatus(newStatus);

        console.log(`Server check complete. Status: ${newStatus}`);

        if (newStatus !== GOOD_STATUS) {
          console.log("Setting up the next check...");
          setTimeout(setStatusAsyncly, interval);
        }
      } catch (error) {
        console.error("An error occurred while checking the server: ", error);

        setTimeout(setStatusAsyncly, interval);
      }
    };
    if (statusRef.current === IDLE) {
      setStatusAsyncly().then();
    }
  }, [axiosInstance, tryInterval, checkServerAvailability, interval]);

  if (status === GOOD_STATUS) {
    return (
      <ServerContext.Provider value={{ version: version || "", api }}>
        {children}
      </ServerContext.Provider>
    );
  } else {
    return (
      <>
        {customErrorTSX} || <Typography>{status}</Typography>
      </>
    );
  }
};
