import React from "react";
import "./noDataCard.css";
const NoPastOrders = (props: any) => {
  return (
    <>
      <div className="noPastOrdersContainer">
        <img
          src={require("../../assets/img_area_not_available@3x.png")}
          alt="notAvailable"
          className="noDataImage"
        />
        <span className="oopsText">OOPS!</span>
        <span className="messageText">{props.message}</span>
      </div>
    </>
  );
};

export default NoPastOrders;
