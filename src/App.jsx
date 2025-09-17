import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/landingPage';
import JobsPage from './pages/JobsPage';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<LandingPage />} />
      <Route path='/jobs' element={<JobsPage />} />
    </Routes>
    </BrowserRouter>
  )
}

export default App;