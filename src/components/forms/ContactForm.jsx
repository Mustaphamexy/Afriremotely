import React from 'react'
import { useState } from 'react';

const ContactForm = () => {

    const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = () => {
    console.log('Form submitted:', formData);
    alert('Message sent successfully!');
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      message: ''
    });
  };
  return (
     <div className="bg-secondary-100 rounded-2xl p-8">
      <h3 className="text-2xl font-bold text-neutral-900 mb-2">Get In Touch</h3>
      <p className="text-neutral-600 mb-8">We'd love to hear from you. Send us a message and we'll respond as soon as possible.</p>
      
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              First Name
            </label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="Enter your first name"
              className="w-full px-4 py-3 bg-white border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent focus:outline-none"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              Last Name
            </label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Enter your last name"
              className="w-full px-4 py-3 bg-white border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent focus:outline-none"
              required
            />
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-2">
            Email Address
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email address"
            className="w-full px-4 bg-white py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent focus:outline-none"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-2">
            Message
          </label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Tell us how we can help you..."
            rows={4}
            className="w-full px-4 py-3 bg-white border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none focus:outline-none"
            required
          />
        </div>
        
        <button
          onClick={handleSubmit}
          className="w-full bg-primary-500 hover:bg-primary-600 text-white py-3 px-6 rounded-lg font-medium transition-colors"
        >
          Send Message
        </button>
      </div>
    </div>
  )
}

export default ContactForm