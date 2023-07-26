import { useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  styled,
} from "@mui/material";
import AttachFileOutlinedIcon from "@mui/icons-material/AttachFileOutlined";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import { FileUpload } from "../File/FileUpload";
import { useFiles } from "@/context/FilesContext";
import { useParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import {
  selectIsDisabledForm,
  setIsDisabledForm,
} from "@/redux/features/uiSlice";

const StyledUploadButtonBox = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  position: "sticky",
  bottom: "4rem",
  backgroundColor: theme.palette.primary.main,
  padding: "1rem",
  borderTop: "1px solid",
  borderColor: theme.palette.lightGray.dark,
}));

const ChatFileUpload = () => {
  const params = useParams();
  const { caseId } = params;
  const [showFileUpload, setShowFileUpload] = useState(false);
  const { files, processFiles } = useFiles();
  const dispatch = useDispatch();
  const disabled = useSelector((state) => selectIsDisabledForm(state));

  const onSubmit = async () => {
    dispatch(setIsDisabledForm(true));
    try {
      await processFiles({ caseId });
      dispatch(setIsDisabledForm(false));
      console.log("Files uploaded successfully");
    } catch (err) {
      console.log("Error uploading files", err);
    }
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
        </Box>
      </Box>
      {showFileUpload && <FileUpload />}
      {disabled && (
        <Box display="flex" justifyContent="center" my={1}>
          <CircularProgress color="secondary" size={20} />
        </Box>
      )}
      {files.length > 0 && (
        <StyledUploadButtonBox>
          <Button
            variant="outlined"
            color="blue"
            onClick={onSubmit}
            endIcon={<FileUploadOutlinedIcon />}
            disabled={disabled}
          >
            Upload
          </Button>
        </StyledUploadButtonBox>
      )}
    </>
  );
};

export { ChatFileUpload };
