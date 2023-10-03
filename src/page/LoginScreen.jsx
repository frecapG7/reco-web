import { Box, Button, CircularProgress, Container, Paper, Stack } from "@mui/material"
import { useLogin } from "../hooks/api/auth";
import { useNavigate } from "react-router-dom";
import { LoginForm } from "../component/LoginForm";
import { useRef } from "react";


export const LoginScreen = () => {

    const navigate = useNavigate();

    const formRef = useRef();
    const login = useLogin();

    const onSubmit = (data) => {
        login.mutate(data, {
            onSuccess: () => {
                navigate("../requests");
            },
            onError: (error) => {
                console.log(error);
            }
        });
    }


    return (
        <Container>
            <Paper sx={{
                m: 5,
                p: 2
            }}>
                <Stack spacing={2}>

                    <LoginForm onSubmit={onSubmit} ref={formRef} />
                    <Box textAlign="center">
                        {login.isLoading && <CircularProgress />}
                        {!login.isLoading &&
                            <Button variant="contained"
                                color="primary"
                                onClick={() => formRef.current?.submit()}>
                                Login
                            </Button>
                        }

                    </Box>
                </Stack>
            </Paper>


        </Container>
    )
}