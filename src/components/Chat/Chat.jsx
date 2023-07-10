import { useParams } from "next/navigation";
import { Box } from "@mui/material";
import { ChatHeader } from "./ChatHeader";
import styled from "@emotion/styled";
import { ChatInput } from "./ChatInput";
import { ChatDetails } from "./ChatDetails";
import { ChatConversation } from "./ChatConversation";
import { useRef } from "react";
import {
  useAddMessageMutation,
  useAddNoteMutation,
  useGetChatByChatIdQuery,
} from "@/redux/services/casesApi";

const StyledStickyBox = styled(Box, {
  shouldForwardProp: (prop) => prop !== "sticky",
})(({ theme, sticky }) => ({
  position: "sticky",
  top: sticky === "top" ? 0 : "inherit",
  bottom: sticky === "bottom" ? 0 : "inherit",
  backgroundColor: theme.palette.primary.main,
  zIndex: 1,
  border: "1px solid",
  borderColor: theme.palette.lightGray.dark,
}));

const StyledContainer = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  height: "100%",
}));

const Chat = () => {
  const params = useParams();
  const { caseId, chatId } = params;
  const chatRef = useRef();

  const { data, error, isLoading, isFetching } = useGetChatByChatIdQuery({
    chatId,
  });

  const [addMessage] = useAddMessageMutation();
  const [addNote] = useAddNoteMutation();

  const onSubmit = (value, type) => {
    const payload = {
      caseId: caseId,
      chatId: chatId,
      content: value,
    };
    if (type === "Chat") {
      addMessage(payload);
      chatRef.current.scrollIntoView({
        behavior: "smooth",
      });
    } else if (type === "Note") {
      addNote(payload);
    }
  };

  return (
    <StyledContainer>
      <StyledStickyBox sticky="top">
        <ChatHeader />
      </StyledStickyBox>
      <Box p={2} sx={{ flexGrow: 1, wordBreak: "break-word" }}>
        <Box mb={2}>
          <ChatDetails />
        </Box>
        <ChatConversation chat={data} />
      </Box>
      <Box ref={chatRef} mb={6} />
      <StyledStickyBox sticky="bottom">
        <ChatInput onSubmit={onSubmit} />
      </StyledStickyBox>
    </StyledContainer>
  );
};

export { Chat };
