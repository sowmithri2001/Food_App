import { NavLink, useNavigate } from "react-router-dom";
import "./restaurantDetailsHeader.css";
import { useState } from "react";
import { set } from "immer/dist/internal";
import { useDispatch, useSelector } from "react-redux";
import StarsOne from "../stars/starsOne";
import StarsTwo from "../stars/starsTwo";
import StarsThree from "../stars/starsThree";
import StarsFour from "../stars/starsFour";
import StarsFive from "../stars/starsFive";
import { eachRestaurantOverViewOpenAsyncThunk } from "../../redux/reducers/restaurantDetailsSlice";
import {
  setGallery,
  setMenu,
  setOverview,
  setRatings,
} from "../../redux/reducers/orangeSlice";

const RestaurantsDetailsHeader = () => {
  let ratingsCases = [4, 4, 3, 4, 2];
  let ratingImg: any;
  const dispatch = useDispatch();
  let restautrantId = useSelector(
    (state: any) =>
      state &&
      state.restaurantDetailsList &&
      state.restaurantDetailsList.restaurantOverview &&
      state.restaurantDetailsList.restaurantOverview &&
      state.restaurantDetailsList.restaurantOverview.restaurantId
  );
  const navigate = useNavigate();
  // const [orange, setorange] = useState({
  //   orangem: true,
  //   orangeo: false,
  //   orangeg: false,
  //   oranger: false,
  // });

  let orange = useSelector((state: any) => state && state.orangeSlice);

  const menuFn = () => {
    dispatch(setMenu());
    navigate("");
  };

  const OvFn = () => {
    dispatch(setOverview());
    navigate("restaurantOverview");
  };

  const rrFn = () => {
    dispatch(setRatings());
    navigate("restReview");
  };

  const glryFn = () => {
    dispatch(setGallery());
    navigate("restGallery");
  };

  let restaurantHeaderDetails = useSelector(
    (state: any) => state?.restaurantDetailsList?.restaurantHeader
  );
  return (
    <>
      <div className="mainDivDetailsHeader">
        <div className="backgroundheaderDetailsimg">
          <img
            src={require("../../assets/backgroundheader.png")}
            alt=""
            className="backgroundheaderDetails"
          />
        </div>
        <div className="HotelDetailsHead">
          <div className="hotelDetailContainer">
            <div className="hotelDetailHeadImg">
              <img
                src={require("../../assets/restaurant-cutlery-circular-symbol-of-a-spoon-and-a-fork-in-a-circle.png")}
                alt="img"
                className="restaurantLogoIcn"
              />
            </div>
            <div className="hotelNameLocation">
              <div className="hotleName">
                {restaurantHeaderDetails &&
                  restaurantHeaderDetails.restaurantName}
              </div>
              <div className="hotelLocation">
                {restaurantHeaderDetails &&
                  restaurantHeaderDetails.restaurantType}
              </div>
            </div>
            <div className="hotelRatingsTime">
              <div className="hotelRatingContinaer">
                {restaurantHeaderDetails &&
                restaurantHeaderDetails.overAllRating > 0 ? (
                  <div className="hotelRating">
                    {restaurantHeaderDetails &&
                      restaurantHeaderDetails.overAllRating}
                  </div>
                ) : (
                  ""
                )}{" "}
                <span className="dots"></span>
                <div className="hotelMins">
                  {restaurantHeaderDetails && restaurantHeaderDetails.duration}{" "}
                  mins
                </div>
                <span className="dots"></span>
                <div className="hotelMinOrder">
                  AED
                  {restaurantHeaderDetails &&
                    restaurantHeaderDetails.minimumCost}{" "}
                  min order
                </div>
              </div>
              <div className="hotelTimingsConatiner">
                <div className="timeImg">
                  <img
                    src={require("../../assets/time_icon.png")}
                    alt=""
                    className="timeIcons"
                  />
                </div>
                <div className="HotelWorkingtimings">
                  {restaurantHeaderDetails &&
                    restaurantHeaderDetails.workingHours}
                </div>
              </div>
            </div>
            <div className="hotelLastRatings">
              <div className="hotelLastRatingText">
                Delivery rating for last 5 orders
              </div>
              <div className="hotelRatingsDiv">
                {ratingsCases.map((ele: any, i: any) => {
                  switch (ele) {
                    case 1:
                      ratingImg = <StarsOne />;
                      break;
                    case 2:
                      ratingImg = <StarsTwo />;
                      break;
                    case 3:
                      ratingImg = <StarsThree />;
                      break;
                    case 4:
                      ratingImg = <StarsFour />;
                      break;
                    case 5:
                      ratingImg = <StarsFive />;
                      break;
                    default:
                      ratingImg = <StarsFive />;
                      break;
                  }
                  return <div className="lastRating">{ratingImg}</div>;
                })}
              </div>
            </div>
          </div>
          <div className="hotelsDetailsHeader">
            <div className="hotelDetailMenu" onClick={menuFn}>
              {" "}
              Menu {orange.orangem && <div className="orangeLine"></div>}{" "}
            </div>
            <div className="hotelDetailMenu" onClick={OvFn}>
              OverViews {orange.orangeo && <div className="orangeLine"></div>}{" "}
            </div>
            <div className="hotelDetailMenu" onClick={rrFn}>
              Reviews & Ratings{" "}
              {orange.oranger && <div className="orangeLine"></div>}{" "}
            </div>
            <div className="hotelDetailMenu" onClick={glryFn}>
              Gallery {orange.orangeg && <div className="orangeLine"></div>}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RestaurantsDetailsHeader;
