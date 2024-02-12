import { inputLabelClasses, Modal, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import "../profileAddress/profileAddress.css";
import "./profilePayment.css";
import "../../views/home/home.css";
import "../profileAddress/profileAddress.css";
import * as yup from "yup";
import { useFormik } from "formik";
import PaymentModal from "../paymentModal/paymentModal";
import Cards from "react-credit-cards";
import "react-credit-cards/es/styles-compiled.css";
import { useDispatch, useSelector } from "react-redux";
import {
  addCardAsyncThunk,
  deleteCardAsyncThunk,
  getCardsAsyncThunk,
  setPrimaryCardAsyncThunk,
} from "../../redux/reducers/profileSlice";
import NoPastOrders from "../noPastOrders/noPastOrders";

const validationSchema = yup.object({
  cardNumber: yup
    .string()
    .required("Please enter a card number")
    .min(12, "Must be within 12 to 16 digits")
    .max(16, "Must be within 12 to 16 digits"),
  nameOncard: yup.string().required("Please enter a correct name"),
  securityCard: yup
    .string()
    .required(
      "Please enter the correct expiry details and security card number"
    )
    .min(3, "Must be exactly 3 digits")
    .max(3, "Must be exactly 3 digits"),
});

const ProfilePayment = () => {
  const [modal, setModal] = useState(false);
  const dispatch = useDispatch();
  const getMyCards = useSelector((state: any) => state.getProfile.getCards);
  const [modalStatussPayment, setmodalStatussPayment] = useState(false);
  const [setPaymentId, setSetPaymentId] = useState(false);

  useEffect(() => {
    dispatch(getCardsAsyncThunk({ pageNo: 1 }));
  }, [dispatch]);

  const [password, setPassword] = useState<boolean>(false);

  const togglePassword = () => {
    setPassword(!password);
  };

  const getMyCardsMapData =
    getMyCards &&
    getMyCards.data &&
    getMyCards.data[Object.keys(getMyCards && getMyCards.data)[0]];

  const handleClose = () => {
    setModal(false);
  };
  const handleCloses = () => {
    setmodalStatussPayment(false);
  };

  const resp = [1, 2, 3];
  const e = [1, 2, 3];

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
      setModal(false);
      window.location.reload();
    },
    validationSchema: validationSchema,
  });
  const submitHandler = (e: any) => {
    e.preventDefault();
  };

  const [first4, setfirst4] = useState("");
  const [last4, setlast4] = useState("");
  return (
    <>
      <div className="profileAddressContainer">
        <div className="profileAddressContents">
          <div className="profileAddressTitle">
            <div className="profileAddressLocation">Payment Methods</div>
            <img
              src={require("../../assets/Add-new.png")}
              className="addNewAddressImage"
              style={{ cursor: "pointer" }}
              onClick={() => setModal(true)}
            />
          </div>
          <div className="profileAddressCardsContainer">
            {getMyCardsMapData && getMyCardsMapData.length === 0 ? (
              <NoPastOrders message={"No cards"} />
            ) : (
              <>
                {getMyCardsMapData &&
                  getMyCardsMapData.map((card: any, i: any) => {
                    return (
                      <div className="profileAddressPaymentCard">
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
                            <div className="profilePaymentImgs">
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
                            </div>
                            <div className="profilePaymentDescription">
                              <div className="profilePaymentCardNum">
                                <span>
                                  {card &&
                                    card.cardNo &&
                                    card.cardNo.slice(0, 4)}{" "}
                                  XXXX XXXX{" "}
                                  {card &&
                                    card.cardNo &&
                                    card.cardNo.slice(12, 16)}
                                </span>
                              </div>
                              <div className="profilePaymentCardBank">
                                {card.cardName}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="paymentEdDel">
                          <div className="paymentEditDelete">
                            <div
                              className="paymentEdit"
                              onClick={() => {
                                setSetPaymentId(card.cardNo);
                                setmodalStatussPayment(true);
                              }}
                            >
                              Delete
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
        <Modal
          open={modal}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <div className="modalDiv style">
            <div className="addNewAddressContainer ">
              <div className="addBackBtnConatiner">
                <img
                  src={require("../../assets/dismiss button.png")}
                  className="addAddressBackButton"
                  onClick={() => setModal(false)}
                />
              </div>{" "}
              <div className="addAdressBodyHeader">
                <div className="addAddressHead">Add new card</div>
                <div className="addAddressLocConatinerCard">
                  Enter Credit/Debit card details
                </div>
              </div>
              {/* <PaymentModal /> */}
              <div className="addAddressBody">
                {" "}
                <Cards
                  cvc={values.securityCard}
                  expiry={values.expiryMonth + values.expiryYear}
                  name={values.nameOncard}
                  number={values.cardNumber}
                />
                <form
                  className="addAddressFormContainer"
                  onSubmit={(e: any) => {
                    handleSubmit();
                    submitHandler(e);
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
                    <div className="addNewCardModalError">
                      {errors.nameOncard}
                    </div>
                  </div>
                  <div className="TotalParent">
                    <div className="ExpiryAndSecurityParent">
                      <div className="cardDetailsContainer">
                        <span className="expiryOfCard"> Expiry</span>
                        <div className="cardExpiryDetails">
                          {/* <div className="addAddressFields"> */}{" "}
                          <TextField
                            type="text"
                            id="standard-basic"
                            variant="standard"
                            placeholder="MM"
                            name="expiryMonth"
                            value={values.expiryMonth}
                            inputProps={{ maxLength: 2, minLength: 2 }}
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
                          /{/* </div> */}
                          {/* <div className="addAddressFields"> */}{" "}
                          <TextField
                            id="standard-basic"
                            variant="standard"
                            placeholder="YY"
                            name="expiryYear"
                            value={values.expiryYear}
                            inputProps={{ maxLength: 2, minLength: 2 }}
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
                          <div className="cardSecurityCard"></div>
                        </div>
                      </div>

                      <div className="cardSecurityContainer">
                        <span className="expiryOfCard">Security card</span>
                        <div className="cardExpiryDetails">
                          <div className="cardSecurityCard">
                            {" "}
                            <TextField
                              id="standard-basic"
                              variant="standard"
                              name="securityCard"
                              value={values.securityCard}
                              type={password ? "text" : "password"}
                              inputProps={{ maxLength: 3, minLength: 3 }}
                              autoComplete="off"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              sx={{
                                width: 0.8,
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
                            <img
                              src={require("../../assets/eye_on.png")}
                              alt="eye"
                              className="toggleEyes"
                              onClick={togglePassword}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="addNewCardModalError">
                      {errors.securityCard}
                    </div>
                  </div>

                  <div className="addAddressSubmit">
                    <button className="addAddressSubBtn">SAVE CARD</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </Modal>
        <Modal
          open={modalStatussPayment}
          onClose={handleCloses}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <div className="modalDivs styles">
            <div className="modalNoCard">
              {" "}
              <div className="confirmText">
                Are you sure you want to remove card?
              </div>
              <div className="confirmBtns">
                <button
                  className="deleteBtnn"
                  onClick={() => {
                    dispatch(deleteCardAsyncThunk(setPaymentId));
                    window.location.reload();
                  }}
                >
                  Delete
                </button>
                <button
                  className="CancelBtnn"
                  onClick={() => setmodalStatussPayment(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </Modal>
      </div>
    </>
  );
};

export default ProfilePayment;
