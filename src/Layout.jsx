import { AppBar, IconButton, Toolbar, Typography } from "@mui/material";

export const Layout = ({ children }) => {



    return (
        <div>
            <AppBar position="fixed">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Recoco
                    </Typography>
                    <IconButton color="inherit">
                        user
                    </IconButton>
                    <IconButton color="inherit">
                        logout
                    </IconButton>
                </Toolbar>
            </AppBar>

            <div style={{ marginTop: '64px' }}>
                {children}
            </div>
        </div>
    )
}