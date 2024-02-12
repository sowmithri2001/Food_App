import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    placeValue: {},
}

export const placeValueSlice = createSlice({
    name: "placeValue",
    initialState,
    reducers: {
        storePlaceValue: (state: any, action: any) => {
            state.placeValue = action.payload;
        },
    },
});

export const { storePlaceValue } = placeValueSlice.actions;

export default placeValueSlice;
