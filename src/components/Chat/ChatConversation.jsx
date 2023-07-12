import { Box, CircularProgress, Grid, Typography, styled } from "@mui/material";
import { ChatSummaryCard } from "./ChatSummaryCard";

const StyledMainBox = styled(Box)(({ theme }) => ({
  display: "flex",
  padding: "1rem",
  marginBottom: "1rem",
  marginLeft: "auto",
  width: "fit-content",
  borderRadius: "0.8rem",
  backgroundColor: theme.palette.lightGray.dark,
}));

const ChatConversation = ({ chat, isFetching }) => {
  return (
    <Box>
      <Box mb={3}>
        <Typography variant="h6" color="secondary">
          {
            "Here's a high level summary of the content that you uploaded for this case."
          }
        </Typography>
      </Box>
      <Grid container spacing={2} mb={2}>
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
      </Grid>
      <Box>
        {chat?.messages?.map((message) => {
          return (
            <StyledMainBox key={message.messageId}>
              <Typography
                variant="body2"
                color="secondary"
                sx={{ overflowWrap: "anywhere" }}
              >
                {message.content}
              </Typography>
            </StyledMainBox>
          );
        })}
        {isFetching && (
          <StyledMainBox>
            <CircularProgress color="secondary" size={20} />
          </StyledMainBox>
        )}
      </Box>
    </Box>
  );
};

export { ChatConversation };
