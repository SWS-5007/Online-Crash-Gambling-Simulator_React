import React from "react";

function CodeIcon({width, height, iconcolor, color}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      fill={iconcolor}
      viewBox="0 0 24 24"
    >
      <path
        fill={iconcolor}
        fillRule="evenodd"
        d="M13.737 6.789a.75.75 0 01.475.948l-3 9a.75.75 0 01-1.423-.474l3-9a.75.75 0 01.948-.474zM16.012 7.93a.75.75 0 011.058.082l3 3.5a.75.75 0 010 .976l-3 3.5a.75.75 0 01-1.14-.976L18.513 12l-2.581-3.012a.75.75 0 01.08-1.057zM7.988 7.93a.75.75 0 01.081 1.058L5.488 12l2.581 3.012a.75.75 0 01-1.138.976l-3-3.5a.75.75 0 010-.976l3-3.5a.75.75 0 011.057-.081z"
        clipRule="evenodd"
      ></path>
    </svg>
  );
}

export default CodeIcon;
