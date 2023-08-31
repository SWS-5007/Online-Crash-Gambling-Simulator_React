import React, { useEffect, useState, useRef } from "react";
import Axios from "axios";
import io from "socket.io-client";
import { v4 as uuidv4 } from "uuid";

import { useSelector, useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";

import { Box } from "@mui/material";

import { SidebarComponent } from "../../Components/Sidebar";
import { LogInUpComponent } from "../../Components/LogInUp";

import { setUserData, setBetActive, setLiveBettingTable } from "../../Store";

const Layout = ({ isDarkMode, toggleTheme }) => {
  const dispatch = useDispatch();

  const userData = useSelector((state) => state.user.userData);

  const API_BASE = "http://localhost:4000";

  // Socket.io setup
  useEffect(() => {
    const socket = io.connect("http://localhost:3001");

    socket.on("stop_multiplier_count", function (data) {
      dispatch(setBetActive(false));
    });

    // socket.on("update_user", function (data) {
    //   getUser();
    // });

    return () => {
      socket.disconnect();
    };
  }, []);

  // const getUser = () => {
  //   Axios({
  //     method: "GET",
  //     withCredentials: true,
  //     url: API_BASE + "/user",
  //   }).then((res) => {
  //     dispatch(setUserData(res.data));
  //   });
  // };

  return (
    <Box
      className="Layout"
      sx={{ display: "flex", width: "100%", height: "100%" }}
    >
      <SidebarComponent isDarkMode={isDarkMode} toggleTheme={toggleTheme} />

      {/* //////////////////////Main Content////////////////////////////// */}
      <Box component="main" sx={{ flexGrow: 1 }}>
        <LogInUpComponent />

        <Box sx={{ marginTop: "30px" }}></Box>

        <Outlet />
      </Box>
    </Box>
  );
};

export default Layout;
