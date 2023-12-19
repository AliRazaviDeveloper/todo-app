import { useTheme } from "@mui/material/styles";
import {
  Typography,
  TableHead,
  Chip,
  Box,
  Table,
  TableBody,
  TableCell,
  TablePagination,
  TableRow,
  TableFooter,
  IconButton,
  TableContainer,
  Stack,
  TextField,
  Button,
  Tooltip,
} from "@mui/material";

import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";

import { useState } from "react";
import Card from "../card/Card";
import { useDeleteTodo, useGetTodosQuery } from "../../../services/todo";
import { STATUS_TODO } from "../../../types/todo";
import { TbTrash } from "react-icons/tb";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";

interface TablePaginationActionsProps {
  count: number;
  page: number;
  rowsPerPage: number;
  onPageChange: (
    event: React.MouseEvent<HTMLButtonElement>,
    newPage: number
  ) => void;
}

function TablePaginationActions(props: TablePaginationActionsProps) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event: any) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event: any) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event: any) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event: any) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

const MuiTable = () => {
  const { mutateAsync } = useDeleteTodo();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [search, setSearch] = useState("");
  const [inputSearch, setInputSearch] = useState("");
  const { todos: rows } = useGetTodosQuery({
    q: search || "",
  });
  const queryClient = useQueryClient();

  const emptyRows =
    page > 0
      ? Math.max(0, (1 + page) * rowsPerPage - (rows ? rows.length : 0))
      : 0;

  const handleChangePage = (event: any, newPage: any) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: any) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const handleSearch = (e: any) => {
    e.preventDefault();
    setSearch(inputSearch.trim());
  };
  const handleDeleteTodo = (id: number) => {
    try {
      mutateAsync({ id });
      queryClient.invalidateQueries({
        queryKey: ["posts"],
        exact: true,
        refetchType: "active",
      });
    } catch (error) {
      toast.error("Problem Operation Delete Todo");
    }
  };

  return (
    <Card title="Todo Table">
      <>
        <form onSubmit={handleSearch}>
          <Box display="flex" flexDirection="row" gap={3}>
            <TextField
              placeholder="Search"
              onChange={(e) => setInputSearch(e.target.value)}
            />
            <Button type="submit">Search</Button>
          </Box>
        </form>
        <TableContainer>
          <Table
            aria-label=" Todo Table"
            sx={{
              whiteSpace: "nowrap",
            }}
          >
            <TableHead>
              <TableRow>
                <TableCell>
                  <Typography variant="h6">ID</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="h6">Title</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="h6">Date</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="h6">Status</Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography variant="h6">Action</Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows &&
                (rowsPerPage > 0
                  ? rows.slice(
                      page * rowsPerPage,
                      page * rowsPerPage + rowsPerPage
                    )
                  : rows
                ).map((row, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <Typography variant="subtitle2">{row.id}</Typography>
                    </TableCell>
                    <TableCell>
                      <Stack direction="row" spacing={2} alignItems="center">
                        <Typography variant="subtitle2" fontWeight="600">
                          {row.title}
                        </Typography>
                      </Stack>
                    </TableCell>
                    <TableCell>
                      <Typography
                        color="textSecondary"
                        variant="h6"
                        fontWeight="400"
                      >
                        {row.date}
                      </Typography>
                    </TableCell>

                    <TableCell>
                      <Chip
                        color={
                          row.status === STATUS_TODO.COMPLETE
                            ? "success"
                            : row.status === STATUS_TODO.PENDING
                            ? "warning"
                            : "primary"
                        }
                        sx={{
                          borderRadius: "6px",
                        }}
                        size="small"
                        label={row.status}
                      />
                    </TableCell>
                    <TableCell align="right">
                      <Tooltip title="Delete Todo">
                        <IconButton onClick={() => handleDeleteTodo(row.id)}>
                          <TbTrash size="18" />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))}

              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
                  colSpan={6}
                  count={rows?.length || 1}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  ActionsComponent={TablePaginationActions}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      </>
    </Card>
  );
};

export default MuiTable;
