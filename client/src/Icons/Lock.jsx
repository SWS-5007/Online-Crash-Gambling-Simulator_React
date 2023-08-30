import React from "react";

function LockIcon({ width, height, iconcolor, color }) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      id="magicoon-Regular"
      xmlns="http://www.w3.org/2000/svg"
      fill={iconcolor}
    >
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        <title>lock</title>{" "}
        <g id="lock-Regular">
          {" "}
          <path
            id="lock-Regular-2"
            data-name="lock-Regular"
            className="cls-1"
            d="M16.75,9.594V7a4.75,4.75,0,0,0-9.5,0V9.594A4.749,4.749,0,0,0,4.25,14v3A4.756,4.756,0,0,0,9,21.75h6A4.756,4.756,0,0,0,19.75,17V14A4.749,4.749,0,0,0,16.75,9.594ZM8.75,7a3.25,3.25,0,0,1,6.5,0V9.275c-.085,0-.164-.025-.25-.025H9c-.086,0-.165.021-.25.025Zm9.5,10A3.254,3.254,0,0,1,15,20.25H9A3.254,3.254,0,0,1,5.75,17V14A3.254,3.254,0,0,1,9,10.75h6A3.254,3.254,0,0,1,18.25,14Zm-5.5-2v1a.75.75,0,0,1-1.5,0V15a.75.75,0,0,1,1.5,0Z"
          ></path>{" "}
        </g>{" "}
      </g>
    </svg>
  );
}

export default LockIcon;
