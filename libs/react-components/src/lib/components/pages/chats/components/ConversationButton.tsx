import { Conversation } from "@monorepo/types";
import { Avatar, Grid } from "@mui/material";
import { PrimaryText } from "@monorepo/react-styles";

interface ConversationButtonProps {
  conversation: Conversation;
}

export const ConversationButton = ({
  conversation,
}: ConversationButtonProps) => {
  return (
    <Grid container>
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
