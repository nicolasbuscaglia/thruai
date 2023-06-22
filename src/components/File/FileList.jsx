import { Box, IconButton, styled } from "@mui/material";
import { File } from "./File";

const FileList = ({ files = [], remove = false, cleanCheckbox = false }) => {
  return (
    <Box px={2}>
      {files.map((file) => {
        return (
          <Box mb={2} key={file.id}>
            <File file={file} remove={remove} cleanCheckbox={cleanCheckbox} />
          </Box>
        );
      })}
    </Box>
  );
};

export { FileList };
