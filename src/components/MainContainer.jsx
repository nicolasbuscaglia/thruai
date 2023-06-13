"use client";
import { Box } from "@mui/material";

const MainContainer = ({ children }) => {
  return (
    <Box width="100%" height="100%" position="relative" sx={{ flex: 1 }}>
      {children}
    </Box>
  );
};

export { MainContainer };
