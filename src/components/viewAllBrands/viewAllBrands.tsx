import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import HeaderLogin from "../headerLogin/headerLogin";
import RestaurantsDetailsHeader from "../restaurantDetailsHeader/restaurantsDetailsHeader";
import "../viewAllOffers/viewAllOffers.css";
import "../../components/promoCodeImgCard/promoCodeImgCard.css";
import { Modal } from "@mui/material";
import OfferDetailsModal from "../offerDetailsModal/offerDetailsModal";
import RestaurantSubHeader from "../restaurantSubHeader/restaurantSubHeader";
import { allOffersDetailsAsyncThunk } from "../../redux/reducers/dealsAndOffersSlice";
import Loader from "../Loader/loader";
import {
  applyOffersAsyncThunk,
  setOfferApplied,
} from "../../redux/reducers/proceedDetails";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "../header/header";
import BrandProfileHeader from "../brandsProfile/brandProfileHeader";

const ViewAllBrands = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const arr = [1, 2, 3, 4];
  const [searchBarValue, setsearchBarValue] = useState("");
  const brandLists = useSelector(
    (state: any) =>
      state &&
      state.restaurantList &&
      state.restaurantList.brandList &&
      state.restaurantList.brandList.pageResults
  );

  const brandProfileDetailsDatas = useSelector(
    (state: any) => state.restaurantList.brandsNearByProfile
  );

  let brandProfileDetailsData = useSelector(
    (state: any) => state?.restaurantDetailsList?.restaurantHeader
  );
  console.log("brandProfileDetailsData", brandProfileDetailsData);
  const viewAll = useSelector(
    (state: any) =>
      state && state.restaurantList && state.restaurantList.restAll
  );
  console.log("brandListshghg", viewAll);

  console.log("brandLists", brandLists && brandLists.pageResults);

  const brandListsMapData = brandLists && brandLists.pageResults;
  const handleChangeFn = (e: any) => {
    setsearchBarValue(e.target.value);
  };

  const allOffersList = useSelector(
    (state: any) => state.restaurantList.viewOfferDetails
  );
  console.log("allOffersLists", allOffersList && allOffersList);
  console.log(
    "allOffersLists2",
    allOffersList &&
      Object.values(allOffersList) &&
      Object.values(allOffersList)[0]
  );
  // const offerDetailsMapData =
  //   viewAll && Object.values(viewAll) && Object.values(viewAll)[0];
  // let homeOffers = useSelector((state: any) => state.cart.cartItems);
  // console.log("jughtg", offerDetailsMapData);
  let placeValueFromRedux = useSelector(
    (state: any) => state && state.placeAuto && state.placeAuto.placeValue
  );
  let cartDetailsfromRedux = useSelector(
    (state: any) =>
      state &&
      state.proceedSlice &&
      state.proceedSlice &&
      state.proceedSlice.cartContentInCa &&
      state.proceedSlice.cartContentInCa &&
      state.proceedSlice.cartContentInCa.data &&
      state.proceedSlice.cartContentInCa.data
  );
  const offerDetailsData = useSelector(
    (state: any) => state.restaurantList.viewBrandOffers
  );
  console.log(
    "offerDetailsMapData",
    offerDetailsData && Object.values(offerDetailsData)[0]
  );
  const offerDetailsMapData =
    offerDetailsData && Object.values(offerDetailsData)[0];
  const [offerModal, setOfferModal] = useState(false);
  const offerModalClose = () => {
    setOfferModal(false);
  };
  const cartIdss = cartDetailsfromRedux && cartDetailsfromRedux.cartId;
  //loader
  // let loaderValue = useSelector((state: any) => state && state.dealsAndOffers && state.restaurantdealsAndOffers.loading && state.restaurantdealsAndOffers.loading);
  const applyOffers = (offerId: any) => {
    // dispatch(
    //   applyOffersAsyncThunk({
    //     offerId: offerId,
    //     cartId: cartDetailsfromRedux && cartDetailsfromRedux.cartId,
    //   })
    // );
    axios(
      `http://lorem-env.eba-vjfwziew.ap-northeast-1.elasticbeanstalk.com/User/apply?offerId=${offerId}&cartId=${cartIdss}`,
      {
        method: "get",
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("jwtToken")}`,
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
        },
      }
    )
      .then((res: any) => {
        if (res) {
          alert("Offer Applied");
          console.log("ressdata", res.data);
          dispatch(setOfferApplied(res.data));
          sessionStorage.setItem("offerId", "true");
          navigate("/proceedToPayment");
        }
      })
      .catch((err: any) => {
        alert(err.response.data);
        alert("Offer not applied");
      });
  };
  const jwttokenLogin = sessionStorage.getItem("jwtToken");
  return (
    <>
      {/* {loaderValue && <Loader />} */}
      <>
        {jwttokenLogin === null ? (
          <div
            style={{
              position: "relative",
              top: "0",
              right: "0",
              backgroundColor: "white",
              left: "0",
              width: "100%",
              height: "80px",
            }}
          >
            {" "}
            <Header />
          </div>
        ) : (
          <>
            <HeaderLogin />
          </>
        )}
        <RestaurantSubHeader />
        <div className="backgroundheaderDetailsimg">
          <img
            src={require("../../assets/backgroundheader.png")}
            alt=""
            className="backgroundheaderDetails"
          />
        </div>
        <div className="ViewAllOffersContainer">
          <BrandProfileHeader />
          <div className="vewOffersContent">
            <div className="viewOffersContentBody">
              {" "}
              <div className="searchBarViewOffers">
                <input
                  type="text"
                  className="searchBarMenu"
                  value={searchBarValue}
                  onChange={(e: any) => handleChangeFn(e)}
                />
                <img
                  src={require("../../assets/icn_search_home copy.png")}
                  alt="glass"
                  className="searchIcnMenu"
                />
              </div>
              <div className="viewOffersRightSide">
                <div className="deliveryFoodTo">
                  <div className="deliveryToLeft">
                    {" "}
                    <div className="deliveryfoodHead">Delivering food to</div>
                    <div className="viewOffersLocation">
                      <div className="viewOffersPin">
                        <img
                          src={require("../../assets/icn_pin.png")}
                          alt=""
                          className="icn_pin"
                        />
                      </div>
                      <div className="viewOrdersLoc">{placeValueFromRedux}</div>
                      <div className="changeViewOffers">Change</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>{" "}
            <div className="viewOffersFullContainer">
              {offerDetailsMapData &&
                offerDetailsMapData.map((offer: any) => {
                  return (
                    <div className="viewOfferCardContainer">
                      <div className="viewOfferCardCardContent">
                        <img
                          src={offer.photo}
                          alt="img"
                          className="viewOfferCouponImg"
                        />
                        <div className="viewOffersContentsDiv">
                          <div className="viewOfferTextTopDiv">
                            <span className="viewOfferCodeText">
                              {" "}
                              {offer.description}
                            </span>{" "}
                            <span className="viewOfferText">
                              Flat {offer.discount * 100}% Off
                            </span>
                            <span className="viewOfferTextBottomDiv">
                              <span className="couponCode">
                                {offer.offerId}
                              </span>
                              <span
                                className="viewGetOfferDiscount"
                                onClick={() => {
                                  setOfferModal(true);
                                  dispatch(
                                    allOffersDetailsAsyncThunk(offer.offerId)
                                  );
                                }}
                              >
                                View Details
                              </span>
                            </span>
                          </div>

                          <div className="viewOfferTextTopDiv">
                            <span
                              className="viewOfferCodeTextApply"
                              onClick={() => {
                                applyOffers(offer.offerId);
                              }}
                            >
                              {" "}
                              Apply
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}{" "}
            </div>{" "}
          </div>
        </div>
        <Modal
          open={offerModal}
          onClose={offerModalClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <div className="modalDiv offerModalDiv">
            <OfferDetailsModal />
            <div className="offerPrevNextButtons">
              <img
                src={require("../../assets/next button.png")}
                alt=""
                className="offerNextBtn"
                // onClick={() => {
                //   if (eachImgId > 0) {
                //     seteachImgId(eachImgId - 1);
                //     setmodalImg(galleryImages[eachImgId - 1]);
                //   }
                // }}
              />

              <img
                src={require("../../assets/next button.png")}
                alt=""
                className="offerNextButton"
                // onClick={() => {
                //   if (eachImgId + 1 < galleryImages.length) {
                //     seteachImgId(eachImgId + 1);
                //     setmodalImg(galleryImages[eachImgId + 1]);
                //   }
                // }}
              />
            </div>
          </div>
        </Modal>
      </>
    </>
  );
};

export default ViewAllBrands;
