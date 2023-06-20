import { Box, styled } from "@mui/material";
import { ChatFileList } from "./ChatFileList";
import { ChatNotes } from "./ChatNotes";
import { ButtonManageCase } from "../ButtonMgmtCase";

const StyledBottomContainer = styled(Box)(({ theme }) => ({
  position: "sticky",
  bottom: 0,
  padding: "1rem",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: theme.palette.primary.main,
  borderTop: "1px solid",
  borderColor: theme.palette.lightGray.dark,
}));

const ChatRightSidebarContent = ({ selectedItem }) => {
  return (
    <Box display="flex" flexDirection="column" flex={1} width="100%">
      <Box flex={1}>
        {selectedItem === "Files" ? <ChatFileList /> : <ChatNotes />}
      </Box>
      <StyledBottomContainer>
        <ButtonManageCase />
      </StyledBottomContainer>
    </Box>
  );
};

export { ChatRightSidebarContent };
