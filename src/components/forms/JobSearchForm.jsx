import React from "react";
import { FaChevronDown } from "react-icons/fa";
import Button from "../UI/Button";

const JobSearchForm = () => {
  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Mobile View */}

      <div className="lg:hidden bg-white rounded-2xl p-6 shadow-2xl mx-2 ">
        <form action="" className="space-y-4">
          <input
            type="text"
            name=""
            id=""
            placeholder="Job Title or Company"
            className="w-full border-b pb-2 focus:border-primary-500 focus:outline-none "
          />
          <div className="relative">
            <select className="w-full px-4 py-3 border border-secondary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent appearance-none bg-neutral-100">
              <option>Select Location</option>
              <option>Johannesburg</option>
              <option>Abuja</option>
              <option>Accra</option>
              <option>Lagos</option>
              <option>Nairobi</option>
              <option>Remote</option>
            </select>
            <FaChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-neutral-400 pointer-events-none" />
          </div>
          <div className="relative">
            <select className="w-full px-4 py-3 border border-secondary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent appearance-none bg-neutral-100">
              <option>Select Category</option>
              <option>Technology</option>
              <option>Design</option>
              <option>Marketing</option>
              <option>Sales</option>
            </select>
            <FaChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-neutral-400 pointer-events-none" />
          </div>
          <Button variant="primary" size="md" className="w-full">
            Search Jobs
          </Button>
        </form>
      </div>

      {/* Desktop View */}

      <form className="hidden lg:flex bg-white rounded-2xl p-6 shadow-2xl overflow-hidden mx-4">
        <input
          type="text"
          placeholder="Job Title or Company"
          className="flex-1 border-0 px-6 py-4 focus:outline-none text-neutral-700"
        />
        <div className="relative border-l border-secondary-300">
          <select
            name=""
            id=""
            className="px-10 py-4 border-0 focus:outline-none appearance-none bg-transparent text-neutral-700 min-w-[160px]"
          >
            <option>Select Location</option>
            <option>Johannesburg</option>
            <option>Abuja</option>
            <option>Accra</option>
            <option>Lagos</option>
            <option>Nairobi</option>
            <option>Remote</option>
          </select>
          <FaChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-neutral-400 pointer-events-none" />
        </div>
        <div className="relative border-l border-gray-200">
          <select className="px-10 py-4 border-0 focus:outline-none appearance-none bg-transparent text-gray-700 min-w-[160px]">
            <option>Select Category</option>
            <option>Technology</option>
            <option>Design</option>
            <option>Marketing</option>
            <option>Sales</option>
          </select>
          <FaChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
        </div>
        <Button variant="primary" size="md" className="ml-6 w-full">Search Jobs</Button>
      </form>
    </div>
  );
};

export default JobSearchForm;
