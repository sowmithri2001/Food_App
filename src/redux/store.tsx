import { combineReducers, configureStore } from "@reduxjs/toolkit";

import forgotPasswordEmailSlice from "./reducers/forgotPasswordEmailSlice";
import popularBrandsSlice, {
  popularBrandsAsyncThunk,
} from "./reducers/homePageslice";
import loginEmailSlice from "./reducers/loginEmailSlice";
import modalSlice from "./reducers/modalSlice";
import getProfileSlice, { getProfileAsyncThunk } from "./reducers/profileSlice";
import regDetailsSlice from "./reducers/regDetailsSlice";
import OtpRegSlice from "./reducers/registerOtpSlice";
import emailSlice from "./reducers/registerSlice";
import resetPasswordSlice, {
  resetPasswordAsyncThunk,
} from "./reducers/resetPasswordSlice";
import restaurantDetailsListSlice from "./reducers/restaurantDetailsSlice";
import restaurantListSlice from "./reducers/restaurantListSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import thunk from "redux-thunk";
import dealsAndOffersSlice from "./reducers/dealsAndOffersSlice";
import placeValueSlice from "./reducers/placeValueSlice";
import cartSlice from "./reducers/cartSlice";
import cartStepper from "./reducers/cartStepperSlice";
import ProceedSlice from "./reducers/proceedDetails";
import choseAddressViewSlice from "./reducers/choseAddresViewSlice";
import getMyOrderSlice from "./reducers/getmyCartSlice";
import placeAutoCompleteSlice from "./reducers/placeAutoCompleteSlice";
import orangeSlice from "./reducers/orangeSlice";

const reducers = combineReducers({
  modalStatus: modalSlice.reducer,
  restaurantList: restaurantListSlice.reducer,
  restaurantDetailsList: restaurantDetailsListSlice.reducer,
  verifyEmail: emailSlice.reducer,
  verifyOtpReg: OtpRegSlice.reducer,
  regDetails: regDetailsSlice.reducer,
  verifyLoginEmail: loginEmailSlice.reducer,
  FPverifyEmail: forgotPasswordEmailSlice.reducer,
  resetPass: resetPasswordSlice.reducer,
  popularBrands: popularBrandsSlice.reducer,
  dealsAndOffers: dealsAndOffersSlice.reducer,
  getProfile: getProfileSlice.reducer,
  placeValue: placeValueSlice.reducer,
  cart: cartSlice,
  cartStepper: cartStepper.reducer,
  proceedSlice: ProceedSlice.reducer,
  choseAddressViewSlice: choseAddressViewSlice.reducer,
  getMyOrderSlice: getMyOrderSlice.reducer,
  placeAuto: placeAutoCompleteSlice.reducer,
  orangeSlice: orangeSlice.reducer,
});

const persistConfig: any = {
  key: "root",
  storage,
  blacklist: ["cartStepper", "orangeSlice"],
};

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: [thunk],
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
