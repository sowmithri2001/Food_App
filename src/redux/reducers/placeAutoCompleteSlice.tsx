import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    placeValue: ""
}

const placeAutocompleteSlice = createSlice({
    initialState,
    name: "placeAuto",
    reducers: {
        setPlace: (state: any, action: any) => {
            console.log("action.payload", action.payload)
            state.placeValue = action.payload;
        }
    }

});

export const { setPlace } = placeAutocompleteSlice.actions;
export default placeAutocompleteSlice;