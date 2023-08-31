import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import { Box } from "@mui/material";
import "typeface-roboto";

import theme from "./theme";
import lightTheme from "./Theme/lightTheme";
import darkTheme from "./Theme/darkTheme";

import { NotFoundPage, Home } from "./Pages";

import Layout from "./Pages/Layout";

import "./App.css";

const routes = [
  {
    path: "*",
    component: <NotFoundPage />,
  },
];

function App() {
  const [isDarkMode, setIsDarkMode] = useState(true);

  const toggleTheme = (status) => {
    setIsDarkMode(status);
  };

  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <Box
        className="App"
        sx={{ backgroundColor: `${isDarkMode ? "#24262b" : "#f6f7fa"}` }}
      >
        <Routes>
          <Route
            path="/"
            element={
              <Layout isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
            }
          >
            <Route exact path="/" element={<Home />} />
          </Route>
        </Routes>
      </Box>
    </ThemeProvider>
  );
}

export default App;
