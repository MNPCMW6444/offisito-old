import {
  AuthContextProvider,
  EnvBorder,
  ServerProvider,
  useThemeForMVP,
} from "@monorepo/shared";
import Router from "./components/Router";
import { Toaster } from "react-hot-toast";
import { createTheme, ThemeProvider } from "@mui/material";

const App = () => {
  const theme = useThemeForMVP();

  return (
    <ThemeProvider theme={createTheme(theme)}>
      <EnvBorder>
        <Toaster />
        <ServerProvider>
          <AuthContextProvider>
            <Router />
          </AuthContextProvider>
        </ServerProvider>
      </EnvBorder>
    </ThemeProvider>
  );
};

export default App;
