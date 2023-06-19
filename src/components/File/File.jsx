import { Box, Typography, styled, useTheme } from "@mui/material";
import AttachFileOutlinedIcon from "@mui/icons-material/AttachFileOutlined";

const StyledMainContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: 1,
  borderRadius: "1rem",
  backgroundColor: theme.palette.lightGray.dark,
}));

const StyledIconContainer = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  width: "fit-content",
  padding: "1rem",
  borderRadius: "1rem",
}));

const File = ({ file }) => {
  const { name, type, size } = file;
  const theme = useTheme();
  return (
    <StyledMainContainer>
      <StyledIconContainer>
        <AttachFileOutlinedIcon color="secondary" sx={{ fontSize: 20 }} />
      </StyledIconContainer>
      <Box p={1} sx={{ overflow: "hidden" }}>
        <Typography
          variant="body1"
          color="secondary"
          sx={{ overflow: "hidden", textOverflow: "ellipsis" }}
        >
          {name}
        </Typography>
        <Box display="flex" alignItems="center" gap={2}>
          <Typography variant="body2" color={theme.palette.gray.light}>
            {size}
          </Typography>
          <Typography variant="body2" color={theme.palette.gray.light}>
            {type}
          </Typography>
        </Box>
      </Box>
    </StyledMainContainer>
  );
};

export { File };
