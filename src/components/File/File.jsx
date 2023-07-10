import {
  Box,
  Checkbox,
  FormControlLabel,
  IconButton,
  Typography,
  styled,
  useTheme,
} from "@mui/material";
import AttachFileOutlinedIcon from "@mui/icons-material/AttachFileOutlined";
import { formatBytes } from "@/utils/bytes";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { useDispatch } from "react-redux";
import { removeFileById, setFileCleanCheck } from "@/redux/features/uiSlice";

const StyledMainContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: 1,
  borderRadius: "1rem",
  backgroundColor: theme.palette.lightGray.dark,
  padding: "0.5rem",
}));

const StyledCenteredBox = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  gap: 8,
}));

const StyledIconContainer = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  width: "fit-content",
  borderRadius: "1rem",
}));

const StyledIconButton = styled(IconButton)(() => ({
  position: "absolute",
  top: -8,
  right: -8,
}));

const File = ({ file, remove = false, cleanCheckbox = false }) => {
  const dispatch = useDispatch();
  const { id, name, type, size, clean, file: fileURL } = file;
  const theme = useTheme();

  const handleRemove = () => {
    dispatch(removeFileById({ id: id }));
  };

  const handleClean = (e) => {
    dispatch(setFileCleanCheck({ id: id, clean: e.target.checked }));
  };

  return (
    <Box sx={{ position: "relative" }}>
      <a href={fileURL} download>
        <StyledMainContainer>
          <StyledIconContainer>
            <AttachFileOutlinedIcon color="secondary" sx={{ fontSize: 16 }} />
          </StyledIconContainer>

          <Box overflow="hidden" p={1}>
            <Typography
              variant="body2"
              color="secondary"
              fontSize={12}
              sx={{ textOverflow: "ellipsis", overflow: "hidden" }}
              gutterBottom
            >
              {name}
            </Typography>

            <StyledCenteredBox>
              <Typography
                variant="body2"
                color={theme.palette.gray.light}
                fontSize={12}
              >
                {formatBytes(Number(size))}
              </Typography>
              <Typography
                variant="body2"
                color={theme.palette.gray.light}
                fontSize={12}
              >
                {type}
              </Typography>
            </StyledCenteredBox>
            {cleanCheckbox && (
              <FormControlLabel
                control={
                  <Checkbox
                    name={id}
                    checked={clean}
                    onChange={handleClean}
                    inputProps={{ "aria-label": "controlled" }}
                    color="blue"
                    size="small"
                    sx={{
                      color: theme.palette.gray.light,
                      paddingTop: 0,
                      paddingBottom: 0,
                    }}
                  />
                }
                label={
                  <Typography
                    fontSize={12}
                    color={theme.palette.gray.light}
                    fontWeight={300}
                  >
                    Clean
                  </Typography>
                }
              />
            )}
          </Box>
        </StyledMainContainer>
      </a>
      {remove && (
        <StyledIconButton
          aria-label="remove file"
          color="icon"
          onClick={handleRemove}
        >
          <HighlightOffIcon />
        </StyledIconButton>
      )}
    </Box>
  );
};

export { File };
