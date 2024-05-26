import { useEffect, useState } from 'react';

const MyVenueBookings = ({ id }) => {
  const [venue, setVenue] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const url = `https://v2.api.noroff.dev/holidaze/venues/${id}?_bookings=true`;
    const apiKey = import.meta.env.VITE_API_KEY;

    const getVenueData = async () => {
      try {
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'X-Noroff-api-key': apiKey,
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          },
        });
        const data = await response.json();
        setVenue(data.data);

        if (data.data.bookings) {
          setBookings(data.data.bookings);
        }
      } catch (error) {
        setError(error.message);
      }
    };

    if (id) { // Only fetch data if id is truthy
      getVenueData();
    }
  }, [id]); // Include dependencies for useEffect

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!venue) {
    return <div>Loading...</div>;
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.toISOString().slice(0, 10)} ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
  };

  return (
    <div>
      {bookings.length > 0 && (
        <div>
          <h2>Bookings</h2>
          <ul>
            {bookings.map((booking) => (
              <li key={booking.id}>Venue Booked From: {formatDate(booking.dateFrom)}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default MyVenueBookings;
