import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="container">
        <Link to="/" className="logo">Entrepreneur Platform</Link>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/mentors">Mentors</Link></li>
          <li><Link to="/networks">Networks</Link></li>
          <li><Link to="/knowledge">Knowledge</Link></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
