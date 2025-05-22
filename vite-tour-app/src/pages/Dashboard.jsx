import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  PlusCircleIcon,
  BriefcaseIcon,
  ChartBarIcon,
  CogIcon,
  HomeIcon,
} from "@heroicons/react/24/outline";

const CompanyDashboard = () => {
  const navigate = useNavigate();
  const [companyName, setCompanyName] = useState("Your Company");

  useEffect(() => {
    // Simulate async company name fetching
    const timer = setTimeout(() => {
      setCompanyName("Awesome Travel Inc.");
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white py-10 px-4">
      <div className="max-w-7xl mx-auto space-y-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-1">
              Welcome, {companyName}!
            </h1>
            <p className="text-gray-600 text-sm">
              Manage your travel packages and grow your business.
            </p>
          </div>
          <Link
            to="/"
            className="inline-flex items-center gap-2 border border-gray-300 bg-white px-4 py-2 rounded-lg shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-100 transition"
          >
            <HomeIcon className="h-5 w-5 text-gray-500" />
            Website Home
          </Link>
        </div>

        {/* Dashboard Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Add Package */}
          <Link
            to="/add_package"
            className="group bg-white rounded-xl p-6 text-center shadow-md hover:shadow-lg transition"
          >
            <PlusCircleIcon className="h-10 w-10 text-blue-500 mb-3 mx-auto group-hover:scale-110 transition-transform" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Add Packages
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Create new and exciting travel experiences.
            </p>
            <span className="inline-block px-3 py-1 text-sm font-medium rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200 transition">
              Get Started
            </span>
          </Link>

          {/* Manage Packages */}
          <Link
            to="/managePackages"
            className="group bg-white rounded-xl p-6 text-center shadow-md hover:shadow-lg transition"
          >
            <BriefcaseIcon className="h-10 w-10 text-green-500 mb-3 mx-auto group-hover:scale-110 transition-transform" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Manage Packages
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              View, edit, and organize your existing packages.
            </p>
            <span className="inline-block px-3 py-1 text-sm font-medium rounded-full bg-green-100 text-green-600 hover:bg-green-200 transition">
              Go to Management
            </span>
          </Link>

         {/* Analytics / Reports */}
<Link
  to="/company/reports"
  className="group bg-white rounded-xl p-6 text-center shadow-md hover:shadow-lg transition cursor-pointer"
>
  <ChartBarIcon className="h-10 w-10 text-indigo-500 mb-3 mx-auto group-hover:scale-110 transition-transform" />
  <h3 className="text-xl font-semibold text-gray-900 mb-2">
    Analytics & Reports
  </h3>
  <p className="text-sm text-gray-600 mb-4">
    Track performance and analyze your package data.
  </p>
  <span className="inline-block px-3 py-1 text-sm font-medium rounded-full bg-indigo-100 text-indigo-600 hover:bg-indigo-200 transition">
    View Reports
  </span>
</Link>

          {/* Settings */}
          {/* <div className="group bg-white rounded-xl p-6 text-center shadow-md hover:shadow-lg transition cursor-pointer">
            <CogIcon className="h-10 w-10 text-yellow-500 mb-3 mx-auto group-hover:scale-110 transition-transform" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Settings
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Configure your dashboard and manage company settings.
            </p>
            <span className="inline-block px-3 py-1 text-sm font-medium rounded-full bg-yellow-100 text-yellow-600 hover:bg-yellow-200 transition">
              Edit Settings
            </span>
          </div> */}

          {/* Add more cards if needed */}
        </div>
      </div>
    </div>
  );
};

export default CompanyDashboard;
