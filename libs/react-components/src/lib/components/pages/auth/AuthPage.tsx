import { useContext, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Grid, LinearProgress, Paper, Typography } from "@mui/material";
import image from "../../../../assets/backgroundOffice.jpg";
import { AuthContext } from "../../../context";
import toast from "react-hot-toast";
import { useResponsiveness } from "../../../";
import { ServerContext } from "@monorepo/server-provider";
import { AxiosError } from "axios";
import { useLocation } from "react-router-dom";
import { LoginReq, RegisterFin, RegisterReq } from "@monorepo/types";
import zxcvbn from "zxcvbn";
import { MIN_PASSWORD_STRENGTH } from "@monorepo/utils";
import { Flag } from "@mui/icons-material";

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

  const { isMobileOrTabl } = useResponsiveness();

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

  // Validation:

  const [validations, setValidations] = useState({
    email: true,
    password: true,
    passwordAgain: true,
    fullName: true,
  });

  useEffect(() => {
    setValidations({
      email: !!email,
      password:
        (step === Step.login && !!password) ||
        (step === Step.registerFin &&
          zxcvbn(password).score >= MIN_PASSWORD_STRENGTH),
      passwordAgain: passwordAgain === password,
      fullName: !!fullName,
    });
  }, [email, step, password, passwordAgain, fullName]);

  // Helper function to display error messages
  const getErrorMessage = (field: string) => {
    switch (field) {
      case "email":
        return "Email is required.";
      case "password":
        return step !== Step.login
          ? "Password is too weak."
          : "Password is required.";
      case "passwordAgain":
        return "Passwords do not match.";
      case "fullName":
        return "Full name is required.";
      default:
        return "";
    }
  };

  // Calculate password strength when password changes
  const [passwordStrength, setPasswordStrength] = useState<number>(1);

  useEffect(() => {
    if (password) {
      const result = zxcvbn(password);
      setPasswordStrength(result.score);
    } else {
      setPasswordStrength(0); // reset strength score when password is cleared
    }
  }, [password]);

  // Function to map password strength score to progress percentage
  const getStrengthBarValue = (score: number) => {
    return (score / 4) * 100;
  };

  // Determine the color of the progress bar based on password strength
  const progressBarColor =
    passwordStrength < MIN_PASSWORD_STRENGTH ? "error" : "primary";

  const authJSX = (
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
            <Typography>
              We sent {email} a link to activate your account!
            </Typography>
          ) : (
            <>
              {step !== Step.registerFin && (
                <>
                  <TextField
                    margin="dense"
                    label="Email"
                    type="email"
                    fullWidth
                    variant="outlined"
                    value={email}
                    error={!validations.email}
                    onChange={(e) => setEmail(e.target.value)}
                  />

                  {!validations.email && (
                    <Typography color="error" variant="caption">
                      {getErrorMessage("email")}
                    </Typography>
                  )}
                </>
              )}
              {(step === Step.login || step === Step.registerFin) && (
                <>
                  <TextField
                    margin="dense"
                    label="Password"
                    type="password"
                    fullWidth
                    variant="outlined"
                    value={password}
                    error={!validations.password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  {!validations.password && (
                    <Typography color="error" variant="caption">
                      {getErrorMessage("password")}
                    </Typography>
                  )}
                  {step === Step.registerFin && (
                    <Box
                      position="relative"
                      display="flex"
                      alignItems="center"
                      width="100%"
                      mt={1}
                    >
                      <LinearProgress
                        variant="determinate"
                        value={getStrengthBarValue(passwordStrength)}
                        color={progressBarColor}
                        style={{ width: "100%" }}
                      />
                      <Box
                        position="absolute"
                        left={`${(MIN_PASSWORD_STRENGTH / 4) * 100 - 5}%`}
                        top={0}
                      >
                        <Grid container>
                          <Grid item>
                            <Flag />
                          </Grid>
                          <Grid item>
                            <Typography>Min</Typography>
                          </Grid>
                        </Grid>
                      </Box>
                    </Box>
                  )}
                </>
              )}
              {step === Step.registerFin && <br />}
              {step === Step.registerFin && (
                <>
                  <TextField
                    margin="dense"
                    label="Password Confirmation"
                    type="password"
                    fullWidth
                    variant="outlined"
                    value={passwordAgain}
                    error={!validations.passwordAgain}
                    onChange={(e) => setPasswordAgain(e.target.value)}
                  />
                  {!validations.passwordAgain && (
                    <Typography color="error" variant="caption">
                      {getErrorMessage("passwordAgain")}
                    </Typography>
                  )}
                  <TextField
                    margin="dense"
                    label="Full Name"
                    fullWidth
                    variant="outlined"
                    value={fullName}
                    error={!validations.fullName}
                    onChange={(e) => setFullName(e.target.value)}
                  />
                  {!validations.fullName && (
                    <Typography color="error" variant="caption">
                      {getErrorMessage("fullName")}
                    </Typography>
                  )}
                </>
              )}
            </>
          )}
        </Grid>
        {LABELS[buttonLabel][step] && (
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
                    variant="contained"
                    onClick={
                      buttonLabel === "IDLE" && step === 0
                        ? () => {
                            setButtonLabel("DOING");
                            axiosInstance &&
                              axiosInstance
                                .post<undefined, undefined, LoginReq>(
                                  "api/auth/log/in",
                                  {
                                    email,
                                    password,
                                    client,
                                  },
                                )
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
                                  .post<undefined, undefined, LoginReq>(
                                    "api/auth/log/in",
                                    {
                                      email,
                                      password,
                                      client,
                                    },
                                  )
                                  .then(() => refreshUserData())
                                  .catch((error) =>
                                    toast.error(
                                      error.response.status === 401
                                        ? "Wrong Password"
                                        : error?.message,
                                    ),
                                  )
                                  .finally(() => setButtonLabel("IDLE"));
                            }
                          : step === Step.registerReq
                            ? () => {
                                setButtonLabel("DOING");
                                axiosInstance &&
                                  axiosInstance
                                    .post<undefined, undefined, RegisterReq>(
                                      "api/auth/register/req",
                                      {
                                        email,
                                        client,
                                      },
                                    )
                                    .then(() => setStep(Step.checkEmail))
                                    .catch((error) =>
                                      toast.error(
                                        (error as AxiosError)?.message,
                                      ),
                                    )
                                    .finally(() => setButtonLabel("IDLE"));
                              }
                            : () => {
                                if (buttonLabel === "IDLE" && signUpCode) {
                                  setButtonLabel("DOING");
                                  axiosInstance &&
                                    axiosInstance
                                      .post<undefined, undefined, RegisterFin>(
                                        "api/auth/register/fin",
                                        {
                                          key: signUpCode,
                                          password,
                                          passwordAgain,
                                          fullName,
                                          type:
                                            client === "guest"
                                              ? "member"
                                              : "host",
                                        },
                                      )
                                      .then(() => refreshUserData())
                                      .catch((error) =>
                                        toast.error(
                                          (error as AxiosError)?.message,
                                        ),
                                      )
                                      .finally(() => setButtonLabel("IDLE"));
                                }
                              }
                    }
                  >
                    {LABELS[buttonLabel][step]}
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Grid>
        )}
      </Grid>
    </Paper>
  );

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      width="1005"
      height="100%"
      columnSpacing={10}
      wrap="nowrap"
    >
      <Grid item width={client === "host" && !isMobileOrTabl ? "70%" : "auto"}>
        {authJSX}
      </Grid>
      {client === "host" && !isMobileOrTabl && (
        <Grid item width="70%" height="100%">
          <Box component="img" src={image} maxHeight="100%" width="auto" />
        </Grid>
      )}
    </Grid>
  );
};
