import { Grid } from "@mui/material";
import { useCallback, useContext, useEffect, useState } from "react";
import { ServerContext } from "@monorepo/server-provider";
import { axiosErrorToaster } from "../../utils";
import { Conversation } from "@monorepo/types";
import { PrimaryText } from "@monorepo/react-styles";
import { ConversationButton } from "./components/ConversationButton";
import ConversationView from "./components/ConversationView";

export const ChatsPage = () => {
  const server = useContext(ServerContext);

  const [conversations, setConversations] = useState<Conversation[]>();
  const [selectedConversation, serSelectedConversation] =
    useState<Conversation>();

  const fetchConversations = useCallback(async () => {
    try {
      const res = await server?.axiosInstance.get("api/chats/conversations");
      res?.data && setConversations(res?.data);
    } catch (e) {
      axiosErrorToaster(e);
    }
  }, [server?.axiosInstance]);

  useEffect(() => {
    fetchConversations().then();
  }, [fetchConversations]);

  return (
    <Grid height="100%" container>
      <Grid width="25%" item container direction="column">
        {conversations && conversations.length > 0 ? (
          conversations.map((conversation) => (
            <ConversationButton conversation={conversation} />
          ))
        ) : (
          <PrimaryText fontSize="80%">
            You dont have conversations yet
          </PrimaryText>
        )}
      </Grid>
      <Grid width="75%" item container direction="column">
        {selectedConversation && (
          <ConversationView conversation={selectedConversation} />
        )}
      </Grid>
    </Grid>
  );
};
