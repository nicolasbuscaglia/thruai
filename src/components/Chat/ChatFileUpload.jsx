import { useState } from "react";
import { Box, Button, IconButton, styled } from "@mui/material";
import AttachFileOutlinedIcon from "@mui/icons-material/AttachFileOutlined";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import { useDispatch, useSelector } from "react-redux";
import { addMoreFiles } from "@/redux/features/cases/filesSlice";
import { useParams } from "next/navigation";
import { updateFilesCount } from "@/redux/features/cases/caseSlice";
import { FileUpload } from "../File/FileUpload";
import { manageUploadFiles, selectNewFiles } from "@/redux/features/uiSlice";

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
  const dispatch = useDispatch();

  const files = useSelector((state) => selectNewFiles(state));

  const [showFileUpload, setShowFileUpload] = useState(false);

  const onSubmit = () => {
    dispatch(addMoreFiles({ caseId: caseId, files: files }));
    dispatch(
      updateFilesCount({
        caseId: caseId,
        attachments: files.length > 0,
        filesCount: files.length,
      })
    );
    dispatch(manageUploadFiles({ files: [] }));
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
      {files.length > 0 && (
        <StyledUploadButtonBox>
          <Button
            variant="outlined"
            color="blue"
            onClick={onSubmit}
            endIcon={<FileUploadOutlinedIcon />}
          >
            Upload
          </Button>
        </StyledUploadButtonBox>
      )}
    </>
  );
};

export { ChatFileUpload };
