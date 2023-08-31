import React, { useState } from "react";
import {
  Sidebar,
  Menu,
  MenuItem,
  SubMenu,
  menuClasses,
} from "react-pro-sidebar";

import { Box, Button, Typography, useTheme } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CasinoIcon from "@mui/icons-material/Casino";
import SportsBasketballIcon from "@mui/icons-material/SportsBasketball";
import NightlightIcon from "@mui/icons-material/Nightlight";
import WbSunnyIcon from "@mui/icons-material/WbSunny";

import { BtnCustom } from "../MuiComponents/Btn_Custom";

import "./styles.css";

// hex to rgba converter
const hexToRgba = (hex, alpha) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);

  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

export const SidebarComponent = ({ isDarkMode, toggleTheme }) => {
  const theme = useTheme();

  const [collapsed, setCollapsed] = useState(false);
  const [toggled, setToggled] = useState(false);
  const [hasImage, setHasImage] = useState(false);

  // handle on theme change event
  const handleThemeChange = (status) => {
    toggleTheme(status);
  };

  // handle on image change event
  const handleImageChange = (e) => {
    setHasImage(e.target.checked);
  };

  const handleCollapse = () => {
    setCollapsed(!collapsed);

    const newCollapsed = !collapsed;
    if (newCollapsed === true) {
    }
  };

  return (
    <Sidebar
      className="sidebar"
      collapsed={collapsed}
      toggled={toggled}
      onBackdropClick={() => setToggled(false)}
      image="https://user-images.githubusercontent.com/25878302/144499035-2911184c-76d3-4611-86e7-bc4e8ff84ff5.jpg"
      breakPoint="md"
      backgroundColor={hexToRgba(
        theme.sidebar.backgroundColor,
        hasImage ? 0.9 : 1
      )}
      rootStyles={{
        color: theme.sidebar.color,
      }}
      style={{
        border: "none",
      }}
    >
      <Box className="sidebar_header">
        <Button
          className="sidebar_header_menu_btn"
          onClick={() => handleCollapse()}
          sx={{
            minWidth: "0px",
            backgroundColor: theme.palette.primary.main,
            padding: "12px 15px",
            ":hover": {
              backgroundColor: theme.palette.primary.hover,
            },
          }}
        >
          <MenuIcon sx={{ fontSize: "20px", color: theme.sidebar.color }} />
        </Button>
      </Box>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
          padding: "20px 10px",
        }}
      >
        <Box sx={{ flex: 1, marginBottom: "32px" }}>
          <Menu>
            <SubMenu
              className="sidebar_submenu"
              label="Casino"
              icon={<CasinoIcon />}
              style={{
                backgroundColor: theme.palette.primary.main,
              }}
            >
              <MenuItem> Picks For You</MenuItem>
              <MenuItem> Favorites</MenuItem>
              <MenuItem> Recent</MenuItem>
            </SubMenu>

            <SubMenu
              className="sidebar_submenu"
              label="Sports"
              icon={<SportsBasketballIcon />}
            >
              <MenuItem> Live Events</MenuItem>
              <MenuItem> Soccer</MenuItem>
            </SubMenu>
          </Menu>

          {/* <Box className="sidebar_item">Lottery</Box>

          <Box className="sidebar_item">Bingo</Box> */}
        </Box>

        <Box
          className="sidebar_darklight_btn_box"
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <BtnCustom
            onClick={() => handleThemeChange(true)}
            sx={{
              backgroundColor: `${
                isDarkMode
                  ? theme.palette.primary.light
                  : theme.palette.primary.main
              }`,
              padding: "12px 20px",
            }}
          >
            <NightlightIcon />
            Dark
          </BtnCustom>

          <BtnCustom
            onClick={() => handleThemeChange(false)}
            sx={{
              backgroundColor: `${
                isDarkMode
                  ? theme.palette.primary.main
                  : theme.palette.primary.light
              }`,
              padding: "12px 20px",
            }}
          >
            <WbSunnyIcon />
            Light
          </BtnCustom>
        </Box>
      </div>
    </Sidebar>
  );
};
