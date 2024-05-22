import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; 
import { FaMapMarkerAlt, FaCity, FaGlobe, FaUserFriends, FaWifi, FaParking, FaCoffee, FaPaw } from "react-icons/fa";

const VenueDetails = () => {
  const { id } = useParams();
  const [venue, setVenue] = useState(null);
  const [selectedDates, setSelectedDates] = useState([]);
  const [availableDates, setAvailableDates] = useState([]);
  const [guests, setGuests] = useState(0);
  const [bookingStatus, setBookingStatus] = useState(null);

  useEffect(() => {
    fetch(`https://v2.api.noroff.dev/holidaze/venues/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setVenue(data.data);
        if (data.data.availableDates) {
          setAvailableDates(data.data.availableDates);
        }
      })
      .catch((error) => {
        console.error("Error fetching venue:", error);
      });
  }, [id]);

  const handleDateChange = (date) => {
    setSelectedDates(date);
  };

  const isDateAvailable = (date) => {
    return availableDates.some((availableDate) => {
      return new Date(availableDate).toDateString() === date.toDateString();
    });
  };

  const handleGuestsChange = (event) => {
    const numGuests = parseInt(event.target.value);
    if (numGuests <= venue.maxGuests) {
      setGuests(numGuests);
    } else {
      // If number of guests exceeds max, set guests to maxGuests
      setGuests(venue.maxGuests);
    }
  };

const handleSubmit = (event) => {
  event.preventDefault();

  const apiKey = import.meta.env.VITE_API_KEY;
  const accessToken = localStorage.getItem('accessToken');

  const firstDate = selectedDates[0]; // First date in the selected range
  const lastDate = selectedDates[selectedDates.length - 1]; // Last date in the selected range

  const bookingData = {
    dateFrom: firstDate.toISOString(), // Set dateFrom to the first date
    dateTo: lastDate.toISOString(), // Set dateTo to the last date
    guests: guests,
    venueId: id
  };

  fetch("https://v2.api.noroff.dev/holidaze/bookings", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      'x-noroff-api-key': apiKey,
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(bookingData)
  })
  .then(response => response.json())
  .then(data => {
    console.log("Booking created successfully:", data);
    // Handle successful booking
    setBookingStatus("success");
  })
  .catch(error => {
    console.error("Error creating booking:", error);
    setBookingStatus("error");
  });
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
        <div className="flex items-center">
          {[...Array(5)].map((_, i) => (
            <svg
              key={i}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill={
                i < venue.rating
                  ? "#FFD700"
                  : "none"
              }
              className={`w-6 h-6 ${
                i < venue.rating
                  ? "text-yellow-500"
                  : "text-gray-300"
              }`}
            >
              <path
                fillRule="evenodd"
                d="M10 1.638l1.482 4.537h4.796l-3.878 2.821 1.482 4.538-3.879-2.823-3.878 2.823 1.482-4.538-3.878-2.82h4.795z"
                clipRule="evenodd"
              />
            </svg>
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <div className="mb-4">
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
          <div className="mb-4">
            <div className="flex items-center mb-2 text-gray-600">
              <FaWifi className="mr-2" />
              <p className="text-sm">{venue.meta.wifi ? "Free Wifi" : "No Wifi"}</p>
            </div>
            <div className="flex items-center mb-2 text-gray-600">
              <FaParking className="mr-2" />
              <p className="text-sm">{venue.meta.parking ? "Free Parking" : "No Parking"}</p>
            </div>
            <div className="flex items-center mb-2 text-gray-600">
              <FaCoffee className="mr-2" />
              <p className="text-sm">{venue.meta.breakfast ? "Free Breakfast" : "No Breakfast"}</p>
            </div>
            <div className="flex items-center text-gray-600">
              <FaPaw className="mr-2" />
              <p className="text-sm">{venue.meta.pets ? "Pets Allowed" : "No Pets Allowed"}</p>
            </div>
          </div>
        </div>
      </div>
      {/* Calendar */}
      <div className="text-center">
        <h2 className="text-lg font-semibold mb-2">Available Dates:</h2>
        <Calendar 
          selectRange
          value={selectedDates}
          onChange={handleDateChange} 
          className="mx-auto rounded-lg shadow-md text-black w-full sm:w-96"
          tileClassName={({date}) => isDateAvailable(date) ? "bg-green-200 text-black" : "bg-red-200 text-black"}
          />
          </div>
          {/* Booking form */}
          <form onSubmit={handleSubmit} className="mt-6">
            <div className="mb-4">
              <label htmlFor="guests" className="block text-sm font-medium text-gray-700">
                Number of Guests (Max: {venue.maxGuests}):
              </label>
              <input 
                type="number" 
                id="guests" 
                name="guests" 
                value={guests} 
                onChange={handleGuestsChange} 
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" 
              />
            </div>
            <button 
              type="submit" 
              className="inline-flex items-center bg-blue text-white py-2 rounded-md hover:bg-darkblue"
            >
              Book Now
            </button>
          </form>
          {/* Booking status */}
          {bookingStatus === "success" && <p className="text-green-500 mt-4">Booking successful!</p>}
          {bookingStatus === "error" && <p className="text-red-500 mt-4">Error creating booking. Please try again later.</p>}
        </div>
      );
    }
    
    export default VenueDetails;
    
