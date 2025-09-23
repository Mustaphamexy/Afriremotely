import React, { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useJobContext } from "../../context/JobContext";
import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";
import { Hands } from '../../components/UI/Details'
import Loader from "../../components/layout/LoadingSpinner"

const UserDashboard = () => {
  const { loading } = useContext(AuthContext);
  const { user, logout } = useContext(AuthContext);
  const { statsData, recentApplications, userApplications } = useJobContext();
  const [activeTab, setActiveTab] = useState("overview");
  const [favoriteJobsFilter, setFavoriteJobsFilter] = useState(75);
  const [appliedJobsFilter, setAppliedJobsFilter] = useState(60);

  const profileCompletion = 65;

  if (loading) {
      return (
        <div className="min-h-screen">
          <Header bgClass="bg-black" />
          <div className="flex items-center justify-center min-h-screen">
            <Loader />
          </div>
          <Footer />
        </div>
      );
    }

  return (
    <div className="min-h-screen ">
      <Header />
      <div className="py-32 bg-black">
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
            <p className="text-white">
              Here is your daily activities and job alerts
            </p>
          </div>

          {/* Dashboard Navigation */}
          <div className="border-b border-gray-200 mb-6">
            <nav className="flex space-x-8 overflow-x-auto">
              {["overview", "applications", "favorite jobs", ].map(
                (tab) => (
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
                )
              )}
            </nav>
          </div>

          {/* Tab Content */}
          {activeTab === "overview" && (
            <div>
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white p-6 rounded-lg shadow">
                  <h3 className="text-lg font-medium text-gray-500">
                    Applied jobs
                  </h3>
                  <p className="text-3xl font-bold text-teal-600">
                    {statsData.appliedJobs}
                  </p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow">
                  <h3 className="text-lg font-medium text-gray-500">
                    Favorite jobs
                  </h3>
                  <p className="text-3xl font-bold text-teal-600">
                    {statsData.favoriteJobs}
                  </p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow">
                  <h3 className="text-lg font-medium text-gray-500">
                    Job Alerts
                  </h3>
                  <p className="text-3xl font-bold text-teal-600">
                    {statsData.jobAlerts}
                  </p>
                </div>
              </div>

              {/* Profile Completion */}
              <div className="bg-white p-6 rounded-lg shadow mb-8">
                <h3 className="text-lg font-medium text-gray-800 mb-4">
                  Your profile editing is not completed.
                </h3>
                <div className="mb-4">
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                      className="bg-teal-600 h-2.5 rounded-full"
                      style={{ width: `${profileCompletion}%` }}
                    ></div>
                  </div>
                  <p className="text-sm text-gray-600 mt-2">
                    {profileCompletion}% complete
                  </p>
                </div>
                <p className="text-gray-600 mb-4">
                  Complete your profile editing & build your custom Resume
                </p>
                <button className="bg-teal-600 hover:bg-teal-700 text-white font-medium py-2 px-4 rounded">
                  Edit Profile
                </button>
              </div>

              {/* Recent Applications */}
              <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                  <h3 className="text-lg font-medium text-gray-800">
                    Recently Applied
                  </h3>
                  <button className="text-teal-600 hover:text-teal-800 font-medium">
                    View all
                  </button>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Job
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Date Applied
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Status
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {recentApplications.map((application) => (
                        <tr key={application.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">
                              {application.title}
                            </div>
                            <div className="text-sm text-gray-500">
                              {application.type} | {application.location} |{" "}
                              {application.salary}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {application.dateApplied}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                              {application.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <a
                              href="#"
                              className="text-teal-600 hover:text-teal-900"
                            >
                              View Details
                            </a>
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
              <div className="bg-white rounded-lg shadow overflow-hidden mb-6">
                <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                  <h3 className="text-lg font-medium text-gray-800">
                    My Applications
                  </h3>
                  <div className="flex flex-col md:flex-row  gap-4">
                    <select className="border border-gray-300 rounded-md px-3 py-2 text-sm">
                      <option>All Status</option>
                      <option>Applied</option>
                      <option>Interviewing</option>
                      <option>Rejected</option>
                    </select>
                    <select className="border border-gray-300 rounded-md px-3 py-2 text-sm">
                      <option>Latest First</option>
                      <option>Oldest First</option>
                    </select>
                  </div>
                </div>
                <div className="p-6">
                  {/* Application List */}
                  {userApplications.map((application) => (
                    <div
                      key={application.id}
                      className="border-b border-gray-200 pb-4 mb-4"
                    >
                      <div className="flex items-center mb-2">
                        <input
                          type="checkbox"
                          className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded"
                        />
                        <h4 className="ml-2 font-medium text-gray-900">
                          {application.company}
                        </h4>
                      </div>
                      <h5 className="font-bold text-lg text-gray-800">
                        {application.title}
                      </h5>
                      <div className="flex items-center mt-1">
                        <span className="text-sm text-gray-600">
                          {application.status}
                        </span>
                        <span className="mx-2 text-gray-400">•</span>
                        <span className="text-sm text-gray-600">
                          {application.date}
                        </span>
                      </div>
                      <p className="mt-2 text-gray-600">{application.notes}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "favorite jobs" && (
            <div>
              <div className="bg-white rounded-lg shadow overflow-hidden mb-6">
                <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                  <h3 className="text-lg font-medium text-gray-800">
                    My Favorite Jobs
                  </h3>
                  <div className="flex flex-col md:flex-row gap-4">
                    <select className="border border-gray-300 rounded-md px-3 py-2 text-sm">
                      <option>All Categories</option>
                      <option>Technology</option>
                      <option>Marketing</option>
                      <option>Design</option>
                    </select>
                    <select className="border border-gray-300 rounded-md px-3 py-2 text-sm">
                      <option>Recently Added</option>
                      <option>Salary High to Low</option>
                      <option>Salary Low to High</option>
                    </select>
                  </div>
                </div>
                <div className="p-6">
                  {/* Favorite Jobs List */}
                  {[
                    {
                      id: 1,
                      title: "Senior React Developer",
                      company: "TechCorp Inc.",
                      location: "San Francisco, CA",
                      salary: "$120,000 - $150,000",
                      type: "Full-time",
                      dateAdded: "Oct 12, 2023",
                      tags: ["React", "TypeScript", "Node.js"]
                    },
                    {
                      id: 2,
                      title: "UX/UI Designer",
                      company: "Creative Studios",
                      location: "Remote",
                      salary: "$80,000 - $110,000",
                      type: "Full-time",
                      dateAdded: "Oct 10, 2023",
                      tags: ["Figma", "Adobe XD", "Prototyping"]
                    },
                    {
                      id: 3,
                      title: "Product Manager",
                      company: "StartupXYZ",
                      location: "New York, NY",
                      salary: "$100,000 - $130,000",
                      type: "Full-time",
                      dateAdded: "Oct 8, 2023",
                      tags: ["Product Strategy", "Analytics", "Agile"]
                    }
                  ].map((job) => (
                    <div
                      key={job.id}
                      className="border border-gray-200 rounded-lg p-4 mb-4 hover:shadow-md transition-shadow"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="font-bold text-lg text-gray-800">{job.title}</h4>
                          <p className="text-gray-600">{job.company}</p>
                        </div>
                        <button className="text-red-500 hover:text-red-700">
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                          </svg>
                        </button>
                      </div>
                      
                      <div className="flex items-center text-sm text-gray-600 mb-2">
                        <span>{job.type}</span>
                        <span className="mx-2">•</span>
                        <span>{job.location}</span>
                        <span className="mx-2">•</span>
                        <span className="font-medium text-teal-600">{job.salary}</span>
                      </div>

                      <div className="flex flex-wrap gap-2 mb-3">
                        {job.tags.map((tag, index) => (
                          <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                            {tag}
                          </span>
                        ))}
                      </div>

                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-500">Added on {job.dateAdded}</span>
                        <div className="flex space-x-2">
                          <button className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded text-sm">
                            Apply Now
                          </button>
                          <button className="border border-gray-300 hover:bg-gray-50 text-gray-700 px-4 py-2 rounded text-sm">
                            View Details
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default UserDashboard;