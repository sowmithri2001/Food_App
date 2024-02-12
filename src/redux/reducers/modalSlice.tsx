
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface CounterState {
    value: boolean;
}

const initialState: CounterState = {
    value: false,
};

export const modalSlice = createSlice({
    name: "modalStatus",
    initialState,
    reducers: {
        showModal: (state: any) => {
            state.value = true;
        },
        closeModal: (state: any) => {
            state.value = false;
        },
    },
});

export const { showModal, closeModal } = modalSlice.actions;

export default modalSlice;