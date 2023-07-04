import { Box, Typography, useTheme } from "@mui/material";
import Link from "next/link";

const SignUpTermsPolicy = () => {
  const theme = useTheme();
  return (
    <Box mb={2}>
      <Typography
        variant="body2"
        color="secondary"
        textAlign="center"
        fontSize={12}
        sx={{ maxWidth: "20rem" }}
      >
        {"By signing up, you confirm that you've read and accepted our "}
        <Link href="" style={{ color: theme.palette.blue.main }}>
          Terms
        </Link>{" "}
        and{" "}
        <Link href="" style={{ color: theme.palette.blue.main }}>
          Privacy Policy
        </Link>
      </Typography>
    </Box>
  );
};

export { SignUpTermsPolicy };
