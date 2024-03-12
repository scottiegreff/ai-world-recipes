import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PrepTimeState {
  prepTime: string;
}

const initialState: PrepTimeState = {
  prepTime: "",
};

const prepTimeSlice = createSlice({
  name: "prepTime",
  initialState,
  reducers: {
    setPrepTime: (state, action: PayloadAction<string>) => {
      state.prepTime = action.payload;
    },
  },
});

export const { setPrepTime } = prepTimeSlice.actions;

export default prepTimeSlice.reducer;
