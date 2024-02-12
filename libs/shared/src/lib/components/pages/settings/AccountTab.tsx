import { FC, useContext } from "react";
import { Container, Typography, Paper, Button, Grid } from "@mui/material";
import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "@monorepo/shared";
import { ProfilePictureUpdater } from "./ProfilePictureUpdater";

const StyledContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 32px;
`;

const StyledPaper = styled(Paper)`
  padding: 16px;
  width: 100%;
  max-width: 600px;
`;

export const AccountTab: FC = () => {
  const { user, refreshUserData } = useContext(AuthContext);

  const navigate = useNavigate();

  return (
    <StyledContainer maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        Account Settings
      </Typography>
      <StyledPaper>
        <Grid container direction="column" spacing={2}>
          <Grid item>
            <Typography variant="subtitle1" gutterBottom>
              <strong>Phone Number:</strong> +{user?.phone}
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="subtitle1" gutterBottom>
              <strong>Email Address:</strong> {user?.email}
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="subtitle1" gutterBottom>
              <strong>Name:</strong> {user?.name}
            </Typography>
          </Grid>
          <Grid item container alignItems="center" spacing={2}>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1" gutterBottom>
                <strong>Subscription Status:</strong> {user?.type}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button variant="contained" onClick={() => navigate("/sub")}>
                Manage Subscription
              </Button>
            </Grid>
          </Grid>
          <Grid item container alignItems="center" spacing={2}>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1" gutterBottom>
                <strong>R&D Mode:</strong>
              </Typography>
            </Grid>
          </Grid>
          <Grid item>
            <ProfilePictureUpdater />
          </Grid>
        </Grid>
      </StyledPaper>
    </StyledContainer>
  );
};
