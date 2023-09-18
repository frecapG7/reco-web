import { Checkbox, FormControlLabel, Typography } from "@mui/material"
import { Controller } from "react-hook-form"





export const FormCheckbox = ({ name, label, control, ...props }) => {



    return (
        <Controller
            name={name}
            control={control}
            render={({ field: { onChange, onBlur, value, ref } }) => (
                <>
                    <Typography variant="label">{label}</Typography>
                    <Checkbox checked={Boolean(value)}
                        color="primary"
                        onChange={onChange}
                        onBlur={onBlur}
                        inputRef={ref}
                    />
                </>

            )}


        />
    )
}