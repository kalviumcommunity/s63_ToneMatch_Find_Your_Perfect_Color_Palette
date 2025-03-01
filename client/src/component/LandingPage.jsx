import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const LandingPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 text-white p-6">
      <motion.div 
        initial={{ opacity: 0, y: -20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.8 }}
        className="text-center space-y-4"
      >
        <h1 className="text-5xl font-bold">Welcome to <span className="text-yellow-300">ToneMatch</span> 🎨</h1>
        <p className="text-lg max-w-lg mx-auto">Discover your perfect color palette based on your unique skin tone.</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }} 
        animate={{ opacity: 1, scale: 1 }} 
        transition={{ duration: 0.8, delay: 0.3 }}
        className="flex gap-4 mt-6"
      >
        <Link 
          to="/analyze"
          className="px-6 py-3 bg-yellow-400 text-black font-semibold rounded-lg shadow-md hover:bg-yellow-300 transition-all duration-300"
        >
          Get Started 🚀
        </Link>
        <Link 
          to="/gallery"
          className="px-6 py-3 bg-white text-blue-700 font-semibold rounded-lg shadow-md hover:bg-gray-200 transition-all duration-300"
        >
          Browse Inspiration ✨
        </Link>
      </motion.div>

      {/* How It Works Section */}
      <div className="mt-12 text-center">
        <h2 className="text-3xl font-semibold">How It Works?</h2>
        <p className="text-lg mt-2 max-w-2xl mx-auto">
          Upload a photo, let our AI analyze your skin tone, and receive personalized color recommendations for clothing, makeup, and accessories.
        </p>
      </div>
    </div>
  );
};

export default LandingPage;
