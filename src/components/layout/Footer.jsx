import React from 'react'
import { useState } from 'react';
const Footer = () => {

  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
  }

  return (
    <footer className="bg-black text-white">
        <div className='container mx-auto px-4 py-12'>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
            <div className='space-y-4'>
              <div className='flex flex-col space-x-4'>
                <h1 onClick={() => navigate('/')} className='text-white text-3xl lg:text-4xl font-bold cursor-pointer mb-4'>Afri<span className='text-primary'>Remotely</span></h1>
                <p className="text-neutral-400 leading-relaxed">
                  Connect talented professionals with amazing career opportunities. 
                  We help bridge the gap between job seekers and employers, 
                  creating meaningful connections that drive success.
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Company</h3>
              <ul className="space-y-3">
              <li>
                <a href="/about" className="text-neutral-400 hover:text-primary-400 transition-colors duration-200">
                  About Us
                </a>
              </li>
              <li>
                <a href="/team" className="text-neutral-400 hover:text-primary-400 transition-colors duration-200">
                  Our Team
                </a>
              </li>
              <li>
                <a href="/partners" className="text-neutral-400 hover:text-primary-400 transition-colors duration-200">
                  Partners
                </a>
              </li>
              <li>
                <a href="/candidates" className="text-neutral-400 hover:text-primary-400 transition-colors duration-200">
                  For Candidates
                </a>
              </li>
              <li>
                <a href="/employers" className="text-neutral-400 hover:text-primary-400 transition-colors duration-200">
                  For Employers
                </a>
              </li>
            </ul>
            </div>

            <div>
            <h3 className="text-lg font-semibold mb-4">Job Categories</h3>
            <ul className="space-y-3">
              <li>
                <a href="/jobs/telecommunications" className="text-neutral-400 hover:text-primary-400 transition-colors duration-200">
                  Telecommunications
                </a>
              </li>
              <li>
                <a href="/jobs/hotels-tourism" className="text-neutral-400 hover:text-primary-400 transition-colors duration-200">
                  Hotels & Tourism
                </a>
              </li>
              <li>
                <a href="/jobs/construction" className="text-neutral-400 hover:text-primary-400 transition-colors duration-200">
                  Construction
                </a>
              </li>
              <li>
                <a href="/jobs/education" className="text-neutral-400 hover:text-primary-400 transition-colors duration-200">
                  Education
                </a>
              </li>
              <li>
                <a href="/jobs/financial-services" className="text-neutral-400 hover:text-primary-400 transition-colors duration-200">
                  Financial Services
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
            <p className="text-neutral-400 mb-4">
              Get the latest job opportunities and career insights delivered to your inbox weekly.
            </p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email Address"
                  required
                  className="w-full px-4 py-3 bg-transperent text-white rounded-lg border-2 border-neutral-400 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 placeholder-neutral-400"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-primary-500 hover:bg-primary-600 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200"
              >
                Subscribe now
              </button>
            </form>
          </div>
            
          </div>
          <div className="border-t border-neutral-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-neutral-400 text-sm mb-4 md:mb-0">
            © Copyright AfriRemotely 2025.
          </div>
          <div className="flex space-x-6">
            <a 
              href="/privacy" 
              className="text-neutral-400 hover:text-primary-400 text-sm underline transition-colors duration-200"
            >
              Privacy Policy
            </a>
            <a 
              href="/terms" 
              className="text-neutral-400 hover:text-primary-400 text-sm underline transition-colors duration-200"
            >
              Terms & Conditions
            </a>
          </div>
        </div>

        </div>
    </footer>
  )
}

export default Footer