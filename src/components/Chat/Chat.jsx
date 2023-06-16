import { Box } from "@mui/material";
import { ChatHeader } from "./ChatHeader";
import styled from "@emotion/styled";
import { ChatInput } from "./ChatInput";
import { ChatDetails } from "./ChatDetails";
import { ChatConversation } from "./ChatConversation";
import { useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";

const CHAT_CONVERSATION = {
  summary: [
    {
      id: 1,
      title: "Summary",
      description:
        "“Pushing pixels and experiences in digital products for Sebostudio”",
      items: [
        {
          id: 1,
          label: "Nominal",
        },
        {
          id: 2,
          label: "Blood Pressure",
        },
        {
          id: 3,
          label: "Joined June 2012",
        },
        {
          id: 4,
          label: "Genetic Test completed",
        },
        {
          id: 5,
          label: "Some Other Medical",
        },
      ],
    },
    {
      id: 2,
      title: "Recommended Actions",
      description:
        "Based on your teams previous chats we recommend the following actions",
      items: [
        {
          id: 1,
          label: "Ask Patient A",
        },
        {
          id: 2,
          label: "Follow up with patient",
        },
        {
          id: 3,
          label: "Joined June 2012",
        },
        {
          id: 4,
          label: "Genetic Test Completed",
        },
        {
          id: 5,
          label: "Some Other Medical",
        },
      ],
    },
  ],
  messages: [
    {
      id: 1,
      content: "This is a test message",
    },
  ],
};

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
}));

const Chat = () => {
  const [chat, setChat] = useState();
  const chatRef = useRef();

  useEffect(() => {
    setChat(CHAT_CONVERSATION);
  }, []);

  const onSubmit = (value) => {
    const payload = {
      id: uuidv4(),
      content: value,
    };
    const messages = [...chat.messages, payload];
    setChat({ ...chat, messages });
    chatRef.current.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <StyledContainer>
      <StyledStickyBox sticky="top">
        <ChatHeader />
      </StyledStickyBox>
      <Box p={2} sx={{ flexGrow: 1 }}>
        <Box mb={2}>
          <ChatDetails />
        </Box>
        <ChatConversation conversation={chat} />
      </Box>
      <Box ref={chatRef} mb={6} />
      <StyledStickyBox sticky="bottom">
        <ChatInput onSubmit={onSubmit} />
      </StyledStickyBox>
    </StyledContainer>
  );
};

export { Chat };
