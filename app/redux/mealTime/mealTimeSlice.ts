import { createSlice, PayloadAction } from "@reduxjs/toolkit";

/**
 * Represents the state of the meal time.
 */
interface MealTimeState {
  mealTime: string;
}

/**
 * Represents the initial state of the meal time.
 */
const initialState: MealTimeState = {
  mealTime: "",
};

/**
 * Represents the meal time slice.
 */
const mealTimeSlice = createSlice({
  name: "mealTime",
  initialState,
  reducers: {
    /**
     * Sets the meal time.
     * @param state - The current state.
     * @param action - The payload action containing the new meal time.
     */
    setMealTime: (state, action: PayloadAction<string>) => {
      state.mealTime = action.payload;
    },
  },
});

export const { setMealTime } = mealTimeSlice.actions;

export default mealTimeSlice.reducer;
