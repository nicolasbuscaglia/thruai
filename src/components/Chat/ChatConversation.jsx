import { Box, Grid, Typography, useTheme } from "@mui/material";
import { ChatSummaryCard } from "./ChatSummaryCard";

const ChatConversation = ({ chat }) => {
  const theme = useTheme();

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
            <Box
              key={message.id}
              p={2}
              mb={1}
              sx={{
                marginLeft: "auto",
                width: "fit-content",
                borderRadius: "0.8rem",
                backgroundColor: theme.palette.lightGray.dark,
              }}
            >
              <Typography
                variant="body2"
                color="secondary"
                sx={{ overflowWrap: "anywhere" }}
              >
                {message.content}
              </Typography>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};

export { ChatConversation };
