import { Box, Typography, useTheme } from "@mui/material";
import { FileUploader } from "react-drag-drop-files";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import { File } from "./File";

const fileTypes = ["PDF", "DOCX", "XML"];

const FileDropZone = ({ handleAddFiles }) => {
  const theme = useTheme();

  const handleChange = (file) => {
    handleAddFiles(file);
  };

  return (
    <FileUploader
      handleChange={handleChange}
      name="file"
      types={fileTypes}
      multiple
    >
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        p={2}
        sx={{
          borderRadius: "1rem",
          border: "1px solid",
          borderColor: theme.palette.border.main,
          cursor: "pointer",
        }}
      >
        <FileUploadOutlinedIcon color="border" fontSize="large" />
        <Typography variant="body2" color="secondary" fontSize={12}>
          Drag and drop files
        </Typography>
        <Typography variant="body2" color="secondary" fontSize={12}>
          or click here to select
        </Typography>
      </Box>
    </FileUploader>
  );
};

export { FileDropZone };
