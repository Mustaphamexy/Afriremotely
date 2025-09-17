import React from 'react'
import Button from '../UI/Button'
import { useNavigate } from 'react-router-dom'

const Header = () => {

  const navigate = useNavigate();

  return (
    <header className='absolute top-0 left-0 right-0 z-10 backdrop-blur-sm bg-black/30 px-4'>
      <div className='container mx-auto py-4'>
        {/* logo */}
        <div className='flex items-center justify-between h-16 md:h-20'>

          <div className='flex items-center space-x-2'>
            <h1 onClick={() => navigate('/')} className='text-white text-3xl lg:text-4xl font-bold cursor-pointer'>Afri<span className='text-primary'>Remotely</span></h1>
          </div>

          {/* nav */}
          <div>
            <nav className='hidden md:flex items-center space-x-8'>
              <a onClick={() => navigate('/')} className="text-white hover:text-primary-400 transition-colors cursor-pointer">Home</a>
              <a onClick={() => navigate('/jobs')} className="text-neutral-300 hover:text-primary-400 transition-colors cursor-pointer">Jobs</a>
              <a onClick={() => navigate('/about')} className="text-neutral-300 hover:text-primary-400 transition-colors cursor-pointer">About Us</a>
              <a onClick={() => navigate('/contact')} className="text-neutral-300 hover:text-primary-400 transition-colors cursor-pointer">Contact Us</a>
            </nav>
          </div>

          <div className='flex items-center space-x-4'>
            <Button onClick={() => navigate('/sign-in')} variant="outline" size="md">Sign In</Button>
            <Button onClick={() => navigate('/sign-up')} variant="primary" size="md" className='hidden sm:block'>Sign Up</Button>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header