import { Accordion, AccordionDetails, AccordionSummary, Box, Container, Grid, Paper, Typography } from "@mui/material";
import { useGetRequest } from "../api/requests";
import { useParams } from "react-router-dom";
import { Enum } from "../utils/Enum";
import { Recommendations } from "../recommendation/Recommendations";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Layout } from "../layout/Layout";


export const RequestDetails = () => {


    const { id } = useParams();
    const { data: request, isLoading, error } = useGetRequest(id);



    if (isLoading) return <div>Loading...</div>

    if (error) return <div>{error.message}</div>

    return (
        <Layout>
            <Paper elevation={2}
                square>
                <Box justifyContent="center"
                    alignItems="center">
                    <Typography variant="title">
                        <Enum value={request.requestType} enumName="REQUEST_TYPE" />
                    </Typography>
                </Box>


                <Accordion>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography variant="subtitle1">
                            Description
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Paper>
                            <Typography variant="body" paragraph>
                                {request.description}
                            </Typography>
                        </Paper>
                    </AccordionDetails>

                </Accordion>



            </Paper>

            <Paper elevation={2} sx={{
                mt:5
            }}>
                <Typography variant="title">
                    Previous responses
                </Typography>
                <Recommendations request={request} />

            </Paper>



        </Layout>
    );




}
