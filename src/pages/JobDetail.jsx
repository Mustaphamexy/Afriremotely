import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { JobProvider, useJobContext } from "../context/JobContext";
import { AuthContext } from "../context/AuthContext";
import Footer from "../components/layout/Footer";
import Header from "../components/layout/Header";
import Loader from "../components/layout/LoadingSpinner";
import Modal from "../components/UI/Modal";
import { MdError } from "react-icons/md";
import JobList from "../components/jobs/JobList";
import Button from "../components/UI/Button";
import { IoArrowBackSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { LuBookmarkPlus, LuBookmark } from "react-icons/lu";
import { FiUpload, FiFile } from "react-icons/fi";
import { toast } from "react-toastify";

const JobDetail = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const { id } = useParams();
  const { getJobById, addApplication, loading } = useJobContext();
  const { toggleFavourite, isJobFavourited } = useJobContext();

  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [isApplying, setIsApplying] = useState(false);
  const [useExistingCV, setUseExistingCV] = useState(true);
  const [newCVFile, setNewCVFile] = useState(null);
  const [job, setJob] = useState(null);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const jobData = await getJobById(id);
        setJob(jobData);
      } catch (error) {
      }
    };

    if (id) {
      fetchJob();
    }
  }, [id, getJobById]);

  const handleApplyClick = () => {
    if (!user) {
      // Redirect to login if not authenticated
      navigate("/sign-in");
      return;
    }
    setIsApplyModalOpen(true);
  };

  const handleApplyModalClose = () => {
    setIsApplyModalOpen(false);
    setUseExistingCV(true);
    setNewCVFile(null);
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.type === "application/pdf") {
      setNewCVFile(file);
    } else {
      toast.error("Please upload a PDF file only");
    }
  };

  const handleSubmitApplication = async () => {
    setIsApplying(true);

    // Simulate application submission delay
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Add application to context
    const applicationData = {
      company: job.company,
      title: job.title,
      status: "Applied",
      notes: useExistingCV
        ? "Applied with existing CV"
        : `Applied with new CV: ${newCVFile?.name}`,
    };

    addApplication(applicationData);

    setIsApplying(false);
    setIsApplyModalOpen(false);

    // Show success message or redirect
    toast.success("Application submitted successfully!");
  };

  const handleFavourite = () => {
    if (!user) {
      navigate("/sign-in");
      return;
    }
    toggleFavourite(job.id);
  };


  if (loading) {
    return (
      <div className="min-h-screen bg-black">
        <Header />
        <div className="flex items-center justify-center min-h-screen">
          <Loader />
        </div>
        <Footer />
      </div>
    );
  }

  if (!job) {
    return (
      <div className="min-h-screen bg-black ">
        <Header />
        <div className="py-28 text-white ">
          <div className="container mx-auto text-center flex justify-center">
            <div className="flex flex-col items-center">
              <MdError className="w-20 h-20 text-red-500" />
              <h2 className="text-5xl">Job not found</h2>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Header />
      <div className="bg-black text-white pt-32 pb-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">Job Details</h1>
          <p className="text-secondary-400">Apply for your dream job</p>
        </div>
      </div>
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between py-4">
          <Button
            variant="primary"
            size="md"
            className="cursor-pointer flex items-center gap-2"
            onClick={() => navigate(-1)}
          >
            <IoArrowBackSharp /> Back
          </Button>
          <div className="flex gap-4">
            <div className="relative group flex flex-col items-center">
              <div
                onClick={handleFavourite}
                className="cursor-pointer"
              >
                {isJobFavourited(job.id) ? (
                  <LuBookmark className="w-12 h-12 text-primary fill-primary-500" />
                ) : (
                  <LuBookmarkPlus className="w-12 h-12 text-primary" />
                )}
              </div>

              <span
                className="absolute top-[-2rem] opacity-0 group-hover:opacity-100 transition 
               bg-gray-800 text-white text-xs px-3 py-1 mt-2 rounded-md shadow-md whitespace-nowrap inline-block"
              >
                Save Job
              </span>
            </div>
            <Button
              variant="primary"
              size="md"
              className="cursor-pointer"
              onClick={handleApplyClick}
            >
              Apply
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <div className="flex items-center mb-4">
                <span className="text-3xl mr-4 bg-secondary-300 p-4 rounded-lg">
                  {job.companyLogo}
                </span>
                <div>
                  <h1 className="text-2xl font-bold">{job.title}</h1>
                  <p className="text-neutral-600">{job.company}</p>
                </div>
              </div>

              {/* Description */}
              <div className="mb-6">
                <h2 className="text-xl font-bold mb-3">Job Description</h2>
                <p className="text-neutral-700">{job.description}</p>
              </div>

              {/* Responsibilities */}
              <div className="mb-6">
                <h2 className="text-xl font-bold mb-3">Responsibilities</h2>
                <ul className="list-disc list-inside text-neutral-700">
                  {job.responsibilities.map((item, index) => (
                    <li key={index} className="mb-1">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Requirements */}
              <div className="mb-6">
                <h2 className="text-xl font-bold mb-3">Requirements</h2>
                <ul className="list-disc list-inside text-neutral-700">
                  {job.requirements.map((item, index) => (
                    <li key={index} className="mb-1">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Skills */}
              <div className="mb-6">
                <h2 className="text-xl font-bold mb-3">Skills</h2>
                <div className="flex flex-wrap gap-2">
                  {job.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="bg-secondary-100 text-primary-900 px-3 py-1 rounded-full text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <h2 className="text-xl font-bold mb-3">Tags</h2>
                <div className="flex flex-wrap gap-2">
                  {job.tags.map((benefit, index) => (
                    <span
                      key={index}
                      className="bg-primary-100 text-black px-3 py-1 rounded-full text-sm"
                    >
                      {benefit}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="text-xl font-bold mb-3">About Company</h2>
                <p className="text-neutral-700">{job.aboutCompany}</p>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="flex flex-col gap-4 bg-secondary-200 rounded-lg shadow-md p-6 mb-6">
              <div>
                <p className="text-neutral-500 text-sm">Job Type</p>
                <p className="font-medium">{job.type}</p>
              </div>
              <div>
                <p className="text-neutral-500 text-sm">Job Mode</p>
                <p className="font-medium">{job.workMode}</p>
              </div>
              <div>
                <p className="text-neutral-500 text-sm">Category</p>
                <p className="font-medium">{job.category}</p>
              </div>
              <div>
                <p className="text-neutral-500 text-sm">Experience</p>
                <p className="font-medium">{job.experience}</p>
              </div>
              <div>
                <p className="text-neutral-500 text-sm">Degree</p>
                <p className="font-medium">{job.degree}</p>
              </div>
              <div className="">
                <p className="text-neutral-500 text-sm">Offered Salary</p>
                <p className="font-medium text-lg">{job.salary}</p>
              </div>

              <div className="">
                <p className="text-neutral-500 text-sm">Location</p>
                <p className="font-medium">{job.location}</p>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-secondary-300 rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-xl font-bold mb-4">Send Us Message</h2>
              <form>
                <div className="mb-4">
                  <label
                    className="block text-neutral-700 text-sm font-medium mb-1"
                    htmlFor="fullName"
                  >
                    Full name
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    className="w-full px-3 py-2 bg-gray-100 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder="Your full name"
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block text-neutral-700 text-sm font-medium mb-1"
                    htmlFor="email"
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-3 py-2 bg-gray-100 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder="Your email address"
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block text-neutral-700 text-sm font-medium mb-1"
                    htmlFor="phone"
                  >
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    className="w-full px-3 py-2 bg-gray-100 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder="Your phone number"
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block text-neutral-700 text-sm font-medium mb-1"
                    htmlFor="message"
                  >
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    rows="4"
                    className="w-full px-3 py-2 bg-gray-100 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder="Your message"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full bg-primary-600 text-white py-2 px-4 rounded-md hover:bg-primary-700 transition duration-200"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Job List */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold mb-4">Latest Job Openings</h2>
          <JobList limit={3} showPagination={false} />
        </div>
      </div>

      {/* Apply Modal */}
      {isApplyModalOpen && (
        <Modal onClose={handleApplyModalClose}>
          <div className="max-w-md mx-auto">
            <h2 className="text-2xl font-bold mb-6 text-center">
              Apply for {job.title}
            </h2>

            <div className="mb-6">
              <p className="text-gray-600 mb-4">
                Choose how you'd like to apply:
              </p>

              {/* CV Options */}
              <div className="space-y-4">
                <div
                  className={`border-2 rounded-lg p-4 cursor-pointer transition-colors ${
                    useExistingCV
                      ? "border-teal-500 bg-teal-50"
                      : "border-gray-300 hover:border-gray-400"
                  }`}
                  onClick={() => setUseExistingCV(true)}
                >
                  <div className="flex items-center">
                    <input
                      type="radio"
                      name="cvOption"
                      checked={useExistingCV}
                      onChange={() => setUseExistingCV(true)}
                      className="mr-3 text-teal-600"
                    />
                    <div className="flex items-center">
                      <FiFile className="text-teal-600 mr-2" />
                      <div>
                        <p className="font-medium">Use existing CV</p>
                        <p className="text-sm text-gray-500">
                          Apply with your current CV on file
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  className={`border-2 rounded-lg p-4 cursor-pointer transition-colors ${
                    !useExistingCV
                      ? "border-teal-500 bg-teal-50"
                      : "border-gray-300 hover:border-gray-400"
                  }`}
                  onClick={() => setUseExistingCV(false)}
                >
                  <div className="flex items-center">
                    <input
                      type="radio"
                      name="cvOption"
                      checked={!useExistingCV}
                      onChange={() => setUseExistingCV(false)}
                      className="mr-3 text-teal-600"
                    />
                    <div className="flex items-center">
                      <FiUpload className="text-teal-600 mr-2" />
                      <div>
                        <p className="font-medium">Upload new CV</p>
                        <p className="text-sm text-gray-500">
                          Upload a different CV for this application
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* File Upload Section */}
              {!useExistingCV && (
                <div className="mt-4 p-4 border border-gray-300 rounded-lg">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Upload CV (PDF only)
                  </label>
                  <input
                    type="file"
                    accept=".pdf"
                    onChange={handleFileUpload}
                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-teal-50 file:text-teal-700 hover:file:bg-teal-100"
                  />
                  {newCVFile && (
                    <p className="mt-2 text-sm text-green-600">
                      Selected: {newCVFile.name}
                    </p>
                  )}
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <button
                onClick={handleApplyModalClose}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
                disabled={isApplying}
              >
                Cancel
              </button>
              <button
                onClick={handleSubmitApplication}
                disabled={isApplying || (!useExistingCV && !newCVFile)}
                className="flex-1 px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
              >
                {isApplying ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Applying...
                  </>
                ) : (
                  "Apply Now"
                )}
              </button>
            </div>
          </div>
        </Modal>
      )}

      <Footer />
    </div>
  );
};

export default JobDetail;
