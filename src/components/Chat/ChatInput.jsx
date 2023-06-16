import { Box, IconButton, Typography, styled, useTheme } from "@mui/material";
import { FormInputText } from "../Forms/FormInputText";
import AttachFileOutlinedIcon from "@mui/icons-material/AttachFileOutlined";
import SendIcon from "@mui/icons-material/Send";
import { FormSelect } from "../Forms/FormSelect";
import { useState } from "react";

const StyledMainBox = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  backgroundColor: theme.palette.lightGray.dark,
  borderRadius: "1rem",
}));

const ChatInput = ({ onSubmit }) => {
  const theme = useTheme();
  const [value, setValue] = useState("");

  const handleSubmit = () => {
    onSubmit(value);
    setValue("");
  };

  const handleChange = (text) => {
    setValue(text);
  };

  return (
    <Box p={2}>
      <StyledMainBox>
        <Box>
          <FormSelect
            background="dark"
            items={[{ label: "Chat" }, { label: "Note" }]}
          />
        </Box>
        <Box sx={{ flexGrow: 1 }}>
          <FormInputText
            variant="outlined"
            placeholder="Start Case chat with Model · OpenAi ChatGPT v3.5"
            value={value}
            onChange={handleChange}
            onKeyDown={handleSubmit}
          />
        </Box>
        <Box display="flex" gap={1} p={1}>
          <IconButton>
            <AttachFileOutlinedIcon color="gray" fontSize="small" />
          </IconButton>
          <IconButton onClick={handleSubmit}>
            <SendIcon color="gray" fontSize="small" />
          </IconButton>
        </Box>
      </StyledMainBox>
      <Box display="flex" justifyContent="center" mt={1}>
        <Typography
          variant="body2"
          fontSize={10}
          color={theme.palette.gray.main}
          textAlign="center"
          maxWidth={350}
        >
          Please note that Personal Health Information should not be shared
          within this chat. Please use Notes to share context with the AI
        </Typography>
      </Box>
    </Box>
  );
};

export { ChatInput };