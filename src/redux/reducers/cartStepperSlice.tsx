import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface CounterState {
    value: any;
}

const initialState: CounterState = {
    value: 25,
};

export const cartStepper = createSlice({
    name: "cartStepper",
    initialState,
    reducers: {
        stepperValue: (state: any, action: any) => {
            state.value = action.payload;
        },
    },
});

export const { stepperValue } =
    cartStepper.actions;

export default cartStepper;