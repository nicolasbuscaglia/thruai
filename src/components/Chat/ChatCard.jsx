import { useRouter, useParams } from "next/navigation";
import { Avatar, Box, Grid, Typography, styled, useTheme } from "@mui/material";
import AttachFileOutlinedIcon from "@mui/icons-material/AttachFileOutlined";
import { useEffect, useRef } from "react";

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
    Number(id) === itemId
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

const ChatCard = ({ item = {} }) => {
  const router = useRouter();
  const params = useParams();
  const ref = useRef();
  const theme = useTheme();
  const { id, title, type, user, time, description, attachments } = item;

  const handleClick = () => {
    router.push(`/chats/${id}`);
  };

  useEffect(() => {
    if (id === Number(params.id)) {
      ref.current.scrollIntoView(false);
    }
  }, []);

  return (
    <StyledMainBox onClick={handleClick} id={params.id} itemId={id} ref={ref}>
      <Grid container spacing={1}>
        <Grid item>
          <StyledCenteredBox>
            <Avatar alt={user} src="/test" />
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
                  Number(params.id) === id
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
              <Typography color="secondary" variant="body2" fontSize={12}>
                {time}
              </Typography>
            </Grid>
          </Grid>
          <Typography
            color="secondary"
            variant="body2"
            fontWeight={500}
            gutterBottom
          >
            {title}
          </Typography>
          <StyledTypographyBox>
            <Typography color="secondary" variant="body2" fontSize={12}>
              {description}
            </Typography>
          </StyledTypographyBox>
        </Grid>
      </Grid>
    </StyledMainBox>
  );
};

export { ChatCard };
