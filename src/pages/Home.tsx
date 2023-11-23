import { Box } from '@mui/material';
import { HeroBanner } from '../components/HeroBanner';
import { Exercises } from '../components/Exercises';
import { SearchExercises } from '../components/SearchExercises';
import { useEffect } from 'react';
import { useAppDispatch } from '../hooks/reduxHooks';
import { fetchBodyParts } from '../store/exercise/exersiceSlice';

export const Home = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchBodyParts());
  }, [dispatch]);

  return (
    <Box>
      <HeroBanner />
      <SearchExercises />
      <Exercises />
    </Box>
  );
};
