import { Alert, Box, Button, CircularProgress, Container, Snackbar, Typography } from "@mui/material"
import { RequestForm } from "../request/RequestForm"
import { useRef, useState } from "react";
import { usePostRequest } from "../api/requests";



export const CreateRequest = () => {

    const [message, setMessage] = useState(null);
    const formRef = useRef();


    const postRequest = usePostRequest();
    const onSubmit = (data) => {
        postRequest.mutate(data, {
            onSuccess: () => {
                setMessage('Request created successfully');
                formRef.current?.reset();
            },
            onError: (error) => {
                setMessage(error.message);
            }
        });
    }


    return (
        <Container>
            <Typography variant="h2">Create a new request</Typography>
            <RequestForm onSubmit={onSubmit}
                ref={formRef} />
            <Box sx={{
                my: 5,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                {postRequest.isLoading && <CircularProgress />}
                {!postRequest.isLoading &&
                    <Button variant="contained"
                        color="primary"
                        onClick={() => formRef.current.submit()}>
                        Submit
                    </Button>
                }


            </Box>


            <Snackbar open={Boolean(message)}
                autoHideDuration={6000}
                onClose={() => setMessage(null)}>
                <Alert onClose={() => setMessage(null)}
                    severity="success"
                    sx={{ width: '100%' }}>
                    {message}
                </Alert>
            </Snackbar>
        </Container>
    )

}