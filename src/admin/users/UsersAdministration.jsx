import {
  Box,
  Button,
  Container,
  Fab,
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
import { useGetUsers } from "../../hooks/api/admin/useUserAdministration";
import { useState } from "react";
import { UsersFilters } from "./UsersFilters";
import { useNavigate } from "react-router-dom";
import { AddUserDialog } from "./AddUserDialog";
import { i18nDateTime } from "../../utils/i18n";

const Content = ({ users }) => {
  const navigate = useNavigate();

  if (users?.length === 0) {
    return (
      <TableRow>
        <TableCell colSpan={2}>No users found</TableCell>
      </TableRow>
    );
  }

  return users?.map((user, index) => (
    <TableRow key={index} hover>
      <TableCell>{user.name}</TableCell>
      <TableCell>{i18nDateTime(user.created)}</TableCell>
      <TableCell align="right">
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate(`${user.id}`)}
        >
          Edit
        </Button>
        <Button variant="contained" color="secondary">
          Delete
        </Button>
      </TableCell>
    </TableRow>
  ));
};

export const UsersAdministration = () => {
  const [filters, setFilters] = useState({
    search: "",
    role: "",
  });
  const [pageNumber, setPageNumber] = useState(0);
  const [pageSize, setPageSize] = useState(10);

  const [openDialog, setOpenDialog] = useState(false);

  const { data: results, isLoading } = useGetUsers(
    filters,
    pageNumber,
    pageSize
  );

  return (
    <Container>
      <Paper
        elevation={2}
        aria-label="users-filters"
        sx={{
          padding: 2,
          my: 10,
        }}
      >
        <UsersFilters filters={filters} setFilters={setFilters} />
      </Paper>

      <Paper elevation={0} sx={{}}>
        <TableContainer component={Box}>
          <Table aria-label="users-table">
            <TableHead>
              <TableRow>
                <TableCell align="center">Username</TableCell>
                <TableCell align="center">Created</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {isLoading && (
                <TableRow>
                  <TableCell colSpan={3}>Loading...</TableCell>
                </TableRow>
              )}
              {!isLoading && <Content users={results?.results} />}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={results?.pagination?.totalResults || 0}
          rowsPerPage={pageSize}
          page={pageNumber}
          onPageChange={(event, newPage) => setPageNumber(newPage)}
          onRowsPerPageChange={(event) => setPageSize(event.target.value)}
        />

        <Fab
          color="primary"
          aria-label="add"
          sx={{ position: "relative", bottom: 16, right: 50 }}
          onClick={() => setOpenDialog(true)}
        >
          <Typography variant="h4">+</Typography>
        </Fab>
      </Paper>

      <AddUserDialog open={openDialog} onClose={() => setOpenDialog(false)} />
    </Container>
  );
};
