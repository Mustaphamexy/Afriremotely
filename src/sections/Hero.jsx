import React from 'react'
import Header from '../components/layout/Header'
import JobSearchForm from '../components/forms/JobSearchForm'
import CompanyLogos from '../components/UI/CompanyLogos';
import { 
  FaBriefcase, 
  FaUsers, 
  FaBuilding, 
} from 'react-icons/fa';



const Hero = () => {
  return (
    <div className='relative min-h-screen overflow-hidden bg-gradient-to-br from-black via-gray-900 to-black'>
        <Header />
        
        <div className='pt-24'>
            <div className='container mx-auto px-4 py-18 flex flex-col items-center justify-center text-center'>
                <h1 className='text-4xl md:text-5xl font-bold text-white mb-4'>Find Your Dream Job Today <span className='text-primary-500'>With AfriRemotely!</span></h1>
                <p className='text-white text-sm md:text-xl mb-4 md:mb-4 '>Connecting African Talents with Remote Opportunities: <br className='md:hidden'/>Your Gateway to Career Success</p>
            </div>
        </div>

        <JobSearchForm />

        {/* stats  */}

        <div className='grid grid-cols-3 gap-4 px-4 md:px-0 md:gap-8 max-w-4xl mx-auto mt-8 lg:mt-10'>
            <div className='flex items-center justify-center space-x-2 md:space-x-4'>
                <div className='bg-primary-500 rounded-full p-2 md:p-4'>
                    <FaBriefcase className='text-white text-sm md:text-3xl ' />
                </div>
                <div>
                  <div className="text-md md:text-3xl font-bold text-white">25,850</div>
                  <div className="text-primary-400">Jobs</div>
                </div>

            </div>
            <div className='flex items-center justify-center space-x-2 md:space-x-4'>
                <div className='bg-primary-500 rounded-full p-2 md:p-4'>
                    <FaUsers  className='text-white text-sm md:text-3xl' />
                </div>
                <div>
                  <div className="text-md md:text-3xl font-bold text-white">10,250</div>
                  <div className="text-primary-400">Candidates</div>
                </div>
            </div>
            <div className='flex items-center justify-center space-x-2 md:space-x-4'>
                <div className='bg-primary-500 rounded-full p-2 md:p-4'>
                    <FaBuilding className='text-white text-sm md:text-3xl' />
                </div>
                <div>
                  <div className="text-md md:text-3xl font-bold text-white">18,400</div>
                  <div className="text-primary-400">Companies</div>
                </div>
            </div>
        </div>

        {/* Companies */}
        <CompanyLogos />

        
    </div>
  )
}

export default Hero