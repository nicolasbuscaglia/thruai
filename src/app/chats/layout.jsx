"use client";
import { Sidebar } from "@/components/Sidebar/Sidebar";
import { Box, styled } from "@mui/material";
import { ChatLeftSidebarHeader } from "@/components/Chat/ChatLeftSidebarHeader";
import { ChatList } from "@/components/Chat/ChatList";

const StyledHeightContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  borderLeft: "2px solid",
  borderColor: theme.palette.border.main,
  height: "calc(100vh - 64px)",
  overflow: "scroll",
  width: "100%",
}));

const ChatsLayout = ({ children }) => {
  return (
    <Box display="flex" flex={1}>
      <StyledHeightContainer>
        <Sidebar
          openSidebar
          position="relative"
          direction="left"
          drawerWidth={320}
          headerComponent={<ChatLeftSidebarHeader />}
        >
          <ChatList />
        </Sidebar>
        {children}
      </StyledHeightContainer>
    </Box>
  );
};

export default ChatsLayout;
