import React, { createContext, useContext, useState } from 'react';

const JobContext = createContext();
export const useJobContext = () => useContext(JobContext);

export const JobProvider = ({ children }) => {
  const [jobs, setJobs] = useState([
    {
      id: 1,
      title: "Forward Security Director",
      companyLogo: "🌍",
      company: "Bauch, Schuppe and Schulist Co",
      category: "Hotels & Tourism",
      type: "Full time",
      salary: "$40000-$42000",
      location: "New-York, USA",
      datePosted: "10 min ago",
      workMode: "onsite",
      tags: ["security", "management", "tourism"],
      description: "Lead our forward security initiatives to protect guests and staff across all hotel properties. Develop comprehensive security protocols and emergency response procedures.",
      responsibilities: [
        "Develop and implement security policies across multiple hotel locations",
        "Coordinate with local law enforcement and emergency services",
        "Conduct regular security assessments and risk evaluations",
        "Train and supervise security personnel teams",
        "Manage security technology systems and surveillance equipment",
        "Prepare detailed incident reports and security briefings",
        "Oversee guest and staff safety protocols during emergencies"
      ],
      skills: [
        "Security Management and Risk Assessment",
        "Emergency Response Planning",
        "Team Leadership and Staff Training",
        "CCTV and Security Systems Management",
        "Crisis Communication and Incident Management"
      ],
      experience: "5 years",
      degree: "Bachelor's",
      benefits: ["Health Insurance", "401k Matching", "Paid Time Off", "Professional Development"],
      aboutCompany: "Bauch, Schuppe and Schulist Co is a leading hospitality group operating luxury hotels and resorts across the United States, committed to providing exceptional guest experiences.",
      requirements: [
        "Bachelor's degree in Security Management, Criminal Justice, or related field",
        "5+ years of experience in security management, preferably in hospitality",
        "Strong leadership and communication skills",
        "Knowledge of security technologies and surveillance systems",
        "CPR and First Aid certification preferred"
      ]
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
      tags: ["creative", "media", "facilitation"],
      description: "Guide creative teams through innovative brainstorming sessions and facilitate collaborative projects across our media production studios.",
      responsibilities: [
        "Facilitate creative workshops and brainstorming sessions",
        "Coordinate between creative teams and production departments",
        "Develop creative processes and workflow optimization",
        "Mentor junior creative staff and interns",
        "Manage project timelines and creative deliverables",
        "Foster collaborative environment for cross-functional teams"
      ],
      skills: [
        "Creative Process Facilitation",
        "Project Management",
        "Team Collaboration and Mentoring",
        "Media Production Knowledge",
        "Workshop Planning and Execution"
      ],
      experience: "3 years",
      degree: "Bachelor's",
      benefits: ["Flexible Schedule", "Creative Freedom", "Professional Development", "Remote Work"],
      aboutCompany: "Wisozk - Becker Co is an innovative media production company specializing in digital content creation, advertising campaigns, and creative storytelling.",
      requirements: [
        "Bachelor's degree in Media Studies, Communications, or related field",
        "3+ years of experience in creative facilitation or media production",
        "Strong interpersonal and communication skills",
        "Experience with creative software and tools",
        "Portfolio demonstrating creative project management"
      ]
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
      tags: ["planning", "integration", "construction"],
      description: "Coordinate internal systems integration for construction projects, ensuring seamless workflow between departments and optimizing operational efficiency.",
      responsibilities: [
        "Plan and coordinate integration of internal systems and processes",
        "Develop workflow optimization strategies for construction projects",
        "Collaborate with engineering, procurement, and construction teams",
        "Create detailed project integration schedules and timelines",
        "Monitor project progress and identify potential integration issues",
        "Prepare comprehensive integration reports and documentation",
        "Facilitate communication between multiple project stakeholders"
      ],
      skills: [
        "Project Planning and Scheduling",
        "Systems Integration and Process Optimization",
        "Construction Project Management",
        "Cross-functional Team Coordination",
        "Risk Assessment and Mitigation"
      ],
      experience: "4 years",
      degree: "Bachelor's",
      benefits: ["Health Insurance", "401k", "Paid Time Off", "Hybrid Work", "Training Programs"],
      aboutCompany: "Mraz, Quigley and Feest Inc. is a premier construction company specializing in commercial and residential projects with a focus on sustainable building practices.",
      requirements: [
        "Bachelor's degree in Construction Management, Engineering, or related field",
        "4+ years of experience in construction planning or project management",
        "Strong analytical and problem-solving skills",
        "Proficiency in project management software (MS Project, Primavera)",
        "Understanding of construction processes and building codes"
      ]
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
      tags: ["intranet", "director", "commerce"],
      description: "Oversee the development and maintenance of internal communication systems and intranet platforms to enhance organizational productivity and collaboration.",
      responsibilities: [
        "Direct intranet strategy and implementation across multiple districts",
        "Oversee content management and information architecture",
        "Coordinate with IT teams for system maintenance and updates",
        "Develop user training programs for intranet platforms",
        "Analyze usage metrics and optimize user experience",
        "Manage internal communication workflows and policies",
        "Ensure compliance with data security and privacy regulations"
      ],
      skills: [
        "Intranet Management and Content Strategy",
        "Information Architecture and User Experience",
        "Team Leadership and Project Management",
        "Data Analysis and Performance Metrics",
        "Internal Communications and Training"
      ],
      experience: "6 years",
      degree: "Bachelor's",
      benefits: ["Health Insurance", "Dental Coverage", "401k Matching", "Professional Development"],
      aboutCompany: "VonRueden - Weber Co is a growing commerce company focused on streamlining business operations through innovative internal communication solutions.",
      requirements: [
        "Bachelor's degree in Information Systems, Communications, or related field",
        "6+ years of experience in intranet management or internal communications",
        "Strong leadership and team management skills",
        "Knowledge of content management systems and web technologies",
        "Experience with data analysis and reporting tools"
      ]
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
      tags: ["corporate", "tactics", "facilitation"],
      description: "Develop and implement strategic corporate initiatives, facilitating tactical planning sessions and driving organizational change management.",
      responsibilities: [
        "Facilitate strategic planning sessions and corporate initiatives",
        "Develop tactical approaches for business growth and optimization",
        "Coordinate cross-departmental collaboration and communication",
        "Analyze market trends and competitive landscape",
        "Create and present strategic recommendations to senior management",
        "Monitor implementation of corporate tactics and measure success",
        "Support change management initiatives across the organization"
      ],
      skills: [
        "Strategic Planning and Business Analysis",
        "Facilitation and Workshop Leadership",
        "Change Management and Organizational Development",
        "Market Research and Competitive Analysis",
        "Presentation and Communication Skills"
      ],
      experience: "4 years",
      degree: "Master's",
      benefits: ["Health Insurance", "401k", "Flexible Schedule", "Professional Development", "Hybrid Work"],
      aboutCompany: "Cormier, Turner and Flatley Inc is a dynamic commerce company focused on strategic growth and innovative business solutions in the competitive marketplace.",
      requirements: [
        "Master's degree in Business Administration, Strategy, or related field",
        "4+ years of experience in strategic planning or business facilitation",
        "Strong analytical and critical thinking skills",
        "Experience with strategic planning tools and methodologies",
        "Excellent presentation and communication abilities"
      ]
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
      tags: ["accounting", "consulting", "finance"],
      description: "Provide expert financial consulting services to clients, focusing on forward-thinking account management strategies and financial planning solutions.",
      responsibilities: [
        "Manage client accounts and provide strategic financial consulting",
        "Develop comprehensive financial plans and investment strategies",
        "Conduct financial analysis and risk assessment for client portfolios",
        "Build and maintain strong client relationships through regular communication",
        "Prepare detailed financial reports and presentations",
        "Stay updated on market trends and regulatory changes",
        "Collaborate with internal teams to deliver comprehensive financial solutions"
      ],
      skills: [
        "Financial Analysis and Planning",
        "Client Relationship Management",
        "Investment Strategy and Portfolio Management",
        "Financial Reporting and Compliance",
        "Risk Assessment and Market Analysis"
      ],
      experience: "5 years",
      degree: "Bachelor's",
      benefits: ["Health Insurance", "401k Matching", "Remote Work", "Professional Development", "Bonus Structure"],
      aboutCompany: "Miller Group is a trusted financial services firm providing comprehensive wealth management and financial consulting services to individuals and businesses.",
      requirements: [
        "Bachelor's degree in Finance, Accounting, or related field",
        "5+ years of experience in financial consulting or account management",
        "Strong analytical and problem-solving skills",
        "Knowledge of financial software and analysis tools",
        "Professional certifications (CPA, CFA) preferred"
      ]
    },
    {
      id: 7,
      title: "Senior Software Engineer",
      companyLogo: "💻",
      company: "TechFlow Solutions",
      category: "Technology",
      type: "Full time",
      salary: "$75000-$85000",
      location: "Seattle, USA",
      datePosted: "1 hour ago",
      workMode: "remote",
      tags: ["software", "engineering", "full-stack"],
      description: "Build scalable web applications using modern technologies, lead technical decisions, and mentor junior developers in our fast-growing startup environment.",
      responsibilities: [
        "Design and develop full-stack web applications using React, Node.js, and cloud services",
        "Lead architectural decisions and code reviews",
        "Mentor junior developers and conduct technical interviews",
        "Collaborate with product managers and designers on feature development",
        "Implement automated testing and CI/CD pipelines",
        "Optimize application performance and scalability",
        "Participate in on-call rotation for production support"
      ],
      skills: [
        "Full-stack Development (React, Node.js, Python)",
        "Cloud Platforms (AWS, Azure, GCP)",
        "Database Design and Management",
        "DevOps and CI/CD Implementation",
        "Technical Leadership and Mentoring"
      ],
      experience: "7 years",
      degree: "Bachelor's",
      benefits: ["Health Insurance", "Stock Options", "Unlimited PTO", "Remote Work", "Learning Budget"],
      aboutCompany: "TechFlow Solutions is an innovative startup developing cutting-edge SaaS platforms for enterprise clients, with a focus on scalability and user experience.",
      requirements: [
        "Bachelor's degree in Computer Science or related field",
        "7+ years of full-stack development experience",
        "Strong proficiency in React, Node.js, and modern JavaScript",
        "Experience with cloud platforms and containerization",
        "Strong problem-solving and communication skills"
      ]
    },
    {
      id: 8,
      title: "Marketing Manager",
      companyLogo: "📱",
      company: "Digital Dynamics",
      category: "Marketing",
      type: "Full time",
      salary: "$55000-$65000",
      location: "Austin, USA",
      datePosted: "2 hours ago",
      workMode: "hybrid",
      tags: ["marketing", "digital", "strategy"],
      description: "Lead comprehensive marketing campaigns, manage digital marketing channels, and drive brand awareness for our innovative digital products.",
      responsibilities: [
        "Develop and execute integrated marketing campaigns across multiple channels",
        "Manage social media presence and content marketing strategies",
        "Analyze marketing metrics and optimize campaign performance",
        "Collaborate with sales teams to generate qualified leads",
        "Coordinate with creative teams for marketing asset development",
        "Plan and execute events, webinars, and trade show participation",
        "Manage marketing budget allocation and ROI tracking"
      ],
      skills: [
        "Digital Marketing Strategy and Campaign Management",
        "Social Media Marketing and Content Creation",
        "Marketing Analytics and Performance Optimization",
        "Event Planning and Trade Show Management",
        "Budget Management and ROI Analysis"
      ],
      experience: "4 years",
      degree: "Bachelor's",
      benefits: ["Health Insurance", "401k", "Flexible Hours", "Professional Development", "Hybrid Work"],
      aboutCompany: "Digital Dynamics is a fast-growing marketing technology company helping businesses optimize their digital presence and customer engagement.",
      requirements: [
        "Bachelor's degree in Marketing, Communications, or related field",
        "4+ years of marketing experience, preferably in tech industry",
        "Strong analytical skills and experience with marketing tools",
        "Excellent written and verbal communication skills",
        "Experience with CRM and marketing automation platforms"
      ]
    }
  ]);

  const [statsData, setStatsData] = useState({
    appliedJobs: 589,
    favoriteJobs: 238,
    jobAlerts: 574
  });

  const [recentApplications, setRecentApplications] = useState([
    {
      id: 1,
      title: "Networking Engineer",
      type: "Remote",
      location: "Washington",
      salary: "$50k-80k/month",
      dateApplied: "Feb 2, 2019 19:28",
      status: "Active"
    },
    {
      id: 2,
      title: "Product Designer",
      type: "Full Time",
      location: "Dhaka",
      salary: "$50k-80k/month",
      dateApplied: "Dec 7, 2019 23:26",
      status: "Active"
    },
    {
      id: 3,
      title: "Junior Graphic Designer",
      type: "Temporary",
      location: "Brazil",
      salary: "$50k-80k/month",
      dateApplied: "Feb 2, 2019 19:28",
      status: "Active"
    },
    {
      id: 4,
      title: "Visual Designer",
      type: "Contract Base",
      location: "Wisconsin",
      salary: "$50k-80k/month",
      dateApplied: "Dec 7, 2019 23:26",
      status: "Active"
    }
  ]);

  const [userApplications, setUserApplications] = useState([
    {
      id: 1,
      company: "TechCorp",
      title: "Frontend Developer",
      status: "Applied",
      date: "Aug 22, 2025",
      notes: "Applied through company website. Seems like a great opportunity to work with modern React technologies."
    },
    {
      id: 2,
      company: "StartupXYZ",
      title: "Full Stack Developer",
      status: "Interviewing",
      date: "Aug 17, 2025",
      notes: "Had initial phone screen. Technical interview scheduled for next week. Very excited about this opportunity!"
    },
    {
      id: 3,
      company: "BigCorp",
      title: "Senior Developer",
      status: "Rejected",
      date: "Aug 12, 2025",
      notes: "Unfortunately did not move forward. Feedback was positive but they went with someone with more experience..."
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

  // Get job by ID
  const getJobById = (id) => {
    return jobs.find(job => job.id === parseInt(id));
  };

  // Get related jobs (excluding current job, limit of 3)
  const getRelatedJobs = (currentJobId, limit = 3) => {
    return jobs
      .filter(job => job.id !== parseInt(currentJobId))
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

  const [favourites, setFavourites] = useState([]);

  const toggleFavourite = (jobId) => {

    setFavourites((prev) =>
      prev.includes(jobId)
        ? prev.filter((id) => id !== jobId)
        : [...prev, jobId]
    );
  };

  const isJobFavourited = (jobId) => favourites.includes(jobId);


  const value = {
    jobs,
    filteredJobs,
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
  };

  return (
    <JobContext.Provider value={value}>
      {children}
    </JobContext.Provider>
  );
};