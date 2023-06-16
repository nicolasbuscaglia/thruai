import { Box, IconButton } from "@mui/material";
import { FormSelect } from "../Forms/FormSelect";
import RefreshIcon from "@mui/icons-material/Refresh";

const ChatSidebarHeader = ({ items, handleSelectedItem }) => {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      width="100%"
    >
      <FormSelect
        padding={6}
        items={items}
        handleSelectedChange={handleSelectedItem}
      />
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
export { ChatSidebarHeader };
