import React from "react";
import { useSelector } from "react-redux";

const BestOffersHeader = () => {
  const brandProfileDetailsData = useSelector(
    (state: any) =>
      state &&
      state.restaurantDetailsList &&
      state.restaurantDetailsList.restaurantHeader
  );
  return (
    <div>
      <div className="brandsProfileHeader">
        <div className="HotelDetailsHead">
          <div className="hotelDetailContainer">
            <div className="hotelDetailHeadImg">
              <img
                src={
                  brandProfileDetailsData &&
                  brandProfileDetailsData.profilePicLink
                }
                alt="img"
                className="restaurantLogoIcn"
              />
            </div>
            <div className="hotelNameLocation">
              <div className="hotleName">
                {brandProfileDetailsData &&
                  brandProfileDetailsData.restaurantName}
              </div>
              <div className="hotelLocation">
                {brandProfileDetailsData.restaurantType}
              </div>
            </div>
            <div className="hotelRatingsTime">
              <div className="hotelRatingContinaer">
                <span className="dots"></span>
                <div className="hotelMins">
                  {brandProfileDetailsData && brandProfileDetailsData.duration}{" "}
                  mins
                </div>
                <span className="dots"></span>
                <div className="hotelMinOrder">
                  AED
                  {brandProfileDetailsData &&
                    brandProfileDetailsData.minimumCost}{" "}
                  min order
                </div>
              </div>
            </div>
            <div className="hotelLastRatings">
              <div className="hotelLastRatingText">
                Working Hours:{" "}
                {brandProfileDetailsData &&
                  brandProfileDetailsData.workingHours}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BestOffersHeader;
