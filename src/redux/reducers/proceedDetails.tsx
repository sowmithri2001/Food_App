import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const initialState = {
  message: "",
  data: {},
  isSuccess: false,
  loading: false,
  addToCart: {},
  addItems: [],
  getMyCart: {},
  deleteMyCart: {},
  cartContentInCa: [],
  cartId: {},
  updateCart: {},
  applyOffers: {},
  appliedOffers: {},
  time: {},
  dates: {},
};

export const getMyCartAsyncThunk: any = createAsyncThunk(
  "recent/ getMyCartAsyncThunk",
  async (arg: any, { rejectWithValue }: any) => {
    try {
      const fetchedData: any = await axios({
        method: "get",
        url: `http://lorem-env.eba-vjfwziew.ap-northeast-1.elasticbeanstalk.com/User/Carts?pageNumber=1&limit=10`,

        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("jwtToken")}`,
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
        },
      });
      sessionStorage.setItem("offerId", "true");
      return fetchedData;
    } catch (err) {
      let error: any = err;
      return rejectWithValue(error);
    }
  }
);

export const addToCartAsyncThunk: any = createAsyncThunk(
  "recent/ addToCartAsyncThunk",
  async (arg: any, { rejectWithValue }: any) => {
    const arr: any = arg.itemsIncart;
    const arrayToSend = arr.map(
      ({ dishId, cartQuantity, addOnQuantity }: any) => ({
        dishId,
        itemCount: cartQuantity,
        addOnCount: addOnQuantity,
        customizeId: "",
      })
    );
    try {
      const fetchedData: any = await axios({
        method: "post",
        url: `http://lorem-env.eba-vjfwziew.ap-northeast-1.elasticbeanstalk.com/User/Cart`,

        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("jwtToken")}`,
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
        },
        data: {
          cartId: arg.cartId,
          restaurantId: arg.restaurantId,
          itemsIncart: arrayToSend,
          cookingInstruction: arg.cookingInstruction,
          toPay: arg.toPay,
          scheduleDate: arg.scheduleDate,
          scheduleTime: arg.scheduleTime,
        },
      });

      return fetchedData;
    } catch (err) {
      let error: any = err;
      toast.error(error.response.data, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      // alert(error.response.data);
      return rejectWithValue(error);
    }
  }
);

export const updateCartAsyncThunk: any = createAsyncThunk(
  "recent/ updateCartAsyncThunk",
  async (arg: any, { rejectWithValue }: any) => {
    const arr: any = arg.itemsIncart;
    const arrayToSend = arr.map(
      ({ dishId, cartQuantity, addOnQuantity }: any) => ({
        dishId,
        itemCount: cartQuantity,
        addOnCount: addOnQuantity,
        customizeId: "",
      })
    );
    try {
      const fetchedData: any = await axios({
        method: "post",
        url: `http://lorem-env.eba-vjfwziew.ap-northeast-1.elasticbeanstalk.com/User/Cart`,

        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("jwtToken")}`,
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
        },
        data: {
          cartId: arg.catrId,
          restaurantId: arg.restaurantId,
          itemsIncart: arrayToSend,
          cookingInstruction: arg.cookingInstruction,
          toPay: arg.toPay,
          scheduleDate: arg.scheduleDate,
          scheduleTime: arg.scheduleTime,
        },
      });

      return fetchedData;
    } catch (err) {
      let error: any = err;
      toast.error(error.response.data, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });

      //alert(error.response.data);
      return rejectWithValue(error);
    }
  }
);

export const deleteMyCartAsyncThunk: any = createAsyncThunk(
  "recent/ deleteMyCartAsyncThunk",
  async (arg: any, { rejectWithValue }: any) => {
    try {
      const fetchedData: any = await axios({
        method: "delete",
        url: `http://lorem-env.eba-vjfwziew.ap-northeast-1.elasticbeanstalk.com/User/Cart`,

        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("jwtToken")}`,
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
        },
        data: {
          cartId: arg,
        },
      });

      return fetchedData;
    } catch (err) {
      let error: any = err;
      return rejectWithValue(error);
    }
  }
);

//getCartDetails for chose address page

export const getCartContentAsyncThunk: any = createAsyncThunk(
  "recent/ getCartContentAsyncThunk:",
  async (arg: any, { rejectWithValue }: any) => {
    try {
      const fetchedData: any = await axios({
        method: "get",
        url: `http://lorem-env.eba-vjfwziew.ap-northeast-1.elasticbeanstalk.com/User/MyCart?cartId=${arg}&longitude=74.742142&latitude=13.340881`,

        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("jwtToken")}`,
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
        },
      });

      return fetchedData;
    } catch (err) {
      let error: any = err;
      return rejectWithValue(error);
    }
  }
);

export const applyOffersAsyncThunk: any = createAsyncThunk(
  "recent/applyOffersAsyncThunk:",
  async (arg: any, { rejectWithValue }: any) => {
    try {
      const fetchedData: any = await axios({
        method: "get",
        url: `http://lorem-env.eba-vjfwziew.ap-northeast-1.elasticbeanstalk.com/User/apply?offerId=${arg.offerId}&cartId=${arg.cartId}`,

        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("jwtToken")}`,
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
        },
      });

      return fetchedData;
    } catch (err) {
      let error: any = err;
      return rejectWithValue(error);
    }
  }
);

export const ProceedSlice = createSlice({
  name: "proceedSlice",
  initialState,
  reducers: {
    setItemDis: (state: any, action: any) => {
      state.addItems = action.payload;
    },
    storCartId: (state: any, action: any) => {
      state.cartId = action.payload;
    },
    setOfferApplied: (state: any, action: any) => {
      state.appliedOffers = action.payload;
    },
    setTimeValue: (state: any, action: any) => {
      state.time = action.payload;
    },
    setDateValue: (state: any, action: any) => {
      state.dates = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(updateCartAsyncThunk.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(updateCartAsyncThunk.fulfilled, (state, action) => {
      state.loading = false;
      state.updateCart = action.payload;
      state.isSuccess = true;
    });
    builder.addCase(updateCartAsyncThunk.rejected, (state, action) => {
      state.message = action;
      state.loading = false;
      state.isSuccess = false;
    });
    //get my cart
    builder.addCase(getMyCartAsyncThunk.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getMyCartAsyncThunk.fulfilled, (state, action) => {
      state.loading = false;
      state.getMyCart = action.payload;
      state.isSuccess = true;
    });
    builder.addCase(getMyCartAsyncThunk.rejected, (state, action) => {
      state.message = action;
      state.loading = false;
      state.isSuccess = false;
    });

    //delete cart

    builder.addCase(deleteMyCartAsyncThunk.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(deleteMyCartAsyncThunk.fulfilled, (state, action) => {
      state.loading = false;
      state.deleteMyCart = action.payload;
      state.isSuccess = true;
    });
    builder.addCase(deleteMyCartAsyncThunk.rejected, (state, action) => {
      state.message = action;
      state.loading = false;
      state.isSuccess = false;
    });

    //cart in address page

    builder.addCase(getCartContentAsyncThunk.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getCartContentAsyncThunk.fulfilled, (state, action) => {
      state.loading = false;
      state.cartContentInCa = action.payload;
      state.isSuccess = true;
    });
    builder.addCase(getCartContentAsyncThunk.rejected, (state, action) => {
      state.message = action;
      state.loading = false;
      state.isSuccess = false;
    });

    builder.addCase(addToCartAsyncThunk.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(addToCartAsyncThunk.fulfilled, (state, action) => {
      state.loading = false;
      state.addToCart = action.payload;
      state.isSuccess = true;
    });
    builder.addCase(addToCartAsyncThunk.rejected, (state, action) => {
      state.message = action;
      state.loading = false;
      state.isSuccess = false;
    });

    //apply offers

    builder.addCase(applyOffersAsyncThunk.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(applyOffersAsyncThunk.fulfilled, (state, action) => {
      state.loading = false;
      state.applyOffers = action.payload;
      state.isSuccess = true;
    });
    builder.addCase(applyOffersAsyncThunk.rejected, (state, action) => {
      state.message = action;
      state.loading = false;
      state.isSuccess = false;
    });
  },
});

export const {
  setItemDis,
  storCartId,
  setOfferApplied,
  setTimeValue,
  setDateValue,
} = ProceedSlice.actions;

export default ProceedSlice;
