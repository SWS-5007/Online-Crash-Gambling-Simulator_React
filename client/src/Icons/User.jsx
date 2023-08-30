import React from "react";

function UserIcon({ width, height, iconcolor, color }) {
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
        <title>user</title>{" "}
        <g id="user-Regular">
          {" "}
          <path
            id="user-Regular-2"
            data-name="user-Regular"
            className="cls-1"
            d="M12,12.75A5.25,5.25,0,1,0,6.75,7.5,5.256,5.256,0,0,0,12,12.75Zm0-9A3.75,3.75,0,1,1,8.25,7.5,3.754,3.754,0,0,1,12,3.75Zm7.75,14.217v1.011a3.769,3.769,0,0,1-.961,2.522.75.75,0,1,1-1.118-1,2.278,2.278,0,0,0,.579-1.522V17.967a3.259,3.259,0,0,0-2.443-3.185,1.011,1.011,0,0,0-.746.1,6.307,6.307,0,0,1-6.116,0,1.013,1.013,0,0,0-.751-.1A3.262,3.262,0,0,0,5.75,17.967v1.011A2.278,2.278,0,0,0,6.329,20.5a.75.75,0,1,1-1.118,1,3.769,3.769,0,0,1-.961-2.522V17.967a4.759,4.759,0,0,1,3.577-4.64,2.529,2.529,0,0,1,1.854.247,4.8,4.8,0,0,0,4.644,0,2.525,2.525,0,0,1,1.849-.244A4.759,4.759,0,0,1,19.75,17.967Z"
          ></path>{" "}
        </g>{" "}
      </g>
    </svg>
  );
}

export default UserIcon;
