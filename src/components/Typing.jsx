"use client";
import { Grid, Skeleton, useTheme } from "@mui/material";

const Typing = () => {
  const theme = useTheme();
  return (
    <Grid container spacing={1}>
      {[...Array(3)].map((item, index) => (
        <Grid item key={index}>
          <Skeleton
            sx={{ bgcolor: theme.palette.secondary.main }}
            variant="circular"
            width={6}
            height={6}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default Typing;
