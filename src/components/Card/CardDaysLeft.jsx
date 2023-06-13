"use client";
import { Box, Chip, styled, alpha } from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

const StyledChip = styled(Chip, {
  shouldForwardProp: (prop) => prop !== "daysLeft",
})(({ daysLeft, theme }) => ({
  height: "1.4rem",
  fontSize: "0.7rem",
  borderRadius: "0.3rem",
  color:
    daysLeft <= 1
      ? theme.palette.error.main
      : daysLeft <= 10
      ? theme.palette.warning.main
      : theme.palette.gray.dark,
  backgroundColor:
    daysLeft <= 1
      ? alpha(theme.palette.error.main, 0.1)
      : daysLeft <= 10
      ? alpha(theme.palette.warning.main, 0.1)
      : theme.palette.border.main,
}));

const CardDaysLeft = ({ daysLeft }) => {
  return (
    <Box>
      <StyledChip
        daysLeft={daysLeft}
        icon={<AccessTimeIcon sx={{ fontSize: "1rem" }} />}
        label={`${daysLeft} days left`}
      />
    </Box>
  );
};

export { CardDaysLeft };
