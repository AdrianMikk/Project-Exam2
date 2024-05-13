import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Calendar from 'react-calendar';
import { FaMapMarkerAlt, FaCity, FaGlobe, FaUserFriends, FaWifi, FaParking, FaCoffee, FaPaw } from "react-icons/fa";

const VenueDetails = () => {
  const { id } = useParams();
  const [venue, setVenue] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date()); 
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
    setSelectedDate(date);
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

    const bookingData = {
      dateFrom: selectedDate.toISOString(),
      dateTo: selectedDate.toISOString(), // For simplicity, assuming same date for dateFrom and dateTo
      guests: guests,
      venueId: id
    };

    fetch("https://v2.api.noroff.dev/holidaze/bookings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
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
        {/* Calendar */}
        <div>
          <h2 className="text-lg font-semibold mb-2">Available Dates:</h2>
          <Calendar 
            value={selectedDate} 
            onChange={handleDateChange} 
            className="rounded-lg shadow-md" 
            tileDisabled={({date}) => !isDateAvailable(date)}
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
            className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Book Now
          </button>
          {/* <button 
  type="submit" 
  className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue hover:bg-blue-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
>
  Book Now
</button> */}

        </form>
        {/* Booking status */}
        {bookingStatus === "success" && <p className="text-green-500 mt-4">Booking successful!</p>}
        {bookingStatus === "error" && <p className="text-red-500 mt-4">Error creating booking. Please try again later.</p>}
      </div>
    </div>
  );
}

export default VenueDetails;
