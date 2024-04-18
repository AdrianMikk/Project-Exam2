const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4 mb-8">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <a href="#" className="text-white text-lg font-bold">Holidaze</a>
        </div>
        <div className="hidden md:flex">
          <a href="#" className="text-gray-300 hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium">Home</a>
          <a href="#" className="text-gray-300 hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium">Profile</a>
          <a href="#" className="text-gray-300 hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium">Contact</a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

