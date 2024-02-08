import { Conversation } from "@monorepo/types";
import { Avatar, Grid } from "@mui/material";
import { PrimaryText } from "@monorepo/react-styles";
import { Dispatch, SetStateAction } from "react";

interface ConversationButtonProps {
  conversation: Conversation;
  setSelectedConversation: Dispatch<SetStateAction<Conversation | undefined>>;
}

export const ConversationButton = ({
  conversation,
  setSelectedConversation,
}: ConversationButtonProps) => {
  return (
    <Grid
      container
      onClick={() => setSelectedConversation(conversation._id)}
      sx={{ cursor: "pointer" }}
    >
      <Grid item>
        <Avatar />
      </Grid>
      <Grid item container direction="column">
        <Grid item container>
          <Grid item>
            <PrimaryText>name</PrimaryText>
          </Grid>
          <Grid item>
            <PrimaryText>time</PrimaryText>
          </Grid>
        </Grid>
        <Grid item>
          <PrimaryText>lastMassage</PrimaryText>
        </Grid>
      </Grid>
    </Grid>
  );
};
