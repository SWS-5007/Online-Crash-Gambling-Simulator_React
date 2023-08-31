import React, { useEffect, useState, useRef } from "react";
import { Avatar, Box, Divider, Typography, useTheme } from "@mui/material";

import Axios from "axios";
import io from "socket.io-client";
import { v4 as uuidv4 } from "uuid";

import "chart.js/auto";
import { Chart, Line } from "react-chartjs-2";
import "chartjs-adapter-moment";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Slide } from "react-toastify";

import "./chart.css";

export const ChartComponent = (props) => {
  const theme = useTheme();

  const [chartSwitch, setChartSwitch] = useState(false);
  const [chartData, setChartData] = useState({ datasets: [] });
  const [chartOptions, setChartOptions] = useState({});

  useEffect(() => {
    const temp_interval = setInterval(() => {
      setChartSwitch(false);
      sendToChart();
    }, 1);

    return () => {
      clearInterval(temp_interval);
      setChartSwitch(true);
    };
  }, [chartSwitch]);

  // Chart Data
  const sendToChart = () => {
    setChartData({
      labels: props.timeCount_xaxis.current,

      datasets: [
        {
          data: props.multiplierCount.current,
          backgroundColor: "rgba(75,192,192,0.2)",
          borderColor: "rgba(75,192,192,1)",
          color: "rgba(255, 255, 255,1)",

          pointRadius: 0,
          borderDash: [35, 5],
          lineTension: 0.1,
        },
      ],
    });

    setChartOptions({
      events: [],
      maintainAspectRatio: false,
      elements: {
        line: {
          tension: 0.1,
        },
      },
      scales: {
        yAxes: {
          type: "linear",

          title: {
            display: false,
            text: "value",
          },
          min: 1,
          max: props.liveMultiplier > 2 ? props.liveMultiplier : 2,
          ticks: {
            color: "rgba(255, 255, 255,1)",
            maxTicksLimit: 5,
            callback: function (value, index, values) {
              if (value % 0.5 == 0) return parseFloat(value).toFixed(2);
            },
          },
          grid: {
            display: true,
            color: "white",
          },
        },
        xAxes: {
          type: "linear",
          title: {
            display: false,
            text: "value",
          },
          max: props.gamePhaseTimeElapsed > 2 ? props.gamePhaseTimeElapsed : 2,
          ticks: {
            color: "rgba(255, 255, 255,1)",

            maxTicksLimit: 5,
            callback: function (value, index, values) {
              if (props.gamePhaseTimeElapsed < 10) {
                if (value % 1 == 0) return value;
              } else {
                if (value % 10 == 0) return value;
              }
            },
          },
          grid: {
            display: true,
            color: "white",
          },
        },
      },
      plugins: {
        legend: { display: false },
      },
      animation: {
        x: {
          type: "number",
          easing: "linear",
          duration: 0,
          from: 5,
          delay: 0,
        },
        y: {
          type: "number",
          easing: "linear",
          duration: 0,
          from: 5,
          delay: 0,
        },
        loop: true,
      },
    });
  };

  return (
    <Box className="chart-wrapper">
      {
        <div className="effects-box">
          <div className="basically-the-graph">
            {chartData ? (
              <Chart type="line" data={chartData} options={chartOptions} />
            ) : (
              ""
            )}
          </div>

          <div
            style={{
              position: "absolute",
              zIndex: 12,
              color: "white",
              fontSize: "40px",
              fontWeight: "800",
            }}
          >
            {(() => {
              if (props.bBettingPhase) {
                return <span>{props.bettingPhaseTime}</span>;
              } else {
                return (
                  <span
                    className={` ${
                      !props.liveMultiplierSwitch &&
                      props.liveMultiplier !== "Starting..." &&
                      props.liveMultiplier !== "CONNECTING..."
                        ? "multipler_crash_value_message"
                        : ""
                    }`}
                  >
                    {props.liveMultiplier !== "Starting..."
                      ? props.liveMultiplier + "x"
                      : "Starting..."}
                  </span>
                );
              }
            })()}
          </div>
        </div>
      }
    </Box>
  );
};
