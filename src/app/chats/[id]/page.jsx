"use client";
import { Sidebar } from "@/components/Sidebar/Sidebar";
import { Box, styled } from "@mui/material";
import { Chat } from "@/components/Chat/Chat";
import { ChatRightSidebarHeader } from "@/components/Chat/ChatRightSidebarHeader";
import AttachFileOutlinedIcon from "@mui/icons-material/AttachFileOutlined";
import TextSnippetOutlinedIcon from "@mui/icons-material/TextSnippetOutlined";
import { useState } from "react";
import { ChatNotes } from "@/components/Chat/ChatNotes";
import { ChatFileList } from "@/components/Chat/ChatFileList";
import { ButtonManageCase } from "@/components/ButtonMgmtCase";

const FORM_SELECT_ITEMS = [
  {
    id: 1,
    icon: <AttachFileOutlinedIcon color="icon" fontSize="small" />,
    label: "Files",
  },
  {
    id: 2,
    icon: <TextSnippetOutlinedIcon color="icon" fontSize="small" />,
    label: "Notes",
  },
];

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

const ChatPage = () => {
  const [selectedItem, setSelectedItem] = useState(FORM_SELECT_ITEMS[0].label);

  const handleSelectedItem = (item) => {
    setSelectedItem(item);
  };

  return (
    <>
      <Box sx={{ overflow: "scroll", flex: 1 }}>
        <Chat />
      </Box>
      <Sidebar
        openSidebar
        position="relative"
        direction="right"
        drawerWidth={280}
        headerComponent={
          <ChatRightSidebarHeader
            items={FORM_SELECT_ITEMS}
            handleSelectedItem={handleSelectedItem}
          />
        }
      >
        <Box display="flex" flexDirection="column" flex={1}>
          <Box flex={1}>
            {selectedItem === "Files" ? <ChatFileList /> : <ChatNotes />}
          </Box>
          <StyledBottomContainer>
            <ButtonManageCase />
          </StyledBottomContainer>
        </Box>
      </Sidebar>
    </>
  );
};

export default ChatPage;
