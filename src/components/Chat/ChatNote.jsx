import { Avatar, Box, Grid, Typography, styled, useTheme } from "@mui/material";

const StyledCenteredBox = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
}));

const StyledMainBox = styled(Box)(({ theme }) => ({
  cursor: "pointer",
  padding: "1rem",
  borderRadius: "1rem",
  backgroundColor: theme.palette.lightGray.dark,
}));

const StyledTypographyBox = styled(Box)(() => ({
  display: "-webkit-box",
  WebkitLineClamp: 2,
  WebkitBoxOrient: "vertical",
  overflow: "hidden",
  textOverflow: "ellipsis",
  textWrap: "wrap",
}));

const ChatNote = ({ note = {} }) => {
  const theme = useTheme();
  const { uploadedOn, user, content } = note;

  return (
    <StyledMainBox>
      <Grid container spacing={1}>
        <Grid item>
          <StyledCenteredBox>
            <Avatar alt={user} src="/test" />
          </StyledCenteredBox>
        </Grid>
        <Grid item xs>
          <Grid container>
            <Grid item xs>
              <Typography
                color={theme.palette.blue.main}
                variant="body2"
                fontSize={12}
              >
                {user}
              </Typography>
            </Grid>
            <Grid item>
              <Typography color="secondary" variant="body2" fontSize={12}>
                {uploadedOn}
              </Typography>
            </Grid>
          </Grid>
          <StyledTypographyBox>
            <Typography color="secondary" variant="body2" fontSize={12}>
              {content}
            </Typography>
          </StyledTypographyBox>
        </Grid>
      </Grid>
    </StyledMainBox>
  );
};

export { ChatNote };
