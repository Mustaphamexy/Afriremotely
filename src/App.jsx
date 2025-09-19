import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import JobsPage from './pages/JobsPage';
import SignUp from "./pages/SignUp"
import Login from "./pages/Login"
import About from "./pages/About"
import Contact from "./pages/ContactPage"
import JobDetail from './pages/JobDetail';
import { JobProvider } from './context/JobContext';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './routes/ProtectedRoute';
import NotFound from './pages/NotFound';



function App() {
  return (
    <AuthProvider>
    <JobProvider>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/jobs' element={<JobsPage />} />
        <Route path='/sign-up' element={<SignUp />} />
        <Route path='/sign-in' element={<Login />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path="/job/:id" element={<JobDetail />} />
        <Route path='/dashboard' element={<ProtectedRoute />} />
        <Route path='*' element= {<NotFound />} />
      </Routes>
      </BrowserRouter>
    </JobProvider>
    </AuthProvider>
    
    
  )
}

export default App;