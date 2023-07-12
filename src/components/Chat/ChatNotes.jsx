import { Box, CircularProgress, Typography, useTheme } from "@mui/material";
import { ChatNote } from "./ChatNote";
import { useParams } from "next/navigation";
import { useGetNoteByCaseIdQuery } from "@/redux/services/casesApi";
import styled from "@emotion/styled";

const StyledFetchingBox = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  cursor: "pointer",
  padding: "1rem",
  borderRadius: "1rem",
  backgroundColor: theme.palette.lightGray.dark,
}));

const ChatNotes = () => {
  const params = useParams();
  const { caseId } = params;
  const theme = useTheme();

  const { data, error, isLoading, isFetching } =
    useGetNoteByCaseIdQuery(caseId);

  return (
    <Box p={2}>
      <Box mb={2}>
        <Typography variant="subtitle1" color="secondary">
          Notes
        </Typography>
      </Box>
      <Box>
        {isLoading ? (
          <Box display="flex" justifyContent="center" alignItems="center">
            <CircularProgress color="secondary" size={20} />
          </Box>
        ) : data?.length > 0 ? (
          <>
            {data.map((note) => {
              return (
                <Box key={note.noteId} mb={1}>
                  <ChatNote note={note} />
                </Box>
              );
            })}
            {isFetching && (
              <StyledFetchingBox>
                <CircularProgress color="secondary" size={20} />
              </StyledFetchingBox>
            )}
          </>
        ) : (
          <Typography
            display="flex"
            alignItems="center"
            justifyContent="center"
            variant="overline"
            color={theme.palette.gray.main}
          >
            No notes yet
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export { ChatNotes };
