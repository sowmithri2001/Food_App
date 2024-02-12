import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import HeaderLogin from "../headerLogin/headerLogin";
import RestaurantsDetailsHeader from "../restaurantDetailsHeader/restaurantsDetailsHeader";
import "./viewAllOffers.css";
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
import BestOffersHeader from "../bestOffersHeader/bestOffersHeader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ViewAllOffers = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const arr = [1, 2, 3, 4];
  const [searchBarValue, setsearchBarValue] = useState("");
  const jwttokenLogin = sessionStorage.getItem("jwtToken");
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
  let placeValueFromRedux = useSelector(
    (state: any) => state && state.placeAuto && state.placeAuto.placeValue
  );
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
  const offerDetailsMapData =
    viewAll && Object.values(viewAll) && Object.values(viewAll)[0];
  let homeOffers = useSelector((state: any) => state.cart.cartItems);
  console.log("jughtg", offerDetailsMapData);

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
  const [sessionn, setSessionn] = useState(false);

  const [offerModal, setOfferModal] = useState(false);
  const offerModalClose = () => {
    setOfferModal(false);
  };
  const cartIdss = cartDetailsfromRedux && cartDetailsfromRedux.cartId;
  const applyOffers = (offerId: any) => {
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
          //alert("Offer Applied");
          toast.success("Offer Applied", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
          console.log("ressdata", res.data);

          dispatch(setOfferApplied(res.data));
          sessionStorage.setItem("offerId", "true");
          navigate("/proceedToPayment");
        }
      })
      .catch((err: any) => {
        //alert(err.response.data);
        toast.error(err.response.data, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        sessionStorage.setItem("offerId", "false");
      });
  };

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
          <div className="brandsProfileHeader">
            {/* <div className="HotelDetailsHead">
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
                    {brandProfileDetailsData &&
                      brandProfileDetailsData.brandOrigin}
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
                    {brandProfileDetailsData &&
                      brandProfileDetailsData.description}
                  </div>
                </div>
              </div>
              <div className="hotelsDetailsHeader"></div>
            </div> */}
            <BestOffersHeader />
          </div>
          <div className="vewOffersContent">
            <div className="viewOffersContentBody">
              {" "}
              <div className="searchBarViewOffers">
                <input
                  type="text"
                  className="searchBarMenu"
                  value={searchBarValue}
                  onChange={(e: any) => handleChangeFn(e)}
                  placeholder="Search offers"
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
                    </div>
                  </div>
                </div>
              </div>
            </div>{" "}
            <div className="viewOffersFullContainer">
              {offerDetailsMapData &&
                offerDetailsMapData
                  .filter((offer: any) => {
                    return searchBarValue.toLowerCase() === ""
                      ? offer
                      : offer.description
                          .toLowerCase()
                          .includes(searchBarValue.toLowerCase());
                  })
                  .map((offer: any) => {
                    return (
                      // <div className="viewOfferCardContainer">
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
                      // </div>
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
          </div>
        </Modal>
      </>
    </>
  );
};

export default ViewAllOffers;
