import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  message: "",
  data: {},
  isSuccess: false,
  loading: false,
};

export const popularBrandsAsyncThunk: any = createAsyncThunk(
  "recent/ popularBrandsAsyncThunk",
  async (arg: any, { rejectWithValue }: any) => {

    try {
      const fetchedData: any = await axios.get(
        `http://lorem-env.eba-vjfwziew.ap-northeast-1.elasticbeanstalk.com/Lorem/viewPopularBrands?pageNo=${arg}&limit=1&latitude=13.340881&longitude=74.742142`,
        {
          params: {
            pageNo: arg,
          },
        }
      );

      return fetchedData;
    } catch (err) {
      let error: any = err;
      return rejectWithValue(error);
    }
  }
);

export const popularBrandsSlice = createSlice({
  name: "popularBrands",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(popularBrandsAsyncThunk.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(popularBrandsAsyncThunk.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.isSuccess = true;
    });
    builder.addCase(popularBrandsAsyncThunk.rejected, (state, action) => {
      state.message = action;
      state.loading = false;
      state.isSuccess = false;
    });
  },
});

export const { } = popularBrandsSlice.actions;

export default popularBrandsSlice;
