import { Checkbox, FormControl, FormControlLabel, Typography } from "@mui/material"
import { Controller, useController } from "react-hook-form"

export const FormCheckbox = ({ name, label, control, rules, ...props }) => {




    const {
        field: { onChange, value, onBlur, ref },
        fieldState: { invalid, error },
        formState: { isSubmitting }
    } = useController({
        name,
        control,
        rules: rules,
        defaultValue: false
    })

    return (
        <FormControl fullWidth>
            <FormControlLabel control={<Checkbox checked={Boolean(value)}
                color="primary"
                onChange={onChange}
                onBlur={onBlur}
            />}
                label={label}
            />
        </FormControl>
    )
}