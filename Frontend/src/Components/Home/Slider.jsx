import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Avatar, Box, Divider, Typography, useTheme } from "@mui/material";

import Carousel, {
  Dots,
  slidesToShowPlugin,
  autoplayPlugin,
} from "@brainhubeu/react-carousel";
import "@brainhubeu/react-carousel/lib/style.css";

export const Slider = () => {
  const theme = useTheme();

  const crashHistory = useSelector((state) => state.bet.crashHistory);
  const [lastCrashHistory, setLastCrashHistory] = useState();

  useEffect(() => {
    const last8CrashHistory = crashHistory.slice(-8);
    setLastCrashHistory(last8CrashHistory);
  }, [crashHistory]);

  const tableItems = [
    {
      betKey: "6278794",
      betMark: "51.23x",
    },
    {
      betKey: "6278795",
      betMark: "2.23x",
    },
    {
      betKey: "6278796",
      betMark: "3.23x",
    },
    {
      betKey: "6278797",
      betMark: "1.23x",
    },
    {
      betKey: "6278798",
      betMark: "42.23x",
    },
    {
      betKey: "6278799",
      betMark: "2.23x",
    },
    {
      betKey: "6278800",
      betMark: "7.23x",
    },
    {
      betKey: "6278801",
      betMark: "1.23x",
    },
  ];

  return (
    <Box className="recent-bet-list">
      {/* <Carousel
        plugins={[
          "infinite",
          {
            resolve: slidesToShowPlugin,
            options: {
              numberOfSlides: 8,
            },
          },
          {
            resolve: autoplayPlugin,
            options: {
              interval: 2000,
            },
          },
        ]}
        animationSpeed={1000}
      > */}
      {lastCrashHistory &&
        lastCrashHistory.map((item, key) => (
          <Box
            className="recent-bet"
            key={key}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "5px",
              width: "max-content",
              marginRight: "10px",
            }}
          >
            <Box
              sx={{
                width: "15px",
                height: "15px",
                borderRadius: "50%",
                backgroundColor: `${
                  item.crashColor === "red"
                    ? "red"
                    : item.crashColor === "yellow"
                    ? "yellow"
                    : "green"
                }`,
              }}
            ></Box>

            <Box>
              <div
                className="bet-key-number"
                style={{
                  fontSize: "11px",
                  color: theme.palette.text.primary,
                }}
              >
                {item.crashKey}
              </div>
              <div className="bet-mark" style={{ color: "yellow" }}>
                {item.crash}
              </div>
            </Box>
          </Box>
        ))}
      {/* </Carousel> */}
    </Box>
  );
};
