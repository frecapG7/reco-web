import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import { useGetUsers } from "../../hooks/api/admin/userUserAdministration";
import { useState } from "react";
import { UsersFilters } from "./UsersFilters";

const Content = ({ users }) => {
  if (users?.length === 0) {
    return (
      <TableRow>
        <TableCell colSpan={2}>No users found</TableCell>
      </TableRow>
    );
  }

  return users?.map((user) => (
    <TableRow key={user.id} hover>
      <TableCell>{user.username}</TableCell>
      <TableCell>{user.email}</TableCell>
    </TableRow>
  ));
};

export const UsersAdministration = () => {
  const [filters, setFilters] = useState({});
  const [pageNumber, setPageNumber] = useState(0);
  const [pageSize, setPageSize] = useState(10);

  const {
    data: result,
    isLoading,
    isError,
    error,
  } = useGetUsers(filters, pageNumber, pageSize);

  return (
    <Box>
      <Paper
        elevation={2}
        aria-label="users-filters"
        sx={{
          padding: 2,
          marginBottom: 2,
        }}
      >
        <Typography variant="h2">Filters</Typography>

        <UsersFilters onSubmit={(data) => console.log(data)} />
      </Paper>

      <Paper elevation={0} sx={{}}>
        <TableContainer component={Box}>
          <Table aria-label="users-table">
            <TableHead>
              <TableRow>
                <TableCell>Username</TableCell>
                <TableCell>Email</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <Content users={result} />
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={result?.length}
          rowsPerPage={pageSize}
          page={pageNumber}
          onPageChange={(event, newPage) => setPageNumber(newPage)}
          onRowsPerPageChange={(event) => setPageSize(event.target.value)}
        />
      </Paper>
    </Box>
  );
};
