import { Box } from "@mui/material";
import { FormSelect } from "../Forms/FormSelect";

const ChatRightSidebarHeader = ({ items = [], handleSelectedItem }) => {
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
    </Box>
  );
};
export { ChatRightSidebarHeader };
