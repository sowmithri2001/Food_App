import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  inputLabelClasses,
  Radio,
  TextField,
} from "@mui/material";
import { useState } from "react";
import PromoCodeImgCard from "../../components/promoCodeImgCard/promorCodeImgCard";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import { AutoScroll } from "@splidejs/splide-extension-auto-scroll";
import "../../views/proceedPayment/proceedPayment.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { stepperValue } from "../../redux/reducers/cartStepperSlice";
import {
  setCookingInstruction,
  setDecreaseItemQuantity,
  setIncreaseItemQuantity,
  setRemoveItemFromCart,
  setTotalAmount,
} from "../../redux/reducers/cartSlice";
import {
  addToCartAsyncThunk,
  getCartContentAsyncThunk,
  getMyCartAsyncThunk,
} from "../../redux/reducers/proceedDetails";
const PaymentProcess = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let SelectedRestId = useSelector(
    (state: any) =>
      state && state.cart && state.cart.restaurantId && state.cart.restaurantId
  );
  let cartDataAddOn = useSelector((state: any) => state.cart.cartItems);
  let cartTotalAmount = useSelector((state: any) => state.cart.cartTotalAmount);
  const [dishdETAILSonAdd, setdishdETAILSonAdd] = useState<any>({});
  let e = [1, 2, 3, 4, 5];
  let cart = useSelector(
    (state: any) =>
      state && state.cart && state.cart.cartItems && state.cart.cartItems
  );

  //cooking instruction
  let cookin = useSelector(
    (state: any) => state && state.cart && state.cart.cookingInstruction
  );
  const [cookingValue, setcookingValue] = useState<any>(cookin);
  const cookingFieldFn = (e: any) => {
    setcookingValue(e.target.value);
    dispatch(setCookingInstruction(e.target.value));
  };
  const timeValuefromRedux = useSelector(
    (state: any) => state.proceedSlice.time
  );
  const dateValuefromRedux = useSelector(
    (state: any) => state.proceedSlice.dates
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
  const storedCartId = useSelector((state: any) => state.proceedSlice.cartId);
  localStorage.setItem("cartss", JSON.stringify(cartDetailsfromRedux));
  let cartItemsFromRedux =
    cartDetailsfromRedux && cartDetailsfromRedux.itemsIncart;
  const openAddonmodalFn = (e: any) => {
    setdishdETAILSonAdd(e);
  };

  return (
    <>
      <div className="paymentProcessContainer">
        <div className="orderList">
          {cartItemsFromRedux &&
            cartItemsFromRedux.map((e: any, i: any) => {
              const testVar: any =
                e.addOnQuantity === undefined
                  ? 0
                  : (e &&
                      e.addonList &&
                      e.addonList[0] &&
                      e.addonList[0].price) * e.addOnQuantity;
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
                        )}
                        {e.dishName}
                      </span>
                      <span className="dishPrice">AED{e.price}</span>
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
                          {e && e.itemCount === 0
                            ? dispatch(setRemoveItemFromCart(e))
                            : e.itemCount}
                        </span>
                        <img
                          src={require("../../assets/my_order_plus_active.png")}
                          alt="plus"
                          className="plusSign"
                          // onClick={() => {
                          //   dispatch(setIncreaseItemQuantity(e));
                          //   dispatch(setTotalAmount(e));
                          //   openAddonmodalFn(e);
                          //   dispatch(
                          //     addToCartAsyncThunk({
                          //       cartId: storedCartId,
                          //       restaurantId: SelectedRestId,
                          //       itemsIncart: cartDataAddOn && cartDataAddOn,
                          //       cookingInstruction: cookingValue,
                          //       toPay: cartTotalAmount,
                          //       scheduleDate: dateValuefromRedux,
                          //       scheduleTime: timeValuefromRedux + ":00",
                          //     })
                          //   );
                          // }}
                        />
                      </div>
                      <span className="totalQuantityPrice">
                        AED
                        {e.price + (e.addOnCount > 0 ? e.addOns[0].price : 0)}
                      </span>
                    </div>
                  </div>
                  <div className="eachOrderDesc">
                    <span className="descriptionText">
                      Add On :{" "}
                      {e.addOnCount > 0 ? e.addOns[0].addon : "No Addons"}
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
                          <span className="leftSideAC">customise</span>
                          <span className="rightSide">Remove</span>
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
        <div className="cookingInstructionDiv">
          <span className="cookinInstructionHead">Cooking instructions?</span>
          <TextField
            value={cookingValue}
            onChange={(e: any) => cookingFieldFn(e)}
            id="standard-basic"
            label="Mention it here ..."
            variant="standard"
            sx={{
              width: 1,
              "& .MuiInput-underline:before": { borderBottomColor: "#000000" },
              "& .MuiInput-underline:after": { borderBottomColor: "#f67e03" },
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
        <div className="PaymentButtonDiv">
          <button
            className="backButton"
            onClick={() => {
              let value: any = 75;
              dispatch(stepperValue(value));
              navigate("/restaurantDetails");
            }}
          >
            BACK
          </button>
          <button
            className="choseAdressButton"
            onClick={() => {
              let value: any = 75;

              navigate("choseAddress");
              dispatch(stepperValue(value));
            }}
          >
            CHOOSE ADDRESS
          </button>
        </div>
      </div>
    </>
  );
};

export default PaymentProcess;
