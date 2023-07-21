import { useParams } from "next/navigation";
import { Box } from "@mui/material";
import { ChatHeader } from "./ChatHeader";
import styled from "@emotion/styled";
import { ChatInput } from "./ChatInput";
import { ChatDetails } from "./ChatDetails";
import { ChatConversation } from "./ChatConversation";
import { useEffect, useRef, useState } from "react";
import { useAddNoteMutation } from "@/redux/services/casesApi";
import {
  useGetChatHistoryMutation,
  useGetLastChatUpdateMutation,
  useSendMessageMutation,
} from "@/redux/services/engageApi";
import { v4 as uuidv4 } from "uuid";
import { useSelector } from "react-redux";
import { selectMember } from "@/redux/features/uiSlice";

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
  minHeight: "100%",
}));

const Chat = () => {
  const params = useParams();
  const { caseId, chatId } = params;
  const chatRef = useRef();

  const [ids, setIds] = useState();
  const [lastMessage, setLastMessage] = useState();
  const [lastChatUpdate, setLastChatUpdate] = useState();
  const [intervalId, setIntervalId] = useState();
  const [isAILoading, setIsAILoading] = useState(false);
  const member = useSelector((state) => selectMember(state));

  const [addNote] = useAddNoteMutation();

  const [getChatHistory, { data, isLoading }] = useGetChatHistoryMutation();
  const [sendMessage] = useSendMessageMutation();
  const [getLastChatUpdate] = useGetLastChatUpdateMutation();

  useEffect(() => {
    if (member) {
      setIds({
        clientId: member.clientId,
        caseId: caseId,
        chatId: chatId,
        userId: member.cognitoId,
      });
    }
  }, [member]);

  useEffect(() => {
    if (ids) {
      handleGetChatHistory();
    }
  }, [ids]);

  const scrollDown = () => {
    chatRef.current.scrollIntoView({
      behavior: "smooth",
    });
  };

  const handleGetChatHistory = async () => {
    await getChatHistory({
      ids: {
        ...ids,
      },
      pageSize: 1000,
    });
    setLastMessage();
    setIsAILoading(false);
    scrollDown();
  };

  const handleGetLastChatUpdate = async () => {
    const { data } = await getLastChatUpdate({
      ids: {
        ...ids,
      },
    });
    return data?.lastChatUpdate;
  };

  const onSubmit = async (value, type) => {
    const payload = {
      caseId: caseId,
      chatId: chatId,
      content: value,
    };
    if (type === "Chat") {
      setLastMessage(value);
      setIsAILoading(true);
      setTimeout(() => {
        scrollDown();
      }, 100);

      await sendMessage({
        ids: {
          ...ids,
        },
        message: {
          showToUser: true,
          actor: "USER",
          msgId: `msg-${uuidv4()}`,
          dt_create: new Date().toISOString(),
          content: value,
        },
      });
      const chatUpdate = await handleGetLastChatUpdate();
      setLastChatUpdate(chatUpdate);
      scrollDown();
    } else if (type === "Note") {
      addNote(payload);
    }
  };

  const handleLastChatUpdate = async () => {
    const chatUpdate = await handleGetLastChatUpdate();
    if (chatUpdate && Date.parse(lastChatUpdate) !== Date.parse(chatUpdate)) {
      setLastChatUpdate();
      setTimeout(() => {
        handleGetChatHistory();
      }, [1000]);
    }
  };

  useEffect(() => {
    if (lastChatUpdate && !intervalId) {
      const intervalLastChatUpdate = setInterval(handleLastChatUpdate, 3000);
      setIntervalId(intervalLastChatUpdate);
    } else if (intervalId) {
      clearInterval(intervalId);
      setIntervalId();
    }
    return () => clearInterval(intervalId);
  }, [lastChatUpdate]);

  return (
    <StyledContainer>
      <StyledStickyBox sticky="top">
        <ChatHeader />
      </StyledStickyBox>
      <Box p={2} sx={{ flexGrow: 1, wordBreak: "break-word" }}>
        <>
          <Box mb={2}>
            <ChatDetails />
          </Box>
          <ChatConversation
            chat={data?.chat}
            isLoading={isLoading}
            lastMessage={lastMessage}
            isAILoading={isAILoading}
          />
        </>
      </Box>
      <Box ref={chatRef} />
      <StyledStickyBox sticky="bottom">
        <ChatInput onSubmit={onSubmit} disabled={!!lastMessage} />
      </StyledStickyBox>
    </StyledContainer>
  );
};

export { Chat };
