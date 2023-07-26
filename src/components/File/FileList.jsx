import { Box } from "@mui/material";
import { File } from "./File";

const FileList = ({ files = [], viewOnly = false }) => {
  return (
    <Box px={2}>
      {files.map((file) => {
        return (
          <Box mb={2} key={file.fileId}>
            <File file={file} viewOnly={viewOnly} />
          </Box>
        );
      })}
    </Box>
  );
};

export { FileList };
