import React from "react";
import Services from "../components/Services";
import Trip from "../components/Trip";
import Bookings from "../components/Bookings";
import Tours from "../components/Tours";
import Recomendations from "../components/Recomendations";
import TourPackages from "../components/TourPackages";
import Reviews from "../components/Reviews";
import FooterSection from "../components/FooterSection";
import Navbar from "../components/Navbar";

function Home() {
  return (
    <>
      <Navbar />

      {/* Hero Section with background carousel */}
      <section className="relative h-screen w-full overflow-hidden">
        {/* Carousel Images */}
        <div className="absolute inset-0 z-0 animate-fade">
          <img
            src="/assets/images/float1.jpg"
            alt="Slide 1"
            className="w-full h-full object-cover opacity-100 absolute"
          />
          <img
            src="/assets/images/float2.jpg"
            alt="Slide 2"
            className="w-full h-full object-cover opacity-0 absolute"
          />
          <img
            src="/assets/images/float3.jpg"
            alt="Slide 3"
            className="w-full h-full object-cover opacity-0 absolute"
          />
          <img
            src="/assets/images/float4.jpg"
            alt="Slide 4"
            className="w-full h-full object-cover opacity-0 absolute"
          />
          <img
            src="/assets/images/float5.jpg"
            alt="Slide 5"
            className="w-full h-full object-cover opacity-0 absolute"
          />
        </div>

        {/* Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-50 z-10" />

        {/* Hero Text */}
        <div className="relative z-20 flex items-center justify-center h-full text-white text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold max-w-4xl px-4">
            No matter where you’re going to, we’ll take you there
          </h1>
        </div>
      </section>

      {/* Services Section */}
      <Services />
      <Trip />
      <Bookings />

      {/* Holiday Banner */}
      <div className="w-full relative">
        <img
          src="/assets/images/holiday.png"
          alt="Holiday"
          className="w-full h-auto"
        />
      </div>

      <Tours />
      <Recomendations />
      <TourPackages />
      <Reviews tourId="b4b96813-253a-4e44-9c29-26e076c2551b" />
      <FooterSection />
    </>
  );
}

export default Home;
