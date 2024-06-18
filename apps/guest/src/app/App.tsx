import Router from "./components/Router";
import {
  AuthContextProvider,
  EnvBorder,
  ServerProvider,
  useThemeForMVP,
  SearchContextProvider,
  MobilzerWrapper,
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
          <MobilzerWrapper>
            <Toaster />
            <ServerProvider>
              <AuthContextProvider client="guest">
                <SearchContextProvider>
                  <Router />
                </SearchContextProvider>
              </AuthContextProvider>
            </ServerProvider>
          </MobilzerWrapper>
        </PWAPrompterWrapper>
      </EnvBorder>
    </ThemeProvider>
  );
};
export default App;
