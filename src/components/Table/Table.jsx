import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import { visuallyHidden } from "@mui/utils";
import { useMemo, useState } from "react";
import { Button, LinearProgress, styled, useTheme } from "@mui/material";
import AttachFileOutlinedIcon from "@mui/icons-material/AttachFileOutlined";

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// Since 2020 all major browsers ensure sort stability with Array.prototype.sort().
// stableSort() brings sort stability to non-modern browsers (notably IE11). If you
// only support modern browsers you can replace stableSort(exampleArray, exampleComparator)
// with exampleArray.slice().sort(exampleComparator)
function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: "fileName",
    label: "File Name",
  },
  {
    id: "cleaningStatus",
    label: "Cleaning Status",
  },
  {
    id: "uploadedOn",
    label: "Uploaded On",
  },
  {
    id: "view",
    label: "View",
  },
];

const StyledTableSortLabel = styled(TableSortLabel)(({ theme }) => ({
  "& .MuiTableSortLabel-icon": {
    color: `${theme.palette.gray.dark} !important`,
  },
}));

const StyledSortLabelTypography = styled(Typography)(({ theme }) => ({
  fontSize: 14,
  fontWeight: 500,
  color: `${theme.palette.gray.light}`,
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  color: theme.palette.gray.dark,
  border: "none",
  textAlign: "left",
}));

const StyledCenteredBox = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: 5,
  color: theme.palette.gray.dark,
  border: "none",
}));

const StyledButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.lightGray.dark,
  color: theme.palette.gray.dark,
  fontSize: 12,
  fontWeight: 400,
}));

function EnhancedTableHead({ order, orderBy, onRequestSort }) {
  const theme = useTheme();
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align="left"
            sortDirection={orderBy === headCell.id ? order : false}
            sx={{
              color: theme.palette.gray.dark,
              border: "none",
              backgroundColor: theme.palette.lightGray.dark,
              padding: "0.3rem 1rem",
            }}
          >
            <StyledTableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              <StyledSortLabelTypography variant="overline">
                {headCell.label}
              </StyledSortLabelTypography>
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </StyledTableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  data: PropTypes.array,
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const EnhancedTable = ({ title, data = [] }) => {
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("cleaningStatus");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const theme = useTheme();

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const visibleRows = useMemo(
    () =>
      stableSort(data, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      ),
    [data, order, orderBy, page, rowsPerPage]
  );

  return (
    <Box sx={{ width: "100%" }}>
      <Paper
        sx={{
          width: "100%",
          mb: 2,
          backgroundColor: "#000",
          color: theme.palette.secondary.main,
        }}
      >
        <Toolbar>
          <Typography
            sx={{ flex: "1 1 100%" }}
            variant="h6"
            id="tableTitle"
            component="div"
          >
            {title}
          </Typography>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={data.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            labelRowsPerPage="Show:"
            sx={{
              color: theme.palette.gray.light,
              "& .MuiSelect-icon": { color: theme.palette.gray.light },
            }}
          />
        </Toolbar>
        <TableContainer
          sx={{
            backgroundColor: theme.palette.primary.main,
            borderRadius: "1rem",
          }}
        >
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size="medium"
          >
            <EnhancedTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={data.length}
            />
            <TableBody>
              {visibleRows.map((row, index) => {
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    hover
                    // onClick={(event) => handleClick(event, row.name)}
                    role="checkbox"
                    tabIndex={-1}
                    key={row.id}
                    sx={{ cursor: "pointer" }}
                  >
                    <StyledTableCell id={labelId} align="left" scope="row">
                      <StyledCenteredBox>
                        <AttachFileOutlinedIcon fontSize="small" color="icon" />
                        {row.fileName}
                      </StyledCenteredBox>
                    </StyledTableCell>
                    <StyledTableCell>
                      <Box textAlign="end">{row.cleaningStatus}%</Box>
                      <LinearProgress
                        variant="determinate"
                        value={row.cleaningStatus}
                        color="progress"
                        sx={{ borderRadius: "1rem" }}
                      />
                    </StyledTableCell>
                    <StyledTableCell>{row.uploadedOn}</StyledTableCell>
                    <StyledTableCell>
                      <StyledButton variant="contained">View</StyledButton>
                    </StyledTableCell>
                  </TableRow>
                );
              })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: 53 * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
};

export { EnhancedTable };
