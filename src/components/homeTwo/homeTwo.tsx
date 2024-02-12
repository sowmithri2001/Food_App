import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { popularBrandsAsyncThunk } from "../../redux/reducers/homePageslice";
import { showModal } from "../../redux/reducers/modalSlice";
import { brandsNearByAsyncThunk } from "../../redux/reducers/restaurantListSlice";
import "./homeTwo.css";

const HomeTwo = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let [change, setChange] = useState<number>(1);
  const [disablePrev, setDisablePrev] = useState(true);
  const [disableNxt, setDisableNxt] = useState(false);
  const popularBrandsResp = useSelector((state: any) => state.popularBrands);
  const popularBrandsMapData: any =
    popularBrandsResp &&
    popularBrandsResp.data &&
    popularBrandsResp.data.data &&
    Object.values(popularBrandsResp.data.data)[0];
  useEffect(() => {
    dispatch(popularBrandsAsyncThunk(change));
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

    dispatch(popularBrandsAsyncThunk(change));
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
    dispatch(popularBrandsAsyncThunk(change));
  };

  return (
    <>
      <div className="homeTwoContainer">
        <div className="homeTwoContents">
          <div className="popularBrands">
            <div className="popularHead">Popular Brands</div>
            <div className="popularContent">
              Find out more about the world's top food brands are available all
              over the world today.
            </div>
          </div>
          <div className="popularHotel">
            {false ? (
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
                {" "}
                {popularBrandsMapData &&
                  popularBrandsMapData.map((brand: any, i: number) => {
                    return (
                      <div className="popularHotelDetails" key={i}>
                        <div className="popularPresent" id="slide">
                          <div className="popularHotelImg">
                            <img
                              src={brand && brand.profilePic}
                              alt="img"
                              className="popularHeartPhoto"
                            />
                          </div>
                          <div className="popularDetails">
                            <div className="popularNames">
                              <div className="popularNameImg">
                                <img
                                  src={brand && brand.logo}
                                  alt="img"
                                  className="popularBrandsLogoImg"
                                />
                              </div>{" "}
                              <div className="popularBrandsLoc">
                                {" "}
                                <div className="popularBrand">
                                  {brand && brand.brandName}
                                </div>
                                <div className="popularNameLocation">
                                  {brand && brand.brandOrigin}
                                </div>
                              </div>
                            </div>
                            <div className="popularNameDetails">
                              {brand && brand.description}
                            </div>
                          </div>
                        </div>
                        <div>
                          {" "}
                          <div className="allBrands">
                            <div
                              className="allBrandsText"
                              onClick={() => {
                                navigate("/brandsNearBy");
                                dispatch(
                                  brandsNearByAsyncThunk({
                                    pageNo: 1,
                                    limit: 15,
                                  })
                                );
                              }}
                            >
                              All Brands
                            </div>
                            <div className="nextBtn">
                              <i className="fa-solid fa-angle-right angleRight"></i>
                            </div>
                          </div>
                          <div className="nextBrands">
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
                    );
                  })}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default HomeTwo;
