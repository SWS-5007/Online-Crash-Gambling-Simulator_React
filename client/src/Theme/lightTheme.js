import { createTheme } from "@mui/material/styles";

const lightTheme = createTheme({
  palette: {
    mode: "light",

    primary: {
      light: "#2d3035",
      hover: "#eaecf3",
      main: "#f6f7fa",
    },

    text: {
      primary: "#9fa5ac",
      disabled: "#acacbe",
      icon: "#9fa5ac",
    },
  },

  typography: {
    fontFamily: "'Segoe UI', 'Roboto', 'Helvetica','Arial', sans-serif",
    h3: {
      fontFamily: "'Segoe UI', 'Roboto', 'Helvetica','Arial', sans-serif",
    },
  },

  custom: {
    backgroundColor: "#f6f7fa",
  },

  sidebar: {
    backgroundColor: "#fefefe",
    color: "#9fa5ac",
  },

  menu: {
    menuContent: "#082440",
    icon: "#67707b",
    hover: {
      backgroundColor: "#eaecf3",
      color: "black",
    },
    disabled: {
      color: "#3e5e7e",
    },
  },
});

export default lightTheme;
