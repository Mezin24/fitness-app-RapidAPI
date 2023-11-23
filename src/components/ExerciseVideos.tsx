import { Box, Typography, Stack } from '@mui/material';
import { Video } from '../types';

interface ExerciseVideosProps {
  exerciseVideo: Video[];
  name: string;
}

export const ExerciseVideos = ({
  exerciseVideo,
  name,
}: ExerciseVideosProps) => {
  console.log(exerciseVideo);
  if (!exerciseVideo.length) return null;

  return (
    <Box sx={{ marginTop: { lg: '200px', xs: '20px' } }} p='20px'>
      <Typography variant='h4' mb='33px'>
        Watch{' '}
        <span style={{ color: '#ff2625', textTransform: 'capitalize' }}>
          {name}
        </span>{' '}
        exercise videos
      </Typography>
      <Stack
        justifyContent='flex-start'
        alignItems='center'
        flexWrap='wrap'
        sx={{
          flexDirection: { lg: 'row' },
          gap: { lg: '110px', xs: 0 },
        }}
      >
        {exerciseVideo?.slice(0, 3)?.map(({ video }, index) =>
          video ? (
            <a
              target='_blank'
              rel='noreferrer'
              href={`https://www.youtube.com/watch?v=${video.videoId}`}
              className='exercise-video'
              key={index}
            >
              <img src={video?.thumbnails[0].url} alt={video.title} />
              <Box>
                <Typography variant='h5' color='#000'>
                  {video.title}
                </Typography>
                <Typography variant='h5' color='#000'>
                  {video.channelName}
                </Typography>
              </Box>
            </a>
          ) : null
        )}
      </Stack>
    </Box>
  );
};
