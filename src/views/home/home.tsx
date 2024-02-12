import HomeThree from "../../components/homeThree/homeThree";
import "./home.css";
import HomeTwo from "../../components/homeTwo/homeTwo";
import HomeFive from "../../components/homeFive/homeFive";
import HomeFour from "../../components/homeFour/homeFour";
import HomeOne from "../../components/homeOne/homeOne";
import { Modal } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "../../redux/reducers/modalSlice";
import OtpVerification from "../../components/otpVerification/otpVerification";
import { Outlet, Route, Routes } from "react-router-dom";
import OtpVerified from "../../components/otpVerified/otpVerified";
import OtpVerifiedSuccess from "../../components/otpVerifiedSuccess/otpVerifiedSuccess";
import ForgotPassword from "../../components/forgotPassword/forgotPassword";
import ForgotPasswordSuccess from "../../components/forgotPasswordSuccess/forgotPasswordSuccess";

import LoginOne from "../../components/loginOne/loginOne";
import EmailBox from "../../components/emailBoxForForgotPassword/emailBox";
import MobileBox from "../../components/mobileNumberBoxFor/mobileBox";
import OtpVerificationLogin from "../../components/otpVerificationLogin/otpVerificationLogin";
import MobileVerified from "../../components/mobileVerified/mobileVerified";
import RestaurantList from "../restaurantList/restaurantList";
import Header from "../../components/header/header";
import SignUp from "../../components/signUp/signUp";
import HeaderLogin from "../../components/headerLogin/headerLogin";
import HeaderLoginHome from "../../components/headerLogin/headerLoginHome";
import { noBrands } from "../../data/placesAuto";
const Home = () => {
  const dispatch = useDispatch();
  const jwttokenLogin = sessionStorage.getItem("jwtToken");
  let showModal: any = useSelector((state: any) => state.modalStatus.value);
  console.log(showModal);
  const handleClose = () => {
    dispatch(closeModal());
  };

  let placeValueFromRedux = useSelector(
    (state: any) => state && state.placeAuto && state.placeAuto.placeValue
  );
  console.log("placeValueFromRedux", placeValueFromRedux);

  let noBrandAvailable = noBrands.includes(placeValueFromRedux);
  console.log("noBrands", noBrandAvailable);
  return (
    <>
      {jwttokenLogin === null ? (
        <>
          {" "}
          <Header />
        </>
      ) : (
        <>
          <HeaderLoginHome />
        </>
      )}
      <div className="homeContainer">
        <HomeOne />
        {!noBrandAvailable && (
          <>
            <HomeTwo />
            <HomeThree />
          </>
        )}
        <HomeFour />
        <HomeFive />
      </div>
      <Modal
        open={showModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="modalDiv style">
          <div className="modalleftSide">
            <img
              src={require("../../assets/Image.png")}
              alt=""
              className="bgForModalLeftSide"
            />
            <div className="contentDiv">
              <span className="contentDivHeading">LOREM</span>
              <span className="contentDivSubHeading">
                Experience the easiest a way to get
                <span className="boldify"> great food</span> Delivered
              </span>
            </div>
          </div>
          <div className="modalrightSide">
            <Outlet />
            <Routes>
            </Routes>
          </div>
        </div>
      </Modal>
    </>
  );
};
export default Home;
