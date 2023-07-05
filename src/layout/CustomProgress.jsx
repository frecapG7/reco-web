import { Box, CircularProgress, TableBody, TableCell, TableRow } from "@mui/material"



export const CustomProgress = ({ variant }) => {

    switch (variant) {
        case "table-body":
            return (
                <TableBody>
                    <TableRow>
                        <TableCell>
                            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                                <CircularProgress />
                            </Box>
                        </TableCell>
                    </TableRow>
                </TableBody>
            );
        default:
            return (
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <CircularProgress />
                </Box>
            );
    }


}