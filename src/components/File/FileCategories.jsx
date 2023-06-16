import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Typography,
  styled,
  useTheme,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useEffect, useState } from "react";
import FiberManualRecordRoundedIcon from "@mui/icons-material/FiberManualRecordRounded";

const CATEGORIES = [
  {
    id: 1,
    name: "In Primary",
    count: 8,
  },
  {
    id: 2,
    name: "Social",
    count: 45,
  },
  {
    id: 3,
    name: "Works",
    count: 87,
  },
  {
    id: 4,
    name: "Promotion",
    count: 197,
  },
];

const StyledAccordion = styled(Accordion)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  "& .MuiAccordionSummary-expandIconWrapper .MuiSvgIcon-root": {
    color: "white",
  },
  "& .MuiAccordionSummary-root.Mui-expanded": {
    minHeight: 0,
  },
  "& .MuiAccordionSummary-content.Mui-expanded": {
    margin: "12px 0",
  },
}));

const StyledCenteredBox = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  marginBottom: "1rem",
}));

const FileCategories = () => {
  const theme = useTheme();
  const [categories, setCategories] = useState([]);
  const [expanded, setExpanded] = useState(true);

  useEffect(() => {
    setCategories(CATEGORIES);
  }, []);

  return (
    <StyledAccordion expanded={expanded}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
        onClick={() => setExpanded(!expanded)}
      >
        <Typography variant="overline" color="secondary">
          Categories
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        {categories.map((category) => {
          return (
            <StyledCenteredBox key={category.id}>
              <Box display="flex" alignItems="center" gap={2}>
                <FiberManualRecordRoundedIcon
                  color="error"
                  sx={{ fontSize: 10 }}
                />
                <Typography
                  variant="body2"
                  fontWeight={300}
                  color={theme.palette.gray.light}
                >
                  {category.name}
                </Typography>
              </Box>
              <Typography
                variant="body2"
                fontWeight={300}
                color={theme.palette.gray.light}
              >
                {category.count}
              </Typography>
            </StyledCenteredBox>
          );
        })}
      </AccordionDetails>
    </StyledAccordion>
  );
};

export { FileCategories };
