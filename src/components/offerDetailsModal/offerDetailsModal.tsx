import { inputLabelClasses, TextField } from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./offerDetailsModal.css";
import { allOffersDetailsAsyncThunk } from "../../redux/reducers/dealsAndOffersSlice";
import { Navigate, useNavigate } from "react-router-dom";
import { showModal } from "../../redux/reducers/modalSlice";

const OfferDetailsModal = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const offerId = useSelector(
    (state: any) =>
      state &&
      state.dealsAndOffers &&
      state &&
      state.dealsAndOffers.offerDetails &&
      state.dealsAndOffers.offerDetails.offer &&
      state.dealsAndOffers.offerDetails.offer
  );
  const offerIdRest = useSelector(
    (state: any) =>
      state &&
      state.dealsAndOffers &&
      state.dealsAndOffers.offerDetails &&
      state.dealsAndOffers.offerDetails &&
      state.dealsAndOffers.offerDetails &&
      state.dealsAndOffers.offerDetails.restaurantAddress &&
      state.dealsAndOffers.offerDetails.restaurantAddress
  );
  let placeValueFromRedux = useSelector(
    (state: any) => state && state.placeAuto && state.placeAuto.placeValue
  );
  const jwttokenLogin = sessionStorage.getItem("jwtToken");
  const offerfn = () => {
    if (jwttokenLogin === null) {
      navigate("/login");
      dispatch(showModal());
    }
  };

  return (
    <>
      <div className="OfferDetailsBody">
        <div className="offerDetailsContainer">
          {" "}
          <div className="offerDetailsImage">
            <img
              src={offerId && offerId.photo}
              alt=""
              className="offerDetailsImg"
            />
          </div>
          <div className="offerTextTopDivNew">
            <span className="descriptionOffer">
              {offerId && offerId.description}
            </span>
            <span className="offerTextNew">
              Flat {offerId && offerId.discount}% Off
            </span>
            <span className="offerCodeTextNew">
              {" "}
              {offerId && offerId.offerId}{" "}
            </span>
          </div>
        </div>

        <div className="offerDetailsContentBox">
          <div className="offerDetailsListOne">
            <div className="OfferDetailsListHead">Offer Details</div>
            <div className="offerDetailsList">
              • &nbsp;&nbsp; &nbsp;&nbsp;Get{" "}
              {offerId && offerId.superCashPercent * 100}% SuperCash
            </div>
            <div className="offerDetailsList">
              • &nbsp;&nbsp; &nbsp;&nbsp;Maximum SuperCash is AED{" "}
              {offerId && offerId.maxSuperCash}
            </div>
            <div className="offerDetailsList">
              • &nbsp;&nbsp; &nbsp;&nbsp;Offer is valid{" "}
              {offerId && offerId.validPerMonth} times a month in the offer
              duration
            </div>
            <div className="offerDetailsList">
              • &nbsp;&nbsp; &nbsp;&nbsp;Offer valid upto{" "}
              {offerId && offerId.validUpto}
            </div>
          </div>

          <div className="offerDetailsListTwo">
            <div className="offerDetailsListDelivery">Delivering food to</div>
            <div className="offerDetailsListLocation">
              <div className="offerDetailsListPin">
                <img
                  src={require("../../assets/icn_pin.png")}
                  alt=""
                  className="offerDetailsPinImg"
                />
              </div>
              <div className="offerDetailsListLocationAddress">
                {placeValueFromRedux}
              </div>
            </div>
          </div>

          <div className="offerDetailsListThree">
            Offer applicable nearby outlets
          </div>
          {offerIdRest &&
            offerIdRest.map((offer: any) => {
              return (
                <>
                  <div className="offerDetailsListFour">
                    <div className="offerDetailsListLocationAddress">
                      {offer.restaurantName}
                    </div>{" "}
                    <div className="offerDetailsListDelivery">
                      {offer.restAddress}
                    </div>
                  </div>
                </>
              );
            })}
          <div className="offerDetailsListBtn">
            {!jwttokenLogin === null ? (
              <button
                className="offerDetailsListButton"
                onClick={() => {
                  offerfn();
                  sessionStorage.removeItem("offerId");
                }}
              >
                {" "}
                {JSON.parse(sessionStorage.getItem("offerId") || "[]") === true
                  ? "Remove Offer"
                  : "Apply Offer"}
              </button>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default OfferDetailsModal;
