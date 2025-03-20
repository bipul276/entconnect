import React from 'react';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <section className="hero">
      <div className="hero-content">
        <h1>Empowering Entrepreneurs</h1>
        <p>Connect with mentors, industry experts, and unlock new opportunities.</p>
        <Link to="/mentors" className="btn">Find Mentors</Link>
      </div>
    </section>
  );
};

export default HeroSection;
