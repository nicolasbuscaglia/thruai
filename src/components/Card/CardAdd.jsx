import { Box, Typography, useTheme } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import styled from "@emotion/styled";

const StyledMainBox = styled(Box)(({ theme }) => ({
  minHeight: "12rem",
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  border: "1px dashed",
  borderColor: theme.palette.gray.light,
  borderRadius: "1rem",
  gap: 5,
  cursor: "pointer",
}));

const CardAdd = ({ handleAddCard }) => {
  const theme = useTheme();
  return (
    <StyledMainBox onClick={handleAddCard}>
      <AddCircleIcon fontSize="medium" color="lightGray" />
      <Typography color="secondary">Add Case</Typography>
    </StyledMainBox>
  );
};

export { CardAdd };
