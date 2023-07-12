import { Box, Typography } from "@mui/material";
import { FileDropZone } from "./FileDropZone";
import { FileList } from "./FileList";
import { useDispatch, useSelector } from "react-redux";
import { manageUploadFiles, selectNewFiles } from "@/redux/features/uiSlice";
import { useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

const FileUpload = () => {
  const dispatch = useDispatch();

  const files = useSelector((state) => selectNewFiles(state));

  const handleAddFiles = (data) => {
    const filesArray = Object.keys(data).map((index) => {
      return {
        fileId: uuidv4(),
        name: data[index].name,
        type: data[index].type,
        size: data[index].size,
        clean: false,
        cleaningStatus: 100,
        file: URL.createObjectURL(data[index]),
      };
    });
    dispatch(manageUploadFiles({ files: filesArray }));
  };

  useEffect(() => {
    return () => dispatch(manageUploadFiles({ files: [] }));
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
          <FileList files={files} remove cleanCheckbox />
        </>
      )}
    </>
  );
};

export { FileUpload };
