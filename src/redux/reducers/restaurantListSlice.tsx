import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  message: "",
  restaurants: {},
  isSuccess: false,
  loading: false,
  brands: {},
  brandsNearBy: {},
  brandsNearByProfile: {},
  brandList: {},
  viewOfferDetails: {},
  viewOfferLimit: {},
  customiseData: {},
  searchValueFood: "",
  restAll: {},
  viewBrandOffers: {},
  brandId: {},
  viewAllOffer: {},
};

export const restaurantListAsyncThunk: any = createAsyncThunk(
  "recent/ restaurantListAsyncThunk",
  async (payload: any, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await axios.get(
        `http://lorem-env.eba-vjfwziew.ap-northeast-1.elasticbeanstalk.com/Lorem/Search?longitude=74.742142&latitude=13.340881`,
        {
          params: {
            deliveryTime: payload && payload[0].deliveryTime,
            maxAvgMealCost: payload && payload[0].averageMealCost,
            maxMinOrderCost: payload && payload[0].minimumOrder,
          },
        }
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

//searchBarHeader
export const restaurantHeaderSearchAsyncThunk: any = createAsyncThunk(
  "recent/ restaurantHeaderSearchAsyncThunk",
  async ({ searchBarValue }: any, { rejectWithValue, getState, dispatch }) => {

    try {
      const { data } =
        await axios.get(`http://lorem-env.eba-vjfwziew.ap-northeast-1.elasticbeanstalk.com/Lorem/Search?longitude=74.742142&latitude=13.340881
&restaurantOrFoodType=${searchBarValue}`);
      return data;
    } catch (error) {
      if (!error) {
        throw error;
      }
      return rejectWithValue(error);
    }
  }
);
export const restaurantListDescAsyncThunk: any = createAsyncThunk(
  "recent/ restaurantListDescAsyncThunk",
  async (payload: any, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await axios.get(
        `http://lorem-env.eba-vjfwziew.ap-northeast-1.elasticbeanstalk.com/Lorem/Search?longitude=74.742142&latitude=13.340881&descRating=${payload}`
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
 
export const allBrandsAsyncThunk: any = createAsyncThunk(
  "recent/allBrandsAsyncThunk",

  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await axios.get(
        `http://lorem-env.eba-vjfwziew.ap-northeast-1.elasticbeanstalk.com/Lorem/viewAllBrands?pageNo=1&limit=10`
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
export const brandsNearByAsyncThunk: any = createAsyncThunk(
  "recent/ brandsNearByAsyncThunk",

  async (arg: any, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await axios.get(
        `http://lorem-env.eba-vjfwziew.ap-northeast-1.elasticbeanstalk.com/Lorem/Brands?latitude=13.340881&longitude=74.742142&`,
        {
          params: {
            pageNumber: arg.pageNo,
            limit: arg.limit,
          },
        }
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

export const brandsNearByProfileAsyncThunk: any = createAsyncThunk(
  "recent/ brandsNearByProfileAsyncThunk",

  async (brandId: any, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await axios.get(
        `http://lorem-env.eba-vjfwziew.ap-northeast-1.elasticbeanstalk.com/Lorem/viewBrand?brandId=${brandId}
        `,
        {
          params: {
            brandId: brandId,
          },
        }
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

export const viewOfferDetailsAsyncThunk: any = createAsyncThunk(
  "recent/ viewOfferDetailsAsyncThunk",

  async (arg: any, { rejectWithValue, getState, dispatch }) => {


    try {
      const { data } = await axios.get(
        `http://lorem-env.eba-vjfwziew.ap-northeast-1.elasticbeanstalk.com/Lorem/restaurant/best/offers?page=1&restaurantId=${arg.restaurantId}&limit=${arg.limit}&latitude=13.3782930000&longitude=74.7411650000`
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

export const viewallOfferAsyncThunk: any = createAsyncThunk(
  "recent/ viewallOfferAsyncThunk",

  async (arg: any, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await axios.get(
        `http://lorem-env.eba-vjfwziew.ap-northeast-1.elasticbeanstalk.com/Lorem/viewBestOffers?page=1&limit=10`
      );
      console.log(data);
      return data;
    } catch (error) {
      if (!error) {
        throw error;
      }
      return rejectWithValue(error);
    }
  }
);
export const viewallRestOfferDetailsAsyncThunk: any = createAsyncThunk(
  "recent/ viewallRestOfferDetailsAsyncThunk",

  async (arg: any, { rejectWithValue, getState, dispatch }) => {


    try {
      const { data } = await axios.get(
        `http://lorem-env.eba-vjfwziew.ap-northeast-1.elasticbeanstalk.com/Lorem/restaurant/all/offers?page=1&restaurantId=${arg.restaurantId}&limit=20`
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
export const viewOfferLimitDetailsAsyncThunk: any = createAsyncThunk(
  "recent/ viewOfferLimitDetailsAsyncThunk",

  async (arg: any, { rejectWithValue, getState, dispatch }) => {


    try {
      const { data } = await axios.get(
        `http://lorem-env.eba-vjfwziew.ap-northeast-1.elasticbeanstalk.com/Lorem/restaurant/best/offers?page=1&restaurantId=${arg.restaurantId}&limit=${arg.limit}&latitude=13.3782930000&longitude=74.7411650000`
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

export const viewBrandOffersAsyncThunk: any = createAsyncThunk(
  "recent/ viewBrandOffersAsyncThunk",

  async (arg: any, { rejectWithValue, getState, dispatch }) => {


    try {
      const { data } = await axios.get(
        `http://lorem-env.eba-vjfwziew.ap-northeast-1.elasticbeanstalk.com/Lorem/viewBrandOffers?brandID=${arg.brandId}&page=1&limit=${arg.limit}`
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
export const brandListAsyncThunk: any = createAsyncThunk(
  "recent/brandListAsyncThunk",
  async (brandId: any, { rejectWithValue, getState, dispatch }) => {


    try {
      const { data } = await axios.get(
        `http://lorem-env.eba-vjfwziew.ap-northeast-1.elasticbeanstalk.com/Lorem/Search?longitude=74.742142&latitude=13.340881`,
        {
          params: {
            brandId: brandId,
          },
        }
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

export const customiseDataAsyncThunk: any = createAsyncThunk(
  "recent/ customiseDataAsyncThunk",

  async (arg: any, { rejectWithValue, getState, dispatch }) => {


    try {
      const { data } = await axios.get(
        `http://lorem-env.eba-vjfwziew.ap-northeast-1.elasticbeanstalk.com/Lorem/getCustomize?restaurantId=${arg.restaurantId}&dishId=${arg.dishId}`,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("jwtToken")}`,
          },
          params: {
            restaurantId: arg.restaurantId,
            dishId: arg.dishId,
          },
        }
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

export const restaurantListSlice = createSlice({
  name: "restaurantList",
  initialState,
  reducers: {
    setSearchValueFood: (state: any, action: any) => {
      state.searchValue = action.payload;
    },
    storeBrandId: (state: any, action: any) => {
      state.brandId = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(restaurantListAsyncThunk.pending, (state, action) => {
      // Add user to the state array
      state.loading = true;
    });
    builder.addCase(restaurantListAsyncThunk.fulfilled, (state, action) => {
      state.loading = false;
      state.restaurants = action.payload;
      state.isSuccess = true;
    });
    builder.addCase(restaurantListAsyncThunk.rejected, (state, action) => {
      state.message = action.payload;
      state.loading = false;
      state.isSuccess = false;
    });

    //searchBAR

    builder.addCase(
      restaurantHeaderSearchAsyncThunk.pending,
      (state, action) => {
        // Add user to the state array
        state.loading = true;
      }
    );
    builder.addCase(
      restaurantHeaderSearchAsyncThunk.fulfilled,
      (state, action) => {
        state.loading = false;
        state.restaurants = action.payload;
        state.isSuccess = true;
      }
    );
    builder.addCase(
      restaurantHeaderSearchAsyncThunk.rejected,
      (state, action) => {
        state.message = action.payload;
        state.loading = false;
        state.isSuccess = false;
      }
    );

    builder.addCase(allBrandsAsyncThunk.pending, (state, action) => {
      // Add user to the state array
      state.loading = true;
    });
    builder.addCase(allBrandsAsyncThunk.fulfilled, (state, action) => {
      state.loading = false;
      state.brands = action.payload;
      state.isSuccess = true;
    });
    builder.addCase(allBrandsAsyncThunk.rejected, (state, action) => {
      state.message = action.payload;
      state.loading = false;
      state.isSuccess = false;
    });

    builder.addCase(viewallOfferAsyncThunk.pending, (state, action) => {
      // Add user to the state array
      state.loading = true;
    });
    builder.addCase(viewallOfferAsyncThunk.fulfilled, (state, action) => {
      state.loading = false;
      state.viewAllOffer = action.payload;
      state.isSuccess = true;
    });
    builder.addCase(viewallOfferAsyncThunk.rejected, (state, action) => {
      state.message = action.payload;
      state.loading = false;
      state.isSuccess = false;
    });

    //ratingsAscDesc
    builder.addCase(restaurantListDescAsyncThunk.pending, (state, action) => {
      // Add user to the state array
      state.loading = true;
    });
    builder.addCase(restaurantListDescAsyncThunk.fulfilled, (state, action) => {
      state.loading = false;
      state.restaurants = action.payload;
      state.isSuccess = true;
    });
    builder.addCase(restaurantListDescAsyncThunk.rejected, (state, action) => {
      state.message = action.payload;
      state.loading = false;
      state.isSuccess = false;
    });

    //brands nearby
    builder.addCase(brandsNearByAsyncThunk.pending, (state, action) => {
      // Add user to the state array
      state.loading = true;
    });
    builder.addCase(brandsNearByAsyncThunk.fulfilled, (state, action) => {
      state.loading = false;
      state.brandsNearBy = action.payload;
      state.isSuccess = true;
    });
    builder.addCase(brandsNearByAsyncThunk.rejected, (state, action) => {
      state.message = action.payload;
      state.loading = false;
      state.isSuccess = false;
    });

    //brands profile
    builder.addCase(brandsNearByProfileAsyncThunk.pending, (state, action) => {
      // Add user to the state array
      state.loading = true;
    });
    builder.addCase(
      brandsNearByProfileAsyncThunk.fulfilled,
      (state, action) => {
        state.loading = false;
        state.brandsNearByProfile = action.payload;
        state.isSuccess = true;
      }
    );
    builder.addCase(brandsNearByProfileAsyncThunk.rejected, (state, action) => {
      state.message = action.payload;
      state.loading = false;
      state.isSuccess = false;
    });
    //brands list
    builder.addCase(brandListAsyncThunk.pending, (state, action) => {
      // Add user to the state array
      state.loading = true;
    });
    builder.addCase(brandListAsyncThunk.fulfilled, (state, action) => {


      state.loading = false;
      state.brandList = action.payload;
      state.isSuccess = true;
    });
    builder.addCase(brandListAsyncThunk.rejected, (state, action) => {
      state.message = action.payload;
      state.loading = false;
      state.isSuccess = false;
    });

    //view all offers
    builder.addCase(viewOfferDetailsAsyncThunk.pending, (state, action) => {
      // Add user to the state array
      state.loading = true;
    });
    builder.addCase(viewOfferDetailsAsyncThunk.fulfilled, (state, action) => {


      state.loading = false;
      state.viewOfferDetails = action.payload;
      state.isSuccess = true;
    });
    builder.addCase(viewOfferDetailsAsyncThunk.rejected, (state, action) => {
      state.message = action.payload;
      state.loading = false;
      state.isSuccess = false;
    });
    //view limit offers
    builder.addCase(
      viewOfferLimitDetailsAsyncThunk.pending,
      (state, action) => {
        // Add user to the state array
        state.loading = true;
      }
    );
    builder.addCase(
      viewOfferLimitDetailsAsyncThunk.fulfilled,
      (state, action) => {


        state.loading = false;
        state.viewOfferLimit = action.payload;
        state.isSuccess = true;
      }
    );
    builder.addCase(
      viewOfferLimitDetailsAsyncThunk.rejected,
      (state, action) => {
        state.message = action.payload;
        state.loading = false;
        state.isSuccess = false;
      }
    );

    //customise
    builder.addCase(customiseDataAsyncThunk.pending, (state, action) => {
      // Add user to the state array
      state.loading = true;
    });
    builder.addCase(customiseDataAsyncThunk.fulfilled, (state, action) => {
      state.loading = false;
      state.customiseData = action.payload;
      state.isSuccess = true;
    });
    builder.addCase(customiseDataAsyncThunk.rejected, (state, action) => {
      state.message = action.payload;
      state.loading = false;
      state.isSuccess = false;
    });

    //restAll
    builder.addCase(
      viewallRestOfferDetailsAsyncThunk.pending,
      (state, action) => {
        // Add user to the state array
        state.loading = true;
      }
    );
    builder.addCase(
      viewallRestOfferDetailsAsyncThunk.fulfilled,
      (state, action) => {
        state.loading = false;
        state.restAll = action.payload;
        state.isSuccess = true;
      }
    );
    builder.addCase(
      viewallRestOfferDetailsAsyncThunk.rejected,
      (state, action) => {
        state.message = action.payload;
        state.loading = false;
        state.isSuccess = false;
      }
    );
    //viewBrandOffer
    builder.addCase(viewBrandOffersAsyncThunk.pending, (state, action) => {
      // Add user to the state array
      state.loading = true;
    });
    builder.addCase(viewBrandOffersAsyncThunk.fulfilled, (state, action) => {
      state.loading = false;
      state.viewBrandOffers = action.payload;
      state.isSuccess = true;
    });
    builder.addCase(viewBrandOffersAsyncThunk.rejected, (state, action) => {
      state.message = action.payload;
      state.loading = false;
      state.isSuccess = false;
    });
  },
});

export const { setSearchValueFood, storeBrandId } = restaurantListSlice.actions;

export default restaurantListSlice;
