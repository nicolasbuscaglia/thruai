import { Box, Divider, IconButton, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { File } from "./File";
import { FileCategories } from "./FileCategories";
import { useTheme } from "@emotion/react";
import AttachFileOutlinedIcon from "@mui/icons-material/AttachFileOutlined";
import { GoogleDriveIcon } from "@/assets/GoogleDriveIcon";
import { DropboxIcon } from "@/assets/DropboxIcon";
import { ButtonManageCase } from "../ButtonMgmtCase";

const FileList = ({ data = [] }) => {
  const theme = useTheme();

  return (
    <>
      <Box p={2}>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          mb={1}
        >
          <Box>
            <Typography
              variant="body2"
              fontSize={12}
              color={theme.palette.blue.main}
            >
              + ADD FILES
            </Typography>
          </Box>
          <Box>
            <IconButton
              size="small"
              aria-label="add file from local"
              aria-controls="add-file-from-local-icon-button"
              aria-haspopup="true"
            >
              <AttachFileOutlinedIcon color="icon" fontSize="small" />
            </IconButton>
            <IconButton
              size="small"
              aria-label="add file from google drive"
              aria-controls="add-file-from-google-drive-icon-button"
              aria-haspopup="true"
            >
              <GoogleDriveIcon />
            </IconButton>
            <IconButton
              size="small"
              aria-label="add file from dropbox"
              aria-controls="add-file-from-dropbox-icon-button"
              aria-haspopup="true"
            >
              <DropboxIcon />
            </IconButton>
          </Box>
        </Box>

        <Box mb={2}>
          <Typography variant="body1" color="secondary">
            Training Files - Cleaned
          </Typography>
        </Box>
        <Box mb={4}>
          {data.map((file) => {
            return (
              <Box mb={2} key={file.id}>
                <File file={file} />
              </Box>
            );
          })}
        </Box>
      </Box>
      <Divider sx={{ backgroundColor: theme.palette.border.main }} />
      <FileCategories />
    </>
  );
};

export { FileList };
