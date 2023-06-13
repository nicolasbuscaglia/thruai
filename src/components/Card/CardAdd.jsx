import { Box, Typography, useTheme } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import Link from "next/link";

const CardAdd = ({ handleAddCard }) => {
  const theme = useTheme();
  return (
    <Box
      onClick={handleAddCard}
      sx={{
        minHeight: "12rem",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        border: "1px dashed",
        borderColor: theme.palette.gray.light,
        borderRadius: "1rem",
        gap: 1,
        cursor: "pointer",
      }}
    >
      <AddCircleIcon fontSize="medium" color="lightGray" />
      <Typography color="secondary">Add Case</Typography>
    </Box>
  );
};

export { CardAdd };
