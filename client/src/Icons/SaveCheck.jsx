import React from "react";

function SaveCheckIcon({ width, height, iconcolor, color }) {
  return (
    <svg
      viewBox="0 0 24 24"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      fill={iconcolor ? iconcolor : "black"}
      width={width}
      height={height}
    >
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        {" "}
        <title>icon/24/icon-check</title> <desc>Created with Sketch.</desc>{" "}
        <defs> </defs>{" "}
        <g
          id="out"
          stroke="none"
          strokeWidth="1"
          fill="none"
          fillRule="evenodd"
        >
          {" "}
          <path
            d="M18,7 L16.59,5.59 L10.25,11.93 L11.66,13.34 L18,7 L18,7 L18,7 Z M22.24,5.59 L11.66,16.17 L7.48,12 L6.07,13.41 L11.66,19 L23.66,7 L22.24,5.59 L22.24,5.59 L22.24,5.59 Z M0.41,13.41 L6,19 L7.41,17.59 L1.83,12 L0.41,13.41 L0.41,13.41 L0.41,13.41 Z"
            id="path"
            fill={iconcolor ? iconcolor : "black"}
          >
            {" "}
          </path>{" "}
        </g>{" "}
      </g>
    </svg>
  );
}

export default SaveCheckIcon;
