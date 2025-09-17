import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiEye, FiEyeOff, FiUser } from "react-icons/fi";
import { FaBriefcase, FaUser } from "react-icons/fa";
import { TeamImage, Handshake } from "../components/UI/Details";
import { FcGoogle } from "react-icons/fc";


const SignUp = () => {
  const navigate = useNavigate();
  const [accountType, setAccountType] = useState("jobseeker");

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    fullName: "",
    companyName: "",
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

  //   Form Validation

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = "Email is required";
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

    if (accountType === "jobseeker" && !formData.fullName) {
      newErrors.fullName = "Full name is required";
    }

    if (accountType === "organization" && !formData.companyName) {
      newErrors.companyName = "Company name is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    console.log("Signup attempt:", { ...formData, accountType });

    setFormData({
    email: "",
    password: "",
    confirmPassword: "",
    fullName: "",
    companyName: "",
    });
    setErrors({});
    setIsLoading(false);
  };

  const handleGoogleSignup = () => {
    console.log("Google signup clicked for:", accountType);
  };

  const switchAccountType = (type) => {
    setAccountType(type);
    setFormData((prev) => ({
      ...prev,
      fullName: "",
      companyName: "",
    }));
    setErrors({});
  };

  return (
    <div className="min-h-screen flex ">
      {/* left  */}

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
              {accountType === "jobseeker"
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

      {/* Right */}

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

            {/* Acount Type */}

            <div className="mb-8">
              <div className="flex bg-neutral-100 rounded-lg p-1">
                <button
                  onClick={() => switchAccountType("jobseeker")}
                  className={`flex-1 flex items-center justify-center py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                    accountType === "jobseeker"
                      ? "bg-primary-500 text-white shadow-sm"
                      : "text-neutral-600 hover:text-neutral-800"
                  }`}
                >
                  <FaUser size={16} className="mr-2" />
                  Job Seekers
                </button>
                <button
                  onClick={() => switchAccountType("organization")}
                  className={`flex-1 flex items-center justify-center py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                    accountType === "organization"
                      ? "bg-primary-500 text-white shadow-sm"
                      : "text-neutral-600 hover:text-neutral-800"
                  }`}
                >
                  <FaBriefcase size={16} className="mr-2" />
                  Organizations
                </button>
              </div>
            </div>

            {/* form */}

            <form action="" className="space-y-6" onSubmit={handleSubmit}>
              {/* Name */}
              <div>
                <label
                  htmlFor=""
                  className="block text-sm font-medium text-neutral-700 mb-2"
                >
                  {accountType === "jobseeker" ? "Full Name" : "Company Name"}
                </label>
                <input
                  type="text"
                  name={
                    accountType === "jobseeker" ? "fullName" : "companyName"
                  }
                  value={
                    accountType === "jobseeker"
                      ? formData.fullName
                      : formData.companyName
                  }
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:border-transparent focus:ring-2 focus:ring-primary-500 transition-colors ${
                    errors[
                      accountType === "jobseeker" ? "fullName" : "companyName"
                    ]
                      ? "border-red-300"
                      : "border-neutral-300"
                  }`}
                  placeholder={
                    accountType === "jobseeker"
                      ? "Enter your full name"
                      : "Enter your company name"
                  }
                />
                {errors[
                  accountType === "jobseeker" ? "fullName" : "companyName"
                ] && (
                  <p className="text-red-500 text-sm mt-1">
                    {
                      errors[
                        accountType === "jobseeker" ? "fullName" : "companyName"
                      ]
                    }
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-neutral-700 mb-2"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
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

              {/* Password */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-neutral-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 pr-12 border-2 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent focus:outline-none transition-colors ${
                      errors.password ? 'border-red-300' : 'border-neutral-300'
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

              {/* Confirm Pasword */}
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-neutral-700 mb-2">
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 pr-12 border-2 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent focus:outline-none transition-colors ${
                      errors.confirmPassword ? 'border-red-300' : 'border-neutral-300'
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
                  `Create ${accountType === 'jobseeker' ? 'Job Seeker' : 'Organization'} Account`
                )}
              </button>
            </form>

            {/* Divider */}
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
              <span className="text-neutral-700 font-medium">Continue with Google</span>
            </button>

            {/* Sign In Link */}
            <p className="text-center text-neutral-600 mt-6">
              Already have an account?{' '}
              <button className="text-primary-600 hover:text-primary-700 font-medium" onClick={() => navigate("/sign-in")}>
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
