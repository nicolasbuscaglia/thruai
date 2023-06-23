import { useState } from "react";
import { Box, CircularProgress, Typography, useTheme } from "@mui/material";
import { ChatCard } from "./ChatCard";
import { useSelector } from "react-redux";

import { useParams } from "next/navigation";
import { selectSortedChatsByCaseId } from "@/redux/features/chats/chatsSlice";

const ChatList = () => {
  const params = useParams();
  const { caseId } = params;
  const theme = useTheme();
  const [isLoading, setIsLoading] = useState(false);

  const chatList = useSelector(selectSortedChatsByCaseId(caseId));

  return (
    <Box p={2} width="100%">
      <Box mb={2}>
        <Typography
          variant="body2"
          fontWeight={300}
          color={theme.palette.gray.light}
        >
          Case Chats
        </Typography>
      </Box>
      <Box>
        {isLoading ? (
          <CircularProgress color="secondary" size={20} />
        ) : chatList.length > 0 ? (
          chatList.map((chat) => {
            return (
              <Box mb={1} key={chat.caseId}>
                <ChatCard chat={chat} />
              </Box>
            );
          })
        ) : (
          <Typography
            display="flex"
            alignItems="center"
            justifyContent="center"
            variant="overline"
            color={theme.palette.gray.main}
          >
            No chats yet
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export { ChatList };
