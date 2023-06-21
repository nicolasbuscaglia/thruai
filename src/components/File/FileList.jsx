import { Box } from "@mui/material";
import { File } from "./File";

const FileList = ({ files = [] }) => {
  return (
    <Box px={2}>
      {files.map((file) => {
        return (
          <Box mb={2} key={file.id}>
            <File file={file} />
          </Box>
        );
      })}
    </Box>
  );
};

export { FileList };
