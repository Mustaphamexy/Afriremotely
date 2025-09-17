import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/landingPage';
import JobsPage from './pages/JobsPage';
import SignUp from "./pages/Signup"
import Login from "./pages/Login"
import About from "./pages/About"
import Contact from "./pages/ContactPage"

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<LandingPage />} />
      <Route path='/jobs' element={<JobsPage />} />
      <Route path='/sign-up' element={<SignUp />} />
      <Route path='/sign-in' element={<Login />} />
      <Route path='/about' element={<About />} />
      <Route path='/contact' element={<Contact />} />
    </Routes>
    </BrowserRouter>
  )
}

export default App;