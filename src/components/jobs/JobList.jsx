import React from 'react'
import { useJobContext } from '../../context/JobContext';
import JobCard from './JobCard';
import { useState } from 'react';

const JobList = ({ limit = null, showPagination = false}) => {

  const { filteredJobs } = useJobContext();
    const [currentPage, setCurrentPage] = useState(1);
    const jobsPerPage = 10;

    const indexOfLastJob = currentPage * jobsPerPage;
    const indexOfFirstJob = indexOfLastJob - jobsPerPage;

    let jobsToDisplay;

    if (limit) {
      jobsToDisplay = filteredJobs.slice(0, limit);
    } else if (showPagination) {
      jobsToDisplay = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);
    } else {
      jobsToDisplay = filteredJobs;
    }

    const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);

    const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (filteredJobs.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-neutral-500">No jobs found matching your criteria.</p>
      </div>
    );
  }

  return (
    <div>
      <div className='space-y-6'>
        {jobsToDisplay.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}

      </div>

      {showPagination && totalPages > 1 && (
        <div className="flex justify-center items-center mt-8 space-x-2">
          {/* Previous Button */}
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-3 py-2 rounded-md ${
              currentPage === 1
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
            }`}
          >
            Previous
          </button>

          {/* Page Numbers */}
          {[...Array(totalPages)].map((_, index) => {
            const pageNumber = index + 1;
            return (
              <button
                key={pageNumber}
                onClick={() => handlePageChange(pageNumber)}
                className={`px-3 py-2 rounded-md ${
                  currentPage === pageNumber
                    ? 'bg-primary-600 text-white'
                    : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
              >
                {pageNumber}
              </button>
            );
          })}

          {/* Next Button */}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`px-3 py-2 rounded-md ${
              currentPage === totalPages
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
            }`}
          >
            Next
          </button>
        </div>
      )}

      {/* Results Info */}
      {showPagination && (
        <div className="text-center mt-4 text-sm text-gray-600">
          Showing {indexOfFirstJob + 1} to {Math.min(indexOfLastJob, filteredJobs.length)} of {filteredJobs.length} results
        </div>
      )}
    
    </div>
  )
}

export default JobList