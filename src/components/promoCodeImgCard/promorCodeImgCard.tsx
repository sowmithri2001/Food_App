import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { viewOfferLimitDetailsAsyncThunk } from "../../redux/reducers/restaurantListSlice";
import "./promoCodeImgCard.css";
const PromoCodeImgCard = () => {
  const allOffersList = useSelector(
    (state: any) =>
      state && state.restaurantList && state.restaurantList.viewOfferLimit && state.restaurantList.viewOfferLimit);

  const offerDetailsMapData = allOffersList && Object.values(allOffersList)[0];

  return (
    <>
      {offerDetailsMapData &&
        offerDetailsMapData.map((offer: any) => {
          return (
            <div className="promoCodeImgCardContainer">
              <div className="promoCodeImgCardContent">
                <img
                  src={offer.photo}
                  alt="img"
                  className="promoCodeCouponImg"
                />
                <div className="offerTextTopDiv">
                  <span className="offerText">
                    {" "}
                    Flat {offer.discount * 100}% Off
                  </span>
                  <span className="offerCodeText"> {offer.offerId} </span>
                </div>
                <span className="offerTextBottomDiv">
                  <span>• Get flat {offer.discount * 100}% Off</span>
                  <span>• Max discount {offer.discount * 100}%</span>
                  <span>• Valid upto {offer.validUpto}</span>
                </span>
              </div>
            </div>
          );
        })}
    </>
  );
};

export default PromoCodeImgCard;
