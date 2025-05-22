// // src/routes/AppRoutes.jsx
// import { Routes, Route } from 'react-router-dom';
// import Home from '../pages/Home';
// import AboutUs from '../pages/AboutUs';
// import Login from '../pages/Login';
// import Signup from '../pages/Signup';
// import Dashboard from '../pages/Dashboard';
// import Packages from '../pages/Packages';
// import TourInfo from '../pages/TourInfo';
// import AddPackage from '../pages/AddPackage';
// import UpdatePackage from '../pages/UpdatePackage';
// import ManagePackages from '../pages/ManagePackages';
// import CompareTours from '../pages/CompareTours';
// import BookTour from '../pages/BookTour';
// import Recommendations from '../pages/Recommendations';
// import Preferences from '../pages/Preferences';
// import Payment from '../pages/Payment';
// import WelcomePage from '../pages/WelcomePage';
// // ...add more as needed

// const AppRoutes = () => {
//   return (
//     <Routes>
//       <Route path="/" element={<Home />} />
//       <Route path="/about" element={<AboutUs />} />
//       <Route path="/login" element={<Login />} />
//       <Route path="/signup" element={<Signup />} />
//       <Route path="/dashboard" element={<Dashboard />} />
//       <Route path="/packages" element={<Packages />} />
//       <Route path="/tour_info/:id" element={<TourInfo />} />
//       <Route path="/add_package" element={<AddPackage />} />
//       <Route path="/update_package/:id" element={<UpdatePackage />} />
//       <Route path="/managePackages" element={<ManagePackages />} />
//       <Route path="/compare-tours" element={<CompareTours />} />
//       <Route path="/book" element={<BookTour />} />
//       <Route path="/recommendations" element={<Recommendations />} />
//       <Route path="/recommendations/preferences" element={<Preferences />} />
//       <Route path="/payment" element={<Payment />} />
//       <Route path="/welcome" element={<WelcomePage />} />
//       {/* Add fallback or 404 route if needed */}
//     </Routes>
//   );
// };

// export default AppRoutes;


















import { Routes, Route } from 'react-router-dom';

// Pages
import Home from '../pages/Home';
import AboutUs from '../pages/AboutUs';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import Dashboard from '../pages/Dashboard';
import Packages from '../pages/Packages';
import TourInfo from '../pages/TourInfo';
import AddPackage from '../pages/AddPackage';
import UpdatePackage from '../pages/UpdatePackage';
import ManagePackages from '../pages/ManagePackages';
import CompareTours from '../pages/CompareTours';
import BookTour from '../pages/BookTour';
import Recommendations from '../pages/Recommendations';
import CompanyReportsPage from "../pages/CompanyReportsPage";
import Preferences from '../pages/Preferences';
import Payment from '../pages/Payment';
import WelcomePage from '../pages/WelcomePage';
import Services from '../pages/Services';         // 🔄 Make sure this exists
import Contact from '../pages/Contact';           // 🔄 Make sure this exists
import Pricing from '../pages/Pricing';           // 🔄 Make sure this exists
import NotFound from '../pages/NotFound';   
import RecommendationResults from "../pages/RecommendationResults";  
import PaymentPage from "../pages/PaymentPage";    // 🔄 Optional fallback 404

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about_us" element={<AboutUs />} />
      <Route path="/company/reports" element={<CompanyReportsPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/packages" element={<Packages />} />
      <Route path="/tour_info/:id" element={<TourInfo />} />
      <Route path="/add_package" element={<AddPackage />} />
      <Route path="/recommendations/results" element={<RecommendationResults />} />
      <Route path="/update_package/:id" element={<UpdatePackage />} />
      <Route path="/managePackages" element={<ManagePackages />} />
      <Route path="/compare-tours" element={<CompareTours />} />
      <Route path="/book" element={<BookTour />} />
      <Route path="/recommendations" element={<Recommendations />} />
      <Route path="/recommendations/preferences" element={<Preferences />} />
      <Route path="/payment" element={<Payment />} />
   <Route path="/payment/:id" element={<PaymentPage />} />
      <Route path="/welcome" element={<WelcomePage />} />

      {/* ✅ Extra routes */}
      <Route path="/services" element={<Services />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/pricing" element={<Pricing />} />

      {/* ✅ 404 fallback route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
