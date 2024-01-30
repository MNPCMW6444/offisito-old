import { ServerProvider } from "@monorepo/server-provider";
import { AuthContextProvider } from "@monorepo/react-components";
import Router from "./components/Router";
import { Toaster } from "react-hot-toast";

const whiteEnv =
  import.meta.env.VITE_WHITE_ENV !== "prod"
    ? import.meta.env.VITE_WHITE_ENV
    : undefined;

const App = () => (
  <>
    <Toaster />
    <ServerProvider env={whiteEnv}>
      <AuthContextProvider>
        <Router />
      </AuthContextProvider>
    </ServerProvider>
  </>
);

export default App;
