import React, { useState, useEffect, useRef } from 'react'
import Button from '../UI/Button'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { MdDashboard, MdOutlineNotificationsActive } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { IoMdSettings } from "react-icons/io";
import { RiLogoutCircleLine } from "react-icons/ri";




const Header = ({bgClass = "bg-black/30"}) => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsProfileDropdownOpen(false);
      }
    };

    if (isProfileDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isProfileDropdownOpen]);

  return (
    <header className={`absolute top-0 left-0 right-0 z-10 backdrop-blur-sm ${bgClass} px-4`}>
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
            {/* Conditional rendering based on user authentication */}
            {user ? (
              // User Profile Dropdown
              <div className="relative" ref={dropdownRef}>
                <button 
                  onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                  className="flex items-center space-x-2 focus:outline-none text-white hover:text-primary-400 transition-colors"
                >
                  <img className="h-10 w-10 rounded-full border-2 border-white/20" src={user.avatar} alt={user.name} />
                  <span className="hidden sm:block">{user.name.split(' ')[0]}</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                  </svg>
                </button>
                
                {isProfileDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-20 border border-gray-200">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="text-sm font-medium text-gray-900">{user.name}</p>
                      <p className="text-xs text-gray-500">{user.email}</p>
                    </div>
                    <div className='flex items-center ml-4 hover:bg-teal-50  cursor-pointer' onClick={() => {navigate('/dashboard'); setIsProfileDropdownOpen(false);}}>
                      <MdDashboard className='w-4 h-4 text-primary'/>
                      <a className="block px-2 py-2 text-sm text-gray-700 hover:text-teal-600 ">Dashboard</a>
                    </div>
                    <div className='flex items-center ml-4 hover:bg-teal-50  cursor-pointer' onClick={() => {navigate('/profile'); setIsProfileDropdownOpen(false);}}>
                      <CgProfile  className='w-4 h-4 text-primary'/>
                      <a  className="block px-2 py-2 text-sm text-gray-700 hover:text-teal-600 ">Profile</a>
                    </div>
                    <div onClick={() => {navigate('/Notifications'); setIsProfileDropdownOpen(false);}} className='flex items-center ml-4 hover:bg-teal-50  cursor-pointer'>
                      <MdOutlineNotificationsActive  className='w-4 h-4 text-primary'/>
                      <a className="block px-2 py-2 text-sm text-gray-700 hover:text-teal-600">Notifications</a>
                    </div>
                    <div className='flex items-center ml-4 hover:bg-teal-50 cursor-pointer' onClick={() => {navigate('/settings'); setIsProfileDropdownOpen(false);}}>
                      <IoMdSettings  className='w-4 h-4 text-primary'/>
                      <a  className="block px-2 py-2 text-sm text-gray-700 hover:bg-teal-50 hover:text-teal-600">Settings</a>
                    </div>
                    <button 
                      onClick={() => {
                        logout();
                        setIsProfileDropdownOpen(false);
                        navigate('/');
                      }}
                      className=" w-full flex items-center gap-2 text-left px-4 py-2 text-sm text-gray-700 hover:bg-teal-50 hover:text-teal-600 border-t border-gray-100"
                    >
                      <RiLogoutCircleLine className='w-4 h-4 text-primary' /> Sign out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              // Sign In/Sign Up buttons for unauthenticated users
              <>
                <Button onClick={() => navigate('/sign-in')} variant="outline" size="md">Sign In</Button>
                <Button onClick={() => navigate('/sign-up')} variant="primary" size="md" className='hidden sm:block'>Sign Up</Button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header