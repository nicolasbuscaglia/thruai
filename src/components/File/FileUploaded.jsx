import { Box } from "@mui/material";
import { File } from "./File";

const FileUploaded = ({ files }) => {
  return (
    files &&
    Object.keys(files).map((index) => {
      return (
        <Box mb={2} key={index}>
          <File file={files[index]} />
        </Box>
      );
    })
  );
};

export { FileUploaded };
