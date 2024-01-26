import { ServerProvider } from "@monorepo/server-provider";
import { AuthContextProvider } from "@monorepo/react-components";
import Router from "./components/Router";

const whiteEnv =
  import.meta.env.VITE_WHITE_ENV !== "prod"
    ? import.meta.env.VITE_WHITE_ENV
    : undefined;

const App = () => (
  <ServerProvider env={whiteEnv}>
    <AuthContextProvider>
      <Router />
    </AuthContextProvider>
  </ServerProvider>
);

export default App;
