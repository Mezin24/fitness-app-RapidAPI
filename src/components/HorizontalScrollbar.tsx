import { Box, Stack } from '@mui/material';
import { useAppSelector, useAppDispatch } from '../hooks/reduxHooks';
import { exerciseActions } from '../store/exercise/exersiceSlice';

interface HorizontalScrollbarProps {
  data: string[];
}

export const HorizontalScrollbar = ({ data }: HorizontalScrollbarProps) => {
  const { bodyPart } = useAppSelector((state) => state.exercise);
  const dispatch = useAppDispatch();

  return (
    <Stack direction={'row'} flexWrap='wrap' gap='16px'>
      {data.map((item) => (
        <Box
          key={item}
          onClick={() => {
            dispatch(exerciseActions.setBodyPart(item));
            window.scrollTo({ top: 1500, left: 100, behavior: 'smooth' });
          }}
          p='10px 22px'
          sx={
            bodyPart === item
              ? {
                  backgroundColor: '#ff2625',
                  color: 'white',
                  fontSize: '20px',
                  textTransform: 'uppercase',
                  fontWeight: 600,
                  fontFamily: 'Roboto, sans-serif',
                  cursor: 'pointer',
                  borderRadius: '7px',
                }
              : {
                  backgroundColor: 'rgba(255, 38, 37, 0.1)',
                  fontSize: '20px',
                  textTransform: 'uppercase',
                  fontWeight: 600,
                  fontFamily: 'Roboto, sans-serif',
                  color: '#444',
                  cursor: 'pointer',
                  borderRadius: '7px',
                  ':hover': {
                    backgroundColor: '#ff2625',
                    color: 'white',
                  },
                }
          }
        >
          {item}
        </Box>
      ))}
    </Stack>
  );
};
