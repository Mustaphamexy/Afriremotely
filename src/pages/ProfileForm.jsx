import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import Button from '../components/UI/Button';

const ProfileForm = () => {
  const { user } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    location: '',
    title: '',
    bio: '',
    education: [{
      institution: '',
      degree: '',
      field: '',
      startDate: '',
      endDate: '',
      current: false
    }],
    experience: [{
      company: '',
      position: '',
      startDate: '',
      endDate: '',
      current: false,
      description: ''
    }],
    skills: [],
    currentSkill: '',
    languages: [],
    currentLanguage: '',
    socialLinks: {
      linkedin: '',
      github: '',
      portfolio: ''
    },
    resume: null,
    profileImage: null,
    coverLetter: ''
  });

  const [profileImagePreview, setProfileImagePreview] = useState('');
  const [resumeFileName, setResumeFileName] = useState('');

  useEffect(() => {
    // Load user data if available
    if (user) {
      setFormData(prev => ({
        ...prev,
        fullName: user.name || '',
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

  const handleArrayFieldChange = (field, index, subField, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].map((item, i) => 
        i === index ? { ...item, [subField]: value } : item
      )
    }));
  };

  const addArrayField = (field, template) => {
    setFormData(prev => ({
      ...prev,
      [field]: [...prev[field], template]
    }));
  };

  const removeArrayField = (field, index) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
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

  const addSkill = () => {
    if (formData.currentSkill.trim() && !formData.skills.includes(formData.currentSkill.trim())) {
      setFormData(prev => ({
        ...prev,
        skills: [...prev.skills, formData.currentSkill.trim()],
        currentSkill: ''
      }));
    }
  };

  const removeSkill = (skillToRemove) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill !== skillToRemove)
    }));
  };

  const addLanguage = () => {
    if (formData.currentLanguage.trim() && !formData.languages.includes(formData.currentLanguage.trim())) {
      setFormData(prev => ({
        ...prev,
        languages: [...prev.languages, formData.currentLanguage.trim()],
        currentLanguage: ''
      }));
    }
  };

  const removeLanguage = (languageToRemove) => {
    setFormData(prev => ({
      ...prev,
      languages: prev.languages.filter(language => language !== languageToRemove)
    }));
  };

  const handleFileUpload = (field, file) => {
    if (field === 'profileImage') {
      setFormData(prev => ({
        ...prev,
        [field]: file
      }));
      setProfileImagePreview(URL.createObjectURL(file));
    } else if (field === 'resume') {
      setFormData(prev => ({
        ...prev,
        [field]: file
      }));
      setResumeFileName(file.name);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Profile Data:', formData);
    alert('Profile saved successfully!');
    // Handle form submission here
  };

  const educationLevels = ['High School', 'Associate', 'Bachelor\'s', 'Master\'s', 'PhD'];
  const proficiencyLevels = ['Basic', 'Intermediate', 'Advanced', 'Native'];

  return (
    <div className="min-h-screen bg-neutral-50">
      <Header bgClass="bg-black"/>
      <div className="pt-32 pb-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-neutral-900 mb-2">Complete Your Profile</h1>
              <p className="text-neutral-600">
                Build a comprehensive profile to stand out to employers and apply for jobs faster
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Personal Information */}
              <div className="border-b border-neutral-200 pb-8">
                <h2 className="text-xl font-semibold text-neutral-800 mb-4">Personal Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">Full Name *</label>
                    <input
                      type="text"
                      value={formData.fullName}
                      onChange={(e) => handleInputChange('fullName', e.target.value)}
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
                    <label className="block text-sm font-medium text-neutral-700 mb-2">Location</label>
                    <input
                      type="text"
                      value={formData.location}
                      onChange={(e) => handleInputChange('location', e.target.value)}
                      className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="City, Country"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">Professional Title</label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) => handleInputChange('title', e.target.value)}
                      className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="e.g., Senior Frontend Developer"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">Profile Image</label>
                    <div className="flex items-center gap-4">
                      {profileImagePreview && (
                        <img
                          src={profileImagePreview}
                          alt="Profile preview"
                          className="w-16 h-16 rounded-full object-cover"
                        />
                      )}
                      <label className="cursor-pointer">
                        <span className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 text-sm">
                          Upload Image
                        </span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleFileUpload('profileImage', e.target.files[0])}
                          className="hidden"
                        />
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bio */}
              <div className="border-b border-neutral-200 pb-8">
                <h2 className="text-xl font-semibold text-neutral-800 mb-4">Professional Summary</h2>
                <textarea
                  value={formData.bio}
                  onChange={(e) => handleInputChange('bio', e.target.value)}
                  rows={4}
                  placeholder="Write a brief summary about yourself, your skills, and what you're looking for..."
                  className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>

              {/* Education */}
              <div className="border-b border-neutral-200 pb-8">
                <h2 className="text-xl font-semibold text-neutral-800 mb-4">Education</h2>
                {formData.education.map((edu, index) => (
                  <div key={index} className="border border-neutral-200 rounded-lg p-4 mb-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-2">Institution *</label>
                        <input
                          type="text"
                          value={edu.institution}
                          onChange={(e) => handleArrayFieldChange('education', index, 'institution', e.target.value)}
                          className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-2">Degree Level *</label>
                        <select
                          value={edu.degree}
                          onChange={(e) => handleArrayFieldChange('education', index, 'degree', e.target.value)}
                          className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                          required
                        >
                          <option value="">Select Degree</option>
                          {educationLevels.map(level => (
                            <option key={level} value={level}>{level}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-2">Field of Study</label>
                        <input
                          type="text"
                          value={edu.field}
                          onChange={(e) => handleArrayFieldChange('education', index, 'field', e.target.value)}
                          className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                          placeholder="e.g., Computer Science"
                        />
                      </div>
                      <div className="flex gap-4">
                        <div className="flex-1">
                          <label className="block text-sm font-medium text-neutral-700 mb-2">Start Date</label>
                          <input
                            type="month"
                            value={edu.startDate}
                            onChange={(e) => handleArrayFieldChange('education', index, 'startDate', e.target.value)}
                            className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                          />
                        </div>
                        <div className="flex-1">
                          <label className="block text-sm font-medium text-neutral-700 mb-2">End Date</label>
                          <input
                            type="month"
                            value={edu.endDate}
                            onChange={(e) => handleArrayFieldChange('education', index, 'endDate', e.target.value)}
                            disabled={edu.current}
                            className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center mb-4">
                      <input
                        type="checkbox"
                        checked={edu.current}
                        onChange={(e) => handleArrayFieldChange('education', index, 'current', e.target.checked)}
                        className="mr-2 h-4 w-4 text-primary-600 focus:ring-primary-500 border-neutral-300 rounded"
                      />
                      <label className="text-sm text-neutral-700">Currently studying here</label>
                    </div>
                    {formData.education.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeArrayField('education', index)}
                        className="text-red-600 hover:text-red-800 text-sm"
                      >
                        Remove Education
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => addArrayField('education', {
                    institution: '',
                    degree: '',
                    field: '',
                    startDate: '',
                    endDate: '',
                    current: false
                  })}
                  className="text-primary-600 hover:text-primary-800 text-sm"
                >
                  + Add another education
                </button>
              </div>

              {/* Experience */}
              <div className="border-b border-neutral-200 pb-8">
                <h2 className="text-xl font-semibold text-neutral-800 mb-4">Work Experience</h2>
                {formData.experience.map((exp, index) => (
                  <div key={index} className="border border-neutral-200 rounded-lg p-4 mb-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-2">Company *</label>
                        <input
                          type="text"
                          value={exp.company}
                          onChange={(e) => handleArrayFieldChange('experience', index, 'company', e.target.value)}
                          className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-2">Position *</label>
                        <input
                          type="text"
                          value={exp.position}
                          onChange={(e) => handleArrayFieldChange('experience', index, 'position', e.target.value)}
                          className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                          required
                        />
                      </div>
                      <div className="flex gap-4">
                        <div className="flex-1">
                          <label className="block text-sm font-medium text-neutral-700 mb-2">Start Date</label>
                          <input
                            type="month"
                            value={exp.startDate}
                            onChange={(e) => handleArrayFieldChange('experience', index, 'startDate', e.target.value)}
                            className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                          />
                        </div>
                        <div className="flex-1">
                          <label className="block text-sm font-medium text-neutral-700 mb-2">End Date</label>
                          <input
                            type="month"
                            value={exp.endDate}
                            onChange={(e) => handleArrayFieldChange('experience', index, 'endDate', e.target.value)}
                            disabled={exp.current}
                            className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center mb-4">
                      <input
                        type="checkbox"
                        checked={exp.current}
                        onChange={(e) => handleArrayFieldChange('experience', index, 'current', e.target.checked)}
                        className="mr-2 h-4 w-4 text-primary-600 focus:ring-primary-500 border-neutral-300 rounded"
                      />
                      <label className="text-sm text-neutral-700">I currently work here</label>
                    </div>
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-neutral-700 mb-2">Description</label>
                      <textarea
                        value={exp.description}
                        onChange={(e) => handleArrayFieldChange('experience', index, 'description', e.target.value)}
                        rows={3}
                        className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="Describe your responsibilities and achievements..."
                      />
                    </div>
                    {formData.experience.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeArrayField('experience', index)}
                        className="text-red-600 hover:text-red-800 text-sm"
                      >
                        Remove Experience
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => addArrayField('experience', {
                    company: '',
                    position: '',
                    startDate: '',
                    endDate: '',
                    current: false,
                    description: ''
                  })}
                  className="text-primary-600 hover:text-primary-800 text-sm"
                >
                  + Add another experience
                </button>
              </div>

              {/* Skills */}
              <div className="border-b border-neutral-200 pb-8">
                <h2 className="text-xl font-semibold text-neutral-800 mb-4">Skills</h2>
                <div className="flex flex-wrap gap-2 mb-4">
                  {formData.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-primary-100 text-primary-800"
                    >
                      {skill}
                      <button
                        type="button"
                        onClick={() => removeSkill(skill)}
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
                    value={formData.currentSkill}
                    onChange={(e) => handleInputChange('currentSkill', e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill())}
                    placeholder="Add a skill and press Enter"
                    className="flex-1 px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                  <button
                    type="button"
                    onClick={addSkill}
                    className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    Add
                  </button>
                </div>
              </div>

              {/* Languages */}
              <div className="border-b border-neutral-200 pb-8">
                <h2 className="text-xl font-semibold text-neutral-800 mb-4">Languages</h2>
                <div className="flex flex-wrap gap-2 mb-4">
                  {formData.languages.map((language, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-secondary-100 text-secondary-800"
                    >
                      {language}
                      <button
                        type="button"
                        onClick={() => removeLanguage(language)}
                        className="ml-2 hover:text-secondary-600"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={formData.currentLanguage}
                    onChange={(e) => handleInputChange('currentLanguage', e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addLanguage())}
                    placeholder="Add a language and press Enter"
                    className="flex-1 px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                  <button
                    type="button"
                    onClick={addLanguage}
                    className="px-4 py-2 bg-secondary-600 text-white rounded-md hover:bg-secondary-700 focus:outline-none focus:ring-2 focus:ring-secondary-500"
                  >
                    Add
                  </button>
                </div>
              </div>

              {/* Social Links */}
              <div className="border-b border-neutral-200 pb-8">
                <h2 className="text-xl font-semibold text-neutral-800 mb-4">Social Links</h2>
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">LinkedIn</label>
                    <input
                      type="url"
                      value={formData.socialLinks.linkedin}
                      onChange={(e) => handleSocialLinkChange('linkedin', e.target.value)}
                      className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="https://linkedin.com/in/yourname"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">GitHub</label>
                    <input
                      type="url"
                      value={formData.socialLinks.github}
                      onChange={(e) => handleSocialLinkChange('github', e.target.value)}
                      className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="https://github.com/yourname"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">Portfolio</label>
                    <input
                      type="url"
                      value={formData.socialLinks.portfolio}
                      onChange={(e) => handleSocialLinkChange('portfolio', e.target.value)}
                      className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="https://yourportfolio.com"
                    />
                  </div>
                </div>
              </div>

              {/* Documents */}
              <div className="border-b border-neutral-200 pb-8">
                <h2 className="text-xl font-semibold text-neutral-800 mb-4">Documents</h2>
                <div className="grid grid-cols-1 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">Resume/CV *</label>
                    <div className="flex items-center gap-4">
                      {resumeFileName && (
                        <span className="text-sm text-neutral-600">{resumeFileName}</span>
                      )}
                      <label className="cursor-pointer">
                        <span className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 text-sm">
                          Upload Resume
                        </span>
                        <input
                          type="file"
                          accept=".pdf,.doc,.docx"
                          onChange={(e) => handleFileUpload('resume', e.target.files[0])}
                          className="hidden"
                          required
                        />
                      </label>
                    </div>
                    <p className="text-xs text-neutral-500 mt-2">Accepted formats: PDF, DOC, DOCX (Max 5MB)</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">Cover Letter Template</label>
                    <textarea
                      value={formData.coverLetter}
                      onChange={(e) => handleInputChange('coverLetter', e.target.value)}
                      rows={6}
                      placeholder="Write a default cover letter that can be customized for specific job applications..."
                      className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                </div>
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
                  Save Profile
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

export default ProfileForm;