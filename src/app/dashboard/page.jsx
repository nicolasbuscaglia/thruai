"use client";
import { CardContainer, Card } from "@/components/Card";
import {
  Box,
  CircularProgress,
  Grid,
  Typography,
  styled,
  useTheme,
} from "@mui/material";
import { useEffect, useState } from "react";
import { CardAdd } from "@/components/Card/CardAdd";
import { Sidebar } from "@/components/Sidebar/Sidebar";
import { Creation } from "@/components/Creation";
import {
  useCreateNewCaseMutation,
  useGetCasesQuery,
} from "@/redux/services/casesApi";
import { useSelector } from "react-redux";
import { selectFilter, selectMember } from "@/redux/features/uiSlice";

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

const StyledHeightContainer = styled(Box)(() => ({
  height: "calc(100vh - 64px)",
  overflow: "scroll",
  width: "100%",
}));

const Dashboard = () => {
  const theme = useTheme();
  const [openRightSidebar, setOpenRightSidebar] = useState(false);
  const [filteredData, setFilteredData] = useState([]);
  const [caseId, setCaseId] = useState();

  const member = useSelector((state) => selectMember(state));
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
    <StyledHeightContainer>
      <Box p={2} width="100%">
        {isLoading ? (
          <CircularProgress color="secondary" size={20} />
        ) : (
          <>
            <Box mb={2} display="flex" alignItems="center">
              <Typography color="secondary" variant="h6">
                Hi {member?.username}
              </Typography>
              <Typography
                sx={{ color: theme.palette.gray.dark }}
                variant="body2"
                mt={0.5}
              >
                , here are your current cases:
              </Typography>
            </Box>
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
          </>
        )}
      </Box>
      <Sidebar
        drawerWidth={300}
        direction="right"
        header={false}
        hidden={true}
        openSidebar={openRightSidebar}
      >
        {openRightSidebar && (
          <Creation handleCancel={handleCloseRightSidebar} caseId={caseId} />
        )}
      </Sidebar>
    </StyledHeightContainer>
  );
};

export default Dashboard;
