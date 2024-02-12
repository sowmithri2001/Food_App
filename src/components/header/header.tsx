import "./header.css";
import { useDispatch, useSelector } from "react-redux";
import { closeModal, showModal } from "../../redux/reducers/modalSlice";
import { Modal } from "@mui/material";
import { NavLink, Outlet, Routes } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const jwttokenLogin = localStorage.getItem("jwtToken");
  let cartData = useSelector((state: any) => state.cart.cartItems);
  return (
    <>
      {jwttokenLogin === "" ? (
        <div className="headerContainer">
          <div className="headerLeft">
            <div className="logoText" onClick={() => navigate("/")}>
              LOREM
            </div>
          </div>
          <div className="headerRight">
            <div className="webMenu">
              <div className="language">
                <select name="language" className="languageSelect">
                  <option className="lang">English</option>
                  <option className="lang">Hindi</option>
                </select>
              </div>
              <div
                className="login"
                onClick={() => {
                  navigate("login");
                  dispatch(showModal());
                }}
              >
                LOGIN
              </div>
              <div
                className="createAccount"
                onClick={() => {
                  navigate("/Signup");
                  dispatch(showModal());
                }}
              >
                CREATE AN ACCOUNT
              </div>
            </div>
            <div className="mobileMenu">
              <img
                src={require("../../assets/pngwing.com.png")}
                alt=""
                className="loginMoginIcon"
                onClick={() => {
                  navigate("/login");
                  dispatch(showModal());
                }}
              />
              <img
                src={require("../../assets/letter-c-icon-22.jpg")}
                alt=""
                className="loginCreateAccIcon"
                onClick={() => {
                  navigate("/Signup");
                  dispatch(showModal());
                }}
              />
            </div>
            <div className="cartDetails">
              <img
                src={require("../../assets/icn_cart.png")}
                alt=""
                className="cartItems"
              />
              <div className="cartText">CART</div>
            </div>
          </div>
        </div>
      ) : (
        <div className="headerContainers">
          <div className="headerLeft">
            <div className="logoText" onClick={() => navigate("/")}>
              LOREM
            </div>
          </div>
          <div className="headerRight">
            <div className="webMenu">
              <div className="language">
                <select name="language" className="languageSelect">
                  <option className="lang">English</option>
                  <option className="lang">Hindi</option>
                </select>
              </div>
              <div
                className="login"
                onClick={() => {
                  navigate("/login");
                  dispatch(showModal());
                }}
              >
                LOGIN
              </div>
              <div
                className="createAccount"
                onClick={() => {
                  navigate("/Signup");
                  dispatch(showModal());
                }}
              >
                CREATE AN ACCOUNT
              </div>
            </div>
            <div className="mobileMenu">
              <img
                src={require("../../assets/pngwing.com.png")}
                alt=""
                className="loginMoginIcon"
                onClick={() => {
                  navigate("/login");
                  dispatch(showModal());
                }}
              />
              <img
                src={require("../../assets/letter-c-icon-22.jpg")}
                alt=""
                className="loginCreateAccIcon"
                onClick={() => {
                  navigate("/Signup");
                  dispatch(showModal());
                }}
              />
            </div>
            <div
              className="cartDetails"
              onClick={() => {
                navigate("/login");
                dispatch(showModal());
              }}
            >
              <div className="cartCountcontainer">
                <img
                  src={require("../../assets/bag.png")}
                  alt=""
                  className="cartItems"
                />
                <div className="cartCount">0</div>
              </div>
              <div className="cartText">CART</div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
