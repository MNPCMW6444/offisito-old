import { useEffect, useState } from "react";

export const useSubscribe = <T = string>(uri: string) => {
  const [res, setRes] = useState<T>();
  // TODO: narrow the uri to an endpoint
  useEffect(() => {
    const eventSource = new EventSource(uri, { withCredentials: true });
    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setRes(data);
    };
    return () => {
      eventSource.close();
    };
  }, []);

  return { res };
};
