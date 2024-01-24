import { AuthPage } from "@monorepo/react-components";
import { ServerProvider } from "@monorepo/server-provider";

const tenv =
  import.meta.env.VITE_WHITE_ENV !== "prod"
    ? import.meta.env.VITE_WHITE_ENV
    : undefined;

const App = () => (
  <ServerProvider env={tenv}>
    <AuthPage client="host" />
  </ServerProvider>
);

export default App;
