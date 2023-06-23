"use client";
import { Sidebar } from "@/components/Sidebar/Sidebar";
import { Box } from "@mui/material";
import { Chat } from "@/components/Chat/Chat";
import { ChatRightSidebarHeader } from "@/components/Chat/ChatRightSidebarHeader";
import AttachFileOutlinedIcon from "@mui/icons-material/AttachFileOutlined";
import TextSnippetOutlinedIcon from "@mui/icons-material/TextSnippetOutlined";
import { useState } from "react";
import { ChatRightSidebarContent } from "@/components/Chat/ChatRightSidebarContent";

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
        <ChatRightSidebarContent selectedItem={selectedItem} />
      </Sidebar>
    </>
  );
};

export default ChatPage;
