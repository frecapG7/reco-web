import { Badge, Box, Button, Container, Dialog, DialogActions, DialogContent, DialogTitle, Grid, IconButton, Paper, Stack } from "@mui/material"
import { useGetMyRequests } from "../api/requests"
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FormText } from "../form/FormText";
import { Request } from "../component/Request";
import { FormCheckbox } from "../form/FormCheckbox";
import MenuIcon from '@mui/icons-material/Menu';

export const MyRequests = () => {


    const [pageSize, setPageSize] = useState(10);
    const [page, setPage] = useState(1);

    const [openFilters, setOpenFilters] = useState(false);


    const { data: requests, isLoading, isError } = useGetMyRequests(pageSize, page);

    const { control } = useForm();

    if (isLoading) return <div>Loading...</div>
    if (isError) return <div>Error</div>


    return (
        <Container spacing={5}>
            <Paper
                sx={{
                    top: '10%',
                    p: 5,
                    my: 3
                }}>
                <>
                    <form>
                        <Stack>
                            <FormText control={control} name="search" label="Search" />
                            <FormCheckbox control={control} name="showClosed" label="Show closed" />
                        </Stack>
                    </form>
                    <IconButton variant="contained" onClick={() => setOpenFilters(true)}>
                        <MenuIcon />
                    </IconButton>
                </>

            </Paper>
            <Stack spacing={5}>
                {requests.map((request, index) => (

                    <Paper key={request.id}
                        elevation={3}
                        sx={{
                            p: 2
                        }}>
                        <Grid container sx={{ width: '100%' }}>
                            <Grid item xs={8}>
                                <Request request={request} />
                            </Grid>
                            <Grid item
                                container
                                spacing={4}
                                xs={4}
                                justifyContent="center"
                                alignItems="center">
                                <Grid item>
                                    <Badge badgeContent={request.unseenRecommendationsCount}
                                        color="warning"
                                        variant="solid"
                                        anchorOrigin={{
                                            vertical: 'top',
                                            horizontal: 'right',
                                        }}
                                        showZero={false}>
                                        <Button variant="contained">
                                            View response
                                        </Button>
                                    </Badge>
                                </Grid>
                                <Grid item>
                                    <Button variant="contained">
                                        Delete
                                    </Button>
                                </Grid>

                            </Grid>
                        </Grid>
                    </Paper>
                ))}
            </Stack>




            <Dialog open={openFilters}
                onClose={() => setOpenFilters(false)}>
                <DialogTitle>
                    Active filters
                </DialogTitle>
                <DialogContent>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                        <Stack spacing={2}>
                            <FormCheckbox control={control} name="showClosed" label="Show closed" />
                        </Stack>
                    </Box>
                </DialogContent>
                <DialogActions justifyContent="space-end" alignItems="center">
                    <Button onClick={() => setOpenFilters(false)}
                        variant="contained">
                        Close
                    </Button>
                </DialogActions>

            </Dialog>



        </Container>
    )

}