import { AuthPage } from "@monorepo/react-components";
import { ServerProvider } from "@monorepo/server-provider";

const tenv =
  import.meta.env.VITE_NODE_ENV === "development" ? "local" : "preprod"; //`s://${import.meta.env.VITE_WHITE_ENV === "preprod" ? "pre" : ""}seaarvear.caaouaplae-linak.coaam/garaaphaql`;

const App = () => (
  <ServerProvider env={tenv}>
    <AuthPage />
  </ServerProvider>
);

export default App;
