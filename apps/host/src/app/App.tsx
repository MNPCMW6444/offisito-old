import { ServerProvider } from "@monorepo/server-provider";
import { AuthContextProvider } from "@monorepo/react-components";
import Router from "./components/Router";

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
