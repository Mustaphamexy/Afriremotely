import React, { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useJobContext } from "../../context/JobContext";
import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";
import { Hands } from '../../components/UI/Details'

const UserDashboard = () => {
  const { user, logout } = useContext(AuthContext);
  const { statsData, recentApplications, userApplications } = useJobContext();
  const [activeTab, setActiveTab] = useState("overview");

  const profileCompletion = 65;

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
            <nav className="flex space-x-8">
              {["overview", "applications", "profile", "reporting"].map(
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
                  <div className="flex space-x-4">
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

          {activeTab === "profile" && (
            <div className="bg-white rounded-lg shadow overflow-hidden p-6">
              <h3 className="text-lg font-medium text-gray-800 mb-6">
                Manage Profile
              </h3>
              <form className="space-y-6">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                      defaultValue={user?.name || ""}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                      defaultValue={user?.email || ""}
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="headline"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Professional Headline
                  </label>
                  <input
                    type="text"
                    id="headline"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                    placeholder="e.g. Frontend Developer"
                  />
                </div>

                <div>
                  <label
                    htmlFor="bio"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Bio/Description
                  </label>
                  <textarea
                    id="bio"
                    rows="4"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                    placeholder="Tell employers about yourself..."
                  ></textarea>
                </div>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="location"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Location
                    </label>
                    <input
                      type="text"
                      id="location"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                      placeholder="e.g. New York, USA"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
                    type="button"
                    className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>
          )}

          {activeTab === "reporting" && (
            <div>
              <div className="bg-white rounded-lg shadow overflow-hidden mb-6">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h3 className="text-lg font-medium text-gray-800">
                    Application Statistics
                  </h3>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                    <div className="bg-teal-50 p-4 rounded-lg border border-teal-100">
                      <p className="text-sm text-teal-800 font-medium">
                        Total Applications
                      </p>
                      <p className="text-2xl font-bold text-teal-700">24</p>
                    </div>
                    <div className="bg-teal-50 p-4 rounded-lg border border-teal-100">
                      <p className="text-sm text-teal-800 font-medium">
                        Interview Rate
                      </p>
                      <p className="text-2xl font-bold text-teal-700">33%</p>
                    </div>
                    <div className="bg-teal-50 p-4 rounded-lg border border-teal-100">
                      <p className="text-sm text-teal-800 font-medium">
                        Rejection Rate
                      </p>
                      <p className="text-2xl font-bold text-teal-700">17%</p>
                    </div>
                    <div className="bg-teal-50 p-4 rounded-lg border border-teal-100">
                      <p className="text-sm text-teal-800 font-medium">
                        Avg. Response Time
                      </p>
                      <p className="text-2xl font-bold text-teal-700">
                        5.2 days
                      </p>
                    </div>
                  </div>

                  <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center mb-6">
                    <p className="text-gray-500">
                      Application Trend Chart Would Appear Here
                    </p>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-800 mb-4">
                      Applications by Status
                    </h4>
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium text-gray-700">
                            Applied
                          </span>
                          <span className="text-sm font-medium text-gray-700">
                            12
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div
                            className="bg-teal-600 h-2.5 rounded-full"
                            style={{ width: "50%" }}
                          ></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium text-gray-700">
                            Interviewing
                          </span>
                          <span className="text-sm font-medium text-gray-700">
                            8
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div
                            className="bg-teal-500 h-2.5 rounded-full"
                            style={{ width: "33%" }}
                          ></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium text-gray-700">
                            Rejected
                          </span>
                          <span className="text-sm font-medium text-gray-700">
                            4
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div
                            className="bg-teal-400 h-2.5 rounded-full"
                            style={{ width: "17%" }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          {/* Other tabs remain the same as in the previous implementation */}
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default UserDashboard;
