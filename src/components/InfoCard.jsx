import { Box, Button, Divider, Typography, styled } from "@mui/material";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";

const StyledBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  borderRadius: "1rem",
}));

const StyledCenteredBox = styled(Box)(() => ({
  padding: "1rem",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
}));

const StyledDivider = styled(Divider)(({ theme }) => ({
  backgroundColor: theme.palette.border.main,
}));

const StyledButton = styled(Button)(({ theme }) => ({
  color: theme.palette.secondary.main,
  backgroundColor: theme.palette.lightGray.dark,
  borderRadius: "0 0 1rem 1rem",
}));

const InfoCard = ({ title, children }) => {
  return (
    <StyledBox>
      <StyledCenteredBox>
        <Typography variant="subtitle1" color="secondary">
          {title}
        </Typography>
        <MoreHorizOutlinedIcon color="icon" />
      </StyledCenteredBox>
      <StyledDivider />
      <Box p={2}>{children}</Box>
      <StyledButton variant="contained" fullWidth>
        SEE ALL
      </StyledButton>
    </StyledBox>
  );
};

export { InfoCard };
