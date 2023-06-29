import { Box, Button, Divider, Typography, useTheme } from "@mui/material";
import { FormInputText } from "./Forms/FormInputText";
import { ModelSelection } from "./ModelSelection";
import { DataSecurityPolicies } from "./DataSecurityPolicies";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { Controller, useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { FormErrorMessage } from "./Forms/FormErrorMessage";
import { FileUpload } from "./File/FileUpload";
import { manageUploadFiles, selectNewFiles } from "@/redux/features/uiSlice";
import { useCreateCaseMutation } from "@/redux/services/casesApi";

const Creation = ({ handleCancel }) => {
  const theme = useTheme();
  const {
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();

  const files = useSelector((state) => selectNewFiles(state));

  const [createCase] = useCreateCaseMutation();

  const onSubmit = handleSubmit((data) => {
    const payload = {
      caseId: uuidv4(),
      name: data.caseName,
      type: "Test - Dev",
      filesCount: files.length,
      daysLeft: 14,
      uploadStatus: 10,
      team: ["Test"],
      chats: [
        {
          chatId: uuidv4(),
          createdOn: Date.now(),
          lastUpdated: Date.now(),
          summary: [],
          messages: [],
        },
      ],
      notes: [],
      attachments: files.length > 0,
      files: files,
    };
    createCase(payload);
    reset({ caseName: "" });
    dispatch(manageUploadFiles({ files: [] }));
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
        <FileUpload />
        <Divider sx={{ backgroundColor: theme.palette.border.main }} />
        <Box p={2}>
          <Controller
            name="caseName"
            control={control}
            rules={{ required: "Case Name is required." }}
            render={({ field, ref }) => (
              <FormInputText label="CASE NAME" {...field} ref={ref} />
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
