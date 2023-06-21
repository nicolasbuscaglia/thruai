import { useState } from "react";
import { Box, Button, Divider, Typography, useTheme } from "@mui/material";
import { FormInputText } from "./Forms/FormInputText";
import { ModelSelection } from "./ModelSelection";
import { DataSecurityPolicies } from "./DataSecurityPolicies";
import { useDispatch } from "react-redux";
import { addCase } from "@/redux/features/cases/caseSlice";
import { addNewCaseMessages } from "@/redux/features/chats/chatsSlice";
import { addNewCaseNotes } from "@/redux/features/chats/notesSlice";
import { v4 as uuidv4 } from "uuid";
import { addFiles } from "@/redux/features/cases/filesSlice";
import { FileDropZone } from "./File/FileDropZone";
import { FileUploaded } from "./File/FileUploaded";
import { Controller, useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { FormErrorMessage } from "./Forms/FormErrorMessage";

const Creation = ({ handleCancel }) => {
  const theme = useTheme();
  const {
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm();
  const [files, setFiles] = useState([]);

  const dispatch = useDispatch();

  const handleAddFiles = (data) => {
    const filesArray = Object.keys(data).map((index) => {
      return {
        id: uuidv4(),
        name: data[index].name,
        type: data[index].type,
        size: data[index].size,
        uploadedOn: new Date(),
        cleaningStatus: 100,
        file: URL.createObjectURL(data[index]),
      };
    });
    setFiles(filesArray);
  };

  const onSubmit = handleSubmit((data) => {
    const payload = {
      caseId: uuidv4(),
      name: data.caseName,
      type: "Test - Dev",
      filesCount: 1,
      daysLeft: 14,
      uploadStatus: 10,
      team: ["Test"],
      attachments: true,
      summary: [],
      messages: [],
      notes: [],
      files: files,
    };
    dispatch(
      addCase({
        caseId: payload.caseId,
        name: payload.name,
        type: payload.type,
        filesCount: payload.filesCount,
        daysLeft: payload.daysLeft,
        uploadStatus: payload.uploadStatus,
        team: payload.team,
      })
    );
    dispatch(
      addNewCaseMessages({
        caseId: payload.caseId,
        name: payload.name,
        type: payload.type,
        attachments: payload.attachments,
        summary: payload.summary,
        messages: payload.messages,
      })
    );
    dispatch(addNewCaseNotes({ caseId: payload.caseId, notes: payload.notes }));
    dispatch(addFiles({ caseId: payload.caseId, files: payload.files }));
    reset({ caseName: "" });
    setFiles([]);
    handleCancel();
  });

  return (
    <Box sx={{ width: "100%" }}>
      <form onSubmit={onSubmit}>
        <Box p={2}>
          <Typography variant="body1" color="secondary">
            Case Creation
          </Typography>
        </Box>
        <Divider sx={{ backgroundColor: theme.palette.border.main }} />
        <Box p={2}>
          {/* <FormFileUpload /> */}
          <Box mb={2}>
            <FileDropZone handleAddFiles={handleAddFiles} />
          </Box>
          <FileUploaded files={files} />
        </Box>
        <Divider sx={{ backgroundColor: theme.palette.border.main }} />
        <Box p={2}>
          <Controller
            name="caseName"
            control={control}
            rules={{ required: "Case Name is required." }}
            render={({ field }) => (
              <FormInputText label="CASE NAME" {...field} />
            )}
          />
          <ErrorMessage
            errors={errors}
            name="caseName"
            render={({ message }) => <FormErrorMessage message={message} />}
          />
        </Box>
        <Divider sx={{ backgroundColor: theme.palette.border.main }} />
        <Box p={2}>
          <ModelSelection />
        </Box>
        <Divider sx={{ backgroundColor: theme.palette.border.main }} />
        <Box p={2}>
          <DataSecurityPolicies />
        </Box>

        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          p={2}
        >
          <Button
            color="blue"
            variant="text"
            sx={{ borderRadius: "0.6rem", color: theme.palette.blue.main }}
            onClick={handleCancel}
          >
            Cancel
          </Button>
          <Button
            color="blue"
            variant="contained"
            sx={{ borderRadius: "0.6rem", color: theme.palette.secondary.main }}
            type="submit"
          >
            Create Case
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export { Creation };
