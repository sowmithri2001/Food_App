import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { act } from "@testing-library/react";

const initialState = {
  message: "",
  data: {},
  isSuccess: false,
  loading: false,
  password: "",
  mobile: "",
};

export const regDetailsAsyncThunk: any = createAsyncThunk(
  "recent/regDetailsAsyncThunk",
  async (arg: any, { rejectWithValue }: any) => {


    try {
      const fetchedData: any = await axios({
        method: "post",
        url: "http://lorem-env.eba-vjfwziew.ap-northeast-1.elasticbeanstalk.com/Lorem/register",
        data: {
          firstName: arg.firstName,
          lastName: arg.lastName,
          emailId: arg.emailId,
          mobileNo: arg.mobileNo,
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

export const regDetailsSlice = createSlice({
  name: "regDetails",
  initialState,
  reducers: {
    storePass: (state: any, action: any) => {
      state.password = action.payload;


    },
    storeMobile: (state: any, action: any) => {
      state.mobile = action.payload;

    },
  },
  extraReducers: (builder) => {
    builder.addCase(regDetailsAsyncThunk.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(regDetailsAsyncThunk.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;


      state.isSuccess = true;
    });
    builder.addCase(regDetailsAsyncThunk.rejected, (state, action) => {
      state.message = action.payload;
      state.data = state.loading = false;
      state.isSuccess = false;
    });
  },
});

export const { storePass } = regDetailsSlice.actions;

export default regDetailsSlice;
