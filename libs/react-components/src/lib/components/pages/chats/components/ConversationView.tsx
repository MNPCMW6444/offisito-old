import { Button, TextField, Box } from "@mui/material";
import ChatTriplet from "./chat/ChatTriplet";
import { useContext, useState } from "react";
import { Send } from "@mui/icons-material";
import { Conversation } from "@monorepo/types";
import { ServerContext } from "@monorepo/server-provider";

interface ConversationViewProps {
  conversation: Conversation;
}

const ConversationView = ({ conversation }: ConversationViewProps) => {
  const server = useContext(ServerContext);

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState();

  const sendMessage = async () => {
    const x = await server?.axiosInstance.post("api/chat/sendMessage", {
      conversationId: conversation._id,
      message,
    });
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <Box
        sx={{
          overflow: "auto",
          flexGrow: 1,
          px: 2,
        }}
      >
        {messages?.map((single) => (
          <ChatTriplet key={single._id} triplet={single} />
        ))}
      </Box>
      <Box sx={{ display: "flex", alignItems: "center", p: 1 }}>
        <TextField
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          variant="outlined"
          fullWidth
          placeholder="Type a message..."
        />
        <Box sx={{ width: "1em" }} />
        <Button
          variant="contained"
          color="primary"
          onClick={async () => {
            await sendMessage();
            setMessage("");
          }}
        >
          <Send />
        </Button>
      </Box>
    </Box>
  );
};

export default ConversationView;
