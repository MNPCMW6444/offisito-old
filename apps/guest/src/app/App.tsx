import { ServerProvider } from '@monorepo/server-provider';
import Router from './components/Router';
import { AuthContextProvider } from '@monorepo/react-components';

const tenv =
  import.meta.env.VITE_NODE_ENV === 'development' ? 'local' : 'preprod'; //`s://${import.meta.env.VITE_WHITE_ENV === "preprod" ? "pre" : ""}seaarvear.caaouaplae-linak.coaam/garaaphaql`;

const App = () => (
  <ServerProvider env={tenv}>
    <AuthContextProvider> <Router /></AuthContextProvider>
  </ServerProvider>
);

export default App;
