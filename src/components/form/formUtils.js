

export const getFormatLabel = (label, required) => {
    return required ? `${label} *` : label;
}


export const errorMessage = (error) => {

    if (Boolean(error?.message))
        return error.message

    switch (error?.type) {
        case "required":
            return "This field is required"
        case "minLength":
            return `This field must be at least ${error?.types?.minLength?.value} characters long`
        case "maxLength":
            return `This field must be at most ${error?.types?.maxLength?.value} characters long`
        case "min":
            return `This field must be at least ${error?.types?.min?.value}`
        case "pattern":
            return "Invalid format"
        default:
            return ""
    }

}