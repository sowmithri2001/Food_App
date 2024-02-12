import "./headerLogin.css";
import { useDispatch, useSelector } from "react-redux";
import { showModal } from "../../redux/reducers/modalSlice";

import { NavLink } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const HeaderLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const profileData = useSelector((state: any) => state.getProfile);
  const profile =
    profileData && profileData.data && profileData.getProfile.data;
  const [login, setLogin] = useState(false);
  const [register, setRegister] = useState(false);

  let cartData = useSelector((state: any) => state.proceedSlice.getMyCart);
  const cartCount = cartData && cartData.data && cartData.data.totalResultCount;
  return (
    <>
      <div className="headerContainer">
        <div className="headerLeft">
          <div
            className="logoText"
            onClick={() => {
              navigate("/");
            }}
          >
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
                navigate("/profileDetails");
              }}
            >
              {" "}
              {profile && profile.profilePicURL === null ? (
                <img
                  src={require("../../assets/default-profile.jpg")}
                  alt=""
                  className="LoginProfileIcon"
                />
              ) : (
                <img
                  src={profile && profile.profilePicURL}
                  alt=""
                  className="LoginProfileIcon"
                />

              )}

              <div className="LoginProfileName">
                {profile && profile.firstName}
              </div>{" "}
            </div>
            <div
              className="createAccount"
              onClick={() => {
                sessionStorage.removeItem("jwtToken");
                window.location.reload();
              }}
            >
              LOGOUT
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
              navigate("/mycart");
            }}
          >
            <div className="cartCountcontainer">
              <img
                src={require("../../assets/bag.png")}
                alt=""
                className="cartItems"
              />
              <div className="cartCount">{cartCount || 0}</div>
            </div>
            <div className="cartTextLogin">CART</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HeaderLogin;
