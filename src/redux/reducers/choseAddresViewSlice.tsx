import { createSlice } from "@reduxjs/toolkit";

export interface CounterState {
    deliveryType: any;
    contactName: any;
    mobileNumber: any;
    deliveryInstruction: any;
};
const initialState: CounterState = {
    deliveryType: "",
    contactName: "",
    mobileNumber: "",
    deliveryInstruction: "",
};

const choseAddressViewSlice = createSlice({
    initialState,
    name: "addressPageDetails",
    reducers: {
        setdelivery: (state: any, action: any) => {
            state.deliveryType = action.payload;
        },
        setContactName: (state: any, action: any) => {
            state.contactName = action.payload;
        },
        setContactNo: (state: any, action: any) => {
            state.mobileNumber = action.payload;
        },
        setdeliveryInstruction: (state: any, action: any) => {
            state.deliveryInstruction = action.payload;
        },
    },
});

export const { setdelivery, setContactNo, setContactName, setdeliveryInstruction } = choseAddressViewSlice.actions;

export default choseAddressViewSlice;