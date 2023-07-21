import { Box } from "@mui/material";
import { File } from "./File";

const FileList = ({
  files = [],
  remove = false,
  skipReviewCheckbox = false,
  skipCleanCheckbox = false,
}) => {
  return (
    <Box px={2}>
      {files.map((file) => {
        return (
          <Box mb={2} key={file.fileId}>
            <File
              file={file}
              remove={remove}
              skipReviewCheckbox={skipReviewCheckbox}
              skipCleanCheckbox={skipCleanCheckbox}
            />
          </Box>
        );
      })}
    </Box>
  );
};

export { FileList };
