import React, { createContext, useContext, useState } from 'react';


const JobContext = createContext();
export const useJobContext = () => useContext(JobContext);

export const JobProvider = ({ children }) => {
  const [jobs, setJobs] = useState([
    {
      id: 1,
      title: "Forward Security Director",
      companyLogo: "🌐",
      company: "Bauch, Schuppe and Schulist Co",
      category: "Hotels & Tourism",
      type: "Full time",
      salary: "$40000-$42000",
      location: "New-York, USA",
      datePosted: "10 min ago",
      workMode: "onsite",
      tags: ["security", "management", "tourism"]
    },
    {
      id: 2,
      title: "Regional Creative Facilitator",
      companyLogo: "🛡️",
      company: "Wisozk - Becker Co",
      category: "Media",
      type: "Part time",
      salary: "$28000-$32000",
      location: "Los-Angeles, USA",
      datePosted: "12 min ago",
      workMode: "remote",
      tags: ["creative", "media", "facilitation"]
    },
    {
      id: 3,
      title: "Internal Integration Planner",
       companyLogo: "🎨",
      company: "Mraz, Quigley and Feest Inc.",
      category: "Construction",
      type: "Full time",
      salary: "$48000-$50000",
      location: "Texas, USA",
      datePosted: "15 min ago",
      workMode: "hybrid",
      tags: ["planning", "integration", "construction"]
    },
    {
      id: 4,
      title: "District Intranet Director",
      companyLogo: "📊",
      company: "VonRueden - Weber Co",
      category: "Commerce",
      type: "Full time",
      salary: "$42000-$48000",
      location: "Florida, USA",
      datePosted: "24 min ago",
      workMode: "onsite",
      tags: ["intranet", "director", "commerce"]
    },
    {
      id: 5,
      title: "Corporate Tactics Facilitator",
      companyLogo: "💼",
      company: "Cormier, Turner and Flatley Inc",
      category: "Commerce",
      type: "Full time",
      salary: "$38000-$40000",
      location: "Boston, USA",
      datePosted: "26 min ago",
      workMode: "hybrid",
      tags: ["corporate", "tactics", "facilitation"]
    },
    {
    id: 6,
    title: "Forward Accounts Consultant",
    company: "Miller Group",
    companyLogo: "📈",
    category: "Financial services",
    type: "Full time",
    salary: "$45000-$48000",
    location: "Boston, USA",
    workMode: "remote",
    datePosted: "30 min ago",
    tags: ["accounting", "consulting", "finance"]
    }
  ]);

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

  const value = {
    jobs,
    filteredJobs,
    filters,
    updateFilters
  };

  return (
    <JobContext.Provider value={value}>
      {children}
    </JobContext.Provider>
  );
};