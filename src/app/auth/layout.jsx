"use client";
import { Sidebar } from "@/components/Sidebar/Sidebar";
import { Box, styled } from "@mui/material";
import { ChatLeftSidebarHeader } from "@/components/Chat/ChatLeftSidebarHeader";
import { ChatList } from "@/components/Chat/ChatList";

const StyledContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "100%",
}));

const AuthLayout = ({ children }) => {
  return <StyledContainer>{children}</StyledContainer>;
};

export default AuthLayout;
