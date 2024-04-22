const Navbar = () => {
  return (
    <header className="bg-red-800 text-white py-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold mx-auto">Holidaze</h1>
        <nav className="flex space-x-4">
          <a href="#" className="text-gray-300 hover:text-white">
            Home
          </a>
          <a href="#" className="text-gray-300 hover:text-white">
            Profile
          </a>
          <a href="#" className="text-red-300 hover:text-white">
            Contact
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;