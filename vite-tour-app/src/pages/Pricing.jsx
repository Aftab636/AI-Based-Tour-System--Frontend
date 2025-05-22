import React from "react";
import Navbar from "../components/Navbar";
import FooterSection from "../components/FooterSection";

const Pricing = () => {
  return (
    <>
      <Navbar />

      <section className="min-h-screen py-20 px-6 bg-gradient-to-b from-white via-red-50 to-white text-gray-800">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-extrabold mb-4 text-red-500">Pricing & Policy</h1>
          <p className="text-gray-600 mb-12 text-lg max-w-2xl mx-auto">
            Our goal is to make tour planning accessible and transparent for everyone. Below is a detailed overview of our pricing and usage policy.
          </p>

          <div className="grid gap-10 md:grid-cols-2 text-left">
            {/* USER PLAN */}
            <div className="bg-white shadow-lg rounded-2xl p-8 border border-red-200">
              <h2 className="text-2xl font-bold text-red-600 mb-4">👤 For Tourists / Users</h2>
              <ul className="space-y-3 text-gray-700 text-sm leading-relaxed">
                <li>
                  ✅ <span className="font-medium text-gray-800">100% free access</span> to all features including tour recommendations and trip planning.
                </li>
                <li>
                  ✅ Save your favorite tours, compare multiple options, and plan freely.
                </li>
                <li>
                  ❌ No payment is required — this platform is <span className="text-red-500 font-semibold">free forever</span> for users.
                </li>
                <li>
                  🔒 We ensure data privacy and don’t store personal preferences without consent.
                </li>
              </ul>
            </div>

            {/* COMPANY PLAN */}
            <div className="bg-white shadow-lg rounded-2xl p-8 border border-red-200">
              <h2 className="text-2xl font-bold text-red-600 mb-4">🏢 For Tour Companies</h2>
              <ul className="space-y-3 text-gray-700 text-sm leading-relaxed">
                <li>
                  💰 <span className="font-medium text-gray-800">Monthly commission:</span> <span className="text-red-500 font-semibold">10%</span> of your total income generated via this platform.
                </li>
                <li>
                  📦 Full access to dashboard tools: add/edit packages, upload galleries, and view reports.
                </li>
                <li>
                  📈 Performance analytics, customer reach stats, and lead generation included.
                </li>
                <li>
                  🔒 Secure access via company login — data stays protected.
                </li>
                <li>
                  ❗ Monthly income report must be submitted for accurate billing.
                </li>
              </ul>
            </div>
          </div>

          {/* RULES */}
          <div className="mt-16 max-w-3xl mx-auto text-left">
            <h3 className="text-xl font-semibold text-red-500 mb-4">⚖️ Additional Rules</h3>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 text-sm">
              <li>All companies must verify ownership before publishing packages.</li>
              <li>Failure to submit income details may lead to account suspension.</li>
              <li>No hidden charges — all policies are clearly communicated.</li>
              <li>Violating content guidelines may result in tour removal.</li>
              <li>We reserve the right to adjust commissions based on performance tiers in the future.</li>
            </ul>
          </div>

          {/* CTA */}
          <div className="mt-12">
            <p className="text-center text-sm text-gray-500">
              For billing inquiries or support,{" "}
              <a href="/contact" className="text-red-600 font-semibold underline">
                contact us
              </a>{" "}
              anytime.
            </p>
          </div>
        </div>
      </section>

      <FooterSection />
    </>
  );
};

export default Pricing;
