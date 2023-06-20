import { useState } from "react";
import { Box, Button, Divider, Typography, useTheme } from "@mui/material";
import { FormFileUpload } from "./Forms/FormFileUpload";
import { FormInputText } from "./Forms/FormInputText";
import { ModelSelection } from "./ModelSelection";
import { DataSecurityPolicies } from "./DataSecurityPolicies";
import { useDispatch } from "react-redux";
import { addCase } from "@/redux/features/cases/caseSlice";
import { addNewCaseMessages } from "@/redux/features/chats/chatsSlice";
import { addNewCaseNotes } from "@/redux/features/chats/notesSlice";
import { v4 as uuidv4 } from "uuid";

const Creation = ({ handleCancel }) => {
  const theme = useTheme();
  const [newCase, setNewCase] = useState({});

  const dispatch = useDispatch();

  const handleCaseNameChange = (data) => {
    setNewCase({ ...newCase, name: data });
  };

  const handleCreate = () => {
    const payload = {
      caseId: uuidv4(),
      name: newCase.name,
      type: "Test - Dev",
      filesCount: 1,
      daysLeft: 14,
      uploadStatus: 10,
      team: ["Test"],
      attachments: true,
      summary: [],
      messages: [],
      notes: [],
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
    handleCancel();
  };

  return (
    <Box>
      <Box p={2}>
        <Typography variant="body1" color="secondary">
          Case Creation
        </Typography>
      </Box>
      <Divider sx={{ backgroundColor: theme.palette.border.main }} />
      <Box p={2}>
        <FormFileUpload />
      </Box>
      <Divider sx={{ backgroundColor: theme.palette.border.main }} />
      <Box p={2}>
        <FormInputText label="CASE NAME" onChange={handleCaseNameChange} />
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
          onClick={handleCreate}
        >
          Create Case
        </Button>
      </Box>
    </Box>
  );
};

export { Creation };
