import { useEffect, useState } from "react";
import {
  Box,
  CircularProgress,
  Typography,
  styled,
  useTheme,
} from "@mui/material";
import { ChatCard } from "./ChatCard";
import { useParams } from "next/navigation";
import { useGetCaseByIdQuery } from "@/redux/services/casesApi";

const StyledFetchingBox = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: "1rem",
  borderRadius: "1rem",
  backgroundColor: theme.palette.lightGray.dark,
  marginBottom: "0.5rem",
}));

const ChatList = () => {
  const params = useParams();
  const { caseId } = params;
  const theme = useTheme();
  const [chats, setChats] = useState([]);

  const { data, error, isLoading, isFetching } = useGetCaseByIdQuery(caseId);

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
          <Box p={2} display="flex" alignItems="center" justifyContent="center">
            <CircularProgress color="secondary" size={20} />
          </Box>
        ) : data?.chats?.length > 0 ? (
          data?.chats.map((chat) => {
            return (
              <Box mb={1} key={chat.chatId}>
                <ChatCard thisCase={data} chat={chat} />
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
