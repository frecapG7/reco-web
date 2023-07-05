import { Box, TableBody, TableCell, TableRow, Typography } from "@mui/material";

export const CustomError = ({ variant }) => {

    switch (variant) {
        case "table-body":
            return (
                <TableBody>
                    <TableRow>
                        <TableCell>
                            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                                <Typography variant='error'>Error</Typography>
                            </Box>
                        </TableCell>
                    </TableRow>
                </TableBody>
            );
        default:
            return (
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Typography variant='error'>Error</Typography>
                </Box>
            );
    }
}