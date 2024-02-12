import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  message: "",
  data: {},
  isSuccess: false,
  loading: false,
};

export const registerOtpAsyncThunk: any = createAsyncThunk(
  "recent/registerOtpAsyncThunk",
  async (arg: any, { rejectWithValue }: any) => {

    try {
      const fetchedData: any = await axios({
        method: "put",
        url: "http://lorem-env.eba-vjfwziew.ap-northeast-1.elasticbeanstalk.com/Lorem/verifyEMail2fa",
        data: {
          emailId: arg.email,
          emailOtp: arg.otp,
        },
      });

      return fetchedData;
    } catch (err) {
      let error: any = err;

      return rejectWithValue(error.response.data);
    }
  }
);

export const OtpRegSlice = createSlice({
  name: "verifyOtpReg",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(registerOtpAsyncThunk.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(registerOtpAsyncThunk.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;

      state.isSuccess = true;
    });
    builder.addCase(registerOtpAsyncThunk.rejected, (state, action) => {
      state.data = action.payload;
      state.data = state.loading = false;
      state.isSuccess = false;
    });
  },
});

export const { } = OtpRegSlice.actions;

export default OtpRegSlice;
