import { Box, Divider, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { File } from "./File";
import { FileCategories } from "./FileCategories";
import { useTheme } from "@emotion/react";

const FILES = [
  {
    id: 1,
    name: "Project Overview",
    type: ".doc",
    size: "146.5 Kb",
  },
  {
    id: 2,
    name: "What's Bons...",
    type: ".mov",
    size: "50.3 Mb",
  },
  {
    id: 3,
    name: "Testimonial",
    type: ".opus",
    size: "32.6 Mb",
  },
];

const FileList = () => {
  const theme = useTheme();
  const [files, setFiles] = useState([]);

  useEffect(() => {
    setFiles(FILES);
  }, []);

  return (
    <Box p={2}>
      <Box mb={2}>
        <Typography variant="body1" color="secondary">
          Training Files - Cleaned
        </Typography>
      </Box>
      <Box mb={4}>
        {files.map((file) => {
          return (
            <Box mb={2} key={file.id}>
              <File file={file} />
            </Box>
          );
        })}
      </Box>
      <Divider sx={{ backgroundColor: theme.palette.border.main }} />
      <Box>
        <FileCategories />
      </Box>
    </Box>
  );
};

export { FileList };
