import { useParams } from "next/navigation";
import { Box } from "@mui/material";
import { ChatHeader } from "./ChatHeader";
import styled from "@emotion/styled";
import { ChatInput } from "./ChatInput";
import { ChatDetails } from "./ChatDetails";
import { ChatConversation } from "./ChatConversation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useAddNoteMutation } from "@/redux/services/casesApi";
import {
  useGetChatHistoryMutation,
  useGetLastChatUpdateMutation,
  useSendMessageMutation,
} from "@/redux/services/engageApi";
import { v4 as uuidv4 } from "uuid";
import { useDispatch, useSelector } from "react-redux";
import { refetch, selectMember, selectRefetch } from "@/redux/features/uiSlice";
import { ACTOR } from "@/constants";

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
  const dispatch = useDispatch();

  const [ids, setIds] = useState();
  const [messages, setMessages] = useState([]);
  const [lastMessage, setLastMessage] = useState();
  const [lastChatUpdate, setLastChatUpdate] = useState();
  const [intervalId, setIntervalId] = useState();
  const [isAILoading, setIsAILoading] = useState(false);
  const [tryAgain, setTryAgain] = useState(false);
  const member = useSelector((state) => selectMember(state));

  const [addNote] = useAddNoteMutation();

  const [getChatHistory, { isLoading }] = useGetChatHistoryMutation();
  const [sendMessage] = useSendMessageMutation();
  const [getLastChatUpdate] = useGetLastChatUpdateMutation();

  useEffect(() => {
    if (Object.keys(member).length) {
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
      getChatHistoryResponse();
    }
  }, [ids]);

  const getChatHistoryResponse = async () => {
    const chatHistoryResponse = await handleGetChatHistory();
    setMessages(chatHistoryResponse?.chat?.messages);
    setTimeout(() => {
      scrollDown();
    }, [100]);
  };

  const scrollDown = () => {
    chatRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  };

  const handleGetChatHistory = async () => {
    const { data } = await getChatHistory({
      ids: {
        ...ids,
      },
      pageSize: 1000,
    });
    return data;
  };

  const handleGetLastChatUpdate = async () => {
    const { data } = await getLastChatUpdate({
      ids: {
        ...ids,
      },
    });
    if (data) {
      return data.lastChatUpdate;
    }
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
      setTryAgain(false);
      setTimeout(() => {
        scrollDown();
      }, 100);

      const { data, error } = await sendMessage({
        ids: {
          ...ids,
        },
        message: {
          showToUser: true,
          actor: ACTOR.USER,
          msgId: `msg-${uuidv4()}`,
          dt_create: new Date().toISOString(),
          content: value,
        },
      });
      if (data) {
        const lastChatUpdateResponse = await handleGetLastChatUpdate();
        setLastChatUpdate(lastChatUpdateResponse);
        scrollDown();
      } else if (error) {
        setIsAILoading(false);
        setTryAgain(true);
      }
    } else if (type === "Note") {
      addNote(payload);
    }
  };

  useEffect(() => {
    if (lastChatUpdate && !intervalId) {
      startVerifyLastChatUpdate();
    } else if (!lastChatUpdate && intervalId) {
      stopVerifyLastChatUpdate();
    }
  }, [lastChatUpdate]);

  const handleLastChatUpdate = async () => {
    const lastChatUpdateResponse = await handleGetLastChatUpdate();
    if (
      lastChatUpdateResponse &&
      Date.parse(lastChatUpdate) !== Date.parse(lastChatUpdateResponse)
    ) {
      const chatHistory = await handleGetChatHistory();
      if (chatHistory?.chat?.messages[0].actor === ACTOR.AI) {
        setMessages(chatHistory?.chat?.messages);
        setLastMessage();
        setLastChatUpdate();
        setIsAILoading(false);
        setTimeout(() => {
          scrollDown();
        }, [100]);
        dispatch(refetch(true));
      }
    }
  };

  const startVerifyLastChatUpdate = () => {
    if (!intervalId) {
      const intervalLastChatUpdate = setInterval(handleLastChatUpdate, 3000);
      setIntervalId(intervalLastChatUpdate);
    }
  };

  const stopVerifyLastChatUpdate = () => {
    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId();
    }
  };

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
            messages={messages}
            isLoading={isLoading}
            lastMessage={lastMessage}
            isAILoading={isAILoading}
            tryAgain={tryAgain}
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
