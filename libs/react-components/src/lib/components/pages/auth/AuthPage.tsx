import { useContext, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import {
  Grid,
  LinearProgress,
  Paper,
  Tooltip,
  Typography,
} from "@mui/material";
import image from "../../../../assets/backgroundOffice.jpg";
import { AuthContext } from "../../../context";
import { axiosErrorToaster, useResponsiveness } from "../../../";
import { ServerContext } from "@monorepo/server-provider";
import { useLocation } from "react-router-dom";
import { LoginReq, RegisterFin, RegisterReq } from "@monorepo/types";
import zxcvbn from "zxcvbn";
import { MIN_PASSWORD_STRENGTH } from "@monorepo/utils";
import { Flag } from "@mui/icons-material";
// eslint-disable-next-line @nx/enforce-module-boundaries
import { version } from "../../../../../../../package.json";

enum Step {
  login,
  registerReq,
  registerFin,
  passResetReq,
  passResetFin,
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
    [Step.login]: "Login",
    [Step.registerReq]: "Register",
    [Step.registerFin]: "Register",
    [Step.passResetReq]: "Send Email",
    [Step.passResetFin]: "Change Password",
    [Step.checkEmail]: "",
  },
  DOING: {
    [Step.login]: "Checking password...",
    [Step.registerReq]: "Sending email...",
    [Step.registerFin]: "Registering...",
    [Step.passResetReq]: "Sending Email...",
    [Step.passResetFin]: "Saving Your Password...",
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
  const [key, setKey] = useState<string>();
  const [fullName, setFullName] = useState<string>("");
  const [buttonLabel, setButtonLabel] = useState<keyof LabelsConstants>("IDLE");
  const [step, setStep] = useState<Step>(Step.registerReq);
  const [emailReason, setEmailReason] = useState<boolean>(true);
  const { refreshUserData } = useContext(AuthContext);

  const { isMobileOrTabl } = useResponsiveness();

  const server = useContext(ServerContext);
  const axiosInstance = server?.axiosInstance;

  useEffect(() => {
    step === Step.passResetReq && setEmailReason(false);
    step === Step.registerReq && setEmailReason(true);
  }, [step]);

  const useQuery = () => new URLSearchParams(useLocation().search);
  const query = useQuery();

  useEffect(() => {
    const registerKey = query.get("regcode");
    const resetKey = query.get("rescode");
    const key = registerKey || resetKey;
    if (key) {
      setKey(key);
      registerKey && setStep(Step.registerFin);
      resetKey && setStep(Step.passResetFin);
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

  const mainClickHandler = (customStep: Step | undefined) => {
    if (buttonLabel === "IDLE")
      switch (customStep || step) {
        case Step.login:
          return () => {
            setButtonLabel("DOING");
            axiosInstance &&
              axiosInstance
                .post<undefined, undefined, LoginReq>("api/auth/log/in", {
                  email,
                  password,
                  client,
                })
                .then(() => refreshUserData())
                .catch((error) => axiosErrorToaster(error))
                .finally(() => setButtonLabel("IDLE"));
          };
        case Step.registerReq:
          return () => {
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
                .catch((error) => axiosErrorToaster(error))
                .finally(() => setButtonLabel("IDLE"));
          };
        case Step.registerFin:
          return () => {
            if (buttonLabel === "IDLE" && key) {
              setButtonLabel("DOING");
              axiosInstance &&
                axiosInstance
                  .post<undefined, undefined, RegisterFin>(
                    "api/auth/register/fin",
                    {
                      key,
                      password,
                      passwordAgain,
                      fullName,
                      type: client === "guest" ? "member" : "host",
                    },
                  )
                  .then(() => refreshUserData())
                  .catch((error) => axiosErrorToaster(error))
                  .finally(() => setButtonLabel("IDLE"));
            }
          };
        case Step.passResetReq:
          return () => {
            setButtonLabel("DOING");
            axiosInstance &&
              axiosInstance
                .post("api/auth/manage/passresetreq", {
                  email,
                  client,
                })
                .then(() => setStep(Step.checkEmail))
                .catch((error) => axiosErrorToaster(error))
                .finally(() => setButtonLabel("IDLE"));
          };
        case Step.passResetFin:
          return () => {
            if (buttonLabel === "IDLE" && key) {
              setButtonLabel("DOING");
              axiosInstance &&
                axiosInstance
                  .post("api/auth/manage/passresetfin", {
                    key,
                    password,
                    passwordAgain,
                    fullName,
                    type: client === "guest" ? "member" : "host",
                  })
                  .then(() => refreshUserData())
                  .catch((error) => axiosErrorToaster(error))
                  .finally(() => setButtonLabel("IDLE"));
            }
          };
      }
  };

  const renderButtons = () => {
    const mainButton: { label: string; clickHandler?: () => void } = {
      clickHandler: mainClickHandler(undefined),
      label: LABELS[buttonLabel][step],
    };
    const navigateButton: {
      exists?: boolean;
      label?: string;
      clickHandler?: () => void;
    } = {};
    const resetButton: {
      exists?: boolean;
      label?: string;
      clickHandler?: () => void;
    } = {};
    switch (step) {
      case Step.login:
        navigateButton.exists = true;
        navigateButton.clickHandler = () => setStep(Step.registerReq);
        navigateButton.label = "Register";
        resetButton.exists = true;
        resetButton.clickHandler = () => setStep(Step.passResetReq);
        resetButton.label = "Forgot Password";
        break;
      case Step.registerReq:
        navigateButton.exists = true;
        navigateButton.clickHandler = () => setStep(Step.login);
        navigateButton.label = "Login";
        resetButton.exists = true;
        resetButton.label = "Forgot Password";
        resetButton.clickHandler = () => setStep(Step.passResetReq);
        break;
      case Step.registerFin:
        navigateButton.exists = false;
        resetButton.exists = false;
        break;
      case Step.passResetReq:
        navigateButton.exists = true;
        navigateButton.clickHandler = () => setStep(Step.login);
        navigateButton.label = "Back to Login";
        resetButton.exists = false;
        break;
      case Step.passResetFin:
        navigateButton.exists = false;
        resetButton.exists = false;
        break;
    }

    return (
      <Grid container direction="column" alignItems="center" rowSpacing={2}>
        <Grid item width="100%">
          <Button
            type="submit"
            variant="contained"
            onClick={mainButton.clickHandler}
            fullWidth
          >
            {mainButton.label}
          </Button>
        </Grid>
        {(navigateButton.exists || resetButton.exists) && (
          <Grid item container columnSpacing={2}>
            {navigateButton.exists && (
              <Grid item>
                <Button
                  color="secondary"
                  type="submit"
                  variant="outlined"
                  onClick={navigateButton.clickHandler}
                  sx={{ fontSize: resetButton.exists ? "70%" : "90%" }}
                >
                  {navigateButton.label}
                </Button>
              </Grid>
            )}
            {resetButton.exists && (
              <Grid item>
                <Button
                  color="secondary"
                  type="submit"
                  variant="outlined"
                  onClick={resetButton.clickHandler}
                  sx={{ fontSize: navigateButton.exists ? "70%" : "90%" }}
                >
                  {resetButton.label}
                </Button>
              </Grid>
            )}
          </Grid>
        )}
      </Grid>
    );
  };

  const authJSX = (
    <Paper sx={{ padding: "20px", width: "75%" }}>
      <Grid container direction="column" alignItems="center">
        <Grid item>
          <Typography variant="h6" textAlign="center">
            Welcome to
          </Typography>
        </Grid>
        <Grid item>
          <Tooltip title={version} placement="right-start">
            <Box {...{} /*component="img" src={} */} width="100%" height="100%">
              Application Logo
            </Box>
          </Tooltip>
        </Grid>
        <Grid item>
          {step === Step.checkEmail ? (
            <Typography textAlign="center">
              We sent {email} a link to{" "}
              {emailReason ? "activate your account" : "reset your passwrod"}!
            </Typography>
          ) : (
            <>
              {step !== Step.registerFin && step !== Step.passResetFin && (
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
              {(step === Step.login ||
                step === Step.registerFin ||
                step === Step.passResetFin) && (
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
                  {step === Step.registerFin ||
                    (step === Step.passResetFin && (
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
                    ))}
                </>
              )}
              {(step === Step.registerFin || step == Step.passResetFin) && (
                <br />
              )}
              {(step === Step.registerFin || step == Step.passResetFin) && (
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
            <Box mt={2}>{renderButtons()}</Box>
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
      width="100%"
      height="100%"
      wrap="nowrap"
    >
      <Grid
        item
        container
        width={isMobileOrTabl || client === "guest" ? "100%" : "40%"}
        height="100%"
        justifyContent="center"
        alignItems="center"
      >
        {authJSX}
      </Grid>
      {client === "host" && !isMobileOrTabl && (
        <Grid item width="60%" height="100%">
          <Box component="img" src={image} maxHeight="100%" width="auto" />
        </Grid>
      )}
    </Grid>
  );
};
