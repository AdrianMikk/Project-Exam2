import { useState } from 'react';
import { Link } from 'react-router-dom'; 

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); 

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <header className="bg-blue-500 shadow-lg">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        <h1 className="text-xl font-bold text-white">
          <Link to="/venues" className="hover:text-gray-100 text-white transition duration-300">
            Holidaze
          </Link>
        </h1>
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-white focus:outline-none" 
            aria-label='hamburger menu button' 
          >
            <svg
              className={`w-6 h-6 transition-transform duration-300 ${isOpen ? 'rotate-45' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
              ></path>
            </svg>
          </button>
        </div>
        <nav className={`md:flex md:items-center md:w-auto ${isOpen ? 'block' : 'hidden'}`}>
          <div className="flex flex-col md:flex-row md:space-x-4">
            <Link
              to="/venues" 
              className="block mt-4 md:inline-block text-white hover:text-gray-100 transition duration-300"
            >
              Home
            </Link>
            <Link
              to="/profile" 
              className="block mt-4 md:inline-block text-white hover:text-gray-100 transition duration-300"
            >
              Profile
            </Link>
            <Link
              to="/contact" 
              className="block mt-4 md:inline-block text-white hover:text-gray-100 transition duration-300"
            >
              Contact
            </Link>
            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                className="block mt-4 md:inline-block text-white hover:text-gray-100 transition duration-300"
              >
                Logout
              </button>
            ) : (
              <Link
                to="/login" 
                className="block mt-4 md:inline-block text-white hover:text-gray-100 transition duration-300"
              >
                Login
              </Link>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
