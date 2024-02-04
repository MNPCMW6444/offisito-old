import { ServerProvider } from "@monorepo/server-provider";
import { AuthContextProvider } from "@monorepo/react-components";
import Router from "./components/Router";
import { Toaster } from "react-hot-toast";
import { EnvBorder } from "@monorepo/react-components";
import { frontendSettings } from "@monorepo/server-provider";

const whiteEnv =
  frontendSettings().VITE_WHITE_ENV !== "prod"
    ? frontendSettings().VITE_WHITE_ENV
    : undefined;

const App = () => (
  <EnvBorder>
    <Toaster />
    <ServerProvider>
      <AuthContextProvider>
        <Router />
      </AuthContextProvider>
    </ServerProvider>
  </EnvBorder>
);

export default App;
