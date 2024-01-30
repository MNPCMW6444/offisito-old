import { ServerProvider } from "@monorepo/server-provider";
import Router from "./components/Router";
import {
  AuthContextProvider,
  useResponsiveness,
} from "@monorepo/react-components";
import styled from "@emotion/styled";
import { Box, Grid, Typography } from "@mui/material";

const whiteEnv =
  import.meta.env.VITE_WHITE_ENV !== "prod"
    ? import.meta.env.VITE_WHITE_ENV
    : undefined;

const MobileContainer = styled(Box)`
  max-width: 375px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border: 2px solid black;
  height: 100vh;
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
    <ServerProvider env={whiteEnv}>
      <AuthContextProvider>
        <Router />
      </AuthContextProvider>
    </ServerProvider>
  );

  return isMobile ? (
    app
  ) : (
    <Grid container justifyContent="center" columnSpacing={8}>
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
  );
};

export default App;
