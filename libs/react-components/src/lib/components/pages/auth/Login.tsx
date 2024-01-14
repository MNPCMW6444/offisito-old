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
import UserContext from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Grid, Paper, Typography } from "@mui/material";
import useMobile from "../../../hooks/useMobile";
import axios from "axios";

export interface LabelsConstants {
  IDLE: {
    LOGIN: string;
    REGISTER: string;
    RESET: string;
  };
  DOING: {
    LOGIN: string;
    REGISTER: string;
    RESET: string;
  };
}

export const LABELS: LabelsConstants = {
  IDLE: { LOGIN: "Login", REGISTER: "Register", RESET: "Reset" },
  DOING: {
    LOGIN: "Logging in...",
    REGISTER: "Registering...",
    RESET: "Resetting...",
  },
};

export const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [buttonLabel] = useState<keyof LabelsConstants>("IDLE");
  const { refreshUserData } = useContext(UserContext);

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
      await axios.post("/api/login", { email, password });
      refreshUserData();
    } catch (error) {
      toast.error((error as any)?.response?.data?.message);
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
              backgroundColor: "black",
              minWidth: "600px",
              overflow: "hidden",
            }}
          ></Box>
        </Grid>
      )}
      {loginForm}
    </Grid>
  );
};
