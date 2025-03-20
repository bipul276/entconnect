import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import Mentors from './pages/Mentors';
import Chat from './pages/Chat';
import Practice from './pages/Practice';
import News from './pages/News';
import Courses from './pages/Courses';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <div className="flex-grow">
          <Switch>
            <Route path="/" component={Home} exact />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/profile" component={Profile} />
            <Route path="/mentors" component={Mentors} />
            <Route path="/chat" component={Chat} />
            <Route path="/practice" component={Practice} />
            <Route path="/news" component={News} />
            <Route path="/courses" component={Courses} />
          </Switch>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
