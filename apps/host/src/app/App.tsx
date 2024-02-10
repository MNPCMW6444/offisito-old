import {
  AuthContextProvider,
  EnvBorder,
  ServerProvider,
} from "@monorepo/shared";
import Router from "./components/Router";
import { Toaster } from "react-hot-toast";

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
