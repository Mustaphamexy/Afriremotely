import React, { useState, useEffect } from "react";
import { useJobContext } from "../../context/JobContext";
import { FiSearch, FiMapPin } from "react-icons/fi";
import Button from "../UI/Button";
import { locationAPI, categoryAPI } from "../../services/api";

export const JobFilters = () => {
  const { filters, updateFilters } = useJobContext();
  const [locations, setLocations] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState({
    locations: false,
    categories: false
  });

  // Fetch locations from API
  const fetchLocations = async () => {
    setLoading(prev => ({ ...prev, locations: true }));
    try {
      const response = await locationAPI.getAllLocations();
      setLocations(response.data);
    } catch (error) {
    } finally {
      setLoading(prev => ({ ...prev, locations: false }));
    }
  };

  // Fetch categories from API
  const fetchCategories = async () => {
    setLoading(prev => ({ ...prev, categories: true }));
    try {
      const response = await categoryAPI.getAllCategories();
      setCategories(response.data);
    } catch (error) {
    } finally {
      setLoading(prev => ({ ...prev, categories: false }));
    }
  };

  useEffect(() => {
    fetchLocations();
    fetchCategories();
  }, []);

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
            disabled={loading.locations}
          >
            <option value="">{loading.locations ? "Loading locations..." : "Choose location"}</option>
            {locations.map((location) => (
              <option key={location.id} value={location.name}>
                {location.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Category */}
      <div className="mb-4">
        <label className="block text-md font-medium text-neutral-800 mb-2">
          Category
        </label>
        <select
          value={filters.category}
          onChange={handleCategoryChange}
          className="w-full pl-2 py-2 border bg-neutral-100 border-neutral-400 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500 focus:outline-none "
          disabled={loading.categories}
        >
          <option value="">{loading.categories ? "Loading categories..." : "All Categories"}</option>
          {categories.map((category) => (
            <option key={category.id} value={category.name}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      {/* Work Mode */}
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

      {/* Job Type */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Job Type
        </label>
        <div className="space-y-2">
          {['Full time', 'Part time'].map((type) => (
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