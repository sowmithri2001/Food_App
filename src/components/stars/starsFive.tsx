import React from "react";
import "./starsOne.css";
const StarsFive = () => {
  return (
    <>
      <div
        className="starBorder"
        style={{
          height: "26px",
          width: "36px",
          background: "transparent",
          border: "1px solid #5FB700",
          borderRadius: "5px",
          display: "flex",
          columnGap: "4px",
          justifyContent: "center",
        }}
      >
        <span
          className="star"
          style={{ color: "#5FB700", height: "13px", width: "13px" }}
        >
          &#9733;
        </span>
        <span
          className="starValue"
          style={{ color: "#5FB700", height: "10px", width: "10px" }}
        >
          5
        </span>
      </div>
    </>
  );
};

export default StarsFive;
