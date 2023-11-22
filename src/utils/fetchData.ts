export const EXERCISES_URL =
  'https://exercisedb.p.rapidapi.com/exercises?limit=1000';

export const BODY_PEARTS_URL =
  'https://exercisedb.p.rapidapi.com/exercises/bodyPartList';

export const EXERCISES_OPTIONS = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': import.meta.env.VITE_RAPID_API_KEY,
    'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com',
  },
};

export const fetchData = async (url: string, options: RequestInit) => {
  const response = await fetch(url, options);
  return response.json();
};
