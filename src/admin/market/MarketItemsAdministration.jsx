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
  Zoom,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetItems } from "../../hooks/api/admin/useMarketAdministration";
import { MarketItemsFilters } from "./MarketItemsFilters";

const Content = ({ results = [] }) => {
  const navigate = useNavigate();

  if (results.length === 0) {
    return (
      <TableRow>
        <TableCell colSpan={5} align="center">
          No items found
        </TableCell>
      </TableRow>
    );
  }

  return results.map((item, index) => (
    <TableRow key={index} hover onClick={() => navigate(`${item.id}`)}>
      <TableCell align="center">
        <Box
          component="img"
          src={item.icon}
          sx={{
            width: 40,
          }}
        />
      </TableCell>
      <TableCell align="center">{item.name}</TableCell>
      <TableCell align="center">{item.type}</TableCell>
      <TableCell align="center">{item.price}</TableCell>
    </TableRow>
  ));
};

export const MarketItemsAdministration = () => {
  const [value, setValue] = useState("");
  const [type, setType] = useState("");

  const [pageNumber, setPageNumber] = useState(0);
  const [pageSize, setPageSize] = useState(10);

  const { data: results, isLoading } = useGetItems({
    value,
    type,
    page: pageNumber,
    pageSize,
  });

  const navigate = useNavigate();

  return (
    <Container>
      <Paper
        elevation={2}
        aria-label="market-items-filters"
        sx={{ padding: 2, marginBottom: 2 }}
      >
        <MarketItemsFilters
          filters={{
            value: "",
            type: "",
          }}
          onValueChange={(data) => {
            setValue(data?.value);
            setType(data?.type);
          }}
        />
      </Paper>

      <Paper elevation={0} sx={{}} aria-label="market-items-search-table">
        <TableContainer component={Box}>
          <Table aria-label="users-table">
            <TableHead>
              <TableRow>
                <TableCell align="center">Icon</TableCell>
                <TableCell align="center">Name</TableCell>
                <TableCell align="center">Type</TableCell>
                <TableCell align="center">Price</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <Zoom in={isLoading} mountOnEnter unmountOnExit>
                <TableRow>
                  <TableCell colSpan={5} align="center">
                    Loading...
                  </TableCell>
                </TableRow>
              </Zoom>
              <Content results={results?.results} />
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={results?.pagination.totalCount || 0}
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
