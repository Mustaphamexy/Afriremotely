import React from 'react'
import Button from '../components/UI/Button'
import JobList from '../components/jobs/JobList';
import { JobProvider } from '../context/JobContext'; // Changed from 'contexts' to 'context'
import { useNavigate } from 'react-router-dom';

const Jobsection = () => {

  const navigate = useNavigate();
  return (
    <JobProvider>
      <div className='flex items-center mt-8'>
        <div className='container mx-auto px-4 bg-white'>
          <div className='flex justify-between items-center mb-8'>
            <div>
              <h2 className="text-md md:text-2xl font-bold text-gray-900">Recent Jobs Available</h2>
              <p className="text-gray-600 mt-1 text-sm md:text-base">Explore Latest Job Openings</p>
            </div>
            <Button variant="primary" size="md" className='text-sm cursor-pointer' onClick={() => navigate('/jobs')} >
              View All Jobs
            </Button>
          </div>
          
          {/* Display only 5 jobs for the job section */}
          <JobList limit={5} showPagination={false} />
          
        </div>
      </div>
    </JobProvider>
  )
}

export default Jobsection