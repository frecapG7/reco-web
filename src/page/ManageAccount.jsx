import { Box, Button, Container, Grid, IconButton, Paper, Stack, Typography } from "@mui/material"

import EditIcon from "@mui/icons-material/Edit";





export const ManageAccount = () => {

    return (
        <Container>

            {/** Personnal informations */}
            <Paper variant="outlined"
                sx={{
                    mt: 5,

                }}>
                <Grid container>
                    <Grid item
                        container
                        justifyContent="center">
                        <Typography variant="h4">
                            Account informations
                        </Typography>
                        <IconButton color="primary">
                            <EditIcon />
                        </IconButton>
                    </Grid>
                    <Grid item container xs={12}>
                        <Typography variant="label">
                            Username:
                        </Typography>
                        <Typography variant="body1">
                            frecap
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="body1">
                            Email : florian.recape@wanadoo.fr
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="body1">
                            Date of registration : 10/10/2021
                        </Typography>
                    </Grid>
                </Grid>
            </Paper>

            <Box my={5}>
                <Stack
                    spacing={2}>
                    <Button
                        fullWidth
                        variant="outlined"
                        color="primary">
                        Invite a friend
                    </Button>
                    <Button
                        fullWidth
                        variant="outlined"
                        color="primary">
                        Report issue
                    </Button>
                </Stack>

            </Box>

        </Container>

    )
}