import { Box, Typography, styled, useTheme } from "@mui/material";
import AttachFileOutlinedIcon from "@mui/icons-material/AttachFileOutlined";

const StyledMainContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: 1,
  borderRadius: "1rem",
  backgroundColor: theme.palette.lightGray.dark,
  padding: "1rem",
}));

const StyledIconContainer = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  width: "fit-content",
  borderRadius: "1rem",
  marginRight: "1rem",
}));

const StyledTypographyBox = styled(Box)(() => ({
  display: "-webkit-box",
  WebkitLineClamp: 1,
  WebkitBoxOrient: "vertical",
  overflow: "hidden",
  textOverflow: "ellipsis",
}));

const File = ({ file }) => {
  const { fileName, type, size } = file;
  const theme = useTheme();
  return (
    <StyledMainContainer>
      <StyledIconContainer>
        <AttachFileOutlinedIcon color="secondary" sx={{ fontSize: 16 }} />
      </StyledIconContainer>

      <StyledTypographyBox>
        <Typography
          variant="body2"
          color="secondary"
          fontSize={12}
          sx={{ textOverflow: "ellipsis", overflow: "hidden" }}
        >
          {fileName}asdasdsdas
        </Typography>

        <Box display="flex" alignItems="center" gap={2}>
          <Typography
            variant="body2"
            color={theme.palette.gray.light}
            fontSize={12}
          >
            {size}
          </Typography>
          <Typography
            variant="body2"
            color={theme.palette.gray.light}
            fontSize={12}
          >
            {type}
          </Typography>
        </Box>
      </StyledTypographyBox>
    </StyledMainContainer>
  );
};

export { File };
