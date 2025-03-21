import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import AuthModal from './AuthModal';

const Navbar = () => {
  const token = localStorage.getItem('token');
  const userString = localStorage.getItem('user');
  const user = userString ? JSON.parse(userString) : null;
  const history = useHistory();
  const [showAuthModal, setShowAuthModal] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    history.push('/');
    window.location.reload();
  };

  return (
    <>
      <nav className="bg-gray-800 text-white">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <Link to="/" className="text-xl font-bold">
            VentureBridge
          </Link>
          <ul className="flex space-x-4 items-center">
            {!token ? (
              <li>
                <button onClick={() => setShowAuthModal(true)} className="hover:underline flex items-center focus:outline-none">
                  <span className="mr-1">🔑</span> Login
                </button>
              </li>
            ) : (
              <>
                <li className="flex items-center">
                  <span className="mr-1">👤</span> {user?.username}
                </li>
                <li>
                  <button onClick={handleLogout} className="hover:underline focus:outline-none">
                    Logout
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>
      {showAuthModal && <AuthModal onClose={() => setShowAuthModal(false)} />}
    </>
  );
};

export default Navbar;
