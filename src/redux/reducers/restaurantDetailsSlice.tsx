import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const initialState = {
  message: "",
  restaurantHeader: {},
  restaurantMenu: {},
  restaurantOverview: {},
  restaurantGallery: {},
  restaurantReview: {},
  restaurantOpen: [
    {
      dateOf: "2022-12-17",
      openingTime: "09:00:00",
      closingTime: "23:00:00",
      reason: null,
      opened: true,
    },
  ],
  addToCart: {},
  isSuccess: false,
  loading: false,
  customised: {},
  addRating: {},
  ratingPhoto: {},
};

export const eachRestaurantHeaderAsyncThunk: any = createAsyncThunk(
  "recent/eachRestaurantHeaderAsyncThunk",

  async (payload: any, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await axios.get(
        `http://lorem-env.eba-vjfwziew.ap-northeast-1.elasticbeanstalk.com/Lorem/viewRestaurant?restaurantId=${payload}&latitude=13.437000&longitude=74.744499`
        // {
        //   headers: {
        //     Authorization: `Bearer ${sessionStorage.getItem("jwtToken")}`,
        //   },
        // }
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

export const eachRestaurantMenuAsyncThunk: any = createAsyncThunk(
  "recent/eachRestaurantMenuAsyncThunk",

  async (payload: any, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await axios.get(
        `http://lorem-env.eba-vjfwziew.ap-northeast-1.elasticbeanstalk.com/Lorem/displayMenuItems?restaurantId=${payload}`
        // {
        //   headers: {
        //     Authorization: `Bearer ${sessionStorage.getItem("jwtToken")}`,
        //   },
        // }
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

export const eachRestaurantOverviewAsyncThunk: any = createAsyncThunk(
  "recent/eachRestaurantOverviewAsyncThunk",

  async (payload: any, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await axios.get(
        `http://lorem-env.eba-vjfwziew.ap-northeast-1.elasticbeanstalk.com/Lorem/overView?restaurantId=${payload}`
        // {
        //   headers: {
        //     Authorization: `Bearer ${sessionStorage.getItem("jwtToken")}`,
        //   },
        // }
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

//gallery
export const eachRestaurantGalleryAsyncThunk: any = createAsyncThunk(
  "recent/eachRestaurantGalleryAsyncThunk",

  async (payload: any, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await axios.get(
        `http://lorem-env.eba-vjfwziew.ap-northeast-1.elasticbeanstalk.com/Lorem/view/gallery?restaurantId=${payload}&page=1`
        // {
        //   headers: {
        //     Authorization: `Bearer ${sessionStorage.getItem("jwtToken")}`,
        //   },
        // }
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

//searchBarSlice builderadd case not done yet
export const searchRestaurantMenuAsyncThunk: any = createAsyncThunk(
  "recent/searchRestaurantMenuAsyncThunk",

  async (
    { restautrantId, searchBarValue }: any,
    { rejectWithValue, getState, dispatch }
  ) => {
    try {
      const { data } = await axios.get(
        `http://lorem-env.eba-vjfwziew.ap-northeast-1.elasticbeanstalk.com/Lorem/searchItem?restaurantId=${restautrantId}&dishName=${searchBarValue}`
        // {
        //   headers: {
        //     Authorization: `Bearer ${sessionStorage.getItem("jwtToken")}`,
        //   },
        // }
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

export const eachRestaurantRatingAsyncThunk: any = createAsyncThunk(
  "recent/eachRestaurantRatingAsyncThunk",

  async (payload: any, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await axios.get(
        `http://lorem-env.eba-vjfwziew.ap-northeast-1.elasticbeanstalk.com/Lorem/getReviews?restaurantId=${payload}&pageNo=1&limit=`
        // {
        //   headers: {
        //     Authorization: `Bearer ${sessionStorage.getItem("jwtToken")}`,

        //   },
        // }
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

export const eachRestaurantOverViewOpenAsyncThunk: any = createAsyncThunk(
  "recent/eachRestaurantOverViewOpenAsyncThunk",

  async (payload: any, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await axios.get(
        `http://lorem-env.eba-vjfwziew.ap-northeast-1.elasticbeanstalk.com/Lorem/openingsFor7Days?restaurantId=${payload}`
        // {
        //   headers: {
        //     Authorization: `Bearer ${sessionStorage.getItem("jwtToken")}`,
        //   },
        // }
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
//ratingPost

export const addRatingAsyncThunk: any = createAsyncThunk(
  "recent/ addRatingAsyncThunk",
  async (arg: any, { rejectWithValue }: any) => {
    arg.forEach((value: any, key: any) => {});

    try {
      const fetchedData: any = await axios({
        method: "post",
        url: `http://lorem-env.eba-vjfwziew.ap-northeast-1.elasticbeanstalk.com/User/review`,

        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("jwtToken")}`,
        },
        data: arg,
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

//updateRatingPhotos

export const addRatingPhotoAsyncThunk: any = createAsyncThunk(
  "recent/ addRatingPhotoAsyncThunk",
  async (args: any, { rejectWithValue }: any) => {
    args.forEach((value: any, key: any) => {});

    try {
      const fetchedData: any = await axios({
        method: "post",
        url: `http://lorem-env.eba-vjfwziew.ap-northeast-1.elasticbeanstalk.com/User/uploadReviewPhotos`,

        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("jwtToken")}`,
          "Content-type": " multipart/form-date",
        },
        data: args,
      });

      return fetchedData;
    } catch (err) {
      let error: any = err;

      return rejectWithValue(error);
    }
  }
);

export const restaurantDetailsListSlice = createSlice({
  name: "restaurantList",
  initialState,
  reducers: {
    storeCustomization: (state: any, action: any) => {
      state.customised = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(eachRestaurantHeaderAsyncThunk.pending, (state, action) => {
      // Add user to the state array
      state.loading = true;
    });
    builder.addCase(
      eachRestaurantHeaderAsyncThunk.fulfilled,
      (state, action) => {
        state.loading = false;
        state.restaurantHeader = action.payload;
        state.isSuccess = true;
      }
    );
    builder.addCase(
      eachRestaurantHeaderAsyncThunk.rejected,
      (state, action) => {
        state.message = action.payload;
        state.loading = false;
        state.isSuccess = false;
      }
    );
    builder.addCase(eachRestaurantMenuAsyncThunk.pending, (state, action) => {
      // Add user to the state array
      state.loading = true;
    });
    builder.addCase(eachRestaurantMenuAsyncThunk.fulfilled, (state, action) => {
      state.loading = false;
      state.restaurantMenu = action.payload;
      state.isSuccess = true;
    });
    builder.addCase(eachRestaurantMenuAsyncThunk.rejected, (state, action) => {
      state.message = action.payload;
      state.loading = false;
      state.isSuccess = false;
    });
    //overView
    builder.addCase(
      eachRestaurantOverviewAsyncThunk.pending,
      (state, action) => {
        // Add user to the state array
        state.loading = true;
      }
    );
    builder.addCase(
      eachRestaurantOverviewAsyncThunk.fulfilled,
      (state, action) => {
        state.loading = false;
        state.restaurantOverview = action.payload;
        state.isSuccess = true;
      }
    );
    builder.addCase(
      eachRestaurantOverviewAsyncThunk.rejected,
      (state, action) => {
        state.message = action.payload;
        state.loading = false;
        state.isSuccess = false;
      }
    );

    //gallery
    builder.addCase(
      eachRestaurantGalleryAsyncThunk.pending,
      (state, action) => {
        // Add user to the state array
        state.loading = true;
      }
    );
    builder.addCase(
      eachRestaurantGalleryAsyncThunk.fulfilled,
      (state, action) => {
        state.loading = false;
        state.restaurantGallery = action.payload;
        state.isSuccess = true;
      }
    );
    builder.addCase(
      eachRestaurantGalleryAsyncThunk.rejected,
      (state, action) => {
        state.message = action.payload;
        state.loading = false;
        state.isSuccess = false;
      }
    );

    //searchMENU
    builder.addCase(searchRestaurantMenuAsyncThunk.pending, (state, action) => {
      // Add user to the state array
      state.loading = true;
    });
    builder.addCase(
      searchRestaurantMenuAsyncThunk.fulfilled,
      (state, action) => {
        state.loading = false;
        state.restaurantMenu = action.payload;
        state.isSuccess = true;
      }
    );
    builder.addCase(
      searchRestaurantMenuAsyncThunk.rejected,
      (state, action) => {
        state.message = action.payload;
        state.loading = false;
        state.isSuccess = false;
      }
    );

    //rating
    builder.addCase(eachRestaurantRatingAsyncThunk.pending, (state, action) => {
      // Add user to the state array
      state.loading = true;
    });
    builder.addCase(
      eachRestaurantRatingAsyncThunk.fulfilled,
      (state, action) => {
        state.loading = false;
        state.restaurantReview = action.payload;
        state.isSuccess = true;
      }
    );
    builder.addCase(
      eachRestaurantRatingAsyncThunk.rejected,
      (state, action) => {
        state.message = action.payload;
        state.loading = false;
        state.isSuccess = false;
      }
    );

    //addRating
    builder.addCase(addRatingAsyncThunk.pending, (state, action) => {
      // Add user to the state array
      state.loading = true;
    });
    builder.addCase(addRatingAsyncThunk.fulfilled, (state, action) => {
      state.loading = false;
      state.addRating = action.payload;
      state.isSuccess = true;
    });
    builder.addCase(addRatingAsyncThunk.rejected, (state, action) => {
      state.message = action.payload;
      state.loading = false;
      state.isSuccess = false;
    });

    //add to cart

    //7 days
    builder.addCase(
      eachRestaurantOverViewOpenAsyncThunk.pending,
      (state, action) => {
        // Add user to the state array
        state.loading = true;
      }
    );
    builder.addCase(
      eachRestaurantOverViewOpenAsyncThunk.fulfilled,
      (state, action) => {
        state.loading = false;
        state.restaurantOpen = action.payload;
        state.isSuccess = true;
      }
    );
    builder.addCase(
      eachRestaurantOverViewOpenAsyncThunk.rejected,
      (state, action) => {
        state.message = action.payload;
        state.loading = false;
        state.isSuccess = false;
      }
    );

    //ratingPhoto
    builder.addCase(addRatingPhotoAsyncThunk.pending, (state, action) => {
      // Add user to the state array
      state.loading = true;
    });
    builder.addCase(addRatingPhotoAsyncThunk.fulfilled, (state, action) => {
      state.loading = false;
      state.ratingPhoto = action.payload;
      state.isSuccess = true;
    });
    builder.addCase(addRatingPhotoAsyncThunk.rejected, (state, action) => {
      state.message = action.payload;
      state.loading = false;
      state.isSuccess = false;
    });
  },
});

export const { storeCustomization } = restaurantDetailsListSlice.actions;

export default restaurantDetailsListSlice;
