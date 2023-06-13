import * as React from "react";
import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";
import { Box, useTheme } from "@mui/material";

const CardAvatar = ({ avatars }) => {
  const theme = useTheme();
  return (
    <Box sx={{ display: "flex", gap: 0.8 }}>
      {avatars.map((avatar, index) => {
        return (
          <Avatar
            key={index}
            alt={avatar}
            src="/static/images/avatar/1.jpg"
            sx={{
              fontSize: 10,
              width: "2rem",
              height: "2rem",
              backgroundColor: theme.palette.gray.light,
              border: "3px solid",
              borderColor: theme.palette.border.main,
            }}
          />
        );
      })}
    </Box>
  );
};

export { CardAvatar };
