import { Modal } from "@mui/material";
import React from "react";
import OfferDetailsModal from "../offerDetailsModal/offerDetailsModal";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import HeaderLogin from "../headerLogin/headerLogin";
import RestaurantSubHeader from "../restaurantSubHeader/restaurantSubHeader";
import "../viewAllOffersHome/viewAllOffersHome.css";
import { allOffersDetailsAsyncThunk } from "../../redux/reducers/dealsAndOffersSlice";
import Header from "../header/header";
import { Navigate, useNavigate } from "react-router-dom";
import { showModal } from "../../redux/reducers/modalSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const ViewAllOffersHome = () => {
  const dispatch = useDispatch();
  const allOffersList = useSelector(
    (state: any) =>
      state && state.restaurantList && state.restaurantList.viewAllOffer
  );
  console.log("allOffersLists", allOffersList && allOffersList);
  console.log(
    "allOffersLists2",
    allOffersList &&
      Object.values(allOffersList) &&
      Object.values(allOffersList)[0]
  );
  const offerDetailsMapData =
    allOffersList &&
    Object.values(allOffersList) &&
    Object.values(allOffersList)[0];
  let homeOffers = useSelector((state: any) => state.cart.cartItems);
  console.log("jughtg", homeOffers);
  const [offerModal, setOfferModal] = useState(false);
  const [searchBarValue, setsearchBarValue] = useState("");
  const offerModalClose = () => {
    setOfferModal(false);
  };
  const search = useSelector((state: any) => state.restaurantList.searchValue);
  console.log("seach", search);
  const jwttokenLogin = sessionStorage.getItem("jwtToken");
  const handleChangeFn = (e: any) => {
    setsearchBarValue(e.target.value);
  };
  let placeValueFromRedux = useSelector(
    (state: any) => state && state.placeAuto && state.placeAuto.placeValue
  );
  const navigate = useNavigate();
  const someFn = () => {
    if (jwttokenLogin === null) {
      toast.info("Please Login to avail offers", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });

      navigate("/login");
      dispatch(showModal());
    } else {
      toast.info("Please select dish to avail offers", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };

  return (
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
      <div className="viewAllOferHome">
        {" "}
        <div className="offerContentss">
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
        <div className="viewOffersFullContainer" style={{ display: "flex" }}>
          <div
            className="viewOffersFullContent"
            style={{
              display: "flex",
              width: "60%",
              flexWrap: "wrap",
              margin: "auto",
              gap: "10px",
              justifyContent: "center",
            }}
          >
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
                    <div
                      className="viewOfferCardContainer"
                      style={{ width: "47%", minWidth: "400px" }}
                    >
                      <div
                        className="viewOfferCardCardContent"
                        style={{ width: "100%", position: "relative" }}
                      >
                        <img
                          src={offer.photo}
                          alt="img"
                          className="viewOfferCouponImgs"
                          style={{ width: "100%" }}
                        />
                        <div
                          className="viewOffersContentsDivs"
                          style={{ left: "50px" }}
                        >
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
                              onClick={() => someFn()}
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
          </div>
        </div>{" "}
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
  );
};

export default ViewAllOffersHome;
