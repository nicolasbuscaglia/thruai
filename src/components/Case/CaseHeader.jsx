import { useRouter, useParams } from "next/navigation";
import { Box, Button, Typography, styled, useTheme } from "@mui/material";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";

const StyledBox = styled(Box)(({ theme }) => ({
  padding: "1rem",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  backgroundColor: theme.palette.primary.main,
  borderRadius: "1rem",
}));

const CaseHeader = ({ caseDetails }) => {
  const router = useRouter();
  const params = useParams();
  const theme = useTheme();

  const handleOpenCase = () => {
    router.push(`/chats/${params.id}`);
  };

  return (
    <StyledBox>
      <Box>
        <Typography variant="h6" color="secondary">
          {`Case #${caseDetails.id}`}
        </Typography>
        <Typography
          variant="body2"
          fontSize={12}
          fontWeight={300}
          color={theme.palette.gray.light}
        >
          {`Last Updated on ${caseDetails.lastUpdated}`}
        </Typography>
      </Box>
      <Box display="flex" alignItems="center" gap={2}>
        <Button
          color="blue"
          variant="contained"
          sx={{ borderRadius: "0.6rem", color: theme.palette.secondary.main }}
          onClick={handleOpenCase}
        >
          Open Chat
        </Button>
        <MoreHorizOutlinedIcon color="icon" />
      </Box>
    </StyledBox>
  );
};

export { CaseHeader };
