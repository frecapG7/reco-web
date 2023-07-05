import { FormControl, InputLabel, MenuItem, Select } from "@mui/material"
import { useController } from "react-hook-form"
import { getFormatLabel } from "./formUtils"



export const FormSelect = ({ name, label, control, options, rules, ...rest }) => {


    const {
        field: { ref, value, onChange, onBlur },
        fieldState: { invalid, error },
    } = useController({
        name,
        control,
        defaultValue: '',
        rules
    });

    const formatLabel = getFormatLabel(label, rules?.required);
    debugger

    return (
        <FormControl fullWidth>
            <InputLabel>{formatLabel}</InputLabel>
            <Select
                label={formatLabel}
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                inputRef={ref}>
                {options.map((item, index) => (
                    <MenuItem key={index.value}
                        value={item.value}>
                        {item.label}
                    </MenuItem>
                ))}
            </Select>

        </FormControl>
    )



}