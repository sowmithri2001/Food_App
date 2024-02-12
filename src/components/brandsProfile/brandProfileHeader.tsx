import React from "react";
import { useSelector } from "react-redux";

const BrandProfileHeader = () => {
  const brandProfileDetailsData = useSelector(
    (state: any) =>
      state && state.restaurantList && state.restaurantList.brandsNearByProfile
  );
  let placeValueFromRedux = useSelector(
    (state: any) => state && state.placeAuto && state.placeAuto.placeValue
  );
  return (
    <div>
      <div className="brandsProfileHeader">
        <div className="HotelDetailsHead">
          <div className="hotelDetailContainer">
            <div className="hotelDetailHeadImg">
              <img
                src={brandProfileDetailsData && brandProfileDetailsData.logo}
                alt="img"
                className="restaurantLogoIcn"
              />
            </div>
            <div className="hotelNameLocation">
              <div className="hotleName">
                {brandProfileDetailsData && brandProfileDetailsData.brandName}
              </div>
              <div className="hotelLocation">
                {brandProfileDetailsData.brandOrigin}
              </div>
            </div>
            <div className="hotelRatingsTime">
              <div className="hotelRatingContinaer">
                <span className="dots"></span>
                <div className="hotelMins">
                  {brandProfileDetailsData &&
                    brandProfileDetailsData.averageDeliveryTime}{" "}
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
                {brandProfileDetailsData && brandProfileDetailsData.description}
              </div>
            </div>
          </div>
          <div className="hotelsDetailsHeader"></div>
        </div>
      </div>
    </div>
  );
};

export default BrandProfileHeader;
