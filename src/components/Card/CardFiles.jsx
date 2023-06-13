"use client";
import { Box, Typography, useTheme } from "@mui/material";
import AttachFileOutlinedIcon from "@mui/icons-material/AttachFileOutlined";

const CardFiles = ({ filesCount }) => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
      }}
    >
      <AttachFileOutlinedIcon sx={{ fontSize: "0.9rem" }} color="icon" />
      <Typography
        variant="body2"
        color={theme.palette.gray.light}
        fontSize={12}
      >
        {filesCount}
      </Typography>
    </Box>
  );
};

export { CardFiles };
