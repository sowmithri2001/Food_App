import { inputLabelClasses, Modal, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMyOrderDetailsCartAsyncThunk } from "../../redux/reducers/getmyCartSlice";
import { closeModal, showModal } from "../../redux/reducers/modalSlice";
import HeaderLogin from "../headerLogin/headerLogin";
import StepperFive from "./stepperFive";
import StepperFour from "./stepperFour";
import "./stepperMain.css";
import StepperOne from "./stepperOne";
import StepperSix from "./stepperSix";
import StepperThree from "./stepperThree";
import StepperTwo from "./stepperTwo";
const StepperMain = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  let show: any = useSelector((state: any) => state.modalStatus.value);

  const handleClose = () => {
    dispatch(closeModal());
  };

  let cartModalData = useSelector(
    (state: any) =>
      state &&
      state.getMyOrderSlice &&
      state.getMyOrderSlice.getMyCart &&
      state.getMyOrderSlice.getMyCart.data
  );

  let cartModalItems: any = cartModalData && cartModalData.dishInfoList;

  let cartStatusData = useSelector(
    (state: any) =>
      state &&
      state.getMyOrderSlice &&
      state.getMyOrderSlice.orderStatus &&
      state.getMyOrderSlice.orderStatus.data
  );

  let latestCartStatusData: any =
    cartStatusData && cartStatusData[cartStatusData.length - 1];

  localStorage.setItem("STAGE", latestCartStatusData.orderStatus);
  let value = localStorage.getItem("STAGE");

  return (
    <>
      <HeaderLogin />
      <div className="stepperContainer">
        <div className="stepperMainContent">
          <span className="orderId">
            Order ID:{cartModalData && cartModalData.orderId}
          </span>
          <div className="stepperMainBox">
            {(() => {
              switch (value) {
                case "Order waiting to accept":
                  return <StepperOne />;
                case "Order accepted":
                  return <StepperTwo />;
                case "Order in kitchen":
                  return <StepperThree />;
                case "Order ready for pick-up":
                  return <StepperFour />;
                case "Order out for delivery":
                  return <StepperFour />;
                case "Order has delivered":
                  return <StepperFive />;
                case "Order has been cancelled":
                  return <StepperSix />;
              }
            })()}

            <div className="stepperBottomButtons">
              <div
                className="backToOrderButton"
                onClick={() => {
                  navigate("/profileDetails");
                }}
              >
                BACK TO ORDERS
              </div>
              <div className="rightSideButtonDivs">
                <div className="chatButton">CHAT</div>
                <div
                  className="orderDetailsButton"
                  onClick={() => {
                    dispatch(showModal());
                  }}
                >
                  ORDER DETAILS
                </div>
              </div>
            </div>
          </div>
        </div>
        <Modal
          open={show}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <div className="modalDiv style">
            <div className="orderDetailsModalContainer">
              <div className="closeBtnContainer">
                <img
                  src={require("../../assets/dismiss button.png")}
                  className="closeModalButton"
                  onClick={() => dispatch(closeModal())}
                />
              </div>

              <div className="orderDetailsModalContent">
                <div className="orderDetailsModalTitle">Order Details</div>
                <div className="orderDetailsModalBody">
                  <div className="orderDetailsModalCardTitle">Items</div>
                  <div className="orderDetailsModalCard">
                    <div className="orderDetailsModalCardContent">
                      {cartModalItems &&
                        cartModalItems.map((e: any, i: any) => {
                          return (
                            <div className="orderDetailsModalCardParts">
                              <div className="orderDetailsModalPartTitle">
                                <img
                                  src={require("../../assets/Group 8 Copy 2.png")}
                                  alt=""
                                  className="nonVegMark"
                                />
                                <div className="orderDetailsModalPartTitleText">
                                  {e.dishName}
                                </div>
                              </div>
                              <div className="orderDetailsModalPartCost">
                                AED{e.price}.00
                              </div>
                              <div className="orderDetailsInfo">
                                <div className="orderDetailsInfoText">
                                  Add On :{" "}
                                  {e.addOnCount === 0
                                    ? "No Addons"
                                    : e.addonInfoList[0].addOn}
                                </div>
                                <div className="orderDetailsModalPartCurrency">
                                  AED
                                  {e.price * e.count +
                                    (e.addOnCount === 0
                                      ? 0
                                      : e.addonInfoList[0].price)}
                                  .00
                                </div>
                              </div>
                            </div>
                          );
                        })}
                    </div>
                  </div>
                </div>

                <div className="orderDetailsModalBody">
                  <div className="orderDetailsModalCardTitle">Amount</div>
                  <div className="orderDetailsModalCard">
                    <div className="orderDetailsModalCardContent">
                      <div className="orderDetailsModalCardParts">
                        <div className="orderDetailsModalPartTitle">
                          <div className="orderPaymentPaid">Paid</div>
                          <div className="orderPaymentPaidCost">
                            AED{" "}
                            {cartModalData &&
                              cartModalData.amountDetails.amountPaid}
                          </div>
                        </div>

                        <div className="orderAmountInfo">
                          <div className="orderAmountInfoText">Items total</div>
                          <div className="orderAmountModalPartCurrency">
                            AED{" "}
                            {cartModalData &&
                              cartModalData.amountDetails.totalAmount}
                          </div>
                        </div>

                        <div className="orderAmountInfo">
                          <div className="orderAmountInfoText">
                            Fee/ charges
                          </div>
                          <div className="orderAmountModalPartCurrency">
                            AED{" "}
                            {cartModalData &&
                              cartModalData.amountDetails.taxAmount}
                          </div>
                        </div>

                        <div className="orderAmountInfo">
                          <div className="orderAmountInfoText">Discount</div>
                          <div className="orderAmountModalPartCurrency">
                            AED{" "}
                            {cartModalData &&
                              cartModalData.amountDetails.discount}
                          </div>
                        </div>
                      </div>
                      <div className="orderAmountModalPartTitle">
                        <div className="orderPaymentPaid">Payment Mode</div>
                        <div className="orderPaymentPaidCost">
                          {cartModalData &&
                            cartModalData.amountDetails.paymentType}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="orderDetailsModalBody">
                  <div className="orderDetailsModalCardTitle">
                    Delivery Details
                  </div>
                  <div className="orderDeliveryModalCard">
                    <div className="orderDeliveryModalCardContents">
                      <div className="orderDeliveryModalCardParts">
                        <div className="orderDeliveryModalLocation">
                          Delivery Location
                        </div>
                        <div className="orderDeliveryModalAddress">
                          {cartModalData && cartModalData.deliveryAddress}
                        </div>
                      </div>

                      <div className="orderDeliveryModalCardPart">
                        <div className="orderDeliveryModalLocation">
                          Date & Time
                        </div>
                        <div className="orderDeliveryModalAddress">
                          {cartModalData && cartModalData.scheduleDate} at{" "}
                          {cartModalData && cartModalData.scheduleTime}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="orderDetailsModalFooter">
                <div className="orderDetailsModalFooterContainer">
                  <div className="orderDetailsModalToRate">
                    Rate your Delivery
                  </div>
                  <div className="orderDetailsModalFooterRatings">
                    <img
                      src={require("../../assets/Rating 1.png")}
                      alt=""
                      className="ModalFooterRatingsStar"
                    />
                    <img
                      src={require("../../assets/Rating 1.png")}
                      alt=""
                      className="ModalFooterRatingsStar"
                    />
                    <img
                      src={require("../../assets/Rating 1.png")}
                      alt=""
                      className="ModalFooterRatingsStar"
                    />
                    <img
                      src={require("../../assets/Rating 1.png")}
                      alt=""
                      className="ModalFooterRatingsStar"
                    />
                    <img
                      src={require("../../assets/Rating 1.png")}
                      alt=""
                      className="ModalFooterRatingsStar"
                    />
                  </div>

                  <form className="modalFooterReviewsForm">
                    <div className="modalFooterReviewsTextField">
                      <TextField
                        id="standard-basic"
                        name="reviewsText"
                        label="Write a review"
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

                      <div className="reviewsSubmitBtn">
                        <input
                          type="submit"
                          value="SUBMIT"
                          className="reviewsText"
                        />
                      </div>
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

export default StepperMain;
