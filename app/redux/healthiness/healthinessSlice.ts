import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface healthinessState {
  healthiness: string;
}

const initialState: healthinessState = {
  healthiness: "",
};

const healthinessSlice = createSlice({
  name: "healthiness",
  initialState,
  reducers: {
    setHealthiness: (state, action: PayloadAction<string>) => {
      state.healthiness = action.payload;
    },
  },
});

export const { setHealthiness } = healthinessSlice.actions;

export default healthinessSlice.reducer;
