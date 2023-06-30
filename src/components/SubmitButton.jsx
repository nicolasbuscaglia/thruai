const {
  Button,
  CircularProgress,
  Typography,
  useTheme,
} = require("@mui/material");

const SubmitButton = ({ label = "Submit", disabled = false }) => {
  const theme = useTheme();
  return (
    <Button
      disabled={disabled}
      color="blue"
      variant="contained"
      sx={{ borderRadius: "0.6rem", color: theme.palette.secondary.main }}
      type="submit"
    >
      {disabled ? (
        <CircularProgress color="secondary" size={25} />
      ) : (
        <Typography color="secondary">{label}</Typography>
      )}
    </Button>
  );
};

export { SubmitButton };
