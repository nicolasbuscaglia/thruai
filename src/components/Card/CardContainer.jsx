"use client";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";

const CardContainer = ({ title, children }) => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        border: "1px solid",
        borderColor: theme.palette.border.main,
        borderRadius: "1rem",
      }}
      width="100%"
      px={2}
      pb={2}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
        px={1}
      >
        <Typography variant="body1" color={theme.palette.gray.light}>
          {title}
        </Typography>
        <IconButton
          size="large"
          aria-label="show more"
          aria-controls="main-continer-show-more"
          aria-haspopup="true"
          color="inherit"
        >
          <MoreHorizOutlinedIcon color="icon" />
        </IconButton>
      </Box>
      {children}
    </Box>
  );
};

export { CardContainer };
