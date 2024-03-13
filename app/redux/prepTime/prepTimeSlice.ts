import { createSlice, PayloadAction } from "@reduxjs/toolkit";

/**
 * Represents the state of the prep time feature in the Redux store.
 */
interface PrepTimeState {
  prepTime: string;
}

/**
 * Represents the initial state of the prep time feature.
 */
const initialState: PrepTimeState = {
  prepTime: "",
};

/**
 * Represents the prep time slice of the Redux store.
 */
const prepTimeSlice = createSlice({
  name: "prepTime",
  initialState,
  reducers: {
    /**
     * Sets the prep time value in the state.
     * @param state - The current state.
     * @param action - The payload action containing the new prep time value.
     */
    setPrepTime: (state, action: PayloadAction<string>) => {
      state.prepTime = action.payload;
    },
  },
});

export const { setPrepTime } = prepTimeSlice.actions;

export default prepTimeSlice.reducer;
