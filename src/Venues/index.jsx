import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Venues() {
  const [searchTerm, setSearchTerm] = useState("");
  const [venues, setVenues] = useState([]);
  const [filteredVenues, setFilteredVenues] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchVenues();
  }, []);

  const fetchVenues = () => {
    fetch(`https://v2.api.noroff.dev/holidaze/venues`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch venues");
        }
        return response.json();
      })
      .then((data) => {
        setVenues(data.data);
        setFilteredVenues(data.data);
        setError(null);
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  const handleChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
    if (value === "") {
      setFilteredVenues(venues);
    } else {
      searchVenues(value);
    }
  };

  const searchVenues = (query) => {
    fetch(`https://v2.api.noroff.dev/holidaze/venues/search?q=${query}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to search venues");
        }
        return response.json();
      })
      .then((data) => {
        setFilteredVenues(data.data);
        setError(null);
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  return (
    <div className="container mx-auto px-4">
      <h3 className="text-4xl font-bold mb-8 text-center">Our Venues</h3>
      <label htmlFor="search" className="sr-only">Search venues</label>
      <input
        type="text"
        id="search"
        placeholder="Search venues..."
        value={searchTerm}
        onChange={handleChange}
        className="w-full mb-8 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
      />
      {error && <p className="text-red-500">{error}</p>}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredVenues.map((venue) => (
          <Link
            key={venue.id}
            to={`/venues/${venue.id}`}
            className="rounded-lg overflow-hidden transition duration-300 transform hover:shadow-glow hover:scale-105"
          >
            <div className="bg-blue-100 p-6 shadow-lg">
              {venue.media && venue.media[0] && (
                <img
                  src={venue.media[0].url}
                  alt={venue.name || 'Venue image'}
                  className="w-full h-48 object-cover"
                />
              )}
              <div>
                <h4 className="text-2xl font-semibold mb-2 text-white">
                  {venue.name && venue.name.length > 30 ? venue.name.substring(0, 40) + "..." : venue.name}
                </h4>
                <p className="text-white">
                  {venue.description && venue.description.length > 40 ? venue.description.substring(0, 40) + "..." : venue.description}
                </p>
                <div className="flex justify-between items-center mt-4">
                  <p className="text-xl font-semibold text-white">
                    Price: £{venue.price}
                  </p>
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill={i < venue.rating ? "#FFD700" : "none"}
                        className={`w-6 h-6 ${i < venue.rating ? "text-yellow-500" : "text-gray-300"}`}
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 1.638l1.482 4.537h4.796l-3.878 2.821 1.482 4.538-3.879-2.823-3.878 2.823 1.482-4.538-3.878-2.82h4.795z"
                          clipRule="evenodd"
                        />
                      </svg>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Venues;
