import { Box } from '@mui/material';
import { Route, Routes } from 'react-router-dom';
import { Home, ExerciseDetail } from './pages';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';

const App = () => {
  return (
    <Box width={'400px'} sx={{ width: { xl: '1488px' } }} m='auto'>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/exercise/:id' element={<ExerciseDetail />} />
      </Routes>
      <Footer />
    </Box>
  );
};

export default App;
