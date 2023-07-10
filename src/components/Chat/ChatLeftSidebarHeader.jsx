import { Box, Button, IconButton, useTheme } from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import AddIcon from "@mui/icons-material/Add";
import { useParams, useRouter } from "next/navigation";
import { useAddNewChatMutation } from "@/redux/services/casesApi";

const ChatLeftSidebarHeader = () => {
  const theme = useTheme();
  const router = useRouter();
  const params = useParams();
  const { caseId } = params;

  const [addNewChat] = useAddNewChatMutation();

  const handleClick = async () => {
    const newChat = await addNewChat(caseId);
    router.push(`/chats/${caseId}/${newChat?.data?.id}`);
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
