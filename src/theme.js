import { createTheme } from "@mui/material";


let theme = createTheme({
    palette: {
        mode:'light',
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



const {breakpoints, typography: {pxToRem}} = theme;
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



export default theme;