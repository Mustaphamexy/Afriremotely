import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaChevronDown } from "react-icons/fa";
import Button from "../UI/Button";
import {
  categoryAPI,
  locationAPI,
} from "../../services/api";

const JobSearchForm = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchData, setSearchData] = useState({
    search: "",
    location: "",
    category: ""
  });

  // Fetch categories and locations from API
  useEffect(() => {
    const fetchFormData = async () => {
      try {
        setLoading(true);

        // Fetch categories
        const categoriesResponse = await categoryAPI.getAllCategories();
        const categoriesData = categoriesResponse.data
          ?.map((cat) => ({
            id: cat.id,
            name: cat.name,
          }))
          .filter(Boolean) || [];
        setCategories(categoriesData);

        // Fetch locations
        const locationsResponse = await locationAPI.getAllLocations();
        const locationsData = locationsResponse.data
          ?.map((loc) => ({
            id: loc.id,
            displayName: `${loc.city}, ${loc.country}`,
            city: loc.city,
            country: loc.country,
          }))
          .filter(Boolean) || [];
        setLocations(locationsData);

      } catch (error) {
        console.error("Failed to load form data:", error);
        
        // Fallback to default values if API fails
        setCategories([
          { id: "1", name: "Technology" },
          { id: "2", name: "Marketing" },
          { id: "3", name: "Design" },
          { id: "4", name: "Sales" },
          { id: "5", name: "Finance" },
          { id: "6", name: "Hotels & Tourism" },
          { id: "7", name: "Healthcare" },
          { id: "8", name: "Education" },
          { id: "9", name: "Manufacturing" },
          { id: "10", name: "Retail" },
        ]);

        setLocations([
          { id: "1", displayName: "Nairobi, Kenya" },
          { id: "2", displayName: "Lagos, Nigeria" },
          { id: "3", displayName: "Mombasa, Kenya" },
          { id: "4", displayName: "Abuja, Nigeria" },
          { id: "5", displayName: "Johannesburg, South Africa" },
          { id: "6", displayName: "Remote" },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchFormData();
  }, []);

  const handleInputChange = (field, value) => {
    setSearchData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSearch = (e) => {
    e.preventDefault();
    
    // Build query parameters
    const queryParams = new URLSearchParams();
    
    if (searchData.search) queryParams.append('search', searchData.search);
    if (searchData.location) queryParams.append('location', searchData.location);
    if (searchData.category) queryParams.append('category', searchData.category);

    // Navigate to /jobs with query parameters
    navigate(`/jobs?${queryParams.toString()}`);
  };

  // Generate unique keys for options
  const generateKey = (value, index) => {
    return value ? `${value}-${index}` : `option-${index}`;
  };

  return (
    <div className="w-full max-w-5xl mx-auto">
      {/* Mobile View */}
      <div className="lg:hidden bg-white rounded-2xl p-6 shadow-2xl mx-2">
        <form onSubmit={handleSearch} className="space-y-4">
          <input
            type="text"
            placeholder="Job Title or Company"
            className="w-full border-b pb-2 focus:border-primary-500 focus:outline-none"
            value={searchData.search}
            onChange={(e) => handleInputChange('search', e.target.value)}
          />
          
          <div className="relative">
            <select 
              className="w-full px-4 py-3 border border-secondary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent appearance-none bg-neutral-100"
              disabled={loading}
              value={searchData.location}
              onChange={(e) => handleInputChange('location', e.target.value)}
            >
              <option value="">Select Location</option>
              {locations.map((location, index) => (
                <option 
                  key={generateKey(location.id, index)} 
                  value={location.displayName}
                >
                  {location.displayName}
                </option>
              ))}
            </select>
            <FaChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-neutral-400 pointer-events-none" />
          </div>
          
          <div className="relative">
            <select 
              className="w-full px-4 py-3 border border-secondary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent appearance-none bg-neutral-100"
              disabled={loading}
              value={searchData.category}
              onChange={(e) => handleInputChange('category', e.target.value)}
            >
              <option value="">Select Category</option>
              {categories.map((category, index) => (
                <option 
                  key={generateKey(category.id, index)} 
                  value={category.name}
                >
                  {category.name}
                </option>
              ))}
            </select>
            <FaChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-neutral-400 pointer-events-none" />
          </div>
          
          <Button 
            type="submit"
            variant="primary" 
            size="md" 
            className="w-full"
            disabled={loading}
          >
            {loading ? "Loading..." : "Search Jobs"}
          </Button>
        </form>
      </div>

      {/* Desktop View */}
      <form onSubmit={handleSearch} className="hidden lg:flex bg-white rounded-2xl p-6 shadow-2xl overflow-hidden mx-4">
        <input
          type="text"
          placeholder="Job Title or Company"
          className="flex-1 border-0 px-6 py-4 focus:outline-none text-neutral-700"
          value={searchData.search}
          onChange={(e) => handleInputChange('search', e.target.value)}
        />
        
        <div className="relative border-l border-secondary-300">
          <select
            className="px-10 py-4 border-0 focus:outline-none appearance-none bg-transparent text-neutral-700 min-w-[160px]"
            disabled={loading}
            value={searchData.location}
            onChange={(e) => handleInputChange('location', e.target.value)}
          >
            <option value="">Select Location</option>
            {locations.map((location, index) => (
              <option 
                key={generateKey(location.id, index)} 
                value={location.displayName}
              >
                {location.displayName}
              </option>
            ))}
          </select>
          <FaChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-neutral-400 pointer-events-none" />
        </div>
        
        <div className="relative border-l border-gray-200">
          <select 
            className="px-10 py-4 border-0 focus:outline-none appearance-none bg-transparent text-gray-700 min-w-[160px]"
            disabled={loading}
            value={searchData.category}
            onChange={(e) => handleInputChange('category', e.target.value)}
          >
            <option value="">Select Category</option>
            {categories.map((category, index) => (
              <option 
                key={generateKey(category.id, index)} 
                value={category.name}
              >
                {category.name}
              </option>
            ))}
          </select>
          <FaChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
        </div>
        
        <Button 
          type="submit"
          variant="primary" 
          size="md" 
          className="ml-6 w-full"
          disabled={loading}
        >
          {loading ? "Loading..." : "Search Jobs"}
        </Button>
      </form>
    </div>
  );
};

export default JobSearchForm;