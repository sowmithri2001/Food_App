import { useNavigate } from "react-router-dom";
import HeaderLogin from "../../components/headerLogin/headerLogin";
import RestaurantsDetailsHeader from "../../components/restaurantDetailsHeader/restaurantsDetailsHeader";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import RestaurantSubHeader from "../../components/restaurantSubHeader/restaurantSubHeader";
import {
  eachRestaurantGalleryAsyncThunk,
  eachRestaurantHeaderAsyncThunk,
  eachRestaurantMenuAsyncThunk,
  eachRestaurantOverviewAsyncThunk,
  eachRestaurantRatingAsyncThunk,
  searchRestaurantMenuAsyncThunk,
} from "../../redux/reducers/restaurantDetailsSlice";
import "../../views/restaurantMenu/restaurantMenu.css";
import PromoCodeImgCard from "../../components/promoCodeImgCard/promorCodeImgCard";
import "./brandProfileDetails.css";
import {
  brandListAsyncThunk,
  viewBrandOffersAsyncThunk,
  viewOfferDetailsAsyncThunk,
  viewOfferLimitDetailsAsyncThunk,
} from "../../redux/reducers/restaurantListSlice";
import ViewAllOffers from "../../components/viewAllOffers/viewAllOffers";
import {
  allBrandsAsyncThunk,
  restaurantListAsyncThunk,
  restaurantListDescAsyncThunk,
} from "../../redux/reducers/restaurantListSlice";
import { setClearCartItems, slectREstId } from "../../redux/reducers/cartSlice";
import Header from "../../components/header/header";
import { useSelect } from "@mui/base";
import BrandProfileHeader from "../../components/brandsProfile/brandProfileHeader";

const BrandProfileDetails = () => {
  let ratingsCases = [4, 4, 3, 4, 2];
  const [rId, setrId] = useState("");
  let ratingImg: any;
  const navigate = useNavigate();
  const [orange, setorange] = useState({
    orangem: true,
    orangeo: false,
    orangeg: false,
    oranger: false,
  });
  const menuFn = () => {
    setorange({
      orangem: true,
      orangeo: false,
      orangeg: false,
      oranger: false,
    });
    navigate("");
  };

  const OvFn = () => {
    setorange({
      orangem: false,
      orangeo: true,
      orangeg: false,
      oranger: false,
    });
    navigate("restaurantOverview");
  };

  const rrFn = () => {
    setorange({
      orangem: false,
      orangeo: false,
      orangeg: false,
      oranger: true,
    });
    navigate("restReview");
  };

  const glryFn = () => {
    setorange({
      orangem: false,
      orangeo: false,
      orangeg: true,
      oranger: false,
    });
    navigate("restGallery");
  };

  let data = useSelector((state: any) => state.restaurantList);
  let restDetails = data?.restaurants?.pageResults;
  let restaurantHeaderDetails = useSelector(
    (state: any) => state?.restaurantDetailsList?.restaurantHeader
  );
  const [searchBarValue, setsearchBarValue] = useState("");
  const dispatch = useDispatch();
  const [add, setAdd] = useState(false);
  const [desc, setdesc] = useState(true);
  let e = [1, 2, 3, 4];
  let rec = [1, 2, 3];
  let soup = [1, 2, 3, 4];
  let appet = [1, 2];
  const brandLists = useSelector(
    (state: any) =>
      state &&
      state.restaurantList &&
      state.restaurantList.brandList &&
      state.restaurantList.brandList.pageResults
  );

  // let restaurantMenuArray = useSelector((state: any) => state?.restaurantDetailsList?.restaurantMenu?.menuItem);
  let restaurantMenuArray = useSelector(
    (state: any) =>
      state &&
      state.restaurantDetailsList &&
      state.restaurantDetailsList.restaurantMenu &&
      state.restaurantDetailsList.restaurantMenu.menuItem &&
      state.restaurantDetailsList.restaurantMenu.menuItem
  );
  let restautrantId = useSelector(
    (state: any) =>
      state &&
      state.restaurantDetailsList &&
      state.restaurantDetailsList.restaurantMenu &&
      state.restaurantDetailsList.restaurantMenu.restaurantId
  );

  const handleChangeFn = (e: any) => {
    setsearchBarValue(e.target.value);
  };

  const brandProfileDetailsData = useSelector(
    (state: any) =>
      state && state.restaurantList && state.restaurantList.brandsNearByProfile
  );


  useEffect(() => {
    setrId(brandLists && brandLists[0].restaurantId);
    const r: any = brandLists && brandLists[0].restaurantId;
    dispatch(viewOfferLimitDetailsAsyncThunk({ restaurantId: r, limit: 2 }));
  }, []);





  const brandListsMapData = brandLists && brandLists.pageResults;
  const goToRestaurantPageFn = (i: any) => {
    let selectedRest = brandLists[i];
    navigate("/restaurantDetails");
    dispatch(eachRestaurantHeaderAsyncThunk(selectedRest.restaurantId));
    dispatch(eachRestaurantMenuAsyncThunk(selectedRest.restaurantId));
    dispatch(eachRestaurantOverviewAsyncThunk(selectedRest.restaurantId));
    dispatch(eachRestaurantGalleryAsyncThunk(selectedRest.restaurantId));
    dispatch(eachRestaurantRatingAsyncThunk(selectedRest.restaurantId));
    dispatch(slectREstId(selectedRest.restaurantId));
    // dispatch(eachRestaurantOverViewOpenAsyncThunk(selectedRest.restautrantId));
    dispatch(setClearCartItems());
    localStorage.setItem("currentRestId", selectedRest.restaurantId);
  };
  const offerDetailsData = useSelector(
    (state: any) => state.restaurantList.viewBrandOffers
  );
  const offerDetailsMapData =
    offerDetailsData && Object.values(offerDetailsData)[0];
  const jwttokenLogin = sessionStorage.getItem("jwtToken");
  const useBrandId = useSelector((state: any) => state.restaurantList.brandId);


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
      <div className="backgroundheaderDetailsimg">
        <img
          src={require("../../assets/backgroundheader.png")}
          alt=""
          className="backgroundheaderDetails"
        />
      </div>
      <div className="brandsProfileDetailsContainer">
        <BrandProfileHeader />
        <div className="restaurantMenuContainer1">
          <div className="restaurantMenuContent contentInBrandsDetails">
            <div className="rcMenuLeftSide leftSideInBrandDetails">
              <div className="searchBarDivMenu">
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
              <div className="eachCatogery">
                <div className="filterContainer">
                  {" "}
                  <div className="filterArrowContainer">
                    {" "}
                    <span className="restaurantMenuArrayText">Filter </span>
                    <span className="downarrow">
                      <img
                        src={require("../../assets/arrow_choose_address.png")}
                        alt=""
                        className="filterArroww"
                      />
                    </span>
                  </div>
                  <div className="sort">
                    <div className="listBy">
                      <span className="option">List By :</span>
                      <span className="optionList">All</span>
                    </div>
                    <div className="sortBy">
                      <span className="option">Sort By :</span>
                      <span
                        className="optionList"
                        onClick={() => {
                          setdesc(!desc);
                          dispatch(
                            dispatch(restaurantListDescAsyncThunk(desc))
                          );
                        }}
                      >
                        Rating{" "}
                        {desc ? <span>&#8642;</span> : <span>&#8639;</span>}
                      </span>
                    </div>
                  </div>
                </div>
                {brandLists &&
                  brandLists.map((e: any, i: any) => {

                    return (
                      <div className="eachRestaurant" key={i}>
                        <img
                          className="imageDiv"
                          src={e?.profilePic}
                          alt="profilepic"
                          onClick={() => goToRestaurantPageFn(i)}
                        />
                        <div className="detailsDiv">
                          <div className="headDetails">
                            <span className="headingRestaurantName">
                              {e?.restaurantName}
                            </span>
                            <span className="restaurantAddress">
                              {e?.addressDesc}
                            </span>
                          </div>
                          <div className="subDetails">
                            <span className="cuisine">{e?.restaurantType}</span>
                            {e?.opened ? (
                              <span className="statusGreen">Open Now</span>
                            ) : (
                              <span className="statusRed">Closed</span>
                            )}
                            <span className="moreDetails">
                              &#8231; {e?.averageDeliveryTime.toFixed(0)} mins
                              &#8231; AED{e?.minimumCost} min order &#8231; AED
                              {e?.avgMealCost} avg meal cost
                            </span>
                          </div>
                        </div>
                        <div className="ratingDiv">{e?.overAllRating}</div>
                        <img
                          src={require("../../assets/menu.png")}
                          alt="menu"
                          className="menuButton"
                        />
                      </div>
                    );
                  })}
              </div>
            </div>
            <div className="rcMenuRightSide" style={{ padding: "10px" }}>
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
                            <span className="offerCodeText">
                              {" "}
                              {offer.offerId}{" "}
                            </span>
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
              <div
                className="viewAllOffersDivv"
                onClick={() => {


                  dispatch(
                    viewBrandOffersAsyncThunk({
                      brandId: useBrandId,
                      limit: 10,
                    })
                  );
                  navigate("/brandsoffersDetails");
                }}
              >
                View all Offers &#62;
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BrandProfileDetails;
