// /store/applicationSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Application } from "../_types/Application";

type ApplicationState = {
  item: any;
};

const initialState: ApplicationState = {
  item: {},
};

const applicationSlice = createSlice({
  name: "application",
  initialState,
  reducers: {
    setApplication: (state, action: PayloadAction<Application>) => {
      state.item = action.payload;
    },
  },
});

export const { setApplication } = applicationSlice.actions;
export default applicationSlice.reducer;