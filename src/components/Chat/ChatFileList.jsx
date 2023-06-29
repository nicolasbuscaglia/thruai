import { useSelector } from "react-redux";
import { FileList } from "../File/FileList";
import { useParams } from "next/navigation";
import { ChatFileUpload } from "./ChatFileUpload";
import { FileCategories } from "../File/FileCategories";
import {
  Box,
  CircularProgress,
  Divider,
  Typography,
  useTheme,
} from "@mui/material";
import { useGetCleanedFilesByCaseIdQuery } from "@/redux/services/casesApi";

const ChatFileList = () => {
  const params = useParams();
  const { caseId } = params;
  const theme = useTheme();

  const { data, error, isLoading, isFetching } =
    useGetCleanedFilesByCaseIdQuery(caseId);

  return (
    <>
      <ChatFileUpload />
      <Box p={2}>
        <Typography variant="body1" color="secondary">
          Training Files - Cleaned
        </Typography>
      </Box>
      {isLoading ? (
        <Box p={2} display="flex" alignItems="center" justifyContent="center">
          <CircularProgress color="secondary" size={20} />
        </Box>
      ) : (
        <>
          <FileList files={data} />
          <Divider sx={{ backgroundColor: theme.palette.border.main }} />
          <FileCategories />
        </>
      )}
    </>
  );
};

export { ChatFileList };
