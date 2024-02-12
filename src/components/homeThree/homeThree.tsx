import "./homeThree.css";
import "../homeTwo/homeTwo.css";
import "../../components/promoCodeImgCard/promoCodeImgCard.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  allOffersDetailsAsyncThunk,
  dealsAndOffersAsyncThunk,
} from "../../redux/reducers/dealsAndOffersSlice";
import { useNavigate } from "react-router-dom";
import { showModal } from "../../redux/reducers/modalSlice";
import {
  viewallOfferAsyncThunk,
  viewOfferDetailsAsyncThunk,
} from "../../redux/reducers/restaurantListSlice";
import { Modal } from "@mui/material";
import OfferDetailsModal from "../offerDetailsModal/offerDetailsModal";

const HomeThree = () => {
  const [offerModal, setOfferModal] = useState(false);
  const offerModalClose = () => {
    setOfferModal(false);
  };
  let [change, setChange] = useState<number>(1);
  const [disablePrev, setDisablePrev] = useState(true);
  const [disableNxt, setDisableNxt] = useState(false);
  const dealsOffers = useSelector(
    (state: any) => state.dealsAndOffers.data.data
  );

  const jwttokenLogin = sessionStorage.getItem("jwtToken");
  const dealsOffersMapData = dealsOffers && dealsOffers[2];
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(dealsAndOffersAsyncThunk(change));
  }, [dispatch]);

  const Next = () => {
    setChange(++change);
    if (change === 4) {
      setDisableNxt(true);
      setDisablePrev(false);
    } else {
      setDisableNxt(false);
      setDisablePrev(false);
    }

    dispatch(dealsAndOffersAsyncThunk(change));
  };
  const Previous = () => {
    setChange(--change);
    if (change === 0) {
      setDisablePrev(true);
      setDisableNxt(false);
    } else {
      setDisablePrev(false);
      setDisableNxt(false);
    }
    dispatch(dealsAndOffersAsyncThunk(change));
  };

  const navigate = useNavigate();
  return (
    <>
      <div className="homeThreeConatiner">
        <div className="homeThreecontents">
          <div className="bestDealsOffers">
            <div className="bestOffersHead">Best Deals & Offers</div>
            <div className="offerListText">
              Endless deals near you! Grab the best deals and offers.
            </div>
          </div>
          <div className="offerListsContainer">
            <div className="offersParent">
              {dealsOffersMapData &&
                dealsOffersMapData.map((deals: any, i: any) => {
                  return (
                    <div className="promoCodeImgCardContainer" key={i}>
                      <div className="promoCodeImgCardContentNew">
                        <img
                          src={deals.photo}
                          alt="img"
                          className="promoCodeCouponImgNew"
                        />

                        <div className="parentDeals">
                          {" "}
                          <div className="offerTextTopDivNew">
                            <span className="descriptionOffer">
                              {deals.description}
                            </span>
                            <span className="offerTextNew">
                              Flat {deals.discount * 100}% Off
                            </span>
                            <span className="offerCodeTextNew">
                              {" "}
                              {deals.offerId}{" "}
                            </span>
                          </div>
                          <div className="offerTextBottomDivNew">
                            <span
                              className="viewDetilsOffers"
                              onClick={() => {
                                setOfferModal(true);
                                dispatch(
                                  allOffersDetailsAsyncThunk(deals.offerId)
                                );
                              }}
                            >
                              view details
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
            {/* ifj */}
            <div className="allOffersDeals">
              <div
                className="allOffersText"
                onClick={() => {
                  dispatch(viewallOfferAsyncThunk());
                  navigate("/ViewAllOffersHome");
                  window.scrollTo(0, 0);
                }}
              >
                All offers & deals
              </div>
              <div className="arrowNext">
                {" "}
                <i className="fa-solid fa-angle-right angleRight"></i>
              </div>
            </div>
            <div className="nextBrandsThree">
              {" "}
              <div className="nextBtnDiv">
                <button
                  className="previousBtn"
                  onClick={Previous}
                  disabled={disablePrev ? true : false}
                >
                  <img
                    src={require("../../assests/next button.png")}
                    alt=""
                    className="prevRight"
                  />
                </button>
              </div>{" "}
              <div className="nextBtnDiv">
                <button
                  className="nextBtn"
                  onClick={Next}
                  disabled={disableNxt ? true : false}
                >
                  <img
                    src={require("../../assests/next button.png")}
                    alt=""
                    className="previousRight"
                  />
                </button>
              </div>
            </div>
          </div>
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
  );
};

export default HomeThree;
