import { configureStore } from '@reduxjs/toolkit';
import { StateSchema } from './StateSchema';
import { exerciseReducer } from './exercise/exersiceSlice';

export const store = configureStore<StateSchema>({
  reducer: {
    exercise: exerciseReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
