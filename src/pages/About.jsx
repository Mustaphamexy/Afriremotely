import React from "react";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import { HiUsers } from "react-icons/hi";
import { FaFileAlt, FaSearch, FaPlayCircle } from "react-icons/fa";
import { FaRegCircleCheck } from "react-icons/fa6";
import JobList from "../components/jobs/JobList";
import FAQ from "../sections/FAQ";
import { Interview, CompanyBG, CompanyImage1, CompanyImage2, CompanyImage3 } from "../components/UI/Details";

const About = () => {
  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <div className="bg-black py-32 text-center">
        <h1 className="text-5xl text-white">About Us</h1>
      </div>

      <div className="container mx-auto px-4 py-16">
        {/* Main Content Section */}
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h2 className="text-3xl font-bold mb-6">
                Connecting African Talent with Global Opportunities
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                At Afriremotely, we believe that talent knows no borders. We're
                dedicated to bridging the gap between skilled African
                professionals and remote job opportunities worldwide, creating a
                thriving ecosystem where talent meets opportunity.
              </p>
              <p className="text-gray-600 text-lg leading-relaxed">
                Our mission is to empower African professionals by providing
                access to high-quality remote work opportunities while helping
                global companies discover and hire exceptional talent from
                across the continent.
              </p>
            </div>
            <div className="bg-gradient-to-br from-gray-200 to-gray-300 rounded-lg h-80 flex items-center justify-center">
              <div className="text-gray-500 text-center">
                {/* Replace icon with image */}
                <img
                  src={Interview}
                  alt="Empowering African Talent"
                  className="mx-auto mb-4 object-cover rounded-lg"
                />
                <p className="font-bold">Empowering African Talent</p>
              </div>
            </div>
          </div>

          {/* Featured Job */}
          <JobList limit={2} showPagination={false} />

          {/* How It Works Section */}
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">How it works</h2>
            <p className="text-gray-600 mb-12 max-w-2xl mx-auto">
              Our streamlined process makes it easy to find your perfect remote
              opportunity or hire exceptional African talent.
            </p>

            <div className="grid md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <HiUsers size={24} className="text-primary-600" />
                </div>
                <h3 className="font-semibold mb-2">Create Account</h3>
                <p className="text-gray-600 text-sm">
                  Sign up and build your professional profile to get started
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaFileAlt size={24} className="text-primary-600" />
                </div>
                <h3 className="font-semibold mb-2">Upload Resume</h3>
                <p className="text-gray-600 text-sm">
                  Upload your CV and showcase your skills and experience
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaSearch size={24} className="text-primary-600" />
                </div>
                <h3 className="font-semibold mb-2">Find Jobs</h3>
                <p className="text-gray-600 text-sm">
                  Browse and discover remote opportunities that match your
                  expertise
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaRegCircleCheck size={24} className="text-primary-600" />
                </div>
                <h3 className="font-semibold mb-2">Apply Job</h3>
                <p className="text-gray-600 text-sm">
                  Apply to positions and start your remote work journey
                </p>
              </div>
            </div>
          </div>


          <div className="max-w-4xl mx-auto mb-16 pb-16 bg-black rounded-md ">
            <div className="relative rounded-lg h-96 bg-black flex flex-col items-center justify-center overflow-hidden text-center">
              <div className='absolute inset-0 opacity-50 '>
                <img src={CompanyBG} alt="" className='w-full h-full object-cover'/>
              </div>

              <button className="relative z-10 w-20 h-20 bg-primary-500 rounded-full flex items-center justify-center hover:bg-primary-600 transition-colors mb-4">
                <FaPlayCircle size={32} className="text-white ml-1" />
              </button>

              <div className="relative z-10 text-white">
                <h3 className="text-2xl font-bold mb-2">
                  Good Life Begins With
                </h3>
                <h3 className="text-2xl font-bold">A Good Company</h3>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mt-8">
              <div className="text-center text-white">
                <div className="w-12 h-12 bg-primary-500 rounded-full flex items-center justify-center mx-auto mb-3">
                  <HiUsers size={20} className="text-white" />
                </div>
                <h4 className="font-semibold mb-2">
                  We provide career mind guide
                </h4>
                <p className="text-gray-300 text-sm">and clear path</p>
              </div>

              <div className="text-center text-white">
                <div className="w-12 h-12 bg-primary-500 rounded-full flex items-center justify-center mx-auto mb-3">
                  <FaRegCircleCheck size={20} className="text-white" />
                </div>
                <h4 className="font-semibold mb-2">
                  We create the ideal match and
                </h4>
                <p className="text-gray-300 text-sm">dream job</p>
              </div>

              <div className="text-center text-white">
                <div className="w-12 h-12 bg-primary-500 rounded-full flex items-center justify-center mx-auto mb-3">
                  <FaFileAlt size={20} className="text-white" />
                </div>
                <h4 className="font-semibold mb-2">
                  Experience free best resume
                </h4>
                <p className="text-gray-300 text-sm">provide boost faster</p>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="mb-16">
            <FAQ />
          </div>

          {/* Values Section */}
          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div className="grid grid-cols-2 gap-4">
  {/* Image 1 */}
  <div className="rounded-lg h-32 overflow-hidden">
    <img 
      src={CompanyImage1} 
      alt="Image 1" 
      className="w-full h-full object-cover" 
    />
  </div>

  {/* Image 2 */}
  <div className="rounded-lg h-32 overflow-hidden">
    <img 
      src={CompanyImage2} 
      alt="Image 2" 
      className="w-full h-full object-cover" 
    />
  </div>

  {/* Image 3 spanning 2 columns */}
  <div className="rounded-lg h-32 col-span-2 overflow-hidden">
    <img 
      src={CompanyImage3} 
      alt="Image 3" 
      className="w-full h-full object-cover" 
    />
  </div>
</div>


            <div>
              <h2 className="text-3xl font-bold mb-6">
                We're Only Working With The Best
              </h2>
              <p className="text-gray-600 mb-8">
              At Afriremotely, we maintain high standards to ensure quality connections between top-tier African professionals and leading global companies.

              </p>

              <div className="grid grid-cols-2 gap-6">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center mr-3">
                    <FaRegCircleCheck size={16} className="text-primary-600" />
                  </div>
                  <span className="font-medium">Quality Job</span>
                </div>

                <div className="flex items-center">
                  <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center mr-3">
                    <HiUsers size={16} className="text-primary-600" />
                  </div>
                  <span className="font-medium">Resume Builder</span>
                </div>

                <div className="flex items-center">
                  <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center mr-3">
                    <FaFileAlt size={16} className="text-primary-600" />
                  </div>
                  <span className="font-medium">Top Companies</span>
                </div>

                <div className="flex items-center">
                  <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center mr-3">
                    <FaSearch size={16} className="text-primary-600" />
                  </div>
                  <span className="font-medium">Top Talents</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default About;
