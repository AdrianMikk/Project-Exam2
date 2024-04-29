import { useState } from 'react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    window.location.href = '/login';
  };

  return (
    <header className="bg-blue-500 shadow-lg">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        <h1 className="text-xl font-bold text-white">Holidaze</h1>
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-white focus:outline-none"
          >
            <svg
              className="w-6 h-6"
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
            <a
              href="/HomePage"
              className="block mt-4 md:inline-block text-white hover:text-gray-100 transition duration-300"
            >
              Home
            </a>
            <a
              href="/profile"
              className="block mt-4 md:inline-block text-white hover:text-gray-100 transition duration-300"
            >
              Profile
            </a>
            <a
              href="/contact"
              className="block mt-4 md:inline-block text-white hover:text-gray-100 transition duration-300"
            >
              Contact
            </a>
          </div>
          {/* <button
            className="mt-4 md:mt-0 md:ml-4 text-white bg-red-900 rounded-md px-4 py-2 hover:bg-red-800 transition duration-300"
            onClick={handleLogout}
          >
            Logout
          </button> */}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;



