import React, { createContext, useContext, useState, useEffect } from 'react';
import { jobAPI, categoryAPI, locationAPI } from '../services/api';

const JobContext = createContext();
export const useJobContext = () => useContext(JobContext);

export const JobProvider = ({ children }) => {
  const [jobs, setJobs] = useState([]);
  const [categories, setCategories] = useState([]);
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [statsData, setStatsData] = useState({
    appliedJobs: 0,
    favoriteJobs: 0,
    jobAlerts: 0
  });

  const [recentApplications, setRecentApplications] = useState([]);
  const [userApplications, setUserApplications] = useState([]);
  const [favourites, setFavourites] = useState([]);

  const [filters, setFilters] = useState({
    search: "",
    location: "",
    category: "",
    workMode: "",
    type: "",
    experienceLevel: "",
    salaryRange: [0, 100000],
    datePosted: "",
    tags: []
  });

  // Fetch all jobs
  const fetchJobs = async () => {
    try {
      setLoading(true);
      const response = await jobAPI.getAllJobs();
      const jobsData = response.data.map(job => ({
        id: job.id,
        title: job.title,
        company: job.company_name,
        companyLogo: "🏢", // Default logo, you can customize based on company
        category: job.category?.name || "Uncategorized",
        type: job.employment_type,
        salary: job.salary ? `$${job.salary}` : "Negotiable",
        location: job.location ? `${job.location.city}, ${job.location.country}` : "Remote",
        datePosted: formatDatePosted(job.created_at),
        workMode: job.work_mode,
        tags: job.tags || [],
        description: job.description,
        responsibilities: job.responsibilities ? parseTextToList(job.responsibilities) : [],
        skills: job.professional_skills ? parseTextToList(job.professional_skills) : [],
        experience: job.experience_level,
        degree: "Bachelor's", // Default, adjust based on your API
        benefits: [], // Add if your API provides benefits
        aboutCompany: `${job.company_name} is looking for talented professionals.`, // Default
        requirements: [] // Add if your API provides requirements
      }));
      setJobs(jobsData);
      setError(null);
    } catch (err) {
      setError('Failed to fetch jobs');
      console.error('Error fetching jobs:', err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch categories
  const fetchCategories = async () => {
    try {
      const response = await categoryAPI.getAllCategories();
      setCategories(response.data);
    } catch (err) {
      console.error('Error fetching categories:', err);
    }
  };

  // Fetch locations
  const fetchLocations = async () => {
    try {
      const response = await locationAPI.getAllLocations();
      setLocations(response.data);
    } catch (err) {
      console.error('Error fetching locations:', err);
    }
  };

  // Helper function to format date posted
  const formatDatePosted = (dateString) => {
    const now = new Date();
    const postedDate = new Date(dateString);
    const diffInMinutes = Math.floor((now - postedDate) / (1000 * 60));
    
    if (diffInMinutes < 60) return `${diffInMinutes} min ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)} hours ago`;
    return `${Math.floor(diffInMinutes / 1440)} days ago`;
  };

  // Helper function to parse text to list
  const parseTextToList = (text) => {
    if (Array.isArray(text)) return text;
    return text.split('\n').filter(item => item.trim() !== '');
  };

  // Initialize data on component mount
  useEffect(() => {
    const initializeData = async () => {
      await Promise.all([
        fetchJobs(),
        fetchCategories(),
        fetchLocations()
      ]);
    };

    initializeData();
  }, []);

  const updateFilters = (newFilters) => {
    setFilters({ ...filters, ...newFilters });
  };

  const filteredJobs = jobs.filter(job => {
    return (
      (filters.search === "" || 
        job.title.toLowerCase().includes(filters.search.toLowerCase()) ||
        job.company.toLowerCase().includes(filters.search.toLowerCase())) &&
      (filters.location === "" || job.location === filters.location) &&
      (filters.category === "" || job.category === filters.category) &&
      (filters.workMode === "" || job.workMode === filters.workMode) &&
      (filters.type === "" || job.type === filters.type)
    );
  });

  // Get job by ID
  const getJobById = async (id) => {
    try {
      // First check if job exists in local state
      const localJob = jobs.find(job => job.id === id);
      if (localJob) return localJob;

      // If not found locally, fetch from API
      const response = await jobAPI.getJobById(id);
      const job = response.data;
      
      return {
        id: job.id,
        title: job.title,
        company: job.company_name,
        companyLogo: "🏢",
        category: job.category?.name || "Uncategorized",
        type: job.employment_type,
        salary: job.salary ? `$${job.salary}` : "Negotiable",
        location: job.location ? `${job.location.city}, ${job.location.country}` : "Remote",
        datePosted: formatDatePosted(job.created_at),
        workMode: job.work_mode,
        tags: job.tags || [],
        description: job.description,
        responsibilities: job.responsibilities ? parseTextToList(job.responsibilities) : [],
        skills: job.professional_skills ? parseTextToList(job.professional_skills) : [],
        experience: job.experience_level,
        degree: "Bachelor's",
        benefits: [],
        aboutCompany: `${job.company_name} is looking for talented professionals.`,
        requirements: []
      };
    } catch (err) {
      console.error('Error fetching job:', err);
      return null;
    }
  };

  // Get related jobs (excluding current job, limit of 3)
  const getRelatedJobs = (currentJobId, limit = 3) => {
    return jobs
      .filter(job => job.id !== currentJobId)
      .slice(0, limit);
  };

  const addApplication = (application) => {
    const newApplication = {
      id: userApplications.length + 1,
      ...application,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    };
    setUserApplications([...userApplications, newApplication]);
  };

  // Update application status
  const updateApplicationStatus = (id, status) => {
    setUserApplications(userApplications.map(app => 
      app.id === id ? { ...app, status } : app
    ));
  };

  // Delete an application
  const deleteApplication = (id) => {
    setUserApplications(userApplications.filter(app => app.id !== id));
  };

  const toggleFavourite = (jobId) => {
    setFavourites((prev) =>
      prev.includes(jobId)
        ? prev.filter((id) => id !== jobId)
        : [...prev, jobId]
    );
  };

  const isJobFavourited = (jobId) => favourites.includes(jobId);

  // Refresh jobs function
  const refreshJobs = () => {
    fetchJobs();
  };

  const value = {
    jobs,
    filteredJobs,
    categories,
    locations,
    loading,
    error,
    filters,
    updateFilters,
    getJobById,
    getRelatedJobs,
    statsData,
    recentApplications,
    userApplications,
    addApplication,
    updateApplicationStatus,
    deleteApplication,
    favourites,
    toggleFavourite,
    isJobFavourited,
    refreshJobs,
  };

  return (
    <JobContext.Provider value={value}>
      {children}
    </JobContext.Provider>
  );
};