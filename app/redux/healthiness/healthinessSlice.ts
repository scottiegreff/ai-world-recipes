import { createSlice, PayloadAction } from "@reduxjs/toolkit";

/**
 * Represents the state of the healthiness feature in the Redux store.
 */
interface healthinessState {
  healthiness: string;
}

/**
 * Represents the initial state of the healthiness feature.
 */
const initialState: healthinessState = {
  healthiness: "",
};

/**
 * Represents the healthiness slice of the Redux store.
 */
const healthinessSlice = createSlice({
  name: "healthiness",
  initialState,
  reducers: {
    /**
     * Sets the healthiness value in the state.
     * @param state - The current healthiness state.
     * @param action - The payload action containing the new healthiness value.
     */
    setHealthiness: (state, action: PayloadAction<string>) => {
      state.healthiness = action.payload;
    },
  },
});

export const { setHealthiness } = healthinessSlice.actions;

export default healthinessSlice.reducer;
