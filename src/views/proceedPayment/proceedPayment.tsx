import React, { useState } from "react";
import "./proceedPayment.css";
import "../restaurantMenu/restaurantMenu.css";
import RestaurantSubHeader from "../../components/restaurantSubHeader/restaurantSubHeader";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  inputLabelClasses,
  Radio,
  TextField,
} from "@mui/material";
import PromoCodeImgCard from "../../components/promoCodeImgCard/promorCodeImgCard";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import { AutoScroll } from "@splidejs/splide-extension-auto-scroll";
import PaymentProcess from "../../components/paymentProcess/paymentProcess";
import ChoseAddress from "../../components/choseAddress/choseAddress";
import SelectPaymentMethod from "../../components/selectPaymentMethod/selectPaymentMethod";
import HeaderLogin from "../../components/headerLogin/headerLogin";
import CartStepper from "../../components/cartStepper/cartStepper";
import { useDispatch, useSelector } from "react-redux";
import { setCookingInstruction } from "../../redux/reducers/cartSlice";
import {
  restaurantListDescAsyncThunk,
  viewallRestOfferDetailsAsyncThunk,
} from "../../redux/reducers/restaurantListSlice";
import { eachRestaurantHeaderAsyncThunk } from "../../redux/reducers/restaurantDetailsSlice";
const ProceedPayment = () => {
  let e = [1, 2, 3, 4, 5];
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [selectedValue, setSelectedValue] = useState("Add your referral code");
  let restaurantDetails = useSelector(
    (state: any) =>
      state &&
      state.restaurantDetailsList &&
      state.restaurantDetailsList.restaurantHeader &&
      state.restaurantDetailsList.restaurantHeader
  );

  let cart = useSelector((state: any) => state && state.cart);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedValue(event.target.value);
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

  const allOffersList = useSelector(
    (state: any) =>
      state &&
      state.restaurantList &&
      state.restaurantList.viewOfferLimit &&
      state.restaurantList.viewOfferLimit
  );

  const offerDetailsMapData = allOffersList && Object.values(allOffersList)[0];
  const resId = cartDetailsfromRedux && cartDetailsfromRedux.restaurantId;
  return (
    <>
      <div className="proceedPaymentContainer">
        <HeaderLogin />
        <RestaurantSubHeader />
        <CartStepper />
        <div className="proceedPaymentContent">
          <div className="paymentHead">
            <span className="headingText">
              {cartDetailsfromRedux && cartDetailsfromRedux.restaurantName}
            </span>
            <span className="headingSubText">
              Estimated Delivery time -{" "}
              {cartDetailsfromRedux &&
                cartDetailsfromRedux.deliveryDuration - 10}{" "}
              -{" "}
              {cartDetailsfromRedux &&
                cartDetailsfromRedux.deliveryDuration + 10}{" "}
              min
            </span>
          </div>
          <div className="paymentContent">
            <div className="leftSidePayment">
              <Outlet />
            </div>
            <div className="rightSidePaymentSummary">
              <span className="offersHeadText">Offers</span>
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
                  <div className="optionTwo">
                    <Radio
                      checked={selectedValue === "Add your referral code"}
                      onChange={handleChange}
                      value="Add your referral code"
                      name="radio-buttons"
                      inputProps={{ "aria-label": "Add your referral code" }}
                      sx={{
                        color: "#000",
                        "&.Mui-checked": {
                          color: "#000",
                        },
                      }}
                    />
                    <span className="optionTextStyling">
                      Add your referral Code
                    </span>
                  </div>
                </AccordionSummary>
                <AccordionDetails sx={{ position: "relative" }}>
                  <div className="optionTextStylingDiv">
                    <span className="addDetailsText">Add your Promo code</span>
                  </div>
                  <TextField
                    id="standard-basic"
                    label="Promo code ..."
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
                        color: " #4A4A4A",
                        [`&.${inputLabelClasses.shrink}`]: {
                          // set the color of the label when shrinked (usually when the TextField is focused)
                          color: " #fff",
                        },
                      },
                    }}
                  />
                  <button className="applyButton">Apply</button>
                  <span className="noCOD">
                    COD option will not available for this offer.
                  </span>
                </AccordionDetails>
              </Accordion>
              <Accordion
                sx={{
                  boxShadow: "none",
                  borderBottom: "none",
                  width: 1,
                }}
              >
                <AccordionSummary
                  expandIcon={<span></span>}
                  aria-controls="panel2a-content"
                  id="panel2a-header"
                >
                  <div className="optionTwo">
                    <Radio
                      checked={selectedValue === "Best Offers"}
                      onChange={handleChange}
                      value="Best Offers"
                      name="radio-buttons"
                      inputProps={{ "aria-label": "Best Offers" }}
                      sx={{
                        color: "#000",
                        "&.Mui-checked": {
                          color: "#000",
                        },
                      }}
                    />
                    <span className="optionTextStyling">Best Offers</span>
                  </div>
                </AccordionSummary>
                <AccordionDetails sx={{ position: "relative" }}>
                  <div
                    className="viewAllOffersButton"
                    onClick={() => {
                      dispatch(
                        viewallRestOfferDetailsAsyncThunk({
                          restaurantId: resId,
                        })
                      );
                      dispatch(eachRestaurantHeaderAsyncThunk(resId));
                      navigate("/offersDetails");
                    }}
                  >
                    View all offers
                  </div>
                  <Splide
                    aria-label="promoCodes"
                    options={{
                      type: "loop",
                      arrows: false,
                      drag: "free",
                      focus: "center",
                      autoScroll: {
                        speed: 1,
                      },
                    }}
                  >
                    {offerDetailsMapData &&
                      offerDetailsMapData.map((offer: any, i: any) => {
                        return (
                          <SplideSlide>
                            <div
                              className="promoCodeImgCardContainer"
                              style={{ paddingRight: "10px" }}
                            >
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
                                  <span>
                                    • Get flat {offer.discount * 100}% Off
                                  </span>
                                  <span>
                                    • Max discount {offer.discount * 100}%
                                  </span>
                                  <span>• Valid upto {offer.validUpto}</span>
                                </span>
                              </div>
                            </div>
                          </SplideSlide>
                        );
                      })}
                  </Splide>
                </AccordionDetails>
              </Accordion>
              <div className="paymentSplitDiv">
                <span className="payText">To Pay</span>
                <span className="payValue">
                  AED
                  {cartDetailsfromRedux && cartDetailsfromRedux.toPay}
                </span>
              </div>
              <div className="paymentLine1">
                <span className="itemsTotalText">Items total</span>
                <span className="itemsTotalText">
                  AED{cartDetailsfromRedux && cartDetailsfromRedux.toPay}
                </span>
              </div>
              <div className="paymentLine2">
                <span className="itemsTotalText">Fee/ charges</span>
                <span className="itemsTotalText">
                  AED{cartDetailsfromRedux && cartDetailsfromRedux.toPay * 0.05}
                </span>
              </div>
              <div className="paymentLine3">
                <span className="itemsTotalText">Discount</span>
                <span className="itemsTotalText">AED0.00</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProceedPayment;
