import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CountryFlagState {
  countryFlag: string;
}

const initialState: CountryFlagState = {
  countryFlag: "",
};

const countryFlagSlice = createSlice({
  name: "countryFlag",
  initialState,
  reducers: {
    setCountryFlag: (state, action: PayloadAction<string>) => {
      state.countryFlag = action.payload;
    },
  },
});

export const { setCountryFlag } = countryFlagSlice.actions;

export default countryFlagSlice.reducer;
