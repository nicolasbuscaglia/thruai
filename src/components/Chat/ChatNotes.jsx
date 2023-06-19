import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { ChatNote } from "./ChatNote";

const NOTES = [
  {
    id: 1,
    uploadedOn: "12:48PM",
    user: "Jhon Doe",
    content: "This is a test note",
  },
  {
    id: 2,
    uploadedOn: "09/12/23 12:23PM",
    user: "Jane Doe",
    content: "This is a test note",
  },
  {
    id: 1,
    uploadedOn: "08/12/23 10:23AM",
    user: "Jhon Doe",
    content: "This is a test note",
  },
];

const ChatNotes = () => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    setNotes(NOTES);
  }, []);

  return (
    <Box p={2}>
      <Box mb={2}>
        <Typography variant="subtitle1" color="secondary">
          Notes
        </Typography>
      </Box>
      <Box>
        {notes.map((note) => {
          return (
            <Box key={note.id} mb={1}>
              <ChatNote note={note} />
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};

export { ChatNotes };
