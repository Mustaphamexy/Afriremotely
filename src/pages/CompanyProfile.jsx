import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';

const CompanyProfile = () => {
  const { user } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    companyName: '',
    email: '',
    phone: '',
    website: '',
    industry: '',
    companySize: '',
    foundedYear: '',
    headquarters: '',
    description: '',
    mission: '',
    values: '',
    services: [],
    currentService: '',
    socialLinks: {
      linkedin: '',
      twitter: '',
      facebook: '',
      instagram: ''
    },
    logo: null,
    coverImage: null,
    documents: {
      registrationCertificate: null,
      taxIdCertificate: null,
      kycDocuments: null
    },
    contactPerson: {
      name: '',
      position: '',
      email: '',
      phone: ''
    },
    hiringPreferences: {
      workMode: [],
      experienceLevel: [],
      educationLevel: []
    }
  });

  const [logoPreview, setLogoPreview] = useState('');
  const [coverImagePreview, setCoverImagePreview] = useState('');

  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        companyName: user.name || '',
        email: user.email || ''
      }));
    }
  }, [user]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleNestedInputChange = (parentField, field, value) => {
    setFormData(prev => ({
      ...prev,
      [parentField]: {
        ...prev[parentField],
        [field]: value
      }
    }));
  };

  const handleSocialLinkChange = (platform, value) => {
    setFormData(prev => ({
      ...prev,
      socialLinks: {
        ...prev.socialLinks,
        [platform]: value
      }
    }));
  };

  const handleFileUpload = (field, file, subField = null) => {
    if (subField) {
      setFormData(prev => ({
        ...prev,
        [field]: {
          ...prev[field],
          [subField]: file
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: file
      }));

      if (field === 'logo') {
        setLogoPreview(URL.createObjectURL(file));
      } else if (field === 'coverImage') {
        setCoverImagePreview(URL.createObjectURL(file));
      }
    }
  };

  const addService = () => {
    if (formData.currentService.trim() && !formData.services.includes(formData.currentService.trim())) {
      setFormData(prev => ({
        ...prev,
        services: [...prev.services, formData.currentService.trim()],
        currentService: ''
      }));
    }
  };

  const removeService = (serviceToRemove) => {
    setFormData(prev => ({
      ...prev,
      services: prev.services.filter(service => service !== serviceToRemove)
    }));
  };

  const toggleHiringPreference = (category, value) => {
    setFormData(prev => ({
      ...prev,
      hiringPreferences: {
        ...prev.hiringPreferences,
        [category]: prev.hiringPreferences[category].includes(value)
          ? prev.hiringPreferences[category].filter(item => item !== value)
          : [...prev.hiringPreferences[category], value]
      }
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Company Profile Data:', formData);
    alert('Company profile saved successfully!');
    // Handle form submission here
  };

  const industries = [
    'Technology', 'Healthcare', 'Finance', 'Education', 'Manufacturing',
    'Retail', 'Hospitality', 'Construction', 'Media', 'Transportation',
    'Energy', 'Telecommunications', 'Agriculture', 'Pharmaceuticals', 'Real Estate'
  ];

  const companySizes = [
    '1-10 employees', '11-50 employees', '51-200 employees',
    '201-500 employees', '501-1000 employees', '1000+ employees'
  ];

  const workModes = ['On-site', 'Remote', 'Hybrid'];
  const experienceLevels = ['Entry Level', 'Mid Level', 'Senior Level', 'Executive'];
  const educationLevels = ['High School', 'Associate', 'Bachelor\'s', 'Master\'s', 'PhD'];

  return (
    <div className="min-h-screen bg-secondary-300">
      <Header bgClass="bg-black" />
      <div className="pt-32 pb-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-neutral-900 mb-2">Company Profile</h1>
              <p className="text-neutral-600">
                Complete your company profile to attract top talent and post job listings
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Company Basic Information */}
              <div className="border-b border-neutral-200 pb-8">
                <h2 className="text-xl font-semibold text-neutral-800 mb-4">Basic Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">Company Name *</label>
                    <input
                      type="text"
                      value={formData.companyName}
                      onChange={(e) => handleInputChange('companyName', e.target.value)}
                      className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">Email *</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">Phone Number</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">Website</label>
                    <input
                      type="url"
                      value={formData.website}
                      onChange={(e) => handleInputChange('website', e.target.value)}
                      className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="https://company.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">Industry *</label>
                    <select
                      value={formData.industry}
                      onChange={(e) => handleInputChange('industry', e.target.value)}
                      className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      required
                    >
                      <option value="">Select Industry</option>
                      {industries.map(industry => (
                        <option key={industry} value={industry}>{industry}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">Company Size</label>
                    <select
                      value={formData.companySize}
                      onChange={(e) => handleInputChange('companySize', e.target.value)}
                      className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    >
                      <option value="">Select Size</option>
                      {companySizes.map(size => (
                        <option key={size} value={size}>{size}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">Founded Year</label>
                    <input
                      type="number"
                      value={formData.foundedYear}
                      onChange={(e) => handleInputChange('foundedYear', e.target.value)}
                      min="1900"
                      max={new Date().getFullYear()}
                      className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="1990"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">Headquarters</label>
                    <input
                      type="text"
                      value={formData.headquarters}
                      onChange={(e) => handleInputChange('headquarters', e.target.value)}
                      className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="City, Country"
                    />
                  </div>
                </div>
              </div>

              {/* Company Description */}
              <div className="border-b border-neutral-200 pb-8">
                <h2 className="text-xl font-semibold text-neutral-800 mb-4">Company Description</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">About Us *</label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => handleInputChange('description', e.target.value)}
                      rows={4}
                      placeholder="Describe your company, what you do, and what makes you unique..."
                      className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">Mission Statement</label>
                    <textarea
                      value={formData.mission}
                      onChange={(e) => handleInputChange('mission', e.target.value)}
                      rows={3}
                      placeholder="What is your company's mission?"
                      className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">Core Values</label>
                    <textarea
                      value={formData.values}
                      onChange={(e) => handleInputChange('values', e.target.value)}
                      rows={3}
                      placeholder="What values guide your company?"
                      className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>

              {/* Services/Products */}
              <div className="border-b border-neutral-200 pb-8">
                <h2 className="text-xl font-semibold text-neutral-800 mb-4">Services & Products</h2>
                <div className="flex flex-wrap gap-2 mb-4">
                  {formData.services.map((service, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-primary-100 text-primary-800"
                    >
                      {service}
                      <button
                        type="button"
                        onClick={() => removeService(service)}
                        className="ml-2 hover:text-primary-600"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={formData.currentService}
                    onChange={(e) => handleInputChange('currentService', e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addService())}
                    placeholder="Add a service/product and press Enter"
                    className="flex-1 px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                  <button
                    type="button"
                    onClick={addService}
                    className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    Add
                  </button>
                </div>
              </div>

              {/* Media */}
              <div className="border-b border-neutral-200 pb-8">
                <h2 className="text-xl font-semibold text-neutral-800 mb-4">Company Media</h2>
                <div className="grid grid-cols-1 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">Company Logo *</label>
                    <div className="flex items-center gap-4">
                      {logoPreview && (
                        <img
                          src={logoPreview}
                          alt="Logo preview"
                          className="w-16 h-16 rounded object-cover"
                        />
                      )}
                      <label className="cursor-pointer">
                        <span className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 text-sm">
                          Upload Logo
                        </span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleFileUpload('logo', e.target.files[0])}
                          className="hidden"
                          required
                        />
                      </label>
                    </div>
                    <p className="text-xs text-neutral-500 mt-2">Recommended: 300x300px, PNG or JPG (Max 2MB)</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">Cover Image</label>
                    <div className="flex items-center gap-4">
                      {coverImagePreview && (
                        <img
                          src={coverImagePreview}
                          alt="Cover preview"
                          className="w-32 h-16 rounded object-cover"
                        />
                      )}
                      <label className="cursor-pointer">
                        <span className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 text-sm">
                          Upload Cover
                        </span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleFileUpload('coverImage', e.target.files[0])}
                          className="hidden"
                        />
                      </label>
                    </div>
                    <p className="text-xs text-neutral-500 mt-2">Recommended: 1200x300px, PNG or JPG (Max 5MB)</p>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="border-b border-neutral-200 pb-8">
                <h2 className="text-xl font-semibold text-neutral-800 mb-4">Social Media</h2>
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">LinkedIn</label>
                    <input
                      type="url"
                      value={formData.socialLinks.linkedin}
                      onChange={(e) => handleSocialLinkChange('linkedin', e.target.value)}
                      className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="https://linkedin.com/company/companyname"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">Twitter</label>
                    <input
                      type="url"
                      value={formData.socialLinks.twitter}
                      onChange={(e) => handleSocialLinkChange('twitter', e.target.value)}
                      className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="https://twitter.com/companyname"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">Facebook</label>
                    <input
                      type="url"
                      value={formData.socialLinks.facebook}
                      onChange={(e) => handleSocialLinkChange('facebook', e.target.value)}
                      className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="https://facebook.com/companyname"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">Instagram</label>
                    <input
                      type="url"
                      value={formData.socialLinks.instagram}
                      onChange={(e) => handleSocialLinkChange('instagram', e.target.value)}
                      className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="https://instagram.com/companyname"
                    />
                  </div>
                </div>
              </div>

              {/* Contact Person */}
              <div className="border-b border-neutral-200 pb-8">
                <h2 className="text-xl font-semibold text-neutral-800 mb-4">Contact Person</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">Name *</label>
                    <input
                      type="text"
                      value={formData.contactPerson.name}
                      onChange={(e) => handleNestedInputChange('contactPerson', 'name', e.target.value)}
                      className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">Position *</label>
                    <input
                      type="text"
                      value={formData.contactPerson.position}
                      onChange={(e) => handleNestedInputChange('contactPerson', 'position', e.target.value)}
                      className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">Email *</label>
                    <input
                      type="email"
                      value={formData.contactPerson.email}
                      onChange={(e) => handleNestedInputChange('contactPerson', 'email', e.target.value)}
                      className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">Phone Number</label>
                    <input
                      type="tel"
                      value={formData.contactPerson.phone}
                      onChange={(e) => handleNestedInputChange('contactPerson', 'phone', e.target.value)}
                      className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                </div>
              </div>

              {/* Hiring Preferences */}
              <div className="border-b border-neutral-200 pb-8">
                <h2 className="text-xl font-semibold text-neutral-800 mb-4">Hiring Preferences</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">Work Mode</label>
                    <div className="space-y-2">
                      {workModes.map(mode => (
                        <label key={mode} className="flex items-center">
                          <input
                            type="checkbox"
                            checked={formData.hiringPreferences.workMode.includes(mode)}
                            onChange={() => toggleHiringPreference('workMode', mode)}
                            className="mr-2 h-4 w-4 text-primary-600 focus:ring-primary-500 border-neutral-300 rounded"
                          />
                          <span className="text-sm text-neutral-700">{mode}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">Experience Level</label>
                    <div className="space-y-2">
                      {experienceLevels.map(level => (
                        <label key={level} className="flex items-center">
                          <input
                            type="checkbox"
                            checked={formData.hiringPreferences.experienceLevel.includes(level)}
                            onChange={() => toggleHiringPreference('experienceLevel', level)}
                            className="mr-2 h-4 w-4 text-primary-600 focus:ring-primary-500 border-neutral-300 rounded"
                          />
                          <span className="text-sm text-neutral-700">{level}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">Education Level</label>
                    <div className="space-y-2">
                      {educationLevels.map(level => (
                        <label key={level} className="flex items-center">
                          <input
                            type="checkbox"
                            checked={formData.hiringPreferences.educationLevel.includes(level)}
                            onChange={() => toggleHiringPreference('educationLevel', level)}
                            className="mr-2 h-4 w-4 text-primary-600 focus:ring-primary-500 border-neutral-300 rounded"
                          />
                          <span className="text-sm text-neutral-700">{level}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* KYC Documents */}
              <div className="border-b border-neutral-200 pb-8">
                <h2 className="text-xl font-semibold text-neutral-800 mb-4">KYC Documents</h2>
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">Business Registration Certificate</label>
                    <label className="cursor-pointer block">
                      <span className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 text-sm inline-block">
                        Upload Document
                      </span>
                      <input
                        type="file"
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={(e) => handleFileUpload('documents', e.target.files[0], 'registrationCertificate')}
                        className="hidden"
                      />
                    </label>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">Tax Identification Number Certificate</label>
                    <label className="cursor-pointer block">
                      <span className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 text-sm inline-block">
                        Upload Document
                      </span>
                      <input
                        type="file"
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={(e) => handleFileUpload('documents', e.target.files[0], 'taxIdCertificate')}
                        className="hidden"
                      />
                    </label>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">Other KYC Documents</label>
                    <label className="cursor-pointer block">
                      <span className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 text-sm inline-block">
                        Upload Document
                      </span>
                      <input
                        type="file"
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={(e) => handleFileUpload('documents', e.target.files[0], 'kycDocuments')}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>
                <p className="text-xs text-neutral-500 mt-2">Accepted formats: PDF, JPG, PNG (Max 10MB per file)</p>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 justify-end pt-6">
                <button
                  type="button"
                  className="px-6 py-3 border border-neutral-300 text-neutral-700 rounded-md hover:bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 bg-primary-600 text-white rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  Save Company Profile
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CompanyProfile;