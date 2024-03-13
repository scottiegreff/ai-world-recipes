import { configureStore } from '@reduxjs/toolkit';
import mealTimeReducer from './mealTime/mealTimeSlice';
import countryFlagReducer from './countryFlag/countryFlagSlice';
import restrictionReducer from './restriction/restrictionSlice';
import prepTimeReducer from './prepTime/prepTimeSlice';
import healthinessReducer from './healthiness/healthinessSlice';

/**
 * The Redux store configuration.
 */
export const store = configureStore({
    reducer: {
        mealTimeSelector: mealTimeReducer,
        countryFlagSelector: countryFlagReducer,
        restrictionSelector: restrictionReducer,
        prepTimeSelector: prepTimeReducer,
        healthinessSelector: healthinessReducer,
    },
});

/**
 * The root state type of the Redux store.
 */
export type RootState = ReturnType<typeof store.getState>;

/**
 * The type of the Redux store's dispatch function.
 */
export type AppDispatch = typeof store.dispatch;
