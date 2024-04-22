import Footer from '../Footer/index.jsx';
import Navbar from '../Header/index.jsx';

const HomePage = () => {
  return (
    <div>
      <Navbar />
      <div className="bg-gray-100 min-h-screen pt-8">
        <div className="container mx-auto py-8  ">
          <h1 className="text-3xl font-bold text-center mb-8">Holidaze</h1>
          <h2 className="text-3xl font-bold text-center mb-8">Book Your Bliss with Holidaze!</h2>
          {/* Venue List Section */}
          <section className="mb-8">
            <h3 className="text-xl font-semibold mt-4">Explore Venues</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Example Venue Card */}
              <div className="bg-white rounded-lg shadow-md p-4">
                <h4 className="text-lg text-black font-semibold mb-2">Venue Name</h4>
                <p className="text-sm text-black">Location: City, Country</p>
                <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">View Details</button>
              </div>
              {/* Repeat this card for each venue */} 
            </div>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;
