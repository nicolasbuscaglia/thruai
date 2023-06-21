import { useState } from "react";
import { Box, Button, IconButton, Typography } from "@mui/material";
import { v4 as uuidv4 } from "uuid";
import AttachFileOutlinedIcon from "@mui/icons-material/AttachFileOutlined";
import { GoogleDriveIcon } from "@/assets/GoogleDriveIcon";
import { DropboxIcon } from "@/assets/DropboxIcon";
import { FileDropZone } from "../File/FileDropZone";
import { useDispatch } from "react-redux";
import { addMoreFiles } from "@/redux/features/cases/filesSlice";
import { useParams } from "next/navigation";
import { FileList } from "../File/FileList";

const ChatFileUpload = () => {
  const params = useParams();
  const { id } = params;
  const dispatch = useDispatch();
  const [showFileUpload, setShowFileUpload] = useState(false);
  const [files, setFiles] = useState([]);

  const handleAddFiles = (data) => {
    const filesArray = Object.keys(data).map((index) => {
      return {
        id: uuidv4(),
        name: data[index].name,
        type: data[index].type,
        size: data[index].size,
        uploadedOn: new Date(),
        cleaningStatus: 100,
        file: URL.createObjectURL(data[index]),
      };
    });
    setFiles(filesArray);
    dispatch(addMoreFiles({ caseId: id, files: filesArray }));
  };

  return (
    <>
      <Box
        p={2}
        pb={0}
        display="flex"
        alignItems="center"
        justifyContent="space-between"
      >
        <Box onClick={() => setShowFileUpload(true)}>
          <Button variant="text" color="blue" sx={{ fontSize: 12, padding: 0 }}>
            + ADD FILES
          </Button>
        </Box>
        <Box>
          <IconButton
            size="small"
            aria-label="add file from local"
            aria-controls="add-file-from-local-icon-button"
            aria-haspopup="true"
            onClick={() => setShowFileUpload(true)}
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
      {showFileUpload && (
        <Box p={2}>
          <FileDropZone handleAddFiles={handleAddFiles} />
        </Box>
      )}
      {files.length > 0 && (
        <>
          <Box m={2}>
            <Typography variant="body2" color="secondary">
              New files uploaded
            </Typography>
          </Box>
          <FileList files={files} />
        </>
      )}
    </>
  );
};

export { ChatFileUpload };
