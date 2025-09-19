import React, { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { Welcome } from "../components/UI/Details";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth(); // ✅ get login from AuthContext

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    const { email, password } = formData;
    const result = await login(email, password); // ✅ call AuthContext login

    if (result.success) {
      navigate("/dashboard"); // ✅ redirect to dashboard
    } else {
      setError(result.error || "Invalid credentials");
    }

    setIsLoading(false);
  };

  const handleGoogleLogin = () => {
    console.log("Google login clicked");
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side */}
      <div className="hidden md:flex lg:w-1/2 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-neutral-800 to-neutral-900 ">
          <img
            src={Welcome}
            alt="Professional workspace"
            className="w-full h-full object-cover opacity-30"
          />
        </div>
        <div className="relative z-10 flex items-center justify-center p-12">
          <div className="text-center text-white">
            <h1 className="text-5xl font-bold mb-6">Welcome Back!</h1>
            <p className="text-xl text-secondary-100 max-w-md">
              Sign in to continue your journey towards finding the perfect
              career opportunity.
            </p>
          </div>
        </div>
      </div>

      {/* Right Side */}
      <div className="flex-1 flex items-center justify-center bg-primary-100">
        <div className="w-full max-w-md sm:mx-4 mx-2 my-2">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="text-center mb-8">
              <h1
                onClick={() => navigate("/")}
                className="text-black text-3xl lg:text-4xl font-bold cursor-pointer border-b border-primary-500 pb-4"
              >
                Afri<span className="text-primary">Remotely</span>
              </h1>
              <h2 className="text-3xl font-bold text-neutral-900 mb-2 pt-4">
                Sign In
              </h2>
              <p className="text-neutral-600">
                Access your account to continue
              </p>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mb-4 text-red-600 text-center font-medium">
                {error}
              </div>
            )}

            {/* Form */}
            <form className="space-y-4" onSubmit={handleSubmit}>
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
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent focus:outline-none transition-colors"
                  placeholder="Enter your email"
                />
              </div>

              {/* Password */}
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-neutral-700 mb-2"
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    required
                    value={formData.password}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 pr-12 border-2 border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent focus:outline-none transition-colors"
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-neutral-400 hover:text-neutral-600"
                  >
                    {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                  </button>
                </div>
              </div>

              {/* Forgot Password */}
              <div className="flex justify-end">
                <button
                  type="button"
                  className="text-sm text-primary-600 hover:text-primary-700 font-medium"
                >
                  Forgot your password?
                </button>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-primary-500 hover:bg-primary-600 disabled:bg-primary-300 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Signing in...
                  </div>
                ) : (
                  "Sign In"
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
              onClick={handleGoogleLogin}
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

            {/* Sign Up Link */}
            <p className="text-center text-neutral-600 mt-6">
              Don’t have an account?{" "}
              <button
                className="text-primary-600 hover:text-primary-700 font-medium cursor-pointer"
                onClick={() => navigate("/sign-up")}
              >
                Sign Up
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
