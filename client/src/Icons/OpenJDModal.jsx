import React from "react";

function OpenJDModalIcon({ width, height, iconcolor, color }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      width={width ? width : "24px"}
      height={height ? height : "24px"}
    >
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        {" "}
        <g id="Arrow / Expand">
          {" "}
          <path
            id="Vector"
            d="M10 19H5V14M14 5H19V10"
            stroke={iconcolor ? iconcolor : "#000000"}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>{" "}
        </g>{" "}
      </g>
    </svg>
  );
}

export default OpenJDModalIcon;
