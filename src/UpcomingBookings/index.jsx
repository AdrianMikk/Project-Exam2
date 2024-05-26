function UpcomingBookings(bookings) {
    return (
      <div className="mt-4">
        <h2 className="text-lg font-semibold mb-2 text-white">Upcoming Bookings</h2>
        {bookings && bookings.length > 0 ? (
          <ul className="text-gray-400">
            {bookings.map((booking, index) => (
              <li key={index} className="flex items-center mb-2">
                <img
                  src={booking.venue.media[0].url}
                  alt={booking.venue.name}
                  className="w-16 h-16 object-cover mr-4"
                  style={{
                    borderRadius: '8px',
                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                  }}
                />
                <div>
                  <strong>{booking.venue.name}</strong> -{' '}
                  {formatDate(booking.dateFrom)} to {formatDate(booking.dateTo)} {booking.status}
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-400">No upcoming bookings.</p>
        )}
      </div>
    );
  }
  
  export default UpcomingBookings;
  
  function formatDate(dateString) {
    const date = new Date(dateString);
    return `${date.toISOString().slice(0, 10)} ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
  }
  