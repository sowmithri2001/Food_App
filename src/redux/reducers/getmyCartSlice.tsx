import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
    message: "",
    getMyOrderDetails: [],
    getMyCart: [],
    isSuccess: false,
    loading: false,
    orderStatus: [],
    orderCancel: []
};

export const getMyOrderDetailsAsyncThunk: any = createAsyncThunk(
    "recent/ getMyOrderDetailsAsyncThunk",
    async (arg: any, { rejectWithValue }: any) => {

        try {
            const fetchedData: any = await axios.get(
                `http://lorem-env.eba-vjfwziew.ap-northeast-1.elasticbeanstalk.com/User/Orders?pageNumber=1&limit=10&orderStatus=${arg}`,
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

export const getMyOrderDetailsCartAsyncThunk: any = createAsyncThunk(
    "recent/ getMyOrderDetailsCartAsyncThunk",
    async (arg: any, { rejectWithValue }: any) => {

        try {
            const fetchedData: any = await axios({
                method: "post",
                url: `http://lorem-env.eba-vjfwziew.ap-northeast-1.elasticbeanstalk.com/User/getOrderDetails`,

                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem("jwtToken")}`,
                    Accept: "application/json, text/plain, */*",
                    "Content-Type": "application/json",
                },
                data: {
                    "orderId": arg,
                },
            });
            return fetchedData;
        } catch (err) {
            let error: any = err;
            return rejectWithValue(error);
        }
    }
);

//orderStatus

export const getMyOrderStatusAsyncThunk: any = createAsyncThunk(
    "recent/ getMyOrderStatusAsyncThunk",
    async (arg: any, { rejectWithValue }: any) => {

        try {
            const fetchedData: any = await axios({
                method: "get",
                url: `http://lorem-env.eba-vjfwziew.ap-northeast-1.elasticbeanstalk.com/User/OrderStatus?orderId=${arg}`,

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
// cancel order 

export const cancelOrderAsyncThunk: any = createAsyncThunk(
    "recent/ cancelOrderAsyncThunk",
    async (arg: any, { rejectWithValue }: any) => {

        try {
            const fetchedData: any = await axios({
                method: "put",
                url: `http://lorem-env.eba-vjfwziew.ap-northeast-1.elasticbeanstalk.com/User/cancelOrder`,

                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem("jwtToken")}`,
                    Accept: "application/json, text/plain, */*",
                    "Content-Type": "application/json",
                },
                data: {
                    "orderId": arg,
                },
            });

            return fetchedData;
        } catch (err) {
            let error: any = err;
            console.log(error);
            return rejectWithValue(error);
        }
    }
);


export const getMyOrderSlice = createSlice({
    name: "getMyOrder",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getMyOrderDetailsAsyncThunk.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(getMyOrderDetailsAsyncThunk.fulfilled, (state, action) => {
            state.loading = false;
            state.getMyOrderDetails = action.payload;
            state.isSuccess = true;
        });
        builder.addCase(getMyOrderDetailsAsyncThunk.rejected, (state, action) => {
            state.message = action;
            state.loading = false;
            state.isSuccess = false;
        });
        builder.addCase(getMyOrderDetailsCartAsyncThunk.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(getMyOrderDetailsCartAsyncThunk.fulfilled, (state, action) => {
            state.loading = false;
            state.getMyCart = action.payload;
            state.isSuccess = true;
        });
        builder.addCase(getMyOrderDetailsCartAsyncThunk.rejected, (state, action) => {
            state.message = action;
            state.loading = false;
            state.isSuccess = false;
        });

        builder.addCase(getMyOrderStatusAsyncThunk.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(getMyOrderStatusAsyncThunk.fulfilled, (state, action) => {
            state.loading = false;
            state.orderStatus = action.payload;
            state.isSuccess = true;
        });
        builder.addCase(getMyOrderStatusAsyncThunk.rejected, (state, action) => {
            state.message = action;
            state.loading = false;
            state.isSuccess = false;
        });

        builder.addCase(cancelOrderAsyncThunk.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(cancelOrderAsyncThunk.fulfilled, (state, action) => {
            state.loading = false;
            state.orderCancel = action.payload;
            state.isSuccess = true;
        });
        builder.addCase(cancelOrderAsyncThunk.rejected, (state, action) => {
            state.message = action;
            state.loading = false;
            state.isSuccess = false;
        });

    }
});

export const { } = getMyOrderSlice.actions;

export default getMyOrderSlice;