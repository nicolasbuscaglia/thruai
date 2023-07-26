import {
  Box,
  Button,
  CircularProgress,
  Divider,
  Typography,
  useTheme,
} from "@mui/material";
import { FormInputText } from "./Forms/FormInputText";
import { ModelSelection } from "./ModelSelection";
import { DataSecurityPolicies } from "./DataSecurityPolicies";
import { useDispatch, useSelector } from "react-redux";
import { Controller, useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { FormErrorMessage } from "./Forms/FormErrorMessage";
import { FileUpload } from "./File/FileUpload";
import { useCreateCaseMutation } from "@/redux/services/casesApi";
import {
  selectIsDisabledForm,
  selectMember,
  setIsDisabledForm,
} from "@/redux/features/uiSlice";
import { useFiles } from "@/context/FilesContext";

const Creation = ({ handleCancel, caseId }) => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const disabled = useSelector((state) => selectIsDisabledForm(state));
  const [createCase] = useCreateCaseMutation();
  const { processFiles } = useFiles();
  const member = useSelector((state) => selectMember(state));
  const {
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm();

  const onSubmit = handleSubmit(async (data) => {
    dispatch(setIsDisabledForm(true));
    try {
      // review fields and defaults
      const payload = {
        caseId: caseId,
        name: data.caseName,
        type: "Healthcare",
        filesCount: 0,
        daysLeft: 14,
        uploadStatus: 100,
        team: [member?.username],
        attachments: false,
      };
      const caseResponse = await createCase(payload);
      if (caseResponse.error) {
        throw new Error(caseResponse.error.data?.message);
      }
      await processFiles({ caseId });
      console.log("Case succesfully created");
    } catch (err) {
      console.log("Error creating case", err);
    }
    reset({ caseName: "" });
    handleCancel();
    dispatch(setIsDisabledForm(false));
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
            disabled={disabled}
          >
            Cancel
          </Button>
          <Button
            color="blue"
            variant="contained"
            sx={{
              borderRadius: "0.6rem",
              color: theme.palette.secondary.main,
              minWidth: "8rem",
            }}
            type="submit"
            disabled={disabled}
          >
            {disabled ? (
              <CircularProgress color="secondary" size={20} />
            ) : (
              "Create Case"
            )}
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export { Creation };
