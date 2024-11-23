import React from 'react'
import Navbar from '../Components/Navbar';
import Hero from '../Components/Hero';
import Features from '../Components/Features';
import HowItWorks from '../Components/Howitworks';
import Footer from '../Components/Footer';
const Homepage = () => {
  return (
    <div className="min-h-screen bg-gray-900">
      <Navbar />
      <Hero />
      <Features />
      <HowItWorks />
      <Footer />
    </div>
  );
}

export default Homepage