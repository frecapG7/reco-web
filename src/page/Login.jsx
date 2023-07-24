import { Box, Button, Container, Stack, Typography } from "@mui/material"
import { FormText } from "../form/FormText"
import { useForm } from "react-hook-form";
import { FormPassword } from "../form/FormPassword";


export const Login = () => {


    const { control, reset, handleSubmit } = useForm();


    return (
        <Container>
            <Typography variant="h4"
                component="h1"
                align="center"
                gutterBottom>
                Login
            </Typography>
            <form>
                <Stack spacing={2}>
                    <FormText
                        name="username"
                        label="Username"
                        control={control}
                        rules={{ required: true }}
                    />
                    <FormPassword
                        name="password"
                        label="Password"
                        control={control}
                        rules={{ required: true }}
                    />
                    <Box textAlign="center">
                        <Button variant="contained"
                            color="primary"
                            type="submit">
                            Login
                        </Button>
                    </Box>
                </Stack>
            </form>

        </Container>
    )
}