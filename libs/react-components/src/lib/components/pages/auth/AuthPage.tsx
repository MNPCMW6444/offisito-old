import { useContext, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Grid, Paper, Typography } from "@mui/material";
import image from "../../../../assets/backgroundOffice.jpg";
import UserContext from "../../../context/AuthContext";
import toast from "react-hot-toast";
import useMobile from "../../../hooks/useMobile";
import { ServerContext } from "@monorepo/server-provider";
import { AxiosError } from "axios";

export interface LabelsConstants {
  IDLE: {
    LOGIN: string;
  };
  DOING: {
    LOGIN: string;
  };
}

export const LABELS: LabelsConstants = {
  IDLE: { LOGIN: "Login" },
  DOING: {
    LOGIN: "Logging in...",
  },
};

export const AuthPage = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordAgain, setPasswordAgain] = useState<string>("");
  const [signUpCode, setSignUpCode] = useState<number>(0);
  const [fullName, setFullName] = useState<string>("");
  const [buttonLabel, setButtonLabel] = useState<keyof LabelsConstants>("IDLE");
  const { refreshUserData } = useContext(UserContext);

  const { isMobileOrTabl } = useMobile();

  const server = useContext(ServerContext);
  const api = server?.api;

  return (
    <Grid container>
      {!isMobileOrTabl && (
        <Grid item width="70vw" height="100vh">
          <Box
            sx={{
              width: "100%",
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundSize: "cover",
              backgroundPosition: "center",
              minWidth: "600px",
            }}
            src={image}
            component="img"
          />
        </Grid>
      )}{" "}
      <Grid
        item
        container
        justifyContent="center"
        alignItems="center"
        width={isMobileOrTabl ? "100vw" : "30vw"}
        height="100vh"
        position="fixed"
        right={0}
      >
        <Grid item>
          <Paper style={{ padding: 20, maxWidth: 400, margin: "0 auto" }}>
            <Grid container direction="column" alignItems="center">
              <Grid item>
                <Typography variant="h6" textAlign="center">
                  Welcome to
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="h6" textAlign="center">
                  Offisito
                </Typography>
              </Grid>
              <Grid item>
                <TextField
                  margin="dense"
                  label="Email"
                  type="email"
                  fullWidth
                  variant="outlined"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                  margin="dense"
                  label="Password"
                  type="password"
                  fullWidth
                  variant="outlined"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Grid>
              <Grid item>
                <Box mt={2}>
                  <Grid
                    container
                    direction="column"
                    alignItems="center"
                    rowSpacing={2}
                  >
                    <Grid item>
                      <Button
                        color="primary"
                        type="submit"
                        data-testid="login-button"
                        variant="contained"
                        onClick={() => {
                          setButtonLabel("DOING");
                          api &&
                            api.auth
                              .logInCreate({
                                email,
                                password,
                              })
                              .then(() => refreshUserData())
                              .catch((error) =>
                                toast.error((error as AxiosError)?.message),
                              )
                              .finally(() => setButtonLabel("IDLE"));
                        }}
                      >
                        {LABELS[buttonLabel].LOGIN}
                      </Button>
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Grid>
  );
};
