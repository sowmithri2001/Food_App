import React from "react";
import { useDispatch } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { closeModal } from "../../redux/reducers/modalSlice";
import "./ForgotPasswordSuccess.css";
const ForgotPasswordSuccess = () => {
  const dispatch = useDispatch();
  return (
    <>
      <img
        src={require("../../assets/close_button.png")}
        alt="close"
        className="closeButtonIcn"
        onClick={() => dispatch(closeModal())}
      />
      <div className="passwordSuccessContainer">
        <img
          src={require("../../assets/icn_password_success.png")}
          alt="success"
          className="imgSuccess"
        />
        <div className="successHeading">Great!</div>
        <div className="successText">
          Your password has been successfully reset
        </div>
        <Link to="/login" className='NavTxt'>
          <button className="loginNowButton">LOGIN NOW</button>
        </Link>
      </div>
    </>
  );
};

export default ForgotPasswordSuccess;
