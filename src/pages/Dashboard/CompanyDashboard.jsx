import React, { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useJobContext } from "../../context/JobContext";
import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";
import { Hands } from '../../components/UI/Details'
import Modal from "../../components/UI/Modal";
import JobForm from "../../components/forms/JobForm";

const CompanyDashboard = () => {
    const { user, logout } = useContext(AuthContext);
    const [activeTab, setActiveTab] = useState('overview');
      const [isModalOpen, setIsModalOpen] = useState(false);

    const handleCreateJobClick = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

    const companyStats = {
        totalJobs: 24,
        activeJobs: 18,
        totalApplications: 156,
        newApplications: 12
    };

    const recentApplications = [
        {
            id: 1,
            applicant: 'John Doe',
            position: 'Frontend Developer',
            date: 'Oct 15, 2023',
            status: 'New'
        },
        {
            id: 2,
            applicant: 'Jane Smith',
            position: 'UX Designer',
            date: 'Oct 14, 2023',
            status: 'Reviewed'
        },
        {
            id: 3,
            applicant: 'Robert Johnson',
            position: 'Backend Developer',
            date: 'Oct 14, 2023',
            status: 'Interview'
        }
    ];

    const createdJobs = [
        {
            id: 1,
            title: 'Senior Frontend Developer',
            department: 'Engineering',
            type: 'Full-time',
            location: 'Remote',
            salary: '$80,000 - $120,000',
            datePosted: 'Oct 10, 2023',
            status: 'Active',
            applications: 12
        },
        {
            id: 2,
            title: 'UX Designer',
            department: 'Design',
            type: 'Full-time',
            location: 'New York',
            salary: '$70,000 - $95,000',
            datePosted: 'Oct 8, 2023',
            status: 'Active',
            applications: 8
        },
        {
            id: 3,
            title: 'Backend Developer',
            department: 'Engineering',
            type: 'Contract',
            location: 'San Francisco',
            salary: '$90,000 - $130,000',
            datePosted: 'Oct 5, 2023',
            status: 'Paused',
            applications: 15
        }
    ];

    const handleEditJob = (jobId) => {
        console.log("Edit job:", jobId);
        // Add edit functionality here
    };

    const handleDeleteJob = (jobId) => {
        console.log("Delete job:", jobId);
        // Add delete functionality here
    };

    const handleViewDetails = (jobId) => {
        console.log("View job details:", jobId);
        // Add view details functionality here
    };

    return (
        <div className="min-h-screen"> 
            <Header />
            <div className='pt-32 pb-12 bg-black'>
                <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    {/* Welcome Section */}
                    <div className="mb-8">
                        <div className="flex gap-2">
                            <h2 className="text-2xl font-bold text-white">
                                Welcome, {user.name} 
                            </h2>
                            <img src={Hands} alt="Waving hand"
                                className=" w-[30px] object-contain" />
                        </div>
                        <p className="text-white">Manage your job postings and applications</p>
                    </div>

                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                        <div className="bg-white p-6 rounded-lg shadow">
                            <h3 className="text-lg font-medium text-neutral-500">Total Jobs</h3>
                            <p className="text-3xl font-bold text-primary-600">{companyStats.totalJobs}</p>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow">
                            <h3 className="text-lg font-medium text-neutral-500">Active Jobs</h3>
                            <p className="text-3xl font-bold text-primary-600">{companyStats.activeJobs}</p>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow">
                            <h3 className="text-lg font-medium text-neutral-500">Total Applications</h3>
                            <p className="text-3xl font-bold text-primary-600">{companyStats.totalApplications}</p>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow">
                            <h3 className="text-lg font-medium text-neutral-500">New Applications</h3>
                            <p className="text-3xl font-bold text-primary-600">{companyStats.newApplications}</p>
                        </div>
                    </div>

                    {/* Create Job Button */}
                    <div className="mb-8 flex justify-end">
                        <button onClick={handleCreateJobClick} className="bg-teal-600 hover:bg-teal-700 text-white font-medium py-3 px-6 rounded-lg shadow-lg transition-colors duration-200">
                            + Create New Job
                        </button>
                    </div>

                    {/* Dashboard Navigation */}
                    <div className="border-b border-gray-200 mb-6">
                        <nav className="flex space-x-8">
                            {["overview", "jobs", "applications", "analytics"].map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`py-4 px-1 border-b-2 font-medium text-sm capitalize ${
                                        activeTab === tab
                                            ? "border-teal-500 text-teal-600"
                                            : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                                    }`}
                                >
                                    {tab}
                                </button>
                            ))}
                        </nav>
                    </div>

                    {/* Tab Content */}
                    {activeTab === "overview" && (
                        <div>
                            {/* Recent Applications */}
                            <div className="bg-white rounded-lg shadow overflow-hidden">
                                <div className="px-6 py-4 border-b border-neutral-200">
                                    <h3 className="text-lg font-medium text-neutral-800">Recent Applications</h3>
                                </div>
                                <div className="overflow-x-auto">
                                    <table className="min-w-full divide-y divide-neutral-200">
                                        <thead className="bg-neutral-50">
                                            <tr className="bg-secondary-100 text-black">
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Applicant</th>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Position</th>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Date</th>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Status</th>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-neutral-200">
                                            {recentApplications.map((application) => (
                                                <tr key={application.id}>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-neutral-900">{application.applicant}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-500">{application.position}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-500">{application.date}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                                            {application.status}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                        <a href="#" className="text-primary-600 hover:text-primary-900">View</a>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === "jobs" && (
                        <div>
                            <div className="bg-white rounded-lg shadow overflow-hidden mb-6">
                                <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                                    <h3 className="text-lg font-medium text-gray-800">My Job Postings</h3>
                                    <div className="flex space-x-4">
                                        <select className="border border-gray-300 rounded-md px-3 py-2 text-sm">
                                            <option>All Status</option>
                                            <option>Active</option>
                                            <option>Paused</option>
                                            <option>Closed</option>
                                        </select>
                                        <select className="border border-gray-300 rounded-md px-3 py-2 text-sm">
                                            <option>Latest First</option>
                                            <option>Oldest First</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="overflow-x-auto">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Job Title</th>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Applications</th>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {createdJobs.map((job) => (
                                                <tr key={job.id}>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="text-sm font-medium text-gray-900">{job.title}</div>
                                                        <div className="text-sm text-gray-500">{job.type} | {job.location} | {job.salary}</div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{job.department}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{job.applications}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                                            job.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                                                        }`}>
                                                            {job.status}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                        <div className="flex space-x-2">
                                                            <button
                                                                onClick={() => handleViewDetails(job.id)}
                                                                className="text-teal-600 hover:text-teal-900"
                                                            >
                                                                Details
                                                            </button>
                                                            <button
                                                                onClick={() => handleEditJob(job.id)}
                                                                className="text-blue-600 hover:text-blue-900"
                                                            >
                                                                Edit
                                                            </button>
                                                            <button
                                                                onClick={() => handleDeleteJob(job.id)}
                                                                className="text-red-600 hover:text-red-900"
                                                            >
                                                                Delete
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === "applications" && (
                        <div>
                            <div className="bg-white rounded-lg shadow overflow-hidden">
                                <div className="px-6 py-4 gap-4 border-b border-gray-200 flex justify-between items-center">
                                    <h3 className="text-lg  font-medium text-gray-800">All Applications</h3>
                                    <div className="flex flex-col sm:flex-row gap-4 space-x-4">
                                        <select className="border border-gray-300 rounded-md px-3 py-2 text-sm">
                                            <option>All Jobs</option>
                                            <option>Frontend Developer</option>
                                            <option>UX Designer</option>
                                            <option>Backend Developer</option>
                                        </select>
                                        <select className="border border-gray-300 rounded-md px-3 py-2 text-sm">
                                            <option>All Status</option>
                                            <option>New</option>
                                            <option>Reviewed</option>
                                            <option>Interview</option>
                                            <option>Rejected</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="overflow-x-auto">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Applicant</th>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Position</th>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Applied Date</th>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {recentApplications.map((application) => (
                                                <tr key={application.id}>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="text-sm font-medium text-gray-900">{application.applicant}</div>
                                                        <div className="text-sm text-gray-500">applicant@email.com</div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{application.position}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{application.date}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                                            {application.status}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                        <div className="flex space-x-2">
                                                            <button className="text-teal-600 hover:text-teal-900">View Resume</button>
                                                            <button className="text-blue-600 hover:text-blue-900">Schedule Interview</button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === "analytics" && (
                        <div>
                            <div className="bg-white rounded-lg shadow overflow-hidden mb-6">
                                <div className="px-6 py-4 border-b border-gray-200">
                                    <h3 className="text-lg font-medium text-gray-800">Hiring Analytics</h3>
                                </div>
                                <div className="p-6">
                                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                                        <div className="bg-teal-50 p-4 rounded-lg border border-teal-100">
                                            <p className="text-sm text-teal-800 font-medium">Avg. Applications per Job</p>
                                            <p className="text-2xl font-bold text-teal-700">6.5</p>
                                        </div>
                                        <div className="bg-teal-50 p-4 rounded-lg border border-teal-100">
                                            <p className="text-sm text-teal-800 font-medium">Time to Fill</p>
                                            <p className="text-2xl font-bold text-teal-700">21 days</p>
                                        </div>
                                        <div className="bg-teal-50 p-4 rounded-lg border border-teal-100">
                                            <p className="text-sm text-teal-800 font-medium">Interview Rate</p>
                                            <p className="text-2xl font-bold text-teal-700">24%</p>
                                        </div>
                                        <div className="bg-teal-50 p-4 rounded-lg border border-teal-100">
                                            <p className="text-sm text-teal-800 font-medium">Hire Rate</p>
                                            <p className="text-2xl font-bold text-teal-700">8%</p>
                                        </div>
                                    </div>

                                    <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center mb-6">
                                        <p className="text-gray-500">Hiring Funnel Chart Would Appear Here</p>
                                    </div>

                                    <div>
                                        <h4 className="font-medium text-gray-800 mb-4">Applications by Department</h4>
                                        <div className="space-y-3">
                                            <div>
                                                <div className="flex justify-between mb-1">
                                                    <span className="text-sm font-medium text-gray-700">Engineering</span>
                                                    <span className="text-sm font-medium text-gray-700">35</span>
                                                </div>
                                                <div className="w-full bg-gray-200 rounded-full h-2.5">
                                                    <div className="bg-teal-600 h-2.5 rounded-full" style={{ width: "70%" }}></div>
                                                </div>
                                            </div>
                                            <div>
                                                <div className="flex justify-between mb-1">
                                                    <span className="text-sm font-medium text-gray-700">Design</span>
                                                    <span className="text-sm font-medium text-gray-700">8</span>
                                                </div>
                                                <div className="w-full bg-gray-200 rounded-full h-2.5">
                                                    <div className="bg-teal-500 h-2.5 rounded-full" style={{ width: "16%" }}></div>
                                                </div>
                                            </div>
                                            <div>
                                                <div className="flex justify-between mb-1">
                                                    <span className="text-sm font-medium text-gray-700">Marketing</span>
                                                    <span className="text-sm font-medium text-gray-700">7</span>
                                                </div>
                                                <div className="w-full bg-gray-200 rounded-full h-2.5">
                                                    <div className="bg-teal-400 h-2.5 rounded-full" style={{ width: "14%" }}></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </main>
            </div>
            <Footer />

            {/* Modal for Job Form */}
            {isModalOpen && (
              <Modal onClose={handleModalClose}>
                <JobForm onSuccess={handleModalClose} onCancel={handleModalClose} />
              </Modal>
            )}
        </div>
    )
}

export default CompanyDashboard