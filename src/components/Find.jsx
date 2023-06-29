import { Button, InputBase, alpha, styled } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useDispatch, useSelector } from "react-redux";
import { selectFilter, updateFilter } from "@/redux/features/uiSlice";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    fontSize: "0.875rem",
    [theme.breakpoints.up("md")]: {
      width: "5ch",
      "&:hover, &:focus": {
        width: "20ch",
      },
    },
  },
}));

const Find = () => {
  const dispatch = useDispatch();

  const filter = useSelector((state) => selectFilter(state));

  const handleChange = (e) => {
    dispatch(updateFilter(e.target.value));
  };

  const handleReset = () => {
    dispatch(updateFilter(""));
  };

  return (
    <Search sx={{ display: "flex", borderRadius: "0.6rem" }}>
      <SearchIconWrapper>
        <SearchIcon fontSize="small" color="icon" />
      </SearchIconWrapper>
      <StyledInputBase
        placeholder="Find"
        inputProps={{ "aria-label": "find" }}
        onChange={handleChange}
        value={filter}
      />
      {filter && (
        <Button
          variant="contained"
          color="blue"
          sx={{ fontSize: 12, borderRadius: "0.7rem" }}
          onClick={handleReset}
        >
          Reset
        </Button>
      )}
    </Search>
  );
};

export { Find };
