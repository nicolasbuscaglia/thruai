import { Box, Typography, styled, useTheme } from "@mui/material";
import AttachFileOutlinedIcon from "@mui/icons-material/AttachFileOutlined";
import { formatBytes } from "@/utils/bytes";

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

const File = ({ file }) => {
  const { name, type, size, file: fileURL } = file;
  const theme = useTheme();
  return (
    <a href={fileURL} download>
      <StyledMainContainer>
        <StyledIconContainer>
          <AttachFileOutlinedIcon color="secondary" sx={{ fontSize: 16 }} />
        </StyledIconContainer>

        <Box overflow="hidden">
          <Typography
            variant="body2"
            color="secondary"
            fontSize={12}
            sx={{ textOverflow: "ellipsis", overflow: "hidden" }}
          >
            {name}
          </Typography>

          <Box display="flex" alignItems="center" gap={2}>
            <Typography
              variant="body2"
              color={theme.palette.gray.light}
              fontSize={12}
            >
              {formatBytes(Number(size))}
            </Typography>
            <Typography
              variant="body2"
              color={theme.palette.gray.light}
              fontSize={12}
            >
              {type}
            </Typography>
          </Box>
        </Box>
      </StyledMainContainer>
    </a>
  );
};

export { File };
