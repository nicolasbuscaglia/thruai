import { Box, Button, Divider, Typography, useTheme } from "@mui/material";
import { FormInputText } from "./Forms/FormInputText";
import { ModelSelection } from "./ModelSelection";
import { DataSecurityPolicies } from "./DataSecurityPolicies";
import { useSelector } from "react-redux";
import { Controller, useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { FormErrorMessage } from "./Forms/FormErrorMessage";
import { FileUpload } from "./File/FileUpload";
import {
  useAddAWSFileMutation,
  useCreateCaseMutation,
} from "@/redux/services/casesApi";
import { useFiles } from "@/context/FilesContext";
import { selectMember } from "@/redux/features/uiSlice";

const Creation = ({ handleCancel, caseId }) => {
  const theme = useTheme();
  const {
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm();

  const { files, setFiles } = useFiles();
  const member = useSelector((state) => selectMember(state));

  const [createCase] = useCreateCaseMutation();
  const [addAWSFile] = useAddAWSFileMutation();

  const onSubmit = handleSubmit(async (data) => {
    try {
      // review fields and defaults
      const payload = {
        caseId: caseId,
        name: data.caseName,
        type: "Test - Dev",
        filesCount: 0,
        daysLeft: 14,
        uploadStatus: 10,
        team: ["Test"],
        attachments: false,
      };
      const caseResponse = await createCase(payload);
      if (caseResponse.error) {
        throw new Error(caseResponse.error.data?.message);
      }
      const ids = {
        clientId: member.clientId,
        caseId: caseId,
        userId: member.cognitoId,
      };
      const formData = new FormData();
      formData.append("file", files[0].rawFile, files[0].rawFile.name);
      formData.append("metadata", JSON.stringify({ ...ids, ...files[0] }));
      const fileResponse = await addAWSFile(formData);
      if (fileResponse.error) {
        throw new Error(fileResponse.error.data?.message);
      }
      console.log("Case succesfully created");
    } catch (error) {
      console.log("Error creating case", error);
    }
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
        <FileUpload />
        <Divider sx={{ backgroundColor: theme.palette.border.main }} />
        <Box p={2} pb={0}>
          <Typography
            variant="body2"
            color="secondary"
            fontSize={12}
            sx={{ overflow: "hidden", textOverflow: "ellipsis" }}
          >
            Case ID #{caseId}
          </Typography>
        </Box>
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
