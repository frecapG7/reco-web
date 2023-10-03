import { Stack } from "@mui/material";
import { forwardRef, useImperativeHandle } from "react";
import { useForm } from "react-hook-form";
import { FormPassword } from "../form/FormPassword";
import { FormText } from "../form/FormText";



export const LoginForm = forwardRef(({onSubmit}, ref) => {


    const { control, reset, handleSubmit } = useForm();



    useImperativeHandle(ref, () => ({
        submit: handleSubmit(onSubmit),
        reset: reset
    }));
    

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2}>
            <FormText
                name="name"
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
        </Stack>
    </form>
    )

});