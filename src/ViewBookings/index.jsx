import { useState, useEffect } from "react";

const ViewBookings = () => {
  const [bookings, setBookings] = useState([]);

  // Fetch user's bookings
  useEffect(() => {
    // Fetch bookings data from API or localStorage
    const userBookings = [
      { id: 1, venue: "Venue 1", date: "2024-05-15", status: "Confirmed" },
      { id: 2, venue: "Venue 2", date: "2024-05-20", status: "Pending" },
    ];
    setBookings(userBookings);
  }, []);

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Your Upcoming Bookings</h1>
      <div>
        {bookings.length === 0 ? (
          <p className="text-gray-600 text-center">You have no upcoming bookings.</p>
        ) : (
          <ul className="divide-y divide-gray-300">
            {bookings.map((booking) => (
              <li key={booking.id} className="py-4">
                <p className="font-semibold">{booking.venue}</p>
                <p>Date: {booking.date}</p>
                <p>Status: {booking.status}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ViewBookings;
