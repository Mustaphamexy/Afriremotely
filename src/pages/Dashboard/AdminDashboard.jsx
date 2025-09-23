import React, { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useJobContext } from "../../context/JobContext";
import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";
import Loader from "../../components/layout/LoadingSpinner";
import { Hands } from '../../components/UI/Details'
import { HiOutlineUsers } from "react-icons/hi";
import { FaRegBuilding } from "react-icons/fa";
import { FaRegClipboard } from "react-icons/fa";
import { IoSettingsOutline } from "react-icons/io5";
import Modal from "../../components/UI/Modal";
import JobForm from "../../components/forms/JobForm";

const AdminDashboard = () => {
  const { user, logout } = useContext(AuthContext);
  const { loading } = useJobContext();
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const adminStats = {
    totalUsers: 1245,
    totalCompanies: 356,
    totalJobs: 1243,
    pendingApprovals: 12
  };

  const handleCreateJobClick = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="flex items-center justify-center min-h-screen">
          <Loader />
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Header />
      <div className="pt-32 pb-12 bg-black">
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <div className="flex gap-2">
              <h2 className="text-2xl font-bold text-white">
                Admin Panel
              </h2>
              <img src={Hands} alt="Waving hand"
                className=" w-[30px] object-contain" />
            </div>
            
            <p className="text-secondary-300">Manage users, companies, and platform settings</p>
          </div>

          {/* Admin-specific dashboard content */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-medium text-neutral-500">Total Users</h3>
              <p className="text-3xl font-bold text-primary-600">{adminStats.totalUsers}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-medium text-neutral-500">Total Companies</h3>
              <p className="text-3xl font-bold text-primary-600">{adminStats.totalCompanies}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-medium text-neutral-500">Total Jobs</h3>
              <p className="text-3xl font-bold text-primary-600">{adminStats.totalJobs}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-medium text-neutral-500">Pending Approvals</h3>
              <p className="text-3xl font-bold text-primary-600">{adminStats.pendingApprovals}</p>
            </div>
          </div>

          <div className="mb-8 flex justify-end">
            <button 
              onClick={handleCreateJobClick}
              className="bg-teal-600 hover:bg-teal-700 text-white font-medium py-3 px-6 rounded-lg shadow-lg transition-colors duration-200"
            >
              + Create New Job
            </button>
          </div>

          {/* Admin actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white p-6 rounded-lg shadow text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-md bg-primary-100 text-primary-600">
                <HiOutlineUsers className="w-6 h-6" />
              </div>
              <h3 className="mt-4 text-lg font-medium text-neutral-900">Manage Users</h3>
              <p className="mt-2 text-sm text-neutral-500">View, edit, or delete user accounts</p>
              <button className="mt-4 bg-primary-600 hover:bg-primary-700 text-white font-medium py-2 px-4 rounded">
                Manage
              </button>
            </div>

            <div className="bg-white p-6 rounded-lg shadow text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-md bg-primary-100 text-primary-600">
                <FaRegBuilding  className="w-6 h-6"/>
              </div>
              <h3 className="mt-4 text-lg font-medium text-neutral-900">Manage Companies</h3>
              <p className="mt-2 text-sm text-neutral-500">Approve or manage company accounts</p>
              <button className="mt-4 bg-primary-600 hover:bg-primary-700 text-white font-medium py-2 px-4 rounded">
                Manage
              </button>
            </div>

            <div className="bg-white p-6 rounded-lg shadow text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-md bg-primary-100 text-primary-600">
                <FaRegClipboard  className="w-6 h-6"/>
              </div>
              <h3 className="mt-4 text-lg font-medium text-neutral-900">Job Moderation</h3>
              <p className="mt-2 text-sm text-neutral-500">Review and approve job postings</p>
              <button className="mt-4 bg-primary-600 hover:bg-primary-700 text-white font-medium py-2 px-4 rounded">
                Manage
              </button>
            </div>

            <div className="bg-white p-6 rounded-lg shadow text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-md bg-primary-100 text-primary-600">
                <IoSettingsOutline  className="w-6 h-6"/>
              </div>
              <h3 className="mt-4 text-lg font-medium text-neutral-900">Platform Settings</h3>
              <p className="mt-2 text-sm text-neutral-500">Configure system settings and preferences</p>
              <button className="mt-4 bg-primary-600 hover:bg-primary-700 text-white font-medium py-2 px-4 rounded">
                Manage
              </button>
            </div>
          </div>
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

export default AdminDashboard