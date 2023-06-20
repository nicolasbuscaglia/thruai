import { useRouter, useParams } from "next/navigation";
import { Avatar, Box, Grid, Typography, styled, useTheme } from "@mui/material";
import AttachFileOutlinedIcon from "@mui/icons-material/AttachFileOutlined";
import { useEffect, useRef, useState } from "react";
import { getDatePart, getTimePart } from "@/utils/date";

const StyledCenteredBox = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
}));

const StyledMainBox = styled(Box, {
  shouldForwardProp: (prop) => prop !== "id" && prop !== "itemId",
})(({ theme, id, itemId }) => ({
  cursor: "pointer",
  padding: "1rem",
  borderRadius: "1rem",
  backgroundColor:
    id === itemId ? theme.palette.blue.main : theme.palette.lightGray.dark,
}));

const StyledTypographyBox = styled(Box)(() => ({
  display: "-webkit-box",
  WebkitLineClamp: 2,
  WebkitBoxOrient: "vertical",
  overflow: "hidden",
  textOverflow: "ellipsis",
  textWrap: "wrap",
}));

const ChatCard = ({ chat = {} }) => {
  const router = useRouter();
  const params = useParams();
  const ref = useRef();
  const theme = useTheme();
  const { caseId, name, type, attachments, messages } = chat;

  const [lastMessage, setLastMessage] = useState({});

  useEffect(() => {
    if (messages.length > 0) {
      const sortedMessages = [...messages];
      sortedMessages.sort((a, b) => b.createdOn - a.createdOn);
      setLastMessage(sortedMessages[0]);
    }
  }, [messages]);

  const handleClick = () => {
    router.push(`/chats/${caseId}`);
  };

  useEffect(() => {
    if (caseId === params.id) {
      ref.current.scrollIntoView(false);
    }
  }, []);

  return (
    <StyledMainBox
      onClick={handleClick}
      id={params.id}
      itemId={caseId}
      ref={ref}
    >
      <Grid container spacing={1}>
        <Grid item>
          <StyledCenteredBox>
            <Avatar alt={lastMessage?.user} src="/test" />
            {attachments && (
              <Box mt={2}>
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
                  params.id === caseId ? "secondary" : theme.palette.blue.main
                }
                variant="body2"
                fontSize={12}
              >
                {type}
              </Typography>
            </Grid>
            <Grid item>
              <Typography color="secondary" variant="body2" fontSize={12}>
                {`${getDatePart(lastMessage.createdOn)} ${getTimePart(
                  lastMessage.createdOn
                )}`}
              </Typography>
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
