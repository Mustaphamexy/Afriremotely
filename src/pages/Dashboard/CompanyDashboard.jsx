import React, { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useJobContext } from "../../context/JobContext";
import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";
import { Hands } from '../../components/UI/Details'


const CompanyDashboard = () => {
    const { user, logout } = useContext(AuthContext);
    const [activeTab, setActiveTab] = useState('overview');


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

  return (
    <div className="min-h-screen"> 
        <Header />
        <div className='pt-32 pb-12 bg-black'>
             <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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

        {/* Company-specific dashboard content */}
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

        {/* Recent Applications */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 border-b border-neutral-200">
            <h3 className="text-lg font-medium text-neutral-800">Recent Applications</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-neutral-200">
              <thead className="bg-neutral-50">
                <tr className="bg-secondary-100 text-black">
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider">Applicant</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider">Position</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider">Date</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider">Status</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider">Action</th>
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
      </main>
        </div>
        <Footer />

    </div>
  )
}

export default CompanyDashboard