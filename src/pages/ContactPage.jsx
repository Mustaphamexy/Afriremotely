import React from 'react'
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import ContactForm from '../components/forms/ContactForm';
import { FaRegClock  } from "react-icons/fa";
import { MdOutlineMail } from "react-icons/md";
import { IoLocationOutline } from "react-icons/io5";
import { LuPhone } from "react-icons/lu";






const ContactPage = () => {
  return (
    <div className='min-h-screen'>
        <Header />
        <div className='bg-black py-32 flex text-center justify-center '>
            <h1 className='text-5xl text-white'>Contact Page</h1>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left Column */}
          <div>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Connect with Africa's Leading Job Platform
            </h2>
            <p className="text-gray-600 mb-12 text-lg">
              Whether you're a talented professional seeking new opportunities or an employer looking for the best candidates, we're here to help you succeed in Africa's dynamic job market.
            </p>
            
            {/* Contact Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <LuPhone className="w-6 h-6 text-teal-500" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Call Us</h3>
                  <p className="text-gray-600">+234 701 234 5678</p>
                  <p className="text-gray-600">+234 809 876 5432</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <MdOutlineMail className="w-6 h-6 text-teal-500" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Email Us</h3>
                  <p className="text-gray-600">hello@jobportal.ng</p>
                  <p className="text-gray-600">support@jobportal.ng</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <FaRegClock className="w-6 h-6 text-teal-500" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Business Hours</h3>
                  <p className="text-gray-600">Mon - Fri: 8:00 AM - 6:00 PM</p>
                  <p className="text-gray-600">Saturday: 9:00 AM - 2:00 PM</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <IoLocationOutline className="w-6 h-6 text-teal-500" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Lagos Headquarters</h3>
                  <p className="text-gray-600">25 Ozumba Mbadiwe Avenue</p>
                  <p className="text-gray-600">Victoria Island, Lagos 101241</p>
                  <p className="text-gray-600">Nigeria</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right Column - Contact Form */}
          <div>
            <ContactForm />
          </div>
        </div>
      </div>
      
      {/* Trusted Companies Section */}
      <div className="bg-secondary-300 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-center text-gray-600 mb-8 text-lg">Trusted by leading African companies</h3>
          <div className="flex justify-center items-center space-x-12 opacity-40">
            <div className="text-2xl font-bold text-gray-700">Dangote</div>
            <div className="text-2xl font-bold text-gray-700">MTN</div>
            <div className="text-2xl font-bold text-gray-700">Zenith Bank</div>
            <div className="text-2xl font-bold text-gray-700">Access Bank</div>
            <div className="text-2xl font-bold text-gray-700">Jumia</div>
          </div>
        </div>
      </div>

        <Footer />
    </div>
  )
}

export default ContactPage