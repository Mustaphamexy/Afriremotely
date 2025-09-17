import React from "react";
import { FaBriefcase, FaClock, FaWallet  } from "react-icons/fa";
import { IoLocationSharp } from "react-icons/io5";
import Button from "../UI/Button";

const JobCard = ({ job }) => {
  const workModeColors = {
    remote: "bg-green-100 text-green-800",
    hybrid: "bg-blue-100 text-blue-800",
    onsite: "bg-purple-100 text-purple-800",
  };

  const getWorkModeColor = (mode) =>
    workModeColors[mode] || "bg-gray-100 text-gray-800";

  return (
    <div className="bg-white rounded-lg border border-neutral-300 shadow-md p-6 mb-4 hover:shadow-lg transition-shadow duration-300">
      <p className="text-primary-600 text-xs mt-1 inline p-2 rounded-lg bg-primary-100 font-semibold">
              {job.datePosted || job.postedTime}
            </p>
      <div className="flex justify-between items-start mb-4 mt-4">
        <div className="flex items-start space-x-3">
          <div className="w-12 h-12 bg-primary-200 rounded-lg flex items-center justify-center text-white text-xl">
            {job.companyLogo ? (
              typeof job.companyLogo === 'string' && job.companyLogo.startsWith('http') ? (
                <img
                  src={job.companyLogo}
                  alt={`${job.company} logo`}
                  className="w-10 h-10 object-contain"
                />
              ) : (
                <span className="text-2xl">{job.companyLogo}</span>
              )
            ) : (
              <span className="text-gray-500 font-semibold">
                {job.company.charAt(0)}
              </span>
            )}
          </div>
          <div>
            <h3 className="font-semibold text-lg text-neutral-900 mb-1">
              {job.title}
            </h3>
            <p className="text-neutral-700 text-sm">{job.company}</p>
            
          </div>
        </div>
        <span
          className={`px-3 py-1 rounded-full text-sm font-bold ${getWorkModeColor(
            job.workMode
          )}`}
        >
          {job.workMode.charAt(0).toUpperCase() + job.workMode.slice(1)}
        </span>
      </div>
      
      <div className=" flex flex-wrap gap-3 mb-4 text-sm text-gray-600">
        <div className="flex items-center gap-2">
          <FaBriefcase className="w-4 h-4 text-primary-500" />
          <span>{job.category}</span>
        </div>
        <div className="flex items-center gap-2">
          <FaClock className="w-4 h-4 text-primary-500" />
          <span>{job.type}</span>
        </div>
        <div className="flex items-center gap-2">
          <FaWallet  className="w-4 h-4 text-primary-500" />
          <span>{job.salary}</span>
        </div>
        <div className="flex items-center gap-2">
          <IoLocationSharp className="w-4 h-4 text-primary-500" />
          <span>{job.location}</span>
        </div>
      </div>

      <div className="flex justify-end">
        <Button variant="primary" size="md" className="cursor-pointer" >
          Job Details
        </Button>
      </div>
    </div>
  );
};

export default JobCard;