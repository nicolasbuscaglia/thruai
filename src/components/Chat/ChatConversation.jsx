import { Box, Typography, styled } from "@mui/material";
import { ACTOR } from "@/constants";
import { useEffect, useState } from "react";
import Typing from "../Typing";

const StyledMainBox = styled(Box, {
  shouldForwardProp: (prop) => prop !== "actor",
})(({ theme, actor }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: "1rem",
  marginBottom: "1rem",
  marginLeft: actor === ACTOR.AI ? 0 : "auto",
  width: "fit-content",
  borderRadius: "0.8rem",
  backgroundColor:
    actor === ACTOR.AI
      ? theme.palette.lightGray.dark
      : theme.palette.secondary.main,
}));

const ChatConversation = ({
  messages = [],
  lastMessage,
  isAILoading,
  tryAgain,
}) => {
  const [sortedMessages, setSortedMessages] = useState();
  useEffect(() => {
    if (messages.length > 0) {
      const messageList = [...messages];
      setSortedMessages(messageList.reverse());
    }
  }, [messages]);
  return (
    <Box>
      {/* <Box mb={3}>
        <Typography variant="h6" color="secondary">
          {
            "Here's a high level summary of the content that you uploaded for this case."
          }
        </Typography>
      </Box> */}
      {/* <Grid container spacing={2} mb={2}>
        {chat?.summary?.map((summary) => {
          return (
            <Grid
              key={summary.id}
              item
              xs={12}
              md={6}
              display="flex"
              justifyContent="center"
            >
              <ChatSummaryCard summary={summary} />
            </Grid>
          );
        })}
      </Grid> */}
      <Box>
        {sortedMessages?.map((message, index) => {
          return (
            <StyledMainBox key={index} actor={message.actor}>
              <Typography
                variant="body2"
                color={message.actor === ACTOR.AI ? "secondary" : "primary"}
                sx={{ overflowWrap: "anywhere" }}
              >
                {message.content}
              </Typography>
            </StyledMainBox>
          );
        })}
        {lastMessage && (
          <StyledMainBox>
            <Typography
              variant="body2"
              color="primary"
              sx={{ overflowWrap: "anywhere" }}
            >
              {lastMessage}
            </Typography>
          </StyledMainBox>
        )}
        {isAILoading && (
          <StyledMainBox actor={ACTOR.AI}>
            <Typing />
          </StyledMainBox>
        )}
        {tryAgain && (
          <StyledMainBox actor={ACTOR.AI}>
            <Typography variant="body2" color="secondary">
              Please, try again later. The file is being processed.
            </Typography>
          </StyledMainBox>
        )}
      </Box>
    </Box>
  );
};

export { ChatConversation };
