function UpcomingBookings(bookings) {
  return (
    <div className="mt-4">
      <h2 className="text-lg font-semibold mb-2 text-white">Upcoming Bookings</h2>
      {bookings && bookings.length > 0 ? (
        <ul className="text-gray-400">
          {bookings.map((booking, index) => (
            <li key={index}>
              <strong>{booking.venue.name}</strong> - {booking.dateFrom} to {booking.dateTo} - {booking.status}
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
