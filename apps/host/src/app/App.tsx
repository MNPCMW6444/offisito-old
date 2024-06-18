import {
  AuthContextProvider,
  EnvBorder,
  MobilzerWrapper,
  PWAPrompterWrapper,
  ServerProvider,
  useLoadBundle,
  useThemeForMVP,
} from "@offisito/shared-react";
import Router from "./components/Router";
import { Toaster } from "react-hot-toast";
import { createTheme, ThemeProvider } from "@mui/material";

const App = () => {
  const theme = useThemeForMVP();

  useLoadBundle();

  return (
    <ThemeProvider theme={createTheme(theme)}>
      <EnvBorder>
        <PWAPrompterWrapper>
          <MobilzerWrapper>
            <Toaster />
            <ServerProvider>
              <AuthContextProvider client="host">
                <Router />
              </AuthContextProvider>
            </ServerProvider>
          </MobilzerWrapper>
        </PWAPrompterWrapper>
      </EnvBorder>
    </ThemeProvider>
  );
};

export default App;
