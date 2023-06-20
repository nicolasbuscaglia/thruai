import { getDatePart, getTimePart } from "@/utils/date";
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
  WebkitLineClamp: 1,
  WebkitBoxOrient: "vertical",
  overflow: "hidden",
  textOverflow: "ellipsis",
  textWrap: "wrap",
}));

const ChatNote = ({ note = {} }) => {
  const theme = useTheme();
  const { createdOn, user, content } = note;

  return (
    <StyledMainBox>
      <Grid container spacing={1}>
        <Grid item>
          <StyledCenteredBox>
            <Avatar alt={user} src="/test" />
          </StyledCenteredBox>
        </Grid>
        <Grid item xs>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <StyledTypographyBox
              color={theme.palette.blue.main}
              variant="body2"
              fontSize={12}
            >
              {user}
            </StyledTypographyBox>

            <Typography color="secondary" variant="body2" fontSize={12}>
              {`${getDatePart(createdOn)} ${getTimePart(createdOn)}`}
            </Typography>
          </Box>
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
