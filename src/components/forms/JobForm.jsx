import React, { useState, useEffect, useContext } from "react";
import { toast } from "react-toastify";
import {
  jobAPI,
  categoryAPI,
  locationAPI,
  employmentTypeAPI,
  workModeAPI,
  experienceLevelAPI,
} from "../../services/api";
import { useAuth } from "../../context/AuthContext";

const JobForm = ({ onSuccess, onCancel }) => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    type: "",
    salary: "",
    location_id: "",
    workMode: "",
    tags: [],
    description: "",
    responsibilities: [""],
    skills: [""],
    experience: "",
    degree: "",
    benefits: [],
    requirements: [""],
  });

  const [currentTag, setCurrentTag] = useState("");
  const [categories, setCategories] = useState([]);
  const [locations, setLocations] = useState([]);
  const [employmentTypes, setEmploymentTypes] = useState([]);
  const [workModes, setWorkModes] = useState([]);
  const [experienceLevels, setExperienceLevels] = useState([]);
  const [loading, setLoading] = useState(false);
  const [companyName, setCompanyName] = useState("");

  const degreeRequirements = [
    "High School",
    "Associate",
    "Bachelor's",
    "Master's",
    "PhD",
    "Not Required",
  ];
  const commonBenefits = [
    "Health Insurance",
    "401k Matching",
    "Paid Time Off",
    "Professional Development",
    "Flexible Schedule",
    "Work from Home",
    "Gym Membership",
    "Dental Insurance",
    "Vision Insurance",
    "Life Insurance",
  ];

  // Get company name from user profile or use default
  useEffect(() => {
    if (user) {
      const userCompany =
        user.company_name ||
        user.employer_profile?.company_name ||
        user.username ||
        "AfriRemotely";
      setCompanyName(userCompany);
    } else {
      setCompanyName("AfriRemotely");
    }
  }, [user]);

  // Fetch all form data from API
  useEffect(() => {
    const fetchFormData = async () => {
      try {
        setLoading(true);

        // Fetch categories - store as objects with id + name
        const categoriesResponse = await categoryAPI.getAllCategories();
        const categoriesData =
          categoriesResponse.data
            ?.map((cat) => ({
              id: cat.id,
              name: cat.name,
            }))
            .filter(Boolean) || [];
        setCategories(categoriesData);

        // Fetch locations - API returns {city, country}
        const locationsResponse = await locationAPI.getAllLocations();
        const locationsData =
          locationsResponse.data
            ?.map((loc) => ({
              id: loc.id,
              displayName: `${loc.city}, ${loc.country}`,
              city: loc.city,
              country: loc.country,
            }))
            .filter(Boolean) || [];
        setLocations(locationsData);

        // Fetch employment types - API returns {value, label}
        const employmentTypesResponse =
          await employmentTypeAPI.getAllEmploymentTypes();
        const employmentTypesData =
          employmentTypesResponse.data
            ?.map((type) => ({
              value: type.value,
              label: type.label,
            }))
            .filter(Boolean) || [];
        setEmploymentTypes(employmentTypesData);

        // Fetch work modes - API returns {value, label}
        const workModesResponse = await workModeAPI.getAllWorkModes();
        const workModesData =
          workModesResponse.data
            ?.map((mode) => ({
              value: mode.value,
              label: mode.label,
            }))
            .filter(Boolean) || [];
        setWorkModes(workModesData);

        // Fetch experience levels - API returns {value, label}
        const experienceLevelsResponse =
          await experienceLevelAPI.getAllExperienceLevels();
        const experienceLevelsData =
          experienceLevelsResponse.data
            ?.map((level) => ({
              value: level.value,
              label: level.label,
            }))
            .filter(Boolean) || [];
        setExperienceLevels(experienceLevelsData);
      } catch (error) {
        console.error("Error fetching form data:", error);
        toast.error("Failed to load form data");

        // Fallback to default values if API fails
        setCategories([
          { id: "1", name: "Technology" },
          { id: "2", name: "Marketing" },
          { id: "3", name: "Design" },
          { id: "4", name: "Sales" },
          { id: "5", name: "Finance" },
          { id: "6", name: "Hotels & Tourism" },
          { id: "7", name: "Healthcare" },
          { id: "8", name: "Education" },
          { id: "9", name: "Manufacturing" },
          { id: "10", name: "Retail" },
        ]);
        setLocations([
          "Nairobi, Kenya",
          "Lagos, Nigeria",
          "Mombasa, Kenya",
          "Abuja, Nigeria",
          "Johannesburg, South Africa",
        ]);

        // Fallback for employment types
        setEmploymentTypes([
          { value: "full_time", label: "Full-time" },
          { value: "part_time", label: "Part-time" },
          { value: "contract", label: "Contract" },
          { value: "internship", label: "Internship" },
        ]);

        // Fallback for work modes
        setWorkModes([
          { value: "remote", label: "Remote" },
          { value: "hybrid", label: "Hybrid" },
          { value: "on_site", label: "On-site" },
        ]);

        // Fallback for experience levels
        setExperienceLevels([
          { value: "entry", label: "Entry" },
          { value: "mid", label: "Mid" },
          { value: "senior", label: "Senior" },
          { value: "lead", label: "Lead" },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchFormData();
  }, []);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleArrayFieldChange = (field, index, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].map((item, i) => (i === index ? value : item)),
    }));
  };

  const addArrayField = (field) => {
    setFormData((prev) => ({
      ...prev,
      [field]: [...prev[field], ""],
    }));
  };

  const removeArrayField = (field, index) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index),
    }));
  };

  const addTag = () => {
    if (currentTag.trim() && !formData.tags.includes(currentTag.trim())) {
      setFormData((prev) => ({
        ...prev,
        tags: [...prev.tags, currentTag.trim()],
      }));
      setCurrentTag("");
    }
  };

  const removeTag = (tagToRemove) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }));
  };

  const toggleBenefit = (benefit) => {
    setFormData((prev) => ({
      ...prev,
      benefits: prev.benefits.includes(benefit)
        ? prev.benefits.filter((b) => b !== benefit)
        : [...prev.benefits, benefit],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Enhanced validation with detailed error messages
    const errors = [];

    if (!formData.title?.trim()) errors.push("Job Title");
    if (!formData.category) errors.push("Category");
    if (!formData.type) errors.push("Job Type");
    if (!formData.location_id) errors.push("Location");
    if (!formData.workMode) errors.push("Work Mode");

    if (errors.length > 0) {
      toast.error(`Please fill in all required fields: ${errors.join(", ")}`);
      return;
    }

    // Debug logging to check form data
    console.log("Form data before submission:", formData);
    console.log("Selected category:", formData.category);
    console.log("Available categories:", categories);

    // Transform to match backend schema
    const payload = {
      title: formData.title.trim(),
      description: formData.description?.trim() || "",
      company_name: companyName,
      employment_type: formData.type,
      work_mode: formData.workMode,
      experience_level: formData.experience || null,
      salary: formData.salary ? parseFloat(formData.salary) : null,
      responsibilities:
        formData.responsibilities.filter((r) => r.trim()).join("\n") || "",
      professional_skills:
        formData.skills.filter((s) => s.trim()).join("\n") || "",
      tags: formData.tags,
      location_id: formData.location_id,
      category_id: formData.category,
      degree_requirement: formData.degree || null,
      benefits: formData.benefits.length > 0 ? formData.benefits : null,
      additional_requirements:
        formData.requirements.filter((req) => req.trim()).join("\n") || null,
    };

    console.log("Final Payload:", JSON.stringify(payload, null, 2));

    // Final validation log
    console.log("Payload being sent:", payload);

    if (!payload.category_id) {
      toast.error("Category is required. Please select a valid category.");
      return;
    }

    try {
      setLoading(true);
      await jobAPI.createJob(payload);
      toast.success("Job posted successfully!");
      onSuccess();
    } catch (err) {
      // More specific error handling
      if (err.response?.status === 400) {
        const errorData = err.response.data;
        if (typeof errorData === "object") {
          const errorMessages = Object.entries(errorData)
            .map(
              ([key, value]) =>
                `${key}: ${Array.isArray(value) ? value.join(", ") : value}`
            )
            .join("\n");
          toast.error(`Validation errors:\n${errorMessages}`);
        } else {
          toast.error("Please check all required fields and try again.");
        }
      } else if (err.response?.status === 500) {
        toast.error("Server error. Please try again later.");
      } else {
        toast.error("Failed to post job. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const saveDraft = () => {
    const draftData = {
      ...formData,
      companyName,
      isDraft: true,
      savedAt: new Date().toISOString(),
    };

    const existingDrafts = JSON.parse(
      localStorage.getItem("jobDrafts") || "[]"
    );
    existingDrafts.push(draftData);
    localStorage.setItem("jobDrafts", JSON.stringify(existingDrafts));

    console.log("Draft saved:", draftData);
    toast.success("Draft saved successfully!");
    onSuccess();
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  // Generate unique keys for options
  const generateKey = (value, index) => {
    return value ? `${value}-${index}` : `option-${index}`;
  };

  return (
    <div className="bg-neutral-50">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-neutral-900 mb-2">
          Create New Job Posting
        </h1>
        <p className="text-neutral-600">
          Fill in the details to create a comprehensive job listing
        </p>
      </div>

      <div className="space-y-6 max-h-[60vh] overflow-y-auto pr-2">
        {/* Basic Information */}
        <div className="border-b border-neutral-200 pb-6">
          <h2 className="text-xl font-semibold text-neutral-800 mb-4">
            Basic Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Job Title *
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => handleInputChange("title", e.target.value)}
                className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="e.g., Frontend Developer"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Category *
              </label>
              <select
                value={formData.category}
                onChange={(e) => {
                  console.log("Category selected:", e.target.value);
                  handleInputChange("category", e.target.value);
                }}
                className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                required
              >
                <option value="">Select Category</option>
                {categories.map((cat, index) => (
                  <option key={generateKey(cat.id, index)} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Job Type *
              </label>
              <select
                value={formData.type}
                onChange={(e) => handleInputChange("type", e.target.value)}
                className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                required
              >
                <option value="">Select Type</option>
                {employmentTypes.map((type, index) => (
                  <option
                    key={generateKey(type.value, index)}
                    value={type.value}
                  >
                    {type.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Work Mode *
              </label>
              <select
                value={formData.workMode}
                onChange={(e) => handleInputChange("workMode", e.target.value)}
                className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                required
              >
                <option value="">Select Work Mode</option>
                {workModes.map((mode, index) => (
                  <option
                    key={generateKey(mode.value, index)}
                    value={mode.value}
                  >
                    {mode.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Salary Range
              </label>
              <input
                type="text"
                value={formData.salary}
                onChange={(e) => handleInputChange("salary", e.target.value)}
                placeholder="3000 (monthly amount in USD)"
                className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Location *
              </label>
              <select
                value={formData.location_id}
                onChange={(e) =>
                  handleInputChange("location_id", e.target.value)
                }
                className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                required
              >
                <option value="">Select Location</option>
                {locations.map((location, index) => (
                  <option
                    key={generateKey(location.id, index)}
                    value={location.id}
                  >
                    {location.displayName}
                  </option>
                ))}
              </select>
              <p className="text-xs text-neutral-500 mt-1">
                Can't find your location? Contact support to add new locations.
              </p>
            </div>

            {/* Custom Location Input */}
            <div className="md:col-span-2">
              <input
                type="text"
                name="customLocation"
                placeholder="Or enter custom location..."
                onChange={(e) => handleInputChange("location", e.target.value)}
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
                key={`${tag}-${index}`}
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
              onKeyPress={(e) =>
                e.key === "Enter" && (e.preventDefault(), addTag())
              }
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
          <h2 className="text-xl font-semibold text-neutral-800 mb-4">
            Job Description
          </h2>
          <textarea
            value={formData.description}
            onChange={(e) => handleInputChange("description", e.target.value)}
            rows={4}
            placeholder="Provide a detailed description of the role, what the candidate will be doing, and what makes this opportunity exciting..."
            className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>

        {/* Responsibilities */}
        <div className="border-b border-neutral-200 pb-6">
          <h2 className="text-xl font-semibold text-neutral-800 mb-4">
            Key Responsibilities
          </h2>
          {formData.responsibilities.map((responsibility, index) => (
            <div key={`responsibility-${index}`} className="flex gap-2 mb-3">
              <input
                type="text"
                value={responsibility}
                onChange={(e) =>
                  handleArrayFieldChange(
                    "responsibilities",
                    index,
                    e.target.value
                  )
                }
                placeholder={`Responsibility ${index + 1}`}
                className="flex-1 px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
              {formData.responsibilities.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeArrayField("responsibilities", index)}
                  className="px-3 py-2 text-red-600 hover:text-red-800"
                >
                  Remove
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={() => addArrayField("responsibilities")}
            className="text-primary-600 hover:text-primary-800 text-sm"
          >
            + Add another responsibility
          </button>
        </div>

        {/* Required Skills */}
        <div className="border-b border-neutral-200 pb-6">
          <h2 className="text-xl font-semibold text-neutral-800 mb-4">
            Required Skills
          </h2>
          {formData.skills.map((skill, index) => (
            <div key={`skill-${index}`} className="flex gap-2 mb-3">
              <input
                type="text"
                value={skill}
                onChange={(e) =>
                  handleArrayFieldChange("skills", index, e.target.value)
                }
                placeholder={`Skill ${index + 1}`}
                className="flex-1 px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
              {formData.skills.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeArrayField("skills", index)}
                  className="px-3 py-2 text-red-600 hover:text-red-800"
                >
                  Remove
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={() => addArrayField("skills")}
            className="text-primary-600 hover:text-primary-800 text-sm"
          >
            + Add another skill
          </button>
        </div>

        {/* Experience & Education */}
        <div className="border-b border-neutral-200 pb-6">
          <h2 className="text-xl font-semibold text-neutral-800 mb-4">
            Experience & Education
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Experience Level
              </label>
              <select
                value={formData.experience}
                onChange={(e) =>
                  handleInputChange("experience", e.target.value)
                }
                className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="">Select Experience Level</option>
                {experienceLevels.map((level, index) => (
                  <option
                    key={generateKey(level.value, index)}
                    value={level.value}
                  >
                    {level.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Degree Requirement
              </label>
              <select
                value={formData.degree}
                onChange={(e) => handleInputChange("degree", e.target.value)}
                className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="">Select Degree Requirement</option>
                {degreeRequirements.map((degree, index) => (
                  <option key={generateKey(degree, index)} value={degree}>
                    {degree}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Benefits */}
        <div className="border-b border-neutral-200 pb-6">
          <h2 className="text-xl font-semibold text-neutral-800 mb-4">
            Benefits & Perks
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {commonBenefits.map((benefit, index) => (
              <label
                key={generateKey(benefit, index)}
                className="flex items-center"
              >
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
          <h2 className="text-xl font-semibold text-neutral-800 mb-4">
            Additional Requirements
          </h2>
          {formData.requirements.map((requirement, index) => (
            <div key={`requirement-${index}`} className="flex gap-2 mb-3">
              <input
                type="text"
                value={requirement}
                onChange={(e) =>
                  handleArrayFieldChange("requirements", index, e.target.value)
                }
                placeholder={`Requirement ${index + 1}`}
                className="flex-1 px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
              {formData.requirements.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeArrayField("requirements", index)}
                  className="px-3 py-2 text-red-600 hover:text-red-800"
                >
                  Remove
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={() => addArrayField("requirements")}
            className="text-primary-600 hover:text-primary-800 text-sm"
          >
            + Add another requirement
          </button>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col md:flex-row gap-4 justify-between pt-6">
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
            disabled={loading}
          >
            Save as Draft
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            className="px-6 py-3 bg-primary-600 text-white rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={loading}
          >
            {loading ? "Posting..." : "Post Job"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobForm;
