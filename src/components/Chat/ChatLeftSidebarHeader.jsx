import { Box, Button, IconButton, useTheme } from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import AddIcon from "@mui/icons-material/Add";
import { v4 as uuidv4 } from "uuid";
import { useParams, useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { addNewChat } from "@/redux/features/chats/chatsSlice";

const ChatLeftSidebarHeader = () => {
  const theme = useTheme();
  const router = useRouter();
  const dispatch = useDispatch();
  const params = useParams();
  const { caseId } = params;

  const handleClick = () => {
    const payload = {
      caseId: caseId,
      chat: {
        chatId: uuidv4(),
        createdOn: new Date(),
        summary: [],
        messages: [],
      },
    };
    dispatch(addNewChat(payload));
    router.push(`/chats/${caseId}/${payload.chat.chatId}`);
  };

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      width="100%"
    >
      <Button
        variant="contained"
        color="blue"
        startIcon={<AddIcon />}
        sx={{
          color: theme.palette.secondary.main,
          padding: "0.1rem 0.5rem",
          borderRadius: "0.5rem",
        }}
        onClick={handleClick}
      >
        New
      </Button>

      <IconButton
        size="small"
        aria-label="refresh chat list"
        aria-controls="refresh-chat-list-icon-button"
        aria-haspopup="true"
      >
        <RefreshIcon color="icon" fontSize="medium" />
      </IconButton>
    </Box>
  );
};
export { ChatLeftSidebarHeader };
