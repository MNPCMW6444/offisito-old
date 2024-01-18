import {
  ChangeEvent,
  FormEvent,
  KeyboardEvent,
  useContext,
  useState,
} from "react";
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

export const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [buttonLabel] = useState<keyof LabelsConstants>("IDLE");
  const { refreshUserData } = useContext(UserContext);

  const x = useContext(ServerContext);
  const axiosInstance = x?.axiosInstance;

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleKeyPress = (e: KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSubmit(e as unknown as FormEvent);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      if (axiosInstance)
        await axiosInstance.post("/api/auth/sign/in", { email, password });
      refreshUserData();
    } catch (error) {
      toast.error((error as AxiosError)?.message);
    }
  };

  const { isMobileOrTabl } = useMobile();

  const loginForm = (
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
          <Typography variant="h6" textAlign="center">
            Login
          </Typography>
          <TextField
            margin="dense"
            label="Email"
            type="email"
            fullWidth
            variant="outlined"
            value={email}
            onChange={handleEmailChange}
          />
          <TextField
            margin="dense"
            label="Password"
            type="password"
            fullWidth
            variant="outlined"
            value={password}
            onChange={handlePasswordChange}
            onKeyPress={handleKeyPress}
          />
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
                  onClick={handleSubmit}
                >
                  {LABELS[buttonLabel].LOGIN}
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );

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
      {loginForm}
    </Grid>
  );
};
