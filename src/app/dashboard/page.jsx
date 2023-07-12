"use client";
import { CardContainer, Card } from "@/components/Card";
import { Box, CircularProgress, Grid, styled } from "@mui/material";
import { useEffect, useState } from "react";
import { CardAdd } from "@/components/Card/CardAdd";
import { Sidebar } from "@/components/Sidebar/Sidebar";
import { Creation } from "@/components/Creation";
import {
  useCreateNewCaseMutation,
  useGetCasesQuery,
} from "@/redux/services/casesApi";
import { useSelector } from "react-redux";
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
  const [openRightSidebar, setOpenRightSidebar] = useState(false);
  const [filteredData, setFilteredData] = useState([]);
  const [caseId, setCaseId] = useState();

  const filter = useSelector((state) => selectFilter(state));
  const { data, error, isLoading, isFetching } = useGetCasesQuery();
  const [createNewCase, newCase] = useCreateNewCaseMutation();

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

  const handleCaseCreation = async () => {
    setOpenRightSidebar(false);
    const { data } = await createNewCase();
    setCaseId(data?.newCaseId);
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
                {newCase.isLoading ? (
                  <StyledFetchingBox>
                    <CircularProgress color="secondary" size={20} />
                  </StyledFetchingBox>
                ) : (
                  <CardAdd handleClick={handleCaseCreation} />
                )}
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
        <Creation handleCancel={handleCloseRightSidebar} caseId={caseId} />
      </Sidebar>
    </>
  );
};

export default Dashboard;
