import { createTheme, responsiveFontSizes } from "@mui/material";

let theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#ddb5e3",
      light: "#FFD8F2",
      dark: "#a48cb8",
      contrastText: "#1F4529",
    },
    secondary: {
      main: "#4a9e48",
      light: "#96FF96",
      dark: "#2CB419",
      contrastText: "#8174A0",
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
      light: "#f8f8f8",
    },
    neutral: {
      main: "#f1f1f1",
    },
    cancel: {
      main: "#f44336",
    },
    white: "#fff",
    yellow: {
      main: "#fcf424",
    },
    diamond: {
      main: "#3fb1d3",
    },
  },
});

const {
  breakpoints,
  typography: { pxToRem },
} = theme;
theme = createTheme(theme, {
  palette: {
    currency: {
      main: theme.palette.yellow.main,
    },
    book: {
      light: "#A7E6FF",
      main: "#3ABEF9",
      dark: "#050C9C",
    },
    song: {
      light: "#A9C46C",
      main: "#809D3C",
      dark: "#5D8736",
    },
    movie: {
      light: "#FF8A08",
      main: "#FF6500",
      dark: "#C40C0C",
    },
  },
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
      fontFamily: "Roboto, Arial",
      fontSize: pxToRem(10),
      fontWeight: "bold",
      [breakpoints.up("sm")]: {
        fontSize: pxToRem(18),
      },
      color: theme.palette.text.primary.contrastText,
    },
  },
});

theme = createTheme(theme, {
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          fontSize: "1rem",
          textTransform: "none",
          borderRadius: 10,
          [theme.breakpoints.down("sm")]: {
            minWidth: "8rem",
          },
          [theme.breakpoints.up("sm")]: {
            minWidth: "10rem",
          },
        },
        outlined: {
          boxShadow: "none",
          color: theme.palette.secondary.main,
          ...theme.typography.button,
        },
        outlinedSecondary: {
          backgroundColor: theme.palette.neutral.main,
        },
        contained: {
          boxShadow: "none",
          ...theme.typography.button,
        },
        containedPrimary: {
          background: `repeating-conic-gradient(${theme.palette.secondary.light} 0%,${theme.palette.primary.light} 15%,${theme.palette.primary.main} 33%)`,
        },
      },
    },
    MuiIconButton: {
      root: {
        styleOverrides: {},
      },
      variants: [
        {
          props: { variant: "contained" },
          style: {
            backgroundColor: theme.palette.primary.main,
            background: "linear-gradient(45deg, #ddb5e3 30%,#4a9e48 90%)",
            // color: theme.palette.secondary.dark,
            "&:hover": {
              backgroundColor: theme.palette.primary.dark,
            },
          },
        },
        {
          props: { variant: "outlined" },
          style: {
            backgroundColor: theme.palette.background.default,
            color: theme.palette.primary.dark,
            borderRadius: "50%",
            border: `2px solid ${theme.palette.primary.main}`,
          },
        },
      ],
    },
    MuiIcon: {
      variants: [
        {
          props: { variant: "contained" },
          style: {
            [theme.breakpoints.down("xs")]: {
              minWidth: 50,
              minHeight: 50,
            },
            [theme.breakpoints.up("xs")]: {
              minWidth: 60,
              minHeight: 60,
            },
            [theme.breakpoints.up("sm")]: {
              minWidth: 70,
              minHeight: 70,
            },

            borderRadius: "50%",
            alignItems: "center",
            display: "flex",
            justifyContent: "center",
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.secondary.dark,
          },
        },
        {
          props: { variant: "outlined" },
          style: {
            borderRadius: "50%",
            backgroundColor: theme.palette.background.default,
            color: theme.palette.primary.contrastText,
            border: `3px solid ${theme.palette.secondary.main}`,
          },
        },
      ],
    },
    MuiToggleButton: {
      styleOverrides: {
        root: {
          "&.Mui-selected": {
            backgroundColor: theme.palette.primary.main,
            "&:hover": {},
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          padding: 5,
          backgroundColor: theme.palette.neutral.main,
          borderRadius: 10,
        },
      },
      variants: [
        {
          props: { variant: "outlined" },
          style: {
            borderRadius: 0,
            boxShadow: "none",
            borderStyle: "inset",
            borderColor: theme.palette.primary.main,
            padding: 20,
          },
        },
        {
          props: { variant: "brutalist1" },
          style: {
            borderTop: "5px solid",
            borderRight: "5px solid",
            borderColor: theme.palette.primary.main,
            paddingTop: 20,
            paddingRight: 20,
            paddingLeft: 0,
            borderRadius: 2,
            backgroundColor: theme.palette.background.default,
            height: "100%",
          },
        },
        {
          props: { variant: "brutalist2" },
          style: {
            borderBottom: "2px solid",
            borderLeft: "2px solid",
            borderColor: theme.palette.primary.main,
            paddingBottom: 5,
            paddingLeft: 5,
            borderRadius: 2,
            backgroundColor: theme.palette.background.default,
            ":after": {
              width: "50%",
            },
          },
        },
      ],
    },
    // MuiDrawer: {
    //   styleOverrides: {
    //     paper: {
    //       // width: 240,
    //       backgroundColor: "inherit",
    //       // boxSizing: "border-box",
    //     },
    //   },
    // },
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
          display: "flex",
          flexDirection: "column",
          padding: 20,
          // minHeight: 200,
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
          // backgroundColor: theme.palette.white,
        },
      },
    },
    MuiFilledInput: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          backgroundColor: theme.palette.primary.light,
          "&:focus": {
            backgroundColor: theme.palette.primary.main,
          },
        },
      },
    },
    MuiAvatar: {
      styleOverrides: {
        root: {
          // width: "10vh",
          // height: "10vh",
        },
      },
      variants: [
        {
          props: { variant: "contained" },
          style: {
            // borderRadius: 20,
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.primary.contrastText,
          },
        },
      ],
    },
    MuiAccordion: {
      styleOverrides: {
        root: {
          backgroundColor: theme.palette.background.default,
        },
      },
    },

    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          backgroundColor: theme.palette.background.default,
        },
      },
      variants: [
        {
          props: { variant: "SONG" },
          style: {
            borderStyle: "inset",
            borderWidth: 3,
            borderColor: theme.palette.song.main,
          },
        },
        {
          props: { variant: "MOVIE" },
          style: {
            borderStyle: "inset",
            borderWidth: 5,
            borderColor: theme.palette.movie.main,
          },
        },
      ],
    },
    MuiCardHeader: {
      styleOverrides: {
        title: {
          fontWeight: "bold",
        },
      },
    },
    MuiListSubheader: {
      styleOverrides: {
        root: {
          backgroundColor: theme.palette.background.default,
          // color: theme.palette.primary.contrastText,
          fontWeight: "bold",
          fontSize: 24,
        },
      },
    },
    MuiListItemAvatar: {
      styleOverrides: {
        root: {
          "& .MuiAvatar-root": {
            width: 50,
            height: 50,
          },
        },
      },
    },
    MuiMenu: {
      styleOverrides: {
        paper: {
          borderRadius: 10,
          padding: 5,
          backgroundColor: theme.palette.background.default,
          minWidth: 200,
        },
      },
    },
    MuiTableRow: {
      styleOverrides: {
        hover: {
          cursor: "pointer",
        },
      },
    },
    MuiRadio: {
      styleOverrides: {
        root: {
          "&:hover": {
            transform: "scale(1.1)",
          },
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          "&.Mui-selected": {
            color: theme.palette.primary.main,
          },
          "&:hover": {
            color: theme.palette.primary.main,
          },
        },
      },
    },
    MuiBadge: {
      styleOverrides: {
        colorPrimary: {
          backgroundColor: theme.palette.primary.main,
          color: theme.palette.primary.contrastText,
          background: "linear-gradient(45deg,  #2CB419  , #ddb5e3 50%)",
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        filledSoundCloud: {
          backgroundColor: "#ff5d00",
          color: theme.palette.white,
        },
      },
    },
  },
  tiptap: {
    margin: 10000,
  },
});

theme = responsiveFontSizes(theme);
export default theme;
