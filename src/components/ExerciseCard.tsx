import { Link } from 'react-router-dom';
import { Exercise } from '../types';
import { Button, Stack, Typography } from '@mui/material';

interface ExerciseCardProps {
  exercise: Exercise;
}

export const ExerciseCard = ({ exercise }: ExerciseCardProps) => {
  return (
    <Link to={`/exercise/${exercise.id}`} className='exercise-card'>
      <img src={exercise.gifUrl} alt={exercise.name} loading='lazy' />
      <Stack direction='row'>
        <Button
          sx={{
            ml: '21px',
            color: '#fff',
            backgroundColor: '#ffa9a9',
            fontSize: '14px',
            borderRadius: '20px',
            textTransform: 'capitalize',
          }}
        >
          {exercise.bodyPart}
        </Button>
        <Button
          sx={{
            ml: '21px',
            color: '#fff',
            backgroundColor: '#fcc757',
            fontSize: '14px',
            borderRadius: '20px',
            textTransform: 'capitalize',
          }}
        >
          {exercise.target}
        </Button>
      </Stack>
      <Typography
        ml='21px'
        color='#000'
        fontWeight='bold'
        mt='11px'
        pb='10px'
        textTransform='capitalize'
        fontSize='24px'
      >
        {exercise.name}
      </Typography>
    </Link>
  );
};
