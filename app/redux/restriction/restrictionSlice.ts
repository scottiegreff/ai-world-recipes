import { createSlice, PayloadAction } from "@reduxjs/toolkit";

/**
 * Represents the state of the restriction slice.
 */
interface RestrictionState {
  restriction: string;
}

/**
 * Represents the initial state of the restriction slice.
 */
const initialState: RestrictionState = {
  restriction: "",
};

/**
 * Creates a slice for managing the restriction state.
 */
const restrictionSlice = createSlice({
  name: "restriction",
  initialState,
  reducers: {
    /**
     * Sets the restriction value in the state.
     * @param state - The current state.
     * @param action - The payload action containing the new restriction value.
     */
    setRestriction: (state, action: PayloadAction<string>) => {
      state.restriction = action.payload;
    },
  },
});

export const { setRestriction } = restrictionSlice.actions;

export default restrictionSlice.reducer;
