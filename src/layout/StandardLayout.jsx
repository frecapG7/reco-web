import { AppBar, Box, IconButton, Toolbar, Typography } from "@mui/material";





export const StandardLayout = ({ children }) => {


    return (
        <div>
            <AppBar position="fixed"
                sx={{
                    bgColor: 'background.default',
                    color: 'primary'
                }} enableColorOnDark>
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Recoco
                    </Typography>
                </Toolbar>
            </AppBar>

            <Box component="main"
                sx={{
                    flexGrow: 1,
                }}>
                <Toolbar />
                {children}
            </Box>
        </div>
    );

}