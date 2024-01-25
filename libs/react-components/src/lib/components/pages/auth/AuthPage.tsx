import { useContext, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Grid, Paper, Typography } from "@mui/material";
import image from "../../../../assets/backgroundOffice.jpg";
import { AuthContext } from "../../../context";
import toast from "react-hot-toast";
import { useMobile } from "../../../";
import { ServerContext } from "@monorepo/server-provider";
import { AxiosError } from "axios";
import { doNothing } from "@monorepo/utils";
import { useLocation } from "react-router-dom";

enum Step {
  init,
  login,
  registerReq,
  registerFin,
  checkEmail,
}

type Labels = {
  [key in Step]: string;
};

interface LabelsConstants {
  IDLE: Labels;
  DOING: Labels;
}

export const LABELS: LabelsConstants = {
  IDLE: {
    [Step.init]: "Continue",
    [Step.login]: "Login",
    [Step.registerReq]: "Send Email",
    [Step.registerFin]: "Register",
    [Step.checkEmail]: "",
  },
  DOING: {
    [Step.init]: "Checking email...",
    [Step.login]: "Checking password...",
    [Step.registerReq]: "Sending email...",
    [Step.registerFin]: "Registering...",
    [Step.checkEmail]: "",
  },
};

interface AuthPageProps {
  client: "host" | "guest";
}

export const AuthPage = ({ client }: AuthPageProps) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordAgain, setPasswordAgain] = useState<string>("");
  const [signUpCode, setSignUpCode] = useState<string>();
  const [fullName, setFullName] = useState<string>("");
  const [buttonLabel, setButtonLabel] = useState<keyof LabelsConstants>("IDLE");
  const [step, setStep] = useState<Step>(Step.init);
  const { refreshUserData } = useContext(AuthContext);

  const { isMobileOrTabl } = useMobile();

  const server = useContext(ServerContext);
  const axiosInstance = server?.axiosInstance;

  const useQuery = () => new URLSearchParams(useLocation().search);
  const query = useQuery();

  useEffect(() => {
    const code = query.get("code");
    if (code) {
      setSignUpCode(code);
      setStep(Step.registerFin);
    }
  }, [query]);

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
      )}
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
                {step === Step.checkEmail ? (
                  <Typography>Check your email</Typography>
                ) : (
                  <>
                    {step !== Step.registerFin && (
                      <TextField
                        margin="dense"
                        label="Email"
                        type="email"
                        fullWidth
                        variant="outlined"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    )}
                    {(step === Step.login || step === Step.registerFin) && (
                      <TextField
                        margin="dense"
                        label="Password"
                        type="password"
                        fullWidth
                        variant="outlined"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    )}
                    {step === Step.registerFin && (
                      <TextField
                        margin="dense"
                        label="Password Confirmation"
                        type="password"
                        fullWidth
                        variant="outlined"
                        value={passwordAgain}
                        onChange={(e) => setPasswordAgain(e.target.value)}
                      />
                    )}
                    {step === Step.registerFin && (
                      <TextField
                        margin="dense"
                        label="Full Name"
                        fullWidth
                        variant="outlined"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                      />
                    )}
                  </>
                )}
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
                        onClick={
                          buttonLabel === "IDLE"
                            ? step === 0
                              ? () => {
                                  setButtonLabel("DOING");
                                  axiosInstance &&
                                    axiosInstance
                                      .post("api/auth/log/in", {
                                        email,
                                        password,
                                      })
                                      .catch((error) =>
                                        error.response.status === 402
                                          ? setStep(Step.registerReq)
                                          : error.response.status === 401
                                            ? setStep(Step.login)
                                            : toast(error?.message),
                                      )
                                      .finally(() => setButtonLabel("IDLE"));
                                }
                              : step === Step.login
                                ? () => {
                                    setButtonLabel("DOING");
                                    axiosInstance &&
                                      axiosInstance
                                        .post("api/auth/log/in", {
                                          email,
                                          password,
                                        })
                                        .then(() => refreshUserData())
                                        .catch((error) =>
                                          toast.error(
                                            (error as AxiosError)?.message,
                                          ),
                                        )
                                        .finally(() => setButtonLabel("IDLE"));
                                  }
                                : step === Step.registerReq
                                  ? () => {
                                      setButtonLabel("DOING");
                                      axiosInstance &&
                                        axiosInstance
                                          .post("api/auth/register/req", {
                                            email,
                                            client,
                                          })
                                          .then(() => setStep(Step.checkEmail))
                                          .catch((error) =>
                                            toast.error(
                                              (error as AxiosError)?.message,
                                            ),
                                          )
                                          .finally(() =>
                                            setButtonLabel("IDLE"),
                                          );
                                    }
                                  : step === Step.registerFin
                                    ? () => {
                                        if (buttonLabel === "IDLE") {
                                          setButtonLabel("DOING");
                                          axiosInstance &&
                                            axiosInstance
                                              .post("api/auth/register/fin", {
                                                key: signUpCode,
                                                password,
                                                passwordAgain,
                                                fullName,
                                                type:
                                                  client === "guest"
                                                    ? "member"
                                                    : "host",
                                              })
                                              .then(() => refreshUserData())
                                              .catch((error) =>
                                                toast.error(
                                                  (error as AxiosError)
                                                    ?.message,
                                                ),
                                              )
                                              .finally(() =>
                                                setButtonLabel("IDLE"),
                                              );
                                        }
                                      }
                                    : doNothing
                            : doNothing
                        }
                      >
                        {LABELS[buttonLabel][step]}
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
