"use client";
import styles from "./page.module.css";
import { MainContainer } from "@/components/MainContainer";
import { CardContainer, Card } from "@/components/Card";
import { Box, CircularProgress, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { CardAdd } from "@/components/Card/CardAdd";
import { Sidebar } from "@/components/Sidebar/Sidebar";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ChatIcon from "@mui/icons-material/Chat";
import CheckBoxOutlinedIcon from "@mui/icons-material/CheckBoxOutlined";
import KeyOutlinedIcon from "@mui/icons-material/KeyOutlined";
import HistoryOutlinedIcon from "@mui/icons-material/HistoryOutlined";
import SettingsIcon from "@mui/icons-material/Settings";
import { MenuItems } from "@/components/MenuItems";
import { Creation } from "@/components/Creation";

const MENU_ITEMS = [
  {
    title: "Dashboard",
    pathname: "/",
    icon: <DashboardIcon />,
  },
  {
    title: "Chats",
    pathname: "/chats",
    icon: <ChatIcon />,
  },
  {
    title: "Audit",
    pathname: "/audit",
    icon: <CheckBoxOutlinedIcon />,
  },
  {
    title: "API Keys",
    pathname: "/api-keys",
    icon: <KeyOutlinedIcon />,
  },
  {
    title: "History",
    pathname: "/history",
    icon: <HistoryOutlinedIcon />,
  },
  {
    title: "Settings",
    pathname: "/settings",
    icon: <SettingsIcon />,
  },
];

const CASES = [
  {
    id: 1,
    title: "Patient ID #34512",
    type: "DNAVisit - Dev",
    filesCount: 13,
    daysLeft: 7,
    uploadStatus: 85,
    team: ["KA", "RR", "Test", "Demo"],
  },
  {
    id: 2,
    title: "Patient ID #34512",
    type: "DNAVisit - Clinical",
    filesCount: 5,
    daysLeft: 1,
    uploadStatus: 75,
    team: ["KA", "RR"],
  },
  {
    id: 3,
    title: "Patient ID #34512",
    type: "DNAVisit - Clinical",
    filesCount: 3,
    daysLeft: 8,
    uploadStatus: 100,
    team: ["KA", "RR", "Demo"],
  },
  {
    id: 4,
    title: "Patient ID #456",
    type: "DNAVisit - Clinical",
    filesCount: 1,
    daysLeft: 10,
    uploadStatus: 35,
    team: ["KA", "RR", "Test 1", "Test 2", "Test 3", "Test 4", "Test 5"],
  },
  {
    id: 5,
    title: "Patient ID #34512",
    type: "DNAVisit - Dev",
    filesCount: 2,
    daysLeft: 14,
    uploadStatus: 20,
    team: ["KA", "RR", "Test 1"],
  },
];

export default function Home() {
  const [cards, setCards] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [openRightSidebar, setOpenRightSidebar] = useState(false);

  useEffect(() => {
    setCards(CASES);
    setIsLoading(false);
  }, []);

  const handleOpenRightSidebar = () => {
    setOpenRightSidebar(true);
  };

  const handleCloseRightSidebar = () => {
    setOpenRightSidebar(false);
  };

  const handleCreate = () => {
    const payload = {
      id: 6,
      title: "Patient ID #34513",
      type: "Test - Dev",
      filesCount: 1,
      daysLeft: 14,
      uploadStatus: 10,
      team: ["Test"],
    };
    setCards([...cards, payload]);
    handleCloseRightSidebar();
  };

  return (
    <main className={styles.main}>
      <MainContainer>
        <Sidebar menuItems={MENU_ITEMS} drawerWidth={180} position="left">
          <MenuItems menuItems={MENU_ITEMS} />
        </Sidebar>
        <Box p={2} pl={10}>
          {isLoading ? (
            <CircularProgress color="secondary" size={20} />
          ) : (
            <CardContainer title="Cases">
              <Grid container spacing={2}>
                {cards.map((card) => {
                  return (
                    <Grid item xs={12} md={4} key={card.id}>
                      <Card card={card} />
                    </Grid>
                  );
                })}
                <Grid item xs={12} md={4}>
                  <CardAdd handleAddCard={handleOpenRightSidebar} />
                </Grid>
              </Grid>
            </CardContainer>
          )}
        </Box>
        <Sidebar
          menuItems={MENU_ITEMS}
          drawerWidth={300}
          position="right"
          header={false}
          hidden={true}
          openSidebar={openRightSidebar}
        >
          <Creation
            handleCancel={handleCloseRightSidebar}
            handleCreate={handleCreate}
          />
        </Sidebar>
      </MainContainer>
    </main>
  );
}
