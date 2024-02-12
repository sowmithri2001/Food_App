import { createSlice } from "@reduxjs/toolkit";

export interface CounterState {
  cartItems: any;
  cartState: any;
  cartTotalAmount: any;
  totalPrices: any;
  addOnPrice: any;
  addOn: any;
  restaurantId: any;
  TotalAmt: any;
  cookingInstruction: any;
  dateValue: any;
  timeValue: any;
  cartDispatch: any;
  ratingWrite: any;
}

const initialState: CounterState = {
  cartState: false,
  restaurantId: 0,
  cartItems: [],
  addOnPrice: 0,
  totalPrices: [],
  cartTotalAmount: 0,
  addOn: [],
  TotalAmt: 0,
  cookingInstruction: "",
  dateValue: "",
  timeValue: "",
  cartDispatch: [],
  ratingWrite: "",
};
const CartSlice = createSlice({
  initialState,
  name: "cart",
  reducers: {
    setAddItemToCart: (state: any, action: any) => {
      localStorage.setItem(
        `restId${state.restaurantId}`,
        JSON.stringify(state.cartItems)
      );
      state.cartItems = JSON.parse(
        localStorage.getItem(`restId${state.restaurantId}`) || "[]"
      );
      const itemIndex = state.cartItems.findIndex(
        (item: any) => item.dishId === action.payload.dishId
      );

      if (itemIndex >= 0) {
        state.cartItems[itemIndex].cartQuantity += 1;
      } else {
        const temp = {
          ...action.payload,
          cartQuantity: 1,
        };
        state.cartItems.push(temp);
      }
      localStorage.setItem(
        `restId${state.restaurantId}`,
        JSON.stringify(state.cartItems)
      );
    },
    setIncreaseItemQuantity: (state: any, action: any) => {
      const itemIndex = state.cartItems.findIndex(
        (item: any) => item.dishId === action.payload.dishId
      );

      if (itemIndex >= 0) {
        state.cartItems[itemIndex].cartQuantity += 1;
      }
      localStorage.setItem(
        `restId${state.restaurantId}`,
        JSON.stringify(state.cartItems)
      );
    },
    setDecreaseItemQuantity: (state: any, action: any) => {
      const itemIndex = state.cartItems.findIndex(
        (item: any) => item.dishId === action.payload.dishId
      );

      if (state.cartItems[itemIndex].cartQuantity >= 1) {
        state.cartItems[itemIndex].cartQuantity -= 1;
      }

      localStorage.setItem(
        `restId${state.restaurantId}`,
        JSON.stringify(state.cartItems)
      );
    },
    setRemoveItemFromCart: (state: any, action: any) => {
      const removeItem = state.cartItems.filter(
        (item: any) => item.dishId !== action.payload.dishId
      );
      state.cartItems = removeItem;
      state.cartItems.addOnQuantity = 0;
      localStorage.setItem(
        `restId${state.restaurantId}`,
        JSON.stringify(state.cartItems)
      );
    },
    setAddonPrice: (state: any, action: any) => {
      state.addOnPrice = action.payload;
      localStorage.setItem("addOnPrice", JSON.stringify(state.addOnPrice));
    },
    setTotalAmount: (state: any, action: any) => {
      let addddd = JSON.parse(localStorage.getItem("addOnPrice") || "[]");
      let { totalAmount, totalQuantity } = state.cartItems.reduce(
        (cartTotal: any, cartItem: any) => {
          const { price, cartQuantity, addOnQuantity, addonList } = cartItem;
          let totalPrice: any = "";
          if (addonList.length === 0) {
            totalPrice =
              ((price && price) * (cartQuantity && cartQuantity));
          }
          else {

            totalPrice =
              ((price && price) * (cartQuantity && cartQuantity)) +
              (addonList ? addonList[0].price * (addOnQuantity ? addOnQuantity : 0) : 0) * 1.05;
          }
          cartTotal.totalAmount += totalPrice;
          cartTotal.totalQuantity += cartQuantity;
          return cartTotal;
        },
        {
          totalAmount: 0,
          totalQuantity: 0,
        }
      );
      state.cartTotalAmount = totalAmount;
      state.cartTotalQuantity = totalQuantity;
    },
    setClearCartItems: (state: any) => {
      state.cartItems = [];
      state.cartTotalAmount = 0;
      state.cartTotalQuantity = 0;
      localStorage.setItem(
        `restId${state.restaurantId}`,
        JSON.stringify(state.cartItems)
      );
    },

    //add ons
    setAddOnsToCart: (state: any, action: any) => {
      localStorage.setItem(
        `restId${state.restaurantId}`,
        JSON.stringify(state.cartItems)
      );
      state.cartItems = JSON.parse(
        localStorage.getItem(`restId${state.restaurantId}`) || "[]"
      );

      const itemIndex = state.cartItems.findIndex(
        (item: any) => item.dishId === action.payload.dishId
      );

      if (itemIndex >= 0) {
        state.cartItems[itemIndex].addOnQuantity += 1;
      } else {
        const temp = {
          ...action.payload,
          addOnQuantity: 1,
          cartQuantity: 0,
        };
        state.cartItems.push(temp);
      }

      localStorage.setItem(
        `restId${state.restaurantId}`,
        JSON.stringify(state.cartItems)
      );
    },

    slectREstId: (state: any, action: any) => {
      state.restaurantId = action.payload;
    },

    //addAddonsCount
    setIncreaseAddOnQuantity: (state: any, action: any) => {
      const itemIndex = state.cartItems.findIndex(
        (item: any) => item.dishId === action.payload.dishId
      );

      if (itemIndex >= 0) {
        state.cartItems[itemIndex].addonList[0].addOnQuantity += 1;
      }
      localStorage.setItem(
        `restId${state.restaurantId}`,
        JSON.stringify(state.cartItems)
      );
    },
    storeTotalAmt: (state: any, action: any) => {
      state.TotalAmt = action.payload;
    },
    setCookingInstruction: (state: any, action: any) => {
      state.cookingInstruction = action.payload;
    },
    setRatingWrite: (state: any, action: any) => {
      state.cookingInstruction = action.payload;
    },
    setDate: (state: any, action: any) => {
      state.dateValue = action.payload;
    },
    setTime: (state: any, action: any) => {
      state.timeValue = action.payload;
    },
  },
});
export const {
  setAddItemToCart,
  setTotalAmount,
  setRemoveItemFromCart,
  setIncreaseItemQuantity,
  setDecreaseItemQuantity,
  setClearCartItems,
  setAddOnsToCart,
  slectREstId,
  setIncreaseAddOnQuantity,
  storeTotalAmt,
  setAddonPrice,
  setCookingInstruction,
  setDate,
  setTime,
  setRatingWrite,
} = CartSlice.actions;

export const selectCartState = (state: any) => state.cart.cartState;
export const selectCartItems = (state: any) => state.cart.cartItems;

export const selectTotalAmount = (state: any) => state.cart.cartTotalAmount;
export const selectTotalQuantity = (state: any) => state.cart.cartTotalQuantity;

export default CartSlice.reducer;
