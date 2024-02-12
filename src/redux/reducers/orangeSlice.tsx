import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface CounterState {
    orangem: any,
    orangeo: any,
    orangeg: any,
    oranger: any,

    orangeop: any,
    orangeap: any,
    orangepp: any,
    orangerp: any,
    orangegp: any,

}

const initialState: CounterState = {
    orangem: true,
    orangeo: false,
    orangeg: false,
    oranger: false,

    orangeop: true,
    orangeap: false,
    orangepp: false,
    orangerp: false,
    orangegp: false,
};

export const orangeSlice = createSlice({
    name: "orangeStatus",
    initialState,
    reducers: {
        setMenu: (state: any) => {
            state.orangem = true;
            state.orangeo = false;
            state.orangeg = false;
            state.oranger = false;
        },
        setOverview: (state: any) => {
            state.orangem = false;
            state.orangeo = true;
            state.orangeg = false;
            state.oranger = false;
        },
        setRatings: (state: any) => {
            state.orangem = false;
            state.orangeo = false;
            state.orangeg = false;
            state.oranger = true;
        },
        setGallery: (state: any) => {
            state.orangem = false;
            state.orangeo = false;
            state.orangeg = true;
            state.oranger = false;
        },
        setOrders: (state: any) => {
            state.orangeop = true;
            state.orangeap = false;
            state.orangepp = false;
            state.orangerp = false;
            state.orangegp = false;
        },
        setAddress: (state: any) => {
            state.orangeop = false;
            state.orangeap = true;
            state.orangepp = false;
            state.orangerp = false;
            state.orangegp = false;
        },

        setPayment: (state: any) => {
            state.orangeop = false;
            state.orangeap = false;
            state.orangepp = true;
            state.orangerp = false;
            state.orangegp = false;
        },

        setReviews: (state: any) => {
            state.orangeop = false;
            state.orangeap = false;
            state.orangepp = false;
            state.orangerp = true;
            state.orangegp = false;
        },

        setProfileGallery: (state: any) => {
            state.orangeop = false;
            state.orangeap = false;
            state.orangepp = false;
            state.orangerp = false;
            state.orangegp = true;
        },

    },
});

export const { setMenu, setOverview, setRatings, setGallery, setOrders, setAddress, setPayment, setReviews, setProfileGallery } =
    orangeSlice.actions;

export default orangeSlice;
