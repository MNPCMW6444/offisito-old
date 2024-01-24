import { ServerProvider } from "@monorepo/server-provider";
import Router from "./components/Router";
import { AuthContextProvider } from "@monorepo/react-components";

const tenv =
  import.meta.env.VITE_WHITE_ENV !== "prod"
    ? import.meta.env.VITE_WHITE_ENV
    : undefined;

const App = () => (
  <ServerProvider env={tenv}>
    <AuthContextProvider>
      <Router />
    </AuthContextProvider>
  </ServerProvider>
);

export default App;
