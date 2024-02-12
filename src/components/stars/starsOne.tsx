import React from "react";
import "./starsOne.css";
const StarsOne = () => {
  return (
    <>
      <div
        className="starBorder"
        style={{
          height: "26px",
          width: "46px",
          background: "transparent",
          border: "1px solid red",
          borderRadius: "5px",
          display: "flex",
          columnGap: "4px",
          justifyContent: "center",
        }}
      >
        <span className="star" style={{ color: "#f00" }}>
          &#9733;
        </span>
        <span className="starValue" style={{ color: "#f00" }}>
          1
        </span>
      </div>
    </>
  );
};

export default StarsOne;
