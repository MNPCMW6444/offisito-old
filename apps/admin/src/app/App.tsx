import Router from "./components/Router";
import {
  AuthContextProvider,
  EnvBorder,
  ServerProvider,
  useThemeForMVP,
  useLoadBundle,
  PWAPrompterWrapper,
} from "@offisito/shared-react";
import { createTheme, ThemeProvider } from "@mui/material";
import { Toaster } from "react-hot-toast";

const App = () => {
  useLoadBundle();

  const theme = useThemeForMVP();

  return (
    <ThemeProvider theme={createTheme(theme)}>
      <EnvBorder>
        <PWAPrompterWrapper>
          <Toaster />
          <ServerProvider>
            <AuthContextProvider client="admin">
              <Router />
            </AuthContextProvider>
          </ServerProvider>
        </PWAPrompterWrapper>
      </EnvBorder>
    </ThemeProvider>
  );
};
export default App;
