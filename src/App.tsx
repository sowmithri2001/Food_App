import "./App.css";
import Footer from "./components/footer/footer";
import Header from "./components/header/header";
import React from "react";
import "./App.css";
import Home from "./views/home/home";
import { Routes, Route } from "react-router-dom";
import EmailBox from "./components/emailBoxForForgotPassword/emailBox";
import MobileBox from "./components/mobileNumberBoxFor/mobileBox";
import RestaurantList from "./views/restaurantList/restaurantList";
import RestaurantDetails from "./views/restaurantDetails/restaurantDetails";
import RestaurantsDetailsHeader from "./components/restaurantDetailsHeader/restaurantsDetailsHeader";
import RestaurantSubHeader from "./components/restaurantSubHeader/restaurantSubHeader";
import RestaurantGallery from "./components/restaurantGallery/restaurantGallery";
import ReviewsAndRatings from "./components/reviewsAndRatings/reviewsAndRatings";
import OverviewBody from "./components/overviewBody/overviewBody";
import ReferFriend from "./components/referFriend/referFriend";
import RestaurantMenu from "./views/restaurantMenu/restaurantMenu";
import StepperMain from "./components/stepper/stepperMain";
import ContactForm from "./views/contactForm/contactForm";
import ProfileOrders from "./components/profileOrders/profileOrders";
import ProfileAddress from "./components/profileAddress/profileAddress";
import ProfileHeader from "./components/profileHeader/profileHeader";
import ProfilePayment from "./components/profilePayment/profilePayment";
import BrandsNearBy from "./views/brandsNearBy/brandsNearBy";
import PrivacyPloicy from "./views/privacyPolicy/privacyPolicy";
import TermsAndCondition from "./views/termsAndCondition/termsAndCondition";
import DownloadAppSubHeader from "./components/downloadAppSubHeader/downloadAppSubHeader";
import LoremAbout from "./components/loremAbout/loremAbout";
import Error404 from "./components/error404/error404";
import MyCart from "./components/myCart/myCart";
import ProceedPayment from "./views/proceedPayment/proceedPayment";
import LoginOne from "./components/loginOne/loginOne";
import SignUp from "./components/signUp/signUp";
import ForgotPassword from "./components/forgotPassword/forgotPassword";
import OtpVerification from "./components/otpVerification/otpVerification";
import OtpVerified from "./components/otpVerified/otpVerified";
import OtpVerifiedSuccess from "./components/otpVerifiedSuccess/otpVerifiedSuccess";
import OtpVerificationLogin from "./components/otpVerificationLogin/otpVerificationLogin";
import MobileVerified from "./components/mobileVerified/mobileVerified";
import ForgotPasswordSuccess from "./components/forgotPasswordSuccess/forgotPasswordSuccess";
import HeaderLogin from "./components/headerLogin/headerLogin";
import Profile from "./views/Profile/profile";
import BrandProfileDetails from "./views/brandProfileDetails/brandProfileDetails";
import ViewAllOffers from "./components/viewAllOffers/viewAllOffers";
import PaymentProcess from "./components/paymentProcess/paymentProcess";
import ChoseAddress from "./components/choseAddress/choseAddress";
import SelectPaymentMethod from "./components/selectPaymentMethod/selectPaymentMethod";
import ViewAllOffersHome from "./components/viewAllOffersHome/viewAllOffersHome";
import ReviewAndRatingProfile from "./components/reviewAndRatingProfile/reviewAndRatingProfile";
import GalleryProfile from "./components/galleryProfile/galleryProfile";
import ViewAllBrands from "./components/viewAllBrands/viewAllBrands";
import { ToastContainer, toast } from "react-toastify";

function App() {
  const jwttokenLogin = sessionStorage.getItem("jwtToken");
  console.log("jwttokenLogin", jwttokenLogin);

  return (
    <div className="App">
      <Routes>
        <Route path="*" element={<Home />} />
        <Route path="/" element={<Home />}>
          <Route path="login" element={<LoginOne />} />

          <Route path="/signup" element={<SignUp />} />
          <Route path="/forgotPassword" element={<ForgotPassword />} />
          <Route path="/signup/verifyotp" element={<OtpVerification />} />
          <Route path="/signup/verifyotp/verified" element={<OtpVerified />} />
          <Route
            path="/signup/verifyotp/verified/done"
            element={<OtpVerifiedSuccess />}
          />
          <Route
            path="/login/forgotpassword"
            element={<OtpVerificationLogin />}
          />
          <Route
            path="/login/forgotpassword/verification"
            element={<MobileVerified />}
          />
          <Route
            path="/login/forgotpassword/verification/verified"
            element={<ForgotPasswordSuccess />}
          />
        </Route>
        {jwttokenLogin === null ? (
          <>
            <Route path="" element={<Home />} />
            <Route path="/restaurantLists" element={<RestaurantList />} />
            <Route path="/restaurantDetails" element={<RestaurantDetails />}>
              <Route path="" element={<RestaurantMenu />} />
              <Route path="restaurantOverview" element={<OverviewBody />} />
              <Route path="restReview" element={<ReviewsAndRatings />} />
              <Route path="restGallery" element={<RestaurantGallery />} />
            </Route>
            <Route
              path="/brandsNearbyDetails"
              element={<BrandProfileDetails />}
            />
            <Route path="/offersDetails" element={<ViewAllOffers />} />
            <Route path="/brandsoffersDetails" element={<ViewAllBrands />} />
          </>
        ) : (
          <>
            <Route path="/" element={<Home />} />

            <Route path="/restaurantLists" element={<RestaurantList />} />
            <Route path="/restaurantDetails" element={<RestaurantDetails />}>
              <Route path="" element={<RestaurantMenu />} />
              <Route path="restaurantOverview" element={<OverviewBody />} />
              <Route path="restReview" element={<ReviewsAndRatings />} />
              <Route path="restGallery" element={<RestaurantGallery />} />
            </Route>
            <Route path="/profileDetails" element={<Profile />}>
              <Route path="" element={<ProfileOrders />} />
              <Route path="profileaddress" element={<ProfileAddress />} />
              <Route path="profilepayment" element={<ProfilePayment />} />
              <Route
                path="profileReview"
                element={<ReviewAndRatingProfile />}
              />
              <Route path="profileGallery" element={<GalleryProfile />} />
              <Route path="verifyMobile" element={<MobileVerified />} />
            </Route>
            <Route path="/referfriend" element={<ReferFriend />} />
            <Route path="/brandsNearby" element={<BrandsNearBy />} />
            <Route
              path="/brandsNearbyDetails"
              element={<BrandProfileDetails />}
            />
            <Route path="/offersDetails" element={<ViewAllOffers />} />
            <Route path="/brandsoffersDetails" element={<ViewAllBrands />} />
            <Route path="/mycart" element={<MyCart />} />
          </>
        )}

        <Route path="/referfriend" element={<ReferFriend />} />
        <Route path="/brandsNearby" element={<BrandsNearBy />} />
        <Route path="/proceedToPayment" element={<ProceedPayment />}>
          <Route path="" element={<PaymentProcess />} />
          <Route path="choseAddress" element={<ChoseAddress />} />
          <Route path="selectPaymentMethod" element={<SelectPaymentMethod />} />
        </Route>
        <Route path="/orderStatus" element={<StepperMain />} />
        <Route path="/ViewAllOffersHome" element={<ViewAllOffersHome />} />
        <Route path="/PrivacyPolicy" element={<PrivacyPloicy />} />
        <Route path="/termsAndCondition" element={<TermsAndCondition />} />
        <Route path="/contactForm" element={<ContactForm />} />
      </Routes>

      <Footer />
      <ToastContainer />
    </div>
  );
}

export default App;
