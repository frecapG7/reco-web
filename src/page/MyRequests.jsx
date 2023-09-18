import { Badge, Box, Button, Container, Grid, Paper, Stack, Typography } from "@mui/material"
import { useGetMyRequests } from "../api/requests"
import React, { useState } from "react";
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PersonIcon from '@mui/icons-material/Person';
import { Enum } from "../utils/Enum";
import { useForm } from "react-hook-form";
import { FormText } from "../form/FormText";
import { Request } from "../component/Request";
import { FormCheckbox } from "../form/FormCheckbox";

export const MyRequests = () => {


    const [pageSize, setPageSize] = useState(10);
    const [page, setPage] = useState(1);

    const { data: requests, isLoading, isError } = useGetMyRequests(pageSize, page);

    const { watch, control } = useForm();

    if (isLoading) return <div>Loading...</div>
    if (isError) return <div>Error</div>

    const search = watch('search');

    return (
        <Container spacing={5}>
            <pre>{search}</pre>
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
                                    <Badge badgeContent={request.unseenRecommendationCount}
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



        </Container>
    )

}