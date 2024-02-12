import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  message: "",
  data: {},
  isSuccess: false,
  loading: false,
};

export const resetPasswordAsyncThunk: any = createAsyncThunk(
  "recent/resetPasswordAsyncThunk",
  async (arg: any, { rejectWithValue }: any) => {

    try {
      const fetchedData: any = await axios({
        method: "put",
        url: "http://lorem-env.eba-vjfwziew.ap-northeast-1.elasticbeanstalk.com/Lorem/resetPassword",
        data: {
          emailId: arg.emailId,
          otp: arg.otp,
          password: arg.password,
        },
      });

      return fetchedData;
    } catch (err) {
      let error: any = err;

      return rejectWithValue(error.response.data);
    }
  }
);

export const resetPasswordSlice = createSlice({
  name: "resetPass",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(resetPasswordAsyncThunk.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(resetPasswordAsyncThunk.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;


      state.isSuccess = true;
    });
    builder.addCase(resetPasswordAsyncThunk.rejected, (state, action) => {
      state.message = action.payload;
      state.data = state.loading = false;
      state.isSuccess = false;
    });
  },
});

export const { } = resetPasswordSlice.actions;

export default resetPasswordSlice;
