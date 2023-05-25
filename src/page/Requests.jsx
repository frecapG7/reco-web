import { Box, Container, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TablePagination, TableRow, Typography } from '@mui/material';

import { useState } from 'react';
import { useSearchRequests } from '../api/search';
import { useNavigate } from 'react-router-dom';


export const Requests = () => {

    const navigate = useNavigate();

    const [pageSize, setPageSize] = useState(10);
    const [pageNumber, setPageNumber] = useState(0);

    const { data: resultSet, error, isLoading, isFetching } = useSearchRequests({}, pageNumber, pageSize);





    return (
        <Container>
            <Typography variant="h2" align="center" color="textPrimary" gutterBottom>
                Requests
            </Typography>
            <Box>
                Search
            </Box>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <Grid container>
                                <Grid item xs={12} sm={6} md={4} lg={3}>
                                    <TableCell>
                                        <Typography variant='h6'>Request Type</Typography>
                                    </TableCell>
                                </Grid>
                                <Grid item xs={12} sm={6} md={4} lg={3}>
                                    <TableCell>
                                        <Typography variant='h6'>Description</Typography>
                                    </TableCell>
                                </Grid>
                                <Grid item xs={12} sm={6} md={4} lg={3}>
                                    <TableCell>
                                        <Typography variant='h6'>Status</Typography>
                                    </TableCell>
                                </Grid>
                                <Grid item xs={12} sm={6} md={4} lg={3}>
                                    <TableCell>
                                        <Typography variant='h6'>Author</Typography>
                                    </TableCell>
                                </Grid>
                            </Grid>
                        </TableRow>
                    </TableHead>

                    <TableBody>

                        {resultSet?.results.length === 0 && (
                            <TableRow>
                                <Paper>
                                    <TableCell>
                                        <Typography variant='body1'>No results found</Typography>
                                    </TableCell>
                                </Paper>
                            </TableRow>
                        )
                        }

                        {resultSet?.results.length !== 0 &&
                            (resultSet?.results.map((result) => (
                                <TableRow key={result._id}
                                    hover
                                    sx={{ cursor: 'pointer' }}
                                    onClick={() => navigate(result._id)}>
                                    <Paper>
                                        <Grid container>
                                            <Grid item xs={12} sm={6} md={4} lg={3}>
                                                <TableCell>
                                                    <Typography variant='body1'>{result.requestType}</Typography>
                                                </TableCell>
                                            </Grid>
                                            <Grid item xs={12} sm={6} md={4} lg={3}>
                                                <TableCell>
                                                    <Typography variant='body1'>{result.description}</Typography>
                                                </TableCell>
                                            </Grid>
                                            <Grid item xs={12} sm={6} md={4} lg={3}>
                                                <TableCell>
                                                    <Typography variant='body1'>{result.status}</Typography>
                                                </TableCell>
                                            </Grid>
                                            <Grid item xs={12} sm={6} md={4} lg={3}>
                                                <TableCell>
                                                    <Typography variant='body1'>{result.author}</Typography>
                                                </TableCell>
                                            </Grid>
                                        </Grid>
                                    </Paper>
                                </TableRow>
                            ))
                            )
                        }
                    </TableBody>

                    <TableFooter>
                        <TableRow>
                            <TablePagination
                                count={resultSet?.totalCount || 0}
                                page={pageNumber}
                                rowsPerPage={pageSize}
                                onPageChange={(event, newPage) => setPageNumber(newPage)}
                                onRowsPerPageChange={(event) => setPageSize(parseInt(event.target.value))}
                                rowsPerPageOptions={[10, 25, 50]} />
                        </TableRow>

                    </TableFooter>

                </Table>
            </TableContainer>





        </Container>
    )

}

