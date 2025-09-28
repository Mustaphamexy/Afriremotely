import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FiEye, FiEyeOff, FiUser } from "react-icons/fi";
import { FaBriefcase, FaUser } from "react-icons/fa";
import { TeamImage, Handshake } from "../components/UI/Details";
import { FcGoogle } from "react-icons/fc";

const SignUp = () => {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [accountType, setAccountType] = useState("applicant");

  const [formData, setFormData] = useState({
    username: "", // Changed from fullName/companyName to username
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear specific error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  // Form Validation
  const validateForm = () => {
    const newErrors = {};

    if (!formData.username) {
      newErrors.username = accountType === "applicant" 
        ? "Full name is required" 
        : "Company name is required";
    }

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      const result = await signup(
        formData.username, // Send as username (backend expects this)
        formData.email,
        formData.password,
        formData.confirmPassword,
        accountType // This will be "applicant" or "recruiter"
      );

      if (result.success) {
        console.log("Signup successful:", result.data);

        // Reset form
        setFormData({
          username: "",
          email: "",
          password: "",
          confirmPassword: "",
        });
        setErrors({});

        // Redirect to login page
        navigate("/sign-in");
      } else {
        // Handle signup errors from API
        if (result.error) {
          // Handle Django REST framework error format
          if (typeof result.error === 'object') {
            const apiErrors = {};
            Object.keys(result.error).forEach(key => {
              apiErrors[key] = Array.isArray(result.error[key]) 
                ? result.error[key].join(', ') 
                : result.error[key];
            });
            setErrors(apiErrors);
          } else {
            setErrors({ submit: result.error });
          }
        } else {
          setErrors({ submit: "Signup failed. Please try again." });
        }
        console.error("Signup error:", result.error);
      }
    } catch (error) {
      setErrors({ submit: "An unexpected error occurred. Please try again." });
      console.error("Unexpected error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignup = () => {
    console.log("Google signup clicked for:", accountType);
  };

  const switchAccountType = (type) => {
    setAccountType(type);
    setFormData(prev => ({
      ...prev,
      username: "", // Clear username when switching
    }));
    setErrors({});
  };

  return (
    <div className="min-h-screen flex ">
      {/* Left Section - Unchanged */}
      <div className="hidden md:flex md:w-1/2 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-neutral-800 to-neutral-900 ">
          <img
            src={TeamImage}
            alt="Team collaboration"
            className="w-full h-full object-cover opacity-40"
          />
        </div>
        <div className="relative z-10 flex items-center justify-center p-14">
          <div className="text-center text-white">
            <h1 className="text-4xl font-bold mb-6">
              Welcome To Afri<span className="text-primary-500">Remotely</span>{" "}
            </h1>
            <p className="text-xl text-secondary-100 max-w-md">
              {accountType === "applicant"
                ? "Discover amazing career opportunities and take your professional journey to the next level."
                : "Connect with top talent and build your dream team with our powerful hiring platform."}
            </p>
            <div className="mt-8 grid grid-cols-2 gap-4">
              <div className="bg-primary-500 bg-opacity-20 rounded-lg p-2">
                <p className="text-sm">Perfect Matches</p>
              </div>
              <div className="bg-primary-500 bg-opacity-20 rounded-lg p-2">
                <p className="text-sm">Fast Process</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex-1 flex items-center justify-center bg-primary-100">
        <div className="w-full max-w-md sm:mx-4 mx-2 my-4">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="text-center mb-8">
              <h1
                onClick={() => navigate("/")}
                className="text-black text-3xl lg:text-4xl font-bold cursor-pointer border-b border-primary-500 pb-4"
              >
                Afri<span className="text-primary">Remotely</span>
              </h1>
              <h2 className="text-3xl font-bold text-neutral-900 mb-2 pt-4">
                Create Account
              </h2>
              <p className="text-neutral-600">Join our platform today</p>
            </div>

            {/* Error Message */}
            {errors.submit && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-600 text-sm text-center font-medium">
                  {errors.submit}
                </p>
              </div>
            )}

            {/* Account Type Selector */}
            <div className="mb-8">
              <div className="flex bg-neutral-100 rounded-lg p-1">
                <button
                  onClick={() => switchAccountType("applicant")}
                  className={`flex-1 flex items-center justify-center py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                    accountType === "applicant"
                      ? "bg-primary-500 text-white shadow-sm"
                      : "text-neutral-600 hover:text-neutral-800"
                  }`}
                >
                  <FaUser size={16} className="mr-2" />
                  Job Seeker
                </button>
                <button
                  onClick={() => switchAccountType("recruiter")}
                  className={`flex-1 flex items-center justify-center py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                    accountType === "recruiter"
                      ? "bg-primary-500 text-white shadow-sm"
                      : "text-neutral-600 hover:text-neutral-800"
                  }`}
                >
                  <FaBriefcase size={16} className="mr-2" />
                  Recruiter
                </button>
              </div>
            </div>

            {/* Form */}
            <form className="space-y-6" onSubmit={handleSubmit}>
              {/* Name/Company Name Field */}
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  {accountType === "applicant" ? "Full Name" : "Company Name"}
                </label>
                <input
                  type="text"
                  name="username" // Changed to username
                  value={formData.username}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:border-transparent focus:ring-2 focus:ring-primary-500 transition-colors ${
                    errors.username ? "border-red-300" : "border-neutral-300"
                  }`}
                  placeholder={
                    accountType === "applicant"
                      ? "Enter your full name"
                      : "Enter your company name"
                  }
                />
                {errors.username && (
                  <p className="text-red-500 text-sm mt-1">{errors.username}</p>
                )}
              </div>

              {/* Email Field */}
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent focus:outline-none transition-colors ${
                    errors.email ? "border-red-300" : "border-neutral-300"
                  }`}
                  placeholder="Enter your email"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
              </div>

              {/* Password Field */}
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 pr-12 border-2 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent focus:outline-none transition-colors ${
                      errors.password ? "border-red-300" : "border-neutral-300"
                    }`}
                    placeholder="Create a password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-neutral-400 hover:text-neutral-600"
                  >
                    {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                )}
              </div>

              {/* Confirm Password Field */}
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 pr-12 border-2 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent focus:outline-none transition-colors ${
                      errors.confirmPassword ? "border-red-300" : "border-neutral-300"
                    }`}
                    placeholder="Confirm your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-3 text-neutral-400 hover:text-neutral-600"
                  >
                    {showConfirmPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-primary-500 hover:bg-primary-600 disabled:bg-primary-300 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Creating Account...
                  </div>
                ) : (
                  `Create ${accountType === "applicant" ? "Job Seeker" : "Recruiter"} Account`
                )}
              </button>
            </form>

            {/* Rest of the component remains the same */}
            <div className="my-6 flex items-center">
              <div className="flex-1 border-t border-neutral-300"></div>
              <span className="px-4 text-neutral-500 text-sm">or</span>
              <div className="flex-1 border-t border-neutral-300"></div>
            </div>
            
            <button
              onClick={handleGoogleSignup}
              className="w-full flex items-center justify-center px-4 py-3 border border-neutral-300 rounded-lg hover:bg-neutral-50 transition-colors duration-200"
            >
              <img
                src="https://developers.google.com/identity/images/g-logo.png"
                alt="Google"
                className="w-5 h-5 mr-3"
              />
              <span className="text-neutral-700 font-medium">
                Continue with Google
              </span>
            </button>

            <p className="text-center text-neutral-600 mt-6">
              Already have an account?{" "}
              <button
                className="text-primary-600 hover:text-primary-700 font-medium cursor-pointer"
                onClick={() => navigate("/sign-in")}
              >
                Sign In
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;