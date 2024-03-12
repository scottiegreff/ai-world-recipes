import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface RestrictionState {
  restriction: string;
}

const initialState: RestrictionState = {
  restriction: "",
};

const restrictionSlice = createSlice({
  name: "restriction",
  initialState,
  reducers: {
    setRestriction: (state, action: PayloadAction<string>) => {
      state.restriction = action.payload;
    },
  },
});

export const { setRestriction } = restrictionSlice.actions;

export default restrictionSlice.reducer;
