import React, { useEffect, useState, useRef } from "react";
import Axios from "axios";
import io from "socket.io-client";

import { useSelector, useDispatch } from "react-redux";

import {
  Avatar,
  Box,
  Button,
  Divider,
  Typography,
  useTheme,
} from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import "./styles.css";
import { Slider } from "./Slider";
import { ChartComponent } from "./Chart";

import {
  setUserData,
  setBetActive,
  setLiveBettingTable,
  setCrashHistory,
} from "../../Store";

export const HomeComponent = () => {
  const theme = useTheme();

  const userData = useSelector((state) => state.user.userData);
  const betActive = useSelector((state) => state.bet.betActive);

  const liveBettingTable = useSelector((state) => state.bet.liveBettingTable);
  const liveBettingTableRef = useRef(liveBettingTable);

  const crashHistory = useSelector((state) => state.bet.crashHistory);
  const crashHistoryRef = useRef(crashHistory);

  const dispatch = useDispatch();

  const [globalTimeNow, setGlobalTimeNow] = useState(0);
  const [liveMultiplierSwitch, setLiveMultiplierSwitch] = useState(false);
  const [liveMultiplier, setLiveMultiplier] = useState("CONNECTING...");
  const [bBettingPhase, setbBettingPhase] = useState(false);
  const [bBetForNextRound, setbBetForNextRound] = useState(false);
  const [hookToNextRoundBet, setHookToNextRoundBet] = useState(false);
  const [tenNumbers, setTenNumbers] = useState([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
  const [gamePhaseTimeElapsed, setGamePhaseTimeElapsed] = useState();
  const [bettingPhaseTime, setBettingPhaseTime] = useState(-1);
  const [totalBetAmount, setTotalBetAmount] = useState(0);
  const [liveBetLists, setLiveBetLists] = useState([]);
  const [closedBetLists, setClosedBetLists] = useState([]);

  const [betAmount, setBetAmount] = useState(
    localStorage.getItem("local_storage_wager") || 100
  );

  const [autoPayoutMultiplier, setAutoPayoutMultiplier] = useState(
    localStorage.getItem("local_storage_multiplier") || 2
  );

  const [errorMessage, setErrorMessage] = useState("");

  const multiplierCount = useRef([]);
  const timeCount_xaxis = useRef([]);
  const realCounter_yaxis = useRef(5);

  const API_BASE = "http://localhost:4000";

  useEffect(() => {
    const socket = io.connect("http://localhost:3001");

    socket.on("start_multiplier_count", function (data) {
      setGlobalTimeNow(Date.now());
      setLiveMultiplierSwitch(true);
    });

    socket.on("stop_multiplier_count", function (data) {
      setLiveMultiplier(data);
      setLiveMultiplierSwitch(false);
    });

    socket.on("start_betting_phase", function (data) {
      setGlobalTimeNow(Date.now());
      setLiveMultiplier("Starting...");
      setbBettingPhase(true);
      setHookToNextRoundBet(true);
      dispatch(setLiveBettingTable([]));

      multiplierCount.current = [];
      timeCount_xaxis.current = [];
    });

    socket.on("receive_live_betting_table", (data) => {
      const parseData = JSON.parse(data);
      liveBettingTableRef.current = parseData;

      setTenNumbers(Array(10 - parseData.length).fill(2));
    });

    socket.on("crash_history", function (data) {
      let prevCrashHistory = [...crashHistoryRef.current];
      let crashColor = "red";

      if (data[0] >= 1 && data[0] < 2) {
        crashColor = "red";
      } else if (data[0] >= 2 && data[0] < 10) {
        crashColor = "green";
      } else if (data[0] >= 10) {
        crashColor = "yellow";
      }

      const newElement = {
        crashKey: prevCrashHistory.length + 1,
        crash: data[0],
        crashColor: crashColor,
      };

      prevCrashHistory.push(newElement);
      crashHistoryRef.current = prevCrashHistory;
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    dispatch(setCrashHistory(crashHistoryRef.current));
  }, [crashHistoryRef.current]);

  useEffect(() => {
    const currentLiveBettingDatas = liveBettingTableRef.current;

    if (currentLiveBettingDatas && currentLiveBettingDatas.length > 0) {
      console.log("@@@@@@@@@@@@", currentLiveBettingDatas);

      const total_bet_amount = currentLiveBettingDatas.reduce(
        (accumulator, currentValue) => {
          return accumulator + currentValue.bet_amount * 1;
        },
        0
      );
      setTotalBetAmount(total_bet_amount);

      const live_bet_lists = currentLiveBettingDatas.filter((obj) => {
        if (obj.b_bet_live === true) {
          return obj;
        }
      });
      setLiveBetLists(live_bet_lists);

      const closed_bet_lists = currentLiveBettingDatas.filter((obj) => {
        if (obj.b_bet_live === false) {
          return obj;
        }
      });
      setClosedBetLists(closed_bet_lists);
    }

    dispatch(setLiveBettingTable(currentLiveBettingDatas));
  }, [liveBettingTableRef.current]);

  useEffect(() => {
    if (hookToNextRoundBet) {
      if (bBetForNextRound) {
        send_bet();
      }
      setHookToNextRoundBet(false);
      setbBetForNextRound(false);
    }
  }, [hookToNextRoundBet]);

  useEffect(() => {
    if (betActive && autoPayoutMultiplier <= liveMultiplier) {
      const newUserData = userData.balance + betAmount * autoPayoutMultiplier;
      dispatch(setUserData(newUserData));

      auto_cashout_early();
      dispatch(setBetActive(false));
    }
  }, [liveMultiplier]);

  const auto_cashout_early = () => {
    Axios.get(API_BASE + "/auto_cashout_early", {
      withCredentials: true,
    }).then((res) => {
      dispatch(setUserData(res.data));
      dispatch(setBetActive(false));
    });
  };

  useEffect(() => {
    let gameCounter = null;
    if (liveMultiplierSwitch) {
      setLiveMultiplier("1.00");

      gameCounter = setInterval(() => {
        let time_elapsed = (Date.now() - globalTimeNow) / 1000.0;
        setGamePhaseTimeElapsed(time_elapsed);
        setLiveMultiplier((1.0024 * Math.pow(1.0718, time_elapsed)).toFixed(2));

        if (multiplierCount.current.length < 1) {
          multiplierCount.current = multiplierCount.current.concat([1]);
          timeCount_xaxis.current = timeCount_xaxis.current.concat([0]);
        }
        if (realCounter_yaxis.current % 5 == 0) {
          multiplierCount.current = multiplierCount.current.concat([
            (1.0024 * Math.pow(1.0718, time_elapsed)).toFixed(2),
          ]);
          timeCount_xaxis.current = timeCount_xaxis.current.concat([
            time_elapsed,
          ]);
        }
        realCounter_yaxis.current += 1;
      }, 1);
    }
    return () => {
      clearInterval(gameCounter);
    };
  }, [liveMultiplierSwitch]);

  useEffect(() => {
    let bettingInterval = null;
    if (bBettingPhase) {
      bettingInterval = setInterval(() => {
        let time_elapsed = (Date.now() - globalTimeNow) / 1000.0;
        let time_remaining = (5 - time_elapsed).toFixed(2);
        setBettingPhaseTime(time_remaining);
        if (time_remaining < 0) {
          setbBettingPhase(false);
        }
      }, 10);
    }
    return () => {
      clearInterval(bettingInterval);
      setBettingPhaseTime("Starting...");
    };
  }, [bBettingPhase]);

  useEffect(() => {
    localStorage.setItem("local_storage_wager", betAmount);
    localStorage.setItem("local_storage_multiplier", autoPayoutMultiplier);
  }, [betAmount, autoPayoutMultiplier]);

  useEffect(() => {
    get_game_status();
    getUser();
  }, []);

  const get_game_status = () => {
    Axios.get(API_BASE + "/get_game_status", {
      withCredentials: true,
    }).then((res) => {
      if (res.data.phase === "betting_phase") {
        setGlobalTimeNow(res.data.info);
        setbBettingPhase(true);
      } else if (res.data.phase === "game_phase") {
        setGlobalTimeNow(res.data.info);
        setLiveMultiplierSwitch(true);
      }
    });
  };

  const manual_cashout_early = () => {
    Axios.get(API_BASE + "/manual_cashout_early", {
      withCredentials: true,
    }).then((res) => {
      dispatch(setUserData(res.data));
      dispatch(setBetActive(false));
    });
  };

  const send_bet = () => {
    Axios({
      method: "POST",
      data: {
        bet_amount: betAmount,
        payout_multiplier: autoPayoutMultiplier,
      },
      withCredentials: true,
      url: API_BASE + "/send_bet",
    })
      .then((res) => {
        dispatch(setBetActive(true));
        userData.balance -= betAmount;
        dispatch(setUserData(userData));
      })
      .catch((err) => {
        if (err.response) {
        }
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

  const handleKeyDownBetting = (e) => {
    if (e.key === "Enter") {
      if (bBettingPhase) {
        send_bet();
      } else {
        bet_next_round();
      }
    }
  };

  const verifyBetAmount = (text) => {
    const re = /^[0-9\b]+$/;

    if (text === "" || re.test(text)) {
      setBetAmount(text);
    }
    if (text > userData.balance) {
      setErrorMessage("Bet greater than balance");
    } else {
      setErrorMessage("");
    }
  };

  const bet_next_round = () => {
    setbBetForNextRound(!bBetForNextRound);
  };

  const verifyMultiplierAmount = (text) => {
    const validated = text.match(/^(\d*\.{0,1}\d{0,2}$)/);
    if (validated) {
      setAutoPayoutMultiplier(text);
    }
  };

  return (
    <Box className="home-wrapper">
      <Box className="bet-wrapper">
        <Slider />

        <ChartComponent
          timeCount_xaxis={timeCount_xaxis}
          multiplierCount={multiplierCount}
          liveMultiplier={liveMultiplier}
          gamePhaseTimeElapsed={gamePhaseTimeElapsed}
          bBettingPhase={bBettingPhase}
          bettingPhaseTime={bettingPhaseTime}
          liveMultiplierSwitch={liveMultiplierSwitch}
        />

        <Box className="bet-btn-wrapper">
          {bBettingPhase && !betActive ? (
            <Button className="bet-btn" onClick={send_bet}>
              Send Bet
            </Button>
          ) : (
            <>
              {betActive ? (
                <div>
                  <Button
                    className="bet-btn btn-cashout"
                    onClick={manual_cashout_early}
                  >
                    {betActive && liveMultiplier > 1 ? (
                      <span>
                        Cashout at {(liveMultiplier * betAmount).toFixed(2)}
                      </span>
                    ) : (
                      "Starting..."
                    )}
                  </Button>
                </div>
              ) : (
                <div>
                  <Button
                    className={`bet-btn ${
                      bBetForNextRound ? "bet_for_next_round_active" : ""
                    }`}
                    onClick={bet_next_round}
                  >
                    {bBetForNextRound ? (
                      <span>Cancel Bet</span>
                    ) : (
                      <span>
                        Bet
                        <br />
                        (Next round)
                      </span>
                    )}
                  </Button>
                </div>
              )}
            </>
          )}

          <Box className="bet-input-wrapper">
            <Box>
              <Typography variant="body1">Amount</Typography>

              <Box className="bet-amount-input-wrapper">
                <input
                  className="bet-amount-input"
                  value={betAmount}
                  disabled={betActive ? "disabled" : null}
                  onChange={(e) => verifyBetAmount(e.target.value)}
                  onKeyDown={handleKeyDownBetting}
                />
                <Box className="bet-amount-btn-box">
                  <Button>/2</Button>
                  <Button>x2</Button>
                  <Button>
                    ^ <br />{" "}
                  </Button>
                </Box>
              </Box>
            </Box>

            <Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Typography variant="body1">Auto cash out</Typography>
                <Box sx={{ display: "flex", alignItems: "center", gap: "5px" }}>
                  <Typography variant="body1">Chance</Typography>
                  <span style={{ color: "white" }}>9.90%</span>
                </Box>
              </Box>

              <Box className="bet-amount-input-wrapper">
                <input
                  className="bet-amount-input"
                  value={autoPayoutMultiplier}
                  disabled={betActive ? "disabled" : null}
                  onChange={(e) => verifyMultiplierAmount(e.target.value)}
                  onKeyDown={handleKeyDownBetting}
                />
                <Box className="bet-amount-btn-box">
                  <Button>
                    <NavigateBeforeIcon />
                  </Button>
                  <Button>
                    <NavigateNextIcon />
                  </Button>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>

      <Box className="recent-bet-list-wrapper">
        <Box className="table-header">
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Box
              sx={{
                width: "10px",
                height: "10px",
                borderRadius: "50%",
                backgroundColor: "green",
              }}
            ></Box>
            <span style={{ marginLeft: "10px" }}>
              {liveBetLists.length}/{liveBettingTable.length} Player
            </span>
          </Box>

          <span className="total-betting-amount">
            ${totalBetAmount.toFixed(2)}
          </span>
        </Box>

        <Box
          className="table-item-header"
          sx={{ color: theme.palette.text.primary }}
        >
          <Typography
            sx={{ width: "30%", display: "flex", flexDirection: "revert" }}
          >
            Player
          </Typography>
          <Typography
            sx={{ width: "15%", display: "flex", justifyContent: "center" }}
          >
            Cash Out
          </Typography>
          <Typography
            sx={{ width: "30%", display: "flex", justifyContent: "center" }}
          >
            Amount
          </Typography>
          <Typography
            sx={{ width: "25%", display: "flex", flexDirection: "row-reverse" }}
          >
            Profit
          </Typography>
        </Box>

        {liveBettingTable &&
          liveBettingTable.length > 0 &&
          liveBettingTable.map((item, key) => (
            <Box className="table-item" key={key}>
              <Box
                className="table-item-player"
                sx={{
                  width: "30%",
                  flexDirection: "revert",
                  gap: "5px",
                  color: "white",
                }}
              >
                <Avatar
                  src="/static/images/avatar/1.jpg"
                  sx={{ width: 22, height: 22 }}
                />
                <span>{item.the_username}</span>
              </Box>

              <Box
                className="table-item-cashout"
                sx={{ width: "15%", justifyContent: "center" }}
              >
                <span style={{ color: "#98a7b5" }}>
                  {item.b_bet_live === true
                    ? "betting"
                    : item.cashout_multiplier}
                </span>
              </Box>

              <Box
                className="table-item-amount"
                sx={{ width: "30%", justifyContent: "center", color: "white" }}
              >
                <Avatar
                  src="/static/images/avatar/1.jpg"
                  sx={{ width: 16, height: 16 }}
                />
                <span>&nbsp;$ {item.bet_amount}</span>
              </Box>

              <Box
                className="table-item-profit"
                sx={{
                  width: "25%",
                  justifyContent: "flex-end",
                  gap: "5px",
                  color: "#09e709",
                }}
              >
                <Avatar
                  src="/static/images/avatar/1.jpg"
                  sx={{ width: 16, height: 16 }}
                />
                <span>{item.profit ? item.profit.toFixed(2) : "--"}</span>
              </Box>
            </Box>
          ))}
      </Box>
    </Box>
  );
};
