import { Box, Button, Container } from "@mui/material"
import { RequestForm } from "../request/RequestForm"
import { useRef } from "react";



export const CreateRequest = () => {

    const formRef = useRef();

    const onSubmit = (data) => {
        console.log(data);
    }


    return (
        <Container>
            <h1>Create Request</h1>
            <RequestForm onSubmit={onSubmit}
                ref={formRef} />
            <Box sx={{
                my: 5,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <Button variant="contained"
                    color="primary"
                    onClick={() => formRef.current.submit()}>
                    Submit
                </Button>

            </Box>



        </Container>
    )

}