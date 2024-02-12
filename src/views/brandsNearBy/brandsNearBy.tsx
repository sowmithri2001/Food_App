import { Radio, RadioGroup } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Header from "../../components/header/header";
import HeaderLogin from "../../components/headerLogin/headerLogin";
import "../../components/homeTwo/homeTwo.css";
import RestaurantsDetailsHeader from "../../components/restaurantDetailsHeader/restaurantsDetailsHeader";
import RestaurantSubHeader from "../../components/restaurantSubHeader/restaurantSubHeader";
import {
  allBrandsAsyncThunk,
  brandListAsyncThunk,
  brandsNearByAsyncThunk,
  brandsNearByProfileAsyncThunk,
  storeBrandId,
  viewBrandOffersAsyncThunk,
} from "../../redux/reducers/restaurantListSlice";
import "./brandsNearby.css";

const BrandsNearBy = () => {
  const arr: any = [1];

  const navigate = useNavigate();
  const dispatch = useDispatch();
  let brandDetails = useSelector(
    (state: any) => state.restaurantList.brandsNearBy
  );
  const brandDetailsMapData = brandDetails && brandDetails.nearByBrands;
  useEffect(() => {
    dispatch(brandsNearByAsyncThunk({ pageNo: 1, limit: 5 }));
  }, [dispatch]);

  const gotoBrandProfile = (i: any) => {
    let selectedBrand = brandDetailsMapData[i];
    dispatch(
      brandsNearByProfileAsyncThunk(selectedBrand && selectedBrand.brandId)
    );
    dispatch(brandListAsyncThunk(selectedBrand && selectedBrand.brandId));
    dispatch(
      viewBrandOffersAsyncThunk({
        brandId: selectedBrand && selectedBrand.brandId,
        limit: 2,
      })
    );
    dispatch(storeBrandId(selectedBrand && selectedBrand.brandId));
    navigate("/brandsNearbyDetails");
  };
  const search = useSelector((state: any) => state.restaurantList.searchValue);
  const jwttokenLogin = sessionStorage.getItem("jwtToken");
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
      <div className="routeDiv">
        <span className="RouteSing" onClick={() => navigate("/")}>
          Home
        </span>{" "}
        &#62; <span className="RouteSing">Brands Nearby</span>
      </div>
      <div className="brandsNearByContainer">
        <div
          className="brandsNearByContents"
          style={{ paddingTop: "10px", paddingBottom: "10px" }}
        >
          {arr.length === 0 ? (
            <div className="noPopularBrands">
              <div className="noPopularBrandsImg">
                <img
                  src={require("../../assets/icn_no_restaurants.jpg")}
                  alt=""
                />
              </div>
              <div className="oops">OOPS!</div>
              <div className="noPopularBrandsText">
                No brands nearby change to other locations and try.
              </div>
            </div>
          ) : (
            <>
              {brandDetailsMapData &&
                brandDetailsMapData
                  .filter((ele: any) => {
                    return search.toLowerCase() === ""
                      ? ele
                      : ele.brandName
                        .toLowerCase()
                        .includes(search.toLowerCase());
                  })
                  .map((ele: any, i: any) => {
                    return (
                      <div
                        className="brandsPopularHotelDetails"
                        key={i}
                        onClick={() => gotoBrandProfile(i)}
                      >
                        <div className="popularPresent" style={{ width: "100%" }}>
                          <div className="popularHotelImg">
                            <img
                              src={ele.profilePic}
                              alt="img"
                              className="popularHeartPhoto"
                            />
                          </div>
                          <div className="popularDetails popularDetailsinBrandsscreen">
                            <div className="popularNames">
                              <div className="popularNameImg">
                                <img
                                  src={ele.logo}
                                  alt="img"
                                  className="logoBrandLogo"
                                />
                              </div>{" "}
                              <div className="popularBrandsLoc">
                                {" "}
                                <div className="popularBrand">
                                  {ele.brandName}
                                </div>
                                <div className="popularNameLocation">
                                  {ele.brandOrigin}
                                </div>
                              </div>
                            </div>
                            <div className="popularNameDetails">
                              {ele.description}{" "}
                            </div>
                          </div>
                        </div>
                        <>
                          <div className="outLetsContainer">
                            <div className="outletsImgMenu">
                              <img
                                src={require("../../assets/icn_fav_menu.png")}
                                alt=""
                                className="brandsNewFavImg"
                              />
                            </div>
                            <div className="outletsText" style={{ cursor: "pointer" }}>Outlets</div>
                          </div>
                        </>
                      </div>
                    );
                  })}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default BrandsNearBy;
