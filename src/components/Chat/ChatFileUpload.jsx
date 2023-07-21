import { useEffect, useState } from "react";
import { Box, Button, IconButton, styled } from "@mui/material";
import AttachFileOutlinedIcon from "@mui/icons-material/AttachFileOutlined";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import { FileUpload } from "../File/FileUpload";
import {
  useAddAWSFileMutation,
  useGetUserQuery,
} from "@/redux/services/casesApi";
import { useFiles } from "@/context/FilesContext";
import { useSelector } from "react-redux";
import { selectMember } from "@/redux/features/uiSlice";
import { v4 as uuidv4 } from "uuid";
import { useParams } from "next/navigation";

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
  const [showFileUpload, setShowFileUpload] = useState(false);
  const { files, setFiles } = useFiles();
  const { caseId } = params;
  const member = useSelector((state) => selectMember(state));
  const { data: user } = useGetUserQuery(member.sub);

  const [addAWSFile, response] = useAddAWSFileMutation();

  const onSubmit = () => {
    const ids = {
      clientId: user.clientId,
      caseId: caseId,
      userId: user.cognitoId,
    };
    const formData = new FormData();
    formData.append("file", files[0].rawFile, files[0].rawFile.name);
    formData.append("metadata", JSON.stringify({ ...ids, ...files[0] }));
    addAWSFile(formData);
    setFiles([]);
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
