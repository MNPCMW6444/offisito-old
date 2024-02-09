import { ServerProvider } from "@monorepo/server-provider";
import { AuthContextProvider } from "@monorepo/shared";
import Router from "./components/Router";
import { Toaster } from "react-hot-toast";
import { EnvBorder } from "@monorepo/shared";

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
