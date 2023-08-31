import { createTheme } from "@mui/material/styles";

const darkTheme = createTheme({
  palette: {
    mode: "dark",

    primary: {
      light: "#2d3035",
      hover: "#2d3035",
      main: "#24262b",
    },

    text: {
      primary: "#98a7b5",
      disabled: "#acacbe",
      icon: "#98a7b5",
    },
  },

  typography: {
    fontFamily: "'Segoe UI', 'Roboto', 'Helvetica','Arial', sans-serif",
    h3: {
      fontFamily: "'Segoe UI', 'Roboto', 'Helvetica','Arial', sans-serif",
    },
  },

  custom: {
    backgroundColor: "#24262b",
  },

  sidebar: {
    backgroundColor: "#1c1e22",
    color: "#98a7b5",
  },

  menu: {
    menuContent: "#082440",
    icon: "#67707b",
    hover: {
      backgroundColor: "#00458b",
      color: "#b6c8d9",
    },
    disabled: {
      color: "#3e5e7e",
    },
  },
});

export default darkTheme;
