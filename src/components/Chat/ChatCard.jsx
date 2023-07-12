import { useRouter, useParams } from "next/navigation";
import { Avatar, Box, Grid, Typography, styled, useTheme } from "@mui/material";
import AttachFileOutlinedIcon from "@mui/icons-material/AttachFileOutlined";
import { useEffect, useRef, useState } from "react";
import { getDatePart, getTimePart } from "@/utils/date";

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
  const { chatId, messages } = chat;

  const [lastMessage, setLastMessage] = useState();

  useEffect(() => {
    const sortedMessages = [...messages];
    sortedMessages.sort(
      (a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt)
    );
    setLastMessage(sortedMessages[0]);
  }, [messages]);

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
        <Grid item>
          <StyledCenteredBox>
            <Avatar alt={lastMessage?.user.name} src="/test" />
            {attachments && (
              <Box>
                <AttachFileOutlinedIcon fontSize="small" color="secondary" />
              </Box>
            )}
          </StyledCenteredBox>
        </Grid>
        <Grid item xs>
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
                  {`${getDatePart(lastMessage?.createdAt)} ${getTimePart(
                    lastMessage?.createdAt
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
