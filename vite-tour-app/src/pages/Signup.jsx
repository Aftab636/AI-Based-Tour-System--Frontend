import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  AiOutlineUser,
  AiOutlineMail,
  AiOutlineLock,
  AiOutlineEye,
  AiOutlineEyeInvisible,
} from "react-icons/ai";
import {
  FaCheckCircle,
  FaExclamationCircle,
  FaBuilding,
} from "react-icons/fa";

const SignUp = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    user_type: "",
  });

  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setMessage(null);

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    const payload = {
      username: formData.username,
      email: formData.email,
      password: formData.password,
      user_type: formData.user_type,
    };

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/signup/`,
        payload
      );
      setMessage("Signup successful! Redirecting to login...");
      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } catch (err) {
      if (err.response && err.response.data) {
        const errorData = err.response.data;
        if (errorData.errors) {
          const detailedErrors = Object.entries(errorData.errors)
            .map(([field, messages]) => `${field}: ${messages.join(", ")}`)
            .join("; ");
          setError(`Signup failed. ${detailedErrors}`);
        } else if (errorData.message) {
          setError(`Signup failed. ${errorData.message}`);
        } else {
          setError("Signup failed due to a server error.");
        }
      } else if (err.request) {
        setError("Signup failed. Could not connect to the server.");
      } else {
        setError("Signup failed. An unexpected error occurred.");
      }
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side (image) */}
      <div className="hidden lg:flex w-1/2 min-h-screen relative">
        <div
          className="absolute inset-0 bg-cover bg-center z-0 bg-gradient-to-b from-blue-500/80 to-blue-700/80"
          style={{ backgroundImage: "url('/assets/images/leftForm.jpg')" }}
        ></div>
        <div className="relative z-10 text-white text-center px-8 flex items-center justify-center w-full h-full">
          <div className="max-w-2xl p-8">
            <h1 className="text-4xl font-bold mb-4">Start Your Journey</h1>
            <p className="text-xl opacity-90">
              Join thousands of travelers and companies already using our
              platform
            </p>
          </div>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center bg-gray-50 py-12 px-4">
        <div className="w-full max-w-sm border border-gray-200 rounded-2xl p-6 shadow-2xl bg-white">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-extrabold text-gray-900">
              Create Account
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Already have an account?{" "}
              <button
                onClick={() => navigate("/login")}
                className="text-blue-600 hover:text-blue-500 font-semibold"
              >
                Sign in
              </button>
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {[
              {
                label: "Username",
                name: "username",
                type: "text",
                icon: <AiOutlineUser />,
              },
              {
                label: "Email",
                name: "email",
                type: "email",
                icon: <AiOutlineMail />,
              },
              {
                label: "Password",
                name: "password",
                type: "password",
                icon: <AiOutlineLock />,
              },
              {
                label: "Confirm Password",
                name: "confirmPassword",
                type: "password",
                icon: <AiOutlineLock />,
              },
            ].map((field, index) => (
              <div key={index}>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {field.label}
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                    {field.icon}
                  </span>

                  <input
                    type={
                      field.name === "password"
                        ? showPassword
                          ? "text"
                          : "password"
                        : field.name === "confirmPassword"
                        ? showConfirmPassword
                          ? "text"
                          : "password"
                        : field.type
                    }
                    name={field.name}
                    placeholder={`Enter ${field.label.toLowerCase()}`}
                    value={formData[field.name]}
                    onChange={handleChange}
                    required
                    className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-gray-100 hover:bg-white placeholder:text-gray-400"
                  />

                  {(field.name === "password" ||
                    field.name === "confirmPassword") && (
                    <button
                      type="button"
                      onClick={() =>
                        field.name === "password"
                          ? setShowPassword(!showPassword)
                          : setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                    >
                      {field.name === "password" &&
                        (showPassword ? (
                          <AiOutlineEyeInvisible size={20} />
                        ) : (
                          <AiOutlineEye size={20} />
                        ))}
                      {field.name === "confirmPassword" &&
                        (showConfirmPassword ? (
                          <AiOutlineEyeInvisible size={20} />
                        ) : (
                          <AiOutlineEye size={20} />
                        ))}
                    </button>
                  )}
                </div>
              </div>
            ))}

            {/* Account Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Account Type
              </label>
              <div className="grid grid-cols-2 gap-3">
                {[
                  {
                    type: "tourist",
                    label: "Tourist",
                    icon: <AiOutlineUser />,
                  },
                  {
                    type: "company",
                    label: "Company",
                    icon: <FaBuilding />,
                  },
                ].map((option) => (
                  <button
                    key={option.type}
                    type="button"
                    onClick={() =>
                      setFormData({ ...formData, user_type: option.type })
                    }
                    className={`cursor-pointer flex items-center justify-center py-2 rounded-md border transition-all text-sm font-semibold
                    ${
                      formData.user_type === option.type
                        ? "border-blue-500 bg-blue-100 shadow"
                        : "border-gray-300 hover:border-gray-400 bg-white"
                    }`}
                  >
                    <span className="w-5 h-5 mr-2 text-blue-500">
                      {option.icon}
                    </span>
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Error/Success Messages */}
            {error && (
              <div className="flex items-center p-3 text-sm text-red-700 bg-red-100 rounded-md">
                <FaExclamationCircle className="mr-2 w-5 h-5" />
                {error}
              </div>
            )}
            {message && (
              <div className="flex items-center p-3 text-sm text-green-700 bg-green-100 rounded-md">
                <FaCheckCircle className="mr-2 w-5 h-5" />
                {message}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              className="w-full py-2 rounded-md text-white font-semibold bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 transition-all focus:ring-2 focus:ring-blue-500 shadow-md"
            >
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
