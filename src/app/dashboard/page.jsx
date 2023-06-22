"use client";
import { CardContainer, Card } from "@/components/Card";
import { Box, CircularProgress, Grid } from "@mui/material";
import { useState } from "react";
import { CardAdd } from "@/components/Card/CardAdd";
import { Sidebar } from "@/components/Sidebar/Sidebar";
import { Creation } from "@/components/Creation";
import { useSelector } from "react-redux";
import { selectFilteredCases } from "@/redux/features/cases/caseSlice";

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [openRightSidebar, setOpenRightSidebar] = useState(false);

  const cases = useSelector(selectFilteredCases);

  const handleOpenRightSidebar = () => {
    setOpenRightSidebar(true);
  };

  const handleCloseRightSidebar = () => {
    setOpenRightSidebar(false);
  };

  return (
    <>
      <Box p={2} width="100%">
        {isLoading ? (
          <CircularProgress color="secondary" size={20} />
        ) : (
          <CardContainer title="Cases">
            <Grid container spacing={2}>
              {cases?.map((card) => {
                return (
                  <Grid item xs={12} md={4} key={card.caseId}>
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
        drawerWidth={300}
        direction="right"
        header={false}
        hidden={true}
        openSidebar={openRightSidebar}
      >
        <Creation handleCancel={handleCloseRightSidebar} />
      </Sidebar>
    </>
  );
};

export default Dashboard;
