import React from "react";

function ProjectIcon({ width, height, iconcolor, color }) {
  return (
    <svg
      width={width ? width : "26px"}
      height={height ? height : "26px"}
      viewBox="0 0 24 24"
      id="magicoon-Regular"
      xmlns="http://www.w3.org/2000/svg"
      fill={iconcolor ? iconcolor : "#41416e"}
    >
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        <title>package</title>{" "}
        <g id="package-Regular">
          {" "}
          <path
            id="package-Regular-2"
            data-name="package-Regular"
            className="cls-1"
            d="M18.816,4.71l-4.4-1.954a6.044,6.044,0,0,0-4.836,0L5.184,4.71A4.7,4.7,0,0,0,2.25,8.974v6.049a4.7,4.7,0,0,0,2.934,4.264l4.4,1.954a5.969,5.969,0,0,0,2.394.5c.008,0,.015,0,.023,0s.015,0,.023,0a5.969,5.969,0,0,0,2.394-.5l4.4-1.954a4.7,4.7,0,0,0,2.934-4.264V8.974A4.7,4.7,0,0,0,18.816,4.71Zm-8.625-.583h0a4.529,4.529,0,0,1,3.618,0l4.4,1.954a3.817,3.817,0,0,1,.8.481L16.5,7.678,9.348,4.5Zm-4.4,1.954L7.5,5.323,14.651,8.5,13.2,9.143a3.126,3.126,0,0,1-2.406,0L4.991,6.562A3.869,3.869,0,0,1,5.792,6.081Zm0,11.835A3.222,3.222,0,0,1,3.75,15.023V8.974a2.858,2.858,0,0,1,.271-1.2l6.167,2.741a4.362,4.362,0,0,0,1.062.3v9.359a4.4,4.4,0,0,1-1.058-.3ZM20.25,15.023a3.222,3.222,0,0,1-2.043,2.893l-4.4,1.954a4.353,4.353,0,0,1-1.058.3V10.812a4.362,4.362,0,0,0,1.062-.3l6.167-2.741a2.858,2.858,0,0,1,.271,1.2Z"
          ></path>{" "}
        </g>{" "}
      </g>
    </svg>
  );
}

export default ProjectIcon;
