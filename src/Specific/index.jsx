import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Calendar from 'react-calendar';
import { FaMapMarkerAlt, FaCity, FaGlobe, FaUserFriends } from "react-icons/fa";


function VenueDetails() {
  const { id } = useParams();
  const [venue, setVenue] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date()); 

  useEffect(() => {
    fetch(`https://v2.api.noroff.dev/holidaze/venues/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setVenue(data.data);
      })
      .catch((error) => {
        console.error("Error fetching venue:", error);
      });
  }, [id]);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  if (!venue) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-6 text-center">{venue.title}</h1>
      <div className="max-w-3xl">
        {venue.media.map((image, index) => (
          <img key={index} src={image.url} alt={`${venue.title}-image-${index}`} className="w-full h-auto mb-4 rounded-lg shadow-md" />
        ))}
        <p className="text-lg text-gray-800 mb-4">{venue.description}</p>
        <div className="flex justify-between items-center mb-4">
          <p className="text-lg font-semibold text-gray-800">
            Original Price: £{venue.price}
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
        <div className="mb-4">
          <p className="text-lg font-semibold mb-2 text-gray-800">Location:</p>
          <div className="flex items-center mb-2 text-gray-600">
            <FaMapMarkerAlt className="mr-2" />
            <p className="text-sm">{venue.location.address}</p>
          </div>
          <div className="flex items-center mb-2 text-gray-600">
            <FaCity className="mr-2" />
            <p className="text-sm">{venue.location.city}</p>
          </div>
          <div className="flex items-center mb-2 text-gray-600">
            <FaGlobe className="mr-2" />
            <p className="text-sm">{venue.location.country}</p>
          </div>
          <div className="flex items-center text-gray-600">
            <FaUserFriends className="mr-2" />
            <p className="text-sm">Max Guests: {venue.maxGuests}</p>
          </div>
        </div>
        <div>
          <Calendar value={selectedDate} onChange={handleDateChange} className="rounded-lg shadow-md" />
        </div>
      </div>
    </div>
  );
}

export default VenueDetails;
