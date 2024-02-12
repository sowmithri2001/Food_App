import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  message: "",
  data: {},
  isSuccess: false,
  loading: false,
  addAddress: {},
  editAddress: {},
  getAddress: {},
  getProfile: {},
  editProfile: {},
  addPrimary: {},
  deleteAddress: {},
  getCards: {},
  setPrimaryCard: {},
  addCard: {},
  deleteCard: {},
  referFriend: {},
  shareReferFriend: {},
  likeReview: {},
  getMyReview: {},
  getMyGallery: {},
  num: {},
  veriMob: {},
};

export const getProfileAsyncThunk: any = createAsyncThunk(
  "recent/ getProfileAsyncThunk",
  async (arg: any, { rejectWithValue }: any) => {
    try {
      const fetchedData: any = await axios.get(
        `http://lorem-env.eba-vjfwziew.ap-northeast-1.elasticbeanstalk.com/User/Profile`,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("jwtToken")}`,
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

export const addAddressAsyncThunk: any = createAsyncThunk(
  "recent/ addAddressAsyncThunk",
  async (arg: any, { rejectWithValue }: any) => {
    try {
      const fetchedData: any = await axios({
        method: "post",
        url: `http://lorem-env.eba-vjfwziew.ap-northeast-1.elasticbeanstalk.com/User/addAddress`,

        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("jwtToken")}`,
        },
        data: {
          addressType: arg.addressType,
          city: arg.city,
          area: arg.area,
          addressDescription: arg.addressDescription,
          lattitude: arg.lattitude,
          longitude: arg.longitude,
        },
      });

      return fetchedData;
    } catch (err) {
      let error: any = err;

      return rejectWithValue(error);
    }
  }
);

//edit address thunk

export const editAddressAsyncThunk: any = createAsyncThunk(
  "recent/ editAddressAsyncThunk",
  async (arg: any, { rejectWithValue }: any) => {
    try {
      const fetchedData: any = await axios({
        method: "post",
        url: `http://lorem-env.eba-vjfwziew.ap-northeast-1.elasticbeanstalk.com/User/editAddress`,

        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("jwtToken")}`,
        },
        data: {
          addressId: arg.addressId,
          addressType: arg.addressType,
          city: arg.city,
          area: arg.area,
          addressDescription: arg.addressDescription,
          lattitude: arg.lattitude,
          longitude: arg.longitude,
        },
      });

      return fetchedData;
    } catch (err) {
      let error: any = err;

      return rejectWithValue(error);
    }
  }
);
//edit profile

export const editProfileAsyncThunk: any = createAsyncThunk(
  "recent/ editProfileAsyncThunk",
  async (args: any, { rejectWithValue }: any) => {
    args.forEach((value: any, key: any) => {});

    try {
      const fetchedData: any = await axios({
        method: "put",
        url: `http://lorem-env.eba-vjfwziew.ap-northeast-1.elasticbeanstalk.com/User/editProfile`,

        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("jwtToken")}`,
        },

        data: args,
      });

      return fetchedData;
    } catch (err) {
      let error: any = err;
      alert(error.response.data);

      return rejectWithValue(error);
      window.location.reload();
    }
  }
);

//getmyreview
export const getMyReviewAsyncThunk: any = createAsyncThunk(
  "recent/ getMyReviewAsyncThunk",
  async (arg: any, { rejectWithValue }: any) => {
    try {
      const fetchedData: any = await axios.get(
        `http://lorem-env.eba-vjfwziew.ap-northeast-1.elasticbeanstalk.com/User/MyReviews?pageNo=1&limit=10
`,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("jwtToken")}`,
          },
        }
      );
      //

      return fetchedData;
    } catch (err) {
      let error: any = err;

      return rejectWithValue(error);
    }
  }
);

//getmygallery

export const getMyGalleryAsyncThunk: any = createAsyncThunk(
  "recent/ getMyGalleryAsyncThunk",
  async (arg: any, { rejectWithValue }: any) => {
    try {
      const fetchedData: any = await axios.get(
        `http://lorem-env.eba-vjfwziew.ap-northeast-1.elasticbeanstalk.com/User/gallery?pageNo=`,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("jwtToken")}`,
          },
        }
      );
      //

      return fetchedData;
    } catch (err) {
      let error: any = err;

      return rejectWithValue(error);
    }
  }
);

export const getAddressAsyncThunk: any = createAsyncThunk(
  "recent/ getAddressAsyncThunk",
  async (arg: any, { rejectWithValue }: any) => {
    try {
      const fetchedData: any = await axios.get(
        `http://lorem-env.eba-vjfwziew.ap-northeast-1.elasticbeanstalk.com/User/displayAddresses`,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("jwtToken")}`,
          },
        }
      );
      //

      return fetchedData;
    } catch (err) {
      let error: any = err;

      return rejectWithValue(error);
    }
  }
);

export const setPrimaryAddressAsyncThunk: any = createAsyncThunk(
  "recent/ setPrimaryAddressAsyncThunk",
  async (arg: any, { rejectWithValue }: any) => {
    try {
      const fetchedData: any = await axios({
        method: "put",
        url: `http://lorem-env.eba-vjfwziew.ap-northeast-1.elasticbeanstalk.com/User/setPrimaryAddress?addressId=${arg}`,

        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("jwtToken")}`,
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
        },
        params: {
          addressId: arg,
        },
      });

      return fetchedData;
    } catch (err) {
      let error: any = err;

      return rejectWithValue(error);
    }
  }
);

export const deleteAddressAsyncThunk: any = createAsyncThunk(
  "recent/ deleteAddressAsyncThunk",
  async (arg: any, { rejectWithValue }: any) => {
    try {
      const fetchedData: any = await axios({
        method: "delete",
        url: `http://lorem-env.eba-vjfwziew.ap-northeast-1.elasticbeanstalk.com/User/deleteAddress?addressId=${arg}`,

        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("jwtToken")}`,
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
        },
        params: {
          addressId: arg,
        },
      });

      return fetchedData;
    } catch (err) {
      let error: any = err;

      return rejectWithValue(error);
    }
  }
);

export const getCardsAsyncThunk: any = createAsyncThunk(
  "recent/ getCardsAsyncThunk",
  async (arg: any, { rejectWithValue }: any) => {
    try {
      const fetchedData: any = await axios.get(
        `http://lorem-env.eba-vjfwziew.ap-northeast-1.elasticbeanstalk.com/User/viewCards?pageNo=${arg.pageNo}&limit=10`,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("jwtToken")}`,
          },
          params: {
            pageNo: arg.pageNo,
          },
        }
      );
      //

      return fetchedData;
    } catch (err) {
      let error: any = err;

      return rejectWithValue(error);
    }
  }
);
export const likeReviewAsyncThunk: any = createAsyncThunk(
  "recent/ likeReviewAsyncThunk",
  async (arg: any, { rejectWithValue }: any) => {
    try {
      const fetchedData: any = await axios({
        method: "post",
        url: `http://lorem-env.eba-vjfwziew.ap-northeast-1.elasticbeanstalk.com/User/Review/Like/${arg}`,

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

export const setPrimaryCardAsyncThunk: any = createAsyncThunk(
  "recent/ setPrimaryCardAsyncThunk",
  async (arg: any, { rejectWithValue }: any) => {
    try {
      const fetchedData: any = await axios({
        method: "put",
        url: `http://lorem-env.eba-vjfwziew.ap-northeast-1.elasticbeanstalk.com/User/makeCardPrimary`,

        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("jwtToken")}`,
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
        },
        data: {
          cardNo: arg,
        },
      });

      return fetchedData;
    } catch (err) {
      let error: any = err;

      return rejectWithValue(error);
    }
  }
);

export const addCardAsyncThunk: any = createAsyncThunk(
  "recent/ addCardAsyncThunk",
  async (arg: any, { rejectWithValue }: any) => {
    try {
      const fetchedData: any = await axios({
        method: "post",
        url: `http://lorem-env.eba-vjfwziew.ap-northeast-1.elasticbeanstalk.com/User/addCard`,

        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("jwtToken")}`,
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
        },
        data: {
          cardNo: arg.cardNo,
          cardName: arg.cardName,
          expiryDate: arg.expiryDate,
          cvv: arg.cvv,
        },
      });

      return fetchedData;
    } catch (err) {
      let error: any = err;

      return rejectWithValue(error);
    }
  }
);

export const deleteCardAsyncThunk: any = createAsyncThunk(
  "recent/ deleteCardAsyncThunk",
  async (arg: any, { rejectWithValue }: any) => {
    try {
      const fetchedData: any = await axios({
        method: "put",
        url: `http://lorem-env.eba-vjfwziew.ap-northeast-1.elasticbeanstalk.com/User/deleteCard`,

        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("jwtToken")}`,
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
        },
        data: {
          cardNo: arg,
        },
      });

      return fetchedData;
    } catch (err) {
      let error: any = err;

      return rejectWithValue(error);
    }
  }
);

export const shareReferFriendAsyncThunk: any = createAsyncThunk(
  "recent/ shareReferFriendAsyncThunk",
  async (arg: any, { rejectWithValue }: any) => {
    try {
      const fetchedData: any = await axios.get(
        `http://lorem-env.eba-vjfwziew.ap-northeast-1.elasticbeanstalk.com/User/share/referAFriend`,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("jwtToken")}`,
          },
        }
      );
      //

      return fetchedData;
    } catch (err) {
      let error: any = err;

      return rejectWithValue(error);
    }
  }
);

export const referFriendAsyncThunk: any = createAsyncThunk(
  "recent/ referFriendAsyncThunk",
  async (arg: any, { rejectWithValue }: any) => {
    try {
      const fetchedData: any = await axios.get(
        `http://lorem-env.eba-vjfwziew.ap-northeast-1.elasticbeanstalk.com/User/refer`,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("jwtToken")}`,
          },
        }
      );
      //

      return fetchedData;
    } catch (err) {
      let error: any = err;

      return rejectWithValue(error);
    }
  }
);

export const verifyMobileNumberThunk: any = createAsyncThunk(
  "recent/ verifyMobileNumberThunk",
  async (arg: any, { rejectWithValue }: any) => {
    try {
      const fetchedData: any = await axios.put(
        `http://lorem-env.eba-vjfwziew.ap-northeast-1.elasticbeanstalk.com/User/verifyMobileNumber`,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("jwtToken")}`,
          },
          data: {
            mobileNo: arg,
          },
        }
      );
      //

      return fetchedData;
    } catch (err) {
      let error: any = err;
      console.log(error);

      return rejectWithValue(error);
    }
  }
);

export const getProfileSlice = createSlice({
  name: "getProfile",
  initialState,
  reducers: {
    storeNum: (state: any, action: any) => {
      state.num = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getProfileAsyncThunk.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getProfileAsyncThunk.fulfilled, (state, action) => {
      state.loading = false;
      state.getProfile = action.payload;
      state.isSuccess = true;
    });
    builder.addCase(getProfileAsyncThunk.rejected, (state, action) => {
      state.message = action;
      state.loading = false;
      state.isSuccess = false;
    });

    //add address
    builder.addCase(addAddressAsyncThunk.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(addAddressAsyncThunk.fulfilled, (state, action) => {
      state.loading = false;
      state.addAddress = action.payload;
      state.isSuccess = true;
    });
    builder.addCase(addAddressAsyncThunk.rejected, (state, action) => {
      state.message = action;
      state.loading = false;
      state.isSuccess = false;
    });
    // edit address

    builder.addCase(editAddressAsyncThunk.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(editAddressAsyncThunk.fulfilled, (state, action) => {
      state.loading = false;
      state.editAddress = action.payload;
      state.isSuccess = true;
    });
    builder.addCase(editAddressAsyncThunk.rejected, (state, action) => {
      state.message = action;
      state.loading = false;
      state.isSuccess = false;
    });

    //editprofiiiiiiiiiiiiilebuilder
    builder.addCase(editProfileAsyncThunk.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(editProfileAsyncThunk.fulfilled, (state, action) => {
      state.loading = false;
      state.editProfile = action.payload;
      state.isSuccess = true;
    });
    builder.addCase(editProfileAsyncThunk.rejected, (state, action) => {
      state.message = action;
      state.loading = false;
      state.isSuccess = false;
    });

    //get address
    builder.addCase(getAddressAsyncThunk.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getAddressAsyncThunk.fulfilled, (state, action) => {
      state.loading = false;
      state.getAddress = action.payload;
      state.isSuccess = true;
    });
    builder.addCase(getAddressAsyncThunk.rejected, (state, action) => {
      state.message = action;
      state.loading = false;
      state.isSuccess = false;
    });

    //primary address

    builder.addCase(setPrimaryAddressAsyncThunk.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(setPrimaryAddressAsyncThunk.fulfilled, (state, action) => {
      state.loading = false;
      state.addPrimary = action.payload;
      state.isSuccess = true;
    });
    builder.addCase(setPrimaryAddressAsyncThunk.rejected, (state, action) => {
      state.message = action;
      state.loading = false;
      state.isSuccess = false;
    });

    //delete address
    builder.addCase(deleteAddressAsyncThunk.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(deleteAddressAsyncThunk.fulfilled, (state, action) => {
      state.loading = false;
      state.deleteAddress = action.payload;
      state.isSuccess = true;
    });
    builder.addCase(deleteAddressAsyncThunk.rejected, (state, action) => {
      state.message = action;
      state.loading = false;
      state.isSuccess = false;
    });

    //refer friend
    builder.addCase(referFriendAsyncThunk.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(referFriendAsyncThunk.fulfilled, (state, action) => {
      state.loading = false;
      state.referFriend = action.payload;
      state.isSuccess = true;
    });
    builder.addCase(referFriendAsyncThunk.rejected, (state, action) => {
      state.message = action;
      state.loading = false;
      state.isSuccess = false;
    });

    //set primaryCard
    builder.addCase(setPrimaryCardAsyncThunk.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(setPrimaryCardAsyncThunk.fulfilled, (state, action) => {
      state.loading = false;
      state.setPrimaryCard = action.payload;
      state.isSuccess = true;
    });
    builder.addCase(setPrimaryCardAsyncThunk.rejected, (state, action) => {
      state.message = action;
      state.loading = false;
      state.isSuccess = false;
    });
    //add card
    builder.addCase(addCardAsyncThunk.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(addCardAsyncThunk.fulfilled, (state, action) => {
      state.loading = false;
      state.addCard = action.payload;
      state.isSuccess = true;
    });
    builder.addCase(addCardAsyncThunk.rejected, (state, action) => {
      state.message = action;
      state.loading = false;
      state.isSuccess = false;
    });

    //verify mobile

    builder.addCase(verifyMobileNumberThunk.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(verifyMobileNumberThunk.fulfilled, (state, action) => {
      state.loading = false;
      state.veriMob = action.payload;
      state.isSuccess = true;
    });
    builder.addCase(verifyMobileNumberThunk.rejected, (state, action) => {
      state.message = action;
      state.loading = false;
      state.isSuccess = false;
    });

    //delete cards
    builder.addCase(deleteCardAsyncThunk.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(deleteCardAsyncThunk.fulfilled, (state, action) => {
      state.loading = false;
      state.deleteCard = action.payload;
      state.isSuccess = true;
    });
    builder.addCase(deleteCardAsyncThunk.rejected, (state, action) => {
      state.message = action;
      state.loading = false;
      state.isSuccess = false;
    });

    //get cards
    builder.addCase(getCardsAsyncThunk.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getCardsAsyncThunk.fulfilled, (state, action) => {
      state.loading = false;
      state.getCards = action.payload;
      state.isSuccess = true;
    });
    builder.addCase(getCardsAsyncThunk.rejected, (state, action) => {
      state.message = action;
      state.loading = false;
      state.isSuccess = false;
    });
    // share refer friend
    builder.addCase(shareReferFriendAsyncThunk.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(shareReferFriendAsyncThunk.fulfilled, (state, action) => {
      state.loading = false;
      state.shareReferFriend = action.payload;
      state.isSuccess = true;
    });
    builder.addCase(shareReferFriendAsyncThunk.rejected, (state, action) => {
      state.message = action;
      state.loading = false;
      state.isSuccess = false;
    });

    //like a review
    builder.addCase(likeReviewAsyncThunk.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(likeReviewAsyncThunk.fulfilled, (state, action) => {
      state.loading = false;
      state.likeReview = action.payload;
      state.isSuccess = true;
    });
    builder.addCase(likeReviewAsyncThunk.rejected, (state, action) => {
      state.message = action;
      state.loading = false;
      state.isSuccess = false;
    });

    //getmyreview
    builder.addCase(getMyReviewAsyncThunk.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getMyReviewAsyncThunk.fulfilled, (state, action) => {
      state.loading = false;
      state.getMyReview = action.payload;
      state.isSuccess = true;
    });
    builder.addCase(getMyReviewAsyncThunk.rejected, (state, action) => {
      state.message = action;
      state.loading = false;
      state.isSuccess = false;
    });

    //getmygallery
    builder.addCase(getMyGalleryAsyncThunk.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getMyGalleryAsyncThunk.fulfilled, (state, action) => {
      state.loading = false;
      state.getMyGallery = action.payload;
      state.isSuccess = true;
    });
    builder.addCase(getMyGalleryAsyncThunk.rejected, (state, action) => {
      state.message = action;
      state.loading = false;
      state.isSuccess = false;
    });
  },
});

export const { storeNum } = getProfileSlice.actions;

export default getProfileSlice;
