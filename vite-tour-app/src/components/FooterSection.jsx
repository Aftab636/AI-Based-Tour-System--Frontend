import React from "react";

const FooterSection = () => {
  return (
    <footer className="bg-gray-900 text-white pt-12 pb-6 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Company Info */}
        <div>
          <h2 className="text-3xl font-bold mb-4">Travel</h2>
          <p className="text-sm text-gray-400 mb-4">
            Travel helps companies manage payments easily.
          </p>
          <div className="flex gap-4">
            {["linkedin", "messenger", "twitter", "infinity"].map((icon, idx) => (
              <a key={idx} href="#" className="hover:opacity-80 transition">
                <img
                  src={`/assets/images/${icon}.svg`}
                  alt={icon}
                  className="w-6 h-6"
                />
              </a>
            ))}
          </div>
        </div>

        {/* Company Links */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Company</h3>
          <ul className="space-y-2 text-gray-400">
            {["About Us", "Careers", "Blog", "Pricing"].map((item, idx) => (
              <li key={idx}>
                <a href="#" className="hover:text-white transition">{item}</a>
              </li>
            ))}
          </ul>
        </div>

        {/* Destinations */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Destinations</h3>
          <ul className="space-y-2 text-gray-400">
            {["Maldives", "Los Angeles", "Las Vegas", "Toronto"].map((item, idx) => (
              <li key={idx}>
                <a href="#" className="hover:text-white transition">{item}</a>
              </li>
            ))}
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Join Our Newsletter</h3>
          <div className="flex mb-2">
            <input
              type="email"
              placeholder="Your email address"
              className="w-full p-2 rounded-l-md border border-gray-600 bg-gray-800 text-white"
            />
            <button className="px-4 bg-red-600 hover:bg-red-700 text-white rounded-r-md transition">
              Subscribe
            </button>
          </div>
          <p className="text-xs text-gray-400">
            * Will send you weekly updates for your better tour packages.
          </p>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="text-center text-gray-500 mt-10 text-sm border-t border-gray-700 pt-6">
        &copy; TourHunting 2024. All Rights Reserved.
      </div>
    </footer>
  );
};

export default FooterSection;
