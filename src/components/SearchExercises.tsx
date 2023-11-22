import { useState, useCallback, useEffect } from 'react';
import { Box, Button, Stack, TextField, Typography } from '@mui/material';
import {
  BODY_PEARTS_URL,
  EXERCISES_OPTIONS,
  EXERCISES_URL,
  fetchData,
} from '../utils/fetchData';
import { Exercise } from '../types';
import { HorizontalScrollbar } from './HorizontalScrollbar';

export const SearchExercises = () => {
  const [search, setSearch] = useState('');
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [bodyParts, setBodyParts] = useState<string[]>([]);

  const handleSearch = useCallback(async () => {
    if (!search) return;
    const exerciseData: Exercise[] = await fetchData(
      EXERCISES_URL,
      EXERCISES_OPTIONS
    );

    const searchedExercises = exerciseData.filter(
      (exercise) =>
        exercise.name.toLowerCase().includes(search) ||
        exercise.bodyPart.toLowerCase().includes(search) ||
        exercise.equipment.toLowerCase().includes(search) ||
        exercise.target.toLowerCase().includes(search)
    );

    setSearch('');
    setExercises(searchedExercises);
  }, [search]);

  useEffect(() => {
    const fetchedExerciseData = async () => {
      const bodyParts: string[] = await fetchData(
        BODY_PEARTS_URL,
        EXERCISES_OPTIONS
      );
      if (!bodyParts) return;
      setBodyParts(['all', ...bodyParts]);
    };

    fetchedExerciseData();
  }, []);

  return (
    <Stack alignItems={'center'} justifyContent='center' mt='37px' p='20px'>
      <Typography
        fontWeight={700}
        sx={{
          fontSize: { lg: '44px', xs: '30px' },
        }}
        mb='50px'
        textAlign='center'
      >
        Awesome Exercises You <br /> Should Know
      </Typography>
      <Box position='relative' mb='72px'>
        <TextField
          value={search}
          onChange={(e) => setSearch(e.target.value.toLocaleLowerCase())}
          placeholder='Search Exercises'
          type='text'
          sx={{
            input: { fontWeight: 700, border: 'none', borderRadius: '4px' },
            width: {
              lg: '800px',
              xs: '350px',
            },
            backgroundColor: '#fff',
            borderRadius: '40px',
          }}
        />
        <Button
          onClick={handleSearch}
          className='search-btn'
          sx={{
            bgcolor: '#ff2625',
            color: '#fff',
            textTransform: 'none',
            width: { lg: '175px', xs: '80px' },
            fontSize: { lg: '20px', xs: '14px' },
            height: '56px',
            position: 'absolute',
            right: 0,
          }}
        >
          Search
        </Button>
      </Box>
      <Box sx={{ position: 'relative', width: '100%', p: '20px' }}>
        <HorizontalScrollbar data={bodyParts} />
      </Box>
    </Stack>
  );
};
