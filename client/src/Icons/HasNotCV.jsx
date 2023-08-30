import React from "react";

function HasNotCVIcon({width, height, iconcolor, color}) {
    return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={width}
          height={height}
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke={iconcolor}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M15 9l-6 6m6 0L9 9m3 12a9 9 0 100-18 9 9 0 000 18z"
          ></path>
        </svg>
    );
}

export default HasNotCVIcon;
