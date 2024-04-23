const Navbar = () => {
  return (
    <header className="bg-red-800 text-white py-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold ml-4">Holidaze</h1>
        <nav className="flex space-x-4">
          <a href="#" className="text-white hover:text-gray-100">
            Home
          </a>
          <a href="/profile" className="text-white hover:text-gray-100">
            Profile
          </a>
          <a href="/contact" className="text-white hover:text-gray-100">
            Contact
          </a>
        </nav>
      </div>
      <div className="bg-white h-1 m-2"></div>
    </header>
  );
};

export default Navbar;
