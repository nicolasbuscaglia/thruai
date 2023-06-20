import { Box, Typography, useTheme } from "@mui/material";
import { ChatNote } from "./ChatNote";
import { useSelector } from "react-redux";
import { selectNotesById } from "@/redux/features/chats/notesSlice";
import { useParams } from "next/navigation";

const ChatNotes = () => {
  const params = useParams();
  const { id } = params;
  const theme = useTheme();

  const notes = useSelector(selectNotesById(id));

  return (
    <Box p={2}>
      <Box mb={2}>
        <Typography variant="subtitle1" color="secondary">
          Notes
        </Typography>
      </Box>
      <Box>
        {notes?.length > 0 ? (
          notes.map((note) => {
            return (
              <Box key={note.id} mb={1}>
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
