import React from 'react';

const ServicesSection = () => {
  return (
    <section className="section services">
      <div className="container">
        <h2 className="section-title">Our Services</h2>
        <div className="services-container" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around' }}>
          <div className="service-card">
            <h3>Mentorship</h3>
            <p>Connect with experienced mentors who can guide you through the entrepreneurial journey.</p>
          </div>
          <div className="service-card">
            <h3>Networking</h3>
            <p>Join a vibrant community of entrepreneurs and industry experts.</p>
          </div>
          <div className="service-card">
            <h3>Knowledge Base</h3>
            <p>Access curated resources, articles, and tools to help your business thrive.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
