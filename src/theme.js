import { createTheme, responsiveFontSizes } from "@mui/material";

let theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#ddb5e3",
      light: "#EFE5F5",
      dark: "#a48cb8",
      contrastText: "#fff",
    },
    secondary: {
      main: "#80B484",
      light: "#91B4AA",
      dark: "#2CB419",
      contrastText: "#1a73e8",
    },
    tertiary: {
      main: "#f1f1f1",
      light: "#f8f8f8",
      dark: "#e0e0e0",
      contrastText: "#333",
    },
    background: {
      default: "#EFE5F5",
      contrastText: "#fff",
    },
    white: "#fff",
    yellow: "#fcf424",
  },
});

const {
  breakpoints,
  typography: { pxToRem },
} = theme;
theme = createTheme(theme, {
  typography: {
    h1: {
      fontWeight: 600,
      fontFamily: "Poppins",
      fontSize: pxToRem(40),
      [breakpoints.up("sm")]: {
        fontSize: pxToRem(48),
      },
      [breakpoints.up("md")]: {
        fontSize: pxToRem(56),
      },
    },
    h2: {
      fontWeight: 600,
      fontFamily: "Poppins",
      fontSize: pxToRem(32),
      [breakpoints.up("sm")]: {
        fontSize: pxToRem(40),
      },
      [breakpoints.up("md")]: {
        fontSize: pxToRem(48),
      },
    },
    h3: {
      fontWeight: 600,
      fontFamily: "Roboto, Arial",
      fontSize: pxToRem(28),
      [breakpoints.up("sm")]: {
        fontSize: pxToRem(32),
      },
      [breakpoints.up("md")]: {
        fontSize: pxToRem(40),
      },
    },
    title: {
      fontWeight: 600,
      fontFamily: "Roboto, Arial",
      fontSize: pxToRem(28),
      [breakpoints.up("sm")]: {
        fontSize: pxToRem(28),
      },
    },
    button: {
      fontWeight: 600,
      fontFamily: "Roboto, Arial",
      fontSize: pxToRem(16),
      [breakpoints.up("sm")]: {
        fontSize: pxToRem(18),
      },
      color: theme.palette.text.primary,
    },
  },
});

theme = createTheme(theme, {
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          minWidth: 200,
        },
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
          backgroundColor: theme.palette.secondary.white,
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
          marginTop: 20,
          marginBottom: 20,
          backgroundColor: theme.palette.background.default,
        },
      },
    },
    MuiDialogTitle: {
      styleOverrides: {
        root: {
          ...theme.typography.title,
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
    MuiFormControl: {
      styleOverrides: {
        root: {
          marginBottom: 5,
          marginTop: 5,
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          // padding: 5,
          borderRadius: 10,
          // border: `1px solid ${theme.palette.primary.main}`,
          backgroundColor: theme.palette.white,
        },
      },
    },
  },
});

theme = responsiveFontSizes(theme);
export default theme;
