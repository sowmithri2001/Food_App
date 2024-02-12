import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import HeaderLogin from "../headerLogin/headerLogin";
import RestaurantsDetailsHeader from "../restaurantDetailsHeader/restaurantsDetailsHeader";
import RestaurantSubHeader from "../restaurantSubHeader/restaurantSubHeader";
import "./myCart.css";
import { useEffect, useState } from "react";
import {
  deleteMyCartAsyncThunk,
  getCartContentAsyncThunk,
  getMyCartAsyncThunk,
  storCartId,
} from "../../redux/reducers/proceedDetails";
import { viewOfferLimitDetailsAsyncThunk } from "../../redux/reducers/restaurantListSlice";
import { Modal } from "@mui/material";

const MyCart = () => {
  const dispatch = useDispatch();
  let e = [1, 2, 3];
  let rec = [1, 2, 3];
  let cartData = useSelector((state: any) => state.cart.cartItems);
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(getMyCartAsyncThunk());
  }, [dispatch]);

  const cartItemsData = useSelector(
    (state: any) => state && state.proceedSlice && state.proceedSlice.getMyCart
  );

  const cartItemsMapData =
    cartItemsData && cartItemsData.data && cartItemsData.data.carts;

  //
  sessionStorage.setItem("offerId", "false");
  const ProceedToCheckoutFn = (i: any, e: any) => {
    let selectedCart = cartItemsMapData[i];
    dispatch(getCartContentAsyncThunk(selectedCart.cartId));
    dispatch(storCartId(selectedCart.cartId));
    dispatch(
      viewOfferLimitDetailsAsyncThunk({
        restaurantId: e && e.restaurantId,
        limit: 10,
      })
    );
    navigate("/proceedToPayment");
  };
  const [modalStatus, setmodalStatus] = useState(false);
  const [setCartId, setSetCartId] = useState(false);

  const handleClose = () => {
    setmodalStatus(false);
  };

  return (
    <>
      <HeaderLogin />
      <RestaurantSubHeader />
      <div className="myCartContainer">
        <div className="myCartContents">
          <div className="myCartTitle">
            My Cart (
            {cartItemsMapData && cartItemsMapData.length >= 1
              ? cartItemsMapData && cartItemsMapData.length
              : "0"}
            )
          </div>
          <div className="myCartCardContainer">
            {cartItemsMapData &&
              cartItemsMapData.map((e: any, i: any) => {
                return (
                  <div className="myCartCard" key={i}>
                    <div className="myCartCardContents">
                      <div className="myCartCardTitle">
                        <div className="myCartHotelName">
                          {e && e.restaurantName}
                        </div>
                        <div
                          className="myCartRemoveOption"
                          onClick={() => {
                            setmodalStatus(true);
                            setSetCartId(e && e.cartId);
                          }}
                        >
                          Remove
                        </div>
                      </div>
                      <div className="myCartHotelAddress">
                        {e && e.restaurantAddress}
                      </div>
                      <div className="myCartHotelItemsCount">
                        {e && e.countOfItems} Items | AED{e && e.toPay}
                      </div>
                      <div className="myCartItemsProceedButtons">
                        <button
                          className="myCartProceedText"
                          onClick={() => {
                            ProceedToCheckoutFn(i, e);
                          }}
                        >
                          PROCEED
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
        <Modal
          open={modalStatus}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <div className="modalDivs styles">
            <div className="modalNoCard">
              {" "}
              <div className="confirmText">
                Are you sure you want to delete item from cart?
              </div>
              <div className="confirmBtns">
                <button
                  className="deleteBtnn"
                  onClick={() => {
                    dispatch(deleteMyCartAsyncThunk(setCartId));
                    window.location.reload();
                  }}
                >
                  Delete
                </button>
                <button
                  className="CancelBtnn"
                  onClick={() => setmodalStatus(false)}
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

export default MyCart;
