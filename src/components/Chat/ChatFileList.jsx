import { useSelector } from "react-redux";
import { FileList } from "../File/FileList";
import { selectFilteredCleanedFilesById } from "@/redux/features/cases/filesSlice";
import { useParams } from "next/navigation";
import { ChatFileUpload } from "./ChatFileUpload";
import { FileCategories } from "../File/FileCategories";
import { Box, Divider, Typography, useTheme } from "@mui/material";

const ChatFileList = () => {
  const params = useParams();
  const { id } = params;
  const theme = useTheme();
  const files = useSelector((state) =>
    selectFilteredCleanedFilesById(state, id)
  );
  return (
    <>
      <ChatFileUpload />
      <Box p={2}>
        <Typography variant="body1" color="secondary">
          Training Files - Cleaned
        </Typography>
      </Box>
      <FileList files={files} />
      <Divider sx={{ backgroundColor: theme.palette.border.main }} />
      <FileCategories />
    </>
  );
};

export { ChatFileList };
