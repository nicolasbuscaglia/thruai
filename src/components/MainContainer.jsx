"use client";
import styles from "@/app/page.module.css";
import { Box } from "@mui/material";
import { Sidebar } from "./Sidebar/Sidebar";
import { MenuItems } from "./MenuItems";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ChatIcon from "@mui/icons-material/Chat";
import CheckBoxOutlinedIcon from "@mui/icons-material/CheckBoxOutlined";
import KeyOutlinedIcon from "@mui/icons-material/KeyOutlined";
import HistoryOutlinedIcon from "@mui/icons-material/HistoryOutlined";
import SettingsIcon from "@mui/icons-material/Settings";

const MENU_ITEMS = [
  {
    title: "Dashboard",
    path: "/",
    icon: <DashboardIcon />,
    notifications: 0,
  },
  {
    title: "Chats",
    path: "/chats",
    icon: <ChatIcon />,
    notifications: 3,
  },
  {
    title: "Audit",
    path: "/audit",
    icon: <CheckBoxOutlinedIcon />,
    notifications: 0,
  },
  {
    title: "API Keys",
    path: "/api-keys",
    icon: <KeyOutlinedIcon />,
    notifications: 0,
  },
  {
    title: "History",
    path: "/history",
    icon: <HistoryOutlinedIcon />,
    notifications: 0,
  },
  {
    title: "Settings",
    path: "/settings",
    icon: <SettingsIcon />,
    notifications: 0,
  },
];

const MainContainer = ({ children }) => {
  return (
    <main className={styles.main}>
      <div style={{ zIndex: 9999 }}>
        <Sidebar drawerWidth={180} direction="left">
          <MenuItems menuItems={MENU_ITEMS} />
        </Sidebar>
      </div>
      <Box
        display="flex"
        width="100%"
        height="100%"
        position="relative"
        sx={{ flex: 1 }}
        pl={8}
      >
        {children}
      </Box>
    </main>
  );
};

export { MainContainer };
