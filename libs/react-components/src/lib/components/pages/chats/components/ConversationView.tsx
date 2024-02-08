import { Button, TextField, Box } from "@mui/material";
import MessageRow from "./MessageRow";
import { useCallback, useContext, useEffect, useState } from "react";
import { Send } from "@mui/icons-material";
import { Conversation, Message, SendMessageReq } from "@monorepo/types";
import { ServerContext } from "@monorepo/server-provider";
import { axiosErrorToaster } from "../../../utils";

interface ConversationViewProps {
  conversation: Conversation;
}

const ConversationView = ({ conversation }: ConversationViewProps) => {
  const server = useContext(ServerContext);

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);

  const fetchConversationMessages = useCallback(async () => {
    try {
      const res = await server?.axiosInstance.get(
        "api/chat/messages/conversationMessages/" + conversation._id,
      );
      res?.data && setMessages(res.data);
    } catch (e) {
      axiosErrorToaster(e);
    }
  }, [server?.axiosInstance, conversation._id]);

  useEffect(() => {
    fetchConversationMessages().then();
  }, [fetchConversationMessages]);

  const sendMessage = async () => {
    const x = await server?.axiosInstance.post<any, any, SendMessageReq>(
      "api/chat/messages",
      {
        conversationId: conversation._id.toString(),
        message,
      },
    );
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
        {messages?.map((message) => (
          <MessageRow key={message._id} message={message} />
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
