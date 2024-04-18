import { createTheme } from "@mui/material";

let theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#ddb5e3",
      light: "#f1d4f5",
      dark: "#a48cb8",
      contrastText: "#fff",
    },
    secondary: {
      main: "#fccfd8",
      light: "#ffe3ea",
      dark: "#c99ba6",
      contrastText: "#1a73e8",
    },
    background: {
      default: "#ffe3ea",
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
    title: {
      fontSize: pxToRem(24),
      [breakpoints.up("sm")]: {
        fontSize: pxToRem(28),
      },
    },
    button: {
      fontSize: pxToRem(16),
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
          padding: 5,
        },
        contained: {
          boxShadow: "none",
          borderRadius: 20,
          padding: 5,
          ...theme.typography.button,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          padding: 20,
          backgroundColor: theme.palette.secondary.main,
          borderRadius: 20,
        },
      },
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
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: 20,
          padding: 15,
          boxShadow: theme.shadows[5],
          borderColor: theme.palette.secondary.main,
          backgroundColor: theme.palette.background.default,
        },
      },
    },
    MuiDialogContent: {
      styleOverrides: {
        root: {
          padding: 20,
          minHeight: 200,
          marginBottom: 20,
          backgroundColor: theme.palette.background.default,
        },
      },
    },
    MuiDialogTitle: {
      styleOverrides: {
        root: {
          ...theme.typography.h4,
          backgroundColor: theme.palette.primary.default,
          padding: 20,
        },
      },
    },
    MuiDialogActions: {
      styleOverrides: {
        root: {},
      },
    },
  },
});

export default theme;
