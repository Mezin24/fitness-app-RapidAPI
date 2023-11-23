import { Box, Stack, Typography, Pagination } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks';
import { ExerciseCard } from './ExerciseCard';
import { useCallback, useState, ChangeEvent, useEffect } from 'react';
import {
  fetchExercises,
  fetchExercisesByBodypart,
} from '../store/exercise/exersiceSlice';

const EXERCISES_PER_PAGE = 9;

export const Exercises = () => {
  const { exercises, bodyPart } = useAppSelector((state) => state.exercise);
  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useAppDispatch();

  const paginate = useCallback((e: ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
    window.scrollTo({ top: 1500, behavior: 'smooth' });
  }, []);

  const indexOfLastExercise = currentPage * EXERCISES_PER_PAGE;
  const indexOfFirstExercise = indexOfLastExercise - EXERCISES_PER_PAGE;
  const currentExercises = [...exercises].slice(
    indexOfFirstExercise,
    indexOfLastExercise
  );

  useEffect(() => {
    if (bodyPart === 'all') {
      dispatch(fetchExercises());
    } else {
      dispatch(fetchExercisesByBodypart());
    }
  }, [bodyPart, dispatch]);

  return (
    <Box id='exercises' sx={{ mt: { lg: '110px' } }} mt='50px' p='20px'>
      <Typography variant='h3' mb='46px'>
        Showing Results
      </Typography>
      <Stack
        direction='row'
        sx={{ gap: { lg: '110px', xs: '50px' } }}
        flexWrap='wrap'
        justifyContent='center'
      >
        {currentExercises.map((exercise, index) => (
          <ExerciseCard exercise={exercise} key={index} />
        ))}
      </Stack>
      <Stack mt='100px' alignItems='center'>
        {exercises.length > EXERCISES_PER_PAGE && (
          <Pagination
            count={Math.ceil(exercises.length / EXERCISES_PER_PAGE)}
            variant='outlined'
            shape='rounded'
            defaultPage={1}
            page={currentPage}
            onChange={paginate}
            size='large'
          />
        )}
      </Stack>
    </Box>
  );
};
