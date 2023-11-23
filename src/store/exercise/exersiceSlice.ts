import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { Exercise } from '../../types';
import {
  BODY_PEARTS_URL,
  EXERCISES_OPTIONS,
  EXERCISES_URL,
  fetchData,
} from '../../utils/fetchData';
import { StateSchema } from '../StateSchema';

export interface ExerciseState {
  search: string;
  exercises: Exercise[];
  filteredExercises: Exercise[];
  bodyPart: string;
  bodyParts: string[];
}

const initialState: ExerciseState = {
  bodyPart: 'all',
  exercises: [],
  filteredExercises: [],
  search: '',
  bodyParts: ['all'],
};

export const fetchExercises = createAsyncThunk(
  'exercise/fetchExercises',
  async (_, { dispatch, getState }) => {
    const exercises: Exercise[] = await fetchData(
      EXERCISES_URL,
      EXERCISES_OPTIONS
    );

    const {
      exercise: { search },
    } = getState() as StateSchema;

    if (search) {
      const searchedExercises = exercises.filter(
        (exercise) =>
          exercise.name.toLowerCase().includes(search) ||
          exercise.bodyPart.toLowerCase().includes(search) ||
          exercise.equipment.toLowerCase().includes(search) ||
          exercise.target.toLowerCase().includes(search)
      );
      dispatch(exerciseActions.setSearch(''));
      return searchedExercises;
    }
    return exercises;
  }
);

export const fetchExercisesByBodypart = createAsyncThunk(
  'exercise/fetchExercisesByBodypart',
  async (_, { getState }) => {
    const {
      exercise: { bodyPart, search },
    } = getState() as StateSchema;
    const exercises: Exercise[] = await fetchData(
      `https://exercisedb.p.rapidapi.com/exercises/bodyPart/${bodyPart}?limit=100`,
      EXERCISES_OPTIONS
    );

    if (search) {
      const searchedExercises = exercises.filter(
        (exercise) =>
          exercise.name.toLowerCase().includes(search) ||
          exercise.bodyPart.toLowerCase().includes(search) ||
          exercise.equipment.toLowerCase().includes(search) ||
          exercise.target.toLowerCase().includes(search)
      );
      return searchedExercises;
    }
    return exercises;
  }
);

export const fetchBodyParts = createAsyncThunk(
  'exercise/fetchBodyParts',
  async () => {
    const bodyParts: string[] = await fetchData(
      BODY_PEARTS_URL,
      EXERCISES_OPTIONS
    );
    return bodyParts;
  }
);

export const ExerciseSlice = createSlice({
  name: 'exercise',
  initialState,
  reducers: {
    setBodyPart: (state, action: PayloadAction<string>) => {
      state.bodyPart = action.payload;
    },
    setSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchExercises.fulfilled, (state, action) => {
      state.exercises = action.payload;
    });
    builder.addCase(fetchBodyParts.fulfilled, (state, action) => {
      state.bodyParts = ['all', ...action.payload];
    });
    builder.addCase(fetchExercisesByBodypart.fulfilled, (state, action) => {
      state.exercises = action.payload;
    });
  },
});

export const { actions: exerciseActions } = ExerciseSlice;
export const { reducer: exerciseReducer } = ExerciseSlice;
