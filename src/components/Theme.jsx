"use client";
import { ThemeProvider, createTheme } from "@mui/material";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700"],
});

const theme = createTheme({
  palette: {
    primary: {
      main: "#1C1C24",
    },
    secondary: {
      main: "#FAFAFB",
    },
    background: {
      main: "#000",
    },
    border: {
      main: "#44444F",
    },
    gray: {
      main: "#696974",
      light: "#92929D",
      dark: "#B5B5BE",
    },
    lightGray: {
      main: "#FAFAFB",
      dark: "#292932",
    },
    icon: {
      main: "#92929D",
    },
    blue: {
      main: "#0062FF",
    },
    green: {
      main: "#357A38",
    },
    progress: {
      main: "#3DD598",
    },
    error: {
      main: "#FC5A5A",
    },
    warning: {
      main: "#FF974A",
    },
    action: {
      disabledBackground: "#292932",
      disabled: "#92929D",
    },
  },
  typography: {
    fontFamily: [
      `${poppins.style.fontFamily}`,
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    button: {
      textTransform: "none",
    },
  },
});

const Theme = ({ children }) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export { Theme };
