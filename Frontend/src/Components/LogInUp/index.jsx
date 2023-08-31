import React, { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import Axios from "axios";
import io from "socket.io-client";
import { Box, Button, Typography, useTheme } from "@mui/material";

import Modal from "./modal/Modal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Slide } from "react-toastify";

import "./styles.css";

import { setUserData } from "../../Store";

export const LogInUpComponent = ({}) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user.userData);

  const [registerUsername, setRegisterUsername] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [openModalLogin, setOpenModalLogin] = useState(false);
  const [authResponseMessage, setAuthResponseMessage] = useState("");
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [openModalRegister, setOpenModalRegister] = useState(false);

  const API_BASE = "http://localhost:4000";

  const register = () => {
    Axios({
      method: "POST",
      data: {
        username: registerUsername,
        password: registerPassword,
      },
      withCredentials: true,
      url: API_BASE + "/register",
    }).then((res) => {
      setAuthResponseMessage(res.data);
      if (res.data == "Username already exists") {
        return;
      }

      Axios({
        method: "POST",
        data: {
          username: registerUsername,
          password: registerPassword,
        },
        withCredentials: true,
        url: API_BASE + "/login",
      }).then((res) => {
        setAuthResponseMessage(res.data);
        getUser();

        if (res.data === "Login Successful") {
          setOpenModalRegister(false);
          registerAndLoginToast();
        }
      });
    });
  };

  const login = () => {
    Axios({
      method: "POST",
      data: {
        username: loginUsername,
        password: loginPassword,
      },
      withCredentials: true,
      url: API_BASE + "/login",
    }).then((res) => {
      setAuthResponseMessage(res.data);
      getUser();

      if (res.data === "Login Successful") {
        setOpenModalLogin(false);
        loginToast();
      }
    });
  };

  const logout = () => {
    Axios.get(API_BASE + "/logout", {
      withCredentials: true,
    }).then((res) => {
      getUser();
      logoutToast();
    });
  };

  const getUser = () => {
    Axios({
      method: "GET",
      withCredentials: true,
      url: API_BASE + "/user",
    }).then((res) => {
      dispatch(setUserData(res.data));
    });
  };

  // Define Toasts
  const loginToast = () => {
    toast.success("Login Successful", {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Slide,
    });
  };

  const logoutToast = () => {
    toast.success("You have been logged out", {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Slide,
    });
  };

  const registerAndLoginToast = () => {
    toast.info("Account Created and Logged In", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Slide,
    });
  };

  return (
    <div style={{ borderBottom: "1px solid" }}>
      <div>
        <ToastContainer />

        <Modal trigger={openModalLogin} setTrigger={setOpenModalLogin}>
          <div className="login-modal">
            <div>
              {authResponseMessage ? (
                <p className="err-msg">{authResponseMessage}</p>
              ) : (
                ""
              )}
              <h1>Login</h1>
            </div>
            <div className="form-group">
              <label>Username: </label>
              <input
                className="modal-input"
                placeholder="Enter your username"
                onChange={(e) => setLoginUsername(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Password:</label>
              <input
                className="modal-input"
                placeholder="Enter your password"
                onChange={(e) => setLoginPassword(e.target.value)}
              />
            </div>
            <div>
              <button className="modal-submit" onClick={login}>
                Submit
              </button>
              <br />
            </div>
          </div>
        </Modal>
      </div>

      <div>
        <Modal trigger={openModalRegister} setTrigger={setOpenModalRegister}>
          <div className="login-modal">
            <div>
              {authResponseMessage ? (
                <p className="err-msg">{authResponseMessage}</p>
              ) : (
                ""
              )}
              <h1>Register</h1>
            </div>
            <div className="form-group">
              <label>Username: </label>
              <input
                className="modal-input"
                placeholder="Enter your username"
                onChange={(e) => setRegisterUsername(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Password:</label>
              <input
                className="modal-input"
                placeholder="Enter your password"
                onChange={(e) => setRegisterPassword(e.target.value)}
              />
            </div>
            <div>
              <button className="modal-submit" onClick={register}>
                Submit
              </button>
              <br />
            </div>
            {registerUsername !== "" && registerUsername.length < 3 ? (
              <span className="register_errors">
                Username must have at least 3 characters
              </span>
            ) : (
              ""
            )}{" "}
            <br />
            {registerPassword !== "" && registerPassword.length < 3 ? (
              <span className="register_errors">
                Password must have at least 3 characters
              </span>
            ) : (
              ""
            )}
          </div>
          <div></div>
        </Modal>
      </div>

      <nav className="navbar">
        <div className="container">
          <span className="logo">Crash Gambling Simulator</span>
          <ul className="nav">
            {userData && userData !== "No User Authentication" ? (
              <>
                <li>User: {userData.username}</li>
                <li>Balance: </li>
                {/* <li>Balance: {userData.balance.toFixed(2)}</li> */}
                <li>
                  <a href="#" onClick={logout}>
                    Logout
                  </a>
                </li>
              </>
            ) : (
              <>
                <li>
                  <a
                    href="#"
                    onClick={() => {
                      setOpenModalLogin(true);
                      setAuthResponseMessage("");
                    }}
                  >
                    Login
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    onClick={() => {
                      setOpenModalRegister(true);
                      setAuthResponseMessage("");
                    }}
                  >
                    Register
                  </a>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>
    </div>
  );
};
