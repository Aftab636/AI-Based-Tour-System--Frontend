import { useNavigate } from "react-router-dom";

const Welcome = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate("/dashboard");
  };

  return (
    <div
      className="h-screen w-screen flex items-center justify-center bg-cover bg-center text-white"
      style={{
        backgroundImage: "url('/assets/images/welcome.png')", // Ensure this image is in /public/assets/images
      }}
    >
      <div className="bg-black/60 backdrop-blur-lg rounded-2xl px-10 py-12 max-w-xl w-full text-center border border-white/20 shadow-2xl">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
          Welcome to Your Travel Company Dashboard
        </h1>
        <p className="text-lg text-gray-200 mb-8">
          Manage tours, add packages, and grow your travel business—all in one powerful place.
        </p>
        <button
          onClick={handleGetStarted}
          className="bg-white text-blue-600 font-semibold px-6 py-3 rounded-lg shadow hover:bg-gray-100 transition duration-300"
        >
          Get Started
        </button>
      </div>
    </div>
  );
};

export default Welcome;
