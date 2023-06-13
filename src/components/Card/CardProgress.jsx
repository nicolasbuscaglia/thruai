"use client";
import { useState } from "react";
import { Box, LinearProgress, Typography } from "@mui/material";

const CardProgress = ({ progress: progressProp }) => {
  const [progress, setProgress] = useState(progressProp);

  return (
    <Box sx={{ width: "100%" }}>
      <Typography
        textAlign="end"
        color="secondary"
        variant="body2"
        sx={{ fontSize: "0.75rem", fontWeight: 200 }}
        gutterBottom
      >
        Upload Status - {progress === 100 ? "Complete" : `${progress}%`}
      </Typography>
      <LinearProgress
        variant="determinate"
        value={progress}
        color="progress"
        sx={{ borderRadius: "1rem" }}
      />
    </Box>
  );
};

export { CardProgress };
