import { createSlice, PayloadAction } from "@reduxjs/toolkit";

/**
 * Represents the state of the country flag.
 */
interface CountryFlagState {
  countryFlag: string;
}

/**
 * Represents the initial state of the country flag.
 */
const initialState: CountryFlagState = {
  countryFlag: "",
};

/**
 * Represents the country flag slice.
 */
const countryFlagSlice = createSlice({
  name: "countryFlag",
  initialState,
  reducers: {
    /**
     * Sets the country flag.
     * @param state - The current state.
     * @param action - The payload action containing the new country flag.
     */
    setCountryFlag: (state, action: PayloadAction<string>) => {
      state.countryFlag = action.payload;
    },
  },
});

export const { setCountryFlag } = countryFlagSlice.actions;

export default countryFlagSlice.reducer;
