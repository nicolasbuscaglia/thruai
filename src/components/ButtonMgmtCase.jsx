import { useRouter, useParams } from "next/navigation";
import { Button, useTheme } from "@mui/material";
import ChevronRightOutlinedIcon from "@mui/icons-material/ChevronRightOutlined";

const ButtonManageCase = () => {
  const theme = useTheme();
  const router = useRouter();
  const params = useParams();
  const { caseId } = params;
  const handleManageCase = () => {
    router.push(`/case/${caseId}`);
  };
  return (
    <Button
      color="blue"
      variant="contained"
      sx={{ borderRadius: "0.6rem", color: theme.palette.secondary.main }}
      onClick={handleManageCase}
      endIcon={<ChevronRightOutlinedIcon color="secondary" />}
    >
      Manage Case
    </Button>
  );
};

export { ButtonManageCase };
