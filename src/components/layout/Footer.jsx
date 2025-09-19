import React from 'react'
import { useState } from 'react';
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    setEmail('')
  }

  return (
    <footer className="bg-black text-white border-t-8 border-primary">
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
                <a onClick={() => {navigate('/about'); window.scrollTo({ top: 0, behavior: "smooth" });}} className="text-neutral-400 hover:text-primary-400 transition-colors duration-200 cursor-pointer">
                  About Us
                </a>
              </li>
              <li>
                <a onClick={() => {navigate('/contact'); window.scrollTo({ top: 0, behavior: "smooth" });}} className="text-neutral-400 hover:text-primary-400 transition-colors duration-200 cursor-pointer">
                  Our Team
                </a>
              </li>
              <li>
                <a onClick={() => {navigate('/partners'); window.scrollTo({ top: 0, behavior: "smooth" });}} className="text-neutral-400 hover:text-primary-400 transition-colors duration-200 cursor-pointer">
                  Partners
                </a>
              </li>
              <li>
                <a onClick={() => {navigate('/job-seekers'); window.scrollTo({ top: 0, behavior: "smooth" });}} className="text-neutral-400 hover:text-primary-400 transition-colors duration-200 cursor-pointer">
                  For Job Seekers
                </a>
              </li>
              <li>
                <a onClick={() => {navigate('/employers'); window.scrollTo({ top: 0, behavior: "smooth" });}} className="text-neutral-400 hover:text-primary-400 transition-colors duration-200 cursor-pointer">
                  For Employers
                </a>
              </li>
            </ul>
            </div>

            <div>
            <h3 className="text-lg font-semibold mb-4">Job Categories</h3>
            <ul className="space-y-3">
              <li>
                <a onClick={() => {navigate('/jobs'); window.scrollTo({ top: 0, behavior: "smooth" });}} className="text-neutral-400 hover:text-primary-400 transition-colors duration-200 cursor-pointer">
                  Telecommunications
                </a>
              </li>
              <li>
                <a onClick={() => {navigate('/jobs'); window.scrollTo({ top: 0, behavior: "smooth" });}} className="text-neutral-400 hover:text-primary-400 transition-colors duration-200 cursor-pointer">
                  Hotels & Tourism
                </a>
              </li>
              <li>
                <a onClick={() => {navigate('/jobs'); window.scrollTo({ top: 0, behavior: "smooth" });}} className="text-neutral-400 hover:text-primary-400 transition-colors duration-200 cursor-pointer">
                  Construction
                </a>
              </li>
              <li>
                <a onClick={() => {navigate('/jobs'); window.scrollTo({ top: 0, behavior: "smooth" });}} className="text-neutral-400 hover:text-primary-400 transition-colors duration-200 cursor-pointer">
                  Education
                </a>
              </li>
              <li>
                <a onClick={() => {navigate('/jobs'); window.scrollTo({ top: 0, behavior: "smooth" });}} className="text-neutral-400 hover:text-primary-400 transition-colors duration-200 cursor-pointer">
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
              onClick={() => {navigate('/privacy-policy'); window.scrollTo({ top: 0, behavior: "smooth" });}} 
              className="text-neutral-400 hover:text-primary-400 text-sm underline transition-colors duration-200 cursor-pointer"
            >
              Privacy Policy
            </a>
            <a 
              onClick={() => {navigate('/terms-conditions'); window.scrollTo({ top: 0, behavior: "smooth" });}} 
              className="text-neutral-400 hover:text-primary-400 text-sm underline transition-colors duration-200 cursor-pointer"
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