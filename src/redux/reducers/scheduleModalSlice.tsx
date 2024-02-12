import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface CounterState {
  value: boolean;
}

const initialState: CounterState = {
  value: false,
};

export const scheduleModalSlice = createSlice({
  name: "scheduleModalStatus",
  initialState,
  reducers: {
    showScheduleModal: (state: any) => {
      state.value = true;
    },
    closeScheduleModal: (state: any) => {
      state.value = false;
    },
  },
});

export const { showScheduleModal, closeScheduleModal } =
  scheduleModalSlice.actions;

export default scheduleModalSlice;
