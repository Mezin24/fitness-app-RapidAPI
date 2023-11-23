import { Box, CircularProgress, Stack } from '@mui/material';
import { useParams } from 'react-router-dom';
import { Detail } from '../components/Detail';
import { ExerciseVideos } from '../components/ExerciseVideos';
import { SimilarExercises } from '../components/SimilarExercises';
import { Exercise, Video } from '../types';
import { useEffect, useState } from 'react';
import {
  EXERCISES_OPTIONS,
  VIDEO_OPTIONS,
  fetchData,
} from '../utils/fetchData';

export const ExerciseDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [exerciseDetails, setExerciseDetails] = useState<Exercise | null>(null);
  const [exerciseVideo, setExerciseVideo] = useState<Video[]>([]);

  useEffect(() => {
    const fetchExerciseDetails = async () => {
      const exercise: Exercise = await fetchData(
        `https://exercisedb.p.rapidapi.com/exercises/exercise/${id}`,
        EXERCISES_OPTIONS
      );
      setExerciseDetails(exercise);
      const { contents: exerciseVideoData }: { contents: Video[] } =
        await fetchData(
          `https://youtube-search-and-download.p.rapidapi.com/search?query=${exercise?.name}`,
          VIDEO_OPTIONS
        );
      setExerciseVideo(exerciseVideoData);
    };

    fetchExerciseDetails();
  }, [exerciseDetails?.name, id]);

  if (!exerciseDetails || !exerciseDetails) {
    return (
      <Stack mt='130px' justifyContent='center' direction='row'>
        <CircularProgress color='secondary' />
      </Stack>
    );
  }

  return (
    <Box>
      <Detail exerciseDetails={exerciseDetails} />
      <ExerciseVideos
        exerciseVideo={exerciseVideo}
        name={exerciseDetails.name}
      />
      <SimilarExercises />
    </Box>
  );
};
