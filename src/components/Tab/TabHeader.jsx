import { Box } from "@mui/material";
import { FormSelect } from "../Forms/FormSelect";
import RefreshIcon from "@mui/icons-material/Refresh";

const TabHeader = ({ items, handleSelectedItem }) => {
  return (
    <Box
      pb={0.5}
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      width="100%"
    >
      <FormSelect items={items} handleSelectedChange={handleSelectedItem} />
      <RefreshIcon color="icon" fontSize="medium" />
    </Box>
  );
};
export { TabHeader };
