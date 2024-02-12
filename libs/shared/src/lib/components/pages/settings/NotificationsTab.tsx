import styled from "@emotion/styled";
import { Container } from "@mui/material";

const StyledContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 32px;
`;

export const NotificationsTab = () => {
  return <StyledContainer maxWidth="sm"></StyledContainer>;
};
