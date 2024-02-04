import { ServerProvider } from "@monorepo/server-provider";
import Router from "./components/Router";
import {
  AuthContextProvider,
  EnvBorder,
  useResponsiveness,
} from "@monorepo/react-components";
import styled from "@emotion/styled";
import { Box, Grid, Typography } from "@mui/material";
import { Toaster } from "react-hot-toast";
import { frontendSettings } from "@monorepo/server-provider";

const whiteEnv =
  frontendSettings().VITE_WHITE_ENV !== "prod"
    ? frontendSettings().VITE_WHITE_ENV
    : undefined;

// Now you can use envVariables.VITE_API_URL or any other variable you've set

const MobileContainer = styled(Box)`
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border: 2px solid black;
  height: 96vh;
  width: calc(98vh / 16 * 9);
  margin-top: 2vh;
`;

const DesktopMessage = styled(Box)`
  text-align: center;
  margin-left: 20px;
  margin-top: 40px;
  font-size: 18px;
  color: #666;
  align-self: center;
`;

const App = () => {
  const { isMobile } = useResponsiveness();

  const app = (
    <>
      <Toaster />
      <ServerProvider>
        <AuthContextProvider>
          <Router />
        </AuthContextProvider>
      </ServerProvider>
    </>
  );

  return (
    <EnvBorder>
      {isMobile ? (
        app
      ) : (
        <Grid container justifyContent="center" columnSpacing={8} wrap="nowrap">
          <Grid item>
            <MobileContainer>{app}</MobileContainer>
          </Grid>
          <Grid item>
            <DesktopMessage>
              <Typography>
                For the best experience, please use our app on a mobile device.
              </Typography>
            </DesktopMessage>
          </Grid>
        </Grid>
      )}
    </EnvBorder>
  );
};

export default App;
