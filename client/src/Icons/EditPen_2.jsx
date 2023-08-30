import React from "react";

function EditPenIcon_2({ width, height, iconcolor, color }) {
  return (
    <svg
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      stroke={iconcolor ? iconcolor : "black"}
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
        <path
          stroke={iconcolor ? iconcolor : "black"}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M3.8 12.963L2 18l4.8-.63L18.11 6.58a2.612 2.612 0 00-3.601-3.785L3.8 12.963z"
        ></path>{" "}
      </g>
    </svg>
  );
}

export default EditPenIcon_2;
