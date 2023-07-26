import {
  Box,
  Checkbox,
  CircularProgress,
  FormControlLabel,
  IconButton,
  Typography,
  styled,
  useTheme,
} from "@mui/material";
import AttachFileOutlinedIcon from "@mui/icons-material/AttachFileOutlined";
import { formatBytes } from "@/utils/bytes";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { useFiles } from "@/context/FilesContext";
import { useSelector } from "react-redux";
import { selectIsDisabledForm, selectMember } from "@/redux/features/uiSlice";
import { useStatusAWSFileMutation } from "@/redux/services/casesApi";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

const StyledMainContainer = styled(Box)(({ theme }) => ({
  borderRadius: "1rem",
  backgroundColor: theme.palette.lightGray.dark,
}));

const StyledCenteredBox = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  gap: 8,
}));

const StyledIconContainer = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  width: "fit-content",
  borderRadius: "1rem",
}));

const StyledIconButton = styled(IconButton)(() => ({
  position: "absolute",
  top: -8,
  right: -8,
}));

const File = ({ file, viewOnly = false }) => {
  const params = useParams();
  const { caseId } = params;
  const theme = useTheme();
  const disabled = useSelector((state) => selectIsDisabledForm(state));
  const { files, setFiles } = useFiles();
  const { fileId, rawFile, skipReview, skipClean } = file;
  const { name, type, size } = rawFile || file;
  const member = useSelector((state) => selectMember(state));
  const [ids, setIds] = useState();

  const [statusAWSFile, { data: fileStatus, isLoading }] =
    useStatusAWSFileMutation();

  useEffect(() => {
    if (Object.keys(member).length) {
      setIds({
        clientId: member.clientId,
        caseId: caseId,
        userId: member.userId,
        fileId: fileId,
      });
    }
  }, [member]);

  useEffect(() => {
    if (ids && viewOnly) statusAWSFile(ids);
  }, [ids]);

  useEffect(() => {
    if (fileStatus?.t_total === "NULL") {
      setTimeout(() => {
        statusAWSFile(ids);
      }, [20000]);
    }
  }, [fileStatus]);

  const handleRemove = () => {
    const newFiles = files.filter((file) => file.fileId !== fileId);
    setFiles(newFiles);
  };

  const handleClean = (e) => {
    const newFiles = files.map((file) =>
      file.fileId === fileId ? { ...file, skipClean: e.target.checked } : file
    );
    setFiles(newFiles);
  };

  // const handleReview = (e) => {
  //   const newFiles = files.map((file) =>
  //     file.fileId === fileId ? { ...file, skipReview: e.target.checked } : file
  //   );
  //   setFiles(newFiles);
  // };

  return (
    <Box sx={{ position: "relative" }}>
      <StyledMainContainer>
        <Box
          p={1}
          display="flex"
          justifyContent="flex-start"
          alignItems="center"
          gap={1}
        >
          <StyledIconContainer>
            <AttachFileOutlinedIcon color="secondary" sx={{ fontSize: 16 }} />
          </StyledIconContainer>

          <Box overflow="hidden" p={0.5}>
            <Typography
              variant="body2"
              color="secondary"
              fontSize={12}
              sx={{ textOverflow: "ellipsis", overflow: "hidden" }}
              gutterBottom
            >
              {name}
            </Typography>

            <StyledCenteredBox>
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
            </StyledCenteredBox>
            <Box>
              {/* <FormControlLabel
            control={
              <Checkbox
                name={fileId}
                checked={skipReview}
                disabled={viewOnly || disabled}
                onChange={handleReview}
                inputProps={{ "aria-label": "controlled" }}
                color="blue"
                size="small"
                sx={{
                  color: theme.palette.gray.light,
                  paddingTop: 0,
                  paddingBottom: 0,
                }}
              />
            }
            label={
              <Typography
                fontSize={12}
                color={theme.palette.gray.light}
                fontWeight={300}
              >
                Skip Review
              </Typography>
            }
          /> */}
              <FormControlLabel
                control={
                  <Checkbox
                    name={fileId}
                    checked={skipClean}
                    disabled={viewOnly || disabled}
                    onChange={handleClean}
                    inputProps={{ "aria-label": "controlled" }}
                    color="blue"
                    size="small"
                    sx={{
                      color: theme.palette.gray.light,
                      paddingTop: 0,
                      paddingBottom: 0,
                    }}
                  />
                }
                label={
                  <Typography
                    fontSize={12}
                    color={theme.palette.gray.light}
                    fontWeight={300}
                  >
                    Skip Clean
                  </Typography>
                }
              />
            </Box>
          </Box>
        </Box>
        {viewOnly && (
          <Box
            p={1}
            sx={{
              borderTop: "1px solid",
              borderColor: theme.palette.gray.main,
            }}
          >
            <Typography color={theme.palette.gray.light} fontSize={12}>
              Status:{" "}
              {fileStatus ? (
                fileStatus?.last_step_complete
              ) : (
                <CircularProgress
                  color="gray"
                  size={12}
                  sx={{ marginLeft: "0.5rem" }}
                />
              )}
            </Typography>
          </Box>
        )}
      </StyledMainContainer>
      {!viewOnly && !disabled && (
        <StyledIconButton
          aria-label="remove file"
          color="icon"
          onClick={handleRemove}
        >
          <HighlightOffIcon />
        </StyledIconButton>
      )}
    </Box>
  );
};

export { File };
