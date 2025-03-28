/* eslint-disable no-unused-vars */
import React from "react"; // Required for JSX
/* eslint-enable no-unused-vars */
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const LandingPage = () => {
  // Animation variants for staggered animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6 }
    }
  };

  // Features with icons
  const features = [
    {
      icon: "🎨",
      title: "AI Color Analysis",
      description: "Our advanced algorithm analyzes your skin tone from your photo"
    },
    {
      icon: "👗",
      title: "Personalized Recommendations",
      description: "Get custom color palettes that complement your unique skin tone"
    },
    {
      icon: "💄",
      title: "Fashion & Makeup",
      description: "Apply your palette to clothing, accessories, and makeup choices"
    }
  ];

  // How it works steps
  const steps = [
    {
      number: 1,
      title: "Upload a Photo",
      description: "Take a clear selfie in natural lighting",
      icon: "📸"
    },
    {
      number: 2,
      title: "AI Analysis",
      description: "Our algorithm detects your unique skin tone",
      icon: "🤖"
    },
    {
      number: 3,
      title: "Get Your Palette",
      description: "Receive personalized color recommendations",
      icon: "✨"
    }
  ];

  // Testimonials
  const testimonials = [
    {
      quote: "ToneMatch helped me find colors that actually work with my skin tone!",
      name: "Sarah J.",
      role: "Fashion Enthusiast"
    },
    {
      quote: "I've never received so many compliments on my outfit choices before.",
      name: "Michael T.",
      role: "Professional Photographer"
    }
  ];

  return (
    <div className="landing-page">
      {/* Hero Section */}
      <motion.section 
        className="hero-section"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="hero-content">
          <motion.h1 
            className="hero-title"
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            Discover Your <span className="gradient-text">Perfect Colors</span>
          </motion.h1>
          
          <motion.p 
            className="hero-subtitle"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Find the ideal color palette that complements your unique skin tone and enhances your natural beauty
          </motion.p>
          
          <motion.div 
            className="hero-buttons"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Link to="/analyze" className="primary-button">
              <span className="button-icon">🚀</span>
              Get Started
            </Link>
            <Link to="/gallery" className="secondary-button">
              <span className="button-icon">✨</span>
              Browse Inspiration
            </Link>
          </motion.div>
        </div>
        
        <motion.div 
          className="hero-image"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <div className="color-circles">
            <div className="circle circle-1"></div>
            <div className="circle circle-2"></div>
            <div className="circle circle-3"></div>
            <div className="circle circle-4"></div>
          </div>
        </motion.div>
      </motion.section>

      {/* Features Section */}
      <section className="features-section">
        <h2 className="section-title">Why Choose <span className="color-accent-medium">ToneMatch</span>?</h2>
        
        <motion.div 
          className="features-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {features.map((feature, index) => (
            <motion.div 
              key={index} 
              className="feature-card"
              variants={itemVariants}
              whileHover={{ y: -5, boxShadow: "0 10px 20px rgba(0,0,0,0.1)" }}
            >
              <div className="feature-icon">{feature.icon}</div>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-description">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works-section">
        <h2 className="section-title">How It <span className="color-grade-medium">Works</span></h2>
        
        <motion.div 
          className="steps-container"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {steps.map((step, index) => (
            <motion.div 
              key={index} 
              className="step-card"
              variants={itemVariants}
            >
              <div className="step-number">{step.number}</div>
              <div className="step-icon">{step.icon}</div>
              <h3 className="step-title">{step.title}</h3>
              <p className="step-description">{step.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials-section">
        <h2 className="section-title">What Our <span className="color-accent-medium">Users</span> Say</h2>
        
        <motion.div 
          className="testimonials-container"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {testimonials.map((testimonial, index) => (
            <motion.div 
              key={index} 
              className="testimonial-card"
              variants={itemVariants}
              whileHover={{ scale: 1.03 }}
            >
              <div className="quote-mark">&quot;</div>
              <p className="testimonial-quote">{testimonial.quote}</p>
              <div className="testimonial-author">
                <p className="author-name">{testimonial.name}</p>
                <p className="author-role">{testimonial.role}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* CTA Section */}
      <motion.section 
        className="cta-section"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <h2 className="cta-title">Ready to Find Your Perfect Colors?</h2>
        <p className="cta-description">
          Join thousands of users who have discovered their ideal color palette
        </p>
        <Link to="/analyze" className="cta-button">
          Get Started Now
        </Link>
      </motion.section>
    </div>
  );
};

export default LandingPage;