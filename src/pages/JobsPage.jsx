import React from 'react'
import { JobProvider, useJobContext } from '../context/JobContext';
import JobList from '../components/jobs/JobList';
import Header from '../components/layout/Header';
import  JobFilters  from '../components/jobs/JobFilters';
import Footer from "../components/layout/Footer"


const JobsPageContent = () => {
    const { filteredJobs, filters } = useJobContext();

  return (
    <div className=' min-h-screen '>
        <Header />
        <div className="bg-black text-white pt-32 pb-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">Jobs</h1>
          <p className="text-secondary-400">Find your dream job</p>
        </div>
      </div>

      <div className='container mx-auto px-4 py-8'>
        <div className='flex  flex-col md:flex-row gap-8'>
            {/* Filter */}

            <div className='md:w-1/4'>
                <div className='sticky top-8'>
                    <JobFilters />
                </div>
            </div>

            {/* Job-list */}
            <div className='md:w-3/4'>
                <div className='mb-6'>
                    <div className='flex justify-between items-center'>
                        <p className='w-2/3 md:w-auto'>Showing {filteredJobs.length} of  {filteredJobs.length} results</p>
                        <select name="" id="" className='border p-2 w-1/2 md:w-auto'>
                            <option>Sort by latest</option>
                            <option>Sort by oldest</option>
                            <option>Sort by salary (high to low)</option>
                            <option>Sort by salary (low to high)</option>
                        </select>
                    </div>   
                </div>
                <JobList showPagination={true} />
            </div>

        </div>

      </div>
      <Footer />
    </div>
  )
};

const JobsPage = () => {
  return (
    <JobProvider>
      <JobsPageContent />
    </JobProvider>
  );
};


export default JobsPage