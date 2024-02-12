import { inputLabelClasses, Modal, Radio, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import "../choseAddress/choseAddress.css";
import PaymentModal from "../paymentModal/paymentModal";
import "./selectPaymentMethod.css";
import Cards from "react-credit-cards";
import "react-credit-cards/es/styles-compiled.css";
import * as yup from "yup";
import { useFormik } from "formik";
import "../profilePayment/profilePayment.css";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  addCardAsyncThunk,
  deleteCardAsyncThunk,
  getCardsAsyncThunk,
  setPrimaryCardAsyncThunk,
} from "../../redux/reducers/profileSlice";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import {
  setDate,
  setRemoveItemFromCart,
  setTime,
  setTotalAmount,
} from "../../redux/reducers/cartSlice";
import {
  addToCartAsyncThunk,
  getMyCartAsyncThunk,
} from "../../redux/reducers/proceedDetails";
const validationSchema = yup.object({
  cardNumber: yup
    .string()
    .required("Please enter a city name")
    .min(12, "Must be exactly 12 to 16 digits")
    .max(16, "Must be exactly 12 to 16 digits"),
  nameOncard: yup.string().required("Please enter a correct name"),
  securityCard: yup
    .string()
    .required(
      "Please enter the correct expiry details and security card number"
    )
    .min(3, "Must be exactly 3 digits")
    .max(3, "Must be exactly 3 digits"),
});

const SelectPaymentMethod = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [modal, setModal] = useState(false);
  const [primary, setPrimary] = useState(false);
  const getMyCards = useSelector((state: any) => state.getProfile.getCards);

  useEffect(() => {
    dispatch(getCardsAsyncThunk({ pageNo: 1 }));
  }, [dispatch]);

  const getMyCardsMapData =
    getMyCards &&
    getMyCards.data &&
    getMyCards.data[Object.keys(getMyCards && getMyCards.data)[0]];
  const handleClose = () => {
    setModal(false);
  };

  const initialvalues = {
    cardNumber: "",
    nameOncard: "",
    expiryMonth: "",
    expiryYear: "",
    securityCard: "",
  };
  const { values, errors, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues: initialvalues,

    onSubmit: (values) => {
      const expiryy = values.expiryMonth + "/" + values.expiryYear;
      dispatch(
        addCardAsyncThunk({
          cardNo: values.cardNumber,
          cardName: values.nameOncard,
          expiryDate: expiryy,
          cvv: values.securityCard,
        })
      );
      setaddNew(false);
    },
    validationSchema: validationSchema,
  });
  const submitHandler = (event: any) => {
    event.preventDefault();
  };
  let e = [1, 2, 3, 4, 5];
  const [selectedValue, setSelectedValue] = useState({
    name: "Cash",
    saveCard: "",
  });
  const [addNew, setaddNew] = useState(false);
  const [responsee, setResponsee] = useState<any>("");
  const [responseOrderId, setResponseOrderId] = useState<any>("");
  const [responseCode, setResponseCode] = useState<any>(0);
  const [cvvValue, setcvvValue] = useState<any>("");
  const [showCardDiv, setShowCardDiv] = useState<any>(false);
  const handleChanges = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedValue({ name: event.target.value, saveCard: "" });
    if (selectedValue.name === "Cash") {
      setShowCardDiv(true);
    } else {
      setShowCardDiv(false);
    }
  };
  const handleChanges2 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedValue({ name: "", saveCard: event.target.value });
  };
  let myAddressArrays = useSelector(
    (state: any) =>
      state &&
      state.getProfile &&
      state.getProfile.getAddress &&
      state.getProfile.getAddress.data &&
      state.getProfile.getAddress.data.addressDetailsList
  );

  var newArrayCard: any = Object.values(getMyCardsMapData).filter(function (
    el: any
  ) {
    return el.cardType === true;
  });
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
  let cartIdSend = useSelector(
    (state: any) => state && state.proceedSlice && state.proceedSlice.cartId
  );
  let cartIdSends = cartDetailsfromRedux && cartDetailsfromRedux.cartId;
  let contactDetailsThunk = useSelector(
    (state: any) => state.choseAddressViewSlice
  );

  let amt = cartDetailsfromRedux && cartDetailsfromRedux.toPay;

  let myAddressArray = useSelector(
    (state: any) =>
      state &&
      state.getProfile &&
      state.getProfile.getAddress &&
      state.getProfile.getAddress.data &&
      state.getProfile.getAddress.data.addressDetailsList &&
      state.getProfile.getAddress.data.addressDetailsList
  );
  var newArray: any = Object.values(myAddressArray).filter(function (el: any) {
    return el.primaryAddress === true;
  });
  const cvvFormHandler = (e: any) => {
    e.preventDefault();
    setcvvValue(e.target.cvv.value);
  };
  let cardNo: any = "";
  let cardCvv: any = "";
  const deliveryType = selectedValue.name.toLowerCase();
  if (deliveryType === "card") {
    cardNo = newArrayCard && newArrayCard[0] && newArrayCard[0].cardNo;
    cardCvv = cvvValue;
  } else {
    cardNo = "noCard";
    cardCvv = "noCvv";
  }
  const addressIdSend = newArray && newArray[0] && newArray[0].addressId;

  const appliedOffers = useSelector(
    (state: any) => state.proceedSlice.appliedOffers
  );
  const offetBoolean = JSON.parse(sessionStorage.getItem("offerId") || "[]");
  let disc: any =
    (cartDetailsfromRedux && cartDetailsfromRedux.toPay) *
    (appliedOffers && appliedOffers.discount);
  let promoCode: any;
  if (offetBoolean === true) {
    promoCode = appliedOffers && appliedOffers.offerId;
    if (disc > (appliedOffers && appliedOffers.maxCashBack)) {
      disc = appliedOffers && appliedOffers.maxCashBack;
    } else {
      disc = disc;
      sessionStorage.removeItem("offerId");
    }
  } else {
    promoCode = "noCode";
    disc = 0.0;
  }
  let taxAmt = cartDetailsfromRedux && cartDetailsfromRedux.toPay * 0.05;
  let gndTot = amt + taxAmt;
  let formData: any = new FormData();
  formData.append("paymentType", selectedValue.name);
  formData.append("amount", cartDetailsfromRedux && cartDetailsfromRedux.toPay);
  formData.append("promoCode", promoCode);
  formData.append("taxAmount", taxAmt);
  formData.append("discount", disc);
  formData.append("grandTotal", gndTot - disc);
  formData.append(
    "scheduleDate",
    cartDetailsfromRedux && cartDetailsfromRedux.scheduleDate
  );
  formData.append(
    "scheduleTime",
    cartDetailsfromRedux && cartDetailsfromRedux.scheduleTime
  );
  formData.append("redeemStatus", false);
  formData.append("cardNo", cardNo);
  formData.append("cvv", cardCvv);
  const orderProcess = () => {
    axios(
      `http://lorem-env.eba-vjfwziew.ap-northeast-1.elasticbeanstalk.com/User/check-order-details?cartId=${cartIdSend}`,
      {
        method: "post",
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("jwtToken")}`,
          Accept: "application/json, text/plain, */*",
          "Content-type": " multipart/form-date",
        },
        data: formData,
      }
    )
      .then((res) => {
        if (res) {
          setResponsee(res.data);
          axios(
            `http://lorem-env.eba-vjfwziew.ap-northeast-1.elasticbeanstalk.com/User/choosePayment`,
            {
              method: "post",
              headers: {
                Authorization: `Bearer ${sessionStorage.getItem("jwtToken")}`,
                Accept: "application/json, text/plain, */*",
                "Content-Type": "application/json",
              },
              data: {
                restaurantId:
                  cartDetailsfromRedux && cartDetailsfromRedux.restaurantId,
                orderType:
                  contactDetailsThunk && contactDetailsThunk.deliveryType,
                addressId: addressIdSend,
                contactName:
                  contactDetailsThunk && contactDetailsThunk.contactName,
                contactNo:
                  contactDetailsThunk && contactDetailsThunk.mobileNumber,
                deliveryInstructions:
                  contactDetailsThunk &&
                  contactDetailsThunk.deliveryInstruction,
                cartId: cartIdSend,
              },
            }
          )
            .then((res: any) => {
              if (res) {
                const ressss = res.data;
                setResponseCode(res.status);
                axios(
                  `http://lorem-env.eba-vjfwziew.ap-northeast-1.elasticbeanstalk.com/User/makePayment`,
                  {
                    method: "put",
                    headers: {
                      Authorization: `Bearer ${sessionStorage.getItem(
                        "jwtToken"
                      )}`,
                      Accept: "application/json, text/plain, */*",
                      "Content-Type": "application/json",
                    },
                    data: {
                      paymentType: deliveryType,
                      orderId: ressss,
                      amount:
                        cartDetailsfromRedux && cartDetailsfromRedux.toPay,
                      promoCode: promoCode,
                      taxAmount: taxAmt,
                      discount: disc,
                      grandTotal: gndTot - disc,
                      scheduleDate:
                        cartDetailsfromRedux &&
                        cartDetailsfromRedux.scheduleDate,
                      addressId: addressIdSend,
                      scheduleTime:
                        cartDetailsfromRedux &&
                        cartDetailsfromRedux.scheduleTime,
                      cardNo: cardNo,
                      cvv: cardCvv,
                    },
                  }
                )
                  .then((res: any) => {
                    if (res) {
                      //alert(res.data);
                      toast.success(res.data, {
                        position: "top-center",
                        autoClose: 5000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "colored",
                      });
                      navigate("/profileDetails");
                      if (res.status === 200) {
                        sessionStorage.removeItem("offerId");
                        window.location.reload();
                      }
                    }
                  })
                  .catch((err) => {
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
                    //alert(err.response.data);
                  });
              }
            })
            .catch((err) => {
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
              //alert(err.response.data);
            });
        }
      })
      .catch((err) => {
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
        //alert(err.response.data);
      });
  };
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
  const [scheduleModalValue, setscheduleModalValue] = useState(false);
  const openScheduleModal = () => {
    setscheduleModalValue(true);
  };
  const handleCloseSchedule = () => {
    setscheduleModalValue(false);
  };
  const cus = useSelector((state: any) => state.restaurantList.customiseData);
  const removeAddOns = (e: any) => {
    dispatch(setRemoveItemFromCart(e));
    dispatch(setTotalAmount(e));
  };
  let SelectedRestId = useSelector(
    (state: any) =>
      state && state.cart && state.cart.restaurantId && state.cart.restaurantId
  );
  let cartDataAddOn = useSelector((state: any) => state.cart.cartItems);
  let testTotal = useSelector(
    (state: any) => state && state.cart && state.TotalAmt
  );

  const cookingValue = useSelector(
    (state: any) => state.cart.cookingInstruction
  );

  let cartTotalAmount = useSelector((state: any) => state.cart.cartTotalAmount);
  const scheduleSubmit = (e: any) => {
    e.preventDefault();
    dispatch(
      addToCartAsyncThunk({
        cartId: cartIdSend,
        restaurantId: cartDetailsfromRedux && cartDetailsfromRedux.restaurantId,
        itemsIncart: cartDataAddOn && cartDataAddOn,
        cookingInstruction: cookingValue,
        toPay: cartTotalAmount,
        scheduleDate: dateValue,
        scheduleTime: timeValue + ":00",
      })
    );
    navigate("/mycart");
    dispatch(getMyCartAsyncThunk());
  };
  return (
    <>
      <div className="selectPaymentMethod">
        <div className="topDliveryFormatDiv">
          <span className="deliveryDubHead">
            Please select your preferred way to pay.
          </span>
          <div className="deliveryMethodsDiv">
            <div className="deliveryBoxPay">
              <div className="optionOnePay">
                <Radio
                  checked={selectedValue.name === "Cash"}
                  onChange={handleChanges}
                  value="Cash"
                  name="radio-buttons"
                  inputProps={{ "aria-label": "Best Offers" }}
                  sx={{
                    color: "#000",
                    "&.Mui-checked": {
                      color: "#000",
                    },
                  }}
                />
                <div className="imgCashContainer">
                  <img
                    src={require("../../assets/icn_wallet.png")}
                    alt="icn"
                    className="cashWalletIcn"
                  />
                  <span className="optionTextStyling">Cash</span>
                </div>
              </div>
            </div>
            <div className="PickUpBoxPay">
              <div className="optionTwoPay">
                <Radio
                  checked={selectedValue.name === "Card"}
                  onChange={handleChanges}
                  value="Card"
                  name="radio-buttons"
                  inputProps={{ "aria-label": "Best Offers" }}
                  sx={{
                    color: "#000",
                    "&.Mui-checked": {
                      color: "#000",
                    },
                  }}
                />
                <div className="imgCashContainer">
                  <img
                    src={require("../../assets/icn_credit_card.png")}
                    alt="icn"
                    className="cashWalletIcn"
                  />
                  <span className="optionTextStyling">Credit/Debit Card</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="divPar">
          <div className="rightSideButtons" onClick={() => setaddNew(true)}>
            Add New
          </div>
        </div>
        {addNew ? (
          <div className="addPaymentDetailsCard">
            <div className="addAdressBodyHeaders">
              <div className="makePaymentLocConatinerCard">
                Enter Credit/Debit card details
              </div>
              <div
                className="rightSideButtons"
                onClick={() => setaddNew(false)}
              >
                Back
              </div>
            </div>

            <div className="addAddressBody">
              <Cards
                cvc={values.securityCard}
                expiry={values.expiryMonth + values.expiryYear}
                name={values.nameOncard}
                number={values.cardNumber}
              />
              <form
                className="addAddressFormContainer"
                onSubmit={(event: any) => {
                  handleSubmit();
                  submitHandler(event);
                }}
              >
                <div className="addAddressFields">
                  {" "}
                  <TextField
                    id="standard-basic"
                    label="Card number"
                    name="cardNumber"
                    variant="standard"
                    value={values.cardNumber}
                    onChange={handleChange}
                    onBlur={handleBlur}
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
                  <div className="addNewCardModalError">
                    {errors.cardNumber}
                  </div>
                </div>

                <div className="addAddressFields">
                  {" "}
                  <TextField
                    id="standard-basic"
                    label="Name on card"
                    name="nameOncard"
                    variant="standard"
                    value={values.nameOncard}
                    onChange={handleChange}
                    onBlur={handleBlur}
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
                  <div className="addNewCardModalErrors">
                    {errors.nameOncard}
                  </div>
                </div>
                <div className="TotalParent">
                  <div className="ExpiryAndSecurityParent">
                    <div className="cardDetailsContainer">
                      <span className="expiryOfCard"> Expiry</span>
                      <div className="cardExpiryDetails">
                        <TextField
                          id="standard-basic"
                          variant="standard"
                          placeholder="MM"
                          name="expiryMonth"
                          value={values.expiryMonth}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          sx={{
                            width: 0.15,
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
                        /
                        <TextField
                          id="standard-basic"
                          variant="standard"
                          placeholder="YY"
                          name="expiryYear"
                          value={values.expiryYear}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          sx={{
                            width: 0.25,
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
                    </div>

                    <div className="cardSecurityContainer">
                      <span className="expiryOfCard">Security card</span>
                      <div className="cardExpiryDetails">
                        <div className="cardSecurityCard">
                          <TextField
                            id="standard-basic"
                            variant="standard"
                            name="securityCard"
                            value={values.securityCard}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            sx={{
                              width: 0.7,
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
                      </div>
                    </div>
                  </div>
                  <div className="addNewCardModalError">
                    {errors.securityCard}
                  </div>
                </div>
                <div className="addCardtoSave">
                  <button
                    className="addCardToSaveImg"
                    onClick={() => setPrimary(!primary)}
                    type="submit"
                  >
                    {primary ? (
                      <img
                        src={require("../../assets/icn_check copy.png")}
                        alt=""
                        className="addCardToSaveIcn"
                      />
                    ) : (
                      <img
                        src={require("../../assets/icn_check-black.png")}
                        alt=""
                        className="addCardToSaveIcn"
                      />
                    )}
                  </button>
                  <div className="addCardToSaveText">
                    Add this card to saved cards
                  </div>
                </div>
              </form>
            </div>
          </div>
        ) : (
          <>
            {showCardDiv ? (
              <div className="profileAddressCardsContainer">
                {getMyCardsMapData &&
                  getMyCardsMapData.map((card: any, i: any) => {
                    return (
                      <div className="profileAddressPaymentCards">
                        <div className="addressCardContents">
                          <div className="paymentMethodPrimary">
                            {card.cardType ? (
                              <div className="profileAddressStatus">
                                <img
                                  src={require("../../assets/icn_check-black.png")}
                                  alt=""
                                  className="icnCheckBlack"
                                />
                                <div className="addressStatusText">Primary</div>
                              </div>
                            ) : (
                              <div
                                className="profileAddressStatus"
                                onClick={() => {
                                  dispatch(
                                    setPrimaryCardAsyncThunk(card.cardNo)
                                  );
                                  window.location.reload();
                                }}
                              >
                                <img
                                  src={require("../../assets/icn_check copy.png")}
                                  alt=""
                                  className="icnCheckBlack"
                                />
                                <div className="addressStatusTextNot">
                                  Primary
                                </div>
                              </div>
                            )}
                          </div>
                          <div className="profilePaymentMethod">
                            <div className="profilePaymentImg">
                              {(() => {
                                switch (
                                  card &&
                                  card.cardNo &&
                                  card.cardNo.slice(0, 4)
                                ) {
                                  case "3000":
                                    return (
                                      <img
                                        src={require("../../assets/Diners-Club-International-logo.png")}
                                        alt="cardNameLogo"
                                        className="profilePaymentImage"
                                      />
                                    );
                                  case "5000":
                                    return (
                                      <img
                                        src={require("../../assets/Mastercard-logo.svg.png")}
                                        alt="cardNameLogo"
                                        className="profilePaymentImage"
                                      />
                                    );
                                  case "6000":
                                    return (
                                      <img
                                        src={require("../../assets/2000px-Hipercard_logo.svg.png")}
                                        alt="cardNameLogo"
                                        className="profilePaymentImage"
                                      />
                                    );
                                  default:
                                    return (
                                      <img
                                        src={require("../../assets/Bitmapvisa.png")}
                                        alt=""
                                        className="profilePaymentImage"
                                      />
                                    );
                                }
                              })()}
                              <div className="profilePaymentCardBanks">
                                {card.cardName}
                              </div>
                            </div>
                            <div className="profilePaymentDescription">
                              <div className="profilePaymentCardNum">
                                <span
                                  style={{ color: "white", fontSize: "16px" }}
                                >
                                  {card &&
                                    card.cardNo &&
                                    card.cardNo.slice(0, 4)}{" "}
                                  XXXX XXXX{" "}
                                  {card &&
                                    card.cardNo &&
                                    card.cardNo.slice(12, 16)}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <form className="cvvForm" onSubmit={cvvFormHandler}>
                          <div className="cardSecurityCard">
                            <TextField
                              id="standard-basic"
                              label="Enter CVV"
                              variant="standard"
                              name="cvv"
                              sx={{
                                width: 0.7,
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
                        </form>
                      </div>
                    );
                  })}
              </div>
            ) : (
              ""
            )}
          </>
        )}
        <div className="paymentDeliveryDetails">
          <div className="paymentDeliveryHead">Delivery Details</div>
          <div className="paymentDeliveryLoc">
            <div className="paymentDeliveryLeft">
              <div className="deliveryLocPayHead">Delivery location</div>
              {myAddressArrays.map((e: any) => {
                return e.primaryAddress ? (
                  <div className="deliveryLocPay">{e.addressDesc}</div>
                ) : (
                  ""
                );
              })}
            </div>
            <div
              className="paymentDeliveryRight"
              onClick={() => navigate("/proceedToPayment/choseAddress")}
            >
              Change
            </div>
          </div>
          <div className="paymentDeliveryLoc">
            <div className="paymentDeliveryLeft">
              <div className="deliveryLocPayHead">Date & Time</div>
              <div className="deliveryLocPay">
                {cartDetailsfromRedux && cartDetailsfromRedux.scheduleDate} at{" "}
                {cartDetailsfromRedux && cartDetailsfromRedux.scheduleTime}
              </div>
            </div>
            <div
              className="paymentDeliveryRight"
              onClick={() => openScheduleModal()}
            >
              Change
            </div>
          </div>
        </div>
        <div className="itemsInYouOrder">
          {" "}
          <div className="paymentDeliveryHead">Items in your order from</div>
          <div className="addedHotelNameDetails">
            <div className="itemOrderLeft">
              <div className="addedHotelName">
                {cartDetailsfromRedux && cartDetailsfromRedux.restaurantName}
              </div>
              <div className="addedHotelNamePlace">
                {cartDetailsfromRedux && cartDetailsfromRedux.restaurantAddress}
              </div>
            </div>
            <div className="itemOrderLeft">
              <div className="rightArrowBtn">
                <img
                  src={require("../../assets/arrow_choose_address.png")}
                  alt=""
                  className="rightArr"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="buttonsBottom">
          <div className="backButtonBottomDiv">
            <button
              className="backButtonBottom"
              onClick={() => navigate("/proceedToPayment/choseAddress")}
            >
              BACK
            </button>
          </div>
          <div className="backButtonBottomDiv">
            <button
              className="payNowButtonBottom"
              onClick={() => {
                orderProcess();
              }}
            >
              PAY NOW
            </button>
          </div>
        </div>{" "}
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
    </>
  );
};

export default SelectPaymentMethod;
