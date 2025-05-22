import React from 'react';
import Navbar from '../components/Navbar';
import FooterSection from '../components/FooterSection';

const Contact = () => {
  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gradient-to-b from-red-50 to-white py-20 px-6 text-center text-gray-700">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-red-500 mb-6">Contact Us</h1>
          <p className="text-lg mb-10 leading-relaxed">
            TravelGo is your one-stop travel solution that connects adventurers with tailor-made tour packages. 
            Whether you're looking to explore mountains, relax on beaches, or discover local experiences, our platform 
            makes travel planning effortless and personalized.
          </p>

          <div className="bg-white shadow-xl rounded-xl p-8 border border-red-100">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Get in Touch</h2>
            <p className="text-gray-600 mb-6">
              For support, inquiries, or partnership opportunities, reach out to us anytime:
            </p>

            <p className="text-lg font-semibold text-red-500">📧 travelgo@gmail.com</p>

            <div className="mt-10">
              <p className="text-sm text-gray-500">* A contact form will be added soon to make communication even easier.</p>
            </div>
          </div>
        </div>
      </div>

      <FooterSection />
    </>
  );
};

export default Contact;
