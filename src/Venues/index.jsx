import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Venues() {
  const [venues, setVenues] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredVenues, setFilteredVenues] = useState([]);

  useEffect(() => {
    fetch("https://v2.api.noroff.dev/holidaze/venues")
      .then((response) => response.json())
      .then((data) => {
        setVenues(data.data);
        setFilteredVenues(data.data);
      })
      .catch((error) => {
        console.error("Error fetching venues:", error);
      });
  }, []);

  const handleChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
    filterVenues(value);
  };

  const filterVenues = (value) => {
    const filtered = venues.filter((venue) =>
      venue.title.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredVenues(filtered);
  };

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-2xl font-bold mb-4 text-center">Our Venues:</h2>
      {/* Search bar */}
      <input
        type="text"
        placeholder="Search venues..."
        value={searchTerm}
        onChange={handleChange}
        className="mb-4 px-4 py-2 border border-gray-300 rounded-md"
      />
      <div className="flex justify-center">
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredVenues.map((venue) => (
            <li key={venue.id} className="flex flex-col">
              <Link to={`/venues/${venue.id}`} className="no-underline">
                <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                  <img src={venue.media[0].url} alt={venue.title} className="w-full h-48 object-cover" />
                  <div className="p-4">
                    <h3 className="text-lg font-semibold mb-2 text-black">{venue.title}</h3>
                    <p className="text-sm mb-4 text-black">{venue.description}</p>
                    <div className="flex justify-between items-center mb-2">
                      <p className="text-sm font-semibold text-black">Price: £{venue.price}</p>
                      {/* <p className="text-sm font-semibold text-green-600">Discounted Price: £{venue.discountedPrice}</p> */}
                    </div>
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill={i < venue.rating ? "currentColor" : "none"}
                          className={`w-4 h-4 ${i < venue.rating ? "text-yellow-500" : "text-gray-300"}`}
                          key={i}
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
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Venues;
