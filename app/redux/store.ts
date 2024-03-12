import { configureStore } from '@reduxjs/toolkit';
import mealTimeReducer from './mealTime/mealTimeSlice';
import countryFlagReducer from './countryFlag/countryFlagSlice';
import restrictionReducer from './restriction/restrictionSlice';
import prepTimeReducer from './prepTime/prepTimeSlice';
import healthinessReducer from './healthiness/healthinessSlice';

export const store = configureStore({
    reducer: {
        mealTimeSelector: mealTimeReducer,
        countryFlagSelector: countryFlagReducer,
        restrictionSelector: restrictionReducer,
        prepTimeSelector: prepTimeReducer,
        healthinessSelector: healthinessReducer,
    },
    });

    export type RootState = ReturnType<typeof store.getState>;
    export type AppDispatch = typeof store.dispatch;