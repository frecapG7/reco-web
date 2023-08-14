import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TablePagination, TableRow, Typography } from '@mui/material';

import { useState } from 'react';
import { useSearchRequests } from '../api/search';
import { useNavigate } from 'react-router-dom';
import { CustomProgress } from '../layout/CustomProgress';
import { CustomError } from '../layout/CustomError';
import { Layout } from '../layout/Layout';


const Content = ({ requests }) => {

    const navigate = useNavigate();


    if (requests?.length === 0) return (
        <TableBody>
            <TableRow>
                <TableCell>
                    <Typography variant='body1'>No requests</Typography>
                </TableCell>
            </TableRow>
        </TableBody>
    );

    return (
        <TableBody spacing={5}>
            {requests?.map((result) => (
                <TableRow key={result._id}
                    hover
                    component={Paper}
                    sx={{ cursor: 'pointer', my:3 }}
                    onClick={() => navigate(result._id)}>
                    <TableCell>
                        <Typography variant='body1'>{result.requestType}</Typography>
                    </TableCell>
                    <TableCell>
                        <Typography variant='body1'>{result.description}</Typography>
                    </TableCell>
                    <TableCell>
                        <Typography variant='body1'>{result.status}</Typography>
                    </TableCell>
                    <TableCell>
                        <Typography variant='body1'>{result.author}</Typography>
                    </TableCell>
                </TableRow>
            ))
            }
        </TableBody>
    );
}


export const Requests = () => {

    const navigate = useNavigate();

    const [pageSize, setPageSize] = useState(10);
    const [pageNumber, setPageNumber] = useState(0);

    const { data: resultSet, error, isLoading, } = useSearchRequests({}, pageNumber, pageSize);


    return (
        <Layout>
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
                            <TableCell>
                                <Typography variant='h6'>Request Type</Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant='h6'>Description</Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant='h6'>Status</Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant='h6'>Author</Typography>
                            </TableCell>
                        </TableRow>
                    </TableHead>

                    {isLoading && <CustomProgress variant="table-body" />}
                    {error && <CustomError variant="table-body" />}
                    {!isLoading && !error && <Content requests={resultSet?.results} />}

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
        </Layout>
    )

}

