import React from "react";

function HasCVIcon({width, height, iconcolor, color}) {
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
            d="M16 9l-6 6.5L7.5 13m4.5 8a9 9 0 100-18 9 9 0 000 18z"
          ></path>
        </svg>
    );
}

export default HasCVIcon;
