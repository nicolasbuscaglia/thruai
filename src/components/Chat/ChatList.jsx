import {
  Box,
  CircularProgress,
  Typography,
  styled,
  useTheme,
} from "@mui/material";
import { ChatCard } from "./ChatCard";
import { useEffect, useState } from "react";

const CHAT_LIST = [
  {
    id: 1,
    user: "John Doe",
    title: "Summarize Case",
    type: "DNA Visit - Dev",
    time: "12:48PM",
    description:
      "What was the last genetic test that was completed by this patient?",
    attachments: true,
  },
  {
    id: 2,
    user: "Bill Doe",
    title: "Genetic test summary",
    type: "DNA Visit - Clinical",
    time: "10:53PM",
    description:
      "Hey Cak, Could you free now? Can you look and read the brief first...",
    attachments: true,
  },
  {
    id: 3,
    user: "Tim Doe",
    title: "Patient Visit Summary",
    type: "DNA Visit - Dev",
    time: "03:49PM",
    description:
      "Hey Cak, Could you free now? Can you look and read the brief first...",
    attachments: true,
  },
  {
    id: 1,
    user: "John Doe",
    title: "Summarize Case",
    type: "DNA Visit - Dev",
    time: "12:48PM",
    description:
      "What was the last genetic test that was completed by this patient?",
    attachments: true,
  },
  {
    id: 2,
    user: "Bill Doe",
    title: "Genetic test summary",
    type: "DNA Visit - Clinical",
    time: "10:53PM",
    description:
      "Hey Cak, Could you free now? Can you look and read the brief first...",
    attachments: true,
  },
  {
    id: 3,
    user: "Tim Doe",
    title: "Patient Visit Summary",
    type: "DNA Visit - Dev",
    time: "03:49PM",
    description:
      "Hey Cak, Could you free now? Can you look and read the brief first...",
    attachments: true,
  },
];

const StyledMainBox = styled(Box)(() => ({
  height: "calc(100vh - 64px - 41px)",
  overflow: "scroll",
}));

const ChatList = () => {
  const theme = useTheme();
  const [chatList, setChatList] = useState([]);
  const [selected, setSelected] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const handleSelected = (chat) => {
    setSelected(chat);
  };

  useEffect(() => {
    setChatList(CHAT_LIST);
    setSelected(CHAT_LIST[0]);
    setIsLoading(false);
  }, []);

  return (
    <StyledMainBox p={2}>
      <Box mb={2}>
        <Typography
          variant="body2"
          fontWeight={300}
          color={theme.palette.gray.light}
        >
          Case Chats
        </Typography>
      </Box>
      <Box>
        {isLoading ? (
          <CircularProgress color="secondary" size={20} />
        ) : (
          chatList.map((chat) => {
            return (
              <Box mb={1} key={chat.id}>
                <ChatCard
                  item={chat}
                  selected={selected}
                  handleSelected={handleSelected}
                />
              </Box>
            );
          })
        )}
      </Box>
    </StyledMainBox>
  );
};

export { ChatList };
