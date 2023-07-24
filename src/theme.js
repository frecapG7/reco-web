import { createTheme } from "@mui/material";


let theme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#1a73e8',
            contrastText: '#fff'
        },
        secondary: {
            main: '#fff',
            contrastText: '#1a73e8'
        },
        background: {
            default: '#fff'
        }
    },

});



const { breakpoints, typography: { pxToRem } } = theme;
theme = createTheme(theme, {
    typography: {
        h1: {
            fontSize: pxToRem(40),
            [breakpoints.up('sm')]: {
                fontSize: pxToRem(48),
            },
            [breakpoints.up('md')]: {
                fontSize: pxToRem(56),
            },
        },
        h2: {
            fontSize: pxToRem(32),
            [breakpoints.up('sm')]: {
                fontSize: pxToRem(40),
            },
            [breakpoints.up('md')]: {
                fontSize: pxToRem(48),
            },
        },
        h3: {
            fontSize: pxToRem(28),
            [breakpoints.up('sm')]: {
                fontSize: pxToRem(32),
            },
            [breakpoints.up('md')]: {
                fontSize: pxToRem(40),
            },
        },
    },
});


theme = createTheme(theme, {
    components: {
        MuiButton: {
            styleOverrides: {
                root: {

                },
                outlined: {
                    boxShadow: "none",
                    borderRadius: 20,
                }
            }
        },
        MuiPaper: {
            variants: [
                {
                    props: { variant: "outlined" },
                    style: {
                        borderRadius: 20,
                        boxShadow: "none",
                        border: "1px solid #e0e0e0",
                        borderColor: "#1a73e8",
                        padding: 20,
                        
                    }
                },
            ],
        }
    }
});



export default theme;