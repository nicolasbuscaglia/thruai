"use client";
import { useState } from "react";
import { Sidebar } from "@/components/Sidebar/Sidebar";
import { Box, Typography, styled, useTheme } from "@mui/material";
import AttachFileOutlinedIcon from "@mui/icons-material/AttachFileOutlined";
import ChatOutlinedIcon from "@mui/icons-material/ChatOutlined";
import TextSnippetOutlinedIcon from "@mui/icons-material/TextSnippetOutlined";
import { ChatSidebarHeader } from "@/components/Chat/ChatSidebarHeader";
import { ChatList } from "@/components/Chat/ChatList";
import { Chat } from "@/components/Chat/Chat";
import { FileSidebarHeader } from "@/components/File/FileSidebar";
import { FileList } from "@/components/File/FileList";

const FORM_SELECT_ITEMS = [
  {
    id: 1,
    icon: <ChatOutlinedIcon color="icon" fontSize="small" />,
    label: "Chats",
  },
  {
    id: 2,
    icon: <TextSnippetOutlinedIcon color="icon" fontSize="small" />,
    label: "Notes",
  },
];

const StyledHeightContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  borderLeft: "2px solid",
  borderColor: theme.palette.border.main,
  height: "calc(100vh - 64px)",
  overflow: "scroll",
  width: "100%",
}));

const Chats = () => {
  const [selectedItem, setSelectedItem] = useState(FORM_SELECT_ITEMS[0].label);

  const handleSelectedItem = (item) => {
    setSelectedItem(item);
  };

  return (
    <Box display="flex" flex={1}>
      <StyledHeightContainer>
        <Sidebar
          openSidebar
          position="relative"
          direction="left"
          drawerWidth={320}
          headerComponent={
            <ChatSidebarHeader
              items={FORM_SELECT_ITEMS}
              handleSelectedItem={handleSelectedItem}
            />
          }
        >
          {selectedItem === "Chats" ? (
            <ChatList />
          ) : (
            <Typography color="secondary">Notes</Typography>
          )}
        </Sidebar>
        <Box sx={{ overflow: "scroll", flex: 1 }}>
          {selectedItem === "Chats" ? (
            <Chat />
          ) : (
            <Typography color="secondary">Notes</Typography>
          )}
        </Box>
        <Sidebar
          openSidebar
          position="relative"
          direction="right"
          drawerWidth={280}
          headerComponent={<FileSidebarHeader />}
        >
          <FileList />
        </Sidebar>
      </StyledHeightContainer>
    </Box>
  );
};

export default Chats;
