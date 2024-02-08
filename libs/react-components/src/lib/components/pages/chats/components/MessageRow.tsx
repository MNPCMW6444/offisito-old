import { useContext } from "react";
import { styled } from "@mui/material";
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { Message } from "@monorepo/types";
import { AuthContext } from "../../../../context/AuthContext";

const Container = styled(Box)({
  width: "100%",
});

interface BalloonProps {
  isAi?: "yes" | "no";
  isMe?: "yes" | "no";
  read?: "yes" | "no";
}

const Balloon = styled(Typography, {
  shouldForwardProp: (prop) =>
    prop !== "isAi" && prop !== "isMe" && prop !== "read",
})<BalloonProps>(({ theme, isAi, isMe, read }) => ({
  background:
    isAi === "yes"
      ? theme.palette.mode === "light"
        ? "#e0e0e0"
        : "#707070"
      : theme.palette.background.paper,
  color: theme.palette.text.primary,
  borderRadius: "20px",
  padding: "10px 16px",
  maxWidth: "80%",
  alignSelf:
    isMe === "yes" ? "flex-end" : isAi === "yes" ? "center" : "flex-start",
  boxShadow: "0 1px 3px rgba(0, 0, 0, 0.2)",
  margin: "5px 0",
  flex: "0 0 auto",
  "&:after": {
    content: read === "yes" ? '"\\2713\\2713"' : '""',
    display: read === "yes" ? "block" : "none",
    fontSize: "12px",
    marginTop: "4px",
    color: read === "yes" ? "" : "transparent",
    textAlign: "right",
  },
}));

const TripletDivider = styled(Box)({
  borderBottom: "0.5px dashed gray",
  width: "100%",
  margin: "10px 0",
});

interface MessageRowProps {
  message: Message;
}

const MessageRow = ({ message }: MessageRowProps) => {
  const { user } = useContext(AuthContext);

  return (
    <Container>
      <Box sx={{ display: "flex", flexDirection: "column-reverse" }}>
        {user?._id === message.ownerId && (
          <Balloon read={message.whenQueried ? "yes" : "no"} isMe="yes">
            {message.message}
          </Balloon>
        )}
        {user?._id !== message.ownerId && <Balloon>{message.message}</Balloon>}
      </Box>
      <TripletDivider />
    </Container>
  );
};

export default MessageRow;
