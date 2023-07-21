import { useRouter, useParams } from "next/navigation";
import { Avatar, Box, Grid, Typography, styled, useTheme } from "@mui/material";
import AttachFileOutlinedIcon from "@mui/icons-material/AttachFileOutlined";
import { useEffect, useRef, useState } from "react";
import { getDatePart, getTimePart } from "@/utils/date";
import {
  useChatHandlerMutation,
  useGetChatHistoryMutation,
} from "@/redux/services/engageApi";
import { selectMember } from "@/redux/features/uiSlice";
import { useGetUserQuery } from "@/redux/services/casesApi";
import { useSelector } from "react-redux";

const StyledCenteredBox = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: 10,
}));

const StyledMainBox = styled(Box, {
  shouldForwardProp: (prop) => prop !== "paramsChatId" && prop !== "chatId",
})(({ theme, paramsChatId, chatId }) => ({
  cursor: "pointer",
  padding: "1rem",
  borderRadius: "1rem",
  backgroundColor:
    paramsChatId === chatId
      ? theme.palette.blue.main
      : theme.palette.lightGray.dark,
}));

const StyledTypographyBox = styled(Box)(() => ({
  display: "-webkit-box",
  WebkitLineClamp: 2,
  WebkitBoxOrient: "vertical",
  overflow: "hidden",
  textOverflow: "ellipsis",
  textWrap: "wrap",
}));

const ChatCard = ({ thisCase = {}, chat = {} }) => {
  const router = useRouter();
  const params = useParams();
  const { caseId, chatId: paramsChatId } = params;
  const ref = useRef();
  const theme = useTheme();

  const { name, type, attachments } = thisCase;
  const { chatId } = chat;

  const member = useSelector((state) => selectMember(state));
  const [ids, setIds] = useState();
  const [lastMessage, setLastMessage] = useState();
  const [getChatHistory, { data: chatHistory }] = useGetChatHistoryMutation();

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

  const handleGetChatHistory = () => {
    getChatHistory({
      ids: {
        ...ids,
      },
      pageSize: 1,
    });
  };

  useEffect(() => {
    setLastMessage(chatHistory?.chat?.messages[0]);
  }, [chatHistory]);

  const handleClick = () => {
    router.push(`/chats/${caseId}/${chatId}`);
  };

  useEffect(() => {
    if (paramsChatId === chatId) {
      ref.current.scrollIntoView(false);
    }
  }, [paramsChatId]);

  return (
    <StyledMainBox
      onClick={handleClick}
      paramsChatId={paramsChatId}
      chatId={chatId}
      ref={ref}
    >
      <Grid container spacing={1}>
        <Grid item xs={2}>
          <StyledCenteredBox>
            <Avatar alt={lastMessage?.actor} src="/test" />
            {attachments && (
              <Box>
                <AttachFileOutlinedIcon fontSize="small" color="secondary" />
              </Box>
            )}
          </StyledCenteredBox>
        </Grid>
        <Grid item xs={10}>
          <Grid container>
            <Grid item xs>
              <Typography
                color={
                  paramsChatId === chatId
                    ? "secondary"
                    : theme.palette.blue.main
                }
                variant="body2"
                fontSize={12}
              >
                {type}
              </Typography>
            </Grid>
            <Grid item>
              {lastMessage && (
                <Typography color="secondary" variant="body2" fontSize={12}>
                  {`${getDatePart(lastMessage?.dt_create)} ${getTimePart(
                    lastMessage?.dt_create
                  )}`}
                </Typography>
              )}
            </Grid>
          </Grid>
          <Typography
            color="secondary"
            variant="body2"
            fontWeight={500}
            gutterBottom
          >
            {name}
          </Typography>
          <StyledTypographyBox>
            <Typography color="secondary" variant="body2" fontSize={12}>
              {lastMessage?.content}
            </Typography>
          </StyledTypographyBox>
        </Grid>
      </Grid>
    </StyledMainBox>
  );
};

export { ChatCard };
