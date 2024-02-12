import React, { useState } from "react";
import "./forgotPassword.css";
import { Routes, Route, NavLink, useNavigate } from "react-router-dom";
import EmailBox from "../emailBoxForForgotPassword/emailBox";
import MobileBox from "../mobileNumberBoxFor/mobileBox";
import { useSelector } from "react-redux";
const ForgotPassword = () => {
  const navigate = useNavigate();

  const [emailBoxValue, setemailBoxValue] = useState(true);
  const showEmailBoxFn = () => {
    setemailBoxValue(true);
  };
  const showMobileBoxFn = () => {
    setemailBoxValue(false);
  };
  return (
    <>
      <img
        src={require("../../assets/Shape@2x.png")}
        alt="back"
        className="backButtonLeftCarrot"
        onClick={() => navigate("/login")}
      />
      <div className="forgotPasswordContainer">
        <div className="topSectionDiv">
          <img
            src={require("../../assets/icn_forgot_p_word.png")}
            alt="fgtpwd"
            className="forgotPasswordIcon"
          />
          <span className="forgotPasswordHeading">Forgot Password!</span>
          <span className="forgotPasswordText">
            Share your registered either email address or mobile number to send
            you the OTP to reset your password
          </span>
        </div>
        <div className="tabSectionDiv">
          <div className="emialTab noDecoration" onClick={showEmailBoxFn}>
            Email {emailBoxValue && <div className="bar"></div>}{" "}
          </div>
          <div className="numberTab noDecoration" onClick={showMobileBoxFn}>
            Mobile No. {!emailBoxValue && <div className="bar"></div>}{" "}
          </div>
        </div>
        {emailBoxValue ? <EmailBox /> : <MobileBox />}
      </div>
    </>
  );
};

export default ForgotPassword;
