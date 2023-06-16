import { Box, IconButton, Typography, useTheme } from "@mui/material";
import AttachFileOutlinedIcon from "@mui/icons-material/AttachFileOutlined";
import { GoogleDriveIcon } from "@/assets/GoogleDriveIcon";
import { DropboxIcon } from "@/assets/DropboxIcon";

const FileSidebarHeader = () => {
  const theme = useTheme();
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      width="100%"
    >
      <Box>
        <Typography
          variant="body2"
          fontSize={12}
          color={theme.palette.blue.main}
        >
          + ADD FILES
        </Typography>
      </Box>
      <Box>
        <IconButton
          size="small"
          aria-label="add file from local"
          aria-controls="add-file-from-local-icon-button"
          aria-haspopup="true"
        >
          <AttachFileOutlinedIcon color="icon" fontSize="small" />
        </IconButton>
        <IconButton
          size="small"
          aria-label="add file from google drive"
          aria-controls="add-file-from-google-drive-icon-button"
          aria-haspopup="true"
        >
          <GoogleDriveIcon />
        </IconButton>
        <IconButton
          size="small"
          aria-label="add file from dropbox"
          aria-controls="add-file-from-dropbox-icon-button"
          aria-haspopup="true"
        >
          <DropboxIcon />
        </IconButton>
      </Box>
    </Box>
  );
};
export { FileSidebarHeader };
