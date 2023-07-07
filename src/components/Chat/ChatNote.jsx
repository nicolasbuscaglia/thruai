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
  wordBreak: "break-all",
}));

const StyledTextWrapBox = styled(Box)(() => ({
  wordWrap: "break-word",
  textWrap: "wrap",
}));

const ChatNote = ({ note = {} }) => {
  const theme = useTheme();
  const { createdAt, user, content } = note;

  return (
    <StyledMainBox>
      <Grid container spacing={1}>
        <Grid item xs={2}>
          <StyledCenteredBox>
            <Avatar
              alt={user.name}
              src="/test"
              sx={{ width: 24, height: 24, fontSize: 14 }}
            />
          </StyledCenteredBox>
        </Grid>
        <Grid item xs={10}>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <StyledTypographyBox>
              <Typography
                variant="body2"
                fontSize={12}
                color={theme.palette.blue.main}
              >
                {user.name}
              </Typography>
            </StyledTypographyBox>

            <Typography color="secondary" variant="body2" fontSize={12}>
              {`${getDatePart(createdAt)} ${getTimePart(createdAt)}`}
            </Typography>
          </Box>
          <StyledTextWrapBox>
            <Typography color="secondary" variant="body2" fontSize={12}>
              {content}
            </Typography>
          </StyledTextWrapBox>
        </Grid>
      </Grid>
    </StyledMainBox>
  );
};

export { ChatNote };
