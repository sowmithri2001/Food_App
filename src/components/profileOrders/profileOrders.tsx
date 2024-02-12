import { inputLabelClasses, MenuItem, Modal, TextField } from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeModal, showModal } from "../../redux/reducers/modalSlice";
import "./profileOrders.css";
import "../../views/home/home.css";
import "../../views/home/home.css";
import "../../views/home/home.css";
import {
  getMyOrderDetailsAsyncThunk,
  getMyOrderDetailsCartAsyncThunk,
  getMyOrderStatusAsyncThunk,
} from "../../redux/reducers/getmyCartSlice";
import { useEffect } from "react";
import NoPastOrders from "../noPastOrders/noPastOrders";
import { receiveMessageOnPort } from "worker_threads";
import "../../views/home/home.css";
import StarsOne from "../stars/starsOne";
import StarsTwo from "../stars/starsTwo";
import StarsThree from "../stars/starsThree";
import StarsFour from "../stars/starsFour";
import StarsFive from "../stars/starsFive";
import { useNavigate } from "react-router-dom";
import Loader from "../Loader/loader";

const ProfileOrders = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let show: any = useSelector((state: any) => state.modalStatus.value);

  const options = [
    {
      value: "active",
      label: "Active Orders",
    },
    {
      value: "past",
      label: "Past Orders",
    },
    {
      value: "cancelled",
      label: "Cancelled Orders",
    },
  ];

  const [currency, setCurrency] = useState("active");
  const handleChangeMui = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCurrency(event.target.value);
  };

  const handleClose = () => {
    dispatch(closeModal());
  };
  useEffect(() => {
    dispatch(getMyOrderDetailsAsyncThunk(currency));
  }, [dispatch, currency]);

  let myCartsMap: any = [];
  myCartsMap = useSelector(
    (state: any) =>
      state &&
      state.getMyOrderSlice &&
      state.getMyOrderSlice.getMyOrderDetails &&
      state.getMyOrderSlice.getMyOrderDetails.data &&
      state.getMyOrderSlice.getMyOrderDetails.data.orders
  );
  const rec = [1, 2, 3];
  const e = [1, 2, 3];
  console.log((myCartsMap && myCartsMap.length) === "");

  let cartModalData = useSelector(
    (state: any) =>
      state &&
      state.getMyOrderSlice &&
      state.getMyOrderSlice.getMyCart &&
      state.getMyOrderSlice.getMyCart.data
  );

  let cartModalItems: any = cartModalData && cartModalData.dishInfoList;
  let loaderValue = useSelector(
    (state: any) => state && state.restaurantList && state.getProfile.loading
  );
  return (
    <>
      <div className="profileOrdersContainer">
        {loaderValue && <Loader />}
        <div className="profileOrdersContents">
          {" "}
          <TextField
            id="standard-select-currency"
            select
            label=""
            value={currency}
            onChange={handleChangeMui}
            helperText=""
            variant="standard"
            sx={{
              width: 150,
              "& .MuiInput-underline:before": {
                borderBottomColor: "transparent",
              },
              "& .MuiInput-underline:after": {
                borderBottomColor: "transparent",
              },
              "& .MuiFormLabel-root.Mui-disabled": {
                color: "red",
              },
              textAlign: "left",
            }}
            InputLabelProps={{
              sx: {
                textAlign: "left",
                // set the color of the label when not shrinked
                color: "black",
                [`&.${inputLabelClasses.shrink}`]: {
                  // set the color of the label when shrinked (usually when the TextField is focused)
                  color: "#0000008a",
                },
              },
            }}
          >
            {options.map((option) => (
              <MenuItem
                key={option.value}
                value={option.value}
                sx={{ height: "45px" }}
              >
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <div className="profileOrderCardsContainer">
            {(myCartsMap && myCartsMap.length) === 0 ||
            (myCartsMap && myCartsMap.length) === "" ? (
              <NoPastOrders message={`No ${currency} orders`} />
            ) : (
              <>
                {myCartsMap &&
                  myCartsMap.map((e: any, i: any) => {
                    return (
                      <div className="profileOrderCard" key={i}>
                        <div className="orderCardContents">
                          <div className="profileOrderDetails">
                            <div className="profileOrderId">
                              Order id: {e.orderId}
                            </div>
                            <div
                              className="profileOrderStatus"
                              style={{ textTransform: "capitalize" }}
                            >
                              {(() => {
                                switch (e.orderStatus) {
                                  case "orderPlaced": {
                                    return <span>Order is placed</span>;
                                  }
                                  case "Accepted": {
                                    return <span>Order accepted</span>;
                                  }
                                  case "inKitchen": {
                                    return <span>Order in kitchen</span>;
                                  }
                                  case "readyForPickUp": {
                                    return <span>Order ready for pick-up</span>;
                                  }
                                  case "outForDelivery": {
                                    return <span>Order out for delivery</span>;
                                  }
                                  case "Delivered": {
                                    return <span>Order has delivered</span>;
                                  }
                                  case "UnDelivered": {
                                    return (
                                      <span style={{ color: "#f00" }}>
                                        Order has undelivered
                                      </span>
                                    );
                                  }
                                  case "Cancelled": {
                                    return (
                                      <span style={{ color: "#f00" }}>
                                        Order has been cancelled
                                      </span>
                                    );
                                  }
                                  default: {
                                    return null;
                                  }
                                }
                              })()}
                            </div>
                          </div>
                          <div className="profileOrderKitchenName">
                            {e.restaurantName}
                          </div>
                          <div className="profileOrderKitchenAddress">
                            {e.restaurantAddress}
                          </div>
                          <div className="profileOrderItemsCount">
                            {e.itemsCount} Items | AED {e.amount}
                          </div>
                          <div className="profileOrderButtons">
                            <button
                              className="profileOrderDetailsButton"
                              onClick={() => {
                                dispatch(showModal());
                                dispatch(
                                  getMyOrderDetailsCartAsyncThunk(e.orderId)
                                );
                              }}
                            >
                              DETAILS
                            </button>
                            <button
                              className="profileOrderStatusButton"
                              onClick={() => {
                                dispatch(getMyOrderStatusAsyncThunk(e.orderId));
                                dispatch(
                                  getMyOrderDetailsCartAsyncThunk(e.orderId)
                                );
                                navigate("/orderStatus");
                              }}
                            >
                              STATUS
                            </button>
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
      <div className="modalHolder">
        {" "}
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
            </div>
          </div>
        </Modal>
      </div>
    </>
  );
};

export default ProfileOrders;
