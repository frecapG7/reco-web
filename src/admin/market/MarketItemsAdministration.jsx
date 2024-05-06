import {
  Box,
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
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const MarketItemsAdministration = () => {
  const [filters, setFilters] = useState({});
  const [pageNumber, setPageNumber] = useState(0);
  const [pageSize, setPageSize] = useState(10);

  const results = [];

  const navigate = useNavigate();

  return (
    <Container>
      <Typography variant="h4">Market Items Administration</Typography>

      <Paper elevation={0} sx={{}} aria-label="market-items-search-table">
        <TableContainer component={Box}>
          <Table aria-label="users-table">
            <TableHead>
              <TableRow>
                <TableCell align="center">Username</TableCell>
                <TableCell align="center">Email</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody></TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={results?.length || 0}
          rowsPerPage={pageSize}
          page={pageNumber}
          onPageChange={(event, newPage) => setPageNumber(newPage)}
          onRowsPerPageChange={(event) => setPageSize(event.target.value)}
        />

        <Fab
          color="success"
          aria-label="add"
          sx={{ position: "relative", bottom: 16, right: 50 }}
          onClick={() => navigate("new")}
        >
          <Typography variant="h4">+</Typography>
        </Fab>
      </Paper>
    </Container>
  );
};
