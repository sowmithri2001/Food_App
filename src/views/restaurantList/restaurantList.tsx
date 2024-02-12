import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  allBrandsAsyncThunk,
  brandListAsyncThunk,
  brandsNearByProfileAsyncThunk,
  restaurantListAsyncThunk,
  restaurantListDescAsyncThunk,
} from "../../redux/reducers/restaurantListSlice";
import "./restaurantList.css";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import RestaurantSubHeader from "../../components/restaurantSubHeader/restaurantSubHeader";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import HeaderLogin from "../../components/headerLogin/headerLogin";
import {
  eachRestaurantGalleryAsyncThunk,
  eachRestaurantHeaderAsyncThunk,
  eachRestaurantMenuAsyncThunk,
  eachRestaurantOverviewAsyncThunk,
  eachRestaurantOverViewOpenAsyncThunk,
  eachRestaurantRatingAsyncThunk,
} from "../../redux/reducers/restaurantDetailsSlice";
import { setClearCartItems, slectREstId } from "../../redux/reducers/cartSlice";
import Loader from "../../components/Loader/loader";
import Header from "../../components/header/header";
const RestaurantList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  let data = useSelector((state: any) => state.restaurantList);
  let restDetails = data?.restaurants?.pageResults;
  let brandD = data && data.brands;
  let brandDetails = brandD[Object.keys(brandD && brandD)[0]];

  useEffect(() => {
    dispatch(allBrandsAsyncThunk());
  }, []);
  const jwttokenLogin = sessionStorage.getItem("jwtToken");
  //rest routing
  const goToRestaurantPageFn = (i: any) => {
    let selectedRest = restDetails[i];

    navigate("/restaurantDetails");
    dispatch(eachRestaurantHeaderAsyncThunk(selectedRest.restaurantId));
    dispatch(eachRestaurantMenuAsyncThunk(selectedRest.restaurantId));
    dispatch(eachRestaurantOverviewAsyncThunk(selectedRest.restaurantId));
    dispatch(eachRestaurantGalleryAsyncThunk(selectedRest.restaurantId));
    dispatch(eachRestaurantRatingAsyncThunk(selectedRest.restaurantId));
    dispatch(slectREstId(selectedRest.restaurantId));

    dispatch(setClearCartItems());

    localStorage.setItem("currentRestId", selectedRest.restaurantId);
  };
  sessionStorage.setItem("offerId", "false");
  //mapping restauarant
  let e = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17];
  let e2 = e.splice(0, 3);
  

  const [openNowValue, setopenNowValue] = useState(false);

  const [selectedValue, setSelectedValue] = useState("60");

  const handleChange1 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedValue(event.target.value);
  };

  const [selectedValue2, setSelectedValue2] = useState("150");

  const handleChange2 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedValue2(event.target.value);
  };

  const [selectedValue3, setSelectedValue3] = useState("90");

  const handleChange3 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedValue3(event.target.value);
  };

  const resetFn = () => {
    setSelectedValue("");
    setSelectedValue2("");
    setSelectedValue3("");
  };
  //

  //filter form
  let filterData = [
    {
      openNow: false,
      deliveryTime: "",
      averageMealCost: "",
      minimumOrder: "",
    },
  ];

  //
  const [desc, setdesc] = useState(true);
  const filterFormSubmitFn = (e: any) => {
    setopenFilter(false);
    e.preventDefault();
    filterData = [
      {
        openNow: openNowValue,
        deliveryTime: selectedValue,
        averageMealCost: selectedValue2,
        minimumOrder: selectedValue3,
      },
    ];

    dispatch(restaurantListAsyncThunk(filterData));
  };

  //mobileStates

  const [openFilter, setopenFilter] = useState(false);

  //loaderValue

  let loaderValue = useSelector(
    (state: any) =>
      state && state.restaurantList && state.restaurantList.loading
  );

  //got to brand outlets

  const gotoBrandProfile = (i: any) => {
    let selectedBrand = brandDetails[i];
    console.log("selectedBrand", selectedBrand.brandId);
    dispatch(
      brandsNearByProfileAsyncThunk(selectedBrand && selectedBrand.brandId)
    );
    dispatch(brandListAsyncThunk(selectedBrand && selectedBrand.brandId));
    navigate("/brandsNearbyDetails");
  };

  return (
    <>
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
          &#62; <span className="RouteSing">Restaurants</span>
        </div>
        <div className="restaurantListContainer">
          {loaderValue && <Loader />}
          <div className="restaurantContent">
            <div className="topSectionRC">
              <span className="rcHeading">Breakfast in Dubai</span>
              <div className="sort">
                <span
                  className="filterButtonForMobile"
                  onClick={() => {
                    setopenFilter(!openFilter);
                  }}
                >
                  Filters
                </span>
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
                      dispatch(dispatch(restaurantListDescAsyncThunk(desc)));
                    }}
                  >
                    Rating {desc ? <span>&#8642;</span> : <span>&#8639;</span>}
                  </span>
                </div>
              </div>
            </div>
            <div className="bottomSectionRC">
              <form className="leftSideRC" onSubmit={filterFormSubmitFn}>
                <div className="filterHead">
                  <span className="filterText">Filter</span>
                  <button className="resetText" onClick={resetFn}>
                    Reset All
                  </button>
                </div>
                <div className="filterContent">
                  <Accordion
                    sx={{
                      boxShadow: "none",
                    }}
                  >
                    <AccordionSummary
                      expandIcon={<span>+</span>}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                    >
                      <span className="accordian1Styling">
                        Time & Average meal cost
                      </span>
                    </AccordionSummary>
                    <AccordionDetails>
                      <div className="openstatusDiv">
                        <span className="showResText">
                          Show restaurant with
                        </span>
                        <div
                          className="openCloseBox"
                          onClick={() => setopenNowValue(!openNowValue)}
                        >
                          {openNowValue ? (
                            <img
                              src={require("../../assets/filter_checkbox.png")}
                              alt="check"
                              className="checkBox"
                            />
                          ) : (
                            <div className="checkBox"></div>
                          )}
                          {openNowValue ? (
                            <span className="OpenNowText">Open Now</span>
                          ) : (
                            <span className="OpenNowTextDisabled">
                              Open Now
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="deliveryTimeDiv">
                        <span className="headingStyling">Delivery Time</span>
                        <div className="optionOne">
                          <Radio
                            checked={selectedValue === "30"}
                            onChange={handleChange1}
                            value="30"
                            name="radio-buttons-delivery"
                            inputProps={{ "aria-label": "30" }}
                            sx={{
                              color: "#F78713",
                              "&.Mui-checked": {
                                color: "#F78713",
                              },
                            }}
                          />
                          <span className="optionTextStyling">30 min</span>
                        </div>
                        <div className="optionTwo">
                          <Radio
                            checked={selectedValue === "45"}
                            onChange={handleChange1}
                            value="45"
                            name="radio-button-delivery"
                            inputProps={{ "aria-label": "45" }}
                            sx={{
                              color: "#F78713",
                              "&.Mui-checked": {
                                color: "#F78713",
                              },
                            }}
                          />
                          <span className="optionTextStyling">45min</span>
                        </div>
                        <div className="optionThree">
                          <Radio
                            checked={selectedValue === "60"}
                            onChange={handleChange1}
                            value="60"
                            name="radio-buttons-delivery"
                            inputProps={{ "aria-label": "60" }}
                            sx={{
                              color: "#F78713",
                              "&.Mui-checked": {
                                color: "#F78713",
                              },
                            }}
                          />
                          <span className="optionTextStyling">60 min</span>
                        </div>
                      </div>
                      <div className="avgMealCostDiv">
                        <span className="headingStyling">
                          Average Meal Cost
                        </span>
                        <div className="optionOne">
                          <Radio
                            checked={selectedValue2 === "30"}
                            onChange={handleChange2}
                            value="30"
                            name="radio-buttons-avg-meal-cost"
                            inputProps={{ "aria-label": "30AED" }}
                            sx={{
                              color: "#F78713",
                              "&.Mui-checked": {
                                color: "#F78713",
                              },
                            }}
                          />
                          <span className="optionTextStyling">Upto 30 AED</span>
                        </div>
                        <div className="optionTwo">
                          <Radio
                            checked={selectedValue2 === "100"}
                            onChange={handleChange2}
                            value="100"
                            name="radio-buttons-avg-meal-cost"
                            inputProps={{ "aria-label": "60AED" }}
                            sx={{
                              color: "#F78713",
                              "&.Mui-checked": {
                                color: "#F78713",
                              },
                            }}
                          />
                          <span className="optionTextStyling">
                            Upto 100 AED
                          </span>
                        </div>
                        <div className="optionThree">
                          <Radio
                            checked={selectedValue2 === "150"}
                            onChange={handleChange2}
                            value="150"
                            name="radio-buttons-avg-meal-cost"
                            inputProps={{ "aria-label": "100AED" }}
                            sx={{
                              color: "#F78713",
                              "&.Mui-checked": {
                                color: "#F78713",
                              },
                            }}
                          />
                          <span className="optionTextStyling">
                            Upto 150 AED
                          </span>
                        </div>
                      </div>
                      <div className="minimumOrderCostDiv">
                        <span className="headingStyling">Minimum Order</span>
                        <div className="optionOne">
                          <Radio
                            checked={selectedValue3 === "80"}
                            onChange={handleChange3}
                            value="80"
                            name="radio-buttons-min-order"
                            inputProps={{ "aria-label": "60AED" }}
                            sx={{
                              color: "#F78713",
                              "&.Mui-checked": {
                                color: "#F78713",
                              },
                            }}
                          />
                          <span className="optionTextStyling">Upto 80 AED</span>
                        </div>
                        <div className="optionTwo">
                          <Radio
                            checked={selectedValue3 === "90"}
                            onChange={handleChange3}
                            value="90"
                            name="radio-buttons-min-order"
                            inputProps={{ "aria-label": "100AED" }}
                            sx={{
                              color: "#F78713",
                              "&.Mui-checked": {
                                color: "#F78713",
                              },
                            }}
                          />
                          <span className="optionTextStyling">Upto 90 AED</span>
                        </div>
                      </div>
                    </AccordionDetails>
                  </Accordion>
                  <Accordion
                    sx={{
                      boxShadow: "none",
                      borderBottom: "1px solid #E1E1E1",
                    }}
                  >
                    <AccordionSummary
                      expandIcon={<span>+</span>}
                      aria-controls="panel2a-content"
                      id="panel2a-header"
                    >
                      {/* <Typography>Accordion 2</Typography> */}
                      <span className="accordian2Styling">Cuisine</span>
                    </AccordionSummary>
                    <AccordionDetails>
                      <div className="CuisineList">
                        <div>
                          <Checkbox
                            sx={{
                              color: "#F78713",
                              "&.Mui-checked": {
                                color: "#F78713",
                              },
                            }}
                            value="Indian"
                          />
                          <span>Indian</span>
                        </div>
                        <div>
                          <Checkbox
                            sx={{
                              color: "#F78713",
                              "&.Mui-checked": {
                                color: "#F78713",
                              },
                            }}
                            value="Chinese"
                          />
                          <span>Chinese</span>
                        </div>
                        <div>
                          <Checkbox
                            sx={{
                              color: "#F78713",
                              "&.Mui-checked": {
                                color: "#F78713",
                              },
                            }}
                            value="Continental"
                          />
                          <span>Continental</span>
                        </div>
                        <div>
                          <Checkbox
                            sx={{
                              color: "#F78713",
                              "&.Mui-checked": {
                                color: "#F78713",
                              },
                            }}
                            value="Sea Food"
                          />
                          <span>Sea Food</span>
                        </div>
                      </div>
                    </AccordionDetails>
                  </Accordion>
                </div>
                <button
                  className="ApplyButtonDiv"
                  type="submit"
                  onClick={filterFormSubmitFn}
                >
                  APPLY
                </button>
              </form>
              {/* form filter for mobile */}

              {openFilter && (
                <form
                  className="leftSideRCForMobile"
                  onSubmit={filterFormSubmitFn}
                >
                  <div className="filterHead">
                    <span className="filterText">Filter</span>
                    <button className="resetText" onClick={resetFn}>
                      Reset All
                    </button>
                  </div>
                  <div className="filterContent">
                    <Accordion
                      sx={{
                        boxShadow: "none",
                      }}
                    >
                      <AccordionSummary
                        expandIcon={<span>+</span>}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                      >
                        {/* <Typography>Accordion 1</Typography> */}
                        <span className="accordian1Styling">
                          Time & Average meal cost
                        </span>
                      </AccordionSummary>
                      <AccordionDetails>
                        <div className="openstatusDiv">
                          <span className="showResText">
                            Show restaurant with
                          </span>
                          <div
                            className="openCloseBox"
                            onClick={() => setopenNowValue(!openNowValue)}
                          >
                            {openNowValue ? (
                              <img
                                src={require("../../assets/filter_checkbox.png")}
                                alt="check"
                                className="checkBox"
                              />
                            ) : (
                              <div className="checkBox"></div>
                            )}
                            {openNowValue ? (
                              <span className="OpenNowText">Open Now</span>
                            ) : (
                              <span className="OpenNowTextDisabled">
                                Open Now
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="deliveryTimeDiv">
                          <span className="headingStyling">Delivery Time</span>
                          <div className="optionOne">
                            <Radio
                              checked={selectedValue === "30"}
                              onChange={handleChange1}
                              value="30"
                              name="radio-buttons-delivery"
                              inputProps={{ "aria-label": "30" }}
                              sx={{
                                color: "#F78713",
                                "&.Mui-checked": {
                                  color: "#F78713",
                                },
                              }}
                            />
                            <span className="optionTextStyling">30 min</span>
                          </div>
                          <div className="optionTwo">
                            <Radio
                              checked={selectedValue === "45"}
                              onChange={handleChange1}
                              value="45"
                              name="radio-button-delivery"
                              inputProps={{ "aria-label": "45" }}
                              sx={{
                                color: "#F78713",
                                "&.Mui-checked": {
                                  color: "#F78713",
                                },
                              }}
                            />
                            <span className="optionTextStyling">45min</span>
                          </div>
                          <div className="optionThree">
                            <Radio
                              checked={selectedValue === "60"}
                              onChange={handleChange1}
                              value="60"
                              name="radio-buttons-delivery"
                              inputProps={{ "aria-label": "60" }}
                              sx={{
                                color: "#F78713",
                                "&.Mui-checked": {
                                  color: "#F78713",
                                },
                              }}
                            />
                            <span className="optionTextStyling">60 min</span>
                          </div>
                        </div>
                        <div className="avgMealCostDiv">
                          <span className="headingStyling">
                            Average Meal Cost
                          </span>
                          <div className="optionOne">
                            <Radio
                              checked={selectedValue2 === "30"}
                              onChange={handleChange2}
                              value="30"
                              name="radio-buttons-avg-meal-cost"
                              inputProps={{ "aria-label": "30AED" }}
                              sx={{
                                color: "#F78713",
                                "&.Mui-checked": {
                                  color: "#F78713",
                                },
                              }}
                            />
                            <span className="optionTextStyling">
                              Upto 30 AED
                            </span>
                          </div>
                          <div className="optionTwo">
                            <Radio
                              checked={selectedValue2 === "100"}
                              onChange={handleChange2}
                              value="100"
                              name="radio-buttons-avg-meal-cost"
                              inputProps={{ "aria-label": "60AED" }}
                              sx={{
                                color: "#F78713",
                                "&.Mui-checked": {
                                  color: "#F78713",
                                },
                              }}
                            />
                            <span className="optionTextStyling">
                              Upto 100 AED
                            </span>
                          </div>
                          <div className="optionThree">
                            <Radio
                              checked={selectedValue2 === "150"}
                              onChange={handleChange2}
                              value="150"
                              name="radio-buttons-avg-meal-cost"
                              inputProps={{ "aria-label": "100AED" }}
                              sx={{
                                color: "#F78713",
                                "&.Mui-checked": {
                                  color: "#F78713",
                                },
                              }}
                            />
                            <span className="optionTextStyling">
                              Upto 150 AED
                            </span>
                          </div>
                        </div>
                        <div className="minimumOrderCostDiv">
                          <span className="headingStyling">Minimum Order</span>
                          <div className="optionOne">
                            <Radio
                              checked={selectedValue3 === "80"}
                              onChange={handleChange3}
                              value="80"
                              name="radio-buttons-min-order"
                              inputProps={{ "aria-label": "60AED" }}
                              sx={{
                                color: "#F78713",
                                "&.Mui-checked": {
                                  color: "#F78713",
                                },
                              }}
                            />
                            <span className="optionTextStyling">
                              Upto 80 AED
                            </span>
                          </div>
                          <div className="optionTwo">
                            <Radio
                              checked={selectedValue3 === "90"}
                              onChange={handleChange3}
                              value="90"
                              name="radio-buttons-min-order"
                              inputProps={{ "aria-label": "100AED" }}
                              sx={{
                                color: "#F78713",
                                "&.Mui-checked": {
                                  color: "#F78713",
                                },
                              }}
                            />
                            <span className="optionTextStyling">
                              Upto 90 AED
                            </span>
                          </div>
                        </div>
                      </AccordionDetails>
                    </Accordion>
                    <Accordion
                      sx={{
                        boxShadow: "none",
                        borderBottom: "1px solid #E1E1E1",
                      }}
                    >
                      <AccordionSummary
                        expandIcon={<span>+</span>}
                        aria-controls="panel2a-content"
                        id="panel2a-header"
                      >
                        {/* <Typography>Accordion 2</Typography> */}
                        <span className="accordian2Styling">Cuisine</span>
                      </AccordionSummary>
                      <AccordionDetails>
                        <div className="CuisineList">
                          <div>
                            <Checkbox
                              sx={{
                                color: "#F78713",
                                "&.Mui-checked": {
                                  color: "#F78713",
                                },
                              }}
                              value="Indian"
                            />
                            <span>Indian</span>
                          </div>
                          <div>
                            <Checkbox
                              sx={{
                                color: "#F78713",
                                "&.Mui-checked": {
                                  color: "#F78713",
                                },
                              }}
                              value="Chinese"
                            />
                            <span>Chinese</span>
                          </div>
                          <div>
                            <Checkbox
                              sx={{
                                color: "#F78713",
                                "&.Mui-checked": {
                                  color: "#F78713",
                                },
                              }}
                              value="Continental"
                            />
                            <span>Continental</span>
                          </div>
                          <div>
                            <Checkbox
                              sx={{
                                color: "#F78713",
                                "&.Mui-checked": {
                                  color: "#F78713",
                                },
                              }}
                              value="Sea Food"
                            />
                            <span>Sea Food</span>
                          </div>
                        </div>
                      </AccordionDetails>
                    </Accordion>
                  </div>
                  <button
                    className="ApplyButtonDiv"
                    type="submit"
                    onClick={filterFormSubmitFn}
                  >
                    APPLY
                  </button>
                </form>
              )}

              <div className="rightSideRC">
                {restDetails?.map((e: any, i: any) => {
                  return (
                    <div
                      className="eachRestaurant"
                      key={i}
                      onClick={() => {
                        goToRestaurantPageFn(i);
                        window.scrollTo(0, 0);
                      }}
                    >
                      <img
                        className="imageDiv"
                        src={e?.profilePic}
                        alt="profilepic"
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
                      {e?.overAllRating === 0 ? (
                        <></>
                      ) : (
                        <div className="ratingDiv">{e?.overAllRating}</div>
                      )}
                      <img
                        src={require("../../assets/menu.png")}
                        alt="menu"
                        className="menuButton ripple"
                      />
                    </div>
                  );
                })}

                {/* popuar brands */}

                <div className="popularBrandsDiv">
                  <div className="pbHeading">
                    <span className="brandsHeading">Brands Nearby</span>
                    <span
                      className="moreBrandsButton"
                      onClick={() => {
                        navigate("/brandsNearby");
                        window.scroll(0, 0);
                      }}
                    >
                      More{" "}
                      <img
                        src={require("../../assets/right_arrow.png")}
                        alt=""
                      />{" "}
                    </span>
                  </div>
                  <div className="brandListDiv">
                    <Splide
                      aria-label="My Favorite Images"
                      options={{
                        perPage: 4,
                        perMove: 1,
                        width: "100%",
                        pagination: false,
                        type: "loop",
                      }}
                    >
                      {brandDetails &&
                        brandDetails.map((e: any, i: any) => {
                          return (
                            <SplideSlide>
                              <div
                                className="eachBrandDiv"
                                key={i}
                                onClick={() => gotoBrandProfile(i)}
                                style={{ cursor: "pointer" }}
                              >
                                <img
                                  src={e.logo}
                                  alt="brandLogo"
                                  className="brandLogoInCarousel"
                                />
                                <span className="brandName">{e.brandName}</span>
                                <span className="brandOutletCount">
                                  {e.brandId} outlets
                                </span>
                              </div>
                            </SplideSlide>
                          );
                        })}
                    </Splide>
                  </div>
                </div>

                <div className="rightSideRCList"></div>
              </div>
            </div>
          </div>
        </div>
      </>
    </>
  );
};

export default RestaurantList;
