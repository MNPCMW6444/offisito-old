import { Box, Grid, IconButton, TextField } from "@mui/material";
import MessageRow from "./MessageRow";
import {
  Dispatch,
  ElementRef,
  SetStateAction,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { ArrowBackIosOutlined, Send } from "@mui/icons-material";
import { axiosErrorToaster } from "../../../utils";
import { AxiosInstance } from "axios";
import { ServerContext } from "../../../../context";
import { Conversation, Message, SendMessageReq, TODO } from "@offisito/shared";
import { Btn, PrimaryText, useResponsiveness } from "../../../../";
import { useSubscribe } from "../../../../hooks/useSubscribe";

interface ConversationViewProps {
  conversation: Conversation;
  setSelectedConversation: Dispatch<SetStateAction<Conversation | undefined>>;
  isGuest?: boolean;
}

export const sendMessage = (
  axiosInstance: AxiosInstance | undefined,
  conversationIdOrAddressee: string,
  message: string,
  cb: () => void = () => console.log("no cb :)"),
) => {
  axiosInstance &&
    axiosInstance
      .post<TODO, TODO, SendMessageReq>("api/chat/messages", {
        conversationIdOrAddressee,
        message,
      })
      .finally(() => cb());
};

const ConversationView = ({
  conversation,
  setSelectedConversation,
  isGuest,
}: ConversationViewProps) => {
  const server = useContext(ServerContext);

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<null | Message[]>(null);
  const [scrolled, setScrolled] = useState<boolean>(false);

  const { res } = useSubscribe("api/chat/subscribe");

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
  }, [fetchConversationMessages, res]);

  const messagesEndRef = useRef<ElementRef<typeof TextField>>(null);

  useEffect(() => {
    messages &&
      messages.length > 0 &&
      !scrolled &&
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    messagesEndRef.current && setScrolled(false);
  }, [messages, scrolled, res]);

  const { isMobile } = useResponsiveness(!!isGuest);

  return (
    <>
      {isMobile && (
        <Grid
          width="100%"
          height="50px"
          container
          justifyContent="space-between"
          alignItems="center"
        >
          <Grid item>
            <IconButton onClick={() => setSelectedConversation(undefined)}>
              <ArrowBackIosOutlined />
            </IconButton>
          </Grid>
          <Grid item></Grid>
          <Grid item></Grid>
        </Grid>
      )}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          overflowX: "scroll",
          height: `calc( 100% - ${80 + (isMobile ? 50 : 0)}px )`,
        }}
      >
        <Box
          sx={{
            overflow: "auto",
            flexGrow: 1,
            px: 2,
          }}
        >
          {messages?.map((message, i) => (
            <Box
              key={i}
              ref={i === messages.length - 1 ? messagesEndRef : null}
            >
              <MessageRow key={message._id} message={message} />
            </Box>
          )) || <PrimaryText padded>Loading Messages...</PrimaryText>}
        </Box>
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
        <Btn
          onClick={() => {
            sendMessage(
              server?.axiosInstance,
              conversation._id.toString(),
              message,
              () => fetchConversationMessages(),
            );
            setMessage("");
          }}
        >
          <Send />
        </Btn>
      </Box>
    </>
  );
};

export default ConversationView;
