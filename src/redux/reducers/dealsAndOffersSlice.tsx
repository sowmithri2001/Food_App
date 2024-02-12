import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  message: "",
  data: {},
  isSuccess: false,
  loading: false,
  allOffers: {},
  offerDetails: {},
};

export const dealsAndOffersAsyncThunk: any = createAsyncThunk(
  "recent/ dealsAndOffersAsyncThunk",
  async (arg: any, { rejectWithValue }: any) => {

    try {
      const fetchedData: any = await axios.get(
        `http://lorem-env.eba-vjfwziew.ap-northeast-1.elasticbeanstalk.com/Lorem/viewBestOffers?page=${arg}&limit=2`,
        {
          params: {
            page: arg,
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
export const allOffersAsyncThunk: any = createAsyncThunk(
  "recent/ allOffersAsyncThunk",
  async (arg: any, { rejectWithValue }: any) => {

    try {
      const fetchedData: any = await axios.get(
        `http://lorem-env.eba-vjfwziew.ap-northeast-1.elasticbeanstalk.com/Lorem/viewBestOffers?page=1&limit=10`,
        {
          params: {
            page: arg,
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
export const allOffersDetailsAsyncThunk: any = createAsyncThunk(
  "recent/allOffersDetailsAsyncThunk",

  async (payload: any, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await axios.get(
        `http://lorem-env.eba-vjfwziew.ap-northeast-1.elasticbeanstalk.com/Lorem/viewDetails?offerId=${payload}&latitude=13.3782930000&longitude=74.7411650000`
      );
      return data;
    } catch (error) {
      if (!error) {
        throw error;
      }
      return rejectWithValue(error);
    }
  }
);

export const dealsAndOffersSlice = createSlice({
  name: "dealsAndOffers",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(dealsAndOffersAsyncThunk.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(dealsAndOffersAsyncThunk.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.isSuccess = true;
    });
    builder.addCase(dealsAndOffersAsyncThunk.rejected, (state, action) => {
      state.message = action;
      state.loading = false;
      state.isSuccess = false;
    });

    builder.addCase(allOffersAsyncThunk.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(allOffersAsyncThunk.fulfilled, (state, action) => {
      state.loading = false;

      state.allOffers = action.payload;
      state.isSuccess = true;
    });
    builder.addCase(allOffersAsyncThunk.rejected, (state, action) => {
      state.message = action;
      state.loading = false;
      state.isSuccess = false;
    });
    builder.addCase(allOffersDetailsAsyncThunk.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(allOffersDetailsAsyncThunk.fulfilled, (state, action) => {
      state.loading = false;
      state.offerDetails = action.payload;
      state.isSuccess = true;
    });
    builder.addCase(allOffersDetailsAsyncThunk.rejected, (state, action) => {
      state.message = action;
      state.loading = false;
      state.isSuccess = false;
    });
  },
});

export const { } = dealsAndOffersSlice.actions;

export default dealsAndOffersSlice;
