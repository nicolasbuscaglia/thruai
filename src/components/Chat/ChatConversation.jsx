import { Box, CircularProgress, Grid, Typography, styled } from "@mui/material";
import { ChatSummaryCard } from "./ChatSummaryCard";
import { ACTOR } from "@/constants";
import { useEffect, useState } from "react";

const StyledMainBox = styled(Box, {
  shouldForwardProp: (prop) => prop !== "actor",
})(({ theme, actor }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: "1rem",
  marginBottom: "1rem",
  marginLeft: "auto",
  width: "fit-content",
  borderRadius: "0.8rem",
  backgroundColor:
    actor === ACTOR.AI
      ? theme.palette.lightGray.dark
      : theme.palette.secondary.main,
}));

const ChatConversation = ({ chat, isLoading, lastMessage, isAILoading }) => {
  const [messages, setMessages] = useState();
  useEffect(() => {
    if (chat) {
      const messageList = [...chat.messages];
      setMessages(messageList.reverse());
    }
  }, [chat]);
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
        {messages?.map((message, index) => {
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
            <CircularProgress color="secondary" size={20} />
            <Typography variant="body2" color="secondary" ml={2}>
              Waiting ThruAi response...
            </Typography>
          </StyledMainBox>
        )}
      </Box>
    </Box>
  );
};

export { ChatConversation };
