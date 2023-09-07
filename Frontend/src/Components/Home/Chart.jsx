import React, { useEffect, useState, useRef } from "react";
import { Avatar, Box, Divider, Typography, useTheme } from "@mui/material";

import Axios from "axios";
import io from "socket.io-client";
import { v4 as uuidv4 } from "uuid";

import "chart.js/auto";
import { Chart, Line } from "react-chartjs-2";
import { ScriptableContext } from "chart.js";
import "chartjs-adapter-moment";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Slide } from "react-toastify";

import ProgressBar from "@ramonak/react-progress-bar";

import "./chart.css";

export const ChartComponent = (props) => {
  const theme = useTheme();

  const [chartSwitch, setChartSwitch] = useState(false);
  const [chartData, setChartData] = useState({ datasets: [] });
  const [closedChartData, setClosedChartData] = useState({ datasets: [] });
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

  const pluginsConfig = [
    {
      afterLayout: (chart) => {
        let ctx = chart.ctx;
        ctx.save();
        let gradient = ctx.createLinearGradient(0, 0, 180, 0);
        gradient.addColorStop(0, "rgb(37 23 71)");
        gradient.addColorStop(0.5, "rgb(100 70 161)");
        gradient.addColorStop(1, "rgb(74 46 130)");

        if (chart.data.datasets[0]) {
          chart.data.datasets[0].backgroundColor = gradient;
          ctx.restore();
        }
      },
    },
  ];

  const closedPluginsConfig = [
    {
      afterLayout: (chart) => {
        let ctx = chart.ctx;
        ctx.save();
        let gradient = ctx.createLinearGradient(0, 0, 180, 0);
        gradient.addColorStop(0, "#979899");
        gradient.addColorStop(1, "#737171");

        if (chart.data.datasets[0]) {
          chart.data.datasets[0].backgroundColor = gradient;
          ctx.restore();
        }
      },
    },
  ];

  // Chart Data
  const sendToChart = () => {
    setChartData({
      labels: props.timeCount_xaxis.current,

      datasets: [
        {
          data: props.multiplierCount.current,
          fill: true,
          borderColor: (context) => {
            const ctx = context.chart.ctx;
            const gradient = ctx.createLinearGradient(0, 0, 250, 0);
            gradient.addColorStop(0, "#ffffff");
            gradient.addColorStop(1, "rgb(115 34 255)");
            return gradient;
          },
          borderWeight: "normal",
          borderWidth: 5,
          tension: 0.3,
          pointBackgroundColor: "transparent",
          pointBorderColor: "transparent",
        },
      ],
    });

    setClosedChartData({
      labels: props.timeCount_xaxis.current,

      datasets: [
        {
          data: props.multiplierCount.current,
          fill: true,
          borderColor: (context) => {
            const ctx = context.chart.ctx;
            const gradient = ctx.createLinearGradient(0, 0, 250, 0);
            gradient.addColorStop(0, "#5d5d5d");
            gradient.addColorStop(1, "#5d5d5d");
            return gradient;
          },
          borderWeight: "normal",
          borderWidth: 5,
          tension: 0.3,
          pointBackgroundColor: "transparent",
          pointBorderColor: "transparent",
        },
      ],
    });

    setChartOptions({
      events: [],
      maintainAspectRatio: false,
      elements: {
        line: {
          tension: 1,
        },
      },
      scales: {
        y: {
          type: "linear",
          title: {
            display: false,
            text: "value",
          },
          min: 1,
          max: props.liveMultiplier > 2 ? props.liveMultiplier : 2,
          ticks: {
            callback: function (value, index, ticks) {
              return value % 1 === 0 ? "$" + value : "";
            },
          },
          grid: {
            display: false,
          },
        },
        x: {
          type: "linear",
          max: props.gamePhaseTimeElapsed > 2 ? props.gamePhaseTimeElapsed : 2,
          ticks: {
            callback: function (value, index, ticks) {
              return value % 2 === 0 ? value : "";
            },
          },
          grid: {
            display: false,
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
              props.liveMultiplierSwitch === true ? (
                <Chart
                  id="chart"
                  type="line"
                  data={chartData}
                  options={chartOptions}
                  plugins={pluginsConfig}
                />
              ) : (
                ""
              )
            ) : (
              ""
            )}

            {chartData ? (
              props.liveMultiplierSwitch === true ? (
                ""
              ) : (
                <Chart
                  id="chart"
                  type="line"
                  data={closedChartData}
                  options={chartOptions}
                  plugins={closedPluginsConfig}
                />
              )
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
                return (
                  <div>
                    <span style={{ fontSize: "20px" }}>
                      Starts in {props.bettingPhaseTime} s
                    </span>
                  </div>
                );
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
