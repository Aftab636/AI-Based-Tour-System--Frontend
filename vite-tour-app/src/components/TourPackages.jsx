import React from "react";

const TourPackages = () => {
  const packages = [
    {
      image: "/assets/images/swat.jpg",
      alt: "Swat Valley",
      flag: "/assets/images/swiss.png",
      days: "8 Days",
      people: "25 People Going",
      name: "Swat Valley",
      location: "Europe",
      discountedPrice: "$1,000",
      originalPrice: "$1,200",
      description:
        "Nam exercitationem commodi et ducimus quia in dolore animi sit mollitia amet id quod eligendi...",
    },
    {
      image: "/assets/images/Amazon.jpg",
      alt: "Amazon",
      flag: "/assets/images/brazil.png",
      days: "8 Days",
      people: "30 People Going",
      name: "Amazon",
      location: "Brazil",
      discountedPrice: "$1,223",
      originalPrice: "$1,200",
      description:
        "Nam exercitationem commodi et ducimus quia in dolore animi sit mollitia amet id quod eligendi...",
    },
    {
      image: "/assets/images/giza.jpg",
      alt: "Giza",
      flag: "/assets/images/egypt.png",
      days: "8 Days",
      people: "155 People Going",
      name: "Giza",
      location: "Egypt",
      discountedPrice: "$1,200",
      originalPrice: "$1,200",
      description:
        "Nam exercitationem commodi et ducimus quia in dolore animi sit mollitia amet id quod eligendi...",
    },
  ];

  return (
    <section className="py-16 px-4 md:px-10 bg-white">
      <h2 className="text-center text-4xl font-bold text-gray-800 mb-12">
        <span className="text-red-500 text-sm uppercase block mb-2">Trendy</span>
        Our Trending Tour Packages
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {packages.map((pkg, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all overflow-hidden"
          >
            <img src={pkg.image} alt={pkg.alt} className="w-full h-56 object-cover" />
            <div className="p-6 relative">
              <div className="absolute top-4 right-4">
                <img src={pkg.flag} alt="flag" className="w-6 h-4 rounded-sm shadow-sm" />
              </div>

              <p className="text-sm text-gray-500 mb-2">
                📅 {pkg.days} &nbsp; 👥 {pkg.people}
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mb-1">{pkg.name}</h3>

              <p className="text-sm text-gray-600 mb-3">
                📍 {pkg.location}
              </p>

              <div className="mb-3">
                <span className="text-red-600 text-lg font-bold mr-2">
                  {pkg.discountedPrice}
                </span>
                <span className="text-gray-400 line-through text-sm">
                  {pkg.originalPrice}
                </span>
              </div>

              <p className="text-sm text-gray-600 mb-4">{pkg.description}</p>

              <button className="w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600 transition">
                Explore Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TourPackages;
