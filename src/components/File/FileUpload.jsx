import { Box, Typography } from "@mui/material";
import { FileDropZone } from "./FileDropZone";
import { FileList } from "./FileList";
import { useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { useFiles } from "@/context/FilesContext";

const FileUpload = () => {
  const { files, setFiles } = useFiles();

  const handleAddFiles = (data) => {
    // Featured for single file uploading
    // For multiple file uploadind add "multiple" param to <FileUploader />
    // remove the fileList object and the [0] on files.
    const fileList = { 0: data };
    const filesArray = Object.keys(fileList).map((index) => {
      return {
        fileId: uuidv4(),
        rawFile: fileList[index],
        skipReview: false,
        skipClean: false,
        cleaningStatus: 100,
      };
    });
    setFiles(filesArray);
  };

  useEffect(() => {
    return () => setFiles([]);
  }, []);

  return (
    <>
      <Box p={2}>
        <FileDropZone handleAddFiles={handleAddFiles} />
      </Box>
      {files && files.length > 0 && (
        <>
          <Box p={2} pt={0}>
            <Typography variant="body2" color="secondary">
              Files to upload
            </Typography>
          </Box>
          <FileList files={files} />
        </>
      )}
    </>
  );
};

export { FileUpload };
