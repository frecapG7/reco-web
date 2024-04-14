import { createTheme } from "@mui/material";

let theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#ddb5e3",
      contrastText: "#fff",
    },
    secondary: {
      main: "#fccfd8",
      contrastText: "#1a73e8",
    },
    background: {
      default: "#bc4749",
      contrastText: "#fff",
    },
  },
});

const {
  breakpoints,
  typography: { pxToRem },
} = theme;
theme = createTheme(theme, {
  typography: {
    h1: {
      fontSize: pxToRem(40),
      [breakpoints.up("sm")]: {
        fontSize: pxToRem(48),
      },
      [breakpoints.up("md")]: {
        fontSize: pxToRem(56),
      },
    },
    h2: {
      fontSize: pxToRem(32),
      [breakpoints.up("sm")]: {
        fontSize: pxToRem(40),
      },
      [breakpoints.up("md")]: {
        fontSize: pxToRem(48),
      },
    },
    h3: {
      fontSize: pxToRem(28),
      [breakpoints.up("sm")]: {
        fontSize: pxToRem(32),
      },
      [breakpoints.up("md")]: {
        fontSize: pxToRem(40),
      },
    },
  },
});

theme = createTheme(theme, {
  components: {
    MuiButton: {
      styleOverrides: {
        root: {},
        outlined: {
          boxShadow: "none",
          borderRadius: 20,
        },
      },
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
          },
        },
      ],
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          width: 240,
          backgroundColor: theme.palette.primary.main,
          boxSizing: "border-box",
        },
      },
    },
  },
});

export default theme;
