import { Typography } from "@mui/material"
import { Enum } from "../utils/Enum"



export const RequestType = ({ requestType }) => {
    switch (requestType) {
        case 'BOOK':
            return <Typography color="success">
                <Enum value={requestType} enumName="REQUEST_TYPE" />
            </Typography>
        case 'MOVIE':
            return <Typography color="info">
                <Enum value={requestType} enumName="REQUEST_TYPE" />
            </Typography>
        case 'TV_SHOW':
            return <Typography color="warning">
                <Enum value={requestType} enumName="REQUEST_TYPE" />
            </Typography>

        default:
            return <Typography color="error">
                <Enum value={requestType} enumName="REQUEST_TYPE" />
            </Typography>
    }

}