import { Box, Button, Typography } from "@mui/material";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import { GoogleDriveIcon } from "@/assets/GoogleDriveIcon";
import { DropboxIcon } from "@/assets/DropboxIcon";

const UPLOAD_FROM = [
  {
    id: "documents",
    label: "Upload Documents",
    icon: <AttachFileIcon color="icon" />,
    children: <input type="file" hidden />,
  },
  {
    id: "googleDrive",
    label: "Upload From G Drive",
    icon: <GoogleDriveIcon />,
    children: null,
  },
  {
    id: "dropbox",
    label: "Upload From Dropbox",
    icon: <DropboxIcon />,
    children: null,
  },
];

const FormFileUpload = () => {
  return (
    <Box>
      <Typography variant="subtitle2" color="secondary">
        FILE UPLOAD
      </Typography>
      <Box display="flex" flexDirection="column" alignItems="flex-start">
        {UPLOAD_FROM.map((from) => {
          return (
            <Box mt={2} mb={1} key={from.id}>
              <Button
                component="label"
                variant="outlined"
                startIcon={from.icon}
              >
                <Typography
                  variant="body2"
                  color="secondary"
                  sx={{ fontWeight: 300 }}
                >
                  {from.label}
                </Typography>
                {from.children}
              </Button>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};

export { FormFileUpload };
