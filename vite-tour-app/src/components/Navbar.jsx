import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../hooks/useAuth";

import {
  Bars3Icon,
  XMarkIcon,
  ChevronDownIcon,
  ArrowRightOnRectangleIcon,
  UserPlusIcon,
  UserIcon,
  SparklesIcon,
  CogIcon,
} from "@heroicons/react/24/outline";

function Navbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md h-16 px-6 sm:px-10 flex items-center justify-between text-gray-800">
      <Link to="/" className="text-xl sm:text-2xl font-bold text-red-600">
        TravelGo
      </Link>

      {/* Desktop Nav */}
      <nav className="hidden md:block">
        <ul className="flex gap-6 font-medium text-sm">
          <li><Link to="/" className="hover:text-red-600 transition">Home</Link></li>
          <li><Link to="/about_us" className="hover:text-red-600 transition">About</Link></li>
          <li><Link to="/services" className="hover:text-red-600 transition">Services</Link></li>
          {isLoggedIn && (
            <li>
              <Link to="/recommendations/results" className="hover:text-red-600 flex items-center gap-1">
                <SparklesIcon className="h-5 w-5" /> Recommended
              </Link>
            </li>
          )}
          {/* Dropdown */}
          <li className="relative group">
            <button className="flex items-center gap-1 hover:text-red-600 transition">
              More <ChevronDownIcon className="h-4 w-4" />
            </button>
            <div className="absolute hidden group-hover:block bg-white border shadow-lg mt-2 rounded-md w-52 z-50">
              {/* <Link to="/destinations" className="block px-4 py-2 hover:bg-red-100">Destinations</Link> */}
              <Link to="/packages" className="block px-4 py-2 hover:bg-red-100">Tours & Packages</Link>
              <Link to="/contact" className="block px-4 py-2 hover:bg-red-100">Contact Us</Link>
              <Link to="/pricing" className="block px-4 py-2 hover:bg-red-100">Pricing</Link>
              <hr className="my-1" />
              {isLoggedIn ? (
                <>
                  <Link to="/dashboard" className="block px-4 py-2 hover:bg-red-100">Dashboard</Link>
                  <Link to="/recommendations/preferences" className="block px-4 py-2 hover:bg-red-100">Adjust Preferences</Link>
                  <button
                    onClick={logout}
                    className="w-full text-left px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md mt-1"
                  >
                    <ArrowRightOnRectangleIcon className="h-5 w-5 inline mr-1" /> Logout
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" className="block px-4 py-2 text-white bg-red-500 hover:bg-red-600 rounded-md my-1 mx-2 text-center">Login</Link>
                  <Link to="/signup" className="block px-4 py-2 text-white bg-red-500 hover:bg-red-600 rounded-md my-1 mx-2 text-center">Register</Link>
                </>
              )}
            </div>
          </li>
        </ul>
      </nav>

      {/* CTA */}
      <Link
        to="/signup"
        className="hidden md:inline-block bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600 transition"
      >
        Get in Touch
      </Link>

      {/* Mobile Toggle */}
      <button
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        className="md:hidden text-gray-600 hover:text-red-600"
      >
        {mobileMenuOpen ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
      </button>

      {/* Mobile Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-white shadow-md z-30 py-6 px-6 animate-slideDown">
          <nav className="flex flex-col space-y-4 text-sm font-medium">
            <Link to="/" className="hover:text-red-600">Home</Link>
            <Link to="/about_us" className="hover:text-red-600">About</Link>
            <Link to="/services" className="hover:text-red-600">Services</Link>
            {/* <Link to="/destinations" className="hover:text-red-600">Destinations</Link> */}
            <Link to="/packages" className="hover:text-red-600">Tours & Packages</Link>
            <Link to="/contact" className="hover:text-red-600">Contact Us</Link>
            <Link to="/pricing" className="hover:text-red-600">Pricing</Link>
            {isLoggedIn && (
              <Link to="/recommendations/results" className="flex items-center gap-2 hover:text-red-600">
                <SparklesIcon className="h-5 w-5" /> Recommended
              </Link>
            )}
            {isLoggedIn && (
              <Link to="/recommendations/preferences" className="flex items-center gap-2 hover:text-red-600">
                <CogIcon className="h-5 w-5" /> Adjust Preferences
              </Link>
            )}
            <hr className="border-gray-200" />
            {!isLoggedIn ? (
              <>
                <Link to="/login" className="flex items-center gap-2 text-white bg-red-500 hover:bg-red-600 px-4 py-2 rounded-md justify-center">
                  <UserIcon className="h-5 w-5" /> Login
                </Link>
                <Link to="/signup" className="flex items-center gap-2 text-white bg-red-500 hover:bg-red-600 px-4 py-2 rounded-md justify-center">
                  <UserPlusIcon className="h-5 w-5" /> Register
                </Link>
              </>
            ) : (
              <button
                onClick={logout}
                className="flex items-center justify-center gap-2 text-white bg-red-500 hover:bg-red-600 px-4 py-2 rounded-md"
              >
                <ArrowRightOnRectangleIcon className="h-5 w-5" /> Logout
              </button>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}

export default Navbar;
