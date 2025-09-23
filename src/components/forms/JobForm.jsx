import React, { useState } from 'react';
import { toast } from "react-toastify";


const JobForm = ({ onSuccess, onCancel }) => {
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    type: '',
    salary: '',
    location: '',
    workMode: 'onsite',
    tags: [],
    description: '',
    responsibilities: [''],
    skills: [''],
    experience: '',
    degree: '',
    benefits: [],
    requirements: ['']
  });

  const [currentTag, setCurrentTag] = useState('');
  const [currentBenefit, setCurrentBenefit] = useState('');

  const jobTypes = ['Full time', 'Part time', 'Contract', 'Freelance', 'Internship'];
  const workModes = ['onsite', 'remote', 'hybrid'];
  const categories = ['Technology', 'Marketing', 'Design', 'Sales', 'Finance', 'Hotels & Tourism', 'Healthcare', 'Education', 'Manufacturing', 'Retail'];
  const experienceLevels = ['Entry level', '1-2 years', '3-5 years', '5+ years', '10+ years'];
  const degreeRequirements = ['High School', 'Associate', 'Bachelor\'s', 'Master\'s', 'PhD', 'Not Required'];
  const commonBenefits = ['Health Insurance', '401k Matching', 'Paid Time Off', 'Professional Development', 'Flexible Schedule', 'Work from Home', 'Gym Membership', 'Dental Insurance', 'Vision Insurance', 'Life Insurance'];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleArrayFieldChange = (field, index, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].map((item, i) => i === index ? value : item)
    }));
  };

  const addArrayField = (field) => {
    setFormData(prev => ({
      ...prev,
      [field]: [...prev[field], '']
    }));
  };

  const removeArrayField = (field, index) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }));
  };

  const addTag = () => {
    if (currentTag.trim() && !formData.tags.includes(currentTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, currentTag.trim()]
      }));
      setCurrentTag('');
    }
  };

  const removeTag = (tagToRemove) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const toggleBenefit = (benefit) => {
    setFormData(prev => ({
      ...prev,
      benefits: prev.benefits.includes(benefit)
        ? prev.benefits.filter(b => b !== benefit)
        : [...prev.benefits, benefit]
    }));
  };

  const handleSubmit = () => {
    // Filter out empty strings from arrays
    const cleanedData = {
      ...formData,
      responsibilities: formData.responsibilities.filter(item => item.trim()),
      skills: formData.skills.filter(item => item.trim()),
      requirements: formData.requirements.filter(item => item.trim()),
      datePosted: new Date().toISOString().split('T')[0]
    };
    console.log('Job Data:', cleanedData);
    toast.success('Job posted successfully!');
    onSuccess(); // Close the modal
  };

  const saveDraft = () => {
    console.log('Draft saved:', formData);
    toast.success('Draft saved successfully!');
    onSuccess(); // Close the modal
  };

  return (
    <div className="bg-neutral-50">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-neutral-900 mb-2">Create New Job Posting</h1>
        <p className="text-neutral-600">Fill in the details to create a comprehensive job listing</p>
      </div>

      <div className="space-y-6 max-h-[60vh] overflow-y-auto pr-2">
        {/* Basic Information */}
        <div className="border-b border-neutral-200 pb-6">
          <h2 className="text-xl font-semibold text-neutral-800 mb-4">Basic Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">Job Title *</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="e.g., Forward Security Director"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">Category *</label>
              <select
                value={formData.category}
                onChange={(e) => handleInputChange('category', e.target.value)}
                className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="">Select Category</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">Job Type *</label>
              <select
                value={formData.type}
                onChange={(e) => handleInputChange('type', e.target.value)}
                className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="">Select Type</option>
                {jobTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">Work Mode *</label>
              <select
                value={formData.workMode}
                onChange={(e) => handleInputChange('workMode', e.target.value)}
                className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                {workModes.map(mode => (
                  <option key={mode} value={mode}>{mode.charAt(0).toUpperCase() + mode.slice(1)}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">Salary Range</label>
              <input
                type="text"
                value={formData.salary}
                onChange={(e) => handleInputChange('salary', e.target.value)}
                placeholder="$40000-$42000"
                className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">Location *</label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => handleInputChange('location', e.target.value)}
                placeholder="New York, USA"
                className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Tags */}
        <div className="border-b border-neutral-200 pb-6">
          <h2 className="text-xl font-semibold text-neutral-800 mb-4">Tags</h2>
          <div className="flex flex-wrap gap-2 mb-4">
            {formData.tags.map((tag, index) => (
              <span
                key={index}
                className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-primary-100 text-primary-800"
              >
                {tag}
                <button
                  type="button"
                  onClick={() => removeTag(tag)}
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
              value={currentTag}
              onChange={(e) => setCurrentTag(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
              placeholder="Add a tag and press Enter"
              className="flex-1 px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
            <button
              type="button"
              onClick={addTag}
              className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              Add
            </button>
          </div>
        </div>

        {/* Job Description */}
        <div className="border-b border-neutral-200 pb-6">
          <h2 className="text-xl font-semibold text-neutral-800 mb-4">Job Description</h2>
          <textarea
            value={formData.description}
            onChange={(e) => handleInputChange('description', e.target.value)}
            rows={4}
            placeholder="Provide a detailed description of the role, what the candidate will be doing, and what makes this opportunity exciting..."
            className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>

        {/* Responsibilities */}
        <div className="border-b border-neutral-200 pb-6">
          <h2 className="text-xl font-semibold text-neutral-800 mb-4">Key Responsibilities</h2>
          {formData.responsibilities.map((responsibility, index) => (
            <div key={index} className="flex gap-2 mb-3">
              <input
                type="text"
                value={responsibility}
                onChange={(e) => handleArrayFieldChange('responsibilities', index, e.target.value)}
                placeholder={`Responsibility ${index + 1}`}
                className="flex-1 px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
              {formData.responsibilities.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeArrayField('responsibilities', index)}
                  className="px-3 py-2 text-red-600 hover:text-red-800"
                >
                  Remove
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={() => addArrayField('responsibilities')}
            className="text-primary-600 hover:text-primary-800 text-sm"
          >
            + Add another responsibility
          </button>
        </div>

        {/* Required Skills */}
        <div className="border-b border-neutral-200 pb-6">
          <h2 className="text-xl font-semibold text-neutral-800 mb-4">Required Skills</h2>
          {formData.skills.map((skill, index) => (
            <div key={index} className="flex gap-2 mb-3">
              <input
                type="text"
                value={skill}
                onChange={(e) => handleArrayFieldChange('skills', index, e.target.value)}
                placeholder={`Skill ${index + 1}`}
                className="flex-1 px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
              {formData.skills.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeArrayField('skills', index)}
                  className="px-3 py-2 text-red-600 hover:text-red-800"
                >
                  Remove
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={() => addArrayField('skills')}
            className="text-primary-600 hover:text-primary-800 text-sm"
          >
            + Add another skill
          </button>
        </div>

        {/* Experience & Education */}
        <div className="border-b border-neutral-200 pb-6">
          <h2 className="text-xl font-semibold text-neutral-800 mb-4">Experience & Education</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">Experience Level</label>
              <select
                value={formData.experience}
                onChange={(e) => handleInputChange('experience', e.target.value)}
                className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="">Select Experience Level</option>
                {experienceLevels.map(level => (
                  <option key={level} value={level}>{level}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">Degree Requirement</label>
              <select
                value={formData.degree}
                onChange={(e) => handleInputChange('degree', e.target.value)}
                className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="">Select Degree Requirement</option>
                {degreeRequirements.map(degree => (
                  <option key={degree} value={degree}>{degree}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Benefits */}
        <div className="border-b border-neutral-200 pb-6">
          <h2 className="text-xl font-semibold text-neutral-800 mb-4">Benefits & Perks</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {commonBenefits.map(benefit => (
              <label key={benefit} className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.benefits.includes(benefit)}
                  onChange={() => toggleBenefit(benefit)}
                  className="mr-2 h-4 w-4 text-primary-600 focus:ring-primary-500 border-neutral-300 rounded"
                />
                <span className="text-sm text-neutral-700">{benefit}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Additional Requirements */}
        <div className="border-b border-neutral-200 pb-6">
          <h2 className="text-xl font-semibold text-neutral-800 mb-4">Additional Requirements</h2>
          {formData.requirements.map((requirement, index) => (
            <div key={index} className="flex gap-2 mb-3">
              <input
                type="text"
                value={requirement}
                onChange={(e) => handleArrayFieldChange('requirements', index, e.target.value)}
                placeholder={`Requirement ${index + 1}`}
                className="flex-1 px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
              {formData.requirements.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeArrayField('requirements', index)}
                  className="px-3 py-2 text-red-600 hover:text-red-800"
                >
                  Remove
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={() => addArrayField('requirements')}
            className="text-primary-600 hover:text-primary-800 text-sm"
          >
            + Add another requirement
          </button>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4 justify-between pt-6">
        <button
          type="button"
          onClick={onCancel}
          className="px-6 py-3 border border-neutral-300 text-neutral-700 rounded-md hover:bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-primary-500"
        >
          Cancel
        </button>
        <div className="flex gap-4">
          <button
            type="button"
            onClick={saveDraft}
            className="px-6 py-3 border border-neutral-300 text-neutral-700 rounded-md hover:bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            Save as Draft
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            className="px-6 py-3 bg-primary-600 text-white rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            Post Job
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobForm;