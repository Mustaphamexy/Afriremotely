import React from "react";
import { useJobContext } from "../../context/JobContext";
import { FiSearch, FiMapPin } from "react-icons/fi";
import Button from "../UI/Button";

export const JobFilters = () => {
  const { filters, updateFilters } = useJobContext();

  const handleSearchChange = (e) => {
    updateFilters({ search: e.target.value });
  };

  const handleLocationChange = (e) => {
    updateFilters({ location: e.target.value });
  };

  const handleCategoryChange = (e) => {
    updateFilters({ category: e.target.value });
  };

  const handleWorkModeChange = (e) => {
    updateFilters({ workMode: e.target.value });
  };

  const handleTypeChange = (e) => {
    updateFilters({ type: e.target.value });
  };

  const clearFilters = () => {
    updateFilters({
      search: "",
      location: "",
      category: "",
      workMode: "",
      type: "",
      experienceLevel: "",
      salaryRange: [0, 100000],
      datePosted: "",
      tags: [],
    });
  };

  return (
    <div className="bg-primary-200/60 p-6 rounded-lg">
      <div className="flex justify-between items-center mb-6">
        <h3 className=" text-lg md:text-sm lg:text-lg font-semibold text-gray-900">
          Filter Jobs
        </h3>
        <Button variant="primary" size="sm" className="cursor-pointer" onClick={clearFilters}>
          Clear All
        </Button>
      </div>

      {/* Search */}
      <div className="mb-4">
        <label className="block text-md font-medium text-neutral-800 mb-2">
          Search by Job Title
        </label>
        <div className="relative">
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" />
          <input
            type="text"
            placeholder="Job Title or Company"
            className="w-full pl-10 pr-4 py-2 border bg-neutral-100 border-neutral-400 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500 focus:outline-none "
            value={filters.search}
            onChange={handleSearchChange}
          />
        </div>
      </div>

      {/* Location */}
      <div className="mb-4">
        <label className="block text-md font-medium text-neutral-800 mb-2">
          Location
        </label>
        <div className="relative">
          <FiMapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" />
          <select
            className="w-full pl-10 pr-4 py-2 border bg-neutral-100 border-neutral-400 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500 focus:outline-none "
            value={filters.location}
            onChange={handleLocationChange}
          >
            <option value="">Choose city</option>
            <option value="New-York, USA">New-York, USA</option>
            <option value="Los-Angeles, USA">Los-Angeles, USA</option>
            <option value="Texas, USA">Texas, USA</option>
            <option value="Florida, USA">Florida, USA</option>
            <option value="Boston, USA">Boston, USA</option>
          </select>
        </div>
      </div>

      {/* category */}
      <div className="mb-4">
        <label className="block text-md font-medium text-neutral-800 mb-2">
          Category
        </label>
        <select
          value={filters.category}
          onChange={handleCategoryChange}
          className="w-full pl-2 py-2 border bg-neutral-100 border-neutral-400 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500 focus:outline-none "
        >
          <option value="">All Categories</option>
          <option value="Hotels & Tourism">Hotels & Tourism</option>
          <option value="Media">Media</option>
          <option value="Construction">Construction</option>
          <option value="Commerce">Commerce</option>
          <option value="Financial services">Financial services</option>
        </select>
      </div>

        {/* Mode */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Work Mode
        </label>
        <div className="space-y-2">
          {["remote", "hybrid", "onsite"].map((mode) => (
            <label key={mode} className="flex items-center cursor-pointer">
              <input
                type="radio"
                name="workMode"
                value={mode}
                checked={filters.workMode === mode}
                onChange={handleWorkModeChange}
                className="w-5 h-5 mr-2 appearance-none border bg-white border-gray-500 rounded-md  checked:bg-green-600 focus:outline-none "
              />
              <span className="text-md text-gray-700 capitalize">{mode}</span>
            </label>
          ))}
          <label className="flex items-center">
            <input
              type="radio"
              name="workMode"
              value=""
              checked={filters.workMode === ""}
              onChange={handleWorkModeChange}
              className="w-5 h-5 mr-2 appearance-none border bg-white border-gray-500 rounded-md  checked:bg-green-600 focus:outline-none "
            />
            <span className="text-md text-gray-700">All</span>
          </label>
        </div>
      </div>

      {/* Job type */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Job Type
        </label>
        <div className="space-y-2">
          {[ 'Full time', 'Part time'].map((type) => (
            <label key={type} className="flex items-center cursor-pointer">
              <input
                type="radio"
                name="type"
                value={type}
                checked={filters.type === type}
                onChange={handleTypeChange}
                className="w-5 h-5 mr-2 appearance-none border bg-white border-gray-500 rounded-md  checked:bg-green-600 focus:outline-none "
              />
              <span className="text-md text-gray-700 capitalize">{type}</span>
            </label>
          ))}
          <label className="flex items-center">
            <input
              type="radio"
              name="type"
              value=""
              checked={filters.type === ""}
              onChange={handleTypeChange}
              className="w-5 h-5 mr-2 appearance-none border bg-white border-gray-500 rounded-md  checked:bg-green-600 focus:outline-none "
            />
            <span className="text-md text-gray-700">All</span>
          </label>
        </div>
      </div>
    </div>
  );
};

export default JobFilters;
