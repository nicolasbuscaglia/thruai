"use client";
import { CardContainer, Card } from "@/components/Card";
import { Box, CircularProgress, Grid, styled } from "@mui/material";
import { useEffect, useState } from "react";
import { CardAdd } from "@/components/Card/CardAdd";
import { Sidebar } from "@/components/Sidebar/Sidebar";
import { Creation } from "@/components/Creation";
import { useGetCasesQuery } from "@/redux/services/casesApi";
import { useDispatch, useSelector } from "react-redux";
import { selectFilter } from "@/redux/features/uiSlice";

const StyledFetchingBox = styled(Box)(({ theme }) => ({
  minHeight: "12rem",
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  border: "1px solid",
  borderColor: theme.palette.gray.light,
  borderRadius: "1rem",
  gap: 5,
  cursor: "pointer",
}));

const Dashboard = () => {
  const dispatch = useDispatch();
  const [openRightSidebar, setOpenRightSidebar] = useState(false);
  const [filteredData, setFilteredData] = useState([]);

  const filter = useSelector((state) => selectFilter(state));
  const { data, error, isLoading, isFetching } = useGetCasesQuery();

  useEffect(() => {
    if (data?.length > 0) {
      const filtered = data?.filter((item) => {
        return (
          item.name.toLowerCase().includes(filter.toLowerCase()) ||
          item.caseId.toLowerCase().includes(filter.toLowerCase())
        );
      });
      setFilteredData(filtered);
    }
  }, [data, filter]);

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
              {filteredData?.map((card) => {
                return (
                  <Grid item xs={12} md={4} key={card.caseId}>
                    <Card card={card} />
                  </Grid>
                );
              })}
              {isFetching && (
                <Grid item xs={12} md={4}>
                  <StyledFetchingBox>
                    <CircularProgress color="secondary" size={20} />
                  </StyledFetchingBox>
                </Grid>
              )}
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
