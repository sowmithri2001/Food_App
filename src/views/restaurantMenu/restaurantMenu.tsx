import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  inputLabelClasses,
  Modal,
  Radio,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/Loader/loader";
import RestaurantSubHeader from "../../components/restaurantSubHeader/restaurantSubHeader";
import {
  setAddItemToCart,
  setRemoveItemFromCart,
  setTotalAmount,
  setIncreaseItemQuantity,
  setDecreaseItemQuantity,
  setClearCartItems,
  setAddOnsToCart,
  storeTotalAmt,
  setAddonPrice,
  setCookingInstruction,
  setDate,
  setTime,

  // setRemoveAddOnFromCart,
} from "../../redux/reducers/cartSlice";
import { stepperValue } from "../../redux/reducers/cartStepperSlice";
import { closeModal, showModal } from "../../redux/reducers/modalSlice";
import {
  addToCartAsyncThunk,
  getMyCartAsyncThunk,
  setDateValue,
  setItemDis,
  setTimeValue,
} from "../../redux/reducers/proceedDetails";

import {
  searchRestaurantMenuAsyncThunk,
  storeCustomization,
} from "../../redux/reducers/restaurantDetailsSlice";
import { customiseDataAsyncThunk } from "../../redux/reducers/restaurantListSlice";
import { showScheduleModal } from "../../redux/reducers/scheduleModalSlice";
import "./restaurantMenu.css";
const RestaurantMenu = () => {
  const navigate = useNavigate();
  const [searchBarValue, setsearchBarValue] = useState("");
  const [setArray, setSetArray] = useState<any>(false);
  let itemsToSend: any = [];
  const dispatch = useDispatch();
  const [add, setAdd] = useState(false);
  const jwttokenLogin = sessionStorage.getItem("jwtToken");
  localStorage.setItem("addOnPrice", "0");
  let e = [1, 2, 3, 4];
  let rec = [1, 2, 3];
  let soup = [1, 2, 3, 4];
  let appet = [1, 2];
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
    dispatch(searchRestaurantMenuAsyncThunk({ restautrantId, searchBarValue }));
  };

  const cartDataRestId = JSON.parse(
    localStorage.getItem("currentRestId") || "[]"
  );

  //addon

  const [openAddonmodal, setopenAddonmodal] = useState(false);
  const handleClose = () => {
    setopenAddonmodal(false);
  };
  const [totalAmountVar, setTotalAmountVar] = useState(0);
  const [addOnArray, setaddOnArray] = useState([]);
  const [dishdETAILSonAdd, setdishdETAILSonAdd] = useState<any>({});
  const [customiseModal, setCustomiseModal] = useState(false);
  const openAddonmodalFn = (j: any, i: any, e: any) => {
    let addOnArray =
      restaurantMenuArray &&
      restaurantMenuArray[j].menuDetailsList[i].addonList;
    setaddOnArray(addOnArray);
    setdishdETAILSonAdd(e);
    setopenAddonmodal(true);
  };

  //   dispatch(setAddItemToCart())
  // };
  let SelectedRestId = useSelector(
    (state: any) =>
      state && state.cart && state.cart.restaurantId && state.cart.restaurantId
  );

  let testTotal = useSelector(
    (state: any) => state && state.cart && state.TotalAmt
  );

  let cartDataAddOn = useSelector((state: any) => state.cart.cartItems);

  let cartTotalAmount = useSelector((state: any) => state.cart.cartTotalAmount);
  useEffect(() => {}, [cartDataAddOn]);

  const customise = () => {
    setCustomiseModal(false);
  };

  const customiseData = useSelector(
    (state: any) =>
      state && state.restaurantList && state.restaurantList.customiseData
  );

  const [selectedValue, setSelectedValue] = useState<any>(0);

  const handleChange1 = (
    event: React.ChangeEvent<HTMLInputElement>,
    data: any
  ) => {
    setSelectedValue(event.target.value);
    dispatch(storeCustomization(data));
  };

  //cart modal for mobile
  const [openCartmodal, setopenCartmodal] = useState(false);
  const [changeColor, setChangeColor] = useState(false);
  const openCartModalFn = () => {
    setopenCartmodal(true);
  };
  const closeCartModalFn = () => {
    setopenCartmodal(false);
  };

  //schedule modal
  const [scheduleModalValue, setscheduleModalValue] = useState(false);
  const openScheduleModal = () => {
    setscheduleModalValue(true);
  };
  const handleCloseSchedule = () => {
    setscheduleModalValue(false);
  };

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
  const storedCartId = useSelector((state: any) => state.proceedSlice.cartId);

  //cooking instruction
  let cookin = useSelector(
    (state: any) => state && state.cart && state.cart.cookingInstruction
  );
  const [cookingValue, setcookingValue] = useState<any>(cookin);
  const cookingFieldFn = (e: any) => {
    setcookingValue(e.target.value);
    dispatch(setCookingInstruction(e.target.value));
  };
  const tokenCompareFn = () => {
    if (jwttokenLogin === null) {
      navigate("/login");
      dispatch(showModal());
    } else {
      openScheduleModal();
    }
  };
  //date

  const [date, setdate] = useState<any>(new Date());

  const today = () => {
    setdate(new Date());
  };
  let currentDate: any = date.getDate();
  let currentMonth: any = date.getMonth();
  let currentYear: any = date.getYear();
  let currentTime: any = date.getTime();
  let currentTimeHour: any = date.getHours();
  let currentTimeMinute: any = ("0" + date.getMinutes()).slice(-2);

  const [dateValue, setdateValue] = useState<any>(
    `${currentYear + 1900}-${currentMonth + 1}-${currentDate}`
  );

  const [timeValue, settimeValue] = useState<any>(
    `${currentTimeHour}:${currentTimeMinute}`
  );
  useEffect(() => {
    dispatch(setDateValue(dateValue));
    dispatch(setTimeValue(timeValue));
  }, [timeValue, dateValue]);

  const cus = useSelector((state: any) => state.restaurantList.customiseData);

  const removeAddOns = (e: any) => {
    dispatch(setRemoveItemFromCart(e));
    dispatch(setTotalAmount(e));
  };
  const scheduleSubmit = (e: any) => {
    e.preventDefault();
    dispatch(
      addToCartAsyncThunk({
        cartId: "",
        restaurantId: SelectedRestId,
        itemsIncart: cartDataAddOn && cartDataAddOn,
        cookingInstruction: cookingValue,
        toPay: cartTotalAmount,
        scheduleDate: dateValue,
        scheduleTime: timeValue + ":00",
      })
    );
    navigate("/mycart");
    dispatch(getMyCartAsyncThunk());
    //window.location.reload();
  };

  return (
    <>
      <div className="restaurantMenuContainer">
        {!openCartmodal && (
          <div
            className="proceedToCartForMobile"
            onClick={() => openCartModalFn()}
          >
            PROCEED TO CART
          </div>
        )}
        <div className="restaurantMenuContent">
          <div className="rcMenuLeftSide">
            <div className="searchBarDivMenu">
              <input
                type="text"
                className="searchBarMenu"
                value={searchBarValue}
                onChange={(e: any) => handleChangeFn(e)}
                placeholder="Search an Item"
              />
              <img
                src={require("../../assets/icn_search_home copy.png")}
                alt="glass"
                className="searchIcnMenu"
              />
            </div>
            <div className="eachCatogery">
              {restaurantMenuArray &&
                restaurantMenuArray.map((f: any, j: any) => {
                  return (
                    <>
                      <span className="restaurantMenuArrayText">
                        {f.dishType} ({f.count})
                      </span>
                      {f &&
                        f.menuDetailsList.map((e: any, i: any) => {
                          return (
                            <div className="eachItemOnMenu">
                              <div className="dishImageDiv">
                                <img
                                  src={
                                    e.dishPhoto
                                      ? e.dishPhoto
                                      : "https://www.zoopindia.com/blog/wp-content/uploads/2022/09/satvik-food-for-navratri.webp"
                                  }
                                  alt="dishImage"
                                  className="eachdishImage"
                                />
                                {e.veg ? (
                                  <img
                                    src={require("../../assets/icon_veg.png")}
                                    alt="vegNonVeg"
                                    className="vegNonVegIcn"
                                  />
                                ) : (
                                  <img
                                    src={require("../../assets/Group 8 Copy 2.png")}
                                    alt="vegNonVeg"
                                    className="vegNonVegIcn"
                                  />
                                )}
                              </div>
                              <div className="dishDetailsDiv">
                                <div className="topNameDetailsDiv">
                                  <span className="DishNameText">
                                    {e.dishName}
                                  </span>
                                  <span className="DishPriceText">
                                    AED{e.price}
                                  </span>
                                  {e.bestSeller ? (
                                    <img
                                      src={require("../../assets/Best seller.png")}
                                      alt="bestseller"
                                      className="bestsellerIcn"
                                    />
                                  ) : (
                                    <></>
                                  )}
                                </div>
                                {e.customizable ? (
                                  <div className="customisableDiv">
                                    Customisable
                                  </div>
                                ) : (
                                  <></>
                                )}
                                <div className="descriptionAndAddDiv">
                                  <div className="leftSideDesc">
                                    {e.description}
                                  </div>
                                  <div
                                    className="rightSideButtons"
                                    onClick={() => {
                                      setAdd(true);
                                      openAddonmodalFn(j, i, e);
                                    }}
                                  >
                                    ADD
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                    </>
                  );
                })}

              <Modal
                open={openAddonmodal}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <div className="addOnModalDiv addOnModalstyle">
                  {addOnArray && addOnArray.length === 0 ? (
                    <>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          padding: "40px",
                        }}
                      >
                        <span> No AddOns</span>
                        <div
                          className="rightSideButtons"
                          onClick={() => {
                            setopenAddonmodal(false);
                            dispatch(setAddItemToCart(dishdETAILSonAdd));
                            dispatch(setTotalAmount(dishdETAILSonAdd));
                            setChangeColor(true);
                          }}
                          style={{ marginRight: "15px" }}
                        >
                          {" "}
                          ADD DISH
                        </div>
                      </div>
                    </>
                  ) : (
                    <div>
                      <div className="addOnHeading">
                        Do you want to add any Addons?
                      </div>
                      <span>Add ons({addOnArray && addOnArray.length})</span>
                      {addOnArray &&
                        addOnArray.map((e: any, i: any) => {
                          return (
                            <div className="eachItemOnMenu">
                              <div className="dishImageDiv">
                                <img
                                  src={require("../../assets/addon.jpg")}
                                  alt="dishImage"
                                  className="eachdishImage"
                                />
                              </div>
                              <div className="dishDetailsDiv">
                                <div className="topNameDetailsDiv">
                                  <span className="DishNameText">
                                    {e.addon}
                                  </span>
                                  <span className="DishPriceText">
                                    AED{e.price}
                                  </span>
                                </div>
                                <div className="descriptionAndAddDiv">
                                  <div className="leftSideDesc"></div>
                                  <div
                                    className="rightSideButtons"
                                    onClick={() => {
                                      setopenAddonmodal(false);
                                      dispatch(
                                        setAddItemToCart(dishdETAILSonAdd)
                                      );
                                      dispatch(
                                        setTotalAmount(dishdETAILSonAdd)
                                      );
                                      setChangeColor(true);
                                    }}
                                    style={{ marginRight: "15px" }}
                                  >
                                    {" "}
                                    SKIP
                                  </div>
                                  <div
                                    className="rightSideButtons"
                                    onClick={() => {
                                      setopenAddonmodal(false);
                                      dispatch(
                                        setAddOnsToCart(dishdETAILSonAdd)
                                      );
                                      dispatch(
                                        setAddItemToCart(dishdETAILSonAdd)
                                      );
                                      dispatch(
                                        setTotalAmount(dishdETAILSonAdd)
                                      );
                                      setSetArray(true);
                                      setChangeColor(true);
                                    }}
                                  >
                                    ADD
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                    </div>
                  )}
                </div>
              </Modal>
            </div>
          </div>
          <div className="rcMenuRightSide">
            <div className="orderSummaryHead">
              <span className="OrderHead">My Order</span>
              <span
                className="clearCart"
                onClick={() => dispatch(setClearCartItems())}
              >
                Clear Cart
              </span>
            </div>
            <div className="orderList">
              {cartDataAddOn &&
                cartDataAddOn.map((e: any, i: any) => {
                  const testVar: any =
                    e.addOnQuantity === undefined
                      ? 0
                      : (e &&
                          e.addonList &&
                          e.addonList[0] &&
                          e.addonList[0].price) * e.addOnQuantity;
                  dispatch(storeTotalAmt(testVar));

                  return (
                    <div className="eachOrder">
                      <div className="eachOrderTop">
                        <div className="topLeftDiv">
                          <span className="dishName">
                            {e.veg ? (
                              <img
                                src={require("../../assets/icon_veg.png")}
                                alt="veg"
                                className="nonvegmark"
                              />
                            ) : (
                              <img
                                src={require("../../assets/Group 8 Copy 2.png")}
                                alt="nonVeg"
                                className="nonvegmark"
                              />
                            )}{" "}
                            &nbsp;&nbsp;
                            {(e && e.dishName) || (e && e.addon)}
                          </span>
                          <span className="dishPrice">
                            AED{e && e.price}.00
                          </span>
                        </div>
                        <div className="topRightDiv">
                          <div className="quantityIncDec">
                            <img
                              src={require("../../assets/my_order_minus_inactive.png")}
                              alt="minus"
                              className="minusSign"
                              onClick={() => {
                                dispatch(setDecreaseItemQuantity(e));
                                dispatch(setTotalAmount(e));
                              }}
                            />
                            <span className="quantityValue">
                              {e && e.cartQuantity === 0
                                ? removeAddOns(e)
                                : e.cartQuantity}
                            </span>
                            <img
                              src={require("../../assets/my_order_plus_active.png")}
                              alt="plus"
                              className="plusSign"
                              onClick={() => {
                                dispatch(setIncreaseItemQuantity(e));
                                dispatch(setTotalAmount(e));
                              }}
                            />
                          </div>
                          <span className="totalQuantityPrice">
                            AED
                            {(e && e.price) * (e && e.cartQuantity) + testVar}
                            .00
                          </span>
                        </div>
                      </div>
                      <div className="eachOrderDesc">
                        <span className="descriptionText">
                          Add On :&nbsp;
                          {e && e.addOnQuantity > 0
                            ? e &&
                              e.addonList &&
                              e.addonList[0] &&
                              e.addonList[0].addon
                            : "No Addons"}
                        </span>
                      </div>
                      <div className="eachOrderAccordian">
                        <Accordion
                          sx={{
                            boxShadow: "none",
                            borderBottom: "none",
                          }}
                        >
                          <AccordionSummary
                            expandIcon={<span></span>}
                            aria-controls="panel2a-content"
                            id="panel2a-header"
                          >
                            <div className="accordianHeading">
                              <span
                                className="leftSideAC"
                                onClick={() => {
                                  dispatch(
                                    customiseDataAsyncThunk({
                                      restaurantId: SelectedRestId,
                                      dishId: e.dishId,
                                    })
                                  );
                                  setCustomiseModal(true);
                                }}
                              >
                                customise
                              </span>
                              <span
                                className="rightSide"
                                onClick={() => {
                                  dispatch(setRemoveItemFromCart(e));
                                  dispatch(setTotalAmount(e));
                                }}
                              >
                                Remove
                              </span>
                            </div>
                          </AccordionSummary>
                          <AccordionDetails>
                            <TextField
                              id="standard-basic"
                              label="Add Customisation"
                              variant="standard"
                              sx={{
                                width: 1,
                                "& .MuiInput-underline:before": {
                                  borderBottomColor: "#f67e03",
                                },
                                "& .MuiInput-underline:after": {
                                  borderBottomColor: "#f67e03",
                                },
                                "& .MuiFormLabel-root.Mui-disabled": {
                                  color: "red",
                                },
                              }}
                              InputLabelProps={{
                                sx: {
                                  // set the color of the label when not shrinked
                                  color: "#f67e03",
                                  [`&.${inputLabelClasses.shrink}`]: {
                                    // set the color of the label when shrinked (usually when the TextField is focused)
                                    color: "#f67e03",
                                  },
                                },
                              }}
                            />
                          </AccordionDetails>
                        </Accordion>
                      </div>
                    </div>
                  );
                })}
            </div>
            <div className="payMentAccordian">
              <Accordion
                sx={{
                  boxShadow: " 0 2px 10px 0 rgba(198,198,198,0.5)",
                  borderBottom: "none",
                }}
              >
                <AccordionSummary
                  expandIcon={<span></span>}
                  aria-controls="panel2a-content"
                  id="panel2a-header"
                >
                  <div className="paymentaccordianHeading">
                    <span className="leftSidePAC">To Pay</span>
                    <span className="rightSidePAC">
                      AED {cartTotalAmount + totalAmountVar}
                    </span>
                  </div>
                </AccordionSummary>
                <AccordionDetails
                  sx={{
                    bgcolor: "#FCFCFC",
                  }}
                >
                  <div className="paymentDescriptionSplit">
                    <div className="itemsTotalDiv">
                      <span className="leftSide">Items total</span>
                      <span className="rightSide">
                        {" "}
                        AED{(cartTotalAmount / 1.05).toFixed(2)}
                      </span>
                    </div>
                    <div className="itemsTotalDiv">
                      <span className="leftSide">Fee/ charges</span>
                      <span className="rightSide">
                        AED {(cartTotalAmount * 0.05).toFixed(2)}
                      </span>
                    </div>
                    <div className="itemsTotalDiv">
                      <span className="leftSide">Discount</span>
                      <span className="rightSide">AED 00.00</span>
                    </div>
                  </div>
                </AccordionDetails>
              </Accordion>
            </div>
            <div className="cookingInstructionDiv">
              <span className="cookinInstructionHead">
                Cooking instructions?
              </span>
              <TextField
                value={cookingValue}
                onChange={(e: any) => cookingFieldFn(e)}
                id="standard-basic"
                label="Mention it here ..."
                variant="standard"
                sx={{
                  width: 1,
                  "& .MuiInput-underline:before": {
                    borderBottomColor: "#000000",
                  },
                  "& .MuiInput-underline:after": {
                    borderBottomColor: "#f67e03",
                  },
                  "& .MuiFormLabel-root.Mui-disabled": {
                    color: "red",
                  },
                }}
                InputLabelProps={{
                  sx: {
                    // set the color of the label when not shrinked
                    color: "#000000",
                    [`&.${inputLabelClasses.shrink}`]: {
                      // set the color of the label when shrinked (usually when the TextField is focused)
                      color: "#f67e03",
                    },
                  },
                }}
              />
            </div>
            <div
              className="checkOutButton"
              onClick={() => {
                tokenCompareFn();
              }}
            >
              PROCEED TO CHECKOUT &#62;
            </div>
          </div>

          <Modal
            open={customiseModal}
            onClose={customise}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <div className="customiseDiv addCustomiseDiv">
              <div className="customiseDataContainer">
                {customiseData && customiseData.customizableCount === 0 ? (
                  <div className="noCustomiseData">noCustomiseData</div>
                ) : (
                  <div className="noCustomiseData">
                    <div className="custimisedDataHeading">
                      Choose Customization
                    </div>
                    {customiseData &&
                      customiseData.customisableList &&
                      customiseData.customisableList.map(
                        (data: any, i: any) => {
                          return (
                            <div className="customisedDatas" key={i}>
                              <div className="deliveryTimeDiv">
                                <div className="optionOne">
                                  <Radio
                                    checked={
                                      selectedValue === data.customizeItem
                                    }
                                    onChange={handleChange1}
                                    value={data.customizeItem}
                                    name="radio-buttons-delivery"
                                    inputProps={{ "aria-label": "30" }}
                                    sx={{
                                      color: "#F78713",
                                      "&.Mui-checked": {
                                        color: "#F78713",
                                      },
                                    }}
                                  />
                                  <span className="optionTextStyling">
                                    {data.customizeItem}
                                  </span>
                                </div>
                              </div>
                            </div>
                          );
                        }
                      )}
                    <div className="customizationBottom">
                      <div className="customizationAmt">AED{selectedValue}</div>
                      <div className="customizationBtn">ADD TO MY ORDER</div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </Modal>
          {/* rcmenurightsideModalForMobile */}

          <Modal
            open={openCartmodal}
            onClose={() => {
              setopenCartmodal(false);
            }}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <div className="rcMenuRightSideForMobile style">
              <span onClick={() => closeCartModalFn()}>Go back to menu</span>
              <div className="orderSummaryHead">
                <span className="OrderHead">My Order</span>
                <span
                  className="clearCart"
                  onClick={() => dispatch(setClearCartItems())}
                >
                  Clear Cart
                </span>
              </div>
              <div className="orderList">
                {cartDataAddOn &&
                  cartDataAddOn.map((e: any, i: any) => {
                    const arrayToSend: any = {
                      dishId: e && e.dishId,
                      addOnCount: e && e.addOnQuantity,
                      itemCount: e.cartQuantity,
                      customizeId: "",
                    };
                    itemsToSend.push(arrayToSend);

                    return (
                      <div className="eachOrder">
                        <div className="eachOrderTop">
                          <div className="topLeftDiv">
                            <span className="dishName">
                              <img
                                src={require("../../assets/Group 8 Copy 2.png")}
                                alt="nonVeg"
                              />{" "}
                              {(e && e.dishName) || (e && e.addon)}
                            </span>
                            <span className="dishPrice">
                              AED{e && e.price}.00
                            </span>
                          </div>
                          <div className="topRightDiv">
                            <div className="quantityIncDec">
                              <img
                                src={require("../../assets/my_order_minus_inactive.png")}
                                alt="minus"
                                className="minusSign"
                                onClick={() => {
                                  dispatch(setDecreaseItemQuantity(e));
                                  dispatch(setTotalAmount(e));
                                }}
                              />
                              <span className="quantityValue">
                                {e && e.cartQuantity === 0
                                  ? dispatch(setRemoveItemFromCart(e))
                                  : e.cartQuantity}
                              </span>
                              <img
                                src={require("../../assets/my_order_plus_active.png")}
                                alt="plus"
                                className="plusSign"
                                onClick={() => {
                                  dispatch(setIncreaseItemQuantity(e));
                                  dispatch(setTotalAmount(e));
                                }}
                              />
                            </div>
                            <span className="totalQuantityPrice">
                              AED{e.price}.00
                            </span>
                          </div>
                        </div>
                        <div className="eachOrderDesc">
                          <span className="descriptionText">Add On :</span>
                        </div>
                        <div className="eachOrderAccordian">
                          <Accordion
                            sx={{
                              boxShadow: "none",
                              borderBottom: "none",
                            }}
                          >
                            <AccordionSummary
                              expandIcon={<span></span>}
                              aria-controls="panel2a-content"
                              id="panel2a-header"
                            >
                              <div className="accordianHeading">
                                <span className="leftSideAC">customise</span>
                                <span
                                  className="rightSide"
                                  onClick={() => {
                                    dispatch(setRemoveItemFromCart(e));
                                    dispatch(setTotalAmount(e));
                                  }}
                                >
                                  Remove
                                </span>
                              </div>
                            </AccordionSummary>
                            <AccordionDetails>
                              <TextField
                                id="standard-basic"
                                label="Add Customisation"
                                variant="standard"
                                sx={{
                                  width: 1,
                                  "& .MuiInput-underline:before": {
                                    borderBottomColor: "#f67e03",
                                  },
                                  "& .MuiInput-underline:after": {
                                    borderBottomColor: "#f67e03",
                                  },
                                  "& .MuiFormLabel-root.Mui-disabled": {
                                    color: "red",
                                  },
                                }}
                                InputLabelProps={{
                                  sx: {
                                    // set the color of the label when not shrinked
                                    color: "#f67e03",
                                    [`&.${inputLabelClasses.shrink}`]: {
                                      // set the color of the label when shrinked (usually when the TextField is focused)
                                      color: "#f67e03",
                                    },
                                  },
                                }}
                              />
                            </AccordionDetails>
                          </Accordion>
                        </div>
                      </div>
                    );
                  })}
              </div>
              <div className="payMentAccordian">
                <Accordion
                  sx={{
                    boxShadow: " 0 2px 10px 0 rgba(198,198,198,0.5)",
                    borderBottom: "none",
                  }}
                >
                  <AccordionSummary
                    expandIcon={<span></span>}
                    aria-controls="panel2a-content"
                    id="panel2a-header"
                  >
                    <div className="paymentaccordianHeading">
                      <span className="leftSidePAC">To Pay</span>
                      <span className="rightSidePAC">
                        AED {cartTotalAmount}.00
                      </span>
                    </div>
                  </AccordionSummary>
                  <AccordionDetails
                    sx={{
                      bgcolor: "#FCFCFC",
                    }}
                  >
                    <div className="paymentDescriptionSplit">
                      <div className="itemsTotalDiv">
                        <span className="leftSide">Items total</span>
                        <span className="rightSide">
                          {" "}
                          AED{cartTotalAmount}.00
                        </span>
                      </div>
                      <div className="itemsTotalDiv">
                        <span className="leftSide">Fee/ charges</span>
                        <span className="rightSide">AED 00.00</span>
                      </div>
                      <div className="itemsTotalDiv">
                        <span className="leftSide">Discount</span>
                        <span className="rightSide">AED 00.00</span>
                      </div>
                    </div>
                  </AccordionDetails>
                </Accordion>
              </div>
              <div className="cookingInstructionDiv">
                <span className="cookinInstructionHead">
                  Cooking instructions?
                </span>
                <TextField
                  id="standard-basic"
                  label="Mention it here ..."
                  variant="standard"
                  sx={{
                    width: 1,
                    "& .MuiInput-underline:before": {
                      borderBottomColor: "#000000",
                    },
                    "& .MuiInput-underline:after": {
                      borderBottomColor: "#f67e03",
                    },
                    "& .MuiFormLabel-root.Mui-disabled": {
                      color: "red",
                    },
                  }}
                  InputLabelProps={{
                    sx: {
                      // set the color of the label when not shrinked
                      color: "#000000",
                      [`&.${inputLabelClasses.shrink}`]: {
                        // set the color of the label when shrinked (usually when the TextField is focused)
                        color: "#f67e03",
                      },
                    },
                  }}
                />
              </div>
              <div
                className="checkOutButton ripple"
                onClick={() => openScheduleModal()}
              >
                PROCEED TO CHECKOUT &#62;
              </div>
            </div>
          </Modal>
          <Modal
            open={scheduleModalValue}
            onClose={handleCloseSchedule}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <div className="modalDiv style">
              <div className="scheduleBodyy">
                <div className="backBtnConatiner">
                  <img
                    src={require("../../assets/dismiss button.png")}
                    className="addAddressBackButton"
                    onClick={() => handleCloseSchedule()}
                  />
                </div>
                <div className="scheduleBodyHold">
                  {" "}
                  <div className="scheduleHeader">
                    <div className="scheduleHeading">Schedule</div>
                    <div className="scheduleBody">
                      Busy at work now, schedule it for later!
                    </div>
                  </div>
                  <div className="scheduleFormContainer">
                    <form className="shceduleForm">
                      <div className="scheduleEmail">
                        {/* <TextField
                          id="standard-basic"
                          label="Date"
                          variant="standard"
                          sx={{
                            width: 1,
                            "& .MuiInput-underline:before": {
                              borderBottomColor: "black",
                            },
                            "& .MuiInput-underline:after": {
                              borderBottomColor: "#0000007f",
                            },
                            "& .MuiFormLabel-root.Mui-disabled": {
                              color: "red",
                            },
                          }}
                          InputLabelProps={{
                            sx: {
                              // set the color of the label when not shrinked
                              color: "#0000008a",
                              [`&.${inputLabelClasses.shrink}`]: {
                                // set the color of the label when shrinked (usually when the TextField is focused)
                                color: "#0000008a",
                              },
                            },
                          }}
                        /> */}
                        <TextField
                          id="date"
                          label="Date"
                          type="date"
                          value={dateValue}
                          onChange={(e) => {
                            setdateValue(e.target.value);
                          }}
                          variant="standard"
                          sx={{
                            width: 1,
                            "& .MuiInput-underline:before": {
                              borderBottomColor: "black",
                            },
                            "& .MuiInput-underline:after": {
                              borderBottomColor: "#0000007f",
                            },
                            "& .MuiFormLabel-root.Mui-disabled": {
                              color: "red",
                            },
                          }}
                          InputLabelProps={{
                            sx: {
                              // set the color of the label when not shrinked
                              color: "#0000008a",
                              [`&.${inputLabelClasses.shrink}`]: {
                                // set the color of the label when shrinked (usually when the TextField is focused)
                                color: "#0000008a",
                              },
                            },
                          }}
                        />
                      </div>
                      <div className="scheduleEmail">
                        <TextField
                          id="time"
                          label="Time"
                          type="time"
                          variant="standard"
                          name="time"
                          value={timeValue}
                          onChange={(e) => {
                            settimeValue(e.target.value);
                          }}
                          inputProps={{
                            step: 300, // 5 min
                          }}
                          sx={{
                            width: 1,
                            "& .MuiInput-underline:before": {
                              borderBottomColor: "black",
                            },
                            "& .MuiInput-underline:after": {
                              borderBottomColor: "#0000007f",
                            },
                            "& .MuiFormLabel-root.Mui-disabled": {
                              color: "red",
                            },
                          }}
                          InputLabelProps={{
                            shrink: true,
                            sx: {
                              // set the color of the label when not shrinked
                              color: "#0000008a",
                              [`&.${inputLabelClasses.shrink}`]: {
                                // set the color of the label when shrinked (usually when the TextField is focused)
                                color: "#0000008a",
                              },
                            },
                          }}
                        />
                      </div>
                      <div className="scheduleBttn">
                        <button
                          className="scheduleDateTime"
                          onClick={(e: any) => {
                            let value: any = 25;
                            dispatch(setDate(dateValue));
                            dispatch(setTime(timeValue));
                            scheduleSubmit(e);
                            // dispatch(stepperValue(value));
                          }}
                        >
                          SCHEDULE DATE AND TIME
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </Modal>
        </div>
      </div>
    </>
  );
};

export default RestaurantMenu;
