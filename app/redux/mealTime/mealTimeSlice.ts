import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface MealTimeState {
  mealTime: string;
}

const initialState: MealTimeState = {
  mealTime: "",
};

const mealTimeSlice = createSlice({
  name: "mealTime",
  initialState,
  reducers: {
    setMealTime: (state, action: PayloadAction<string>) => {
      state.mealTime = action.payload;
    },
  },
});

export const { setMealTime } = mealTimeSlice.actions;

export default mealTimeSlice.reducer;
