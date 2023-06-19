import { Box, IconButton } from "@mui/material";

import RefreshIcon from "@mui/icons-material/Refresh";

const ChatLeftSidebarHeader = () => {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="flex-end"
      width="100%"
    >
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
