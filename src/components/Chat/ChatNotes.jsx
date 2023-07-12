import { Box, CircularProgress, Typography, useTheme } from "@mui/material";
import { ChatNote } from "./ChatNote";
import { useParams } from "next/navigation";
import { useGetNoteByCaseIdQuery } from "@/redux/services/casesApi";

const ChatNotes = () => {
  const params = useParams();
  const { caseId } = params;
  const theme = useTheme();

  // const notes = useSelector(selectNotesByCaseId(caseId));
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
          <CircularProgress color="secondary" size={20} />
        ) : data?.length > 0 ? (
          data.map((note) => {
            return (
              <Box key={note.noteId} mb={1}>
                <ChatNote note={note} />
              </Box>
            );
          })
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
