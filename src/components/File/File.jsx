import { Box, Typography, alpha, styled, useTheme } from "@mui/material";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import SmartDisplayOutlinedIcon from "@mui/icons-material/SmartDisplayOutlined";
import VolumeUpOutlinedIcon from "@mui/icons-material/VolumeUpOutlined";

const fileIcon = (type) => {
  switch (type) {
    case ".doc":
      return <DescriptionOutlinedIcon color="secondary" size="large" />;
    case ".mov":
      return <SmartDisplayOutlinedIcon color="secondary" size="large" />;
    case ".opus":
      return <VolumeUpOutlinedIcon color="secondary" size="large" />;
    default:
      "";
  }
};

const fileBgIconColor = (type) => {
  switch (type) {
    case ".doc":
      return "#50B5FF";
    case ".mov":
      return "#FFC542";
    case ".opus":
      return "#82C43C";
    default:
      "";
  }
};

const StyledMainContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: 1,
  borderRadius: "1rem",
  backgroundColor: theme.palette.lightGray.dark,
}));

const StyledIconContainer = styled(Box, {
  shouldForwardProp: (prop) => prop !== "type",
})(({ type }) => ({
  display: "flex",
  alignItems: "center",
  width: "fit-content",
  backgroundColor: fileBgIconColor(type),
  padding: "1rem",
  borderRadius: "1rem",
}));

const File = ({ file }) => {
  const { name, type, size } = file;
  const theme = useTheme();
  return (
    <StyledMainContainer>
      <StyledIconContainer type={type}>{fileIcon(type)}</StyledIconContainer>
      <Box p={1} sx={{ overflow: "hidden" }}>
        <Typography
          variant="body1"
          color="secondary"
          sx={{ overflow: "hidden", textOverflow: "ellipsis" }}
        >
          {name}
        </Typography>
        <Typography variant="body2" color={theme.palette.gray.light}>
          {size}
        </Typography>
      </Box>
    </StyledMainContainer>
  );
};

export { File };
