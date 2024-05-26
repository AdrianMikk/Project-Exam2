import Footer from '../Footer/index.jsx';
import Venues from '../Venues/index.jsx';

const HomePage = () => {
  return (
    <div>
      <div className="bg-gray-100 min-h-screen pt-8">
        <div className="container mx-auto py-8  ">
          <h1 className="text-4xl font-bold text-center mb-8">Holidaze</h1>
          <h2 className="text-3xl font-bold text-center mb-8">Book Your Bliss with Holidaze!</h2>
          {/* Venue List Section */}
          <section className="mb-8">
            {/* <h3 className="text-xl text-center font-semibold mx-auto">Explore Venues</h3> */}
            <Venues />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
