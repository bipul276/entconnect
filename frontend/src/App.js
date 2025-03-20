import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Mentors from './pages/Mentors';
import MentorDetail from './pages/MentorDetail';
import Networks from './pages/Networks';
import Knowledge from './pages/Knowledge';

function App() {
  // Update navbar style on scroll for a dynamic feel.
  useEffect(() => {
    const handleScroll = () => {
      const navbar = document.querySelector('.navbar');
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <Router>
      <Navbar />
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/mentors" component={Mentors} exact />
        <Route path="/mentors/:id" component={MentorDetail} />
        <Route path="/networks" component={Networks} />
        <Route path="/knowledge" component={Knowledge} />
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
