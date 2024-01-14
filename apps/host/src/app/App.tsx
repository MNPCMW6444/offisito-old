import { Login } from "@monorepo/react-components";
import { ServerProvider } from "@monorepo/server-provider";

const App = () => (
  <>
    <ServerProvider>
      <Login />
    </ServerProvider>
  </>
);

export default App;
