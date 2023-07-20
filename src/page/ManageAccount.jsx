import { Box, Button, Container, Grid, IconButton, Paper, Stack, Typography } from "@mui/material"
import { Layout } from "../layout/Layout"

import EditIcon from "@mui/icons-material/Edit";





export const ManageAccount = () => {

    return (
        <Layout>
            <Container>
                <Box display="flex"
                    justifyContent="center"
                    alignItems="center">
                    <Typography variant="h1">
                        Manage Account
                    </Typography>
                </Box>

                {/** Personnal informations */}
                <Paper>
                    <Grid container>
                        <Grid item
                            container
                            justifyContent="space-between">
                            <Typography variant="h4">
                                Account informations
                            </Typography>
                            <IconButton>
                                <EditIcon />
                            </IconButton>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="body1">
                                Username : frecap
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

                <Box my={10}>
                    <Stack
                        spacing={5}>
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

        </Layout>
    )
}