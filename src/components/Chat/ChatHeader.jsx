import { Box, IconButton, Typography, styled, useTheme } from "@mui/material";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import ReplyIcon from "@mui/icons-material/Reply";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

const StyledBoxIconBorder = styled(Box)(({ theme }) => ({
  display: "flex",
  border: "1px solid",
  borderColor: theme.palette.border.main,
  borderRadius: "100%",
}));

const ChatHeader = () => {
  const theme = useTheme();
  return (
    <Box
      px={2}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: theme.palette.primary.main,
        height: 42,
      }}
    >
      <Box>
        <Typography
          fontSize={14}
          fontWeight={300}
          color={theme.palette.gray.light}
        >
          Today, 8:26 AM
        </Typography>
      </Box>
      <Box>
        <IconButton aria-label="delete">
          <SaveOutlinedIcon color="icon" fontSize="small" />
        </IconButton>
        <IconButton aria-label="delete">
          <ReplyIcon color="icon" fontSize="small" />
        </IconButton>
        <IconButton aria-label="delete">
          <DeleteOutlineIcon color="icon" fontSize="small" />
        </IconButton>
        <IconButton aria-label="delete">
          <StyledBoxIconBorder>
            <MoreHorizIcon color="icon" fontSize="small" />
          </StyledBoxIconBorder>
        </IconButton>
      </Box>
    </Box>
  );
};

export { ChatHeader };
