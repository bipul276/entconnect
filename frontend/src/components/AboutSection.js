import React from 'react';

const AboutSection = () => {
  return (
    <section className="section about">
      <div className="container" style={{ display: 'flex', alignItems: 'center' }}>
        <div className="about-img">
          <img src="/images/about.jpg" alt="About us" />
        </div>
        <div className="about-content">
          <h2 className="section-title">About Our Platform</h2>
          <p>
            Our platform bridges the gap between entrepreneurs and the right mentors, networks, and essential knowledge. We believe that the right guidance and community can accelerate business growth and innovation.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
