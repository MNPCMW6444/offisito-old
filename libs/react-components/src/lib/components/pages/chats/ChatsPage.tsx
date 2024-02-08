import { Grid } from "@mui/material";
import { useCallback, useContext, useEffect, useState } from "react";
import { ServerContext } from "@monorepo/server-provider";
import { axiosErrorToaster } from "../../utils";
import { Conversation } from "@monorepo/types";
import Box from "@mui/material/Box";

export const ChatsPage = () => {
  const server = useContext(ServerContext);

  const [conversations, setConversations] = useState<Conversation[]>();

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
        {conversations &&
          conversations.map((conversation) => (
            <Box>{conversation.name || conversation._id}</Box>
          ))}
      </Grid>
      <Grid width="75%" item container direction="column"></Grid>
    </Grid>
  );
};
