import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  message: "",
  data: {},
  isSuccess: false,
  loading: false,
  otp: "",
  emailId: "",
  mobile: {},
};

export const FPemailAsyncThunk: any = createAsyncThunk(
  "recent/ FPemailAsyncThunk",
  (emailId: any, { rejectWithValue }: any) => {
    axios(
      `http://lorem-env.eba-vjfwziew.ap-northeast-1.elasticbeanstalk.com/Lorem/forgotPassword/email`,
      {
        method: "put",
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
        },
        data: { emailId: emailId },
      }
    )
      .then((res) => {
        if (res) {
          alert(res.data);
          return res;
        }
      })
      .catch((err) => {
        alert(err.response.data);
        return err.response;
      });
  }
);

export const FPmobileAsyncThunk: any = createAsyncThunk(
  "recent/ FPmobileAsyncThunk",
  (emailId: any, { rejectWithValue }: any) => {
    axios(
      `http://lorem-env.eba-vjfwziew.ap-northeast-1.elasticbeanstalk.com/Lorem/forgotPassword/email`,
      {
        method: "put",
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
        },
        data: { emailId: emailId },
      }
    )
      .then((res) => {
        if (res) {
          alert(res.data);
          return res;
        }
      })
      .catch((err) => {
        alert(err.response.data);
        return err.response;
      });
  }
);

export const forgotPasswordEmailSlice = createSlice({
  name: "FPverifyEmail",
  initialState,
  reducers: {
    storeOtp: (state: any, action: any) => {
      state.otp = action.payload;
    },
    storeEmailForgot: (state: any, action: any) => {
      state.emailId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(FPemailAsyncThunk.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(FPemailAsyncThunk.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action;
      state.isSuccess = true;
    });
    builder.addCase(FPemailAsyncThunk.rejected, (state, action) => {
      state.data = action.payload;
      state.loading = false;
      state.isSuccess = false;
    });
    //mobile
    builder.addCase(FPmobileAsyncThunk.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(FPmobileAsyncThunk.fulfilled, (state, action) => {
      state.loading = false;
      state.mobile = action;
      state.isSuccess = true;
    });
    builder.addCase(FPmobileAsyncThunk.rejected, (state, action) => {
      state.data = action.payload;
      state.loading = false;
      state.isSuccess = false;
    });
  },
});

export const { storeOtp, storeEmailForgot } = forgotPasswordEmailSlice.actions;

export default forgotPasswordEmailSlice;
