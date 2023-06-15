import { Box, Typography, styled } from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import CheckBoxOutlinedIcon from "@mui/icons-material/CheckBoxOutlined";

const StyledContainer = styled(Box)(({ theme }) => ({
  padding: "1rem",
  backgroundColor: theme.palette.secondary.main,
  borderRadius: "0.8rem",
  maxWidth: "20rem",
}));

const ChatSummaryCard = ({ summary }) => {
  const { title, description, items } = summary;
  return (
    <StyledContainer>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        mb={2}
      >
        <Typography variant="subtitle2">{title}</Typography>
        <MoreHorizIcon color="icon" />
      </Box>
      <Box mb={2}>
        <Typography variant="body2" fontWeight={300}>
          {description}
        </Typography>
      </Box>
      {items.map((item) => {
        return (
          <Box key={item.id} display="flex" alignItems="center" gap={2} mb={1}>
            <CheckBoxOutlinedIcon color="icon" />
            <Typography variant="body2">{item.label}</Typography>
          </Box>
        );
      })}
    </StyledContainer>
  );
};

export { ChatSummaryCard };
